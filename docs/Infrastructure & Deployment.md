## Overview

This document describes the production infrastructure, deployment pipeline, environment configuration, and disaster recovery procedures for Nexus.

---

## Architecture Diagram

```
User → Cloudflare DNS → Vercel (Next.js) → CMS (Sanity) / R2 (Assets) / Database (PostgreSQL)
                         ↓
                  (tRPC) API layer (future)
```

---

## Hosting Providers

| Service | Provider | Purpose |
|---------|----------|---------|
| DNS & CDN | Cloudflare | Domain management, SSL, DDoS protection |
| Web hosting | Vercel (Pro plan) | Next.js hosting, preview deployments, CI/CD |
| CMS | Sanity (Growth plan) | Content management, image CDN |
| File storage | Cloudflare R2 | Images, PDFs, audio (free tier, 10GB) |
| Database | Neon (PostgreSQL) | Results, user data (future portals) |
| Email | Resend | Transactional emails (free tier, 3k/month) |
| Analytics | Umami (self‑hosted) | Privacy‑focused analytics |
| Error tracking | Sentry | Error monitoring (free tier) |
| Uptime monitoring | UptimeRobot | Alerts (free tier) |

---

## Domain Structure

| Domain | Purpose | DNS record |
|--------|---------|-------------|
| `cwwkcc.lk` | Production website | A → Vercel |
| `admin.cwwkcc.lk` | Admin CMS (Sanity) | CNAME → sanity.io |
| `preview.cwwkcc.lk` | Sanity preview (optional) | CNAME → preview.sanity.io |
| `analytics.cwwkcc.lk` | Umami dashboard | A → self‑hosted VPS (Hetzner) |
| `assets.cwwkcc.lk` (future) | R2 custom domain | CNAME → R2 bucket |

All domains enforce HTTPS via Cloudflare (Full strict).

---

## Environment Variables

### Production (`VERCEL_ENV=production`)

| Variable | Value | Source | Used by |
|----------|-------|--------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Neon | Prisma |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | Sanity | web |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Sanity | web |
| `SANITY_API_TOKEN` | Write‑only token | Sanity | CMS sync (admin) |
| `RESEND_API_KEY` | API key | Resend | contact forms |
| `NEXTAUTH_SECRET` | Random secret | Generated | admin auth |
| `NEXTAUTH_URL` | `https://admin.cwwkcc.lk` | – | admin auth |
| `UMAMI_WEBSITE_ID` | Umami website ID | Umami | analytics |
| `SENTRY_DSN` | Sentry DSN | Sentry | error tracking |

### Preview / Staging

Same as production but with `NEXT_PUBLIC_SANITY_DATASET=staging` and separate database (optional).

---

## CI/CD Pipeline (GitHub Actions)

```yaml
name: Deploy

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
      - run: pnpm run test --if-present
      - uses: amannn/action-semantic-pull-request@v5
      - uses: Vercel/action-deploy@v2
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

**Preview deployments:** Every PR gets a unique preview URL (`nexus-git-{pr}.vercel.app`).

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

**Environment files:**

- `.env.local` (not committed) for local secrets.
- `.env.example` (committed) for required variables.

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

**Credentials:** Stored in GitHub Secrets (`R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT`, `R2_BUCKET_NAME`).

**Upload flow:**

1. Admin uploads image via Sanity → image stored in Sanity CDN (not R2).
2. For user‑uploaded files (admission documents), upload directly to R2 via presigned URL.

**Backup:** R2 bucket replicated to another region (enable replication). No additional backup needed.

---

## Email (Resend)

**Transactional emails:** Contact form, feedback form, admin password reset.

**Templates:** React Email components in `packages/email/`.

**Rate limiting:** Max 5 emails per hour per IP address (contact form). Implement in server action.

---

## Monitoring & Alerts

| Tool | Monitors | Alert channel |
|------|----------|----------------|
| UptimeRobot | `https://cwwkcc.lk`, `https://admin.cwwkcc.lk` | Email, Slack |
| Sentry | JS errors, performance | Email, Slack |
| Vercel Analytics | Core Web Vitals | Dashboard only |
| Umami | Page views, events | – |

**SLAs:** 99.9% uptime target. P1 incidents (site down) response within 1 hour (KITS on‑call).

---

## Backup Strategy

| Asset | Frequency | Retention | Location |
|-------|-----------|-----------|----------|
| Sanity dataset | Daily | 30 days | Sanity cloud (automatic) |
| PostgreSQL | Daily | 7 days | Neon (point‑in‑time recovery) |
| R2 bucket | Not backed up (replicated) | – | – |
| Environment variables | Manual, on change | – | 1Password (KITS team) |
| Code repository | Continuous | Forever | GitHub |

**Restore process:** Documented in KITS internal wiki.

---

## Disaster Recovery

| Scenario | Recovery time (RTO) | Procedure |
|----------|---------------------|------------|
| Database corruption | 4 hours | Restore from Neon PITR |
| CMS data loss | 2 hours | Restore Sanity dataset |
| R2 bucket inaccessible | 1 hour | Switch to fallback bucket (if replicated) |
| Vercel outage | N/A | No action (Vercel manages) |
| DNS misconfiguration | 1 hour | Cloudflare rollback |

**Contacts:** KITS lead + on‑call developer (rota published).

---

## Security Hardening

- **Vercel** – Automatic DDoS protection, firewall rules.
- **Cloudflare** – Enable WAF, rate limiting, bot management.
- **Sanity** – IP whitelist for admin access (optional).
- **Environment variables** – Never log, never expose to client.
- **Dependencies** – Weekly `pnpm audit` and dependabot alerts.

---

## Cost Estimation (Monthly)

| Service | Estimated cost | Notes |
|---------|----------------|-------|
| Vercel Pro | $20 | |
| Sanity Growth | $99 (or free) | Free tier may suffice initially |
| Neon (PostgreSQL) | $0 (free tier) | Up to 0.5GB |
| Cloudflare R2 | $0 (free tier) | 10GB storage, free egress |
| Resend | $0 (free tier) | 3,000 emails/month |
| Umami (Hetzner) | $4 | Small VPS (CX11) |
| Total | ~$123 | Can be reduced to ~$50 with free tiers |

---

## Production Readiness Checklist

See [Launch Readiness Checklist](./Launch%20Readiness%20Checklist.md) for final validation before go‑live.

---

## Related Documents

- [Assets Inventory](Assets%20Inventory.md)
- [Performance Budgets](./Performance%20Budgets.md)
- [Security & Privacy Guidelines](../Design%20System/Foundations.md#26-security--privacy-guidelines)

---

*C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth*
