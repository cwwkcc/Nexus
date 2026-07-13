#!/bin/bash
set -euo pipefail

# Database restore script (F-049, F-178)
# Used for disaster recovery and backup verification.
# Documented step-by-step in Disaster Recovery Plan (F-178).

# Configuration
BACKUP_DIR="/opt/nexus/backups"
ENCRYPTION_KEY_FILE="/opt/nexus/secrets/backup-key.gpg"
DB_NAME="nexus"
DB_USER="nexus"
DB_HOST="localhost"
DB_PORT="5432"
S3_BUCKET="s3://nexus-backups-bucket"

# Check arguments
if [ $# -lt 1 ]; then
  echo "Usage: $0 <backup_file.gpg> [--verify-only]"
  echo "Example: $0 nexus_backup_20240113_120000.sql.gz.gpg"
  echo "Example: $0 nexus_backup_20240113_120000.sql.gz.gpg --verify-only"
  exit 1
fi

BACKUP_FILE="$1"
VERIFY_ONLY="${2:-}"

# Download from S3 if not local
if [ ! -f "$BACKUP_DIR/$BACKUP_FILE" ]; then
  echo "Downloading backup from S3..."
  aws s3 cp "$S3_BUCKET/$BACKUP_FILE" "$BACKUP_DIR/$BACKUP_FILE"
fi

# Decrypt
echo "Decrypting backup..."
DECRYPTED_FILE="${BACKUP_FILE%.gpg}"
gpg --batch --yes --passphrase-file "$ENCRYPTION_KEY_FILE" -d "$BACKUP_DIR/$BACKUP_FILE" > "$BACKUP_DIR/$DECRYPTED_FILE"

# Decompress
echo "Decompressing backup..."
SQL_FILE="${DECRYPTED_FILE%.gz}"
gunzip -c "$BACKUP_DIR/$DECRYPTED_FILE" > "$BACKUP_DIR/$SQL_FILE"

if [ "$VERIFY_ONLY" = "--verify-only" ]; then
  echo "Verifying backup integrity..."
  head -n 20 "$BACKUP_DIR/$SQL_FILE"
  echo "Backup verification completed successfully."
  rm -f "$BACKUP_DIR/$DECRYPTED_FILE" "$BACKUP_DIR/$SQL_FILE"
  exit 0
fi

# Confirm restore
echo "WARNING: This will replace the entire database '$DB_NAME'."
read -p "Are you sure? Type 'yes' to continue: " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
  echo "Restore cancelled."
  rm -f "$BACKUP_DIR/$DECRYPTED_FILE" "$BACKUP_DIR/$SQL_FILE"
  exit 1
fi

# Stop application services
echo "Stopping application services..."
docker compose stop nexus-web nexus-admin

# Drop existing database
echo "Dropping existing database..."
docker compose exec -T postgres psql -U "$DB_USER" -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"
docker compose exec -T postgres psql -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME;"

# Restore database
echo "Restoring database..."
docker compose exec -T postgres psql -U "$DB_USER" -d "$DB_NAME" < "$BACKUP_DIR/$SQL_FILE"

# Clean up
rm -f "$BACKUP_DIR/$DECRYPTED_FILE" "$BACKUP_DIR/$SQL_FILE"

# Start application services
echo "Starting application services..."
docker compose start nexus-web nexus-admin

echo "Restore completed successfully."
