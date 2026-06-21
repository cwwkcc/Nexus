# Nexus — The Complete Engineering Roadmap

## C.W.W. Kannangara Central College Digital Platform

**Kannangara ICT Society (KITS) · Mathugama** _From first idea to final handover — everything, in order, with reasons._

---

## What Nexus Is NOT

Before reading this roadmap, this boundary must be understood. Future developers and school administrators will eventually ask whether Nexus can be extended to handle attendance, timetables, student records, fees, or examinations. The answer is no, and the reason is architectural, not laziness.

Nexus is an **institutional public platform**. It serves students, parents, alumni, and the wider community through a public website and a content management system operated by school staff.

Nexus is not, and will never become:

- A **Student Information System** — student records, grades, attendance, and personal data belong in dedicated SIS software with appropriate security and regulatory compliance.
- A **Learning Management System** — assignment submission, online lessons, and course management belong in dedicated LMS platforms.
- An **Attendance Platform** — daily attendance tracking is an operational school management function, not a public communications function.
- A **Financial Management System** — fees, payroll, and procurement are entirely outside scope.
- An **Examination Management System** — internal exam scheduling and marking are separate from the results portal, which only publishes final results.
- A **Communication Platform** — Nexus publishes announcements to the public. Internal staff communication, parent-teacher messaging, and student notifications belong in dedicated tools.

Every time a new feature is proposed, ask: is this about communicating the school to the world, or managing the school internally? If it is the latter, it does not belong in Nexus.

This boundary is what keeps the platform maintainable by a small team of students over many years.

---

## How to Read This Document

Every phase has a clear purpose, a list of tasks, and a reason for each task. The order is not arbitrary. Each phase creates the foundation the next phase stands on. Skipping ahead creates rework. The principle throughout is simple: **build the rules before building the containers, build the containers before filling them with content, fill them with content before showing the world.**

This document covers the full journey from the very beginning so that any future developer — or any auditor of the work — can understand every decision made.

This roadmap defines the build order. **`Feature Registry.md` defines the build scope** — it is the single authoritative, numbered list (F-001 through F-173) of every feature Nexus will include, and nothing is built that isn't listed there. The two documents must stay in sync: every task below exists to build one or more registry features, and every registry feature has a home in one of the phases below. When the two disagree, the Feature Registry wins and this document is updated to match.

---

## Phase 0 — Concept and Planning

_Before writing a single line of code_

### Purpose

Establish what is being built, why it is being built, and what success looks like. This phase exists entirely on paper.

### Task 0.1 — Define the Mission

Articulate in one paragraph what Nexus is. Not a list of features. A mission statement. The answer is: Nexus is the permanent digital institution of C.W.W. Kannangara Central College — not a brochure, not a marketing site, but a living platform that serves students, parents, staff, alumni, and the wider community for decades. This mission statement drives every architectural decision that follows.

### Task 0.2 — Establish the Scope Inventory

List every page and module the final platform will contain. Do this before touching technology. For Nexus this means defining all public pages (Home, About, News, Events, Societies, Facilities, Admissions, Results, Contact, Gallery, Archive, Alumni Directory), the admin modules that control them (News CMS, Staff CMS, Events CMS, Societies CMS, Results upload, Media library, Page configuration, Analytics, User management, Audit log), and the supporting infrastructure (Authentication, Search, Notifications, Analytics, Asset storage, CI/CD). Completing this prevents scope creep and scope blindness in equal measure.

### Task 0.3 — Design the Information Architecture

Map the relationships between pages. What links to what. What the navigation hierarchy is. What the URL structure will be. For a trilingual site this means deciding the locale routing pattern early — the decision to use `/en/about`, `/si/about`, `/ta/about` must be made before the framework is chosen, because it affects the entire routing architecture.

### Task 0.4 — Identify the Technology Stack

Choose the technology stack with reasons, not trends. For Nexus the decisions are: Next.js App Router for the public site and admin panel because it provides server components, excellent i18n support, and static generation; pnpm workspaces for the monorepo because it is faster than npm and provides excellent workspace linking; PostgreSQL for the database because it is battle-tested, handles JSON well for content, and has excellent full-text search including support for Sinhala; Prisma as the ORM because it generates type-safe clients from the schema; tRPC for the API layer because it eliminates the need for a separate API spec and provides end-to-end type safety; Zod for validation because the same schema validates forms, API inputs, and database outputs; Tailwind CSS for styling because utility-first scales better in a component library than CSS modules; Framer Motion and GSAP for animation because it handles complex institutional animations declaratively; next-intl for internationalisation because it integrates deeply with the App Router.

### Task 0.5 — Write the Project Proposal

Write the formal proposal document for the school principal. This document must answer five questions: What are we building? Why does the school need it? How does it compare to what schools currently have? What will it cost? Who will maintain it after completion? The proposal should include a cost comparison in LKR, a visual mockup or design reference, and a timeline. The goal is not to impress with technical depth but to communicate institutional value clearly.

---

## Phase 1 — Repository and Monorepo Foundation

_Setting up the codebase infrastructure_

### Purpose

Create the technical foundation that every subsequent piece of work will live in. A bad foundation here means painful refactoring later. A good foundation here means every future developer can orient themselves in minutes.

### Task 1.1 — Initialise the pnpm Monorepo with Nx Orchestration

Create the root repository with pnpm workspaces. Define the workspace structure: `apps/` for deployable applications, `packages/` for shared libraries. This separation is not cosmetic — it enforces the boundary between things that deploy and things that are consumed. Layer Nx on top of the pnpm workspace for task orchestration: Nx provides task caching for build, lint, and typecheck commands, and `nx affected` commands so a change in one package only rebuilds and retests what actually depends on it. This matters specifically because the monorepo will grow to include two applications and five-plus shared packages — without affected-based caching, every CI run and every local `pnpm build` would re-process the entire codebase regardless of what changed.

### Task 1.2 — Define the Package Architecture

Decide every package before creating any of them. The packages are: `packages/ui` (the shared component library), `packages/config` (design tokens and Tailwind preset), `packages/validation` (Zod schemas — the single source of truth for all data shapes), `packages/database` (Prisma client and schema), `packages/api` (tRPC router definitions). The applications are: `apps/web` (the public website), `apps/admin` (the content management system).

### Task 1.3 — Configure Root TypeScript

Create `tsconfig.base.json` at the root with shared compiler options: strict mode, bundler module resolution, path aliases for every package (`@nexus/ui`, `@nexus/config`, `@nexus/validation`, `@nexus/db`, `@nexus/api`). Every package and application extends this base. This ensures consistent TypeScript behaviour across the entire monorepo.

### Task 1.4 — Create Both Next.js Applications

Scaffold `apps/web` and `apps/admin` as Next.js App Router projects. Configure both to use the shared TypeScript base. This is done together because the shared configuration decisions — path aliases, Tailwind setup, ESLint rules — are made once and applied to both.

### Task 1.5 — Configure ESLint and Code Standards

Set up a shared ESLint configuration. The rules that matter most are: no unused variables, no implicit any, consistent import ordering, no console statements in production. These are not pedantic rules — they are the difference between a codebase that degrades gracefully and one that accumulates silent errors.

### Task 1.6 — Configure pnpm-lock and Dependency Strategy

Commit `pnpm-lock.yaml` from the start. Decide the dependency placement strategy: shared dependencies (React, TypeScript) at the root, package-specific dependencies in each package, no dev dependencies accidentally placed in dependencies. The `clsx`, `tailwind-merge`, and `framer-motion` packages belong in `dependencies` in `packages/ui`, not `devDependencies`, because they are runtime requirements of the component library.

### Task 1.6b — Configure Dependency Vulnerability Scanning

Add `pnpm audit` as a required step in the CI pipeline, running on every push. Any high-severity vulnerability in a third-party dependency fails the build. This is a one-line addition to the CI workflow but it closes a real gap — a monorepo with this many dependencies (Next.js, Prisma, Tiptap, Framer Motion, and their transitive trees) will accumulate vulnerable versions over its multi-year lifespan if nothing is watching for them.

### Task 1.7 — Create Architecture Decision Records

Create `docs/adr/` in the repository. Write an ADR for every significant technology choice made in Phase 0. Each ADR follows the same structure: Context (what situation forced this decision), Decision (what was chosen), Alternatives Considered (what else was evaluated and why it was not chosen), Consequences (what this decision means going forward). ADRs are written once and never edited — if a decision is reversed, a new ADR is written explaining the reversal. This is how the reasoning behind the architecture survives developer turnover.

The initial ADRs to write:

**ADR-001 Monorepo Architecture** — Why a pnpm monorepo over separate repositories. Context: multiple deployable apps sharing code. Decision: monorepo with workspace packages. Alternatives: separate repos with published npm packages. Consequences: all code in one place, simpler cross-package refactoring, requires monorepo tooling discipline.

**ADR-002 Next.js App Router** — Why Next.js with App Router over alternatives. Context: need server rendering, i18n routing, static generation, and API routes in one framework. Decision: Next.js 14+ App Router. Alternatives: Remix, SvelteKit, separate frontend/backend. Consequences: server components by default, excellent static generation, but requires understanding the server/client component boundary.

**ADR-003 PostgreSQL Selection** — Why PostgreSQL over alternatives. Context: need relational data, JSON content storage, full-text search across three scripts, long-term reliability. Decision: PostgreSQL. Alternatives: MySQL, MongoDB, PlanetScale, Supabase. Consequences: self-hosted on Hetzner, requires backup management, but full control and no vendor lock-in.

**ADR-004 tRPC Selection** — Why tRPC over REST or GraphQL. Context: full-stack TypeScript monorepo where the frontend and backend are co-located. Decision: tRPC. Alternatives: REST with OpenAPI, GraphQL with code generation, direct server actions. Consequences: end-to-end type safety with zero code generation, but tightly couples frontend and backend — acceptable because both live in the same monorepo.

**ADR-005 Zod Validation Strategy** — Why Zod as the single source of truth for data shapes. Context: the same data shape needs to validate admin forms, API inputs, and database outputs. Decision: Zod schemas in `packages/validation`, TypeScript types inferred from schemas. Alternatives: separate TypeScript interfaces, Yup, class-validator. Consequences: one definition does three jobs, eliminates type drift between layers.

**ADR-006 R2 Storage Selection** — Why Cloudflare R2 over S3 or alternatives. Context: need object storage for media assets with no egress fees given Sri Lankan bandwidth costs. Decision: Cloudflare R2. Alternatives: AWS S3, Backblaze B2, local filesystem. Consequences: no egress fees, S3-compatible API, but requires Cloudflare account dependency.

**ADR-007 Analytics Strategy** — Why custom analytics is the system of record, with Umami as a self-hosted secondary view. Context: need usage data without third-party JavaScript on the public site, without GDPR complications, with full data ownership — but also a sanity-check view that doesn't depend on the platform's own collection code being correct. Decision: a custom server-side event collector in Next.js middleware feeds the primary admin analytics dashboard (Task 7.11), and Umami runs as a self-hosted Docker container on the same Hetzner server as an independent, privacy-first secondary view. Alternatives considered and rejected outright: Plausible (self-hosted, but a paid license for the self-hosted tier), Google Analytics (third-party scripts, GDPR complications, no data ownership). Consequences: complete data ownership, no third-party scripts, and a second data source to cross-check the custom collector against — at the cost of running and maintaining one additional Docker service.

**ADR-008 Multilingual Font Architecture** — Why CSS variable stacking over per-component font classes. Context: trilingual platform requiring Cormorant Garamond for Latin, Maname for Sinhala, Noto Serif Tamil for Tamil without per-component class management. Decision: unified `--font-family-display` and `--font-family-body` CSS variables composed from next/font variables, browser selects correct face by unicode range. Alternatives: separate Tailwind classes per script, runtime script detection. Consequences: zero per-component font management, automatic script selection, trivial to add a fourth language.

**ADR-009 Page Content Architecture** — Why long-form editorial content moves out of static i18n message files into a database-backed content model, while interface chrome stays static. Context: `messages/` mixed reusable UI strings with page-specific editorial prose edited only via developer commit, which already let placeholder alumni data and a stray dev note ship to `about.json`. Decision: a generic `PageContent` table (page, sectionKey, locale, versioned JSON) with its own tRPC router and admin module, sibling to the existing `PageConfig` section-visibility system. Alternatives: status quo (rejected — no editorial review path), one bespoke table per page (rejected — needless duplication of an identical shape), a third-party CMS (rejected — contradicts the platform's existing no-external-CMS decision). Consequences: every static public page except Home/News/Events/Results gains a request-time dependency on `PageContent` and the admin panel needs a section-type-aware editor; form-field labels, fixed taxonomy values, and the `societies.json` `kits` special case are explicitly excluded and handled separately.

---

## Phase 2 — Design System Foundation

_Building the visual language of the institution_

### Purpose

Establish the complete design token system before building any component. Tokens are the rules. Components consume the rules. If the rules are wrong, every component built from them is wrong.

### Task 2.1 — Define the Color System

Establish the full color palette: the warm forest greens that define the institutional identity, the parchment tones for content surfaces, the glass overlay system, text hierarchy colors, semantic colors for states. Every color must exist as a named token. No hardcoded hex values anywhere in the codebase after this point.

### Task 2.2 — Define the Typography System

Choose the typefaces and lock the font stack. For Nexus: Cormorant Garamond for display (institutional, classical), Inter for body (readable, modern), IBM Plex Mono for code, Maname for Sinhala display, Noto Serif Sinhala for Sinhala body, Noto Serif Tamil for Tamil. Define the complete type scale from display size down to caption. Define line heights, letter spacing, and font weights for each scale step. The critical architectural decision here is the unified multilingual font stack: rather than using separate CSS classes for each script, compose a single logical font family using CSS variable stacking so the browser automatically selects the correct face based on character unicode range.

### Task 2.3 — Define the Spacing and Sizing System

Establish a consistent spacing scale based on a 4px unit. Every margin, padding, gap, and dimension in the entire platform must come from this scale. Arbitrary pixel values create visual inconsistency that users perceive even if they cannot articulate it.

### Task 2.4 — Define the Motion System

Define animation tokens: durations (fast, base, slow, ceremonial), easing functions (standard, decelerate, accelerate, ceremonial ember). The institutional character of the site requires that animations feel deliberate and dignified — not playful, not instant. The `ceremonial` easing token encodes this intent so every developer uses the same animation feel without having to make individual judgement calls.

### Task 2.5 — Define the Glass and Shadow System

The visual identity of Nexus is built on the glass morphism treatment — a dark forest green base with translucent layered surfaces. Define the glass surface tokens (subtle, medium, card), border highlight tokens, and shadow tokens. These are used by every surface in the platform.

### Task 2.6 — Build the Token Generator

Create the script in `packages/config/scripts/` that reads the token definitions and generates `tokens.css` — a single CSS file containing every token as a CSS custom property. This generated file is imported once in each app's `global.css`. This means tokens are defined in TypeScript (type-safe, easy to audit) and consumed in CSS (fast, no JavaScript runtime cost).

### Task 2.7 — Configure the Tailwind Preset

Create `nexusPreset` in `packages/config` that maps every token into Tailwind's theme. This gives every developer access to the full token system through Tailwind utility classes. The preset is imported by both `apps/web` and `apps/admin` — one source of truth for the entire visual language.

### Task 2.8 — Build the Design System Viewer in Admin

Create the design system documentation pages in `apps/admin/src/app/design-system/`. Cover every token category: colors, typography, spacing, shadows, motion, glass, focus rings, z-index, blur, sizing, aspect ratios, opacity. This serves two purposes: it is a reference for developers, and it is a demonstration tool for the principal presentation. The public website does not ship these pages.

### Task 2.8b — Write the Design System Documentation Set

The in-app viewer (Task 2.8) is interactive but lives behind admin authentication and disappears if the admin app is ever down or being rebuilt. Alongside it, write the durable, version-controlled documentation set in `docs/Design System/`: `Foundations.md` (design principles, color, typography, spacing, motion in prose), `Tokens Reference.md` (every token name and value in a static table), `Page Specifications.md` (every page's sections, the components each section uses, and where its data comes from), and `Component Reference.md` (every component's props and usage — the comprehensive 300+-entry reference already produced for `packages/ui` belongs here, alongside the page blocks, admin CMS components, and accessibility/infrastructure items it also covers). A developer who has never opened the admin panel should still be able to understand the entire visual system from these four files alone.

---

## Phase 3 — Component Library

_Building the UI building blocks_

### Purpose

Build every reusable component before building any page. Pages are compositions of components. Building pages before components means building components inside pages, which leads to duplication and inconsistency.

### Task 3.1 — Establish the Component Architecture

Define the component categorisation: atoms (smallest units — Button, Badge, Avatar, Tag), spinners (BeatLoader, ScaleLoader, BarLoader), forms (Input, Select, Textarea, Checkbox, Toggle, FileUpload), cards (NewsCard, StaffCard, EventCard, SocietyCard, GalleryCard), layout (Container, Grid, Hero, Footer, Navigation), brand icons (CrestAnimation, SchoolLogo), social icons (Facebook, Instagram, LinkedIn, YouTube, WhatsApp, GitHub), an icon registry (the unified `<Icon name="..." />` API over Lucide), visualization (DataTable, ResultsDisplay, ComparisonBar), page-states (LoadingScreen, ErrorState, EmptyState, NotFound), notifications (Alert, Toast, AnnouncementBanner), overlays (Modal, Drawer, DropDownMenu, ShareSheet, ToolTip), navigation (Accordion, Breadcrumb, FilterBar, Pagination, Tabs), media (AudioPlayer, Lightbox, MapEmbed, VideoFrame), sections (StatsStrip, PrincipalMessage, AlumniLegacyBlock), typography (Heading, Text, QuoteBlock, RichTextRenderer), utilities (BackToTopButton, CountdownTimer, ScrollProgressBar), and the AmbientEmbers effect. This taxonomy prevents components from ending up in random locations. Note that overlays and notifications are deliberately separate categories: overlays are structural (they trap focus and lock scroll), notifications are messaging (they convey status) — Modal and Toast look similar but solve different problems and belong in different folders.

### Task 3.2 — Build Atoms First

Build the smallest components first because everything else depends on them. Button, ButtonLink, Badge, Avatar, Tag, ResultsGradeBadge, InlineHelpText. Each component must have: TypeScript props interface, proper accessibility attributes (aria labels, roles, keyboard navigation), design token usage only (no hardcoded values), and variants that match the design system.

### Task 3.3 — Build Form Components

Build the complete form component set: Input, Select, Textarea, Checkbox, Radio, Toggle, Slider, FileUploadZone, Calendar, FormFieldGroup, FormErrorMessage, FormValidationSummary, RequirementsChecklist, ProgressIndicator. These are used in both the public contact form and the entire admin panel. Building them once in `packages/ui` means the admin panel gets the same design quality as the public site.

### Task 3.4 — Build Card Components

Build every card variant the platform needs: NewsCard, StaffCard (with principal, grid, and compact variants), EventCard, SocietyCard, SocietyBanner, FacilityCard, GalleryAlbumCard, AchievementCard, ExtracurricularCard, AcademicStreamCard, StatCard, DownloadableDocumentItem. Cards are the primary display format for database content on the public site.

### Task 3.5 — Build Layout Components

Build the structural components: Container (with content width constraints), Grid (responsive), Hero (with background, overlay, and content slots), Navigation (with mobile menu, locale switcher, scroll behaviour), Footer (with identity strip, links, social icons), Stack, MasonryGrid, QuickAccessPortal. Navigation and Footer are particularly important because they appear on every page and encode the school's identity.

### Task 3.6 — Build the Brand Icon System

Build the institutional brand icons as React SVG components: CrestAnimation (hero variant with entrance animation, loading variant for transitions — the defining visual of the platform), CrestDiagram (interactive explainer with labelled parts), SchoolLogo. These must be built from the official SVG artwork, not approximated. The crest animation in particular must feel institutional: a single deliberate sweep, settled — not decorative or playful.

### Task 3.7 — Build the Social Media Icon System

Build social media icons as React SVG components from official brand kits: Facebook (color, white), Instagram (glyph gradient, glyph black, glyph white), LinkedIn (black, color, inline color, white), YouTube (black, color, inline variants, white), WhatsApp (glyph black, green, white; stacked variants), GitHub (Invertocat and lockup variants). Official SVG brand kits are the source — never icon fonts or third-party libraries for brand icons.

### Task 3.8 — Build the Icon Registry System

Build `Icon.tsx` and `registry.ts` as a unified icon API sitting on top of Lucide. Every place in the codebase that needs a generic icon (search, chevron, calendar, close) uses `<Icon name="search" />` rather than importing directly from `lucide-react`. This is what made the `generate-icons.js` script and the `social` set's `SocialIconProps` collision worth fixing properly — a single registry means the icon set can be extended or swapped in one place instead of hunting down scattered imports across both apps.

### Task 3.9 — Build Visualization Components

Build the data display components: DataTable (sortable, with pagination), ResultsDisplay (exam results with grade badges), ComparisonBar (stream comparison), ProgressArc, StudentJourneyFlow, StreamComparisonTable, TimetableGrid, ProcessSteps. These serve the academic content of the platform.

### Task 3.10 — Build Page State Components

Build the full-page state components: LoadingScreen (with CrestAnimation), LoadingSkeleton (content placeholders), ErrorState (inline and section variants), EmptyState, NotFound, OfflineBanner, CookieConsentBanner. Every possible application state must have a designed response — a user should never see a blank white screen or an unhandled browser error.

### Task 3.11 — Build Notification Components

Build Alert (inline messaging), Toast (transient feedback), and AnnouncementBanner. The AnnouncementBanner is particularly important for the public site — it is how the school communicates urgent information (exam dates, closures, results availability) to all visitors.

### Task 3.12 — Build Overlay Components

Build Modal, Drawer, DropDownMenu, ShareSheet, and ToolTip. Every one of these must handle focus trapping, keyboard navigation (Escape to close, Tab cycling within the overlay), and scroll locking on the body correctly — these are the components most likely to break accessibility if built carelessly, because each one removes the user from the normal document flow. Used throughout both the admin panel and the public site (ShareSheet on news articles, DropDownMenu in the admin user menu, Modal for confirmation dialogs).

### Task 3.13 — Build Navigation Components

Build Accordion, Breadcrumb, FilterBar, LanguageSwitcher, MobileMenu, NavLink, Pagination, SearchInput, TableOfContents, and Tabs. These are distinct from the Layout Navigation built in Task 3.5 — that's the top-level site header; these are the smaller navigation primitives used inside pages and the admin panel. Every one of them must work correctly in all three languages and across all device sizes, since FilterBar and SearchInput in particular appear on the highest-traffic listing pages (News, Societies, Gallery).

### Task 3.14 — Build Media Components

Build AudioPlayer (the school anthem on the About page), Caption, ImageFrame, Lightbox (full-screen gallery viewing), MapEmbed (venue locations for events and admissions), PanoramicFacilityViewer, and VideoFrame. These handle every rich media type the platform needs with a consistent design treatment — a photo in the Gallery and a photo in a NewsCard should feel like they belong to the same system.

### Task 3.15 — Build Section Components

Build the larger composite sections used as named blocks on public pages: AchievementTicker, AdmissionsKeyDatesTimeline, AdmissionsProcessSteps, AlumniLegacyBlock, LifeAtKCCPhotoStrip, PrincipalMessage, SectionSlider, StatsStrip, Timeline. These sit one level above cards and layout primitives — each one is a self-contained block that a page composes rather than a piece a page assembles from smaller parts.

### Task 3.16 — Build Typography Components

Build EyebrowLabel, Heading, InlineLink, QuoteBlock, RichTextRenderer, SectionHeader, and Text. These enforce consistent typographic treatment across the entire platform — a developer never hardcodes a font size or picks a heading level arbitrarily. RichTextRenderer in particular is load-bearing: it is what renders the Tiptap JSON content from the News module (Task 7.3) safely on the public site.

### Task 3.17 — Build Utility Components

Build BackToTopButton, CountdownTimer, and ScrollProgressBar. Small quality-of-life additions that add polish to the public experience without being essential to any page's core function.

### Task 3.18 — Build the AmbientEmbers Effect

Build a subtle particle effect used in specific hero contexts, reinforcing the `ember` motion token aesthetic established in Task 2.4 — the living warmth of an institution, not a visual gimmick. This is the one component in the library that exists purely for atmosphere; it must be implemented carefully enough that it never affects Lighthouse performance scores (Task 10.5) or distracts from the content it sits behind.

### Task 3.19 — Build Hooks and the cn Utility

Build the shared hooks: `useCountUp` (animated number counting for statistics), `useInView` (intersection observer for scroll-triggered animations), `useActiveSection` (scroll tracking for navigation highlighting), `useScrollDirection` (show/hide navigation), `useMediaQuery`, `useLocalStorage`, `useFormField`. Build the `cn` utility (clsx + tailwind-merge combination) — used in virtually every component in the library to allow conditional class names without Tailwind conflicts. These are consumed by components throughout the rest of the library, which is why they are built alongside the components rather than strictly before or after them.

### Task 3.20 — Build Spinners and Loading States

Build BeatLoader, ScaleLoader, BarLoader with Framer Motion. Animated loading states make the platform feel alive and intentional during data fetching.

### Task 3.21 — Audit the Component Library

Before moving to pages, audit every component against four criteria: does it use design tokens exclusively, does it have correct TypeScript types, does it have correct ARIA attributes, does it handle all its loading/error/empty states. Fix every failure. This audit is the quality gate between the component library phase and the page-building phase.

---

## Phase 4 — Architecture Hardening

_Making the foundation production-grade_

### Purpose

Before connecting the database and building the admin panel, the codebase must be hardened against the categories of failure that affect real production systems.

### Task 4.1 — Create packages/validation

Create the Zod validation schema package. Every domain entity in the system has a Zod schema: StaffMember, PrincipalMessage, NewsArticle, SchoolEvent, Achievement, GalleryAlbum, AlumniProfile, StatItem, Announcement. TypeScript types are inferred from these schemas using `z.infer<>` — no separate interface files. This is the single source of truth for data shapes. The admin form validation, the API route validation, and the database output validation all use the same schema. Inconsistency between these three is the most common source of data corruption bugs in CMS systems.

### Task 4.2 — Error Boundaries

Add Next.js error boundary files to both applications. `error.tsx` at the locale layout level in `apps/web` catches any component crash and shows the ErrorState component with a retry button. `global-error.tsx` at the root level catches crashes in the root layout itself and shows a minimal hardcoded fallback (raw inline styles, no design system — because the layout that loads the design system is what failed). `not-found.tsx` handles 404s with a designed page. Beyond these three page-level files, wrap major page sections (News, Gallery, Results) in their own React `ErrorBoundary` components so a failure in one section does not take down the whole page — a visitor should still be able to read the rest of the home page if the gallery section's data fetch fails. These four layers together are the difference between a platform that fails gracefully and one that shows a blank screen to users.

### Task 4.3 — Shared TypeScript Contracts

Ensure `tsconfig.base.json` has path aliases for every package. Ensure the root `tsconfig.json` has project references to every package. Both of these are required for TypeScript project references to work correctly, which enables incremental compilation across the monorepo.

### Task 4.4 — Fix Dependency Placement

Audit every `package.json` in the monorepo. Runtime dependencies (`clsx`, `tailwind-merge`, `framer-motion`) must be in `dependencies`, not `devDependencies`. Development-only tools (TypeScript, ESLint, testing frameworks) must be in `devDependencies`. Wrong placement causes silent production build failures.

### Task 4.5 — Codebase Hygiene

Fix all known issues before adding more code: the `dirrection` typo in SectionSlider, any `'use client'` directives on page-level components that should be server components, any inline TODOs that represent deferred decisions, any placeholder folders or assets in the public directory.

### Task 4.6 — Internationalisation Architecture

Establish the complete i18n architecture using next-intl. Define the locale routing (`/en/`, `/si/`, `/ta/`). Create the message file structure: separate JSON files per locale per feature area (navigation, common, home, about, news, events, societies, facilities, admissions, results, contact, gallery). Fill English messages completely. Create Sinhala message files with at least placeholder strings for every key — an empty message file causes runtime crashes. Tamil message files follow the same pattern. The rule is: every message key that exists in English must exist in Sinhala and Tamil, even if the translation is a placeholder.

### Task 4.6b — Document the Translation Workflow

Write `docs/i18n/Translation Workflow.md` covering: how to add a new translation key across all three message-file sets, how to request a review from a native Sinhala or Tamil speaker, how to handle strings that have no direct translation in one of the three languages, and how to test a locale during local development. Include a glossary of institutional terms (the school motto, staff titles, department names) in all three languages so that translations stay consistent across every feature area instead of drifting as different contributors translate the same concept differently over time.

### Task 4.7 — Establish Unit Testing Infrastructure

Set up Vitest for `packages/ui` and write unit tests for the pure, high-value targets first: the shared hooks (`useCountUp`, `useInView`, `cn`) built in Task 3.19, and the form validation logic built in Task 3.3. Pure functions and hooks are the cheapest to test and the most valuable to cover, because they run inside every component render across both applications — a regression here breaks silently everywhere at once. Wire `vitest run` into the CI pipeline (Task 1.4) so a broken hook fails the build before it reaches `main`.

---

## Phase 5 — Principal Presentation and Formal Approval

_Securing the mandate to build the full platform_

### Purpose

This phase is not technical. It is the moment the project transitions from a student initiative to a formally endorsed institutional project. Without this approval, there is no access to institutional data, no staff cooperation, no budget for infrastructure.

### Task 5.1 — Prepare the About Page

The About page is the centrepiece of the presentation. It must be complete: Hero with CrestAnimation, Stats strip with animated counters, Namesake section (C.W.W. Kannangara portrait and biography), School story, Timeline, Ethos, Values, Interactive Crest Diagram, Alumni Legacy, School Anthem (audio player), Closing statement. Every placeholder image must have a caption indicating it is awaiting archive photography. The page must work in all three languages.

### Task 5.2 — Prepare the Design System Demonstration

Pre-open specific admin pages for the presentation: Typography (show all three scripts rendering correctly), Glass (show the forest aesthetic), Cards (show the variety of content types), Motion (show the institutional animation feel). The purpose is to demonstrate that the visual language is coherent and complete, not that the backend is connected.

### Task 5.3 — Prepare the Architecture Slide

One slide explaining the technical architecture in non-technical language. The message is: this system is built to last. The dependency flow (Validation → Database → API → Admin → Public Site) demonstrates that each layer is replaceable without rebuilding the others. This is the answer to the question "what happens when you graduate?"

### Task 5.4 — Conduct the Presentation

Present to the principal. The ask is formal written approval to proceed to the backend phase, cooperation from administration for content and photography, and endorsement to approach alumni and staff for profiles.

### Task 5.5 — Collect Initial Content

Immediately after approval, collect: the principal's official biography and portrait photograph, staff list and department structure, existing news articles or announcements to seed the database, school crest in vector format, historical photographs from the school archive, and the school anthem audio file. Content collection is always the longest-lead-time item in any web project.

---

## Phase 6 — Database and Backend

_Building the data foundation_

### Purpose

No page on the public website will serve real content until the database exists and the API layer can read from it. This entire phase must be complete before the public pages are connected to live data.

### Task 6.1 — Define the Complete Prisma Schema

Write the full database schema in `packages/database/prisma/schema.prisma`. Every model the platform needs: User (for admin authentication, with role), News (with slug, content as JSON for rich text, status, category, author relation), Staff (with role, department, order for sorting), Society (with category, member count, logo), Event (with date, venue, status), GalleryAlbum (with year, cover photo), GalleryPhoto (belonging to an album), Achievement, AlumniProfile (with approval status for public directory), ExamResult (with index number, year, subjects as JSON), PageConfig (for the page section configuration system), MediaAsset (for the media library), AuditLog (for change tracking), Notification (for the notification infrastructure). Define all relations, indices, and constraints. The schema, once migrated to production, is expensive to change — get it right here.

### Task 6.2 — Run Initial Migration

Run `prisma migrate dev --name init` to create the first migration. Commit the migration files. Every subsequent schema change gets its own migration. Never edit existing migration files.

### Task 6.3 — Implement Authentication

Set up Auth.js with the Prisma adapter and the Google provider as the primary sign-in method, restricted to the school's `@cwwkcc.lk` Google Workspace domain — verified server-side in the `signIn` callback, never by trusting the `hd` claim alone, since it can be spoofed outside a genuine Workspace flow. Successful Google authentication is not sufficient on its own: a new admin's email must already exist in the `User` table with an assigned role, added there by an existing Admin, before their session is created — Nexus's own `User` table is the source of truth for access, not the school's Google directory. Create the middleware that protects all admin routes and redirects unauthenticated users to the login page. Authentication is the most security-critical piece of the entire platform — it must be complete before any other admin functionality.

### Task 6.3b — Seed the Break-Glass Admin Account and Implement TOTP

Seed one Credentials-based super-admin account from environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, bcrypt-hashed) at first deploy — used only to invite the first real `@cwwkcc.lk` admins and for emergency recovery if Google OAuth becomes unavailable (a Workspace misconfiguration, an OAuth app restriction, a Google outage). Implement TOTP (RFC 6238) for this account specifically: QR-code setup against a standard authenticator app, ten single-use backup codes generated once at setup and shown only that one time. No other admin account needs this — every other admin's account security is inherited from the school's own Google Workspace 2FA enforcement, a setting controlled entirely outside Nexus. If the break-glass password is lost, it is rotated via a server-side CLI script over SSH, never a self-service email flow — an internet-facing reset surface on the platform's single highest-privilege bypass account is a liability, not a convenience.

