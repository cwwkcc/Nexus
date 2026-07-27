#!/bin/bash
set -euo pipefail

# Automated database backup script (F-061, F-134)
# pg_dump (inside the postgres container — Postgres is internal-only, see
# Appendix A §A.5.2) → compress → GPG-encrypt → upload to Cloudflare R2 via
# rclone. Destination, tooling, and encryption match:
#   - Appendix A §A.8.1  (Database backup → R2, encrypted, 30-day retention)
#   - docs/operations/Backup and Restore Procedure.md  (R2 + rclone)
#   - F-134  (Backup Encryption: encrypted before off-site storage,
#             key stored separately from the backups)
# Run nightly via cron (docs specify 0 2 * * *):
#   0 2 * * * /opt/nexus/scripts/backup.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/common.sh
source "$SCRIPT_DIR/lib/common.sh"

# Configuration
DEPLOY_DIR="/opt/nexus"
ENV_FILE="$DEPLOY_DIR/.env"
COMPOSE_FILE="$DEPLOY_DIR/docker-compose.yml"
BACKUP_DIR="/opt/nexus/backups"
RETENTION_DAYS=30
ENCRYPTION_KEY_FILE="/opt/nexus/secrets/backup-key.gpg"
RCLONE_REMOTE="r2"
BACKUP_BUCKET="${R2_BACKUP_BUCKET_NAME:-kcc-backups}"
LOCK_FILE="/tmp/nexus-backup.lock"

load_env "$ENV_FILE"
configure_rclone_r2 "$RCLONE_REMOTE"

DB_NAME="${POSTGRES_DB:-nexus}"
DB_USER="${POSTGRES_USER:-nexus}"

# Prevent overlapping runs if a previous backup is still going
exec 200>"$LOCK_FILE"
flock -n 200 || { log "Another backup run is already in progress. Exiting."; exit 1; }

mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date -u +"%Y%m%d_%H%M%S")
COMPRESSED_FILE="nexus_backup_${TIMESTAMP}.sql.gz"
ENCRYPTED_FILE="${COMPRESSED_FILE}.gpg"

log "Starting database backup..."
docker compose -f "$COMPOSE_FILE" exec -T postgres pg_dump -U "$DB_USER" -d "$DB_NAME" \
  | gzip > "$BACKUP_DIR/$COMPRESSED_FILE"

log "Encrypting backup..."
gpg --batch --yes --cipher-algo AES256 --passphrase-file "$ENCRYPTION_KEY_FILE" \
  -c "$BACKUP_DIR/$COMPRESSED_FILE"

log "Uploading to R2 (${RCLONE_REMOTE}:${BACKUP_BUCKET}/database/)..."
rclone copy "$BACKUP_DIR/$ENCRYPTED_FILE" "$RCLONE_REMOTE:$BACKUP_BUCKET/database/"

log "Cleaning up local files..."
rm -f "$BACKUP_DIR/$COMPRESSED_FILE" "$BACKUP_DIR/$ENCRYPTED_FILE"

log "Applying ${RETENTION_DAYS}-day retention policy..."
rclone delete "$RCLONE_REMOTE:$BACKUP_BUCKET/database/" --min-age "${RETENTION_DAYS}d"

log "Backup completed successfully: $ENCRYPTED_FILE"