## Overview

Nexus runs on a single **Hetzner VPS** with Docker Compose. This document describes the production infrastructure, deployment pipeline, environment configuration, and disaster recovery procedures.

**Key principle:** No third-party CMS, no serverless functions – everything self-hosted on school-controlled hardware.

---

## Architecture Diagram

```
User → Cloudflare DNS → Hetzner VPS (Caddy reverse proxy) → Docker containers:
                                                             ├── nexus-web (Next.js)
                                                             ├── nexus-admin (Next.js)
                                                             ├── postgres (database)
                                                             ├── umami (analytics)
                                                             └── caddy (HTTPS)
                                         ↓
                              Cloudflare R2 (file storage)
                                         ↓
                              Resend (email notifications)
```

---

## Hosting Components

|Component|Technology|Purpose|
|---|---|---|
|VPS|Hetzner CX22 (2 vCPU, 4GB RAM, 40GB SSD)|Single server for all services|
|Reverse proxy|Caddy|SSL termination, routing, automatic HTTPS|
|Web application|Next.js (standalone output)|Public website + admin panel|
|Database|PostgreSQL 16|Content, user accounts, metadata|
|File storage|Cloudflare R2|Images, PDFs (10GB free)|
|Email|Resend|Contact form notifications (free tier)|
|Analytics|Umami (self-hosted)|Privacy-first analytics|
|Monitoring|UptimeRobot|Uptime alerts (free tier)|

---

## Domain Structure

|Domain|Purpose|DNS record|
|---|---|---|
|`cwwkcc.lk`|Main website|A → Hetzner VPS IP|
|`admin.cwwkcc.lk` (optional)|Admin panel login|CNAME or A (same IP)|
|`analytics.cwwkcc.lk` (internal)|Umami dashboard|A → same VPS (firewall restricted)|

