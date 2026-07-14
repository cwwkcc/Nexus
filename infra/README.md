# Infrastructure

This directory contains infrastructure configuration and scripts for deploying and managing Nexus in production.

## Directory Structure

```
infra/
├── postgres/           # PostgreSQL data volume (gitignored)
└── scripts/            # Operational scripts
    ├── backup.sh                    # Database backup with encryption
    ├── restore.sh                   # Database restore for disaster recovery
    ├── deploy.sh                    # Zero-downtime deployment
    ├── rotate-secret.sh             # Credential rotation
    └── rotate-breakglass-password.sh # Break-glass password rotation
```

## Scripts

### backup.sh

Automated database backup script that:

- Dumps the PostgreSQL database using `pg_dump`
- Compresses the backup with gzip
- Encrypts with GPG (AES256)
- Uploads to S3 for off-site storage
- Applies 30-day retention policy

**Usage:**

```bash
./infra/scripts/backup.sh
```

**Requirements:**

- PostgreSQL client tools
- GPG with encryption key at `/opt/nexus/secrets/backup-key.gpg`
- AWS CLI configured with S3 access
- Run via cron schedule (recommended: daily)

### restore.sh

Database restore script for disaster recovery and backup verification.

**Usage:**

```bash
# Restore from backup
./infra/scripts/restore.sh nexus_backup_20240113_120000.sql.gz.gpg

# Verify backup integrity only
./infra/scripts/restore.sh nexus_backup_20240113_120000.sql.gz.gpg --verify-only
```

**Safety:**

- Requires explicit confirmation before restore
- Stops application services during restore
- Supports verification mode without data modification

### deploy.sh

Zero-downtime deployment script called by GitHub Actions CD pipeline.

**Usage:**

```bash
./infra/scripts/deploy.sh <image_tag>
```

**Features:**

- Pulls new images from GHCR
- Creates rollback snapshot before deployment
- Waits for Docker healthchecks
- Automatic rollback on failure
- Health check verification for both web and admin

### rotate-secret.sh

Rotates credentials without service downtime.

**Usage:**

```bash
# Rotate with auto-generated password
./infra/scripts/rotate-secret.sh DB_PASSWORD

# Rotate with specific value
./infra/scripts/rotate-secret.sh NEXTAUTH_SECRET "my-new-secret"
```

**Supported secrets:**

- `DB_PASSWORD` - Database password
- `NEXTAUTH_SECRET` - Auth.js secret
- `R2_ACCESS_KEY` - Cloudflare R2 access key
- `R2_SECRET_KEY` - Cloudflare R2 secret key
- `RESEND_API_KEY` - Resend API key

### rotate-breakglass-password.sh

Server-side script for rotating the break-glass admin password directly in the database.

**Usage:**

```bash
./infra/scripts/rotate-breakglass-password.sh <new_password>
```

**Security:**

- Must be run over SSH on production server
- No internet-facing reset surface
- Password must be at least 16 characters
- Uses argon2id hashing

## Caddy Configuration

The Caddy reverse proxy configuration is located in `infra/caddy/Caddyfile` (mounted as `/etc/caddy/Caddyfile` in production).

**Features:**

- Automatic TLS via Let's Encrypt
- Reverse proxy for web (cwwkcc.lk) and admin (admin.cwwkcc.lk)
- Security headers: HSTS, CSP, X-Frame-Options, etc.

## PostgreSQL Data

The `infra/postgres/` directory contains the PostgreSQL data volume and is **gitignored**. This directory is mounted into the PostgreSQL container for persistent storage.

**Important:** Never commit this directory to version control.

## Production Setup

1. **Create directories:**

   ```bash
   sudo mkdir -p /opt/nexus/{backups,secrets}
   sudo chown -R $USER:$USER /opt/nexus
   ```

2. **Generate encryption key:**

   ```bash
   openssl rand -base64 32 > /opt/nexus/secrets/backup-key.gpg
   chmod 600 /opt/nexus/secrets/backup-key.gpg
   ```

3. **Configure environment variables:**

   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

4. **Set up cron for backups:**
   ```bash
   # Add to crontab: daily at 2 AM UTC
   0 2 * * * /opt/nexus/infra/scripts/backup.sh >> /var/log/nexus-backup.log 2>&1
   ```

## Security Considerations

- All scripts use `set -euo pipefail` for error handling
- Secrets are stored separately from backup files
- Break-glass password has no internet-facing reset surface
- All credentials can be rotated without downtime
- Backups are encrypted before upload to S3

## Disaster Recovery

See the Disaster Recovery Plan (F-178) for detailed procedures. Quick reference:

1. **Verify backup integrity:**

   ```bash
   ./infra/scripts/restore.sh <backup_file> --verify-only
   ```

2. **Restore from backup:**

   ```bash
   ./infra/scripts/restore.sh <backup_file>
   ```

3. **Verify services:**
   ```bash
   docker compose ps
   curl https://cwwkcc.lk/api/health
   curl https://admin.cwwkcc.lk/api/health
   ```
