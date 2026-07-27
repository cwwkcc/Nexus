# Nexus — Backup and Restore Procedure

**Complete guide for backups and restoration**

---

## Overview

**This document previously described a different backup system than what's actually implemented** — Cloudflare R2 + `rclone`, with encryption described only as "at rest in R2." The real scripts (`infra/scripts/backup.sh` and `infra/scripts/restore.sh`, documented authoritatively in `infra/README.md`) use **AWS S3 + GPG client-side encryption**, not R2/rclone at all. This revision is rebuilt from those real scripts.

This document covers:

1. **Backup Strategy** — What is backed up, how often, and where
2. **Backup Procedure** — How backups are performed
3. **Restore Procedure** — How to restore from a backup
4. **Verification** — How to verify a backup is valid

---

## Backup Strategy

### Database Backup

| Detail           | Specification                                                                                                                                                                                                                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frequency**    | Daily, recommended at 2:00 AM UTC (via cron — not yet actually scheduled anywhere; see Backup Procedure below)                                                                                                                                                                            |
| **Location**     | AWS S3 (`s3://nexus-backups-bucket`) — **not Cloudflare R2**. R2 is used elsewhere in the platform (media storage), but backups go to S3.                                                                                                                                                 |
| **Format**       | `pg_dump` SQL, gzip-compressed, then **GPG-encrypted (AES256)** before upload                                                                                                                                                                                                             |
| **Retention**    | 30 days, enforced by the script itself parsing `aws s3 ls` output and deleting anything older                                                                                                                                                                                             |
| **Encryption**   | Client-side GPG encryption _before_ upload — not just provider-side "encrypted at rest." The passphrase lives in a separate file, `/opt/nexus/secrets/backup-key.gpg`, which itself needs its own backup/rotation plan since losing it means every existing backup becomes unrecoverable. |
| **Verification** | Supported via `restore.sh <file> --verify-only` — not yet actually scheduled as a recurring weekly job anywhere                                                                                                                                                                           |

### Media Backup

**No script or automation for this exists in the codebase.** An earlier revision of this document described a nightly R2-to-R2 sync job (`kcc-backups/media/`) — there's no such script anywhere in `infra/scripts/`. Media currently has no backup story beyond whatever durability Cloudflare R2 itself provides for the live bucket.

### Transaction Log Backup (Point-in-Time Recovery)

**No script for this exists either.** An earlier revision described an hourly WAL-shipping setup — nothing in `infra/scripts/` does this. Point-in-time recovery, beyond restoring the most recent full nightly dump, isn't currently possible.

---

## Backup Procedure

### Automated Backups

**Not yet actually scheduled.** `infra/README.md`'s own setup instructions show the cron line as something to _add_ during production setup, not something already running:

```bash
# infra/README.md's documented setup step — confirm this has actually
# been added to the server's crontab, don't assume it has:
0 2 * * * /opt/nexus/infra/scripts/backup.sh >> /var/log/nexus-backup.log 2>&1
```

### Manual Backup

```bash
# 1. SSH into the server
ssh user@server-ip

# 2. Navigate to the project directory
cd /opt/nexus

# 3. Run the backup script
./infra/scripts/backup.sh

# 4. Verify the backup was uploaded
aws s3 ls s3://nexus-backups-bucket/
```

### What the Script Actually Does

`infra/scripts/backup.sh` (real contents, condensed):

```bash
#!/bin/bash
set -euo pipefail

BACKUP_DIR="/opt/nexus/backups"
RETENTION_DAYS=30
ENCRYPTION_KEY_FILE="/opt/nexus/secrets/backup-key.gpg"
DB_NAME="nexus"
DB_USER="nexus"
S3_BUCKET="s3://nexus-backups-bucket"

TIMESTAMP=$(date -u +"%Y%m%d_%H%M%S")
BACKUP_FILE="nexus_backup_${TIMESTAMP}.sql"

# Dump → compress → encrypt → upload → clean up local files → enforce retention
pg_dump -h localhost -p 5432 -U "$DB_USER" -d "$DB_NAME" > "$BACKUP_DIR/$BACKUP_FILE"
gzip "$BACKUP_DIR/$BACKUP_FILE"
gpg --batch --yes --cipher-algo AES256 --passphrase-file "$ENCRYPTION_KEY_FILE" -c "$BACKUP_DIR/${BACKUP_FILE}.gz"
aws s3 cp "$BACKUP_DIR/${BACKUP_FILE}.gz.gpg" "$S3_BUCKET/${BACKUP_FILE}.gz.gpg"
# ... cleans up local files, then deletes anything on S3 older than 30 days
```

