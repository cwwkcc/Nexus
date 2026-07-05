# Nexus — Operational Runbook

**A step-by-step guide for daily operations**

---

## Table of Contents

1. [Deploying Changes]
2. [Rolling Back a Deployment]
3. [Restoring from Database Backup]
4. [Adding a New Admin User]
5. [Adding a New Language]
6. [Debugging a Failing API Route]
7. [Renewing a TLS Certificate]
8. [Scaling the Server]
9. [Monitoring Server Health]

---

## Deploying Changes

### When to Deploy

- After merging a pull request to `main`
- For emergency fixes (security patches, critical bugs)

### Automatic Deployment (Default)

1. Push changes to `main` branch
2. GitHub Actions automatically builds and deploys
3. Monitor the Actions tab for success/failure
4. Verify the site is working at `https://cwwkcc.lk`

### Manual Deployment (If Needed)

```bash
# 1. SSH into the server
ssh user@server-ip

# 2. Navigate to the project directory
cd /opt/nexus

# 3. Pull the latest images
docker compose pull

# 4. Restart services
docker compose up -d

# 5. Check health
curl https://cwwkcc.lk/api/health
curl https://admin.cwwkcc.lk/api/health
```

### Verifying a Successful Deployment

1. Check the site loads: `https://cwwkcc.lk`
2. Check the admin panel loads: `https://admin.cwwkcc.lk`
3. Check the health endpoints return `{"status":"ok"}`
4. Check the database is accessible (visit any page that queries data)
5. Check a `ContentEntry`-backed page renders its published content correctly (e.g. About page)

---

## Rolling Back a Deployment

### When to Roll Back

- If a deployment causes errors or downtime
- If a critical bug is discovered after deployment
- If performance degrades significantly

### Rollback Procedure

```bash
# 1. SSH into the server
ssh user@server-ip

# 2. Navigate to the project directory
cd /opt/nexus

# 3. Get the previous image tag
# GitHub Container Registry stores images with commit SHA tags
# Check the GitHub Actions run to find the previous successful commit SHA

# 4. Pull the previous image
docker pull ghcr.io/kits/nexus-web:previous-commit-sha
docker pull ghcr.io/kits/nexus-admin:previous-commit-sha

# 5. Update docker-compose.yml to use the previous image tags
# Edit the image: lines to point to the previous commit SHA

# 6. Restart services
docker compose up -d

# 7. Verify the site is working
curl https://cwwkcc.lk/api/health
```

---

## Restoring from Database Backup

### When to Restore

- If the database is corrupted
- If data is accidentally deleted
- If an admin error causes data loss

### Prerequisites

- A known-good backup file (latest nightly backup)
- Access to the Hetzner server

### Restore Procedure

```bash
# 1. SSH into the server
ssh user@server-ip

# 2. Stop the web and admin services (prevent writes during restore)
cd /opt/nexus
docker compose stop nexus-web nexus-admin

# 3. Locate the backup file
# Backups are stored in Cloudflare R2: kcc-backups/database/
# Download the latest backup
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

# 8. Notify the staff advisor that the restore is complete
```

### Estimated Recovery Time

- **1-2 hours** (depending on database size)

### Data Loss

- **Up to 24 hours** (nightly backups only)
- To reduce data loss, consider adding hourly transaction log backups

---

## Adding a New Admin User

### When to Add

- When a new staff member needs access to the admin panel
- When a KITS member needs editing permissions

### Procedure

1. Ensure the user has a `@cwwkcc.lk` Google Workspace account
2. Log in to the admin panel as an Admin user
3. Navigate to **Settings → Users**
4. Click **Add User**
5. Enter the user's email address (must be `@cwwkcc.lk`)
6. Select the role: **Admin** (full access) or **Editor** (content only)
7. Click **Save**
8. The user will be able to sign in with their Google account

### Role Permissions

|Permission|Admin|Editor|
|---|---|---|
|Create/edit content|✅|✅|
|Publish content|✅|✅|
|Delete content|✅|❌|
|Manage users|✅|❌|
|Access settings|✅|❌|
|View audit log|✅|✅|

---

## Adding a New Language

### When to Add

- Currently, the platform supports English, Sinhala, and Tamil
- Adding a new language is a complex task — only do it if there is a genuine need

### Procedure

1. **Update the next-intl configuration**
    
    - Add the new locale to `i18n/routing.ts`
    - Add the locale to the `locales` array
2. **Add translation files**
    
    - Create new JSON files in `apps/web/src/i18n/messages/[locale]/`
    - Copy all keys from English and translate them
    - Every key that exists in English must exist in the new locale
3. **Add font support**
    
    - Add the new script's fonts to `next/font` configuration
    - Update the font stack in `packages/config`
4. **Update the LanguageSwitcher component**
    
    - Add the new language option
5. **Test thoroughly**
    
    - Every page must work in the new locale
    - Check for text overflow (some scripts take more space)
    - Check for correct font rendering

---

## Debugging a Failing API Route

### When to Debug

- When an API route returns an error
- When a page fails to load data
- When an admin action fails

### Debugging Procedure

```bash
# 1. Check the logs
docker compose logs nexus-web | grep -i error
docker compose logs nexus-admin | grep -i error

# 2. Check the database
docker compose exec postgres psql -U nexus -c "SELECT * FROM ..."

# 3. Check tRPC errors
# Look for tRPC error messages in the browser dev tools network tab

# 4. Check the environment variables
# Ensure all required variables are set correctly

# 5. Restart the specific service if needed
docker compose restart nexus-web
```

### Common Issues

|Symptom|Likely Cause|Solution|
|---|---|---|
|Database connection error|`DATABASE_URL` is wrong|Check environment variables|
|Authentication error|Google OAuth misconfigured|Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`|
|Image not loading|R2 bucket not accessible|Check R2 credentials and CORS configuration|
|404 on API route|tRPC router not registered|Check the router is exported and imported correctly|

---

## Renewing a TLS Certificate

### When to Renew

- Caddy automatically renews certificates via Let's Encrypt
- No manual action is normally required
- If automatic renewal fails, you will receive an email alert

### Manual Renewal (If Needed)

```bash
# 1. SSH into the server
ssh user@server-ip

# 2. Force Caddy to renew certificates
docker compose exec caddy caddy renew --force

# 3. Restart Caddy
docker compose restart caddy

# 4. Verify the certificate
curl -vI https://cwwkcc.lk
# Check the SSL certificate expiry date in the response
```

### Certificate Details

|Detail|Value|
|---|---|
|Issuer|Let's Encrypt|
|Renewal Frequency|90 days (auto-renewal at 30 days)|
|Domains|`cwwkcc.lk`, `admin.cwwkcc.lk`|

---

## Scaling the Server

### When to Scale

- When traffic exceeds current capacity
- When the database response times degrade
- During a high-traffic event (news going viral, admissions period, open house)

### Scaling Options

#### Option 1: Vertical Scaling (Upgrade Server)

1. Log in to Hetzner Console
2. Stop the server
3. Upgrade to a larger plan (e.g., CPX32: 4 vCPU, 8 GB RAM)
4. Start the server
5. Verify the site works

#### Option 2: Horizontal Scaling (Multiple Instances)

1. Add a second Hetzner server
2. Set up the same Docker Compose configuration
3. Load balance between the two servers using Cloudflare
4. This is more complex and rarely needed for school traffic

#### Option 3: Database Optimisation (Before Scaling)

1. Check the PostgreSQL slow query log
2. Add database indexes for slow queries
3. Increase connection pool size
4. Consider read replicas if `ContentEntry` reads become a bottleneck (unlikely given tag-based caching, F-195)

---

## Monitoring Server Health

### Health Checks

|Service|Check Command|
|---|---|
|Public site|`curl -f https://cwwkcc.lk/api/health`|
|Admin panel|`curl -f https://admin.cwwkcc.lk/api/health`|
|Database|`docker compose exec postgres pg_isready`|

### Alerts

- UptimeRobot monitors `cwwkcc.lk` and `admin.cwwkcc.lk` every 5 minutes
- Alerts are sent to the KITS lead's email and phone
- Database backups are checked nightly

### Common Issues and Solutions

|Issue|Solution|
|---|---|
|High CPU usage|Check for a memory leak; restart the affected service|
|High memory usage|Restart the affected service; consider upgrading server|
|Slow page loads|Check database query performance; add indexes|
|Out of disk space|Clean up old Docker images: `docker system prune`|

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

---

---

## Changelog

**This revision** — audited against Feature Registry F-001–F-196 (source of truth): replaced three results-portal references (deployment verification step, scaling triggers, read-replica rationale) with equivalents that match the actual `ContentEntry`/tag-based-caching architecture (F-056, F-195); the results portal was cut from scope.