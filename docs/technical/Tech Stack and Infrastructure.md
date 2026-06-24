## Overview

Nexus is a Next.js monorepo built with Nx and pnpm. It runs two applications — the public school website (`apps/web`) and the KITS admin dashboard (`apps/admin`) — sharing a common design system, database layer, and API package.

All services run on a single **Hetzner VPS** using Docker Compose. No third-party CMS, no serverless functions.

---

## Repository Structure

```
nexus/
├── apps/
│   ├── web/                     ← public school website (Next.js)
│   └── admin/                   ← KITS admin dashboard (Next.js)
├── packages/
│   ├── ui/                      ← shared design system components + hooks
│   ├── db/                      ← Prisma schema + client
│   ├── api/                     ← tRPC routers
│   └── config/                  ← shared Tailwind, ESLint, tsconfig, motion tokens
├── docs/
│   └── design-system/           ← design system documentation
├── infra/
│   ├── docker-compose.yml
│   └── Caddyfile
├── .github/
│   └── workflows/
│       └── deploy.yml
├── nx.json
└── pnpm-workspace.yaml
```

---

## Complete Tech Stack

### Core

|Layer|Technology|Version|Purpose|
|---|---|---|---|
|Framework|Next.js (App Router)|~16.2.9|SSG/SSR/ISR, SEO, image optimisation|
|Language|TypeScript|~5.9.2|Type safety across entire monorepo|
|Monorepo|Nx + pnpm|Nx 22.6.0|Consistent builds, shared packages|
|Styling|Tailwind CSS|3.4.3|Utility-first, maps to design tokens|

### Data Layer

|Layer|Technology|Purpose|
|---|---|---|
|Database|PostgreSQL 16|Content, media metadata, user accounts|
|ORM|Prisma 7|Type-safe database access, migrations|
|API|tRPC 11|Type-safe API, shared types between apps|
|State (client)|TanStack Query 5|Server state management, caching|

### Content Management

|Approach|Details|
|---|---|
|Custom `apps/admin`|Block-based page builder. Admins compose pages from fixed design system blocks. Schema stored as JSON in PostgreSQL. Renderer in `apps/web` maps blocks to React components.|
|Rich text|Tiptap – integrated into `apps/admin` for news posts and announcements|
|Social gallery|Instagram embed widget for recent/casual photos (no API dependency)|
|Official gallery|Curated albums uploaded via `apps/admin`, stored in Cloudflare R2|

### File Storage & Media

| Service       | Purpose                    | Notes                                                 |
| ------------- | -------------------------- | ----------------------------------------------------- |
| Cloudflare R2 | Photos, PDFs, documents    | 10GB free, zero egress fees                           |
| Sharp         | Image processing on upload | Resize to max 1200px, convert to WebP, strip metadata |

### Auth

|App|Technology|Method|Notes|
|---|---|---|---|
|`apps/admin` (primary)|Auth.js v5|Google OAuth, restricted to `@cwwkcc.lk`|KITS admins sign in with their existing school Google account. Domain verified server-side in the `signIn` callback — never by trusting the `hd` claim alone.|
|`apps/admin` (break-glass)|Auth.js v5|Email + password (Credentials provider), bcrypt-hashed, TOTP-protected|One seeded super-admin account for bootstrap and recovery only if Google OAuth becomes unavailable — not the everyday sign-in path.|
|`apps/web`|None|—|Fully public. No login required.|

### Communication

|Service|Version|Purpose|
|---|---|---|
|Resend|4|Admissions notifications, contact form responses|
|React Email|—|Email templates as React components|

### Internationalisation

|Setting|Value|
|---|---|
|Package|next-intl 4|
|Launch locale|`en` (English)|
|Future locales|`si` (Sinhala), `ta` (Tamil) – infrastructure ready|
|URL pattern|`cwwkcc.lk/en/about`|
|Translation files|`apps/web/messages/en.json`|

> Every string in `apps/web` uses next-intl from day one. No hardcoded English.

### Animation

|Library|Version|Responsibility|
|---|---|---|
|GSAP|^3.x|Cinematic, timeline-based sequences (hero load, crest animation, page transitions)|
|Framer Motion|^12.38.0|Component-level animations (scroll reveals, UI micro-interactions, layout animations)|

> **Division rule:** GSAP owns scenes (directing). Framer Motion owns components (describing behaviour).

### Validation

|Library|Purpose|
|---|---|
|Zod 4|Schema validation – forms, tRPC inputs, env variables|

### Observability

|Service|Purpose|Tier|
|---|---|---|
|Sentry (optional)|Error tracking|Free tier|
|Umami (secondary)|Independent cross-check view for the primary custom collector|Self-hosted on same VPS|
|UptimeRobot|Uptime monitoring|Free tier|

---

## Infrastructure Summary

|Component|Provider|Cost|
|---|---|---|
|VPS|Hetzner CX22|≈ LKR 1,500/month|
|Domain|`cwwkcc.lk`|≈ LKR 1,000/year|
|DNS & CDN|Cloudflare (free)|Free|
|File storage|Cloudflare R2 (free)|Free|
|SSL|Let's Encrypt (Caddy)|Free|
|Email|Resend (free)|Free|
|Analytics (primary)|Custom server-side collector|Free — built into the existing Next.js/PostgreSQL stack|
|Analytics (secondary)|Umami (self-hosted)|Free|
|**Monthly total**||**≈ LKR 1,600**|

---

## Deployment

- **CI/CD:** GitHub Actions → SSH into Hetzner → `docker compose pull && up -d`
- **Server:** Ubuntu 22.04, Docker, Caddy reverse proxy
- **Database backups:** Daily `pg_dump` to R2, 30-day retention

Full details in [Infrastructure & Deployment.md](https://claude.ai/chat/Infrastructure%20%26%20Deployment.md).

---

_C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth_