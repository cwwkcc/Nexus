#!/bin/bash
set -euo pipefail

# Nightly media asset backup (F-061, F-134)
# Satisfies Appendix A §A.8.1 ("Media Assets — Nightly — Secondary storage —
# 30 days") and docs/operations/Backup and Restore Procedure.md ("Media
# Backup: Nightly, Cloudflare R2 kcc-backups/media/, sync of R2 bucket").
# This script did not exist before — R2_BUCKET_NAME had no backup at all.
#
# Primary media (R2_BUCKET_NAME, e.g. kcc-assets) is copied two ways:
#
#   1. Always: through an rclone `crypt` remote into the same R2 account
#      (r2crypt: -> r2:$BACKUP_BUCKET/media), encrypted with the same key
#      used for database backups — this is what satisfies F-134 for media,
#      which the docs otherwise leave unencrypted ("encrypted at rest in R2"
#      only). Uses --backup-dir so overwritten/deleted files move into a
#      dated folder instead of being clobbered — a plain "sync" has no
#      history, so without this the documented "30 days retention" for media
#      would not actually mean anything (there'd be nothing to recover from
#      an accidental delete propagated by the nightly sync itself).
#
#   2. Optionally: to a genuinely separate provider — the Hetzner Storage Box
#      already budgeted in Section 9 — if HETZNER_STORAGE_BOX_REMOTE is set
#      to a configured rclone remote (e.g. an SFTP remote). This is what
#      actually protects against the "R2 Storage Failure" scenario in the
#      Disaster Recovery Plan ("secondary backups to a separate storage
#      provider"); an R2-to-R2 copy alone does not.
#
# Run nightly via cron (docs specify 0 3 * * *):
#   0 3 * * * /opt/nexus/scripts/backup-media.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/common.sh
source "$SCRIPT_DIR/lib/common.sh"

DEPLOY_DIR="/opt/nexus"
ENV_FILE="$DEPLOY_DIR/.env"
ENCRYPTION_KEY_FILE="/opt/nexus/secrets/backup-key.gpg"
RETENTION_DAYS=30
RCLONE_REMOTE="r2"
BACKUP_BUCKET="${R2_BACKUP_BUCKET_NAME:-kcc-backups}"
LOCK_FILE="/tmp/nexus-backup-media.lock"

load_env "$ENV_FILE"
configure_rclone_r2 "$RCLONE_REMOTE"

: "${R2_BUCKET_NAME:?R2_BUCKET_NAME not set — check the .env file was loaded}"
PRIMARY_BUCKET="$R2_BUCKET_NAME"

configure_rclone_crypt "r2crypt" "$RCLONE_REMOTE:$BACKUP_BUCKET/media" "$ENCRYPTION_KEY_FILE"

exec 200>"$LOCK_FILE"
flock -n 200 || { log "Another media backup run is already in progress. Exiting."; exit 1; }

BACKUP_DATE=$(date -u +"%Y%m%d")

log "Syncing $PRIMARY_BUCKET -> r2crypt: (encrypted, same R2 account)..."
rclone sync "$RCLONE_REMOTE:$PRIMARY_BUCKET" "r2crypt:current" \
  --backup-dir "r2crypt:versions/$BACKUP_DATE" \
  --fast-list

log "Pruning encrypted version history older than ${RETENTION_DAYS} days..."
rclone delete "r2crypt:versions" --min-age "${RETENTION_DAYS}d"

if [ -n "${HETZNER_STORAGE_BOX_REMOTE:-}" ]; then
  log "Syncing $PRIMARY_BUCKET -> $HETZNER_STORAGE_BOX_REMOTE (separate provider)..."
  rclone sync "$RCLONE_REMOTE:$PRIMARY_BUCKET" "${HETZNER_STORAGE_BOX_REMOTE}/current" \
    --backup-dir "${HETZNER_STORAGE_BOX_REMOTE}/versions/$BACKUP_DATE" \
    --fast-list
  rclone delete "${HETZNER_STORAGE_BOX_REMOTE}/versions" --min-age "${RETENTION_DAYS}d"
else
  log "HETZNER_STORAGE_BOX_REMOTE not set — skipping true off-provider secondary copy."
  log "Note: the R2-failure scenario in the Disaster Recovery Plan assumes this exists."
fi

log "Media backup completed successfully."
