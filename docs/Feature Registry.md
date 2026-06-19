# Nexus — Complete Feature Registry

**C.W.W. Kannangara Central College Digital Platform** _Kannangara ICT Society (KITS) · Mathugama_

This document is the single authoritative list of every feature, system, and capability that Nexus will include. Every item here has a home in the Engineering Roadmap. Nothing is built that is not listed here. Nothing listed here is omitted from the build.

**Total features: 163**

---

## How to Read This Document

Each feature has:

- A **stable number** (never changes, even if order shifts)
- A **name**
- A **brief explanation** of what it is and why it exists

Features are grouped by concern. The build order is defined in the **Engineering Roadmap** — not by the order items appear here.

---

## Group 1 — Monorepo & Developer Tooling

**F-001 · pnpm Monorepo with Nx Orchestration** The entire project lives in one repository managed by pnpm workspaces. Nx provides task caching (build, lint, typecheck) and affected commands so only changed packages rebuild. This keeps developer iteration fast as the codebase grows.

**F-002 · Shared TypeScript Base Configuration** A single `tsconfig.base.json` at the root defines strict TypeScript options (strict mode, `noImplicitReturns`, `noUnusedLocals`) and path aliases for all packages (`@nexus/ui`, `@nexus/api`, `@nexus/db`, `@nexus/config`, `@nexus/validation`). Every app and package extends this base — one change propagates everywhere.

**F-003 · Root TypeScript Project References** The root `tsconfig.json` holds project references to every app and package. This enables incremental compilation across the monorepo — TypeScript only recompiles what changed.

**F-004 · Shared ESLint Configuration** A root `eslint.config.mjs` enforces consistent rules across all packages and apps: no unused variables, no implicit any, consistent import ordering, no console statements in production. Each package extends this base and adds package-specific rules.

**F-005 · Prettier Code Formatting** Prettier with a shared `.prettierrc` and `.prettierignore` enforces consistent formatting across every file in the monorepo. No debates about spacing or quotes — the formatter decides.

**F-006 · EditorConfig** A `.editorconfig` at the root ensures consistent indentation, line endings, and charset across editors and operating systems. Prevents invisible whitespace bugs when multiple developers work on the same files.

**F-007 · Environment Variable Documentation** `.env.example` files in the root and in each app document every required environment variable with its purpose and source. A developer who has never seen the project can know exactly what secrets are needed without reading the codebase.

**F-008 · Automated Dependency Vulnerability Scanning** `pnpm audit` runs in the GitHub Actions CI pipeline on every push. Any high-severity vulnerability in a third-party dependency fails the build and surfaces as a required fix before merging.

**F-009 · GitHub Actions CI Pipeline** A `.github/workflows/ci.yml` workflow runs on every push and pull request: TypeScript typecheck, ESLint lint, and a production build of both apps. No broken TypeScript or lint errors can merge to main.

**F-010 · GitHub Actions CD Pipeline** A `.github/workflows/deploy.yml` workflow runs on push to `main`: builds Docker images, pushes to GitHub Container Registry, SSHes into the Hetzner server, pulls new images, and restarts services with zero-downtime deployment. Every deployment is automatic, auditable, and reversible.

**F-011 · Code Generation Scripts** Scripts in `packages/config/scripts/` automate repetitive generation: the token CSS generator reads token definitions and outputs `tokens.css`; the `cn` group generator creates the typed class name utility. Running these ensures the generated output is always in sync with the source definitions.

---

## Group 2 — Design System Tokens (`packages/config`)

**F-012 · Color Token System** The complete institutional color palette defined as named tokens: forest greens (primary brand), parchment tones (content surfaces), gold accents, glass overlays, semantic colors (success, warning, error, info), and text hierarchy (primary, secondary, muted, inverted). No hardcoded hex values anywhere in the codebase after this is established.

**F-013 · Typography Token System** Typeface definitions and the complete type scale as tokens: Cormorant Garamond for display, Inter for body, IBM Plex Mono for code, Maname for Sinhala display, Noto Serif Sinhala for Sinhala body, Noto Serif Tamil for Tamil. Scale covers display sizes down to caption, with defined line heights, letter spacing, and weights at every step.

**F-014 · Trilingual CSS Variable Font Stack** Rather than per-component font classes, a single `--font-family-display` and `--font-family-body` CSS variable is composed from Next.js font variables. The browser automatically selects the correct typeface based on character unicode range. Zero per-component font management — add Tamil text anywhere and the right font loads automatically.

**F-015 · Spacing and Sizing Token System** Every margin, padding, gap, width, and height in the platform comes from a consistent scale based on a 4px unit. Arbitrary pixel values are banned. This is what makes the UI feel visually coherent — users perceive it even if they cannot articulate it.

**F-016 · Motion Token System** Animation tokens define durations (fast, base, slow, ceremonial) and easing functions (standard, decelerate, accelerate, `ceremonial` ember). Every animation in the platform draws from these tokens so the institutional feel — deliberate, dignified, never playful — is consistent without per-developer judgment calls.

**F-017 · Glass and Shadow Token System** The visual identity of Nexus is built on glass morphism: dark forest green with translucent layered surfaces. Glass surface tokens (subtle, medium, card), border highlight tokens, and shadow tokens are defined here and used by every surface.

**F-018 · Remaining Token Categories** Focus ring tokens (for keyboard navigation visibility), opacity scale, blur scale, border radius scale, z-index scale, aspect ratio tokens, and gradient definitions. Together with the above, these cover every visual dimension a component might need.

**F-019 · Tailwind nexusPreset** A single Tailwind preset in `packages/config` maps every token into Tailwind's theme. Both `apps/web` and `apps/admin` consume this preset — one source of truth for the entire visual language expressed as utility classes.

**F-020 · tokens.css Generator** A script reads the TypeScript token definitions and generates a `tokens.css` file containing every token as a CSS custom property. This file is imported once in each app's `global.css`. Tokens are defined in TypeScript (type-safe, auditable) and consumed in CSS (zero runtime cost).

**F-021 · Design System Viewer** Interactive documentation pages in `apps/admin/src/app/design-system/` covering every token category and every component. Serves as a live reference for developers and a demonstration tool for the principal presentation. Only exists in admin — never ships to the public site.

---

## Group 3 — Component Library (`packages/ui`)

**F-022 · Atom Components** The smallest building blocks: Button, ButtonLink, Badge, Avatar, Tag, ResultsGradeBadge, InlineHelpText. Every other component is built from these or alongside them. Each has TypeScript props, ARIA attributes, design token usage only, and all variants from the design system.

**F-023 · Spinner Components** BeatLoader, ScaleLoader, BarLoader — animated with Framer Motion. Used wherever asynchronous operations run. Institutional character: subtle, not aggressive.

**F-024 · Form Components** The complete form system: Input, Select, Textarea, Checkbox, Radio, Toggle, Slider, FileUploadZone, Calendar, FormFieldGroup, FormErrorMessage, FormValidationSummary, RequirementsChecklist, ProgressIndicator. Used in both the public contact forms and the entire admin panel. Built once in `packages/ui`, identical quality everywhere.

**F-025 · Card Components** Every card variant: NewsCard, StaffCard (principal, grid, and compact variants), EventCard, SocietyCard, SocietyBanner, FacilityCard, GalleryAlbumCard, AchievementCard, ExtracurricularCard, AcademicStreamCard, StatCard, DownloadableDocumentItem. Cards are the primary display format for database content on the public site.

**F-026 · Layout Components** Structural components: Container (content width constraints), Grid (responsive), Hero (background, overlay, content slots), Navigation (mobile menu, locale switcher, scroll behaviour), Footer (identity strip, links, social icons), Stack, MasonryGrid, QuickAccessPortal.

**F-027 · Brand Icon Components** CrestAnimation (hero variant with entrance animation; loading variant for transitions — the defining visual of the platform), CrestDiagram (interactive explainer with labelled parts), SchoolLogo. Built from official SVG artwork, not approximated. The crest animation: single deliberate sweep, settles — institutional, not decorative.

**F-028 · Social Media Icon Components** All social icons as React SVG components from official brand kits: Facebook (color, white), Instagram (glyph gradient, glyph black, glyph white), LinkedIn (black, color, inline color, white), YouTube (black, color, inline variants, white), WhatsApp (glyph black, green, white; stacked variants), GitHub (Invertocat and lockup variants). Never icon fonts or third-party libraries for brand icons.

**F-029 · Icon Registry System** `Icon.tsx` and `registry.ts` provide a unified icon API across the component library. A named `<Icon name="search" />` pattern means no direct Lucide imports scattered throughout the codebase, and the icon set can be swapped or extended in one place.

**F-030 · Visualization Components** DataTable (sortable, paginated), ResultsDisplay (exam results with grade badges), ComparisonBar (stream comparison), ProgressArc, StudentJourneyFlow, StreamComparisonTable, TimetableGrid, ProcessSteps. Serve the academic and institutional data needs of the platform.

**F-031 · Page State Components** LoadingScreen (with CrestAnimation), LoadingSkeleton (content placeholders), ErrorState (inline and section variants), EmptyState, NotFound, OfflineBanner, CookieConsentBanner. Every possible application state has a designed response — no user ever sees a blank white screen or unhandled browser error.

**F-032 · Notification Components** Alert (inline messaging), Toast (transient feedback), AnnouncementBanner (urgent school-wide communications at the top of every page). The AnnouncementBanner is how the school publishes urgent information — exam dates, closures, results availability — to all visitors.

**F-033 · Overlay Components** Modal, Drawer, DropDownMenu, ShareSheet, ToolTip. All handle focus trapping, keyboard navigation, and scroll locking correctly. Used throughout both admin and public interfaces.

**F-034 · Navigation Components** Accordion, Breadcrumb, FilterBar, LanguageSwitcher, MobileMenu, NavLink, Pagination, SearchInput, TableOfContents, Tabs. The navigation system must work correctly in all three languages and across all device sizes.

**F-035 · Media Components** AudioPlayer (school anthem), Caption, ImageFrame, Lightbox (gallery), MapEmbed, PanoramicFacilityViewer, VideoFrame. Handle all rich media types the platform needs with consistent design treatment.

**F-036 · Section Components** AchievementTicker, AdmissionsKeyDatesTimeline, AdmissionsProcessSteps, AlumniLegacyBlock, LifeAtKCCPhotoStrip, PrincipalMessage, SectionSlider, StatsStrip, Timeline. Larger composites used as named sections on public pages.

**F-037 · Typography Components** EyebrowLabel, Heading, InlineLink, QuoteBlock, RichTextRenderer, SectionHeader, Text. Enforce consistent typographic treatment — a developer never hardcodes a font size or picks a heading level arbitrarily.

**F-038 · Utility Components** BackToTopButton, CountdownTimer, ScrollProgressBar. Small quality-of-life additions that add polish to the public experience.

**F-039 · AmbientEmbers Effect** A subtle particle effect used in specific hero contexts. Reinforces the `ember` motion token aesthetic — the living warmth of an institution, not a visual gimmick.

**F-040 · Shared Hooks** `useCountUp` (animated number counting for statistics), `useInView` (intersection observer for scroll-triggered animations), `useActiveSection` (scroll tracking for navigation highlighting), `useScrollDirection` (show/hide navigation bar), `useMediaQuery`, `useLocalStorage`, `useFormField`. Consumed by components throughout the library.

**F-041 · cn Utility** The `cn()` function combines `clsx` and `tailwind-merge`. Allows conditional class names without Tailwind conflicts. Used in virtually every component.

---

## Group 4 — Validation (`packages/validation`)

**F-042 · Domain Entity Zod Schemas** Every domain entity has a Zod schema: User, StaffMember, PrincipalMessage, NewsArticle, SchoolEvent, GalleryAlbum, GalleryPhoto, Achievement, AlumniProfile, ExamResult, MediaAsset, PageConfig, AuditLog, Announcement, Society. This is the single source of truth for data shapes across the entire platform.

**F-043 · Admin Form Schemas** Form-specific schema variants (`.omit()` server-generated fields, `.extend()` with UI-only fields like `confirmPassword`) for every admin create/edit form. The same validation that runs on the server also runs on the client — no duplication, no drift.

**F-044 · Inferred TypeScript Types** All TypeScript types are inferred from Zod schemas using `z.infer<>`. No separate interface files. When the schema changes, the type changes automatically everywhere it is used.

---

## Group 5 — Database (`packages/database`)

**F-045 · Complete Prisma Schema** All models with full relations, indices, and constraints: User, News, Staff, Society, Event, GalleryAlbum, GalleryPhoto, Achievement, AlumniProfile, ExamResult, PageConfig, MediaAsset, AuditLog, Notification. The schema is the authoritative definition of the data model — the database is generated from it, not the other way around.

**F-046 · Prisma Client Singleton** A properly initialised Prisma client with the singleton pattern for Next.js (prevents connection exhaustion in development with hot reload). Exported as the single `db` import used everywhere in the backend.

**F-047 · Database Migrations** Every schema change gets a Prisma migration file. Migration files are committed to the repository and never edited. The full migration history is the complete record of how the schema evolved.

**F-048 · Database Seed Script** A seed script creates the initial admin user (hashed password, Admin role) and any essential reference data. Runs once on initial deployment and again after a database reset in development.

**F-049 · Automated Daily Database Backups** A cron job runs `pg_dump` nightly and uploads the encrypted backup to a dedicated Cloudflare R2 bucket with 30-day retention. Backups are tested for restorability before launch.

**F-050 · Database Connection Pooling** PostgreSQL connection pooling configured for the production environment. Prevents connection exhaustion under concurrent load, particularly on results portal peak days.

**F-051 · Automated Database Cleanup Tasks** Scheduled jobs remove genuinely orphaned records: expired sessions, soft-deleted records past retention period, unused media asset references. Never deletes content — only technical debris.

**F-052 · Soft-Delete Pattern** Content is never hard-deleted. A `deletedAt` timestamp marks records as archived. The audit log retains the history. Admin panel deletions trigger soft-deletes. This means accidental deletions are always recoverable from the live database without needing a backup restore.

---

## Group 6 — API Layer (`packages/api`)

**F-053 · tRPC Server Setup** tRPC router initialisation with context (authenticated session from Auth.js, Prisma db client). Public procedures for read-only public data; protected procedures requiring an active admin session for all writes. The type-safe contract between frontend and backend.

**F-054 · Content Routers** tRPC routers for every content domain: newsRouter, staffRouter, eventsRouter, societiesRouter, galleryRouter, achievementsRouter, alumniRouter, resultsRouter, mediaRouter. Each defines list, getById, create, update, delete, and domain-specific operations (publish, archive, approve, reorder).