All domains enforce HTTPS via Caddy (Let's Encrypt).

---

## Environment Variables

Stored in `.env` file on the server (never committed to Git).

|Variable|Purpose|Source|
|---|---|---|
|`DATABASE_URL`|PostgreSQL connection|Generated|
|`DB_PASSWORD`|PostgreSQL container password (used to construct `DATABASE_URL`)|Random secret|
|`NEXTAUTH_SECRET`|Auth.js encryption|Random secret|
|`NEXTAUTH_URL`|`https://cwwkcc.lk` (or admin subdomain)|Fixed|
|`GOOGLE_CLIENT_ID`|Google Workspace OAuth — staff sign-in|Google Cloud Console / Workspace admin|
|`GOOGLE_CLIENT_SECRET`|Google Workspace OAuth — staff sign-in|Google Cloud Console / Workspace admin|
|`ADMIN_EMAIL`|Break-glass super-admin account (see Engineering Roadmap, Task 6.3b)|Set at first deploy|
|`ADMIN_PASSWORD`|Break-glass super-admin account, bcrypt-hashed (see Engineering Roadmap, Task 6.3b)|Set at first deploy|
|`RESEND_API_KEY`|Email sending|Resend dashboard|
|`R2_ACCESS_KEY_ID`|R2 access|Cloudflare R2|
|`R2_SECRET_ACCESS_KEY`|R2 secret|Cloudflare R2|
|`R2_BUCKET_NAME`|Bucket name|Configured|
|`R2_ENDPOINT`|R2 endpoint|`https://<account>.r2.cloudflarestorage.com`|
|`UMAMI_WEBSITE_ID`|Analytics site ID|Umami instance|
|`SENTRY_DSN` (optional)|Error tracking|Sentry|

This table is the single source of truth for environment variables. `Engineering Roadmap.md` and `proposal/Appendix A.md` reference variables by name where relevant but do not duplicate the full list — if a variable is missing here, add it here first.

---

## Docker Compose Configuration

`/opt/nexus/docker-compose.yml` (example):

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: nexus
      POSTGRES_USER: nexus
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  nexus-web:
    build: ./apps/web
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - RESEND_API_KEY=${RESEND_API_KEY}
      - R2_ACCESS_KEY_ID=${R2_ACCESS_KEY_ID}
      - R2_SECRET_ACCESS_KEY=${R2_SECRET_ACCESS_KEY}
      - R2_BUCKET_NAME=${R2_BUCKET_NAME}
      - R2_ENDPOINT=${R2_ENDPOINT}
    depends_on:
      - postgres
    restart: unless-stopped

  nexus-admin:
    build: ./apps/admin
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
    depends_on:
      - postgres
    restart: unless-stopped

  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    environment:
      DATABASE_URL: postgresql://umami:${UMAMI_PASSWORD}@postgres:5432/umami
    depends_on:
      - postgres
    restart: unless-stopped

  caddy:
    image: caddy:2
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
    restart: unless-stopped

volumes:
  postgres_data:
  caddy_data:
```

**Caddyfile:**

```
cwwkcc.lk {
    reverse_proxy nexus-web:3000
}

admin.cwwkcc.lk {
    reverse_proxy nexus-admin:3001
}

analytics.cwwkcc.lk {
    reverse_proxy umami:3000
}
```

---

## Deployment Pipeline (GitHub Actions)

```yaml
name: Deploy to Hetzner

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm run lint
      - run: pnpm run typecheck
      - run: pnpm run build
      - name: Deploy to server
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.HETZNER_HOST }}
          username: ${{ secrets.HETZNER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/nexus
            git pull origin main
            docker compose down
            docker compose build
            docker compose up -d
            docker system prune -f
```

---

## Local Development

```bash
# Clone
git clone https://github.com/kits/cwwkcc-nexus.git
cd cwwkcc-nexus

# Install
pnpm install

# Build tokens (first time only)
pnpm run prebuild

# Run dev servers (web on port 3000, admin on port 3001)
pnpm run dev

# Run production build locally
pnpm run build
pnpm run start
```

**Environment files:** `.env.local` (not committed) for local secrets.

---

## Database Management (Prisma)

```bash
# Generate client
pnpm --filter @nexus/db prisma generate

# Run migrations (after schema change)
pnpm --filter @nexus/db prisma migrate dev --name description

# Reset database (dev only)
pnpm --filter @nexus/db prisma migrate reset

# Open studio
pnpm --filter @nexus/db prisma studio
```

**Migration policy:** Never edit migration files manually. Always create new migrations.

---

## Asset Storage (Cloudflare R2)

- **Images** uploaded via admin panel → processed with Sharp (resize to max 1200px, WebP) → stored in R2.
- **PDFs** stored directly in R2 with presigned URLs for secure access.
- **Backup:** R2 bucket replication enabled to another region (optional).

---

## Email (Resend)

- **Transactional emails:** Contact form, feedback form, admin password reset.
- **Rate limiting:** Max 5 emails per hour per IP address (contact form). Implement in server action.

---

## Monitoring & Alerts

|Tool|Monitors|Alert channel|
|---|---|---|
|UptimeRobot|`https://cwwkcc.lk`, `https://admin.cwwkcc.lk`|Email, Slack|
|Sentry (optional)|JS errors, performance|Email, Slack|
|Umami|Page views, events|–|
|Docker healthchecks|Container status|`docker ps` monitoring (optional)|

**SLAs:** 99.9% uptime target. P1 incidents (site down) response within 1 hour (KITS on‑call).

---

## Backup Strategy

|Asset|Frequency|Retention|Location|
|---|---|---|---|
|PostgreSQL database|Daily (cron)|30 days|R2 bucket (encrypted)|
|R2 bucket|Replication (optional)|–|Another region|
|Environment variables|Manual, on change|–|1Password (KITS team)|
|Code repository|Continuous|Forever|GitHub|

**Backup script example (`/opt/nexus/backup.sh`):**

```bash
#!/bin/bash
docker exec nexus-postgres-1 pg_dump -U nexus nexus_db > /tmp/nexus_backup.sql
rclone copy /tmp/nexus_backup.sql r2:nexus-backups/$(date +%Y%m%d).sql
rm /tmp/nexus_backup.sql
```

Add to cron: `0 2 * * * /opt/nexus/backup.sh`

---

## Disaster Recovery

|Scenario|Recovery time (RTO)|Procedure|
|---|---|---|
|Database corruption|4 hours|Restore latest backup from R2 to new PostgreSQL container|
|R2 bucket inaccessible|1 hour|Switch to fallback bucket (if replicated)|
|VPS failure|2 hours|Provision new Hetzner VPS, restore from backups, redeploy|
|DNS misconfiguration|1 hour|Cloudflare rollback|

**Contacts:** KITS lead + on‑call developer (rota published).

---

## Security Hardening

- **Firewall:** `ufw` allow only SSH, HTTP, HTTPS. Restrict admin ports to internal network if possible.
- **Caddy:** Automatic HTTPS, security headers (HSTS, X-Frame-Options, etc.).
- **Environment variables:** Never logged, never exposed to client.
- **Dependencies:** Weekly `pnpm audit` and dependabot alerts.
- **Database:** Not exposed to public internet; only accessible via Docker internal network.

---

## Cost Estimation (Monthly)

|Service|Estimated cost|Notes|
|---|---|---|
|Hetzner CX22 VPS|≈ LKR 1,500|2 vCPU, 4GB RAM, 40GB SSD|
|Cloudflare R2|Free (10GB)|Images + PDFs|
|Resend|Free (3k emails)|Contact forms|
|Domain renewal|≈ LKR 1,000/year|~ LKR 85/month|
|**Total**|**≈ LKR 1,600/month**|Excluding domain amortisation|

---

## Production Readiness Checklist

See [Launch Readiness Checklist](../operations/Launch%20Readiness%20Checklist.md) for final validation before go‑live.

---

## Related Documents

- [Assets Inventory](../operations/Assets%20Inventory.md)
- [Performance Budgets](./Performance%20Budgets.md)
- [Security & Privacy Guidelines](../Design%20System/Foundations.md#26-security--privacy-guidelines)

---

_C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth_