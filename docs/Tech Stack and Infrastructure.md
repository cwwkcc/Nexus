**C.W.W. Kannangara Central College, Mathugama** _Maintained by Kannangara ICT Society (KITS)_

---

## Overview

Nexus is a Next.js monorepo built with Nx and pnpm. It runs two applications — the public school website and the KITS admin dashboard — sharing a common design system, database layer, and API package.

Three external services (Sanity, Cloudflare R2, Resend) handle content, file storage, and email entirely outside the server. The Hetzner box runs application code only.

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
│   └── config/                  ← shared tailwind, eslint, tsconfig
├── docs/
│   └── Design System/           ← design system documentation
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
|Framework|Next.js (App Router)|~16.1.6|SSG/SSR, SEO, image optimization|
|Language|TypeScript|~5.9.2|Type safety across entire monorepo|
|Monorepo|Nx + pnpm|Nx 22.6.0|Consistent builds, shared packages, task orchestration|
|Styling|Tailwind CSS|3.4.3|Utility-first, maps directly to design tokens|

### Data Layer

|Layer|Technology|Purpose|
|---|---|---|
|Database|PostgreSQL|Primary data store — admissions, feedback, results metadata, schedules|
|ORM|Prisma 7|Type-safe database access, migrations|
|API|tRPC 11|Type-safe API — no REST boilerplate, shared types between apps|
|State (client)|TanStack Query 5|Server state management, caching, background refetch|

### Content and Media

|Service|Purpose|Tier|
|---|---|---|
|Sanity.io|CMS — news, gallery, societies, staff, FAQ, announcements|External (not server load)|
|Cloudflare R2|File storage — photos, PDFs, documents|External (CF edge, not server load)|

### Auth and Communication

|Service|Technology|Purpose|
|---|---|---|
|Admin auth|NextAuth.js 4|KITS admin login — email + password|
|Email|Resend 6|Admissions notifications, feedback, contact forms|

### Internationalisation

|Setting|Value|
|---|---|
|Package|next-intl 4|
|Launch locale|`en` (English)|
|Future locales|`si` (Sinhala), `ta` (Tamil) — infrastructure ready|
|URL pattern|`cwwkcc.lk/en/about`, `cwwkcc.lk/si/about`|
|Translation files|`apps/web/messages/en.json`|

### Animation

|Library|Version|Usage|
|---|---|---|
|Framer Motion|^12.38.0|All animations in `apps/web`. No raw CSS keyframes for UI animation.|

### Validation

|Library|Purpose|
|---|---|
|Zod 4|Schema validation — forms, API inputs, environment variables|

### Infrastructure

|Layer|Technology|Notes|
|---|---|---|
|Hosting|Hetzner CX32 (4 vCPU, 8GB RAM)|Shared with Paideon, separate Docker containers|
|Reverse proxy|Caddy|Auto HTTPS, all domain routing|
|Containers|Docker Compose|Reproducible deployments|
|CI/CD|GitHub Actions|Auto deploy on push to `main`|

---

## Hosting Architecture

```
Hetzner CX32 (4 vCPU, 8GB RAM)
└── Docker Compose
    ├── paideon-api       → api.paideon.lk
    ├── paideon-portal    → paideon.lk
    ├── nexus-web         → cwwkcc.lk
    ├── nexus-admin       → admin.cwwkcc.lk
    ├── postgres          (paideon_db + nexus_db — separate databases)
    └── caddy             (HTTPS + routing for all domains)

File storage:   Cloudflare R2    (external — CF edge, not server load)
CMS:            Sanity.io        (external — not server load)
Email:          Resend           (external — not server load)
```

**Performance risk:** Results day traffic spike. **Mitigation:** PDFs served directly from R2 via Cloudflare edge. Next.js ISR caches the results listing page. Server handles initial render only.

**Scaling path:** One-click Hetzner resize to CX42 (8 vCPU, 16GB RAM). No migration required.

---

## Sanity CMS

### Why Sanity

Sanity was chosen over Strapi, Payload, Ghost, and Drupal for three reasons:

1. **External hosting** — runs outside the Hetzner box entirely. No server load for content operations.
2. **Editor experience** — the best visual editing experience for non-developer staff. Feels like a product, not a developer tool.
3. **Free tier** — 3 users, unlimited content, sufficient permanently at this scale.

### Sanity Setup

**Project:** Created at sanity.io — project ID stored in environment variables. **Studio:** Sanity Studio embedded in the admin panel at `admin.cwwkcc.lk/studio` OR hosted separately at `studio.cwwkcc.lk`. **Client:** `@sanity/client` + `@sanity/image-url` — already in `package.json`.

### Content Schemas (to be built)