**F-055 · System Routers** pageConfigRouter (section order and visibility per page), analyticsRouter (event recording and aggregation), auditRouter (append-only log reads), notificationRouter (announcement CRUD), userRouter (admin user management). The operational layer of the platform.

**F-056 · tRPC Client Configuration** tRPC client setup in both `apps/web` (for server components making direct procedure calls) and `apps/admin` (for client components using React Query integration). Type inference flows from the server router definition to every client call.

**F-057 · Input Validation on Every Procedure** Every tRPC procedure that accepts input validates it against the corresponding `@nexus/validation` Zod schema. Invalid input is rejected with a typed error before touching the database. No raw user input reaches a database query.

**F-058 · Rate Limiting** API-level rate limiting via Next.js middleware: results portal capped at 10 requests per minute per IP; contact form capped at 5 per hour per IP; general API routes protected against abuse. Implemented without external services — in-memory or lightweight middleware.

**F-059 · Health Check Endpoints** `/api/health` routes on both apps return a 200 with service status. Used by Docker healthchecks, UptimeRobot monitoring, and deployment scripts to verify a container is alive before routing traffic to it.

---

## Group 7 — Authentication & Access Control

**F-060 · Auth.js with Prisma Adapter** Auth.js (NextAuth) configured with the Credentials provider and Prisma adapter. Sessions are stored in the database. The User model in Prisma holds hashed passwords and role assignments.

**F-061 · bcrypt Password Hashing** All admin passwords hashed with bcrypt at a sufficient cost factor. Plain text passwords are never stored or logged anywhere in the system.

**F-062 · Role-Based Access Control** Two roles: Admin (full access to all modules, user management, settings) and Editor (create and edit content, cannot manage users, cannot access settings, cannot delete published content). Role is checked in tRPC procedures and in admin UI conditionally rendering controls.

**F-063 · Admin Route Protection Middleware** Next.js middleware on `apps/admin` checks for a valid Auth.js session on every request to any route except `/login`. Unauthenticated requests are redirected to `/login`. The public site has no authentication layer.

**F-064 · Admin Login Page** A designed login page in `apps/admin` with email/password form, validation, error messaging, and the institutional visual treatment. The first thing any admin user sees.

