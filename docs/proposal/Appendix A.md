# Technical Architecture Overview

## A.1 Architecture Philosophy

Nexus is built on a **self-hosted, open-source, vendor-neutral** architecture. Every component is chosen for long-term maintainability, cost predictability, and institutional ownership. No third-party service can hold the school's digital presence hostage.

The entire platform runs on a single Hetzner VPS, with all services containerised via Docker and orchestrated with Docker Compose. This keeps operational complexity low and costs predictable.

---

## A.2 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Internet                                │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Cloudflare (CDN + WAF)                     │
│  • DNS management                                               │
│  • DDoS protection                                              │
│  • Global CDN caching                                           │
│  • SSL termination (edge)                                       │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Caddy (Reverse Proxy)                        │
│  • Automatic HTTPS (Let's Encrypt)                             │
│  • Route: cwwkcc.lk → web container                            │
│  • Route: admin.cwwkcc.lk → admin container                    │
│  • Security headers (HSTS, CSP, X-Frame-Options)               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  nexus-web      │ │  nexus-admin    │ │  umami          │
│  (Next.js)      │ │  (Next.js)      │ │  (Analytics)    │
│  Port: 3000     │ │  Port: 3001     │ │  Port: 3002     │
└────────┬────────┘ └────────┬────────┘ └────────┬────────┘
         │                   │                   │
         └───────────────┬───┴───────────────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │   PostgreSQL        │
              │   Port: 5432        │
              │   (Internal only)   │
              └─────────────────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │   Cloudflare R2     │
              │   (Object Storage)  │
              │   • Images          │
              │   • PDFs            │
              │   • Media assets    │
              └─────────────────────┘
```

---

## A.3 Technology Stack

### A.3.1 Core Framework

| Layer                  | Technology                   | Purpose                                                                   | Why Chosen                                                                                                                  |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Frontend Framework** | Next.js 14+ (App Router)     | React framework with server components, static generation, and API routes | Provides SSR, ISR, and static generation with excellent i18n support; single framework for both public site and admin panel |
| **Monorepo**           | pnpm + Nx                    | Package management and build orchestration                                | Faster than npm; workspace linking; Nx provides task caching and affected commands                                          |
| **TypeScript**         | TypeScript 5.0+              | Type safety across the entire codebase                                    | Reduces runtime errors; provides excellent IDE support; entire stack is type-safe                                           |
| **Styling**            | Tailwind CSS + Custom Preset | Utility-first styling with design tokens                                  | Token system ensures visual consistency; Tailwind preset enforces design system rules                                       |

### A.3.2 Backend & API

| Layer              | Technology         | Purpose                                    | Why Chosen                                                                                           |
| ------------------ | ------------------ | ------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| **API Layer**      | tRPC               | End-to-end type-safe API                   | Eliminates API spec drift; full type safety from server to client; excellent developer experience    |
| **Database**       | PostgreSQL 15+     | Primary relational database                | Battle-tested; handles JSON content well; excellent full-text search with Sinhala/Tamil support      |
| **ORM**            | Prisma             | Database access and migrations             | Type-safe database client; declarative schema; migration history                                     |
| **Validation**     | Zod                | Schema validation                          | Single source of truth for data shapes; infers TypeScript types; validates forms, API, and database  |
| **Authentication** | Auth.js (NextAuth) | OAuth authentication with Google Workspace | Supports Google OAuth natively; Prisma adapter for session storage; restricts to `@cwwkcc.lk` domain |

### A.3.3 Infrastructure

| Layer                  | Technology                       | Purpose                            | Why Chosen                                                                         |
| ---------------------- | -------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------- |
| **Web Server**         | Caddy                            | Reverse proxy with automatic HTTPS | Automatic Let's Encrypt; simple Caddyfile configuration; built-in security headers |
| **Container Runtime**  | Docker + Docker Compose          | Application containerisation       | Consistent environment; easy deployment; health checks; restart policies           |
| **Object Storage**     | Cloudflare R2                    | Media asset storage                | Zero egress fees; S3-compatible API; 10GB free tier; no bandwidth costs            |
| **CI/CD**              | GitHub Actions                   | Automated testing and deployment   | Native to GitHub; reusable workflows; container registry integration               |
| **Container Registry** | GitHub Container Registry (GHCR) | Docker image hosting               | Free for public repositories; integrated with GitHub Actions                       |

### A.3.4 Frontend Libraries

| Library                   | Purpose                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------ |
| **Framer Motion**         | React animation library for micro-interactions and state transitions                 |
| **GSAP**                  | Timeline-based animations for ceremonial sequences (crest drawing, page transitions) |
| **Lucide React**          | Icon library (unified through Icon Registry)                                         |
| **next-intl**             | Internationalisation with locale-aware routing                                       |
| **Tiptap**                | Rich text editor for the admin panel                                                 |
| **Sharp**                 | Image optimisation in the upload pipeline                                            |
| **clsx + tailwind-merge** | Conditional class name utility (`cn()` function)                                     |

### A.3.5 Monitoring & Analytics

| Service         | Purpose                                                            |
| --------------- | ------------------------------------------------------------------ |
| **Umami**       | Self-hosted privacy-first analytics (Docker container on same VPS) |
| **UptimeRobot** | External uptime monitoring (5-minute checks)                       |
| **Sentry**      | Optional error monitoring (configurable via environment variable)  |

---

## A.4 Data Flow

### A.4.1 Content Publication Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Admin     │    │   tRPC      │    │   Zod       │    │  PostgreSQL │
│   Panel     │───▶│   Router    │───▶│ Validation  │───▶│   Database  │
│   (Editor)  │    │             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └──────┬──────┘
                                                                 │
                                                                 ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Public    │    │   Next.js   │    │  Database   │    │   CDN       │
│   Website   │◀───│   Server    │◀───│   Query     │◀───│   Cache     │
│   Visitor   │    │   Component │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### A.4.2 Asset Upload Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Admin     │    │   Sharp     │    │   Presigned │    │  Cloudflare │
│   Upload    │───▶│  Optimise   │───▶│   URL       │───▶│   R2        │
│   Request   │    │  (WebP)     │    │   Request   │    │   Storage   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                                                 │
                                                                 ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Media     │    │   tRPC      │    │  PostgreSQL │    │   CDN       │
│   Library   │◀───│   Router    │───▶│   Database  │───▶│   Edge      │
│   Display   │    │   (callback)│    │   (metadata)│    │   Cache     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

---

## A.5 Security Architecture

### A.5.1 Authentication Flow

1. **Primary Authentication**: Google Workspace OAuth via Auth.js
   - Restricted to `@cwwkcc.lk` domain (verified server-side)
   - Session stored in database via Prisma adapter
   - Secure cookies with HttpOnly, SameSite

2. **Access Control**: Invite-based
   - Admin must first add user email to database
   - Role assignment (Admin or Editor)
   - Deactivation revokes access immediately

3. **Break-glass Account**: Credentials-based super-admin
   - Seeded from environment variables at deploy
   - Protected by TOTP (RFC 6238)
   - Used only for bootstrap and recovery
   - Password rotation via server-side CLI script

### A.5.2 Security Layers

| Layer           | Protection                                                                        |
| --------------- | --------------------------------------------------------------------------------- |
| **Network**     | Firewall (ports 80, 443, 22 only); PostgreSQL internal-only                       |
| **TLS**         | Automatic HTTPS via Let's Encrypt; HSTS header                                    |
| **Headers**     | CSP, X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy    |
| **API**         | tRPC middleware for authentication; Zod input validation; rate limiting           |
| **File Upload** | MIME type validation; extension validation; size limits; Sharp metadata stripping |
| **Database**    | Connection pooling; prepared statements; no direct public access                  |
| **Backups**     | Encrypted off-site backups; separate key storage                                  |

### A.5.3 Rate Limiting

| Endpoint     | Limit                 | Implementation                       |
| ------------ | --------------------- | ------------------------------------ |
| Contact Form | 5 requests/hour/IP    | Next.js middleware or Cloudflare WAF |
| General API  | Configurable baseline | Next.js middleware                   |

---

## A.6 Performance Optimisation

### A.6.1 Static Generation

- **Pages generated at build time**: Home, About, static content pages
- **Pages with `generateStaticParams`**: News articles, society pages, gallery albums
- **Revalidation**: ISR with revalidation intervals (1 hour for news, daily for societies)
- **On-demand revalidation**: Content publish triggers immediate revalidation

### A.6.2 Image Optimisation

| Step     | Tool          | Purpose                                                               |
| -------- | ------------- | --------------------------------------------------------------------- |
| Upload   | Sharp         | Resize to max display dimensions; WebP conversion; metadata stripping |
| Delivery | `next/image`  | Automatic format negotiation; lazy loading; blur placeholders         |
| Storage  | Cloudflare R2 | Global CDN caching; zero egress fees                                  |
| Caching  | CDN + Browser | Cache-Control headers for immutable assets                            |

### A.6.3 Bundle Optimisation

| Technique            | Implementation                                               |
| -------------------- | ------------------------------------------------------------ |
| Dynamic imports      | CrestAnimation, AudioPlayer, Tiptap, PanoramicFacilityViewer |
| Package optimisation | `optimizePackageImports` for `@nexus/ui` and `framer-motion` |
| Code splitting       | Next.js automatic per-page bundling                          |
| Font optimisation    | Self-hosted fonts; `next/font` with preload                  |

### A.6.4 Performance Targets

| Metric                           | Target       |
| -------------------------------- | ------------ |
| Lighthouse Performance (mobile)  | ≥ 90         |
| Cumulative Layout Shift (CLS)    | < 0.1        |
| Largest Contentful Paint (LCP)   | < 2.5s       |
| Total Bundle Size (initial load) | < 200KB (JS) |

---

## A.7 Deployment Architecture

### A.7.1 CI/CD Pipeline (GitHub Actions)

```
┌─────────────────────────────────────────────────────────────────┐
│                         Push to main                            │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CI: ci.yml                                   │
│  • TypeScript typecheck                                        │
│  • ESLint lint                                                 │
│  • pnpm audit (security)                                       │
│  • Lighthouse CI (performance budgets)                         │
│  • Unit tests (Vitest)                                         │
│  • Integration tests                                           │
│  • Build both apps                                             │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼ (if CI passes)
┌─────────────────────────────────────────────────────────────────┐
│                    CD: deploy.yml                               │
│  • Build Docker images (multi-stage)                           │
│  • Push to GitHub Container Registry                           │
│  • SSH into Hetzner server                                     │
│  • Pull new images                                             │
│  • Docker compose restart (zero-downtime)                      │
│  • Wait for health checks                                      │
└─────────────────────────────────────────────────────────────────┘
```

### A.7.2 Zero-Downtime Deployment Strategy

```yaml
# docker-compose.yml deployment strategy
services:
  nexus-web:
    image: ghcr.io/org/nexus-web:latest
    container_name: nexus-web
    restart: unless-stopped
    healthcheck:
      test: ['CMD', 'wget', '--no-verbose', '--tries=1', '--spider', 'http://localhost:3000/api/health']
      interval: 10s
      timeout: 5s
      retries: 3
```

- New container starts alongside existing
- Health check passes before routing traffic
- Old container remains until new is healthy
- Caddy automatically routes to healthy instance
- Rollback: deploy previous image tag

---

## A.8 Disaster Recovery

### A.8.1 Backup Strategy

| Type              | Schedule            | Location                                                       | Retention |
| ----------------- | ------------------- | -------------------------------------------------------------- | --------- |
| **Database**      | Daily (recommended) | AWS S3, GPG-encrypted (**not** Cloudflare R2 — see note below) | 30 days   |
| **Docker Images** | Each deployment     | GHCR                                                           | Unlimited |

> **Note:** An earlier revision of this table also listed hourly transaction-log backups and a nightly media-asset backup, both to "R2 (encrypted)." Neither exists: the real backup automation (`infra/scripts/backup.sh`) is a single daily full-database dump, uploaded to **AWS S3** (not R2) after GPG encryption. There is currently no point-in-time recovery and no separate media backup — see `Backup and Restore Procedure.md` for the full, current picture. This is worth resolving (either building the missing pieces, or budgeting/documenting the gap) rather than presenting it as already covered.

### A.8.2 Recovery Procedures

| Failure Mode        | Recovery Time | Procedure                                                                                                                   |
| ------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Server failure      | 2-4 hours     | Provision new Hetzner server; restore from S3 backup via `infra/scripts/restore.sh`                                         |
| Database corruption | 1-2 hours     | Stop services; restore via `infra/scripts/restore.sh`; verify integrity                                                     |
| Accidental deletion | Minutes       | Audit log identifies deletion; soft-delete recovery from database                                                           |
| Domain loss         | Hours-Days    | Contact LK domain registry with proof of institutional ownership                                                            |
| R2 failure          | Hours         | R2 holds live media only, not backups — restore original assets from source if lost; no secondary media backup exists today |

---

## A.9 Monitoring

### A.9.1 Health Checks

**Note:** `/api/health` doesn't exist in the codebase yet for either app — the table below describes the target design, not something already running. See `Deployment Checklist.md` in `docs/operations/`.

| Service     | Health Check Endpoint   | Interval | Alert On                        |
| ----------- | ----------------------- | -------- | ------------------------------- |
| nexus-web   | `/api/health`           | 10s      | Container unhealthy (5 retries) |
| nexus-admin | `/api/health`           | 10s      | Container unhealthy (5 retries) |
| postgres    | `pg_isready`            | 30s      | Database not responding         |
| umami       | HTTP check on port 3002 | 30s      | Service unavailable             |

### A.9.2 External Monitoring

| Service                         | Frequency      | Alert Method             |
| ------------------------------- | -------------- | ------------------------ |
| UptimeRobot (`cwwkcc.lk`)       | 5 minutes      | Email + SMS to KITS lead |
| UptimeRobot (`admin.cwwkcc.lk`) | 5 minutes      | Email + SMS to KITS lead |
| SSL Certificate Expiry          | 30 days before | Email notification       |

---

## Changelog

**This revision:**

- Removed a "Results Portal" rate-limiting row — that feature was cut from scope entirely.
- Fixed the Disaster Recovery / Backup Strategy tables: backups actually go to AWS S3 with GPG encryption, not Cloudflare R2. Removed hourly transaction-log and nightly media-backup rows — neither exists as an actual script; there's no point-in-time recovery and no separate media backup today.
- Flagged that `/api/health` doesn't exist in the codebase yet, even though it's referenced here (and depended on by the real CD pipeline's automatic rollback) as if already built.