### Task 6.4 — Implement tRPC

Set up the tRPC server in `packages/api`. Define the router structure: newsRouter, staffRouter, eventsRouter, societiesRouter, galleryRouter, achievementsRouter, alumniRouter, resultsRouter, academicsRouter, extracurricularsRouter, facilitiesRouter, archiveRouter, mediaRouter, pageConfigRouter, analyticsRouter, auditRouter, notificationRouter, userRouter. Each router defines procedures for list, getById, create, update, delete, and any domain-specific operations (publish, archive, approve). Integrate the tRPC handler into `apps/web` and `apps/admin`. Create the tRPC client configuration for both apps. tRPC is the nervous system of the platform — when it is working, every piece of the admin panel and every data-driven page on the public site can be connected.

### Task 6.4b — Implement Platform-Wide Rate Limiting

Implement rate limiting as Next.js middleware, applied per route rather than as a single global rule: the results portal at 10 requests per minute per IP (built in detail in Task 8.9), the contact and feedback forms at 5 requests per hour per IP, and a general baseline on all other API routes to prevent casual abuse. No external rate-limiting service is required at this traffic scale — in-memory or lightweight middleware-based limiting is sufficient and keeps the infrastructure footprint small.

### Task 6.5 — Implement the Page Configuration System

Create the `PageConfig` table and the corresponding tRPC procedures. The page configuration system stores, for each page, an ordered list of sections with their enabled/disabled status. The admin panel exposes a simple UI to reorder sections and toggle their visibility. The public site reads this configuration at request time and renders only the enabled sections in the specified order. This is the content builder capability — not a drag-and-drop component palette, but full control over page composition without a developer.

### Task 6.5b — Implement the Page Content System

Create the `PageContent` table and its Zod schemas (one per `sectionKey` shape — flat prose, repeatable lists, structured short-field blocks) per ADR-009. Add `pageContentRouter` with `getByPage` (returns every section for a page in the requested locale, falling back to English if a translation is missing) and `update` (upserts one section, writing a version snapshot in the same pattern as news content versioning). This is the sibling system to Task 6.5's `PageConfig`: `PageConfig` decides whether a section appears and in what order; `PageContent` decides what that section says. Write the one-time migration script that reads the existing `en`/`si`/`ta` message JSON for every non-chrome namespace and seeds it into `PageContent` as version 1 — this is also the point at which the placeholder alumni profiles and the stray development note in `about.json`'s `heritage.caption` field get replaced with real content, not carried forward.

### Task 6.6 — Implement the Media Library

Create the media management system. All uploaded files go to Cloudflare R2 object storage via presigned URLs (the browser uploads directly to R2, never through the Next.js server — this is important for performance and cost). The `MediaAsset` table stores the R2 URL, original filename, file size, MIME type, alt text, tags, and usage tracking. Every image in the CMS (news cover photos, staff portraits, gallery photos, society logos) references a MediaAsset rather than a raw URL string. This means when an image is updated in the media library, it updates everywhere it is used.

### Task 6.7 — Implement the Announcement System

Build a simple announcement system. Announcements are database records with a variant (info, warning, error), a message, a published date, and an optional expiry date. The admin panel allows creating and scheduling announcements. The public site renders an AnnouncementBanner at the top of every page when an active announcement exists. This is the complete scope of notifications for version one. An event bus or multi-channel notification infrastructure is not built at this stage because no second delivery channel (email, SMS, WhatsApp) yet exists. Building abstraction layers before the second channel exists is speculative architecture that adds complexity without adding capability. When a second channel is needed, the announcement system is extended at that point with the patterns the first channel established.

### Task 6.8 — Implement Audit Logging

Every write operation in the tRPC API creates an audit log entry: who performed the action, what entity was affected, what changed (before and after values), when. The audit log is append-only and never deleted. This is not optional — when multiple editors are making changes to a live school platform, the ability to answer "who changed this and when" is essential.

### Task 6.9 — Database Hardening

Three things must be in place before the database carries real traffic, not retrofitted after launch. First, the soft-delete pattern: content is never hard-deleted, a `deletedAt` timestamp marks records as archived instead, and every admin-panel delete action triggers this rather than a real `DELETE` — this is what makes the "Accidental Content Deletion" recovery procedure in Task 14.0b actually work, rather than depending on a backup restore for every editor mistake. Second, connection pooling configured for the production environment, so the results portal does not exhaust available connections on the day exam results are released (Task 12.5 load-tests this). Third, scheduled cleanup jobs that remove genuinely orphaned technical records — expired sessions, soft-deleted records past their retention period, unused media asset references — while never touching real content.

