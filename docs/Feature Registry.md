# Nexus — Complete Feature Registry

**C.W.W. Kannangara Central College Digital Platform** _Kannangara ICT Society (KITS) · Mathugama_

This document is the single authoritative list of every feature, system, and capability that Nexus will include. Every item here has a home in the Engineering Roadmap. Nothing is built that is not listed here. Nothing listed here is omitted from the build.

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

**F-011 · Build-Time Automation Framework** Scripts in `packages/config/scripts/` automate repetitive generation tasks. This feature covers the infrastructure: the script runner, watch mode, and the convention for how generation scripts are structured and triggered. Two specific outputs live under this umbrella: the token CSS generator (F-019) and the `cn` group generator that creates the typed class name utility. Running these ensures generated output is always in sync with source definitions.

---

## Group 2 — Design System Tokens (`packages/config`)

**F-012 · Color Token System** The complete institutional color palette defined as named tokens: forest greens (primary brand), parchment tones (content surfaces), gold accents, glass overlays, semantic colors (success, warning, error, info), and text hierarchy (primary, secondary, muted, inverted). No hardcoded hex values anywhere in the codebase after this is established.

**F-013 · Typography Token System** Typeface definitions and the complete type scale as tokens: Cormorant Garamond for display, Inter for body, IBM Plex Mono for code, Maname for Sinhala display, Noto Serif Sinhala for Sinhala body, Noto Serif Tamil for Tamil. Scale covers display sizes down to caption, with defined line heights, letter spacing, and weights at every step.

**F-014 · Trilingual CSS Variable Font Stack** Rather than per-component font classes, a single `--font-family-display` and `--font-family-body` CSS variable is composed from Next.js font variables. The browser automatically selects the correct typeface based on character unicode range. Zero per-component font management — add Tamil text anywhere and the right font loads automatically.

**F-015 · Spacing and Sizing Token System** Every margin, padding, gap, width, and height in the platform comes from a consistent scale based on a 4px unit. Arbitrary pixel values are banned. This is what makes the UI feel visually coherent — users perceive it even if they cannot articulate it.

**F-016 · Motion Token System** Animation tokens define durations (fast, base, slow, ceremonial) and easing functions (standard, decelerate, accelerate, `ceremonial` ember). Every animation in the platform draws from these tokens so the institutional feel — deliberate, dignified, never playful — is consistent without per-developer judgment calls.

**F-017 · Utility & Effect Token System** Focus ring tokens (for keyboard navigation visibility), opacity scale, blur scale, border radius scale, z-index scale, aspect ratio tokens, and gradient definitions. Together with the above, these cover every visual dimension a component might need. Grouped as "utility and effect" because each family serves a distinct CSS concern (interactivity, visual depth, layout, layering) while sharing the common trait of not belonging to color, typography, spacing, or motion.

**F-018 · Tailwind nexusPreset** A single Tailwind preset in `packages/config` maps every token into Tailwind's theme. Both `apps/web` and `apps/admin` consume this preset — one source of truth for the entire visual language expressed as utility classes.

**F-019 · tokens.css Generator** A script reads the TypeScript token definitions and generates a `tokens.css` file containing every token as a CSS custom property. This file is imported once in each app's `global.css`. Tokens are defined in TypeScript (type-safe, auditable) and consumed in CSS (zero runtime cost). This is one specific deliverable under the Build-Time Automation Framework (F-011); the automation infrastructure itself belongs to F-011, while this feature describes the concrete output and the script that produces it.

**Depends on:** F-011 (Build-Time Automation Framework) — the token CSS generator is one script within the F-011 automation infrastructure.

**F-020 · Design System Viewer** Interactive documentation pages in `apps/admin/src/app/design-system/` covering every token category and every component. Serves as a live reference for developers and a demonstration tool for the principal presentation. Only exists in admin — never ships to the public site.

---

## Group 3 — Component Library (`packages/ui`)

**F-021 · Atom Components** The smallest building blocks: Button, ButtonLink, Badge, Avatar, Tag, InlineHelpText. Every other component is built from these or alongside them. Each has TypeScript props, ARIA attributes, design token usage only, and all variants from the design system.

**F-022 · Spinner Components** BeatLoader, ScaleLoader, BarLoader — animated with Framer Motion. Used wherever asynchronous operations run. Institutional character: subtle, not aggressive.

**F-023 · Form Components** The complete form system: Input, Select, Textarea, Checkbox, Radio, Toggle, Slider, FileUploadZone, Calendar, FormFieldGroup, FormErrorMessage, FormValidationSummary, RequirementsChecklist, ProgressIndicator. Used in both the public contact forms and the entire admin panel. Built once in `packages/ui`, identical quality everywhere.

**F-024 · Card Components** Every card variant: NewsCard, StaffCard (principal, grid, and compact variants), EventCard, SocietyCard, SocietyBanner, FacilityCard, GalleryAlbumCard, AchievementCard, ExtracurricularCard, AcademicStreamCard, StatCard, DownloadableDocumentItem. Cards are the primary display format for database content on the public site.

**F-025 · Layout Components** Structural components: Container (content width constraints), Grid (responsive), Hero (background, overlay, content slots), Navigation (mobile menu, locale switcher, scroll behaviour), Footer (identity strip, links, social icons), Stack, MasonryGrid, QuickAccessPortal.

