# Nexus — Technical Architecture Overview

**C.W.W. Kannangara Central College Digital Platform**

---

## Architecture Philosophy

Nexus is built on a **self-hosted, open-source, vendor-neutral** architecture. Every component is chosen for long-term maintainability, cost predictability, and institutional ownership. No third-party service can hold the school's digital presence hostage.

The entire platform runs on a single Hetzner VPS, with all services containerised via Docker and orchestrated with Docker Compose. This keeps operational complexity low and costs predictable.

---

## System Architecture Diagram

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

## Technology Stack

### Core Framework

| Layer        | Technology                   | Purpose                                                                   | Why Chosen                                                                            |
| ------------ | ---------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Frontend** | Next.js 14+ (App Router)     | React framework with server components, static generation, and API routes | Provides SSR, ISR, and static generation with excellent i18n support                  |
| **Monorepo** | pnpm + Nx                    | Package management and build orchestration                                | Faster than npm; workspace linking; Nx provides task caching and affected commands    |
| **Language** | TypeScript 5.0+              | Type safety across the entire codebase                                    | Reduces runtime errors; provides excellent IDE support                                |
| **Styling**  | Tailwind CSS + Custom Preset | Utility-first styling with design tokens                                  | Token system ensures visual consistency; Tailwind preset enforces design system rules |

### Backend & API

| Layer              | Technology         | Purpose                                    | Why Chosen                                                                          |
| ------------------ | ------------------ | ------------------------------------------ | ----------------------------------------------------------------------------------- |
| **API**            | tRPC               | End-to-end type-safe API                   | Eliminates API spec drift; full type safety from server to client                   |
| **Database**       | PostgreSQL 15+     | Primary relational database                | Battle-tested; handles JSON content well; excellent full-text search                |
| **ORM**            | Prisma             | Database access and migrations             | Type-safe database client; declarative schema; migration history                    |
| **Validation**     | Zod                | Schema validation                          | Single source of truth; infers TypeScript types; validates forms, API, and database |
| **Authentication** | Auth.js (NextAuth) | OAuth authentication with Google Workspace | Supports Google OAuth natively; Prisma adapter for session storage                  |

### Infrastructure

| Layer          | Technology                | Purpose                            | Why Chosen                                                                         |
| -------------- | ------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------- |
| **Web Server** | Caddy                     | Reverse proxy with automatic HTTPS | Automatic Let's Encrypt; simple Caddyfile configuration; built-in security headers |
| **Container**  | Docker + Docker Compose   | Application containerisation       | Consistent environment; easy deployment; health checks; restart policies           |
| **Storage**    | Cloudflare R2             | Media asset storage                | Zero egress fees; S3-compatible API; 10GB free tier; no bandwidth costs            |
| **CI/CD**      | GitHub Actions            | Automated testing and deployment   | Native to GitHub; reusable workflows; container registry integration               |
| **Registry**   | GitHub Container Registry | Docker image hosting               | Free for public repositories; integrated with GitHub Actions                       |

### Frontend Libraries

| Library                   | Purpose                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------ |
| **Framer Motion**         | React animation library for micro-interactions and state transitions                 |
| **GSAP**                  | Timeline-based animations for ceremonial sequences (crest drawing, page transitions) |
| **Lucide React**          | Icon library (unified through Icon Registry)                                         |
| **next-intl**             | Internationalisation with locale-aware routing                                       |
| **Tiptap**                | Rich text editor for the admin panel                                                 |
| **Sharp**                 | Image optimisation in the upload pipeline                                            |
| **clsx + tailwind-merge** | Conditional class name utility (`cn()` function)                                     |

### Monitoring & Analytics

| Service         | Purpose                                                            |
| --------------- | ------------------------------------------------------------------ |
| **Umami**       | Self-hosted privacy-first analytics (Docker container on same VPS) |
| **UptimeRobot** | External uptime monitoring (5-minute checks)                       |
| **Sentry**      | Optional error monitoring (configurable via environment variable)  |

---

## Data Flow

### Content Publication Flow

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

_The "CDN" box above is Next.js's server-side Data Cache, not the Cloudflare edge — it's tagged by `scope` (e.g. `page:about`) and invalidated by `revalidateTag(scope)` the moment `ContentEntry.update` succeeds (Feature Registry F-195), not on a timer._

### Asset Upload Flow

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

## Security Architecture

### Authentication Flow

1. **Primary Authentication:** Google Workspace OAuth via Auth.js
   - Restricted to `@cwwkcc.lk` domain (verified server-side)
   - Session stored in database via Prisma adapter
   - Secure cookies with HttpOnly, SameSite

2. **Access Control:** Invite-based
   - Admin must first add user email to database
   - Role assignment (Admin or Editor)
   - Deactivation revokes access immediately

3. **Break-glass Account:** Credentials-based super-admin
   - Seeded from environment variables at deploy
   - Protected by TOTP (RFC 6238)
   - Used only for bootstrap and recovery
   - Password rotation via server-side CLI script

### Security Layers

| Layer           | Protection                                                                        |
| --------------- | --------------------------------------------------------------------------------- |
| **Network**     | Firewall (ports 80, 443, 22 only); PostgreSQL internal-only                       |
| **TLS**         | Automatic HTTPS via Let's Encrypt; HSTS header                                    |
| **Headers**     | CSP, X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy    |
| **API**         | tRPC middleware for authentication; Zod input validation; rate limiting           |
| **File Upload** | MIME type validation; extension validation; size limits; Sharp metadata stripping |
| **Database**    | Connection pooling; prepared statements; no direct public access                  |
| **Backups**     | Encrypted off-site backups; separate key storage                                  |

### Rate Limiting

| Endpoint     | Limit                 | Implementation                       |
| ------------ | --------------------- | ------------------------------------ |
| Contact Form | 5 requests/hour/IP    | Next.js middleware or Cloudflare WAF |
| General API  | Configurable baseline | Next.js middleware                   |

_The Results Portal was removed from scope entirely (see Feature Registry F-051/F-141–F-161 — no results portal page exists in the current registry) and no longer has a rate-limit row._

---

## Performance Optimisation

### Static Generation

- **Pages generated at build time:** Home, About, static content pages
- **Pages with `generateStaticParams`:** News articles, society pages, gallery albums
- **Revalidation:** Tag-based only, no fixed interval — every `ContentEntry` read is cached under a tag equal to its `scope` (e.g. `page:about`), and `ContentEntry.update` calls `revalidateTag(scope)` on save (Feature Registry F-195). There is no ISR polling interval to tune; content is fresh the instant it's published and stays cached indefinitely otherwise.
- **On-demand revalidation:** Content publish triggers immediate revalidation via the mechanism above

### Image Optimisation

| Step     | Tool          | Purpose                                                               |
| -------- | ------------- | --------------------------------------------------------------------- |
| Upload   | Sharp         | Resize to max display dimensions; WebP conversion; metadata stripping |
| Delivery | `next/image`  | Automatic format negotiation; lazy loading; blur placeholders         |
| Storage  | Cloudflare R2 | Global CDN caching; zero egress fees                                  |
| Caching  | CDN + Browser | Cache-Control headers for immutable assets                            |

### Bundle Optimisation

| Technique            | Implementation                                               |
| -------------------- | ------------------------------------------------------------ |
| Dynamic imports      | CrestAnimation, AudioPlayer, Tiptap, PanoramicFacilityViewer |
| Package optimisation | `optimizePackageImports` for `@nexus/ui` and `framer-motion` |
| Code splitting       | Next.js automatic per-page bundling                          |
| Font optimisation    | Self-hosted fonts; `next/font` with preload                  |

### Performance Targets

| Metric                           | Target       |
| -------------------------------- | ------------ |
| Lighthouse Performance (mobile)  | ≥ 90         |
| Cumulative Layout Shift (CLS)    | < 0.1        |
| Largest Contentful Paint (LCP)   | < 2.5s       |
| Total Bundle Size (initial load) | < 200KB (JS) |

---

## Deployment Architecture

### CI/CD Pipeline (GitHub Actions)

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

### Zero-Downtime Deployment

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

## Monitoring

### Health Checks

| Service     | Health Check Endpoint   | Interval | Alert On                        |
| ----------- | ----------------------- | -------- | ------------------------------- |
| nexus-web   | `/api/health`           | 10s      | Container unhealthy (5 retries) |
| nexus-admin | `/api/health`           | 10s      | Container unhealthy (5 retries) |
| postgres    | `pg_isready`            | 30s      | Database not responding         |
| umami       | HTTP check on port 3002 | 30s      | Service unavailable             |

### External Monitoring

| Service                         | Frequency      | Alert Method             |
| ------------------------------- | -------------- | ------------------------ |
| UptimeRobot (`cwwkcc.lk`)       | 5 minutes      | Email + SMS to KITS lead |
| UptimeRobot (`admin.cwwkcc.lk`) | 5 minutes      | Email + SMS to KITS lead |
| SSL Certificate Expiry          | 30 days before | Email notification       |

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

---
