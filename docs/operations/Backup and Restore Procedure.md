# Nexus — Backup and Restore Procedure

**Complete guide for backups and restoration**

---

## Overview

This document covers:

1. **Backup Strategy** — What is backed up, how often, and where
2. **Backup Procedure** — How backups are performed
3. **Restore Procedure** — How to restore from a backup
4. **Verification** — How to verify a backup is valid

---

## Backup Strategy

### Database Backup

| Detail | Specification |
|--------|---------------|
| **Frequency** | Nightly (every day at 2:00 AM) |
| **Location** | Cloudflare R2 (`kcc-backups/database/`) |
| **Format** | Compressed SQL dump (`.sql.gz`) |
| **Retention** | 30 days |
| **Encryption** | Encrypted at rest in R2 |
| **Verification** | Weekly restore test |

### Media Backup

| Detail | Specification |
|--------|---------------|
| **Frequency** | Nightly (every day at 3:00 AM) |
| **Location** | Cloudflare R2 (`kcc-backups/media/`) |
| **Format** | Sync of R2 bucket |
| **Retention** | 30 days |
| **Encryption** | Encrypted at rest in R2 |

### Transaction Log Backup (Optional)

| Detail | Specification |
|--------|---------------|
| **Frequency** | Hourly |
| **Location** | Cloudflare R2 (`kcc-backups/wal/`) |
| **Format** | PostgreSQL WAL files |
| **Retention** | 7 days |
| **Purpose** | Point-in-time recovery |

---

## Backup Procedure

### Automated Backups

Backups are automated via a cron job on the Hetzner server:

```bash
# Backup script location
/opt/nexus/scripts/backup.sh

# Cron job
0 2 * * * /opt/nexus/scripts/backup.sh
```

### Manual Backup

```bash
# 1. SSH into the server
ssh user@server-ip

# 2. Navigate to the project directory
cd /opt/nexus

# 3. Run the backup script
./scripts/backup.sh

# 4. Verify the backup was created
rclone ls r2:kcc-backups/database/

# 5. Check the backup file size (should be > 0 bytes)
```

### Backup Script Contents

```bash
#!/bin/bash
# /opt/nexus/scripts/backup.sh

# Set variables
BACKUP_DIR="/tmp/nexus-backup"
DATE=$(date +%Y-%m-%d)
DB_NAME="nexus"
DB_USER="nexus"

# Create backup directory
mkdir -p $BACKUP_DIR

# Dump database
docker compose exec -T postgres pg_dump -U $DB_USER $DB_NAME | gzip > $BACKUP_DIR/backup-$DATE.sql.gz

# Upload to R2
rclone copy $BACKUP_DIR/backup-$DATE.sql.gz r2:kcc-backups/database/

# Clean up
rm -f $BACKUP_DIR/backup-$DATE.sql.gz

# Delete backups older than 30 days
rclone delete r2:kcc-backups/database/ --min-age 30d
```

---

## Restore Procedure

### Prerequisites

- A known-good backup file (latest nightly backup or a specific backup)
- Access to the Hetzner server
- The database service running

### Restore from Backup

```bash
# 1. SSH into the server
ssh user@server-ip

# 2. Stop the web and admin services (prevent writes during restore)
cd /opt/nexus
docker compose stop nexus-web nexus-admin

# 3. Identify the backup to restore
rclone ls r2:kcc-backups/database/

# 4. Download the backup
rclone copy r2:kcc-backups/database/backup-YYYY-MM-DD.sql.gz /tmp/

# 5. Drop and recreate the database
docker compose exec postgres psql -U nexus -c "DROP DATABASE IF EXISTS nexus;"
docker compose exec postgres psql -U nexus -c "CREATE DATABASE nexus;"

# 6. Restore the backup
gunzip -c /tmp/backup-YYYY-MM-DD.sql.gz | docker compose exec -T postgres psql -U nexus -d nexus

# 7. Restart all services
docker compose up -d

# 8. Verify the data is restored
# Check the admin panel and public site for correct content
```

### Point-in-Time Recovery (Optional)

If you have transaction log backups enabled, you can restore to a specific point in time:

```bash
# 1. Restore from the latest full backup
# 2. Apply WAL logs up to the target time
# This requires pg_restore and WAL replay
```

---

## Verification

### Verify Database Backup

```bash
# 1. Download the backup
rclone copy r2:kcc-backups/database/backup-YYYY-MM-DD.sql.gz /tmp/

# 2. Extract and test
gunzip -c /tmp/backup-YYYY-MM-DD.sql.gz | head -100

# 3. Verify the backup contains valid SQL
grep -i "CREATE TABLE" /tmp/backup-YYYY-MM-DD.sql
grep -i "INSERT INTO" /tmp/backup-YYYY-MM-DD.sql
```

### Verify Media Backup

```bash
# 1. Check the media backup exists
rclone ls r2:kcc-backups/media/

# 2. Verify the backup size matches the source
rclone size kcc-assets/
rclone size r2:kcc-backups/media/
```

---

## Backup Schedule

| Type | Frequency | Time | Retention | Purpose |
|------|-----------|------|-----------|---------|
| Full database | Nightly | 2:00 AM | 30 days | Full recovery |
| Media sync | Nightly | 3:00 AM | 30 days | Media recovery |
| Transaction log | Hourly | :00 | 7 days | Point-in-time recovery |

---

## Backup Checklist

- [ ] Nightly backup completed successfully
- [ ] Backup uploaded to R2
- [ ] Backup file size is > 0 bytes
- [ ] Backup contains valid SQL
- [ ] Old backups cleaned up

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

---