**F-026 · Brand Components** CrestAnimation (hero variant with entrance animation; loading variant for transitions — the defining visual of the platform), CrestDiagram (interactive explainer with labelled parts), SchoolLogo. Built from official SVG artwork, not approximated. The crest animation: single deliberate sweep, settles — institutional, not decorative.

**F-027 · Social Media Icon Components** All social icons as React SVG components from official brand kits: Facebook (color, white), Instagram (glyph gradient, glyph black, glyph white), LinkedIn (black, color, inline color, white), YouTube (black, color, inline variants, white), WhatsApp (glyph black, green, white; stacked variants), GitHub (Invertocat and lockup variants). Never icon fonts or third-party libraries for brand icons.

**F-028 · Icon Registry System** `Icon.tsx` and `registry.ts` provide a unified icon API across the component library. A named `<Icon name="search" />` pattern means no direct Lucide imports scattered throughout the codebase, and the icon set can be swapped or extended in one place.

**F-029 · Visualization Components** DataTable (sortable, paginated), ComparisonBar (stream comparison), ProgressArc, StudentJourneyFlow, StreamComparisonTable, TimetableGrid, ProcessSteps. Serve the academic and institutional data needs of the platform.

**F-030 · Page State Components** LoadingScreen (with CrestAnimation), LoadingSkeleton (content placeholders), ErrorState (inline and section variants), EmptyState, NotFound, OfflineBanner, CookieConsentBanner. Every possible application state has a designed response — no user ever sees a blank white screen or unhandled browser error.

**F-031 · Notification Components** Alert (inline messaging), Toast (transient feedback), AnnouncementBanner (urgent school-wide communications at the top of every page). The AnnouncementBanner is how the school publishes urgent information — exam dates, closures — to all visitors.

**F-032 · Overlay Components** Modal, Drawer, DropDownMenu, ShareSheet, ToolTip. All handle focus trapping, keyboard navigation, and scroll locking correctly. Used throughout both admin and public interfaces.

**F-033 · Navigation Components** Accordion, Breadcrumb, FilterBar, LanguageSwitcher, MobileMenu, NavLink, Pagination, SearchInput, TableOfContents, Tabs. The navigation system must work correctly in all three languages and across all device sizes.

**F-034 · Media Components** AudioPlayer (school anthem), Caption, ImageFrame, Lightbox (gallery), MapEmbed, PanoramicFacilityViewer, VideoFrame. Handle all rich media types the platform needs with consistent design treatment.

**F-035 · Section Components** Generic page-section composition components used across the public website: Section, SectionHeader, SectionContainer, SectionGrid, SectionSlider, StatsStrip, Timeline. These components provide layout structure but contain no school-specific business logic or content.

**F-036 · Public Domain Components** School-specific composite components used by public pages, located under `apps/web/src/components/domain/`: PrincipalMessage, AchievementTicker, AdmissionsProcessSteps, AdmissionsKeyDatesTimeline, AlumniLegacyBlock, LifeAtKCCPhotoStrip, and section components for Admissions, Alumni, and Achievement presentation.

**F-037 · Typography Components** EyebrowLabel, Heading, InlineLink, QuoteBlock, RichTextRenderer, SectionHeader, Text. Enforce consistent typographic treatment — a developer never hardcodes a font size or picks a heading level arbitrarily.

**F-038 · Utility Components** BackToTopButton, CountdownTimer, ScrollProgressBar. Small quality-of-life additions that add polish to the public experience.

**F-039 · AmbientEmbers Effect** A subtle particle effect used in specific hero contexts. Reinforces the `ember` motion token aesthetic — the living warmth of an institution, not a visual gimmick.

**F-040 · Shared Hooks** `useCountUp` (animated number counting for statistics), `useInView` (intersection observer for scroll-triggered animations), `useActiveSection` (scroll tracking for navigation highlighting), `useScrollDirection` (show/hide navigation bar), `useMediaQuery`, `useLocalStorage`, `useFormField`. Consumed by components throughout the library.

**F-041 · Utility** The `cn()` function combines `clsx` and `tailwind-merge`. Allows conditional class names without Tailwind conflicts. Used in virtually every component.

---

## Group 4 — Validation (`packages/validation`)

**F-042 · Domain Entity Zod Schemas** Zod schemas for every true domain entity: User, StaffMember, NewsArticle, SchoolEvent, GalleryAlbum, GalleryPhoto, Achievement, AlumniProfile, MediaAsset, AuditLog, Announcement, Society, PageContent. This is the single source of truth for data shapes across the platform.

Page content schemas (PrincipalMessageContent, HomeHeroContent, AdmissionsProcessContent, TimelineContent, and similar) are not domain entities — they are editable content blocks. These schemas live under `packages/content` alongside F-051 (Page Content Model), not in domain validation.

**F-043 · Admin Form Schemas** Form-specific schema variants (`.omit()` server-generated fields, `.extend()` with UI-only fields like `confirmPassword`) for every admin create/edit form. Form schemas derive from domain schemas wherever possible — independent form schemas should not be created unless there is a clear reason. The same validation that runs on the server also runs on the client.

**F-044 · Inferred TypeScript Types** All TypeScript types for validated entities are inferred from Zod schemas using `z.infer<>`. No handwritten interfaces for validated entities. Composite types that join relations (e.g. `type NewsWithAuthor = News & { author: User }`) are defined separately as needed — those are not directly inferred and are not covered by this rule.

---

## Group 5 — Database (`packages/database`)

**F-045 · Complete Prisma Schema** All models with full relations, indices, and constraints: User, News, Staff, Society, Event, GalleryAlbum, GalleryPhoto, Achievement, AlumniProfile, MediaAsset, AuditLog, NotificationQueue, PageContent, PageConfig. The schema is the authoritative definition of the data model — the database is generated from it, not the other way around.

**F-046 · Prisma Client Singleton** A properly initialised Prisma client with the singleton pattern for Next.js (prevents connection exhaustion in development with hot reload). Exported as the single `db` import used everywhere in the backend.

**F-047 · Database Migrations** Every schema change gets a Prisma migration file. Migration files are committed to the repository and never edited. The full migration history is the complete record of how the schema evolved.

**F-048 · Database Seed Script** A seed script creates all essential initial data for a functional deployment: initial admin user (hashed password, Admin role), default roles, default page configuration entries, system settings, and initial permissions. Runs once on initial deployment and again after a database reset in development. Without a complete seed, the platform is not usable immediately after a fresh deploy.

**F-049 · Automated Database Backups** Production databases are automatically backed up on a scheduled basis, stored off-site, encrypted at rest, retained according to policy, and periodically tested for successful restoration. Implementation details (tooling, storage provider, schedule, retention period) are defined in the Infrastructure documentation.

**F-050 · Automated Database Cleanup Tasks** Scheduled jobs remove technical debris: expired sessions, expired authentication tokens, and temporary upload artifacts. Content is never touched by automated cleanup. Media asset cleanup is intentionally excluded from automation — the risk of inadvertently deleting a still-referenced asset outweighs the storage savings.

**F-051 · Soft-Delete Pattern** Content is never hard-deleted. A `deletedAt` timestamp marks records as archived. The audit log retains the history. Admin panel deletions trigger soft-deletes. Accidental deletions are always recoverable from the live database without needing a backup restore.

**F-052 · Page Content Model** `PageContent` table storing editorial section content — every page hero, story, timeline, and similar block previously hardcoded in `messages/` — keyed by page, section, and locale, with a JSON payload validated per-section by Zod, and the same version-snapshot pattern used for News (F-116). The database-backed counterpart to F-064's UI-chrome-only message files. See ADR-009.

**Depends on:** F-045 (Complete Prisma Schema) — PageContent is a model in the Prisma schema and cannot exist without it. F-058 (Page Content Router) is the API-layer counterpart that reads and writes this table.

---

## Group 6 — API Layer (`packages/api`)

**F-053 · tRPC Server Setup** tRPC router initialisation with context (authenticated session from Auth.js, Prisma db client). Three procedure tiers: `publicProcedure` for unauthenticated read access, `protectedProcedure` for any authenticated admin session, and `adminProcedure` for operations restricted to the Admin role only (user management, settings). Tying the entire architecture to a binary "public vs admin" distinction is too simplistic for future needs.

**F-054 · Content Routers** tRPC routers for every content domain: newsRouter, staffRouter, eventsRouter, societiesRouter, galleryRouter, achievementsRouter, alumniRouter, mediaRouter. Each domain exposes domain-specific procedures for retrieval, creation, editing, publication, archival, ordering, and moderation — not a generic CRUD list. Examples: `newsRouter.publish()`, `newsRouter.getFeatured()`, `galleryRouter.reorderAlbums()`.

**Depends on:** F-045 (Complete Prisma Schema), F-042 (Domain Entity Zod Schemas), F-053 (tRPC Server Setup).

**F-055 · System Routers** pageConfigRouter (section order and visibility per page), auditRouter (append-only log reads), userRouter (admin user management), notificationRouter (announcement CRUD — scoped to the AnnouncementBanner system, not a general notification platform). An analyticsRouter is deferred — analytics are served by self-hosted Umami (F-087) rather than a custom router, and a custom router will be added only if a genuine need arises.

**F-056 · Input Validation on Every Procedure** Every tRPC procedure that accepts input validates it against the corresponding `@nexus/validation` Zod schema. Invalid input is rejected with a typed error before touching the database. No raw user input reaches a database query.

**F-057 · Rate Limiting** API-level rate limiting protects public endpoints against abuse. The contact form and general API routes are capped at appropriate thresholds. Implementation is deployment-dependent — acceptable approaches include Cloudflare WAF rules, Upstash Redis, or Next.js middleware. In-memory limits must not be used in a multi-instance deployment as they become inconsistent across instances.

**F-058 · Page Content Router** `pageContentRouter`: `getByPage` returns every section for a page in the requested locale with English fallback for missing translations; `update` upserts a section and writes a version snapshot. Sibling to `pageConfigRouter` (F-055) — one controls section visibility and order, the other controls section content.

**Depends on:** F-052 (Page Content Model) — this router reads and writes the PageContent table. F-053 (tRPC Server Setup) — requires the tRPC context and procedure tiers to be established first.

---

## Group 7 — Authentication & Access Control

**F-059 · Google Workspace OAuth via Auth.js** Auth.js (NextAuth) configured with the Google provider as the primary sign-in method, restricted to the school's `@cwwkcc.lk` Google Workspace domain. Domain is verified server-side in the `signIn` callback — never trust the `hd` claim alone, since it can be spoofed outside a genuine Workspace flow. Sessions are stored in the database via the Prisma adapter.

**F-060 · Invite-Based Access Control** Successfully authenticating with Google is not sufficient on its own. An existing Admin must first add a colleague's `@cwwkcc.lk` email to the User table with an assigned role; only then does that person's Google sign-in succeed past the application's own check. Nexus's User table — not the school's Google directory — is the actual source of truth for who has access, and revoking access never depends on the school's IT department.

**F-061 · Role-Based Access Control** Two roles: Admin (full access to all modules, user management, settings) and Editor (create and edit content, cannot manage users, cannot access settings, cannot delete published content). Role is checked in tRPC procedures and in admin UI conditionally rendering controls.

**F-062 · Admin Route Protection Middleware** Next.js middleware on `apps/admin` checks for a valid Auth.js session on every request to any route except `/login`. Unauthenticated requests are redirected to `/login`. The public site has no authentication layer.

**F-063 · Admin Login Page** A "Sign in with Google" button restricted to `@cwwkcc.lk`, with a clear rejection message — not a generic error — for any account outside the domain. A separate, deliberately unadvertised path leads to the break-glass credentials login (F-064), used only for bootstrap and recovery.

**F-064 · Break-Glass Admin Account** One Credentials-based super-admin account, seeded from environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, bcrypt-hashed) at first deploy. Used only to invite the first real `@cwwkcc.lk` admins at launch, and for emergency recovery if Google OAuth becomes unavailable — a Workspace misconfiguration, an OAuth app restriction, a Google outage. Protected by its own TOTP requirement (F-066), since it is the one path that bypasses Google's account security entirely.

**Depends on:** F-066 (TOTP Two-Factor Authentication) — TOTP must be implemented before this account can be safely used in production. The break-glass account has elevated privilege precisely because it bypasses Google; leaving it unprotected by a second factor before launch is a security hole, not a temporary gap.

**F-065 · Break-Glass Password Rotation** The break-glass account has no self-service "forgot password" email flow — an internet-facing reset surface on the platform's single highest-privilege bypass account is a liability, not a convenience. If the break-glass password is lost, it is rotated via a server-side CLI script run over SSH, re-hashing a new password directly into the database.

**Depends on:** F-064 (Break-Glass Admin Account) — this feature is the rotation procedure for the account established by F-064; it has no meaning without it.

**F-066 · TOTP Two-Factor Authentication** Applies only to the break-glass account (F-064) — every other admin's account security is inherited from the school's own Google Workspace 2FA enforcement, a setting controlled entirely outside Nexus by the school's Google Admin console. TOTP via standard authenticator apps (Google Authenticator, Authy, 1Password); ten single-use backup codes generated at setup are the only recovery path if the device protecting the break-glass account is lost.

**Depends on:** F-064 (Break-Glass Admin Account) — TOTP is not used anywhere else in the platform; this feature exists solely to protect the break-glass account. F-064 defines the account; F-066 secures it. Both must be complete before production launch.

**F-067 · User Deactivation** Admin users are never deleted from the database — they are deactivated (a boolean flag). Deactivated users cannot log in, regardless of whether their underlying Google account is still active. Their records are retained so the audit log remains meaningful — every action is still traceable to a real person.

**F-068 · Secret Management** All credentials (database URL, Auth.js secret, Google OAuth client ID and secret, R2 keys, Resend API key) live in environment variables. Never committed to the repository. `.env.example` documents what is needed. GitHub repository secrets hold CI/CD values. Production secrets live in `.env` on the Hetzner server.

---

## Group 8 — Internationalisation

**F-069 · next-intl Locale Routing** Three locale routes: `/en/`, `/si/`, `/ta/`. The routing is defined in `packages/web/src/i18n/routing.ts`. Every public page is available in all three languages. The admin panel is English-only.

**F-070 · Per-Feature Message Files** Translation strings are split into separate JSON files per locale per feature area: navigation, common, home, about, news, events, societies, facilities, admissions, contact, gallery. This prevents a single massive translation file and allows partial updates without touching unrelated strings.

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

**F-079 · Section-Level Error Boundaries** React `ErrorBoundary` wrappers around major page sections (News, Gallery) so a failure in one section does not take down the whole page. A user can still read the rest of the page if the gallery section fails to load.

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

**F-087 · Umami Self-Hosted Analytics** Umami runs as a Docker container on the same Hetzner server. Privacy-first, GDPR-friendly, no third-party JavaScript on the public site. Data stays on school-controlled infrastructure. Provides page views, referrers, device split, and locale distribution out of the box.

**F-088 · Analytics Dashboard** Admin panel module displaying Umami data: total page views by day/week/month, top pages with trend indicators, content performance (views per article), locale distribution, device split.

**Depends on:** F-087 (Umami Self-Hosted Analytics) — the dashboard surfaces data from Umami; F-087 must be running and collecting data before this module is meaningful.

---

## Group 12 — SEO & Discoverability

**F-089 · generateMetadata for Every Page** The root layout provides baseline metadata. Every page type overrides with specifics: news articles include headline, author, publication date; events include start date and location; staff profiles include name and role. Every page has a unique title and description.

**F-090 · JSON-LD Structured Data** Schema.org markup for every relevant content type: EducationalOrganization (school), NewsArticle, Event, Person (staff), WebApplication. Correct structured data enables rich results and knowledge panels in Google Search.

**F-091 · Dynamic Sitemap** `sitemap.ts` using Next.js conventions generates a sitemap covering all static pages and all dynamic pages (every news article, society, gallery album). Submitted to Google Search Console and Bing Webmaster Tools.

**F-092 · robots.txt** Allows indexing of all public pages. Disallows the admin panel and API routes.

