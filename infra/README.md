# Infrastructure

This directory contains infrastructure configuration and scripts for deploying and managing Nexus in production.

## Directory Structure

```
infra/
├── postgres/                # PostgreSQL data volume (gitignored)
└── scripts/
    ├── lib/
    │   └── common.sh                     # Shared helpers (env loading, rclone/R2 setup)
    ├── backup.sh                         # Nightly database backup → R2
    ├── backup-wal.sh                     # Hourly transaction log backup → R2
    ├── backup-media.sh                   # Nightly media asset backup → R2 (+ optional Storage Box)
    ├── restore.sh                        # Database restore for disaster recovery
    ├── deploy.sh                         # Zero-downtime deployment
    ├── rotate-secret.sh                  # Credential rotation
    └── rotate-breakglass-password.sh     # Break-glass password rotation
```

## Backup Strategy

Matches Appendix A §A.8.1 of the Project Proposal and `docs/operations/Backup and Restore Procedure.md`:

| Type             | Schedule      | Destination                                                                          | Retention |
| ---------------- | ------------- | ------------------------------------------------------------------------------------ | --------- |
| Database (full)  | Nightly, 2 AM | Cloudflare R2 (`kcc-backups/database/`)                                              | 30 days   |
| Transaction logs | Hourly        | Cloudflare R2 (`kcc-backups/wal/`)                                                   | 7 days    |
| Media assets     | Nightly, 3 AM | Cloudflare R2 (encrypted, `kcc-backups/media/`), optionally also Hetzner Storage Box | 30 days   |

All backups are **encrypted before leaving the server** (F-134), with the encryption key stored separately from the backups at `/opt/nexus/secrets/backup-key.gpg`. Off-site storage is **Cloudflare R2**, not AWS — R2 is what's budgeted (Section 9) and specified (Appendix A); there is no AWS dependency anywhere in this stack.

### Cron

```bash
0 2 * * * /opt/nexus/scripts/backup.sh
0 3 * * * /opt/nexus/scripts/backup-media.sh
0 * * * * /opt/nexus/scripts/backup-wal.sh
```

### Prerequisite for `backup-wal.sh`

WAL archiving must be enabled in Postgres itself before this script has anything to ship. See the comment block at the top of `backup-wal.sh` for the required `postgresql.conf` / `docker-compose.yml` settings.

### Prerequisite for `backup-media.sh`'s Hetzner Storage Box copy

Set `HETZNER_STORAGE_BOX_REMOTE` in `.env` to a configured rclone remote (e.g. an SFTP remote pointing at the Storage Box) to get a real off-provider secondary copy, per the Disaster Recovery Plan's R2-failure mitigation. Without it, the script still runs (R2-to-R2 encrypted copy) but logs a reminder that the true secondary copy isn't configured.

## Scripts

### backup.sh

- Dumps the database with `pg_dump` **inside** the postgres container (Postgres is internal-only — no host-exposed DB port)
- Compresses with gzip, encrypts with GPG (AES256)
- Uploads to R2 via `rclone`
- Applies 30-day retention via `rclone delete --min-age 30d`

**Requirements:** `rclone`, GPG with encryption key at `/opt/nexus/secrets/backup-key.gpg`, `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` / `R2_ENDPOINT` in `.env`.

### backup-wal.sh

Ships archived WAL segments to R2 hourly for point-in-time recovery. See prerequisite above.

### backup-media.sh

Syncs the primary media bucket into an encrypted R2 path, versioned so accidental deletions upstream don't propagate silently. Optionally also syncs to a genuinely separate provider (Hetzner Storage Box) if configured.

### restore.sh

```bash
# Restore from backup
./infra/scripts/restore.sh nexus_backup_20260113_020000.sql.gz.gpg

# Verify backup integrity only
./infra/scripts/restore.sh nexus_backup_20260113_020000.sql.gz.gpg --verify-only
```

Downloads from R2 via `rclone`, decrypts with GPG, restores inside the postgres container. Requires explicit `yes` confirmation before a destructive restore; `--verify-only` never touches the live database.

### deploy.sh

Unchanged — already matched the Deployment Checklist and Appendix A §A.7.

```bash
./infra/scripts/deploy.sh <image_tag>
```

### rotate-secret.sh

```bash
./infra/scripts/rotate-secret.sh <secret_name> [new_value]
# Available secrets: DB_PASSWORD, NEXTAUTH_SECRET, R2_ACCESS_KEY, R2_SECRET_KEY, RESEND_API_KEY
```

`DB_PASSWORD` actually rotates the Postgres role's password (`ALTER ROLE ... WITH PASSWORD`) and updates only the password segment of `DATABASE_URL`, rather than overwriting the whole connection string. Backs up `.env` first and restores it automatically if the affected services don't come back up.

### rotate-breakglass-password.sh

```bash
./infra/scripts/rotate-breakglass-password.sh <new_password>
```

Rotates the break-glass admin password directly in the database (min. 16 characters, argon2id hash). Reads the account email from `ADMIN_EMAIL` in `.env` rather than hardcoding it.

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**