|Schema|Fields|Used By|
|---|---|---|
|`news`|title, slug, body (portable text), coverImage, category, publishedAt, featured|News pages|
|`announcement`|message, type (warning/info/error), expiresAt, active|Site-wide banner|
|`staffProfile`|name, role, department, portrait, tenure, bio, order, visible|Administration page|
|`society`|name, slug, badge, tagline, about, leadership, achievements, events, gallery, joinInfo|Societies pages|
|`galleryAlbum`|title, slug, year, category, coverImage, photos[], videoLinks[]|Gallery page|
|`achievement`|title, category, year, description, image|Achievement ticker + archive|
|`alumniProfile`|name, gradYear, role, quote, portrait|About page alumni section|
|`faqEntry`|question, answer, category|Admissions FAQ|
|`facilityPage`|name, slug, description, heroImage, features[], gallery[]|Facilities page|
|`extracurricular`|name, slug, category, description, achievements, teacherInCharge, studentQuote, media[]|Extracurriculars page|

### Sanity Client Configuration

```typescript
// packages/db/src/lib/sanity.ts
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,        // 'production'
  useCdn: true,                                // true for public pages (faster)
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,         // only needed for writes (admin)
})
```

### Sanity Environment Variables

```env
SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_API_TOKEN=                    # write token — admin panel only
NEXT_PUBLIC_SANITY_PROJECT_ID=       # exposed to client for image URLs
NEXT_PUBLIC_SANITY_DATASET=production
```

---

## Cloudflare R2

### Why R2

- Files served from Cloudflare's global edge network — not the Hetzner box
- No egress fees (unlike AWS S3)
- S3-compatible API — migration to MinIO is one sync command if ever needed
- Free tier: 10GB storage, 1M requests/month — sufficient permanently at this scale

### Bucket Structure

```
nexus-bucket/
├── gallery/
│   ├── albums/
│   │   └── [album-slug]/
│   │       └── [filename].jpg
│   └── thumbnails/
│       └── [filename]-thumb.jpg
├── results/
│   └── [exam-type]/
│       └── [year]/
│           └── results.pdf
├── staff/
│   └── [staff-id]/
│       └── portrait.jpg
├── societies/
│   └── [society-slug]/
│       └── [filename].jpg
├── documents/
│   └── admissions/
│       └── [filename].pdf
└── audio/
    └── anthem.mp3
```

### R2 Client Configuration

Using AWS SDK v3 (S3-compatible):

```typescript
// packages/db/src/lib/r2.ts
import { S3Client } from '@aws-sdk/client-s3'

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,          // https://[account-id].r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
})

export const R2_BUCKET = process.env.R2_BUCKET_NAME   // 'nexus-bucket'
export const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL // https://files.cwwkcc.lk
```

### R2 Environment Variables

```env
R2_ENDPOINT=https://[account-id].r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=nexus-bucket
R2_PUBLIC_URL=https://files.cwwkcc.lk
```

### R2 Public Access

Files are served through a Cloudflare custom domain (`files.cwwkcc.lk`) connected to the R2 bucket. All gallery photos and result PDFs are served directly from Cloudflare's edge — the Hetzner server never handles file delivery.

---

## Resend (Email)

### Why Resend

Clean API, React Email support for templated HTML emails, 3,000 emails/month free — more than sufficient for admissions enquiries and feedback notifications at this scale.

### Email Events

|Trigger|From|To|Template|
|---|---|---|---|
|Admissions enquiry submitted|`noreply@cwwkcc.lk`|Admissions office email|Enquiry details + student info|
|Contact form submitted|`noreply@cwwkcc.lk`|General enquiries email|Message + sender info|
|Feedback submitted|`noreply@cwwkcc.lk`|Feedback destination email|Category + message (no PII if anonymous)|

### Resend Configuration

```typescript
// packages/api/src/lib/email.ts
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)
```

### Resend Environment Variables

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@cwwkcc.lk
RESEND_ADMISSIONS_EMAIL=                # destination for admissions enquiries
RESEND_CONTACT_EMAIL=                   # destination for contact form
RESEND_FEEDBACK_EMAIL=                  # destination for feedback/complaints
```

---

## Database (PostgreSQL + Prisma)

### Why PostgreSQL

Operational data that doesn't belong in a CMS — admissions enquiries, feedback submissions, results metadata, facility schedules, admin users. Consistent with Paideon (separate database on the same Postgres instance).

### Prisma Schema (initial)

```prisma
// packages/database/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model AdminUser {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model AdmissionsEnquiry {
  id          String   @id @default(cuid())
  parentName  String
  childName   String
  dateOfBirth DateTime
  grade       String
  phone       String
  email       String
  message     String?
  status      EnquiryStatus @default(UNREAD)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Feedback {
  id         String         @id @default(cuid())
  name       String?        // nullable — anonymous allowed
  category   FeedbackCategory
  message    String
  reviewed   Boolean        @default(false)
  createdAt  DateTime       @default(now())
}