**F-093 · Sitemap Ping on Content Publish** When a news article or event is published, the sitemap is regenerated and a ping is sent to search engines. New content is discoverable within hours, not the next crawl cycle.

**F-094 · Open Graph Image Generation** Programmatically generated OG images for all page types using Next.js image generation. When a page is shared on social media, the preview shows a branded image rather than a blank placeholder.

---

## Group 13 — Performance

**F-095 · next/image for All Images** Every image on the public site uses `next/image` with explicit dimensions, blur placeholder, and responsive `sizes`. Prevents layout shift, enables lazy loading, and automatically serves WebP.

**F-096 · Dynamic Imports for Heavy Components** CrestAnimation, AudioPlayer, the Tiptap rich text editor, and PanoramicFacilityViewer are dynamically imported. The initial page bundle does not include these until they are needed. Reduces Time to Interactive on first load.

**F-097 · Package Import Optimisation** `optimizePackageImports` in `next.config.js` for `@nexus/ui` and `framer-motion`. Only imported components are bundled — not the entire library.

**F-098 · Static Generation for Content Pages** `generateStaticParams` for news articles, society pages, and gallery albums. These pages are pre-rendered at build time and served from the CDN edge. Database is not queried on every visitor request.

**F-099 · Cloudflare R2 CDN for Media** All images and PDFs served from Cloudflare R2 with edge caching. Zero egress fees. Global delivery. The school's media assets load fast regardless of where in the world a visitor is.

**F-100 · Performance Budget Monitoring** Lighthouse CI runs in GitHub Actions on every build. Fails if Performance, Accessibility, Best Practices, or SEO scores drop below 90 on mobile. Prevents performance regressions from silently shipping.

**F-101 · Image Optimisation Pipeline** Images uploaded through the admin panel are processed with Sharp before upload to R2: resized to maximum required display dimensions, converted to WebP, stripped of EXIF metadata. Smaller files, faster loads, no private metadata leaking.

---

## Group 14 — Infrastructure & Deployment

**F-102 · Multi-Stage Dockerfiles** Dockerfiles for both apps use multi-stage builds: install and build stage, then a minimal runtime stage with only the compiled output. Production images are small, fast to pull, and contain no build tools.

**F-103 · Docker Compose Orchestration** `docker-compose.yml` defines five services: postgres, nexus-web, nexus-admin, umami, caddy. Named volumes for persistence. Environment variable references for secrets. Health checks and restart policies on every service.

**Depends on:** F-102 (Multi-Stage Dockerfiles) — the compose file references the images produced by the Dockerfiles; the images must exist before compose can orchestrate them.

**F-104 · Caddy Reverse Proxy with Automatic HTTPS** Caddy routes `cwwkcc.lk` to nexus-web and `admin.cwwkcc.lk` to nexus-admin. Provisions and renews TLS certificates automatically via Let's Encrypt. No manual certificate management ever.

**F-105 · Hetzner CX22 VPS** The production server: 2 vCPU, 4GB RAM, 40GB SSD. Self-hosted. School-controlled. No vendor lock-in beyond the hosting provider.

**F-106 · Cloudflare R2 Media Storage** Object storage for all uploaded media. Presigned URLs mean the browser uploads directly to R2 — the Next.js server is never in the upload path. No egress fees. S3-compatible API.

**F-107 · Resend Transactional Email** Email sending for contact form notifications, feedback form acknowledgements, and admin password reset. Free tier (3,000 emails/month) is more than sufficient. Simple REST API, no SMTP configuration.

**F-108 · Security Headers via Caddy** Strict-Transport-Security (HSTS), Content-Security-Policy, X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy (strict-origin-when-cross-origin). Configured once in Caddyfile, applies to all traffic.

**F-109 · Server Firewall** `ufw` allows only ports 80 (HTTP), 443 (HTTPS), and 22 (SSH). All other ports blocked. The PostgreSQL port is never exposed to the public internet — only accessible within the Docker internal network.

**F-110 · SSH Key Authentication** Password-based SSH login disabled on the Hetzner server. Only SSH key holders can access the machine. A deployment user with minimal permissions handles automated deployments.

**F-111 · GitHub Container Registry** Docker images are pushed to GitHub Container Registry (GHCR) as part of the CD pipeline. The production server pulls from GHCR. Images are versioned by commit SHA — any deployment can be rolled back to a specific image.

---

## Group 15 — Security

**F-112 · Security Architecture Principles** Least privilege, defence in depth, secure defaults, deny-by-default access controls. Every significant security decision is documented in an ADR. Security properties are first-class concerns, not afterthoughts.

**F-113 · Content Security Policy** A strict CSP prevents inline script execution and limits external resource loading to approved origins only. Defined in the Caddy configuration and tested against each app's actual resource usage.

**F-114 · CSRF Protection** All state-changing operations are protected against Cross-Site Request Forgery. Auth.js provides baseline protection; all non-idempotent API calls verify origin and session integrity.

**F-115 · Secure Session Management** Secure cookies, HttpOnly, SameSite protection, session expiration policies, and forced session invalidation on user deactivation. A deactivated user's existing sessions are immediately invalidated — they cannot complete in-flight requests after deactivation.

**F-116 · File Upload Security** Every file uploaded through the admin panel is validated before storage: MIME type validation, extension validation, file size limits, rejection of dangerous file types, and metadata stripping via Sharp. Teachers and students will upload files — the pipeline must be safe by default.

