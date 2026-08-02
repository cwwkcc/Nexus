#!/bin/bash
set -euo pipefail

# Break-glass password rotation (F-079)
# Server-side CLI script — run over SSH.
# Re-hashes a new password directly into the database.
# No internet-facing reset surface for the highest-privilege account
# (see Appendix A §A.5.1 and F-079, Break-Glass Password Rotation).

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/common.sh
source "$SCRIPT_DIR/lib/common.sh"

DEPLOY_DIR="/opt/nexus"
ENV_FILE="$DEPLOY_DIR/.env"
COMPOSE_FILE="$DEPLOY_DIR/docker-compose.yml"

load_env "$ENV_FILE"

DB_NAME="${POSTGRES_DB:-nexus}"
DB_USER="${POSTGRES_USER:-nexus}"
BREAKGLASS_EMAIL="${ADMIN_EMAIL:?ADMIN_EMAIL not set in $ENV_FILE}"

if [ $# -lt 1 ]; then
  echo "Usage: $0 <new_password>"
  echo "This script rotates the break-glass admin password directly in the database."
  echo "Run this script over SSH on the production server."
  exit 1
fi

NEW_PASSWORD="$1"

if [ ${#NEW_PASSWORD} -lt 16 ]; then
  echo "Error: Password must be at least 16 characters long"
  exit 1
fi

log "Generating password hash..."
HASH=$(echo -n "$NEW_PASSWORD" | argon2 "$(openssl rand -base64 16)" -e -id -t 3 -m 65536 -p 4)

log "Updating break-glass password in database..."
docker compose -f "$COMPOSE_FILE" exec -T postgres psql -U "$DB_USER" -d "$DB_NAME" <<EOF
UPDATE "User"
SET "passwordHash" = '$HASH',
    "updatedAt" = NOW()
WHERE "email" = '$BREAKGLASS_EMAIL'
AND "role" = 'ADMIN';
EOF

log "Verifying password update..."
UPDATED_COUNT=$(docker compose -f "$COMPOSE_FILE" exec -T postgres psql -U "$DB_USER" -d "$DB_NAME" -t -c \
  "SELECT COUNT(*) FROM \"User\" WHERE \"email\" = '$BREAKGLASS_EMAIL' AND \"role\" = 'ADMIN';" | tr -d '[:space:]')

if [ "$UPDATED_COUNT" -eq 1 ]; then
  log "✓ Break-glass password updated successfully"
  echo "Email: $BREAKGLASS_EMAIL"
  echo "Please store the new password securely and destroy this session."
  echo ""
  echo "Note: this only updates the live database row. ADMIN_PASSWORD in"
  echo "$ENV_FILE is the seed value used on first deploy / a fresh volume —"
  echo "update it too if you want a rebuilt server to come up with this"
  echo "same password rather than the old seed."
else
  echo "✗ Failed to update password (expected 1 row, found $UPDATED_COUNT)"
  exit 1
fi
