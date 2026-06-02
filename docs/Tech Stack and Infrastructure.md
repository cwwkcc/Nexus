## Overview

Nexus is a Next.js monorepo built with Nx and pnpm. It runs two applications — the public school website (`apps/web`) and the KITS admin dashboard (`apps/admin`) — sharing a common design system, database layer, and API package.

Two external services (Cloudflare R2, Resend) handle file storage and email outside the server. The Hetzner box runs application code only. Content is managed entirely through `apps/admin`

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
|Framework|Next.js (App Router)|~16.1.6|SSG/SSR/ISR, SEO, image optimisation|
|Language|TypeScript|~5.9.2|Type safety across entire monorepo|
|Monorepo|Nx + pnpm|Nx 22.6.0|Consistent builds, shared packages, task orchestration|
|Styling|Tailwind CSS|3.4.3|Utility-first, maps directly to design tokens|

### Data Layer

|Layer|Technology|Purpose|
|---|---|---|
|Database|PostgreSQL|Primary data store — content, media metadata, schedules, admissions|
|ORM|Prisma 7|Type-safe database access, migrations|
|API|tRPC 11|Type-safe API — no REST boilerplate, shared types between apps|
|State (client)|TanStack Query 5|Server state management, caching, background refetch|

### Content Management

|Approach|Details|
|---|---|
|Custom `apps/admin`|Block-based page builder. Admins compose pages from a fixed set of design system blocks. Schema stored as JSON in PostgreSQL. Renderer in `apps/web` maps blocks to React components.|
|Rich text|Tiptap — integrated into `apps/admin` for news posts and announcements|
|Social gallery|Instagram embed widget for recent/casual photos (no API dependency)|
|Official gallery|Curated albums uploaded via `apps/admin`, stored in Cloudflare R2|

### File Storage & Media

|Service|Purpose|Notes|
|---|---|---|
|Cloudflare R2|Photos, PDFs, documents — gallery, staff profiles, notices|10GB free, zero egress fees|
|Sharp|Image processing on upload — resize, convert to WebP, compress|Runs in `apps/admin` before R2 write|

> All uploads are processed through Sharp before reaching R2. Images are resized to a maximum of 1200px wide, converted to WebP, and stripped of metadata. This keeps storage well within the free tier.

### Auth

|App|Technology|Method|Notes|
|---|---|---|---|
|`apps/admin`|Auth.js v5|Email + password (credentials)|KITS admins only. No public auth.|
|`apps/web`|None|—|Fully public. No login required.|

### Communication

|Service|Version|Purpose|
|---|---|---|
|Resend|4|Admissions notifications, contact form responses, admin password reset|
|React Email|—|Email templates written as React components|

### Internationalisation

|Setting|Value|
|---|---|
|Package|next-intl 4|
|Launch locale|`en` (English)|
|Future locales|`si` (Sinhala), `ta` (Tamil) — infrastructure ready, not launched|
|URL pattern|`cwwkcc.lk/en/about`, `cwwkcc.lk/si/about`|
|Translation files|`apps/web/messages/en.json`|

> Every string in `apps/web` goes through the next-intl translation layer from day one. No hardcoded English copy in components.

### Animation

|Library|Version|Responsibility|
|---|---|---|
|GSAP|^3.x|Cinematic, timeline-based sequences — hero load, crest animation, page transitions, ambient particles|
|Framer Motion|^12.38.0|Component-level, React-driven animations — scroll reveals, UI micro-interactions, layout animations, state-driven transitions|

> **Division rule:** GSAP owns scenes (you're directing). Framer Motion owns components (you're describing behaviour). No overlap.

### Validation

|Library|Purpose|
|---|---|
|Zod 4|Schema validation — forms, tRPC inputs, environment variables|

### Observability

|Service|Purpose|Tier|
|---|---|---|
|Sentry|Error tracking, stack traces|Free tier|
|Umami|Privacy-respecting web analytics|Self-hosted on Hetzner|
|UptimeRobot|Uptime monitoring, alerts|Free tier|

---

## Infrastructure

### Hosting Architecture

```
Hetzner CX32 (4 vCPU, 8GB RAM)
└── Docker Compose
    ├── nexus-web         → cwwkcc.lk
    ├── nexus-admin       → admin.cwwkcc.lk
    ├── postgres          (paideon_db + nexus_db — separate databases)
    ├── umami             → analytics.cwwkcc.lk (internal)
    └── caddy             (HTTPS + routing for all domains)

File storage:   Cloudflare R2    (external — CF edge, zero egress)
Email:          Resend           (external — transactional only)
Error tracking: Sentry           (external — free tier)
```

### External Services Summary

|Service|Purpose|Cost|
|---|---|---|
|Cloudflare R2|File storage|Free (10GB)|
|Resend|Transactional email|Free (3,000/month)|
|Sentry|Error tracking|Free tier|
|UptimeRobot|Uptime monitoring|Free tier|

### CI/CD

|Step|Tool|Notes|
|---|---|---|
|Pipeline|GitHub Actions|Triggered on push to `main`|
|Steps|lint → typecheck → test → build → deploy|Nx affected — only rebuilds changed packages|
|Deployment|Docker Compose|SSH into Hetzner, pull, rebuild, restart|
|Secrets|GitHub Secrets + `.env` on server|Never committed to repository|

### Performance Strategy

|Scenario|Strategy|
|---|---|
|Info pages|SSG — built at deploy time, served instantly|
|News / events|ISR — revalidates every hour|
|Results day traffic|PDFs served directly from R2 via Cloudflare edge. Server not involved.|
|Images|`next/image` with WebP, blur placeholders, proper `sizes`|
|Scaling path|One-click Hetzner resize to CX42 (8 vCPU, 16GB RAM). No migration.|

---

_Nexus — Tech Stack & Infrastructure_ _C.W.W. Kannangara Central College, Mathugama_ _Maintained by Kannangara ICT Society (KITS)_ _© 2026_