**F-117 · Server-Side Authorization Verification** Every write operation verifies authorization server-side, regardless of what the UI shows. A user without the required role cannot perform an action even by calling the API directly. Hidden UI controls are never a substitute for server-side checks.

**F-118 · Security Audit Trail** Security-sensitive actions receive enhanced logging separate from normal content edits: login events, failed login attempts, role changes, user deactivation, permission changes, and break-glass account usage.

**F-119 · Dependency Security Monitoring** Automated dependency vulnerability scanning (F-008) is the detection mechanism. This feature covers the remediation process: a documented procedure for triaging, assessing, and resolving dependency vulnerabilities before they are exploited.

**F-120 · Backup Encryption** Database backups and media backups are encrypted before off-site storage. Encryption keys are stored separately from the backups themselves.

**F-121 · Secrets Rotation Procedures** Documented process for rotating credentials — Auth.js secret, OAuth credentials, R2 access keys, database passwords, Resend API key — without service downtime. Rotation is scheduled periodically and triggered immediately on any suspected compromise.

**F-122 · Security Incident Response Plan** Documented procedure covering every incident type: compromised account, lost admin device, exposed secret, server intrusion. Defines who is contacted, what is done first, and how recovery is verified. Completed before production launch.

**F-123 · Security Review Before Launch** A formal pre-launch checklist covering authentication, authorization, file uploads, secrets management, backup integrity, security headers, rate limiting, and the break-glass account. Signed off before any public traffic is served.

---

## Group 16 — Testing

**F-124 · Unit Tests** Vitest unit tests for shared utilities and hooks in `packages/ui`: `useCountUp`, `useInView`, `cn`, form validation logic. Pure functions are the easiest to test and the most valuable — they run on every component render.

**F-125 · Integration Tests** Integration tests for tRPC API routes against a test database. Verifies that authentication, validation, and data persistence work correctly end-to-end through the API layer — not just in isolation.

**F-126 · End-to-End Tests** Playwright E2E tests covering the critical user journeys: submitting the contact form, switching locale, navigating between pages, searching for content. These run in CI against a built version of the app.

---

## Group 17 — Public Website (`apps/web`)

**F-127 · Home Page** Hero with CrestAnimation, headline, and call to action. Statistics Strip with animated counters. Principal's Message. Latest News (three most recent published articles). Upcoming Events (next three). Quick Access Portal (links to Admissions, Societies, Gallery). Announcement Banner when active. Section order controlled by the Page Configuration system.

**F-128 · About Page** Hero. Stats. Namesake section (C.W.W. Kannangara portrait and biography). School story. Timeline. Ethos. Values. Interactive CrestDiagram. Alumni Legacy. School Anthem with AudioPlayer. Closing statement. The centrepiece of the platform — complete before the principal presentation.

**F-129 · News Listing Page** All published news articles with category filter, pagination, and search. Server-rendered with static generation for each category. Metadata for SEO.

**F-130 · News Article Page** Individual article with rich text rendering via RichTextRenderer, author attribution, publication date, related articles, social sharing via ShareSheet. Statically generated at build time. OG metadata per article.

**F-131 · Events Listing Page** Events with calendar view and list view, filterable by category and month. Upcoming events distinguished from past events.

**F-132 · Event Detail Page** Full event description, date, time, venue, category, optional registration link. Map embed for venue location.

**F-133 · Societies Hub** All societies with category filter. Each society shown as a SocietyCard. High-engagement page for current students.

**F-134 · Society Detail Page** Banner, description, advisor StaffCard, founding year, member count, recent events, gallery preview.

**F-135 · Facilities Page** FacilityCard grid for all school facilities. Content managed through admin. Descriptions and photos updatable without a developer.

**F-136 · Admissions Page** Admissions process via ProcessSteps. Key dates via AdmissionsKeyDatesTimeline (sourced from Events table). Requirements. ContactForm for admissions enquiries.

**F-137 · Gallery Listing Page** Albums sorted by year. GalleryAlbumCard for each. Year-based filtering.

**F-138 · Gallery Album Page** Photo grid with Lightbox for full-screen viewing. All images via `next/image`. Alt text on every photo.

**F-139 · Contact Page** ContactForm wired to Resend. FeedbackForm for general feedback. Both rate-limited. Both validate on client and server using Zod schemas.

**F-140 · Alumni Directory** Searchable by graduation year, profession, country. Shows name, year, position, quote — no private contact information. Submission form for new profiles enters an admin approval queue. Builds the school's network over time.

**F-141 · Digital Archive** Historical photographs, old annual magazines (PDFs with searchable metadata), prize-giving records, prefect lists by year. Browsable by year, searchable by full-text. Unique institutional value — a 150-year-old school with a properly organised digital memory.

**F-142 · Achievement Database** Academic achievements (A/L results, university admissions), sports (tournament wins, national athletes), arts and cultural, competition results. Filterable by year, category, student name. Updated each year, becoming a permanent living record.

**F-143 · Unified Search** Single search box accessible from every page via Navigation. Queries across all content types simultaneously. PostgreSQL full-text search supporting Sinhala, Tamil, and English. Results grouped by type, ranked by relevance. New content types automatically searchable.

**F-144 · Cookie Consent Banner** CookieConsentBanner shown on first visit. Persisted to localStorage. GDPR-compliant: no analytics cookies set before consent. The school serves an international diaspora — compliance matters.

**F-145 · Academics Page** Academic streams (Bio Science, Physical Science, Commerce, Arts, Technology) via AcademicStreamCard, with subject lists and StreamComparisonTable for side-by-side comparison. Stream descriptions are editable via the Academic Programs admin screen (F-159); the set of streams itself is fixed by the national A/L system, not a create/delete list.

**F-146 · Administration Page** A role-grouped view of the existing Staff Module (F-133): Principal, Vice Principals, Heads of Department, and Board of Management, each shown via StaffCard, plus an AdvisoryBoardSection for the Board specifically. No new admin module — administrators are entered as staff like anyone else; this page is a filtered query, not a new content type.

**F-147 · Extracurriculars Page** Sports teams and co-curricular activities (cricket, athletics, scouting, cadetting) via ExtracurricularCard — distinct from Societies (F-133/F-134), which covers academic and interest clubs. Includes an ExtracurricularsJoinCTA section.

---

## Group 18 — Admin Panel (`apps/admin`)

**F-148 · Admin Shell Layout** Persistent sidebar navigation, topbar with user avatar and session info, breadcrumb navigation, responsive mobile drawer. Every admin module lives inside this shell. The shell is the first thing built — before any module.

**F-149 · Dashboard** Content counts, recent activity feed (last 10 audit log entries), quick action buttons (new article, new event, new announcement), pending items summary (drafts, unapproved alumni profiles).

**F-150 · News Module** List view with status badges, search and filter by category and date, bulk actions. Create/edit with Tiptap rich text editor, cover image via media library, category, status workflow (draft → review → published → archived), SEO preview. Validates against `NewsArticleSchema`.

**Depends on:** F-045 (Complete Prisma Schema), F-054 (Content Routers), F-043 (Admin Form Schemas).

**F-151 · Staff Module** List sorted by role hierarchy. Create/edit with name, title, role, department, tenure, quote, portrait via media library. Drag-and-drop reorder (the `order` field controls public site display sequence).

**F-152 · Events Module** Calendar view and list view. Create/edit with title, description, date, time, venue, category, status, optional registration link. Status workflow mirrors news.

**F-153 · Societies Module** Create/edit with name, slug, category, tagline, description, member count, founding year, logo upload, banner upload, advisor staff member selection.

**F-154 · Gallery Module** Album creation with title, year, category, cover photo selection. Batch photo upload to R2 with progress indicators. Per-photo alt text (required). Album reordering.

**F-155 · Media Library** Grid view of all uploaded assets with search and tag filtering. Sharp-processed upload (resize + WebP). Alt text editing. Usage tracking (which content uses each asset). Bulk delete with usage warning. The central asset management system.

**F-156 · Page Configuration Module** For each configurable page, the current section order as draggable cards with enable/disable toggles. Changes save to `PageConfig` and take effect on the next public page load. Full page composition control without a developer.

**F-157 · Analytics Dashboard Module** The Umami analytics interface in admin: views by day/week/month, top pages, content performance, locale and device distribution.

**F-158 · User Management Module** List all admin users with roles. Invite new users by adding their `@cwwkcc.lk` email to the allowlist (F-060) — they then sign in with their own Google account, no password to set or reset. Role assignment. User deactivation. Roles enforced — an Editor cannot access this module.

**F-159 · Announcements Module** Create announcements with variant (info, warning, error), message, publish date, optional expiry. View active and past. Deactivate or expire. Simple and deliberate — not a full notification platform.

**F-160 · Audit Log Viewer Module** Chronological feed of all admin actions. Filters by user, entity type, action, date range. Per-entry diff of changed fields. Read-only. The transparency layer of the platform.

**F-161 · Settings Module** Global platform settings: school name, address, contact details, social URLs, founding year, motto. Read by the public site for footer, JSON-LD, and metadata. Changes here propagate everywhere without a code deploy.

**F-162 · Content Preview Mode** Editors can see a live preview of draft content before publishing. Preview is accessible only to authenticated admin users. The public site never shows draft content to unauthenticated visitors.

**F-163 · Content Versioning** Every published content edit creates a version snapshot. Editors can view the version history of any article and revert to a previous state. Prevents accidental content loss.

**F-164 · Page Content Module** Admin interface for editing `PageContent`: section list per page, with a rich text editor for prose blocks, a repeatable-list editor for timeline/crest/FAQ-style sections, and structured forms for short fields. Locale switcher per section. Every save versioned via F-052's snapshot pattern, viewable and revertible the same way as News (F-163).

**Depends on:** F-052 (Page Content Model), F-058 (Page Content Router), F-043 (Admin Form Schemas).

**F-165 · Academic Programs Admin Screen** Config-style, not a CRUD module — the same editing pattern as Settings (F-161). A fixed set of stream entries with editable description, subject list, image, and contact department. No create, no delete, no draft/publish workflow, no versioning — streams don't get added or removed by content editors, only their descriptive content changes.

**F-166 · Extracurriculars Module** Full CRUD, identical shape to the Societies Module (F-153): name, category, description, coach/advisor via staff selection, achievements, photo, active/inactive status. Unlike Academic Programs, activities genuinely get added and retired over the years.

**F-167 · Alumni Module** Two entry paths into one list: admin-direct entry for building the initial alumni dataset, and public submissions awaiting moderation. Filterable by status (pending/approved/rejected), graduation year, profession. Approve publishes immediately to the public directory; reject discards with an optional logged reason. Editable before approving, since public submissions may be incomplete. The Dashboard's pending-items count (F-149) links directly into this module's pending filter.