### Task 6.10 — Integration Tests for the API Layer

Write integration tests for the tRPC routers against a real test database (not mocked). Verify that authentication is enforced on protected procedures, that input validation correctly rejects malformed data before it reaches the database, and that create/update/delete operations persist correctly end-to-end through the full stack — context, procedure, Prisma, database. Unit tests (Task 4.7) cover isolated logic; these tests cover the seams between the API layer's pieces, which is where the most common CMS bugs actually live.

---

## Phase 7 — Admin Panel

_Building the content management interface_

### Purpose

The admin panel is the tool that makes the platform self-sustaining after the developer leaves. Its quality determines whether staff actually use it, which determines whether the public website stays alive with current content.

### Task 7.1 — Admin Shell Layout

Build the admin application shell: persistent sidebar navigation, top bar with user avatar and session info, breadcrumb navigation, responsive mobile menu. Every admin module lives inside this shell.

### Task 7.2 — Dashboard Overview

Build the admin dashboard: total content counts (news articles, staff, events, societies), recent activity feed (last 10 changes from the audit log), quick action buttons (new article, new event, new announcement), and a summary of pending items (draft articles, unapproved alumni profiles).

### Task 7.3 — News Module

Build the full news CRUD interface. List view with status badges (Draft, Under Review, Published, Archived), search and filter by category and date, bulk actions. Create and edit view with a rich text editor (Tiptap), cover image upload via the media library, category selection, status workflow (save as draft, submit for review, publish, archive), SEO preview showing how the article will appear in search results. The form validates against `NewsArticleSchema` from `@nexus/validation` on both client and server.

### Task 7.4 — Staff Module

Build the staff management interface. List view sorted by role hierarchy (Principal, Deputy Principals, Heads of Department, Teachers). Create and edit view with name, title, role, department, tenure, quote, portrait upload via media library, and a drag-and-drop reorder interface (the `order` field determines display sequence on the public site).

### Task 7.5 — Events Module

Build the events management interface. Calendar view and list view. Create and edit with title, description, date, time, venue, category, status, optional registration link. The status workflow mirrors news: draft, published, past (automatic based on date).

### Task 7.6 — Societies Module

Build the societies management interface. Create and edit with name, slug, category, tagline, description, member count, founding year, logo upload, banner upload, advisor staff member selection.

### Task 7.7 — Gallery Module

Build the gallery management interface. Album creation with title, year, category, cover photo selection. Batch photo upload to R2 with progress indicators. Per-photo alt text (required — accessibility compliance). Album reordering.

### Task 7.8 — Results Module

Build the exam results interface. CSV upload for bulk result entry with a preview and validation step before committing. Individual result entry form. Results are associated with exam type and year. Search interface to test the public-facing results lookup.

### Task 7.9 — Media Library Module

Build the central media library interface. Grid view of all uploaded assets with search and tag filtering. Upload interface with automatic compression (images are resized to maximum required display dimensions before upload to R2). Alt text editing. Usage tracking (shows which content items use each asset). Bulk delete with usage warning.

### Task 7.10 — Page Configuration Module

Build the page configuration interface. For each configurable page, show the current section order as a list of draggable cards. Each card shows the section name, a preview thumbnail, and an enable/disable toggle. Changes save to the `PageConfig` table and take effect on the next public page load.

### Task 7.10b — Page Content Module

Build the page content editing interface. For each page, list its content sections (sourced from `PageContent`) grouped the same way the page itself is organised. Each section's editor matches its shape: a rich text field for prose blocks (story, closing statements), a repeatable-list editor with drag-to-reorder for timeline milestones, crest symbols, and FAQ items, and a plain form for short structured fields (mission/vision/ethos text, anthem lyrics and audio). Every save creates a version snapshot, viewable and revertible the same way as Task 7.3's news versioning. A locale switcher lets an editor see and edit all three languages for a section without leaving the page.

### Task 7.11 — Analytics Module

Build the custom analytics dashboard. This is not a third-party embed — it is a purpose-built interface that reads from the platform's own analytics data store. Track and display: total page views by day, week, month; most viewed pages with trend indicators; search terms entered by users and their result counts; results portal usage (how many result lookups per day); content performance (which news articles get the most views); language distribution (what percentage of users use each locale); device type distribution (mobile vs desktop vs tablet). The analytics data is collected by a lightweight server-side event collector built into the Next.js middleware — no third-party JavaScript on the public site, no GDPR complications, full ownership of the data.

### Task 7.12 — User Management Module

Build the user administration interface. List all admin users with their roles. Invite new users by adding their `@cwwkcc.lk` email to the allowlist — they sign in with their own Google account, no password to set or reset. Role assignment (Admin has full access; Editor can create and edit content but cannot manage users, access settings, or delete published content). User deactivation (never delete users — deactivated users are retained for audit log integrity).

### Task 7.13 — Announcements Module

Build the announcement management interface. Create announcements with variant selection (info, warning, error), message content, publish date, and optional expiry date. View all active and past announcements. Deactivate or delete announcements. This is deliberately simple — the purpose is operational communication to site visitors, not a notification platform.

### Task 7.14 — Audit Log Module

Build the audit log viewer. Chronological feed of all admin actions with filters by user, entity type, action type, and date range. Individual entries show the before and after state of changed fields. This is read-only — the audit log is never editable.

### Task 7.15 — Settings Module

Build the global platform settings interface: school name, address, contact details, social media URLs, school founding year, school motto. These values are read by the public site for the footer, JSON-LD structured data, and metadata.

> Tasks 7.16–7.21 were added in a later completeness audit that cross-referenced the Feature Registry against Page Specifications.md's route table — six admin modules had no task anywhere in this roadmap despite their public-facing pages already being specified (F-165, F-168 through F-172).

### Task 7.16 — Academic Programs Admin Screen

Build a config-style screen, not a CRUD module — the same editing pattern as Task 7.15's Settings Module. A fixed set of stream entries (Bio Science, Physical Science, Commerce, Arts, Technology) with editable description, subject list, image, and contact department. No create, no delete, no draft/publish workflow — the set of streams is fixed by the national A/L system; only the descriptive content changes. Performance statistics shown on the public Academics page are computed live from `ExamResult` data and have no admin entry surface here at all.

### Task 7.17 — Extracurriculars Module

Build the extracurriculars management interface, identical in shape to the Societies Module (Task 7.6): name, category, description, coach/advisor via staff member selection, achievements, photo, active/inactive status. Unlike Academic Programs, activities genuinely get added and retired over the years, so this needs full create/edit/delete.

### Task 7.18 — Alumni Module

Build the alumni management interface with two entry paths feeding one list: admin-direct entry, for building the initial historical dataset at launch, and public self-submissions awaiting moderation. List filterable by status (pending/approved/rejected), graduation year, profession. Approve publishes immediately to the public directory; reject discards with an optional logged reason. Editable before approving, since public submissions may be incomplete or contain typos. The Dashboard's pending-items count (Task 7.2) links directly into this module's pending filter.

### Task 7.19 — Achievement Module

Build the achievement database management interface: student name, category (academic/sports/arts/competition), achievement level, description, year, optional photo, optional link to a related News article. Simple create/edit/delete, the same shape as the Events Module — no draft/review workflow needed.

### Task 7.20 — Digital Archive Module

Build the digital archive management interface as a curated content layer over the Media Library (Task 7.9), not a replacement for it. Each entry has a title, year, category (photograph/magazine/prize-giving record/prefect list), description, and a file uploaded through the standard Media Library pipeline. Year and category are what the public Digital Archive page filters and full-text-searches by — the Media Library alone has no concept of what a given file actually is.

### Task 7.21 — Facilities Module

Build the facilities management interface: name, category, description, photo(s), display order. Full create/edit/delete — unlike Academic Programs, the facility list isn't nationally fixed, and the school should be able to add a new lab or renovate a building without a developer.

---

## Phase 8 — Public Pages (Connected to Live Data)

_The website the world sees_

### Purpose

Per ADR-009, every page below sources its hero copy and editorial section content from `PageContent` (Task 6.5b) rather than static message strings, except for reusable interface chrome (buttons, form labels, filter pills, taxonomy values), which remains in `navigation.json` and `common.json`.

### Task 8.1 — Home Page

Build the home page as a composition of server-rendered blocks: Hero (with CrestAnimation, headline, and call to action), Statistics Strip (animated counters reading from the database), Principal's Message (reading from the Staff table with principal role), Latest News (three most recent published articles), Upcoming Events (next three events), Quick Access Portal (links to Results, Admissions, Societies, Gallery), Announcement Banner (if any active announcements exist). The page configuration system controls which blocks appear and in what order.

### Task 8.2 — About Page

The About page is already built and complete as a static demonstration. This task connects it to live data: the statistics come from the database, the alumni profiles come from the `AlumniProfile` table, the principal portrait comes from the Staff table, and the story, timeline, ethos, crest, and anthem sections come from `PageContent` (Task 6.5b) rather than static message strings, per ADR-009.

### Task 8.3 — News Pages

Build the news listing page (with category filter, pagination, and search) and the individual news article page (with rich text rendering, author attribution, related articles, and social sharing). Implement `generateStaticParams` for published articles so they are statically generated at build time and served from the CDN edge. Implement `generateMetadata` for each article's Open Graph and Twitter card metadata.

### Task 8.4 — Events Pages

Build the events listing page (with calendar view and list view, filterable by category and month) and the individual event page (with full description, venue map link, registration link if applicable).

### Task 8.5 — Societies Hub

Build the societies listing page (filterable by category) and the individual society page (banner, description, advisor staff card, recent events, gallery preview). The societies hub is one of the highest-engagement pages for current students.

### Task 8.6 — Facilities Page

Build the facilities page using FacilityCard components. Content is managed through the Facilities Module (Task 7.21) — full create/edit/delete, since the facility list isn't fixed and the school adds or retires facilities on its own schedule.

### Task 8.7 — Admissions Page

Build the admissions information page using ProcessSteps, AdmissionsKeyDatesTimeline, and contact form components. The process steps, requirements checklist, and FAQ content come from `PageContent` (Task 6.5b) — the admissions process doesn't change year-to-year, but it does change, and that should not require a developer. The key dates come from the Events table filtered by the academic-administrative category.

### Task 8.8 — Gallery

Build the gallery listing page (albums sorted by year) and the individual album page (photo grid with lightbox). All images served through `next/image` with proper sizing and blur placeholders.

### Task 8.9 — Results Portal

Build the exam results public search interface. The user enters their index number and selects the exam year. The request goes to a rate-limited API route that queries the ExamResult table. Rate limiting is implemented at the middleware level — maximum 10 requests per minute per IP address. The response never includes any data other than the specific result for the queried index number. The ResultsDisplay component renders the result with grade badges. This page must be available in all three languages. It is the single most important functional feature of the platform for the community.

### Task 8.10 — Contact Page

Build the contact page with the ContactForm component wired to an API route that sends emails via a transactional email service. The form validates using the contact form's Zod schema before submission. A FeedbackForm is also available for general feedback.

### Task 8.11 — Alumni Directory

Build the public alumni directory with search (by batch year, profession, country). Each profile shows name, graduation year, position, and quote — no private contact information. A submission form allows alumni to submit their own profiles, which enter an admin approval queue before appearing publicly.

### Task 8.12 — Digital Archive

Build the digital archive as one of the signature features of the platform. The archive contains: historical photographs (scanned and uploaded with year and description), old annual magazines (PDFs with searchable metadata), prize-giving records, notable achievement records, prefect lists by year. The archive is browsable by year and searchable by full-text. This is what makes Nexus genuinely unique — a 150-year-old institution with a properly organised, searchable digital memory.

### Task 8.13 — Achievement Database

Build the achievement database as a filterable, searchable record of the school's accomplishments: academic achievements (A/L results, scholarship winners, university admissions), sports achievements (tournament wins, records, national-level athletes), arts and cultural achievements, competition results. Filterable by year, category, and student name. This becomes a living record that is updated each year.

### Task 8.14 — Search

Build the unified search interface. A single search box, accessible from every page via the navigation, queries across all content types simultaneously: news articles, events, staff profiles, societies, gallery albums, archive records, achievement records. The search is powered by PostgreSQL full-text search with support for Sinhala, Tamil, and English terms. Results are grouped by content type and ranked by relevance. Every new content type added to the platform is automatically searchable because the search index is built from the database.

> Tasks 8.15–8.17 were added in the same completeness audit as Tasks 7.16–7.21. All three routes (`/academics`, `/administration`, `/extracurriculars`) already existed in Page Specifications.md's route table with no corresponding build task anywhere in this roadmap.

### Task 8.15 — Academics Page

Build the academics page: academic streams (Bio Science, Physical Science, Commerce, Arts, Technology) via AcademicStreamCard, with subject lists and a StreamComparisonTable for side-by-side comparison. Performance visualizations (pass rate by stream, university entrance rate, subject popularity) are computed live from `ExamResult` data via a query, never read from a separately maintained admin record — they cannot drift from the Results Portal's own numbers this way. Stream descriptions come from the Academic Programs Admin Screen (Task 7.16).

### Task 8.16 — Administration Page

Build the administration page as a role-grouped view of the existing Staff Module data (Task 7.4): Principal, Vice Principals, Heads of Department, and the Board of Management, each via StaffCard. No new admin module — administrators are entered as staff like anyone else; this page is a filtered query over the Staff table, not a new content type.

### Task 8.17 — Extracurriculars Page

Build the extracurriculars page: sports teams and co-curricular activities (cricket, athletics, scouting, cadetting) via ExtracurricularCard, reading from the Extracurriculars Module (Task 7.17) — distinct from the Societies Hub (Task 8.5), which covers academic and interest clubs.

---

## Phase 9 — PWA and Offline Support

_Making the platform reliable on poor connections_

### Purpose

A significant proportion of the community accesses this platform on mobile devices over 3G connections in the Mathugama area. A service worker that caches key pages means the platform works even when the network does not.

### Task 9.1 — Implement Service Worker

Add `next-pwa` or a custom service worker configuration. Cache the shell (navigation, footer, CSS, fonts) on first load. Cache the home page and about page for offline access. Implement a network-first strategy for dynamic pages (news, events) with a cached fallback.

### Task 9.2 — Web App Manifest

Create `manifest.json` with the school name, icons in all required sizes, theme colour matching the design system, and display mode set to standalone. This enables "Add to Home Screen" on mobile devices — the platform appears as an app icon rather than a browser bookmark.

### Task 9.3 — Offline Page

Build a designed offline page that is cached by the service worker. When a user attempts to visit an uncached page without a network connection, they see this page rather than a browser error. The page explains the situation and shows links to the cached pages that are available.

---

## Phase 10 — SEO and Structured Data

_Making the platform discoverable_

### Purpose

The platform must rank for searches related to the school. Structured data tells search engines exactly what the content is, enabling rich results in Google Search.

### Task 10.1 — Metadata Architecture

Implement `generateMetadata` for every page type. The root layout provides baseline metadata (school name, description, Open Graph image). Each page type overrides with specific metadata: news articles include the headline, author, and publication date; events include the start date and location; staff profiles include the person's name and role. Every page must have a unique, descriptive title and a 150-character meta description.

### Task 10.1b — Programmatic Open Graph Image Generation

Generate Open Graph images programmatically per page using Next.js's image generation, rather than relying on one static fallback image for the whole site. A news article shared on WhatsApp or Facebook should show its own headline and cover photo in the preview, not a generic school crest. This matters specifically because WhatsApp is the dominant sharing channel for this community — a branded, content-specific preview image is the difference between a shared link that gets clicked and one that gets ignored.

### Task 10.2 — JSON-LD Structured Data

Implement JSON-LD schema markup for every relevant content type. The school itself gets an `EducationalOrganization`schema with official name, address, founding year, and social profiles. News articles get `NewsArticle` schema. Events get `Event` schema. Staff get `Person` schema. The results portal gets `WebApplication` schema. Correct structured data is what makes the school appear as a knowledge panel in Google Search results.

### Task 10.3 — Sitemap Generation

Implement `sitemap.ts` using Next.js conventions. The sitemap includes all static pages and all dynamic pages (every news article slug, every society slug, every gallery album). The sitemap is submitted to Google Search Console and Bing Webmaster Tools. When a news article or event is published from the admin panel, regenerate the sitemap and ping search engines immediately rather than waiting for the next crawl cycle — for a school where exam results, admissions deadlines, and event dates are time-sensitive, the gap between "published" and "indexed" matters.

### Task 10.4 — robots.txt

Create `robots.txt` that allows indexing of all public pages and disallows indexing of the admin panel, the API routes, and the results portal (individual result pages must not appear in search results — this would be a privacy violation).

### Task 10.5 — Performance Audit

Run Lighthouse on the home page, about page, and news page from a simulated mobile connection. The target is 90+ on Performance, Accessibility, Best Practices, and SEO on mobile. Common issues to fix: images without explicit dimensions causing layout shift, render-blocking resources, fonts loading before content, JavaScript bundles that are too large. Dynamic import the heaviest components (CrestAnimation, AudioPlayer, the rich text editor) to reduce the initial bundle. Configure `optimizePackageImports` in `next.config.js` for `@nexus/ui` and `framer-motion` so only the specific components actually imported are bundled, not the entire library — this compounds with the dynamic imports to keep the initial bundle small on the 3G connections common in the Mathugama area.

---

## Phase 11 — Infrastructure and Deployment

_Taking the platform from localhost to the internet_

### Purpose

Every technical decision made in the infrastructure phase affects the platform's reliability, cost, and maintainability for years. These decisions must be made deliberately, not improvised.

### Task 11.1 — Configure Cloudflare R2

Create the R2 bucket for media storage. Configure CORS to allow uploads from the admin panel domain. Set up a public access URL for serving media files. Update the Next.js image configuration to allow the R2 domain as an image source. R2 is chosen over S3 because it has no egress fees — serving images from R2 to the browser costs nothing beyond the storage fee.

### Task 11.2 — Write Dockerfiles

Write multi-stage Dockerfiles for both `apps/web` and `apps/admin`. Multi-stage builds produce small final images by discarding build tools from the production image. Each Dockerfile follows the same pattern: install dependencies, build the application, create a minimal runtime image with only the built output. The monorepo structure requires careful `COPY` commands to include the correct packages.

### Task 11.3 — Write Docker Compose