Note `pg_dump` runs directly against `localhost:5432`, not through `docker compose exec` — this script assumes it runs on the host with direct Postgres access, or that the port is exposed to the host.

---

## Restore Procedure

### Prerequisites

- A known-good backup file (list them with `aws s3 ls s3://nexus-backups-bucket/`)
- Access to the Hetzner server
- The GPG decryption passphrase file at `/opt/nexus/secrets/backup-key.gpg`

### Restore from Backup

```bash
# 1. SSH into the server
ssh user@server-ip
cd /opt/nexus

# 2. Run the restore script — it handles everything below automatically:
#    download from S3 (if not already local) → decrypt → decompress →
#    confirm ("type 'yes' to continue") → stop nexus-web/nexus-admin →
#    drop and recreate the database → restore → restart services
./infra/scripts/restore.sh nexus_backup_20260113_020000.sql.gz.gpg
```

There's no separate manual step-by-step needed — `restore.sh` is the whole procedure, including its own safety confirmation prompt and service stop/start. Don't run the underlying `psql`/`gpg` commands by hand unless the script itself is broken.

### Verify a Backup Without Restoring

```bash
./infra/scripts/restore.sh nexus_backup_20260113_020000.sql.gz.gpg --verify-only
```

This downloads, decrypts, decompresses, and shows the first 20 lines of the SQL — without touching the live database.

### Point-in-Time Recovery

**Not currently possible.** No WAL-shipping or transaction-log backup exists (see Backup Strategy above) — restoring means restoring the most recent full nightly dump and accepting up to 24 hours of data loss.

---

## Verification

### Verify a Database Backup

Use `restore.sh`'s built-in verify mode (above) rather than hand-rolling a check — it already downloads, decrypts, and decompresses correctly, which a manual `grep` on the raw S3 object (still gzipped and GPG-encrypted) wouldn't.

### Verify Media

There's no media backup to verify (see Media Backup above).

---

## Backup Schedule

| Type            | Frequency                       | Status                                                                                |
| --------------- | ------------------------------- | ------------------------------------------------------------------------------------- |
| Full database   | Daily (recommended 2:00 AM UTC) | Script exists (`backup.sh`); confirm the cron job is actually installed on the server |
| Media sync      | —                               | **No script exists.**                                                                 |
| Transaction log | —                               | **No script exists.**                                                                 |

---

## Backup Checklist

- [ ] Confirm the cron job for `backup.sh` is actually installed on the production server (`crontab -l`)
- [ ] Backup uploaded to `s3://nexus-backups-bucket`
- [ ] Backup file size is > 0 bytes
- [ ] `restore.sh <file> --verify-only` runs cleanly
- [ ] Old backups (30+ days) are being cleaned up on S3
- [ ] The GPG passphrase file (`/opt/nexus/secrets/backup-key.gpg`) itself has a backup/recovery plan — losing it makes every existing backup unrecoverable

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

---

## Changelog

**This revision** — rebuilt entirely against the real `infra/scripts/backup.sh`/`restore.sh` and `infra/README.md`:

- Replaced Cloudflare R2 + `rclone` throughout with the real AWS S3 + GPG-encryption pipeline.
- Removed the Media Backup and Transaction Log Backup sections' implied automation — no scripts for either exist anywhere in the repo.
- Replaced the fabricated backup script contents and manual restore steps with the real script behavior, including the safety confirmation prompt and `--verify-only` mode that `restore.sh` actually has.
- Flagged that the backup cron job is documented as a setup step, not confirmed as actually running.