**F-168 · Achievement Module** CRUD for the Achievement Database (F-142): student name, category (academic/sports/arts/competition), achievement level, description, year, optional photo, optional link to a related News article. Same simple create/edit/delete shape as Events — no draft/review workflow.

**F-169 · Digital Archive Module** Curated content layer over the Media Library (F-155), not a replacement for it. Each entry has a title, year, category (photograph/magazine/prize-giving record/prefect list), description, and a file uploaded through the standard Media Library pipeline. Year and category are what the public Digital Archive page (F-141) filters and full-text-searches by — the Media Library alone has no concept of "this PDF is the 1987 prefects list."

**F-170 · Facilities Module** Full CRUD, lighter than Societies: name, category, description, photo(s), display order. Unlike Academic Programs, the facility list isn't nationally fixed — the school adds a new lab or renovates a building and should be able to reflect that without a developer.

---

## Group 19 — PWA & Offline Support

**F-171 · Service Worker** Caches the shell (navigation, footer, CSS, fonts) on first load. Caches home and about pages for offline access. Network-first strategy for dynamic pages (news, events) with a cached fallback. Implemented with `next-pwa` or a custom service worker.

**F-172 · Web App Manifest** `manifest.json` with school name, icons in all required sizes (192px, 512px, maskable), theme color matching the design system, display mode `standalone`. Enables "Add to Home Screen" — the platform appears as an app icon on mobile.

**F-173 · Designed Offline Page** A cached offline page shown when a user attempts to visit an uncached page without connectivity. Institutional design treatment, links to cached pages that are available. No browser default error.

---

## Group 20 — Comprehensive Project Documentation

**F-174 · Architecture Decision Records (ADRs)** `docs/adr/` contains a record for every significant technical choice: ADR-001 Monorepo, ADR-002 Next.js App Router, ADR-003 PostgreSQL, ADR-004 tRPC, ADR-005 Zod, ADR-006 R2 Storage, ADR-007 Analytics, ADR-008 Multilingual Font Architecture, ADR-009 Page Content Model. Each ADR documents context, decision, alternatives considered, and consequences. Written once, never edited — reversals get new ADRs. The reasoning behind every architectural decision survives developer turnover.

**F-175 · Developer Knowledge Map** `docs/Developer Knowledge Map.md` — a curriculum covering every technology used in the platform, why it is used, and what a new developer needs to understand about it. A completely new developer can read this and understand what they need to learn before touching the codebase.

**F-176 · Engineering Roadmap** `docs/Engineering Roadmap.md` — the complete phased build plan with every task, the reason for each task, and the correct order. The authoritative guide for what to build next and why. Updated as phases complete.

**F-177 · Operational Runbook** `docs/operations/Runbook.md` — step-by-step instructions for every operation a maintainer might need: deploy a change, roll back a bad deployment, restore from backup, add a new admin user, add a new language, debug a failing API route, renew a TLS certificate, scale the server.

**F-178 · Disaster Recovery Plan** `docs/operations/Disaster Recovery.md` — documented recovery procedures for every failure mode: server failure, database corruption, accidental content deletion, domain loss, GitHub repository loss, R2 storage failure. Includes estimated recovery times and contact responsibilities. Every procedure has been tested before handover.

**F-179 · Content Governance Document** `docs/governance/Content Governance.md` — signed by the principal. Defines who owns each content type (News, Events, Gallery, Staff, Archive, Announcements) and what their publishing responsibilities are. Without this, the platform becomes a dead website within six months of developer graduation.

**F-180 · Design System Documentation** `docs/Design System/` — Foundations.md (design principles, color, typography, spacing, motion), Tokens Reference.md (every token value), Page Specifications.md (every page's sections, components, data sources), Component Reference.md (every component's props and usage). A designer or developer can understand the entire visual system without asking anyone.

**F-181 · Complete Trilingual Content Documentation** Documentation of the translation workflow: how to add a new translation key, how to request a review from a native speaker, how to handle strings that have no direct translation, how to test a locale in development. Includes a glossary of institutional terms in all three languages (school motto, titles, department names) so translations are consistent across the platform.

---

## Summary Table

|Group|Features|Count|
|---|---|---|
|Monorepo & Developer Tooling|F-001 – F-011|11|
|Design System Tokens|F-012 – F-020|9|
|Component Library|F-021 – F-041|21|
|Validation|F-042 – F-044|3|
|Database|F-045 – F-052|8|
|API Layer|F-053 – F-058|6|
|Authentication & Access Control|F-059 – F-068|10|
|Internationalisation|F-069 – F-075|7|
|Error Handling & Resilience|F-076 – F-080|5|
|Logging & Monitoring|F-081 – F-086|6|
|Analytics|F-087 – F-088|2|
|SEO & Discoverability|F-089 – F-094|6|
|Performance|F-095 – F-101|7|
|Infrastructure & Deployment|F-102 – F-111|10|
|Security|F-112 – F-123|12|
|Testing|F-124 – F-126|3|
|Public Website|F-127 – F-147|21|
|Admin Panel|F-148 – F-170|23|
|PWA & Offline Support|F-171 – F-173|3|
|Comprehensive Project Documentation|F-174 – F-181|8|
|**Total**||**181**|

---

_C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."_ _Nexus Platform — Kannangara ICT Society (KITS)_