model Announcement {
  id        String           @id @default(cuid())
  message   String
  type      AnnouncementType @default(INFO)
  expiresAt DateTime?
  active    Boolean          @default(true)
  createdAt DateTime         @default(now())
  updatedAt DateTime         @updatedAt
}

model ResultEntry {
  id          String      @id @default(cuid())
  examType    ExamType
  year        Int
  pdfKey      String      // R2 object key
  summaryText String?     // e.g. "95% pass rate — 2025"
  uploadedAt  DateTime    @default(now())
}

model PoolScheduleEntry {
  id        String   @id @default(cuid())
  day       String   // "Monday", "Tuesday", etc.
  timeSlot  String   // "6:00 AM – 7:00 AM"
  group     String   // "Swimming Team", "Public Access", etc.
  updatedAt DateTime @updatedAt
}

enum EnquiryStatus {
  UNREAD
  READ
  RESPONDED
}

enum FeedbackCategory {
  ACADEMIC
  FACILITIES
  ADMINISTRATION
  GENERAL
}

enum AnnouncementType {
  INFO
  WARNING
  ERROR
}

enum ExamType {
  OL
  AL
  SCHOLARSHIP
}
```

### Database Environment Variables

```env
DATABASE_URL=postgresql://nexus_user:password@localhost:5432/nexus_db
```

---

## NextAuth (Admin Authentication)

### Configuration

Email + password authentication for KITS admin panel. Future: migrates to Paideon SSO.

```typescript
// apps/admin/src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Validate against AdminUser in database
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
}
```

### Auth Environment Variables

```env
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://admin.cwwkcc.lk
```

---

## Environment Variables — Complete Reference

### `apps/web` (public site)

```env
# Database
DATABASE_URL=

# Sanity (public — safe to expose)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity (server only)
SANITY_API_TOKEN=

# Cloudflare R2
R2_ENDPOINT=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=nexus-bucket
R2_PUBLIC_URL=https://files.cwwkcc.lk

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@cwwkcc.lk
RESEND_ADMISSIONS_EMAIL=
RESEND_CONTACT_EMAIL=
RESEND_FEEDBACK_EMAIL=
```

### `apps/admin` (KITS dashboard)

```env
# Database
DATABASE_URL=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://admin.cwwkcc.lk

# Sanity (write access)
SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_API_TOKEN=

# Cloudflare R2
R2_ENDPOINT=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=nexus-bucket
R2_PUBLIC_URL=https://files.cwwkcc.lk
```

---

## Build Phases

|Phase|Work|Key Files|
|---|---|---|
|0|Nx monorepo scaffold, pnpm, shared configs, Docker Compose, Caddy|`nx.json`, `docker-compose.yml`, `Caddyfile`|
|1|Design system — Tailwind tokens, CSS variables, typography|`tailwind.config.js`, `global.css`|
|2|Shared UI components — Button, Card, Badge, Input, Section, FadeIn|`packages/ui/`|
|3|Layout shell — Header, Footer, Navbar, mobile menu|`apps/web/src/components/layout/`|
|4|Homepage Hero|`apps/web/src/app/[locale]/page.tsx`|
|5|Homepage remaining sections|Same file|
|6|Sanity CMS setup — schemas for news, gallery, societies|`sanity.config.ts`|
|7|Admin panel shell — NextAuth, layout, dashboard|`apps/admin/src/`|
|8|News system — Sanity CRUD in admin, public feed + article pages||
|9|Announcements — admin toggle, site-wide banner||
|10|About page — timeline component, crest explainer, anthem player||
|11|Administration page — staff profiles from Sanity||
|12|Admissions page — form, Resend email, DB storage||
|13|Results portal — admin upload to R2, public search||
|14|Gallery — admin bulk upload to R2, public grid + lightbox||
|15|Facility schedules — pool timetable, admin editable||
|16|Societies system — hub page, per-society pages, admin CRUD||
|17|Academics, Extracurriculars, Facilities, KITS, Contact pages||
|18|Feedback/complaint form — Resend, DB storage, admin viewer||
|19|Hetzner deploy — Docker + Caddy + GitHub Actions CI/CD|`infra/`|
|20|i18n infrastructure — next-intl routing, EN messages file|`messages/en.json`|
|21|SEO — metadata, OG images, sitemap.xml, robots.txt||
|22|Performance — Lighthouse audit, Core Web Vitals, image optimization||

---

_Nexus — Tech Stack and Infrastructure_ _C.W.W. Kannangara Central College, Mathugama_ _Maintained by Kannangara ICT Society (KITS)_ _© 2026_