# Nexus — Disaster Recovery Plan

**Prepared for all failure scenarios**

---

## Principles

1. **Every backup is tested.** A backup that has never been restored is not a backup.
2. **Every procedure is documented.** No institutional knowledge lives in one person's head.
3. **Every failure has a known recovery time.** We can tell the school how long recovery will take.

---

## Failure Scenarios

### 1. Server Failure

**Description:** The Hetzner server becomes unresponsive, crashes, or is unreachable.

**Symptoms:**

- UptimeRobot alerts for both `cwwkcc.lk` and `admin.cwwkcc.lk`
- Unable to SSH into the server
- Website returns 500 or connection refused errors

**Recovery Time:** 2-4 hours

**Procedure:**

```bash
# 1. Verify the server is actually down
# Check Hetzner Console → Server Status

# 2. If the server is unreachable, provision a new server
# In Hetzner Console: Create a new CPX22 server
# Note: Use the same OS (Ubuntu 22.04)

# 3. Install Docker and Docker Compose on the new server
ssh root@new-server-ip
apt update && apt install -y docker.io docker-compose-plugin

# 4. Create the deployment user
useradd -m -s /bin/bash deploy
usermod -aG docker deploy

# 5. Set up SSH keys (copy from the previous server or use a backup)

# 6. Clone the repository or copy the docker-compose.yml
git clone https://github.com/kits/nexus.git /opt/nexus

# 7. Restore the environment variables
# Copy from the previous server's .env file (stored securely)

# 8. Pull the latest images
docker compose pull

# 9. Restore the database (see Restoring from Database Backup in Runbook.md)

# 10. Update DNS to point to the new server IP
# Update Cloudflare DNS records

# 11. Verify the site works
curl https://cwwkcc.lk/api/health
```

**Post-Recovery:**

- Update the server IP in documentation
- Update any hardcoded IP references
- Schedule a root cause analysis

---

### 2. Database Corruption

**Description:** The PostgreSQL database becomes corrupted, or data is accidentally deleted.

**Symptoms:**

- Pages fail to load with database errors
- Admin panel shows errors when trying to view content
- Some content is missing or shows incorrect data

**Recovery Time:** 1-2 hours

**Procedure:**

```bash
# 1. Stop the web and admin services (prevent writes during restore)
cd /opt/nexus
docker compose stop nexus-web nexus-admin

# 2. Identify the most recent known-good backup
# Backups are stored in Cloudflare R2: kcc-backups/database/
rclone ls r2:kcc-backups/database/

# 3. Download the backup
rclone copy r2:kcc-backups/database/backup-YYYY-MM-DD.sql.gz /tmp/

# 4. Drop and recreate the database
docker compose exec postgres psql -U nexus -c "DROP DATABASE IF EXISTS nexus;"
docker compose exec postgres psql -U nexus -c "CREATE DATABASE nexus;"

# 5. Restore the backup
gunzip -c /tmp/backup-YYYY-MM-DD.sql.gz | docker compose exec -T postgres psql -U nexus -d nexus

# 6. Restart all services
docker compose up -d

# 7. Verify the data is restored
# Check the admin panel and public site for correct content
```

**Prevention:**

- Nightly automated backups
- Soft-delete pattern (content is never hard-deleted)
- Hourly transaction log backups for critical tables

---

### 3. Accidental Content Deletion

**Description:** A staff editor deletes content that should not have been deleted.

**Symptoms:**

- Content is missing from the public site
- Audit log shows a deletion by a specific user

**Recovery Time:** 30-60 minutes

**Procedure:**

```bash
# 1. Identify the deleted content from the audit log
# Admin panel → Audit Log → Filter by entity type and action

# 2. If using soft-delete, recover from the database directly
docker compose exec postgres psql -U nexus

# 3. For soft-deleted records, update deletedAt to NULL
UPDATE "News" SET "deletedAt" = NULL WHERE id = '...';

# 4. If hard-deleted, restore from the most recent backup
# Use the database restore procedure above

# 5. Notify the editor that the content has been restored
```

**Prevention:**

- Soft-delete pattern (deletedAt timestamp)
- Regular backups
- Editor training on proper deletion workflows

---

### 4. Domain Loss

**Description:** The `cwwkcc.lk` domain registration lapses or is transferred incorrectly.

**Symptoms:**

- The site is unreachable
- The domain shows a "parked" or "expired" page

**Recovery Time:** Hours to Days

**Procedure:**

```bash
# 1. Contact the domain registrar immediately
# The registrar details are stored in the administration office

# 2. If the domain has expired, renew it
# Payment may be required immediately

# 3. If the domain has been transferred, contact the new registrar
# Provide proof of institutional ownership

# 4. Once control is regained, verify DNS records
# Update Cloudflare DNS to point to the correct IP

# 5. Verify the site is accessible
```

**Prevention:**

- Domain registrar credentials are stored securely with school administration
- Auto-renewal is enabled
- Multiple people know the registrar credentials
- Domain renewal is on the school's calendar

---

### 5. R2 Storage Failure

**Description:** Cloudflare R2 becomes unavailable or data is lost.

**Symptoms:**

- Images and PDFs fail to load
- Admin panel shows upload errors

**Recovery Time:** Hours

**Procedure:**

```bash
# 1. Verify the issue is with R2, not the application
# Check R2 status page and logs

# 2. If R2 is temporarily unavailable:
# Wait for Cloudflare to restore service
# Images will load again automatically

# 3. If data is lost:
# Restore from secondary backup
# The backup procedure is documented in Backup-Restore-Procedure.md

# 4. If R2 is permanently inaccessible:
# Migrate to an alternative storage provider (e.g., Backblaze B2)
# Update the R2 credentials in environment variables
# Update the application to use the new provider
```

**Prevention:**

- Secondary backups to a separate storage provider
- S3-compatible API allows migration to other providers
- Media assets are also backed up to the primary server

---

### 6. GitHub Repository Loss

**Description:** The GitHub repository becomes inaccessible or is deleted.

**Symptoms:**

- Unable to deploy changes
- Code is unavailable

**Recovery Time:** Hours

**Procedure:**

```bash
# 1. Every developer who has cloned the repository has a full copy
# Contact any active developer to get the latest code

# 2. If the repository was deleted:
# Recreate the repository on GitHub
# Push the latest code from any developer's local clone

# 3. If GitHub is inaccessible:
# Wait for GitHub to restore service
# Or use an existing local clone for emergency deployment

# 4. Update the CI/CD pipeline to point to the new repository
```

**Prevention:**

- Multiple developers have local clones
- Repository is mirrored to a second location (e.g., GitLab or Bitbucket)
- Regular `git push` to both remotes

---

## Table of Recovery Times

| Failure Mode        | Recovery Time | Responsible Person        |
| ------------------- | ------------- | ------------------------- |
| Server failure      | 2-4 hours     | KITS Lead / Staff Advisor |
| Database corruption | 1-2 hours     | KITS Lead                 |
| Accidental deletion | 30-60 minutes | KITS Lead                 |
| Domain loss         | Hours-Days    | Administration            |
| R2 failure          | Hours         | KITS Lead                 |
| GitHub loss         | Hours         | KITS Lead                 |

---

## Contact Tree

| Level | Role                                   | Contact Method                   |
| ----- | -------------------------------------- | -------------------------------- |
| 1     | KITS Lead                              | Phone (primary), WhatsApp, Email |
| 2     | Staff Advisor (Mrs. Tharindrie Perera) | Phone, Email                     |
| 3     | Principal                              | Phone, Email                     |

---

## Testing Schedule

| Procedure                    | Frequency | Status          |
| ---------------------------- | --------- | --------------- |
| Database restore from backup | Quarterly | To be tested    |
| Server rebuild from scratch  | Annually  | To be tested    |
| Credential rotation          | Annually  | To be scheduled |

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

---