**F-065 · Seed Script for Initial Admin User** The database seed creates the first Admin-role user from environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD`). Without this, there is no way to log in to a freshly deployed instance.

**F-066 · Password Reset Flow** An admin user can request a password reset by email. A time-limited token is sent via Resend. The token is single-use and expires after one hour. No security questions — email-based only.

**F-067 · User Deactivation** Admin users are never deleted from the database — they are deactivated (a boolean flag). Deactivated users cannot log in. Their records are retained so the audit log remains meaningful — every action is still traceable to a real person.

**F-068 · Secret Management** All credentials (database URL, Auth.js secret, R2 keys, Resend API key) live in environment variables. Never committed to the repository. `.env.example` documents what is needed. GitHub repository secrets hold CI/CD values. Production secrets live in `.env` on the Hetzner server.

---

## Group 8 — Internationalisation

**F-069 · next-intl Locale Routing** Three locale routes: `/en/`, `/si/`, `/ta/`. The routing is defined in `packages/web/src/i18n/routing.ts`. Every public page is available in all three languages. The admin panel is English-only.

**F-070 · Per-Feature Message Files** Translation strings are split into separate JSON files per locale per feature area: navigation, common, home, about, news, events, societies, facilities, admissions, results, contact, gallery. This prevents a single massive translation file and allows partial updates without touching unrelated strings.

**F-071 · Complete English Translations** All message keys for all feature areas filled in English. English is the baseline — every key that exists in English must exist in the other locales.

**F-072 · Complete Sinhala Translations** All message keys translated into Sinhala by a native speaker. Machine translation is used for drafts only — a human native speaker reviews all strings before launch.

**F-073 · Complete Tamil Translations** All message keys translated into Tamil by a native speaker. Same quality process as Sinhala.

**F-074 · Automatic Locale Fallback** If a translation key is missing for a locale, the system falls back to English rather than crashing. Missing keys surface as build warnings so they can be tracked and filled before launch.

**F-075 · LanguageSwitcher Component** A component on every page that switches the locale while preserving the current page path. Stores the user's preference. Works correctly with dynamic routes (a user reading a news article in English can switch to Sinhala and stay on the same article).

---

## Group 9 — Error Handling & Resilience

**F-076 · Locale-Level Error Boundary** `error.tsx` at the `[locale]` layout level in `apps/web`. Any component crash within a page renders the `ErrorState` component with a retry button instead of a broken or blank page. Users always get a designed response.

**F-077 · Root-Level Error Boundary** `global-error.tsx` at the root layout level in both apps. Catches crashes in the root layout itself (font loading failure, token CSS failure). Uses raw inline styles — no design system imports, because the system that loads the design system is what failed. A last line of defence.

**F-078 · Designed 404 Page** `not-found.tsx` in both apps with the institutional visual treatment — CrestAnimation, a clear message, and a link back to the home page. A 404 should feel like the school, not like a browser default.

**F-079 · Section-Level Error Boundaries** React `ErrorBoundary` wrappers around major page sections (News, Gallery, Results) so a failure in one section does not take down the whole page. A user can still read the rest of the page if the gallery section fails to load.

**F-080 · OfflineBanner** Detects when the user loses network connectivity and shows a non-blocking banner explaining that some content may be unavailable. Disappears automatically when connectivity is restored. Relevant given the network conditions in the Mathugama area.

---

## Group 10 — Logging & Monitoring

**F-081 · Audit Logging** Every write operation in the tRPC API creates an immutable audit log entry: who performed the action, what entity was affected, what the before and after values were, when. The log is append-only — no entry is ever edited or deleted. Answers "who changed this and when" for any piece of content.

**F-082 · Audit Log Viewer** A read-only admin panel module showing the full audit log with filters by user, entity type, action type, and date range. Individual entries show the diff of changed fields. Never editable.

**F-083 · Structured Server-Side Logging** Server-side operations log structured events (not `console.log`). Log levels (info, warn, error) allow filtering. Errors include stack traces. Logs are readable via `docker logs` in production.

**F-084 · UptimeRobot Monitoring** UptimeRobot checks `cwwkcc.lk` and `admin.cwwkcc.lk` every 5 minutes. Sends email alerts to the KITS lead and on-call developer when either goes down. Free tier is sufficient.

**F-085 · Optional Sentry Error Tracking** Sentry integration configured via `SENTRY_DSN` environment variable. When set, unhandled errors in both apps are reported to Sentry with full context (user session, request details, stack trace). Optional — the platform functions without it, but it significantly accelerates debugging.

**F-086 · Docker Healthchecks** Each Docker service defines a healthcheck. The compose orchestrator restarts unhealthy containers automatically. The deployment script waits for containers to report healthy before marking a deployment successful.

---

## Group 11 — Analytics

**F-087 · Custom Analytics Collector** A lightweight event collector in Next.js middleware records page views server-side. No third-party JavaScript on the public site. No cookies required. GDPR-friendly. Full data ownership.

**F-088 · Tracked Analytics Events** Page views (URL, locale, referrer), search queries (term, result count), results portal lookups (exam type, year — no index numbers), contact form submissions (no PII), language distribution, device type classification.

**F-089 · Analytics Dashboard** Admin panel module displaying: total page views by day/week/month, top pages with trend indicators, zero-result search queries (content gap finder), results portal usage patterns, content performance (views per article), locale distribution, device split.

**F-090 · Umami Self-Hosted Analytics** Umami runs as a Docker container on the same Hetzner server. Provides a backup analytics view and a privacy-first alternative to Google Analytics. Data stays on school-controlled infrastructure.

---

## Group 12 — SEO & Discoverability

**F-091 · generateMetadata for Every Page** The root layout provides baseline metadata. Every page type overrides with specifics: news articles include headline, author, publication date; events include start date and location; staff profiles include name and role. Every page has a unique title and description.

**F-092 · JSON-LD Structured Data** Schema.org markup for every relevant content type: EducationalOrganization (school), NewsArticle, Event, Person (staff), WebApplication (results portal). Correct structured data enables rich results and knowledge panels in Google Search.

**F-093 · Dynamic Sitemap** `sitemap.ts` using Next.js conventions generates a sitemap covering all static pages and all dynamic pages (every news article, society, gallery album). Submitted to Google Search Console and Bing Webmaster Tools.

**F-094 · robots.txt** Allows indexing of all public pages. Disallows the admin panel, API routes, and results portal (individual result pages must never appear in search results — that would be a privacy violation).

**F-095 · Sitemap Ping on Content Publish** When a news article or event is published, the sitemap is regenerated and a ping is sent to search engines. New content is discoverable within hours, not the next crawl cycle.

**F-096 · Open Graph Image Generation** Programmatically generated OG images for all page types using Next.js image generation. When a page is shared on social media, the preview shows a branded image rather than a blank placeholder.

---

## Group 13 — Performance

**F-097 · next/image for All Images** Every image on the public site uses `next/image` with explicit dimensions, blur placeholder, and responsive `sizes`. Prevents layout shift, enables lazy loading, and automatically serves WebP.

**F-098 · Dynamic Imports for Heavy Components** CrestAnimation, AudioPlayer, the Tiptap rich text editor, and PanoramicFacilityViewer are dynamically imported. The initial page bundle does not include these until they are needed. Reduces Time to Interactive on first load.

**F-099 · Package Import Optimisation** `optimizePackageImports` in `next.config.js` for `@nexus/ui` and `framer-motion`. Only imported components are bundled — not the entire library.

**F-100 · Static Generation for Content Pages** `generateStaticParams` for news articles, society pages, and gallery albums. These pages are pre-rendered at build time and served from the CDN edge. Database is not queried on every visitor request.

**F-101 · Cloudflare R2 CDN for Media** All images and PDFs served from Cloudflare R2 with edge caching. Zero egress fees. Global delivery. The school's media assets load fast regardless of where in the world a visitor is.

**F-102 · Performance Budget Monitoring** Lighthouse CI runs in GitHub Actions on every build. Fails if Performance, Accessibility, Best Practices, or SEO scores drop below 90 on mobile. Prevents performance regressions from silently shipping.

**F-103 · Image Optimisation Pipeline** Images uploaded through the admin panel are processed with Sharp before upload to R2: resized to maximum required display dimensions, converted to WebP, stripped of EXIF metadata. Smaller files, faster loads, no private metadata leaking.

---

## Group 14 — Infrastructure & Deployment

**F-104 · Multi-Stage Dockerfiles** Dockerfiles for both apps use multi-stage builds: install and build stage, then a minimal runtime stage with only the compiled output. Production images are small, fast to pull, and contain no build tools.

**F-105 · Docker Compose Orchestration** `docker-compose.yml` defines five services: postgres, nexus-web, nexus-admin, umami, caddy. Named volumes for persistence. Environment variable references for secrets. Health checks and restart policies on every service.

**F-106 · Caddy Reverse Proxy with Automatic HTTPS** Caddy routes `cwwkcc.lk` to nexus-web and `admin.cwwkcc.lk` to nexus-admin. Provisions and renews TLS certificates automatically via Let's Encrypt. No manual certificate management ever.

**F-107 · Hetzner CX22 VPS** The production server: 2 vCPU, 4GB RAM, 40GB SSD. Self-hosted. School-controlled. No vendor lock-in beyond the hosting provider. Approximately LKR 1,500/month.

**F-108 · Cloudflare R2 Media Storage** Object storage for all uploaded media. Presigned URLs mean the browser uploads directly to R2 — the Next.js server is never in the upload path. No egress fees. S3-compatible API.

**F-109 · Resend Transactional Email** Email sending for contact form notifications, feedback form acknowledgements, and admin password reset. Free tier (3,000 emails/month) is more than sufficient. Simple REST API, no SMTP configuration.

**F-110 · Security Headers via Caddy** Strict-Transport-Security (HSTS), Content-Security-Policy, X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy (strict-origin-when-cross-origin). Configured once in Caddyfile, applies to all traffic.

**F-111 · Server Firewall** `ufw` allows only ports 80 (HTTP), 443 (HTTPS), and 22 (SSH). All other ports blocked. The PostgreSQL port is never exposed to the public internet — only accessible within the Docker internal network.

**F-112 · SSH Key Authentication** Password-based SSH login disabled on the Hetzner server. Only SSH key holders can access the machine. A deployment user with minimal permissions handles automated deployments.

**F-113 · GitHub Container Registry** Docker images are pushed to GitHub Container Registry (GHCR) as part of the CD pipeline. The production server pulls from GHCR. Images are versioned by commit SHA — any deployment can be rolled back to a specific image.

---

## Group 15 — Testing

**F-114 · Unit Tests** Vitest unit tests for shared utilities and hooks in `packages/ui`: `useCountUp`, `useInView`, `cn`, form validation logic. Pure functions are the easiest to test and the most valuable — they run on every component render.

**F-115 · Integration Tests** Integration tests for tRPC API routes against a test database. Verifies that authentication, validation, and data persistence work correctly end-to-end through the API layer — not just in isolation.

**F-116 · End-to-End Tests** Playwright E2E tests covering the critical user journeys: looking up exam results, submitting the contact form, switching locale, navigating between pages. These run in CI against a built version of the app.

---

## Group 16 — Public Website (`apps/web`)

**F-117 · Home Page** Hero with CrestAnimation, headline, and call to action. Statistics Strip with animated counters. Principal's Message. Latest News (three most recent published articles). Upcoming Events (next three). Quick Access Portal (links to Results, Admissions, Societies, Gallery). Announcement Banner when active. Section order controlled by the Page Configuration system.

**F-118 · About Page** Hero. Stats. Namesake section (C.W.W. Kannangara portrait and biography). School story. Timeline. Ethos. Values. Interactive CrestDiagram. Alumni Legacy. School Anthem with AudioPlayer. Closing statement. The centrepiece of the platform — complete before the principal presentation.

**F-119 · News Listing Page** All published news articles with category filter, pagination, and search. Server-rendered with static generation for each category. Metadata for SEO.

**F-120 · News Article Page** Individual article with rich text rendering via RichTextRenderer, author attribution, publication date, related articles, social sharing via ShareSheet. Statically generated at build time. OG metadata per article.

**F-121 · Events Listing Page** Events with calendar view and list view, filterable by category and month. Upcoming events distinguished from past events.

**F-122 · Event Detail Page** Full event description, date, time, venue, category, optional registration link. Map embed for venue location.

**F-123 · Societies Hub** All societies with category filter. Each society shown as a SocietyCard. High-engagement page for current students.

**F-124 · Society Detail Page** Banner, description, advisor StaffCard, founding year, member count, recent events, gallery preview.

**F-125 · Facilities Page** FacilityCard grid for all school facilities. Content managed through admin. Descriptions and photos updatable without a developer.

**F-126 · Admissions Page** Admissions process via ProcessSteps. Key dates via AdmissionsKeyDatesTimeline (sourced from Events table). Requirements. ContactForm for admissions enquiries.

**F-127 · Gallery Listing Page** Albums sorted by year. GalleryAlbumCard for each. Year-based filtering.

**F-128 · Gallery Album Page** Photo grid with Lightbox for full-screen viewing. All images via `next/image`. Alt text on every photo.

**F-129 · Results Portal** Index number + exam year lookup. Rate-limited at 10 requests/min/IP. Returns only the queried result — no browsing, no bulk access. ResultsDisplay component with grade badges. Available in all three languages. The most important functional feature for the community.

**F-130 · Contact Page** ContactForm wired to Resend. FeedbackForm for general feedback. Both rate-limited. Both validate on client and server using Zod schemas.

**F-131 · Alumni Directory** Searchable by graduation year, profession, country. Shows name, year, position, quote — no private contact information. Submission form for new profiles enters an admin approval queue. Builds the school's network over time.

**F-132 · Digital Archive** Historical photographs, old annual magazines (PDFs with searchable metadata), prize-giving records, prefect lists by year. Browsable by year, searchable by full-text. Unique institutional value — a 150-year-old school with a properly organised digital memory.

**F-133 · Achievement Database** Academic achievements (A/L results, university admissions), sports (tournament wins, national athletes), arts and cultural, competition results. Filterable by year, category, student name. Updated each year, becoming a permanent living record.

**F-134 · Unified Search** Single search box accessible from every page via Navigation. Queries across all content types simultaneously. PostgreSQL full-text search supporting Sinhala, Tamil, and English. Results grouped by type, ranked by relevance. New content types automatically searchable.

**F-135 · Cookie Consent Banner** CookieConsentBanner shown on first visit. Persisted to localStorage. GDPR-compliant: no analytics cookies set before consent. The school serves an international diaspora — compliance matters.

---

## Group 17 — Admin CMS (`apps/admin`)

**F-136 · Admin Shell Layout** Persistent sidebar navigation, topbar with user avatar and session info, breadcrumb navigation, responsive mobile drawer. Every admin module lives inside this shell. The shell is the first thing built — before any module.

**F-137 · Dashboard** Content counts, recent activity feed (last 10 audit log entries), quick action buttons (new article, new event, new announcement), pending items summary (drafts, unapproved alumni profiles).

**F-138 · News Module** List view with status badges, search and filter by category and date, bulk actions. Create/edit with Tiptap rich text editor, cover image via media library, category, status workflow (draft → review → published → archived), SEO preview. Validates against `NewsArticleSchema`.

**F-139 · Staff Module** List sorted by role hierarchy. Create/edit with name, title, role, department, tenure, quote, portrait via media library. Drag-and-drop reorder (the `order` field controls public site display sequence).

**F-140 · Events Module** Calendar view and list view. Create/edit with title, description, date, time, venue, category, status, optional registration link. Status workflow mirrors news.

**F-141 · Societies Module** Create/edit with name, slug, category, tagline, description, member count, founding year, logo upload, banner upload, advisor staff member selection.

**F-142 · Gallery Module** Album creation with title, year, category, cover photo selection. Batch photo upload to R2 with progress indicators. Per-photo alt text (required). Album reordering.

**F-143 · Results Module** CSV bulk upload with preview and validation step before commit. Individual result entry form. Search interface to test the public-facing results lookup before publishing.

**F-144 · Media Library** Grid view of all uploaded assets with search and tag filtering. Sharp-processed upload (resize + WebP). Alt text editing. Usage tracking (which content uses each asset). Bulk delete with usage warning. The central asset management system.

**F-145 · Page Configuration Module** For each configurable page, the current section order as draggable cards with enable/disable toggles. Changes save to `PageConfig` and take effect on the next public page load. Full page composition control without a developer.

**F-146 · Analytics Dashboard Module** The custom analytics interface in admin: views by day/week/month, top pages, zero-result searches, results portal usage, content performance, locale and device distribution.

**F-147 · User Management Module** List all admin users with roles. Invite new users by email. Role assignment. Password reset initiation. User deactivation. Roles enforced — an Editor cannot access this module.

**F-148 · Announcements Module** Create announcements with variant (info, warning, error), message, publish date, optional expiry. View active and past. Deactivate or expire. Simple and deliberate — not a full notification platform.

**F-149 · Audit Log Viewer Module** Chronological feed of all admin actions. Filters by user, entity type, action, date range. Per-entry diff of changed fields. Read-only. The transparency layer of the platform.

**F-150 · Settings Module** Global platform settings: school name, address, contact details, social URLs, founding year, motto. Read by the public site for footer, JSON-LD, and metadata. Changes here propagate everywhere without a code deploy.

**F-151 · Content Preview Mode** Editors can see a live preview of draft content before publishing. Preview is accessible only to authenticated admin users. The public site never shows draft content to unauthenticated visitors.

**F-152 · Content Versioning** Every published content edit creates a version snapshot. Editors can view the version history of any article and revert to a previous state. Prevents accidental content loss.

---

## Group 18 — PWA & Offline Support

**F-153 · Service Worker** Caches the shell (navigation, footer, CSS, fonts) on first load. Caches home and about pages for offline access. Network-first strategy for dynamic pages (news, events) with a cached fallback. Implemented with `next-pwa` or a custom service worker.

**F-154 · Web App Manifest** `manifest.json` with school name, icons in all required sizes (192px, 512px, maskable), theme color matching the design system, display mode `standalone`. Enables "Add to Home Screen" — the platform appears as an app icon on mobile.

**F-155 · Designed Offline Page** A cached offline page shown when a user attempts to visit an uncached page without connectivity. Institutional design treatment, links to cached pages that are available. No browser default error.

---

## Group 19 — Comprehensive Project Documentation

**F-156 · Architecture Decision Records (ADRs)** `docs/adr/` contains a record for every significant technical choice: ADR-001 Monorepo, ADR-002 Next.js App Router, ADR-003 PostgreSQL, ADR-004 tRPC, ADR-005 Zod, ADR-006 R2 Storage, ADR-007 Analytics, ADR-008 Multilingual Font Architecture. Each ADR documents context, decision, alternatives considered, and consequences. Written once, never edited — reversals get new ADRs. The reasoning behind every architectural decision survives developer turnover.

**F-157 · Developer Knowledge Map** `docs/Developer Knowledge Map.md` — a curriculum covering every technology used in the platform, why it is used, and what a new developer needs to understand about it. A completely new developer can read this and understand what they need to learn before touching the codebase.

**F-158 · Engineering Roadmap** `docs/Engineering Roadmap.md` — the complete phased build plan with every task, the reason for each task, and the correct order. The authoritative guide for what to build next and why. Updated as phases complete.

**F-159 · Operational Runbook** `docs/operations/Runbook.md` — step-by-step instructions for every operation a maintainer might need: deploy a change, roll back a bad deployment, restore from backup, add a new admin user, add a new language, debug a failing API route, renew a TLS certificate, scale the server.

**F-160 · Disaster Recovery Plan** `docs/operations/Disaster Recovery.md` — documented recovery procedures for every failure mode: server failure, database corruption, accidental content deletion, domain loss, GitHub repository loss, R2 storage failure. Includes estimated recovery times and contact responsibilities. Every procedure has been tested before handover.

**F-161 · Content Governance Document** `docs/governance/Content Governance.md` — signed by the principal. Defines who owns each content type (News, Events, Gallery, Results, Staff, Archive, Announcements) and what their publishing responsibilities are. Without this, the platform becomes a dead website within six months of developer graduation.

**F-162 · Design System Documentation** `docs/Design System/` — Foundations.md (design principles, color, typography, spacing, motion), Tokens Reference.md (every token value), Page Specifications.md (every page's sections, components, data sources), Component Reference.md (every component's props and usage). A designer or developer can understand the entire visual system without asking anyone.

**F-163 · Complete Trilingual Content Documentation** Documentation of the translation workflow: how to add a new translation key, how to request a review from a native speaker, how to handle strings that have no direct translation, how to test a locale in development. Includes a glossary of institutional terms in all three languages (school motto, titles, department names) so translations are consistent across the platform.

---

## Summary Table

|Group|Features|Count|
|---|---|---|
|Monorepo & Developer Tooling|F-001 – F-011|11|
|Design System Tokens|F-012 – F-021|10|
|Component Library|F-022 – F-041|20|
|Validation|F-042 – F-044|3|
|Database|F-045 – F-052|8|
|API Layer|F-053 – F-059|7|
|Authentication & Access Control|F-060 – F-068|9|
|Internationalisation|F-069 – F-075|7|
|Error Handling & Resilience|F-076 – F-080|5|
|Logging & Monitoring|F-081 – F-086|6|
|Analytics|F-087 – F-090|4|
|SEO & Discoverability|F-091 – F-096|6|
|Performance|F-097 – F-103|7|
|Infrastructure & Deployment|F-104 – F-113|10|
|Testing|F-114 – F-116|3|
|Public Website|F-117 – F-135|19|
|Admin CMS|F-136 – F-152|17|
|PWA & Offline Support|F-153 – F-155|3|
|Comprehensive Project Documentation|F-156 – F-163|8|
|**Total**||**163**|

---

_C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."_ _Nexus Platform — Kannangara ICT Society (KITS)_