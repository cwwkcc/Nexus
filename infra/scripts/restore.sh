#!/bin/bash
set -euo pipefail

# Database restore script (F-061, F-134)
# Used for disaster recovery and backup verification.
# Downloads from Cloudflare R2 via rclone (matches backup.sh, Appendix A
# §A.8.1, and docs/operations/Backup and Restore Procedure.md), decrypts
# with GPG, restores inside the postgres container — Postgres is
# internal-only (Appendix A §A.5.2), so this never touches a host-exposed
# Postgres port.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/common.sh
source "$SCRIPT_DIR/lib/common.sh"

DEPLOY_DIR="/opt/nexus"
ENV_FILE="$DEPLOY_DIR/.env"
COMPOSE_FILE="$DEPLOY_DIR/docker-compose.yml"
BACKUP_DIR="/opt/nexus/backups"
ENCRYPTION_KEY_FILE="/opt/nexus/secrets/backup-key.gpg"
RCLONE_REMOTE="r2"
BACKUP_BUCKET="${R2_BACKUP_BUCKET_NAME:-kcc-backups}"

load_env "$ENV_FILE"
configure_rclone_r2 "$RCLONE_REMOTE"

DB_NAME="${POSTGRES_DB:-nexus}"
DB_USER="${POSTGRES_USER:-nexus}"

if [ $# -lt 1 ]; then
  echo "Usage: $0 <backup_file.sql.gz.gpg> [--verify-only]"
  echo "Example: $0 nexus_backup_20260113_020000.sql.gz.gpg"
  echo "Example: $0 nexus_backup_20260113_020000.sql.gz.gpg --verify-only"
  echo ""
  echo "Available backups in R2:"
  rclone lsf "$RCLONE_REMOTE:$BACKUP_BUCKET/database/" || true
  exit 1
fi

BACKUP_FILE="$1"
VERIFY_ONLY="${2:-}"

mkdir -p "$BACKUP_DIR"

if [ ! -f "$BACKUP_DIR/$BACKUP_FILE" ]; then
  log "Downloading backup from R2..."
  rclone copy "$RCLONE_REMOTE:$BACKUP_BUCKET/database/$BACKUP_FILE" "$BACKUP_DIR/"
fi

log "Decrypting backup..."
DECOMPRESSED_SOURCE="${BACKUP_FILE%.gpg}"
gpg --batch --yes --passphrase-file "$ENCRYPTION_KEY_FILE" \
  -d "$BACKUP_DIR/$BACKUP_FILE" > "$BACKUP_DIR/$DECOMPRESSED_SOURCE"

log "Decompressing backup..."
SQL_FILE="${DECOMPRESSED_SOURCE%.gz}"
gunzip -c "$BACKUP_DIR/$DECOMPRESSED_SOURCE" > "$BACKUP_DIR/$SQL_FILE"

cleanup_local() {
  rm -f "$BACKUP_DIR/$DECOMPRESSED_SOURCE" "$BACKUP_DIR/$SQL_FILE"
}

if [ "$VERIFY_ONLY" = "--verify-only" ]; then
  log "Verifying backup integrity..."
  head -n 20 "$BACKUP_DIR/$SQL_FILE"
  if grep -qi "CREATE TABLE" "$BACKUP_DIR/$SQL_FILE"; then
    log "✓ Backup contains CREATE TABLE statements"
  else
    log "✗ No CREATE TABLE statements found — backup may be invalid"
    cleanup_local
    exit 1
  fi
  cleanup_local
  log "Backup verification completed successfully."
  exit 0
fi

echo "WARNING: This will replace the entire database '$DB_NAME'."
read -r -p "Are you sure? Type 'yes' to continue: " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
  echo "Restore cancelled."
  cleanup_local
  exit 1
fi

log "Stopping application services..."
docker compose -f "$COMPOSE_FILE" stop nexus-web nexus-admin

log "Dropping and recreating database..."
docker compose -f "$COMPOSE_FILE" exec -T postgres psql -U "$DB_USER" -d postgres \
  -c "DROP DATABASE IF EXISTS \"$DB_NAME\";"
docker compose -f "$COMPOSE_FILE" exec -T postgres psql -U "$DB_USER" -d postgres \
  -c "CREATE DATABASE \"$DB_NAME\";"

log "Restoring database..."
docker compose -f "$COMPOSE_FILE" exec -T postgres psql -U "$DB_USER" -d "$DB_NAME" \
  < "$BACKUP_DIR/$SQL_FILE"

cleanup_local

log "Starting application services..."
docker compose -f "$COMPOSE_FILE" start nexus-web nexus-admin

log "Restore completed successfully."