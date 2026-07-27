#!/bin/bash
set -euo pipefail

# Hourly transaction log (WAL) backup (F-061, F-134)
# Satisfies Appendix A §A.8.1: "Database — Hourly (transaction logs) —
# R2 (encrypted) — 7 days" — enables point-in-time recovery. This script did
# not exist before; the proposal and Backup and Restore Procedure.md both
# call for it, but only the nightly full dump (backup.sh) was implemented.
#
# PREREQUISITE (one-time, in postgres's config / docker-compose.yml):
#   wal_level = replica
#   archive_mode = on
#   archive_command = 'test ! -f /wal-archive/%f && cp %p /wal-archive/%f'
#   ...with /wal-archive bind-mounted into the postgres container AND
#   readable at $WAL_ARCHIVE_DIR below on the host.
# This script only ships already-archived segments off-site — it does not
# configure WAL archiving itself. Without the above, there is nothing here
# for it to pick up.
#
# Run hourly via cron (docs specify the top of every hour):
#   0 * * * * /opt/nexus/scripts/backup-wal.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/common.sh
source "$SCRIPT_DIR/lib/common.sh"

DEPLOY_DIR="/opt/nexus"
ENV_FILE="$DEPLOY_DIR/.env"
WAL_ARCHIVE_DIR="/opt/nexus/wal-archive"
ENCRYPTION_KEY_FILE="/opt/nexus/secrets/backup-key.gpg"
RETENTION_DAYS=7
RCLONE_REMOTE="r2"
BACKUP_BUCKET="${R2_BACKUP_BUCKET_NAME:-kcc-backups}"
LOCK_FILE="/tmp/nexus-backup-wal.lock"
UPLOADED_MARKER_SUFFIX=".uploaded"

load_env "$ENV_FILE"
configure_rclone_r2 "$RCLONE_REMOTE"

exec 200>"$LOCK_FILE"
flock -n 200 || { log "Another WAL backup run is already in progress. Exiting."; exit 1; }

if [ ! -d "$WAL_ARCHIVE_DIR" ]; then
  log "Error: $WAL_ARCHIVE_DIR does not exist. Is WAL archiving configured in postgresql.conf?"
  exit 1
fi

shopt -s nullglob
new_segments=0

for wal_file in "$WAL_ARCHIVE_DIR"/*; do
  [ -f "$wal_file" ] || continue
  case "$wal_file" in
    *"$UPLOADED_MARKER_SUFFIX") continue ;;
    *.gpg) continue ;;
  esac
  marker="${wal_file}${UPLOADED_MARKER_SUFFIX}"
  [ -f "$marker" ] && continue

  new_segments=$((new_segments + 1))
  encrypted="${wal_file}.gpg"
  gpg --batch --yes --cipher-algo AES256 --passphrase-file "$ENCRYPTION_KEY_FILE" -c "$wal_file"
  rclone copy "$encrypted" "$RCLONE_REMOTE:$BACKUP_BUCKET/wal/"
  rm -f "$encrypted"
  touch "$marker"
done

log "Archived $new_segments new WAL segment(s) to ${RCLONE_REMOTE}:${BACKUP_BUCKET}/wal/"

log "Applying ${RETENTION_DAYS}-day retention policy (remote)..."
rclone delete "$RCLONE_REMOTE:$BACKUP_BUCKET/wal/" --min-age "${RETENTION_DAYS}d"

log "Pruning local WAL archive older than ${RETENTION_DAYS} days..."
find "$WAL_ARCHIVE_DIR" -type f -mtime "+${RETENTION_DAYS}" -delete

log "WAL backup completed successfully."