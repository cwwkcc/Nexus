#!/bin/bash
set -euo pipefail

# Secret rotation script (F-135)
# Rotates a named credential (DB password, Auth.js secret, R2 keys, Resend
# API key) without service downtime. Documents which services need
# restarting (see docs/operations/Secrets Rotation Procedures.md / F-135).

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/common.sh
source "$SCRIPT_DIR/lib/common.sh"

DEPLOY_DIR="/opt/nexus"
ENV_FILE="$DEPLOY_DIR/.env"
COMPOSE_FILE="$DEPLOY_DIR/docker-compose.yml"
SECRETS_DIR="/opt/nexus/secrets"

if [ $# -lt 1 ]; then
  echo "Usage: $0 <secret_name> [new_value]"
  echo "Available secrets: DB_PASSWORD, NEXTAUTH_SECRET, R2_ACCESS_KEY, R2_SECRET_KEY, RESEND_API_KEY"
  exit 1
fi

SECRET_NAME="$1"
NEW_VALUE="${2:-$(openssl rand -base64 32)}"

# Computed once and reused everywhere below — the original script called
# date +%Y%m%d_%H%M%S three separate times, so the "restore from backup"
# path and the final "backup saved to" message both pointed at filenames
# that were never actually created.
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ENV_BACKUP_FILE="$ENV_FILE.backup.$TIMESTAMP"

case "$SECRET_NAME" in
  DB_PASSWORD)
    SERVICE_RESTART="nexus-web nexus-admin"
    ;;
  NEXTAUTH_SECRET)
    ENV_VAR="NEXTAUTH_SECRET"
    SERVICE_RESTART="nexus-web nexus-admin"
    ;;
  R2_ACCESS_KEY)
    ENV_VAR="R2_ACCESS_KEY_ID"
    SERVICE_RESTART="nexus-web nexus-admin"
    ;;
  R2_SECRET_KEY)
    ENV_VAR="R2_SECRET_ACCESS_KEY"
    SERVICE_RESTART="nexus-web nexus-admin"
    ;;
  RESEND_API_KEY)
    ENV_VAR="RESEND_API_KEY"
    SERVICE_RESTART="nexus-web nexus-admin"
    ;;
  *)
    echo "Error: Unknown secret '$SECRET_NAME'"
    exit 1
    ;;
esac

log "Backing up current .env to $ENV_BACKUP_FILE..."
cp "$ENV_FILE" "$ENV_BACKUP_FILE"

if [ "$SECRET_NAME" = "DB_PASSWORD" ]; then
  # DATABASE_URL is a full connection string (postgresql://user:pass@host:port/db),
  # not just the password. The original script overwrote the whole variable
  # with the bare new value, which would have broken every DB connection.
  # Fix: actually rotate the Postgres role's password, keep POSTGRES_PASSWORD
  # in sync, and replace only the password segment inside DATABASE_URL.
  load_env "$ENV_FILE"
  DB_USER="${POSTGRES_USER:-nexus}"
  DB_NAME="${POSTGRES_DB:-nexus}"

  log "Rotating the Postgres role password inside the database..."
  docker compose -f "$COMPOSE_FILE" exec -T postgres psql -U "$DB_USER" -d "$DB_NAME" \
    -v ON_ERROR_STOP=1 \
    -c "ALTER ROLE \"$DB_USER\" WITH PASSWORD '$NEW_VALUE';"

  log "Updating POSTGRES_PASSWORD in .env..."
  sed -i "s#^POSTGRES_PASSWORD=.*#POSTGRES_PASSWORD=${NEW_VALUE}#" "$ENV_FILE"

  log "Updating the password segment of DATABASE_URL (user/host/port/db untouched)..."
  sed -i -E "s#^(DATABASE_URL=postgresql://[^:]+:)[^@]*(@.*)#\1${NEW_VALUE}\2#" "$ENV_FILE"
else
  log "Updating $SECRET_NAME ($ENV_VAR) in .env..."
  if grep -q "^${ENV_VAR}=" "$ENV_FILE"; then
    sed -i "s#^${ENV_VAR}=.*#${ENV_VAR}=${NEW_VALUE}#" "$ENV_FILE"
  else
    echo "${ENV_VAR}=${NEW_VALUE}" >> "$ENV_FILE"
  fi
fi

log "Storing secret in secrets directory..."
mkdir -p "$SECRETS_DIR"
echo "$NEW_VALUE" > "$SECRETS_DIR/${SECRET_NAME}"
chmod 600 "$SECRETS_DIR/${SECRET_NAME}"

log "Restarting affected services: $SERVICE_RESTART"
docker compose -f "$COMPOSE_FILE" restart $SERVICE_RESTART

log "Waiting for services to be healthy..."
sleep 10

# Check each restarted service's actual state rather than grepping for the
# literal string "Up" in `docker compose ps`, which isn't reliably present
# across docker compose versions/output formats.
all_running=true
for svc in $SERVICE_RESTART; do
  state=$(docker compose -f "$COMPOSE_FILE" ps --format '{{.State}}' "$svc" 2>/dev/null || echo "")
  if [ "$state" != "running" ]; then
    log "✗ $svc is not running (state: ${state:-unknown})"
    all_running=false
  fi
done

if [ "$all_running" = true ]; then
  log "✓ Services are running"
else
  log "✗ Services failed to start. Restoring backup from $ENV_BACKUP_FILE..."
  cp "$ENV_BACKUP_FILE" "$ENV_FILE"
  docker compose -f "$COMPOSE_FILE" restart $SERVICE_RESTART
  exit 1
fi

log "Secret rotation completed successfully for $SECRET_NAME"
log "Backup saved to: $ENV_BACKUP_FILE"