Write `docker-compose.yml` defining five services: `postgres` (the database, with a named volume for persistence), `nexus-web`(the public website), `nexus-admin` (the admin panel), `umami` (the self-hosted analytics backup — see ADR-007 and Task 11.3b), and `caddy` (the reverse proxy that handles HTTPS automatically via Let's Encrypt). Define environment variable references for secrets. Define health checks for each service so the compose orchestrator can restart an unhealthy container automatically. Define restart policies so services recover from crashes without manual intervention.

### Task 11.3b — Deploy Umami as a Self-Hosted Analytics Backup

Run Umami as its own Docker container on the same Hetzner server, with its own lightweight database table set (it can share the `postgres` instance with a separate schema, or run SQLite for simplicity at this traffic scale). Umami gives the school a second, independent view of site usage that does not depend on the platform's own custom collector (Task 7.11) being bug-free — if the custom dashboard ever shows numbers that look wrong, Umami is the cross-check. It runs entirely on school-controlled infrastructure, consistent with the platform's no-third-party-script analytics posture established in ADR-007.

### Task 11.4 — Provision the Hetzner Server

Create the Hetzner cloud server. Install Docker and Docker Compose. Configure the firewall to allow only ports 80, 443, and 22. Set up SSH key authentication and disable password authentication. Create a deployment user with minimal permissions. This is done manually once — subsequent deployments are automated.

### Task 11.5 — Configure DNS

Point `cwwkcc.lk` to the Hetzner server IP. Point `admin.cwwkcc.lk` to the same IP. Configure the Caddyfile to route each subdomain to the correct Docker service and provision TLS certificates automatically.

### Task 11.6 — Write GitHub Actions CI/CD Pipeline

Write `.github/workflows/ci.yml` that runs on every push: TypeScript typecheck, ESLint lint, dependency vulnerability scanning (Task 1.6b), and a production build of both apps. Write `.github/workflows/deploy.yml` that runs on push to `main`: builds Docker images, pushes to GitHub Container Registry, SSHes into the Hetzner server, pulls the new images, and restarts the services with zero-downtime deployment. Every deployment is automatic, auditable, and reversible.

### Task 11.6b — Continuous Performance Budgets via Lighthouse CI

Run Lighthouse CI as a step in `ci.yml` on every build, not just as a one-time manual check (Task 10.5 is the manual deep-dive; this is the automated guardrail). Fail the build if Performance, Accessibility, Best Practices, or SEO scores drop below 90 on mobile for the key pages (home, news article, results portal). This turns Task 10.5's one-time audit into an ongoing constraint — a future contributor cannot accidentally ship a bundle-size regression or a missing image dimension without the build telling them immediately.

### Task 11.7 — Configure Environment Variables

Create `.env.example` files for both apps documenting every required environment variable: database URL, NextAuth secret, R2 credentials, email service credentials, analytics configuration, and an optional `SENTRY_DSN`. Never commit real secrets to the repository. Configure GitHub repository secrets for the CI/CD pipeline. Configure environment variables on the Hetzner server.

### Task 11.7b — Configure Optional Sentry Error Tracking

Wire up Sentry in both applications, gated entirely behind the `SENTRY_DSN` environment variable — if it is unset, the platform runs exactly as it does today with no Sentry dependency at all. When set, unhandled errors in either app are reported with full context (session, request details, stack trace). This is optional rather than required infrastructure because the platform must remain fully functional without any external paid service, but it significantly shortens the time to diagnose a production bug once enabled.

### Task 11.8 — SSL and Security Headers

Verify TLS certificate provisioning. Configure security headers in Caddy: Strict-Transport-Security (HSTS), Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy. Security headers are not optional for a platform that handles student data.

---

## Phase 12 — Launch Preparation

_The final checks before going live_

### Purpose

A failed launch is significantly worse than a delayed launch. This phase exists to ensure the launch is not a failure.

### Task 12.0 — Build the End-to-End Test Suite

Write Playwright E2E tests covering the critical user journeys, run against a fully built version of the app rather than against individual components: looking up exam results, submitting the contact form, switching locale and confirming the page content actually changes, and navigating between the major sections of the site. Unit tests (Task 4.7) and integration tests (Task 6.10) catch problems in isolated code; this is the test suite that catches the problem only visible when a real user clicks through the real, deployed-shaped application. Run this suite in CI before every deployment and again here, manually, against the launch-candidate build, before any of the manual checks below.

### Task 12.1 — Content Population

Populate the database with real content before launch. This means: principal biography and portrait, full staff list with photos, 10 recent news articles with images, 5 upcoming events, all societies with logos and descriptions, at least 3 gallery albums, school statistics, alumni profiles. The site must not launch empty. An empty site signals abandonment, not freshness.

### Task 12.2 — Trilingual Content Verification

Verify that every page works correctly in all three languages. Check for: missing translation keys (which cause runtime errors), text overflow in Sinhala or Tamil that breaks the layout, untranslated strings appearing in the wrong locale, locale switcher working correctly on every page.

### Task 12.3 — Accessibility Audit

Conduct a full accessibility audit using both automated tools (Axe) and manual keyboard navigation testing. Every interactive element must be reachable by keyboard. Every image must have alt text. Every form must have properly associated labels. Colour contrast must meet WCAG AA at minimum. This is not optional — the platform serves a public institution and must be accessible to all members of the community.

### Task 12.4 — Security Review

Review the security posture of the platform: verify the admin panel is not accessible without authentication, verify the results portal has rate limiting, verify no sensitive data appears in API responses beyond what is required, verify database credentials are not in any committed file, verify the R2 bucket does not have public write access.

### Task 12.5 — Load Testing

Simulate peak load on the results portal — the day exam results are released, hundreds of parents and students will attempt to query results simultaneously. The rate limiting must hold. The database must not time out. The pages must load within 3 seconds on a mobile connection.

### Task 12.6 — Cross-Browser and Device Testing

Test the platform on: Chrome (Android), Safari (iOS), Chrome (desktop), Firefox (desktop), Samsung Internet. Test on both high-resolution and low-resolution screens. Test with slow network simulation. Fix every rendering issue found.

### Task 12.7 — Set Up Monitoring

Configure UptimeRobot to monitor the public site and admin panel every 5 minutes. Configure alerts to the developer's email and phone. Configure PostgreSQL backup jobs to run nightly and store to a separate R2 bucket. Verify backups are restorable before launch — a backup that has never been tested is not a backup.

### Task 12.8 — The Launch

Change DNS. Verify both applications are responding. Verify TLS is valid. Verify the database has content. Verify the results portal works. Monitor server logs for errors during the first 24 hours. The launch is not an event — it is the beginning of the platform's operational life.

---

## Phase 13 — Stabilisation

_Observing reality and fixing what the plan missed_

### Purpose

Launch is not completion. The first four to six weeks of real usage reveal issues that no amount of testing in development can predict: editor confusion, translation gaps, broken workflows, performance bottlenecks under real traffic, content that exists in the database but does not display as expected, and search queries that return no results. This phase exists to observe real usage and fix real problems before handing the platform to the school permanently.

### Task 13.1 — Collect Structured Feedback

Create a simple feedback collection mechanism — a form that admin users see when they log in, and a feedback button accessible to all site visitors. Collect separately: staff editor feedback (is the CMS usable?), student feedback (can they find what they need?), and parent feedback (does the results portal work?). Structured collection is more actionable than informal complaints.

### Task 13.2 — Review Analytics Data

After two weeks of live traffic, review the analytics dashboard. Questions to answer: which pages have high exit rates (users leave immediately — suggests the content is not what they expected), which search queries return no results (content gaps to fill), what is the results portal usage pattern (are there times of day when it gets heavy traffic that should trigger caching improvements), what is the mobile versus desktop split (may require layout adjustments), which locale is most used.

### Task 13.3 — Review Failed Searches

Export all search queries that returned zero results. These represent content the community is looking for that does not exist on the platform. Categorise them: some indicate missing content that should be created, some indicate missing search index coverage (a content type that exists but is not indexed), some indicate translation gaps (a query in Sinhala that would match an English-only article).

### Task 13.4 — Review Editor Workflows

Sit with at least two staff editors and watch them use the admin panel without guidance. Do not help them unless they are completely stuck. Observe where they hesitate, where they make mistakes, where they ask questions. Every point of confusion is a UX failure. Fix the admin panel to eliminate these failure points.

### Task 13.5 — Fix All Discovered Issues

Triage all discovered issues into: critical (fix within 24 hours — broken functionality, data display errors, accessibility failures), high (fix within one week — workflow confusion, performance issues, content gaps), and low (fix before handover — cosmetic issues, minor UX improvements). Do not proceed to handover until all critical and high issues are resolved.

### Task 13.6 — Performance Validation Under Real Load

Compare Lighthouse scores from the launch preparation phase against scores measured under real traffic conditions. Check database query performance using the PostgreSQL slow query log. Check if any page is slower than 3 seconds on a mobile connection in the Mathugama area. Fix all performance regressions.

### Task 13.7 — Trilingual Content Audit

Review the site in all three languages with a native speaker of Sinhala and a native speaker of Tamil. Identify: mistranslated strings, untranslated placeholder strings still showing in English, layout breaks caused by longer Sinhala or Tamil text, incorrect font rendering for any character. This audit requires native speakers — machine translation review is not sufficient.

---

## Phase 14 — Post-Launch and Handover

_Ensuring the platform outlasts its creator_

### Purpose

The highest risk to this platform is not a technical failure. It is developer graduation. This phase exists to ensure the platform can be maintained by the next KITS generation without losing institutional knowledge.

### Task 14.0 — Establish Content Governance

This task must happen before technical handover, because a perfect CMS with no assigned content owners produces a dead website within six months. Define, in writing, who owns each content type and what their responsibility is.

**News** — School administration and designated KITS editors. Responsibility: publish at minimum two articles per month. News must not go more than 30 days without an update.

**Events** — Society leaders (for society events) and class teachers (for academic events). Responsibility: create events at least two weeks before they occur. Past events are archived, not deleted.

**Gallery** — A designated school media unit or photography club. Responsibility: upload photos within one week of any significant school event.

**Results** — Authorised administrative staff only. No student or junior editor has access to the results module. Responsibility: upload results within 24 hours of official release.

**Digital Archive** — A history committee composed of senior teachers and the alumni association. Responsibility: ongoing digitisation and upload of historical materials. No deletion policy — archive content is permanent.

**Staff Profiles** — School administration. Responsibility: update whenever staff join or leave. The staff page must never show profiles of people who have left the school.

**Announcements** — School administration only. Responsibility: post announcements for any event that affects the whole school community. Expire announcements promptly after the relevant date passes.

Document this governance plan and get it signed by the principal before handover. Without a signed document, content ownership is informal and will collapse when key people leave.

### Task 14.0b — Disaster Recovery Plan

Document the recovery procedure for every failure mode. This document lives at `docs/operations/Disaster Recovery.md`. A platform is not production-ready until recovery procedures are written and tested.

**Server Failure** — The Hetzner server becomes unresponsive. Recovery: provision a new Hetzner server using the documented setup procedure, restore the latest database backup, pull Docker images from GitHub Container Registry, start services with Docker Compose. Estimated recovery time: 2–4 hours. To reduce this, consider keeping a snapshot of the configured server.

**Database Corruption** — The PostgreSQL database becomes corrupted or data is accidentally deleted. Recovery: stop the web and admin services, restore from the most recent nightly backup stored in R2, verify data integrity, restart services. Estimated data loss: up to 24 hours. To reduce this, implement hourly transaction log backups for the most critical tables (ExamResult, News, Staff).

**Accidental Content Deletion** — A staff editor deletes content that should not have been deleted. Recovery: the audit log records all deletions. The database backup from before the deletion can be queried to retrieve the deleted content. Content deletion in the admin panel should trigger a soft-delete (marking as archived) rather than a hard delete for this reason.

**Domain Transfer Emergency** — The `cwwkcc.lk` domain registration lapses or is transferred incorrectly. Recovery: the domain registrar credentials must be documented and stored securely with school administration, not only with the developer. DNS records must be documented. If the domain is lost, the recovery involves contacting the LK domain registry with proof of institutional ownership.

**GitHub Repository Loss** — The GitHub repository becomes inaccessible. Recovery: every developer who has cloned the repository has a full copy. The repository should be mirrored to a second location (a school-owned GitHub organisation). The final `repomix-output.xml` archived in the repository serves as a complete codebase snapshot.

**R2 Storage Failure** — Cloudflare R2 becomes unavailable. Recovery: media assets stored in R2 are also backed up to a separate storage provider nightly. The database stores R2 URLs — if the bucket URL changes, a database migration updates all references. The admin panel's media library shows which assets exist so nothing is lost silently.

**Recovery Testing** — Every recovery procedure must be tested before handover. A backup that has never been restored is not a backup. Schedule a recovery test: take the database offline, restore from backup, verify the site works. Document the result.

### Task 14.1 — User Training

Train 2–3 KITS members and at least 2 staff editors on the admin panel. Training must cover: publishing a news article from draft to published, uploading gallery photos, creating and updating events, using the media library, and understanding the audit log. Training must be recorded or documented step-by-step. Future staff must be able to train themselves from this documentation.

### Task 14.2 — Developer Knowledge Map

Update `docs/Developer Knowledge Map.md` with the final architecture overview, the deployment procedure, the database backup procedure, and the process for adding new content types. This document is addressed to the next developer, not the current one. Write it as if explaining to someone who has never seen the codebase. The ADRs in `docs/adr/` are the formal record of why each technology was chosen — the Knowledge Map references them rather than duplicating the reasoning.

### Task 14.3 — Runbook

Write an operational runbook at `docs/operations/Runbook.md` covering: how to deploy a change, how to roll back a bad deployment, how to restore from a database backup, how to add a new admin user, how to add a new language, how to debug a failing API route, how to renew a TLS certificate if automatic renewal fails, and how to scale the server if traffic grows. Every operation a future maintainer might need is documented step by step.

### Task 14.4 — Populate Legacy Content

Work with school administration to digitise and upload historical content: old prize-giving photographs, historical records, past alumni profiles, archived news from school magazines. This is a long-running task, not a single sprint. The digital archive grows over time.

### Task 14.5 — Alumni Outreach

Announce the alumni directory to former students through whatever channels the school has (WhatsApp groups, social media, notice boards at reunions). Seed the directory with 10–20 notable alumni profiles gathered before launch to demonstrate its value. An empty directory discourages submissions.

### Task 14.6 — Final Handover

Formally hand over the platform to the school: transfer DNS management, transfer hosting credentials, transfer R2 access, transfer GitHub repository ownership to the school's GitHub organisation, and transfer the domain registrar credentials to school administration. Provide the school with a printed copy of the runbook and the disaster recovery plan. Conduct a final demonstration with the principal showing the complete platform. The handover is not a moment — it is a transfer of responsibility, documented and signed by both parties.

---

## The Quality Standard

Every task in this roadmap should be completed to one standard: no future developer should be able to look at the output and say "this could have been done better if they had done it this way." That means:

Every component has correct TypeScript types. Every page has metadata. Every image has alt text. Every form validates on both client and server. Every database operation is wrapped in error handling. Every API route is authenticated where required. Every deployment is automated. Every secret is in environment variables. Every decision is documented.

This is not perfectionism for its own sake. It is the baseline quality required for a platform that will be maintained by multiple developers over many years without the original author present to explain decisions.

---

## Current Status

| Phase                                        | Status                                            |
| :------------------------------------------- | :------------------------------------------------ |
| Phase 0 — Concept and Planning               | Complete                                          |
| Phase 1 — Repository and Monorepo Foundation |                                                   |
| Phase 2 — Design System Foundation           |                                                   |
| Phase 3 — Component Library                  | 🔄 In Progress — see note below                   |
| Phase 4 — Architecture Hardening             | 🔄 In Progress                                    |
| Phase 5 — Principal Presentation             | ⏳ Pending                                         |
| Phase 6 — Database and Backend               | ⏳ Pending                                         |
| Phase 7 — Admin Panel                        | ⏳ Pending                                         |
| Phase 8 — Public Pages                       | 🔄 Partially Complete (About done, others mocked) |
| Phase 9 — PWA and Offline Support            | ⏳ Pending                                         |
| Phase 10 — SEO and Structured Data           | ⏳ Pending                                         |
| Phase 11 — Infrastructure and Deployment     | ⏳ Pending                                         |
| Phase 12 — Launch Preparation                | ⏳ Pending                                         |
| Phase 13 — Stabilisation                     | ⏳ Pending                                         |
| Phase 14 — Post-Launch and Handover          | ⏳ Pending                                         |

**Note on Phase 3:** this phase previously read "~95% Complete" against 13 tasks. Aligning the roadmap to the Feature Registry added 8 new component-group tasks (Icon Registry, Overlay, Navigation, Media, Section, Typography, and Utility Components, plus the AmbientEmbers effect) that were not previously broken out as their own line items, so that percentage no longer reflects the phase's true scope. Re-audit Phase 3 against the 21 tasks now listed and update this line with an accurate figure before relying on it again.

---

## Document History

**This revision** introduces ADR-009 (Page Content Architecture) and adds the Page Content system: Task 6.5b creates the `PageContent` table, Zod schemas, `pageContentRouter`, and the one-time migration from static message files; Task 7.10b adds the corresponding admin module. Rewrote Task 8.2 and Task 8.7 to source editorial content from `PageContent` instead of static message strings. `messages/` is now scoped to interface chrome only (`navigation.json`, `common.json`, and embedded form/taxonomy labels elsewhere) — see Feature Registry F-070, F-174–F-176.

aligns the roadmap to the F-164–F-173 patch and the Google Workspace OAuth decision. Changes made: rewrote Task 6.3 to use Google OAuth restricted to `@cwwkcc.lk` with invite-based access instead of Credentials/bcrypt as the primary path; added Task 6.3b for the break-glass admin account and its TOTP requirement; added four routers (academics, extracurriculars, facilities, archive) to Task 6.4's tRPC router list; removed the password-reset reference from Task 7.12 (Google-authenticated admins have no password to reset); added Tasks 7.16–7.21 for six admin modules (Academic Programs, Extracurriculars, Alumni, Achievement, Digital Archive, Facilities) that had Feature Registry entries but no roadmap task; resolved Task 8.6’s hedge between "settings or a dedicated facilities module" now that Task 7.21 exists; added Tasks 8.15–8.17 for three public pages (Academics, Administration, Extracurriculars) whose routes already existed in Page Specifications.md with no corresponding build task.

**Previous revision** aligns the roadmap to `Feature Registry.md` (163 features) as the now-authoritative feature scope. Changes made: added Nx orchestration (Task 1.1) and dependency vulnerability scanning (Task 1.6b); added the Design System documentation set (Task 2.8b); expanded Phase 3 from 13 to 21 tasks to cover all 20 component groups in the registry (Icon Registry, Overlay, Navigation, Media, Section, Typography, and Utility Components, AmbientEmbers); added section-level error boundaries to Task 4.2; added unit testing infrastructure (Task 4.7) and a translation workflow document (Task 4.6b); added platform-wide rate limiting (Task 6.4b), database hardening covering soft-deletes/connection pooling/cleanup jobs (Task 6.9), and API integration tests (Task 6.10); added programmatic OG images and sitemap-ping-on-publish to Phase 10; resolved a direct contradiction in ADR-007 and Task 11.3 — the roadmap previously rejected Umami as an analytics alternative while the registry now includes it as a self-hosted backup, so ADR-007 and the Docker Compose service list (four services → five) were rewritten to match; added optional Sentry error tracking (Task 11.7b) and continuous Lighthouse CI (Task 11.6b); added the end-to-end test suite (Task 12.0), closing the gap where unit, integration, and E2E testing — all present in the registry — previously had no home anywhere in this document.

---

_C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."_ _Nexus Platform — Kannangara ICT Society (KITS)_