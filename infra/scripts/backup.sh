#!/bin/bash
set -euo pipefail

# Automated database backup script (F-049)
# pg_dump → compress → encrypt → upload to off-site storage.
# Run on schedule. Retention policy enforced.
# Encryption key stored separately from backup files (F-120).

# Configuration
BACKUP_DIR="/opt/nexus/backups"
RETENTION_DAYS=30
ENCRYPTION_KEY_FILE="/opt/nexus/secrets/backup-key.gpg"
DB_NAME="nexus"
DB_USER="nexus"
DB_HOST="localhost"
DB_PORT="5432"
S3_BUCKET="s3://nexus-backups-bucket"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Generate timestamp
TIMESTAMP=$(date -u +"%Y%m%d_%H%M%S")
BACKUP_FILE="nexus_backup_${TIMESTAMP}.sql"
COMPRESSED_FILE="${BACKUP_FILE}.gz"
ENCRYPTED_FILE="${COMPRESSED_FILE}.gpg"

# Dump database
echo "Starting database backup..."
pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" > "$BACKUP_DIR/$BACKUP_FILE"

# Compress
echo "Compressing backup..."
gzip "$BACKUP_DIR/$BACKUP_FILE"

# Encrypt
echo "Encrypting backup..."
gpg --batch --yes --cipher-algo AES256 --compress-algo 1 --passphrase-file "$ENCRYPTION_KEY_FILE" -c "$BACKUP_DIR/$COMPRESSED_FILE"

# Upload to S3
echo "Uploading to S3..."
aws s3 cp "$BACKUP_DIR/$ENCRYPTED_FILE" "$S3_BUCKET/$ENCRYPTED_FILE"

# Clean up local files
rm -f "$BACKUP_DIR/$COMPRESSED_FILE" "$BACKUP_DIR/$ENCRYPTED_FILE"

# Apply retention policy
echo "Applying retention policy..."
aws s3 ls "$S3_BUCKET/" | while read -r line; do
  FILE_DATE=$(echo "$line" | awk '{print $2}' | cut -d_ -f1)
  FILE_DAYS=$(( ($(date +%s) - $(date -d "$FILE_DATE" +%s)) / 86400 ))
  if [ "$FILE_DAYS" -gt "$RETENTION_DAYS" ]; then
    FILE_NAME=$(echo "$line" | awk '{print $4}')
    aws s3 rm "$S3_BUCKET/$FILE_NAME"
  fi
done

echo "Backup completed successfully: $ENCRYPTED_FILE"
