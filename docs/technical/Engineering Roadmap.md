# Nexus — The Complete Engineering Roadmap

## A Timeless Guide for Future Generations

**C.W.W. Kannangara Central College Digital Platform**

**Kannangara ICT Society (KITS) · Mathugama**

---

## Introduction

This roadmap is written for someone who has just conceived the idea of building Nexus — or for a future KITS member who inherits the project years from now. It assumes nothing is built, nothing is approved, and nothing is collected. It starts from the very beginning.

It is designed to be **timeless**. The order of tasks is the order they should always be done, regardless of when you start. Follow it step by step, and you will build a platform that lasts.

---

## What Nexus Is NOT

Before reading this roadmap, this boundary must be understood. Future developers and school administrators will eventually ask whether Nexus can be extended to handle attendance, timetables, student records, fees, or examinations. The answer is no, and the reason is architectural, not laziness.

Nexus is an **institutional public platform**. It serves students, parents, alumni, and the wider community through a public website and a content management system operated by school staff.

Nexus is not, and will never become:

- A **Student Information System** — student records, grades, attendance, and personal data belong in dedicated SIS software with appropriate security and regulatory compliance.
- A **Learning Management System** — assignment submission, online lessons, and course management belong in dedicated LMS platforms.
- An **Attendance Platform** — daily attendance tracking is an operational school management function, not a public communications function.
- A **Financial Management System** — fees, payroll, and procurement are entirely outside scope.
- An **Examination Management System** — internal exam scheduling and marking are separate from the results portal, which only publishes final results.
- A **Communication Platform** — Nexus publishes announcements to the public. Internal staff communication, parent-teacher messaging, and student notifications belong in dedicated tools.

Every time a new feature is proposed, ask: is this about communicating the school to the world, or managing the school internally? If it is the latter, it does not belong in Nexus.

This boundary is what keeps the platform maintainable by a small team of students over many years.

---

## How to Read This Document

Every phase has a clear purpose, a list of tasks, and a reason for each task. The order is not arbitrary. Each phase creates the foundation the next phase stands on. Skipping ahead creates rework.

The principle throughout is simple: **build the rules before building the containers, build the containers before filling them with content, fill them with content before showing the world.**

This document covers the full journey from the very beginning so that any future developer — or any auditor of the work — can understand every decision made.

This roadmap defines the build order. **`Feature Registry.md` defines the build scope** — it is the single authoritative, numbered list (F-001 through F-196; F-195 and F-196 are appended past F-194 rather than renumbering, per that document's stable-number rule) of every feature Nexus will include. Nothing is built that isn't listed there. The two documents must stay in sync: every task below exists to build one or more registry features, and every registry feature has a home in one of the phases below. When the two disagree, the Feature Registry wins and this document is updated to match.

---

## Phase 0 — Concept and Planning

_Before writing a single line of code_

### Purpose

Establish what is being built, why it is being built, and what success looks like. This phase exists entirely on paper.

### Task 0.1 — Define the Mission

Articulate in one paragraph what Nexus is. Not a list of features. A mission statement. The answer is: Nexus is the permanent digital institution of C.W.W. Kannangara Central College — not a brochure, not a marketing site, but a living platform that serves students, parents, staff, alumni, and the wider community for decades. This mission statement drives every architectural decision that follows.

### Task 0.2 — Establish the Scope Inventory

List every page and module the final platform will contain. Do this before touching technology. For Nexus this means defining:

- All public pages: Home, About, News, Events, Societies, Facilities, Admissions, Contact, Gallery, Archive, Alumni Directory
- All admin modules: News CMS, Staff CMS, Events CMS, Societies CMS, Media library, ContentEntry editor, Analytics, User management, Audit log
- All supporting infrastructure: Authentication, Search, Notifications, Analytics, Asset storage, CI/CD

Completing this prevents scope creep and scope blindness in equal measure.

### Task 0.3 — Design the Information Architecture

Map the relationships between pages. What links to what. What the navigation hierarchy is. What the URL structure will be. For a trilingual site this means deciding the locale routing pattern early — the decision to use `/en/about`, `/si/about`, `/ta/about` must be made before the framework is chosen, because it affects the entire routing architecture.

### Task 0.4 — Identify the Technology Stack

Choose the technology stack with reasons, not trends. For Nexus the decisions are:

- **Next.js App Router** for the public site and admin panel — because it provides server components, excellent i18n support, and static generation
- **pnpm workspaces** for the monorepo — because it is faster than npm and provides excellent workspace linking
- **PostgreSQL** for the database — because it is battle-tested, handles JSON well for content, and has excellent full-text search including support for Sinhala
- **Prisma** as the ORM — because it generates type-safe clients from the schema
- **tRPC** for the API layer — because it eliminates the need for a separate API spec and provides end-to-end type safety
- **Zod** for validation — because the same schema validates forms, API inputs, and database outputs
- **Tailwind CSS** for styling — because utility-first scales better in a component library than CSS modules
- **Framer Motion and GSAP** for animation — because it handles complex institutional animations declaratively
- **next-intl** for internationalisation — because it integrates deeply with the App Router

### Task 0.5 — Write the Project Proposal

Write the formal proposal document for the school principal. This document must answer five questions:

1. What are we building?
2. Why does the school need it?
3. How does it compare to what schools currently have?
4. What will it cost?
5. Who will maintain it after completion?

The proposal should include a cost comparison in LKR, a visual mockup or design reference, and a timeline. The goal is not to impress with technical depth but to communicate institutional value clearly.

### Task 0.6 — Secure Initial Approval

Present the proposal to the principal. This approval is not the final launch approval — it is approval to begin work. Without this, all subsequent work is at risk of being rejected. The framing should be: "We are asking for permission to build, not permission to launch."

### Task 0.7 — Create Architecture Decision Records

Create `docs/adr/` in the repository. Write an ADR for every significant technology choice. Each ADR follows the same structure:

- **Context**: What situation forced this decision
- **Decision**: What was chosen
- **Alternatives Considered**: What else was evaluated and why it was not chosen
- **Consequences**: What this decision means going forward

ADRs are written once and never edited — if a decision is reversed, a new ADR is written explaining the reversal. This is how the reasoning behind the architecture survives developer turnover.

The initial ADRs to write:

| ADR     | Topic                          | Why It Matters                                     |
| ------- | ------------------------------ | -------------------------------------------------- |
| ADR-001 | Monorepo Architecture          | Why pnpm workspaces over separate repos            |
| ADR-002 | Next.js App Router             | Why Next.js over alternatives                      |
| ADR-003 | PostgreSQL Selection           | Why PostgreSQL over other databases                |
| ADR-004 | tRPC Selection                 | Why tRPC over REST or GraphQL                      |
| ADR-005 | Zod Validation Strategy        | Why Zod as the single source of truth              |
| ADR-006 | R2 Storage Selection           | Why Cloudflare R2 over S3                          |
| ADR-007 | Analytics Strategy             | Why custom analytics + Umami                       |
| ADR-008 | Multilingual Font Architecture | Why CSS variable stacking over per-component fonts |
| ADR-009 | Page Content Architecture      | Why database-backed content over static i18n files |

---

## Phase 1 — Repository and Monorepo Foundation

_Setting up the codebase infrastructure_

### Purpose

Create the technical foundation that every subsequent piece of work will live in. A bad foundation here means painful refactoring later. A good foundation here means every future developer can orient themselves in minutes.

### Task 1.1 — Initialise the pnpm Monorepo with Nx Orchestration

Create the root repository with pnpm workspaces. Define the workspace structure:

```
nexus/
├── apps/
│   ├── web/          # Public website
│   └── admin/        # Admin panel
├── packages/
│   ├── ui/           # Shared component library
│   ├── config/       # Design tokens and Tailwind preset
│   ├── validation/   # Zod schemas
│   ├── database/     # Prisma client and schema
│   └── api/          # tRPC router definitions
├── docs/
│   ├── adr/          # Architecture Decision Records
│   ├── design-system/ # Design documentation
│   └── operations/   # Runbook and disaster recovery
└── docker-compose.yml
```

This separation is not cosmetic — it enforces the boundary between things that deploy and things that are consumed.

Layer Nx on top of the pnpm workspace for task orchestration: Nx provides task caching for build, lint, and typecheck commands, and `nx affected` commands so a change in one package only rebuilds and retests what actually depends on it.

### Task 1.2 — Configure Root TypeScript

Create `tsconfig.base.json` at the root with shared compiler options:

- `strict: true` — maximum type safety
- `moduleResolution: "bundler"` — for Next.js compatibility
- Path aliases for every package: `@nexus/ui`, `@nexus/config`, `@nexus/contracts`, `@nexus/db`, `@nexus/api`
- `noImplicitReturns`, `noUnusedLocals`, `noUnusedParameters`

Every package and application extends this base. This ensures consistent TypeScript behaviour across the entire monorepo.

### Task 1.3 — Create Both Next.js Applications

Scaffold `apps/web` and `apps/admin` as Next.js App Router projects. Configure both to use the shared TypeScript base. This is done together because the shared configuration decisions — path aliases, Tailwind setup, ESLint rules — are made once and applied to both.

### Task 1.4 — Configure ESLint and Code Standards

Set up a shared ESLint configuration. The rules that matter most are:

- No unused variables
- No implicit any
- Consistent import ordering
- No console statements in production

These are not pedantic rules — they are the difference between a codebase that degrades gracefully and one that accumulates silent errors.

### Task 1.5 — Configure pnpm-lock and Dependency Strategy

Commit `pnpm-lock.yaml` from the start. Decide the dependency placement strategy:

- Shared dependencies (React, TypeScript) at the root
- Package-specific dependencies in each package
- No dev dependencies accidentally placed in dependencies

The `clsx`, `tailwind-merge`, and `framer-motion` packages belong in `dependencies` in `packages/ui`, not `devDependencies`, because they are runtime requirements of the component library.

### Task 1.6 — Configure Dependency Vulnerability Scanning

Add `pnpm audit` as a required step in the CI pipeline, running on every push. Any high-severity vulnerability in a third-party dependency fails the build. A monorepo with this many dependencies will accumulate vulnerable versions over its lifespan if nothing is watching for them.

### Task 1.7 — Write the Documentation Skeleton

Create the documentation directory structure:

```
docs/
├── adr/                      # Architecture Decision Records
├── design-system/
│   ├── Foundations.md
│   ├── Tokens Reference.md
│   ├── Page Specifications.md
│   └── Component Reference.md
├── operations/
│   ├── Runbook.md
│   └── Disaster Recovery.md
├── governance/
│   └── Content Governance.md
└── i18n/
    └── Translation Workflow.md
```

Write placeholder files for each. The complete content will be filled as each phase is completed.

---

## Phase 2 — Design System Foundation

_Building the visual language of the institution_

### Purpose

Establish the complete design token system before building any component. Tokens are the rules. Components consume the rules. If the rules are wrong, every component built from them is wrong.

### Task 2.1 — Define the Color System

Establish the full color palette:

| Category     | Tokens                                           |
| ------------ | ------------------------------------------------ |
| **Core**     | Forest green, gold, warm cream                   |
| **Surfaces** | Base, default, deep, elevated, inverse           |
| **Text**     | Primary, muted, inverse, link                    |
| **Semantic** | Success, error, warning, info (base + surface)   |
| **Glass**    | Light, medium (opacity-only, no backdrop-filter) |
| **Overlay**  | Light, medium, heavy                             |
| **States**   | Hover, active, disabled                          |

Every color must exist as a named token. No hardcoded hex values anywhere in the codebase after this point.

### Task 2.2 — Define the Typography System

Choose the typefaces and lock the font stack:

| Script  | Display Font       | Body Font          | Quote Font        |
| ------- | ------------------ | ------------------ | ----------------- |
| English | Cormorant Garamond | Inter              | Cormorant Upright |
| Sinhala | Maname             | Noto Serif Sinhala | Maname            |
| Tamil   | Noto Serif Tamil   | Noto Serif Tamil   | Noto Serif Tamil  |

Define the complete type scale from display size down to caption. Define line heights, letter spacing, and font weights for each scale step.

The critical architectural decision here is the unified multilingual font stack: rather than using separate CSS classes for each script, compose a single logical font family using CSS variable stacking so the browser automatically selects the correct face based on character unicode range.

### Task 2.3 — Define the Spacing and Sizing System

Establish a consistent spacing scale based on a 4px unit. Every margin, padding, gap, and dimension in the entire platform must come from this scale. Arbitrary pixel values create visual inconsistency that users perceive even if they cannot articulate it.

### Task 2.4 — Define the Motion System

Define animation tokens:

| Category       | Tokens                                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Durations**  | instant (80ms), fast (150ms), standard (300ms), gentle (500ms), slow (800ms), ceremonial (1200ms), epic (2400ms) |
| **Easings**    | snap, out, in-out, ceremonial, ember                                                                             |
| **Transforms** | scale-press (0.98), scale-card-hover (1.02)                                                                      |

The institutional character of the site requires that animations feel deliberate and dignified — not playful, not instant.

### Task 2.5 — Define the Glass and Shadow System

The visual identity of Nexus is built on the glass morphism treatment — a dark forest green base with translucent layered surfaces.

| Token                  | Value                        | Usage                 |
| ---------------------- | ---------------------------- | --------------------- |
| `glass-surface-light`  | `rgba(255,255,255,0.85)`     | Light floating panels |
| `glass-surface-medium` | `rgba(255,255,255,0.7)`      | Medium translucency   |
| `glass-border`         | `border-light` + `border-sm` | Glass panel border    |
| `glass-shadow`         | `shadow-elevation-2`         | Glass panel shadow    |

**Important:** Glass never uses `backdrop-filter`. Glass is achieved through opacity and shadows only.

### Task 2.6 — Define Shadow Elevations

| Token                | Value                             | Usage                 |
| -------------------- | --------------------------------- | --------------------- |
| `shadow-elevation-1` | `0 2px 4px rgba(28,26,22,0.08)`   | Buttons, chips        |
| `shadow-elevation-2` | `0 8px 20px rgba(28,26,22,0.12)`  | Cards                 |
| `shadow-elevation-3` | `0 16px 40px rgba(28,26,22,0.15)` | Modals, dropdowns     |
| `shadow-elevation-5` | `0 32px 80px rgba(28,26,22,0.22)` | Hero glass containers |

### Task 2.7 — Build the Token Generator

Create the script in `packages/config/scripts/` that reads the token definitions and generates `tokens.css` — a single CSS file containing every token as a CSS custom property. This generated file is imported once in each app's `global.css`.

This means tokens are defined in TypeScript (type-safe, easy to audit) and consumed in CSS (fast, no JavaScript runtime cost).

### Task 2.8 — Configure the Tailwind Preset

Create `nexusPreset` in `packages/config` that maps every token into Tailwind's theme. This gives every developer access to the full token system through Tailwind utility classes. The preset is imported by both `apps/web` and `apps/admin` — one source of truth for the entire visual language.

### Task 2.9 — Build the Design System Viewer in Admin

Create the design system documentation pages in `apps/admin/src/app/design-system/`. Cover every token category:

- Colors
- Typography (show all three scripts rendering correctly)
- Spacing
- Shadows
- Motion
- Glass
- Focus rings
- Z-index
- Blur
- Sizing
- Aspect ratios
- Opacity

This serves two purposes: it is a reference for developers, and it is a demonstration tool for the principal presentation. The public website does not ship these pages.

### Task 2.10 — Self-Host All Fonts

Download all font files and host them locally in the `apps/web/public/fonts/` and `apps/admin/public/fonts/` directories:

- Maname (Sinhala display)
- Noto Serif Sinhala (Sinhala body)
- Noto Serif Tamil (Tamil body and display)
- Cormorant Garamond (English display)
- Inter (English body)
- IBM Plex Mono (code)

Configure `next/font` with the `local` source so fonts are served from the same domain, not from Google Fonts CDN. This ensures the site remains functional and fast even when external CDNs are blocked or slow.

### Task 2.11 — Write the Design System Documentation Set

The in-app viewer (Task 2.9) is interactive but lives behind admin authentication. Alongside it, write the durable, version-controlled documentation set in `docs/Design System/`:

- **Foundations.md** — Design principles, color, typography, spacing, motion in prose
- **Tokens Reference.md** — Every token name and value in a static table
- **Page Specifications.md** — Every page's sections, the components each section uses, and where its data comes from
- **Component Reference.md** — Every component's props and usage

A developer who has never opened the admin panel should still be able to understand the entire visual system from these four files alone.

---

## Phase 3 — Component Library

_Building the UI building blocks_

### Purpose

Build every reusable component before building any page. Pages are compositions of components. Building pages before components means building components inside pages, which leads to duplication and inconsistency.

### Task 3.1 — Establish the Component Architecture

Define the component categorisation:

| Category            | Components                                               | Why Separate                               |
| ------------------- | -------------------------------------------------------- | ------------------------------------------ |
| **Atoms**           | Button, Badge, Avatar, Tag                               | Smallest units — everything builds on them |
| **Spinners**        | BeatLoader, ScaleLoader, BarLoader                       | Loading states, distinct from other UI     |
| **Forms**           | Input, Select, Textarea, Checkbox, Toggle, FileUpload    | Complex state management, validation       |
| **Cards**           | NewsCard, StaffCard, EventCard, SocietyCard              | Primary content containers                 |
| **Layout**          | Container, Grid, Hero, Navigation, Footer                | Structural components                      |
| **Brand**           | CrestAnimation, CrestDiagram, SchoolLogo                 | Institutional identity — special treatment |
| **Social Icons**    | Facebook, Instagram, LinkedIn, YouTube, WhatsApp, GitHub | Brand-specific icons                       |
| **Icon Registry**   | `<Icon name="..." />`                                    | Unified icon API over Lucide               |
| **Visualization**   | DataTable, ComparisonBar                                 | Data-heavy components                      |
| **Page States**     | LoadingScreen, ErrorState, EmptyState, NotFound          | Full-page states                           |
| **Notifications**   | Alert, Toast, AnnouncementBanner                         | Time-sensitive messaging                   |
| **Overlays**        | Modal, Drawer, DropDownMenu, ShareSheet, ToolTip         | Focus-trapping, scroll-locking             |
| **Navigation**      | Accordion, Breadcrumb, FilterBar, Pagination, Tabs       | Wayfinding components                      |
| **Media**           | AudioPlayer, Lightbox, MapEmbed, VideoFrame              | Rich media handling                        |
| **Sections**        | StatsStrip, PrincipalMessage, Timeline                   | Composite page blocks                      |
| **Typography**      | Heading, Text, QuoteBlock, RichTextRenderer              | Consistent text styling                    |
| **Utilities**       | BackToTopButton, CountdownTimer, ScrollProgressBar       | Quality-of-life additions                  |
| **Ambient Effects** | AmbientEmbers                                            | Atmospheric, performance-sensitive         |
| **Hooks**           | useCountUp, useInView, useActiveSection                  | Shared logic                               |
| **cn Utility**      | clsx + tailwind-merge                                    | Conditional class names                    |

### Task 3.2 — Build Atoms First

Build the smallest components first because everything else depends on them:

- Button, ButtonLink
- Badge
- Avatar
- Tag
- InlineHelpText

Each component must have:

- TypeScript props interface
- Proper accessibility attributes (aria labels, roles, keyboard navigation)
- Design token usage only (no hardcoded values)
- All variants from the design system

### Task 3.3 — Build Form Components

Build the complete form component set:

- Input, Select, Textarea
- Checkbox, Radio, Toggle, Slider
- FileUploadZone
- Calendar
- FormFieldGroup, FormErrorMessage, FormValidationSummary
- RequirementsChecklist
- ProgressIndicator

These are used in both the public contact form and the entire admin panel. Building them once in `packages/ui` means the admin panel gets the same design quality as the public site.

### Task 3.4 — Build Card Components

Build every card variant the platform needs:

| Component                | Variants                    |
| ------------------------ | --------------------------- |
| NewsCard                 | standard, compact, featured |
| StaffCard                | principal, grid, compact    |
| EventCard                | standard, compact, featured |
| SocietyCard              | hub-grid, featured          |
| SocietyBanner            | —                           |
| FacilityCard             | standard, schedule          |
| GalleryAlbumCard         | —                           |
| AchievementCard          | ticker-item, archive-post   |
| ExtracurricularCard      | —                           |
| AcademicStreamCard       | —                           |
| StatCard                 | —                           |
| DownloadableDocumentItem | —                           |

Cards are the primary display format for database content on the public site.

### Task 3.5 — Build Layout Components

Build the structural components:

- Container (with content width constraints)
- Grid (responsive, with column definitions)
- Hero (with background, overlay, and content slots)
- Navigation (with mobile menu, locale switcher, scroll behaviour)
- Footer (with identity strip, links, social icons)
- Stack (VStack, HStack)
- MasonryGrid
- QuickAccessPortal

Navigation and Footer are particularly important because they appear on every page and encode the school's identity.

### Task 3.6 — Build the Brand Icon System

Build the institutional brand icons as React SVG components:

- **CrestAnimation** — Hero variant with entrance animation; loading variant for transitions. The defining visual of the platform.
- **CrestDiagram** — Interactive explainer with labelled parts (Lamp, Lotus, Dharmachakra, Laurel)
- **SchoolLogo** — Multiple variants: crest-only, wordmark-only, lockup, horizontal, stacked

These must be built from the official SVG artwork, not approximated. The crest animation must feel institutional: a single deliberate sweep, settled — not decorative or playful.

### Task 3.7 — Build the Social Media Icon System

Build social media icons as React SVG components from official brand kits:

| Platform  | Variants                                    |
| --------- | ------------------------------------------- |
| Facebook  | color, white                                |
| Instagram | glyph gradient, glyph black, glyph white    |
| LinkedIn  | black, color, inline color, white           |
| YouTube   | black, color, inline variants, white        |
| WhatsApp  | glyph black, green, white; stacked variants |
| GitHub    | Invertocat and lockup variants              |

Never use icon fonts or third-party libraries for brand icons — use official SVG brand kits.

### Task 3.8 — Build the Icon Registry System

Build `Icon.tsx` and `registry.ts` as a unified icon API sitting on top of Lucide. Every place in the codebase that needs a generic icon (search, chevron, calendar, close) uses `<Icon name="search" />` rather than importing directly from `lucide-react`.

Benefits:

- Single registry means the icon set can be extended or swapped in one place
- No hunting down scattered imports across both apps
- Type-safe with autocomplete

### Task 3.9 — Build Visualization Components

Build the data display components:

| Component             | Purpose                                 |
| --------------------- | --------------------------------------- |
| DataTable             | Sortable, paginated table               |
| ComparisonBar         | Stream comparison (side-by-side)        |
| ProgressArc           | Circular progress for performance stats |
| StudentJourneyFlow    | Interactive Grade 10 → 11 → A/L flow    |
| StreamComparisonTable | Side-by-side stream comparison          |
| TimetableGrid         | Weekly timetable display                |
| ProcessSteps          | Numbered step sequence                  |

These serve the academic and institutional data needs of the platform.

### Task 3.10 — Build Page State Components

Build the full-page state components:

| Component           | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| LoadingScreen       | Full-page loading with CrestAnimation           |
| LoadingSkeleton     | Content placeholders (card, table-row, section) |
| ErrorState          | Inline and section variants with retry          |
| EmptyState          | "No content yet" with next action               |
| NotFound            | 404 page with institutional treatment           |
| OfflineBanner       | Connectivity lost notification                  |
| CookieConsentBanner | GDPR-compliant consent banner                   |

Every possible application state must have a designed response — a user should never see a blank white screen or an unhandled browser error.

### Task 3.11 — Build Notification Components

| Component          | Purpose                                                |
| ------------------ | ------------------------------------------------------ |
| Alert              | Inline messaging (info/success/warning/error)          |
| Toast              | Transient feedback (appears and disappears)            |
| AnnouncementBanner | Urgent school-wide communications at top of every page |

The AnnouncementBanner is how the school publishes urgent information — exam dates, closures — to all visitors.

### Task 3.12 — Build Overlay Components

| Component    | Purpose                       | Accessibility Requirements               |
| ------------ | ----------------------------- | ---------------------------------------- |
| Modal        | Focus-trapped dialog          | Focus trap, Escape to close, aria-modal  |
| Drawer       | Side panel overlay            | Focus trap, Escape to close, scroll lock |
| DropDownMenu | Contextual dropdown           | Keyboard navigation, Escape to close     |
| ShareSheet   | Share panel with social links | Focus management, Escape to close        |
| ToolTip      | Hover/focus tooltip           | ARIA-describedby, keyboard dismiss       |

Every one of these must handle focus trapping, keyboard navigation, and scroll locking correctly. These are the components most likely to break accessibility if built carelessly.

### Task 3.13 — Build Navigation Components

| Component        | Purpose                                  |
| ---------------- | ---------------------------------------- |
| Accordion        | Expand/collapse for FAQs                 |
| Breadcrumb       | Hierarchical page path                   |
| FilterBar        | Horizontal pill/tab filter row           |
| LanguageSwitcher | EN / සිං / தமி locale toggle             |
| MobileMenu       | Full-screen mobile nav overlay           |
| NavLink          | Internal/external link with active state |
| Pagination       | Page number controls with ellipsis       |
| SearchInput      | Search bar with icon and placeholder     |
| TableOfContents  | Sticky in-page section jump links        |
| Tabs             | Horizontal tab group (line/pills)        |

These work correctly in all three languages and across all device sizes.

### Task 3.14 — Build Media Components

| Component               | Purpose                                  |
| ----------------------- | ---------------------------------------- |
| AudioPlayer             | School anthem with visualiser and lyrics |
| Caption                 | Image/video caption with credit          |
| ImageFrame              | Aspect-ratio-enforced image container    |
| Lightbox                | Full-screen gallery viewer               |
| MapEmbed                | Google Maps / OpenStreetMap embed        |
| PanoramicFacilityViewer | 360° draggable campus viewer             |
| VideoFrame              | YouTube/Vimeo embed with aspect ratio    |

These handle every rich media type the platform needs with consistent design treatment.

### Task 3.15 — Build Section Components

Build the larger composite sections:

| Component                  | Used On                             |
| -------------------------- | ----------------------------------- |
| AchievementTicker          | Home (auto-scrolling achievements)  |
| AdmissionsKeyDatesTimeline | Admissions (vertical timeline)      |
| AdmissionsProcessSteps     | Admissions (step sequence)          |
| AlumniLegacyBlock          | About, Home (notable alumni)        |
| LifeAtKCCPhotoStrip        | Home (horizontal scrollable photos) |
| PrincipalMessage           | Home (principal portrait + quote)   |
| SectionSlider              | Various (carousel wrapper)          |
| StatsStrip                 | Home, About (auto-counting stats)   |
| Timeline                   | About (historical milestones)       |

These sit one level above cards and layout primitives — each one is a self-contained block that a page composes rather than a piece a page assembles from smaller parts.

### Task 3.16 — Build Typography Components

| Component        | Purpose                                    |
| ---------------- | ------------------------------------------ |
| EyebrowLabel     | All-caps label above headings              |
| Heading          | h1–h6 mapped to design tokens              |
| InlineLink       | Styled anchor for body copy                |
| QuoteBlock       | Styled blockquote (pull-quote, ceremonial) |
| RichTextRenderer | Renders Tiptap JSON with tokens            |
| SectionHeader    | Eyebrow + Heading + subtitle combo         |
| Text             | Body copy, captions, labels                |

These enforce consistent typographic treatment across the entire platform — a developer never hardcodes a font size or picks a heading level arbitrarily.

### Task 3.17 — Build Utility Components

| Component         | Purpose                          |
| ----------------- | -------------------------------- |
| BackToTopButton   | Floating scroll-to-top           |
| CountdownTimer    | Live countdown to event/deadline |
| ScrollProgressBar | Thin page-top progress bar       |

Small quality-of-life additions that add polish to the public experience.

### Task 3.18 — Build the AmbientEmbers Effect

Build a subtle particle effect used in specific hero contexts. Reinforces the `ember` motion token aesthetic — the living warmth of an institution, not a visual gimmick. This is the one component in the library that exists purely for atmosphere; it must be implemented carefully enough that it never affects Lighthouse performance scores.

### Task 3.19 — Build Hooks and the cn Utility

Build the shared hooks:

| Hook                 | Purpose                                               |
| -------------------- | ----------------------------------------------------- |
| `useCountUp`         | Animated number counting for statistics               |
| `useInView`          | Intersection observer for scroll-triggered animations |
| `useActiveSection`   | Scroll tracking for navigation highlighting           |
| `useScrollDirection` | Show/hide navigation bar                              |
| `useMediaQuery`      | Reactive CSS media query matcher                      |
| `useLocalStorage`    | Persistent state via localStorage                     |
| `useFormField`       | Generates IDs and described-by attributes             |

Build the `cn` utility (clsx + tailwind-merge combination) — used in virtually every component to allow conditional class names without Tailwind conflicts.

### Task 3.20 — Build Spinners and Loading States

Build BeatLoader, ScaleLoader, BarLoader with Framer Motion. Animated loading states make the platform feel alive and intentional during data fetching.

### Task 3.21 — Audit the Component Library

Before moving to pages, audit every component against four criteria:

1. Does it use design tokens exclusively (no hardcoded values)?
2. Does it have correct TypeScript types?
3. Does it have correct ARIA attributes?
4. Does it handle all its loading/error/empty states?

Fix every failure. This audit is the quality gate between the component library phase and the page-building phase.

---

## Phase 4 — Architecture Hardening

_Making the foundation production-grade_

### Purpose

Before connecting the database and building the admin panel, the codebase must be hardened against the categories of failure that affect real production systems.

### Task 4.1 — Create packages/contracts

Create the Zod schema package (named `contracts`, not `validation` — it holds more than validation logic; it's the single source of truth for every data shape in the system, including inferred TypeScript types via `z.infer<>`, no separate interface files).

Seed it with what's needed immediately — the primitives every later schema will build on (address, date, enum, image, link, locale, media, pagination, rich-text, SEO — F-042) and the `User` schema, since Phase 6's authentication work depends on it. Everything else grows into this package incrementally rather than being written up front:

- The reusable content block library (`hero`, `richText`, `timeline`, and the rest — F-047) is added in Task 6.8, alongside the `ContentEntry` system it validates.
- Each domain entity schema (`NewsArticle`, `StaffMember`, `SchoolEvent`, `GalleryAlbum`, `Achievement`, `AlumniProfile`, `Society`, and so on) is added in the Phase 7 task that builds its admin module, in step with its Prisma model (see Task 6.1's deferred-model note).

The admin form validation, the API route validation, and the database output validation all use whatever schema exists in this package at the time — there is never a second, parallel definition of a shape once it's here. Inconsistency between these layers is the most common source of data corruption bugs in CMS systems.

### Task 4.2 — Error Boundaries

Add Next.js error boundary files to both applications:

| File                             | Purpose                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------- |
| `error.tsx` at `[locale]` layout | Catches component crashes in pages — shows ErrorState with retry                |
| `global-error.tsx` at root       | Catches crashes in the root layout itself — minimal fallback (no design system) |
| `not-found.tsx` at root          | Handles 404s with a designed page                                               |

Beyond these three page-level files, wrap major page sections (News, Gallery) in their own React `ErrorBoundary` components so a failure in one section does not take down the whole page.

These four layers together are the difference between a platform that fails gracefully and one that shows a blank screen to users.

### Task 4.3 — Shared TypeScript Contracts

Ensure `tsconfig.base.json` has path aliases for every package. Ensure the root `tsconfig.json` has project references to every package. Both of these are required for TypeScript project references to work correctly, which enables incremental compilation across the monorepo.

### Task 4.4 — Fix Dependency Placement

Audit every `package.json` in the monorepo:

- Runtime dependencies (`clsx`, `tailwind-merge`, `framer-motion`) must be in `dependencies`
- Development-only tools (TypeScript, ESLint, testing frameworks) must be in `devDependencies`

Wrong placement causes silent production build failures.

### Task 4.5 — Codebase Hygiene

Fix all known issues before adding more code:

- Any typos in component names or prop names
- Any `'use client'` directives on page-level components that should be server components
- Any inline TODOs that represent deferred decisions
- Any placeholder folders or assets in the public directory

### Task 4.6 — Internationalisation Architecture

Establish the complete i18n architecture using next-intl:

| Step | Action                                                                         |
| ---- | ------------------------------------------------------------------------------ |
| 1    | Define locale routing (`/en/`, `/si/`, `/ta/`)                                 |
| 2    | Create message file structure: separate JSON files per locale per feature area |
| 3    | Fill English messages completely                                               |
| 4    | Create Sinhala message files with placeholder strings for every key            |
| 5    | Create Tamil message files with placeholder strings for every key              |

The rule: every message key that exists in English must exist in Sinhala and Tamil, even if the translation is a placeholder.

Feature areas: navigation, common, home, about, news, events, societies, facilities, admissions, contact, gallery.

### Task 4.6b — Document the Translation Workflow

Write `docs/i18n/Translation Workflow.md` covering:

1. How to add a new translation key across all three message-file sets
2. How to request a review from a native Sinhala or Tamil speaker
3. How to handle strings that have no direct translation in one of the three languages
4. How to test a locale during local development
5. A glossary of institutional terms (motto, staff titles, department names) in all three languages

### Task 4.7 — Establish Unit Testing Infrastructure

Set up Vitest for `packages/ui` and write unit tests for pure, high-value targets first:

- Shared hooks (`useCountUp`, `useInView`, `cn`)
- Form validation logic

Pure functions and hooks are the cheapest to test and the most valuable to cover — they run inside every component render across both applications. Wire `vitest run` into the CI pipeline so a broken hook fails the build before it reaches `main`.

---

## Phase 5 — Principal Presentation and Formal Approval

_Securing the mandate to build the full platform_

### Purpose

This phase is not technical. It is the moment the project transitions from a student initiative to a formally endorsed institutional project. Without this approval, there is no access to institutional data, no staff cooperation, no budget for infrastructure.

### Task 5.1 — Prepare the About Page

The About page is the centrepiece of the presentation. It must be complete with:

- Hero with CrestAnimation
- Stats strip with animated counters
- Namesake section (C.W.W. Kannangara portrait and biography)
- School story
- Timeline (1873 → present)
- Ethos
- Values (Head, Heart, Hand)
- Interactive CrestDiagram
- Alumni Legacy
- School Anthem with AudioPlayer
- Closing statement

Every placeholder image must have a caption indicating it is awaiting archive photography. The page must work in all three languages.

### Task 5.2 — Prepare the Design System Demonstration

Pre-open specific admin pages for the presentation:

- Typography — show all three scripts rendering correctly
- Glass — show the forest aesthetic
- Cards — show the variety of content types
- Motion — show the institutional animation feel

The purpose is to demonstrate that the visual language is coherent and complete, not that the backend is connected.

### Task 5.3 — Prepare the Architecture Slide

One slide explaining the technical architecture in non-technical language. The message: this system is built to last. The dependency flow (Validation → Database → API → Admin → Public Site) demonstrates that each layer is replaceable without rebuilding the others. This is the answer to the question "what happens when you graduate?"

### Task 5.4 — Conduct the Presentation

Present to the principal. The ask is:

1. Formal written approval to proceed to the backend phase
2. Cooperation from administration for content and photography
3. Endorsement to approach alumni and staff for profiles

### Task 5.5 — Collect Initial Content

Immediately after approval, collect:

| Item                   | Responsible Party          | Format          |
| ---------------------- | -------------------------- | --------------- |
| Principal's biography  | Principal / Administration | Text            |
| Principal's portrait   | Principal                  | High-res photo  |
| Staff list             | Administration             | Structured data |
| Department structure   | Administration             | Structured data |
| School crest (vector)  | Administration             | SVG             |
| Historical photographs | Archive                    | Digital scans   |
| School anthem audio    | Music Department           | MP3             |
| Seed news articles (5) | Administration / KITS      | Text + Photos   |

Content collection is always the longest-lead-time item in any web project.

---

## Phase 6 — Database and Backend

_Building the data foundation_

### Purpose

No page on the public website will serve real content until the database exists and the API layer can read from it. This entire phase must be complete before the public pages are connected to live data.

### Task 6.1 — Define the Current Prisma Schema

Write the schema in `packages/database/prisma/schema.prisma` for what the platform actually needs on day one: content, not domain records. Three models only:

| Model                 | Purpose                                                                                                                                                                             |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `User`                | Admin authentication, roles                                                                                                                                                         |
| `ContentEntry`        | Every piece of editorial content — page sections, global content (nav, footer), keyed by `scope` + `key` + `locale`, carrying `status` (draft/published/archived) and `contentType` |
| `ContentEntryVersion` | Immutable snapshot taken on every `ContentEntry` write — powers rollback and history                                                                                                |
| `SiteSetting`         | Non-content configuration values (school name, contact details, social links), keyed the same way as `ContentEntry`                                                                 |

Everything else — `News`, `Staff`, `Society`, `Event`, `GalleryAlbum`, `GalleryPhoto`, `Achievement`, `AlumniProfile`, `MediaAsset`, `AuditLog`, `Announcement` — is a **deferred domain model**. It is not skipped, it is scheduled: each one is added to the schema, with its own migration, in the phase where its admin module is actually built (Phase 7) rather than all at once here. This keeps the schema that ships in this task small enough to review carefully, and means no table exists before something in the codebase reads or writes it.

There is no `PageConfig` model and never will be — section order and visibility per page are defined once in code, in the Page Registry (`packages/contracts`), not configured at runtime through a database row. There is no `ExamResult` model — the exam results portal was cut from scope entirely.

Define all relations, indices, and constraints for the three models above. The schema, once migrated to production, is expensive to change — get it right here.

### Task 6.2 — Run Initial Migration

Run `prisma migrate dev --name init` to create the first migration. Commit the migration files. Every subsequent schema change gets its own migration. Never edit existing migration files.

### Task 6.3 — Implement Authentication

Set up Auth.js with the Prisma adapter and the Google provider as the primary sign-in method, restricted to the school's `@cwwkcc.lk` Google Workspace domain.

**Security critical:**

- Domain is verified server-side in the `signIn` callback — never trust the `hd` claim alone
- A new admin's email must already exist in the `User` table with an assigned role before they can sign in
- Nexus's own `User` table is the source of truth for access, not the school's Google directory

Create the middleware that protects all admin routes and redirects unauthenticated users to the login page.

### Task 6.4 — Configure Google Cloud Console

Create OAuth 2.0 credentials in Google Cloud Console:

1. Configure the consent screen with school branding (school name, logo, support email)
2. Set authorized redirect URIs:
   - Production: `https://cwwkcc.lk/api/auth/callback/google`, `https://admin.cwwkcc.lk/api/auth/callback/google`
   - Development: `http://localhost:3000/api/auth/callback/google`
3. Document the setup steps in `docs/operations/Google OAuth Setup.md`

### Task 6.5 — Seed the Break-Glass Admin Account and Implement TOTP

Seed one Credentials-based super-admin account from environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, bcrypt-hashed) at first deploy.

**Purpose:** Used only to invite the first real `@cwwkcc.lk` admins and for emergency recovery if Google OAuth becomes unavailable.

**Security:**

- Implement TOTP (RFC 6238) for this account specifically
- QR-code setup against a standard authenticator app
- Ten single-use backup codes generated once at setup, shown only that one time
- Password rotation via server-side CLI script over SSH — never a self-service email flow

No other admin account needs TOTP — every other admin's account security is inherited from the school's own Google Workspace 2FA enforcement.

### Task 6.6 — Implement tRPC

Set up the tRPC server in `packages/api`. Define the router structure for what exists after Task 6.1:

| Router               | Purpose                                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `contentEntryRouter` | `getByScope` (public, published-only), `adminGetByScope` (all statuses), `update` (upsert + version snapshot + `revalidateTag`), `setStatus` |
| `siteSettingRouter`  | Read/write `SiteSetting` rows                                                                                                                |
| `mediaRouter`        | Media upload, list, delete                                                                                                                   |
| `auditRouter`        | Audit log viewer                                                                                                                             |
| `userRouter`         | User management, invites                                                                                                                     |

Every other router (`newsRouter`, `staffRouter`, `eventsRouter`, `societiesRouter`, `galleryRouter`, `achievementsRouter`, `alumniRouter`, `academicsRouter`, `extracurricularsRouter`, `facilitiesRouter`, `archiveRouter`, `notificationRouter`) is planned, not built here — each is added alongside its Prisma model and its Phase 7 admin module. There is no `resultsRouter` and no `pageConfigRouter`; both are cut, for the same reasons given in Task 6.1.

Each router defines procedures for list, getById, create, update, delete, and domain-specific operations (publish, archive, approve) once it exists.

### Task 6.7 — Implement Platform-Wide Rate Limiting

Implement rate limiting as Next.js middleware:

| Endpoint     | Limit                 | Implementation |
| ------------ | --------------------- | -------------- |
| Contact Form | 5 requests/hour/IP    | Middleware     |
| General API  | Configurable baseline | Middleware     |

No external rate-limiting service is required at this traffic scale — in-memory or lightweight middleware-based limiting is sufficient.

### Task 6.8 — Implement the ContentEntry & Registry System

Build the system that replaces both a page-ordering table and a page-content table with one coherent model:

- **Page order and visibility are code, not data.** Each page's sections and their order are declared once in the Page Registry (`packages/contracts`) as a typed array. There is no admin UI to reorder sections and no database row that controls it — changing section order is a code change and a deploy, by design (see ADR-005/ADR-009 for the reasoning).
- **Content is the `ContentEntry` table.** One Zod schema per block type (`packages/contracts`), not one per page — a `hero` block is the same shape wherever it's used. Content shapes fall into the same three buckets the old design anticipated: flat prose (story, closing statements), repeatable lists (timeline milestones, crest symbols, FAQ items), and structured short fields (mission/vision/ethos text, anthem lyrics) — they just live under the block library now (F-047) instead of one bespoke schema per section key.

Add `contentEntryRouter` with:

- `getByScope`: Returns every entry for a scope (a page, or a global area like navigation) in the requested locale, falling back to English, published rows only
- `adminGetByScope`: Same, but all statuses, for the editor
- `update`: Upserts one entry, writes a `ContentEntryVersion` snapshot, and calls `revalidateTag(scope)` on success
- `setStatus`: Moves an entry between draft/published/archived without touching its content

Write the one-time migration script that reads the existing `en`/`si`/`ta` message JSON for every non-chrome namespace and seeds it into `ContentEntry` as version 1.

### Task 6.9 — Implement the Media Library

Create the media management system:

1. All uploaded files go to Cloudflare R2 object storage via presigned URLs
2. The browser uploads directly to R2 — the Next.js server is never in the upload path
3. The `MediaAsset` table stores the R2 URL, original filename, file size, MIME type, alt text, tags, and usage tracking
4. Every image in the CMS references a MediaAsset, not a raw URL string

### Task 6.10 — Implement the Announcement System

Build a simple announcement system:

- Announcements are database records with variant (info, warning, error), message, publish date, optional expiry
- The admin panel allows creating and scheduling announcements
- The public site renders an AnnouncementBanner at the top of every page when an active announcement exists

### Task 6.11 — Implement Audit Logging

Every write operation in the tRPC API creates an audit log entry:

- Who performed the action
- What entity was affected
- What changed (before and after values)
- When

The audit log is append-only and never deleted. This is not optional — when multiple editors are making changes to a live school platform, the ability to answer "who changed this and when" is essential.

### Task 6.12 — Database Hardening

Three things must be in place before the database carries real traffic:

1. **Status-based archiving, not soft-delete**: `ContentEntry` has no `deletedAt` column. "Deleting" a section means setting its `status` to `archived` via `setStatus` — the row and its full version history stay put. Admin panel "delete" actions call this, never a raw `DELETE`.
2. **Connection pooling**: Configured for the production environment ahead of any traffic spike (open house, admissions period, news going viral).
3. **Scheduled cleanup jobs**: Remove expired sessions and unused media asset references — never touching `ContentEntry` or its version history.

### Task 6.13 — Integration Tests for the API Layer

Write integration tests for the tRPC routers against a real test database (not mocked). Verify:

- Authentication is enforced on protected procedures
- Input validation correctly rejects malformed data
- Create/update/delete operations persist correctly end-to-end

Unit tests (Task 4.7) cover isolated logic; these tests cover the seams between the API layer's pieces, which is where the most common CMS bugs actually live.

---

## Phase 7 — Admin Panel

_Building the content management interface_

### Purpose

The admin panel is the tool that makes the platform self-sustaining after the developer leaves. Its quality determines whether staff actually use it, which determines whether the public website stays alive with current content.

### Task 7.1 — Admin Shell Layout

Build the admin application shell:

- Persistent sidebar navigation
- Top bar with user avatar and session info
- Breadcrumb navigation
- Responsive mobile drawer

Every admin module lives inside this shell.

### Task 7.2 — Dashboard Overview

Build the admin dashboard. Before the domain models in Task 6.1's deferred list exist, this is a `ContentEntry`-only dashboard:

| Section         | Content                                                                                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Page list       | Every page in the Page Registry with a fill status — Empty / Partially Filled / Complete — computed from its sections' `ContentEntry` status; this is the primary view until other modules exist |
| Content counts  | Total/published/draft `ContentEntry` rows                                                                                                                                                        |
| Recent activity | Last 10 `ContentEntryVersion` saves                                                                                                                                                              |
| Quick links     | Into each page's editor                                                                                                                                                                          |

Once a module in Task 6.1's deferred list is built (news, staff, events, societies), fold its counts, quick actions, and pending items (draft articles, unapproved alumni profiles) into this same dashboard.

### Task 7.3 — News Module

Build the full news CRUD interface:

| Feature         | Description                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| List view       | Status badges (Draft, Under Review, Published, Archived), search, filter by category and date, bulk actions |
| Create/Edit     | Tiptap rich text editor, cover image via media library, category selection                                  |
| Status workflow | Draft → Submit for Review → Publish → Archive                                                               |
| SEO preview     | Shows how the article will appear in search results                                                         |
| Validation      | Form validates against `NewsArticleSchema` on both client and server                                        |

### Task 7.4 — Staff Module

Build the staff management interface:

| Feature     | Description                                                              |
| ----------- | ------------------------------------------------------------------------ |
| List view   | Sorted by role hierarchy (Principal, Deputy Principals, HODs, Teachers)  |
| Create/Edit | Name, title, role, department, tenure, quote, portrait via media library |
| Reorder     | Drag-and-drop interface (`order` field determines public site sequence)  |

### Task 7.5 — Events Module

Build the events management interface:

| Feature     | Description                                                                         |
| ----------- | ----------------------------------------------------------------------------------- |
| Views       | Calendar view and list view                                                         |
| Create/Edit | Title, description, date, time, venue, category, status, optional registration link |
| Status      | Draft → Published → Past (automatic based on date)                                  |

### Task 7.6 — Societies Module

Build the societies management interface:

| Feature     | Description                                                                                                                         |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Create/Edit | Name, slug, category, tagline, description, member count, founding year, logo upload, banner upload, advisor staff member selection |

### Task 7.7 — Gallery Module

Build the gallery management interface:

| Feature            | Description                                    |
| ------------------ | ---------------------------------------------- |
| Album creation     | Title, year, category, cover photo selection   |
| Batch upload       | Multiple photos to R2 with progress indicators |
| Per-photo alt text | Required — accessibility compliance            |
| Reorder            | Drag-and-drop album reordering                 |

### Task 7.8 — Media Library Module

Build the central media library interface:

| Feature        | Description                                                               |
| -------------- | ------------------------------------------------------------------------- |
| Grid view      | All uploaded assets with search and tag filtering                         |
| Upload         | Automatic compression (resize to max display dimensions, WebP conversion) |
| Alt text       | Editing interface                                                         |
| Usage tracking | Shows which content items use each asset                                  |
| Bulk delete    | With usage warning (prevents accidental deletion of in-use assets)        |

### Task 7.9 — ContentEntry Module

Build the content editing interface. There is no separate "page configuration" screen — section order and visibility are fixed in code (Task 6.8), so this module only ever edits content, never structure:

- For each page, list its content sections grouped the same way the page itself is organised, driven by structured forms from `FieldDefinition`/`FieldMeta` metadata (F-043) rather than a hand-built form per section
- Each section's editor matches its shape:
  - Rich text field for prose blocks
  - Repeatable-list editor with drag-to-reorder for timeline milestones, crest symbols, FAQ items
  - Plain form for short structured fields (mission/vision/ethos, anthem lyrics)
- Every save creates a `ContentEntryVersion` snapshot, viewable and revertible
- Locale switcher lets an editor see and edit all three languages without leaving the page
- Status control (draft/published/archived) per section

### Task 7.10 — Analytics Module

There is no custom event collector to build. Umami runs as a self-hosted Docker container (part of Task 11.3's Compose stack) and does the actual tracking, cookie-free, with no third-party script leaving the school's own infrastructure. This task is the admin-panel dashboard that surfaces Umami's data inside Nexus rather than sending editors to a separate tool:

| Metric                | Description                                                 |
| --------------------- | ----------------------------------------------------------- |
| Page views            | By day, week, month, pulled from Umami                      |
| Top pages             | With trend indicators                                       |
| Search terms          | Entered by users and their result counts, pulled from Umami |
| Content performance   | Which news articles get the most views                      |
| Language distribution | What percentage of users use each locale                    |
| Device type           | Mobile vs desktop vs tablet                                 |

### Task 7.11 — User Management Module

Build the user administration interface:

| Feature         | Description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| User list       | All admin users with their roles                                            |
| Invite          | Add `@cwwkcc.lk` email to allowlist — user signs in with Google             |
| Role assignment | Admin (full access) vs Editor (create/edit content only)                    |
| Deactivation    | Never delete users — deactivated users are retained for audit log integrity |

### Task 7.12 — New Admin Onboarding

When a user is added to the allowlist and logs in for the first time:

1. Show a brief onboarding tour highlighting key admin modules (News, Events, Gallery, Staff)
2. Send a welcome email (via Resend) with links to video tutorials and the Admin User Guide

### Task 7.13 — Announcements Module

Build the announcement management interface:

- Create announcements with variant selection (info, warning, error)
- Message content, publish date, optional expiry
- View all active and past announcements
- Deactivate or delete announcements

This is deliberately simple — the purpose is operational communication to site visitors, not a notification platform.

### Task 7.14 — Audit Log Viewer Module

Build the audit log viewer:

- Chronological feed of all admin actions
- Filters by user, entity type, action type, date range
- Individual entries show before and after state of changed fields
- Read-only — the audit log is never editable

### Task 7.15 — Settings Module

Build the global platform settings interface:

| Setting           | Purpose                  |
| ----------------- | ------------------------ |
| School name       | Used in footer, metadata |
| Address           | Footer, JSON-LD          |
| Contact details   | Footer, contact page     |
| Social media URLs | Footer, sharing          |
| Founding year     | Footer, JSON-LD          |
| Motto             | Footer, metadata         |

These values are read by the public site for the footer, JSON-LD structured data, and metadata.

### Task 7.16 — Academic Programs Admin Screen

Build a config-style screen (same pattern as Settings Module):

- Fixed set of stream entries: Bio Science, Physical Science, Commerce, Arts, Technology
- Editable: description, subject list, image, contact department
- No create, no delete, no draft/publish workflow

### Task 7.17 — Extracurriculars Module

Build the extracurriculars management interface:

- Name, category, description, coach/advisor via staff selection
- Achievements, photo, active/inactive status
- Full create/edit/delete (activities get added and retired over the years)

### Task 7.18 — Alumni Module

Build the alumni management interface:

| Feature         | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| Two entry paths | Admin-direct entry; public self-submissions awaiting moderation    |
| Filtering       | By status (pending/approved/rejected), graduation year, profession |
| Approve         | Publishes immediately to the public directory                      |
| Reject          | Discards with optional logged reason                               |
| Edit            | Editable before approving (public submissions may be incomplete)   |

### Task 7.19 — Achievement Module

Build the achievement database management interface:

- Student name, category (academic/sports/arts/competition)
- Achievement level, description, year
- Optional photo, optional link to a related News article
- Simple create/edit/delete — no draft/review workflow

### Task 7.20 — Digital Archive Module

Build the digital archive management interface:

| Feature       | Description                                                                               |
| ------------- | ----------------------------------------------------------------------------------------- |
| Curated layer | Over the Media Library, not a replacement                                                 |
| Entry fields  | Title, year, category (photograph/magazine/prize-giving record/prefect list), description |
| File upload   | Through the standard Media Library pipeline                                               |
| Search        | Year and category are what the public Digital Archive page filters and searches by        |

### Task 7.21 — Facilities Module

Build the facilities management interface:

- Name, category, description, photo(s), display order
- Full create/edit/delete — the facility list isn't nationally fixed

### Task 7.22 — Social Media Management Module

Build a lightweight social media management interface:

| Feature           | Description                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| Post drafting     | Create posts with text, images (from Media Library), and optional links                                |
| Scheduling        | Set publishing dates/times (future scheduling)                                                         |
| Calendar view     | Content calendar for planned posts                                                                     |
| Approval workflow | Approve or reject post suggestions from other editors                                                  |
| Publishing        | Manual copy to each platform with "Mark as Published" button (API integration is a future enhancement) |

This ensures social media is treated as a first-class content type alongside news and events.

---

## Phase 8 — Public Pages (Connected to Live Data)

_The website the world sees_

### Purpose

Now that the database has data and the admin panel can manage it, the public pages are built to read from it. Every page is a server component by default. Only interactive elements use client components.

### Task 8.1 — Home Page

Build the home page as a composition of server-rendered blocks:

| Section             | Component                     | Source                       |
| ------------------- | ----------------------------- | ---------------------------- |
| Hero                | CrestAnimation, headline, CTA | Static                       |
| Statistics          | StatsStrip                    | Database                     |
| Principal's Message | PrincipalMessage              | Staff table (principal role) |
| Latest News         | NewsCard (3 latest)           | News table                   |
| Upcoming Events     | EventCard (3 next)            | Events table                 |
| Quick Access        | QuickAccessPortal             | Static links                 |
| Announcement        | AnnouncementBanner            | Announcements table          |

Section order and visibility are fixed in the Page Registry (`packages/contracts`, Task 6.8) — there is no runtime admin control over which blocks appear or in what order.

### Task 8.2 — About Page

Build the About page as a composition of server-rendered blocks:

| Section            | Component                      | Source              |
| ------------------ | ------------------------------ | ------------------- |
| Hero               | CrestAnimation, eyebrow, title | Static              |
| Stats              | StatsStrip                     | Database            |
| Founding Narrative | OurStory                       | ContentEntry        |
| Dr. Kannangara     | OurNameSake                    | ContentEntry        |
| Timeline           | Timeline                       | ContentEntry        |
| Ethos, Values      | Ethos + Values                 | ContentEntry        |
| Crest Diagram      | CrestDiagram                   | Static/ContentEntry |
| Alumni Legacy      | AlumniLegacyBlock              | AlumniProfile table |
| School Anthem      | AudioPlayer                    | Static              |
| Closing            | ClosingStatement               | ContentEntry        |

Connect all sections to live data sources. Migrate content from static i18n files to `ContentEntry`.

### Task 8.3 — Migrate Static Pages to ContentEntry

Replace hardcoded content in `messages/` with database-backed `ContentEntry` rows for:

- About
- Administration
- Academics
- Facilities
- Extracurriculars

Run the migration script from Task 6.8 to seed initial content from existing message files. Ensure the admin panel's ContentEntry Module (Task 7.9) can edit these sections. Remove the corresponding message keys from the `messages/` JSON files.

### Task 8.4 — News Pages

Build the news listing page and individual article pages:

| Feature           | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| Listing           | Category filter, pagination, search                                       |
| Article           | Rich text rendering, author attribution, related articles, social sharing |
| Static generation | `generateStaticParams` for published articles                             |
| Metadata          | `generateMetadata` for OG and Twitter cards                               |

### Task 8.5 — Events Pages

Build the events listing and individual event pages:

| Feature      | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| Listing      | Calendar view and list view, filterable by category and month |
| Event detail | Full description, venue map link, registration link           |

### Task 8.6 — Societies Hub

Build the societies listing and individual society pages:

| Feature           | Description                                                             |
| ----------------- | ----------------------------------------------------------------------- |
| Listing           | Filterable by category                                                  |
| Society detail    | Banner, description, advisor staff card, recent events, gallery preview |
| Static generation | `generateStaticParams` for individual society pages                     |

### Task 8.7 — Facilities Page

Build the facilities page using FacilityCard components. Content is managed through the Facilities Module (Task 7.21).

### Task 8.8 — Admissions Page

Build the admissions information page:

| Feature       | Component                  | Source                           |
| ------------- | -------------------------- | -------------------------------- |
| Process steps | ProcessSteps               | Static                           |
| Key dates     | AdmissionsKeyDatesTimeline | Events table (academic category) |
| Requirements  | RequirementsChecklist      | Static                           |
| Enquiry form  | ContactForm                | API route                        |

### Task 8.9 — Gallery

Build the gallery listing and individual album pages:

| Feature           | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| Listing           | Albums sorted by year                                         |
| Album             | Photo grid with lightbox                                      |
| Images            | All via `next/image` with proper sizing and blur placeholders |
| Static generation | `generateStaticParams` for individual albums                  |

### Task 8.10 — Contact Page

Build the contact page:

| Feature       | Description                          |
| ------------- | ------------------------------------ |
| ContactForm   | Wired to Resend API route            |
| FeedbackForm  | For general feedback                 |
| Validation    | Zod schema on both client and server |
| Rate limiting | 5 requests per hour per IP           |

### Task 8.11 — Alumni Directory

Build the public alumni directory:

| Feature    | Description                                                      |
| ---------- | ---------------------------------------------------------------- |
| Search     | By graduation year, profession, country                          |
| Display    | Name, graduation year, position, quote — no private contact info |
| Submission | Form for alumni to submit profiles (enters admin approval queue) |

### Task 8.12 — Digital Archive

Build the digital archive:

| Feature      | Description                                                                              |
| ------------ | ---------------------------------------------------------------------------------------- |
| Content      | Historical photographs, old annual magazines (PDFs), prize-giving records, prefect lists |
| Browsing     | By year                                                                                  |
| Search       | Full-text search across metadata                                                         |
| Unique value | A 150-year-old school with a properly organised digital memory                           |

### Task 8.13 — Achievement Database

Build the achievement database:

| Feature    | Description                                    |
| ---------- | ---------------------------------------------- |
| Categories | Academic, sports, arts, cultural, competitions |
| Filtering  | By year, category, student name                |
| Search     | Full-text search                               |

### Task 8.14 — Search

Build the unified search interface:

| Feature       | Description                                                    |
| ------------- | -------------------------------------------------------------- |
| Access        | Search box accessible from every page via navigation           |
| Content types | News, events, staff, societies, gallery, archive, achievements |
| Technology    | PostgreSQL full-text search with Sinhala/Tamil/English support |
| Results       | Grouped by type, ranked by relevance                           |

### Task 8.15 — Academics Page

Build the academics page:

| Feature    | Component             | Source                         |
| ---------- | --------------------- | ------------------------------ |
| Streams    | AcademicStreamCard    | Academic Programs Admin Screen |
| Comparison | StreamComparisonTable | Academic Programs data         |

### Task 8.16 — Administration Page

Build the administration page:

| Section             | Component                     | Source      |
| ------------------- | ----------------------------- | ----------- |
| Principal           | StaffCard (principal variant) | Staff table |
| Deputy Principals   | StaffCard (grid variant)      | Staff table |
| Heads of Department | StaffCard (grid variant)      | Staff table |
| Board of Management | StaffCard                     | Staff table |

No new admin module — administrators are entered as staff like anyone else.

### Task 8.17 — Extracurriculars Page

Build the extracurriculars page:

| Section         | Component           | Source                  |
| --------------- | ------------------- | ----------------------- |
| Sports          | ExtracurricularCard | Extracurriculars Module |
| Performing Arts | ExtracurricularCard | Extracurriculars Module |
| Scouting        | ExtracurricularCard | Extracurriculars Module |
| Cadets          | ExtracurricularCard | Extracurriculars Module |

### Task 8.18 — Launch Official Social Media Accounts

Establish the school's official social media presence:

| Step                 | Action                                                                                                                                  |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Account creation     | Create official accounts on Facebook, Instagram, YouTube, LinkedIn, WhatsApp Channel using school's official name, crest, brand colours |
| Account coordination | Where unofficial accounts exist, coordinate with administration to request transfer (with approval and documentation)                   |
| Brand alignment      | Update all profiles with official description, cover images, link to `cwwkcc.lk`                                                        |
| Content seeding      | Draft initial posts (welcome message, school history highlights, upcoming events)                                                       |
| Ownership            | Ensure accounts owned by school (using school email addresses), not individual students                                                 |
| Governance           | Define social media content approval workflow in Content Governance document                                                            |

This is critical because social media is a core component of Nexus.

---

## Phase 9 — PWA and Offline Support

_Making the platform reliable on poor connections_

### Purpose

A significant proportion of the community accesses this platform on mobile devices over 3G connections. A service worker that caches key pages means the platform works even when the network does not.

### Task 9.1 — Implement Service Worker

Add `next-pwa` or a custom service worker configuration:

| Strategy       | Description                                        |
| -------------- | -------------------------------------------------- |
| Shell caching  | Cache navigation, footer, CSS, fonts on first load |
| Static caching | Cache home and about pages for offline access      |
| Network-first  | Dynamic pages (news, events) with cached fallback  |

### Task 9.2 — Web App Manifest

Create `manifest.json`:

- School name
- Icons in all required sizes (192px, 512px, maskable)
- Theme colour matching the design system
- Display mode: `standalone`

This enables "Add to Home Screen" on mobile devices.

### Task 9.3 — Offline Page

Build a designed offline page cached by the service worker:

- Institutional design treatment
- Explains the situation
- Links to cached pages that are available
- No browser default error

---

## Phase 10 — SEO and Structured Data

_Making the platform discoverable_

### Purpose

The platform must rank for searches related to the school. Structured data tells search engines exactly what the content is, enabling rich results in Google Search.

### Task 10.1 — Metadata Architecture

Implement `generateMetadata` for every page type:

- Root layout: baseline metadata (school name, description, OG image)
- Each page type: specific overrides
- News articles: headline, author, publication date
- Events: start date, location
- Staff: name, role

Every page must have a unique, descriptive title and a 150-character meta description.

### Task 10.1b — Programmatic Open Graph Image Generation

Generate Open Graph images programmatically per page using Next.js image generation:

- News article shares show headline and cover photo, not generic crest
- WhatsApp is the dominant sharing channel — specific previews matter

### Task 10.2 — JSON-LD Structured Data

Implement JSON-LD schema markup:

| Content Type  | Schema                                                                       |
| ------------- | ---------------------------------------------------------------------------- |
| School        | `EducationalOrganization` with name, address, founding year, social profiles |
| News articles | `NewsArticle`                                                                |
| Events        | `Event`                                                                      |
| Staff         | `Person`                                                                     |
| Site          | `WebApplication` (PWA — see Phase 9)                                         |

### Task 10.3 — Sitemap Generation

Implement `sitemap.ts` using Next.js conventions:

| Included                                     | Excluded    |
| -------------------------------------------- | ----------- |
| All static pages                             | Admin panel |
| All dynamic pages (news, societies, gallery) | API routes  |

### Task 10.3a — CDN Cache Invalidation

On content publish, trigger Cloudflare purge of the specific URL:

- `/news/{slug}`, `/events/{slug}`, etc.
- Use Cloudflare API with a token stored in environment variables

### Task 10.4 — robots.txt

Create `robots.txt`:

- Allow indexing of all public pages
- Disallow admin panel and API routes
- Disallow results portal (privacy)

### Task 10.5 — Performance Audit

Run Lighthouse on home, about, and news pages from simulated mobile connection:

| Target         | Score |
| -------------- | ----- |
| Performance    | ≥ 90  |
| Accessibility  | ≥ 90  |
| Best Practices | ≥ 90  |
| SEO            | ≥ 90  |

Common fixes:

- Images without explicit dimensions → layout shift
- Render-blocking resources
- Fonts loading before content
- JavaScript bundles too large

Use:

- Dynamic imports for heavy components (CrestAnimation, AudioPlayer, Tiptap)
- `optimizePackageImports` for `@nexus/ui` and `framer-motion`

---

## Phase 11 — Infrastructure and Deployment

_Taking the platform from localhost to the internet_

### Purpose

Every technical decision made in the infrastructure phase affects the platform's reliability, cost, and maintainability for years. These decisions must be made deliberately, not improvised.

### Task 11.1 — Configure Cloudflare R2

| Step | Action                                                                       |
| ---- | ---------------------------------------------------------------------------- |
| 1    | Create the R2 bucket for media storage                                       |
| 2    | Configure CORS to allow uploads from the admin panel domain                  |
| 3    | Set up a public access URL for serving media files                           |
| 4    | Update Next.js image configuration to allow the R2 domain as an image source |

R2 is chosen over S3 because it has no egress fees — serving images from R2 to the browser costs nothing beyond the storage fee.

### Task 11.2 — Write Dockerfiles

Write multi-stage Dockerfiles for both `apps/web` and `apps/admin`:

| Stage   | Purpose                                     |
| ------- | ------------------------------------------- |
| Build   | Install dependencies, build the application |
| Runtime | Minimal image with only the built output    |

Multi-stage builds produce small final images by discarding build tools from the production image.

### Task 11.2b — Implement Health Check Endpoints

Add `/api/health` route to both apps that:

- Returns 200 with basic service status
- Returns non-200 if critical dependency (database) is unreachable
- Docker healthchecks call these endpoints
- UptimeRobot and CD pipeline post-deploy check poll these endpoints

### Task 11.3 — Write Docker Compose

Write `docker-compose.yml` defining six services:

| Service       | Purpose                                              |
| ------------- | ---------------------------------------------------- |
| `postgres`    | Database with named volume for persistence           |
| `nexus-web`   | Public website                                       |
| `nexus-admin` | Admin panel                                          |
| `umami`       | Self-hosted analytics backup                         |
| `caddy`       | Reverse proxy with automatic HTTPS via Let's Encrypt |

Define:

- Environment variable references for secrets
- Health checks for each service
- Restart policies

### Task 11.4 — Provision the Hetzner Server

| Step | Action                                                             |
| ---- | ------------------------------------------------------------------ |
| 1    | Create the Hetzner cloud server (CPX22: 2 vCPU, 4GB RAM, 40GB SSD) |
| 2    | Install Docker and Docker Compose                                  |
| 3    | Configure firewall to allow only ports 80, 443, 22                 |
| 4    | Set up SSH key authentication, disable password authentication     |
| 5    | Create a deployment user with minimal permissions                  |

### Task 11.5 — Configure DNS

| Domain            | Points To         |
| ----------------- | ----------------- |
| `cwwkcc.lk`       | Hetzner server IP |
| `admin.cwwkcc.lk` | Hetzner server IP |

Configure Caddyfile to route each subdomain to the correct Docker service and provision TLS certificates automatically.

### Task 11.6 — Write GitHub Actions CI/CD Pipeline

**CI (`ci.yml`)** — Runs on every push:

- TypeScript typecheck
- ESLint lint
- `pnpm audit` (security)
- Lighthouse CI (performance budgets)
- Unit tests (Vitest)
- Integration tests
- Build both apps

**CD (`deploy.yml`)** — Runs on push to `main`:

- Build Docker images (multi-stage)
- Push to GitHub Container Registry
- SSH into Hetzner server
- Pull new images
- Restart services with zero-downtime deployment
- Wait for health checks

### Task 11.6b — Continuous Performance Budgets via Lighthouse CI

Run Lighthouse CI as a step in `ci.yml`:

- Fail build if Performance, Accessibility, Best Practices, or SEO scores drop below 90 on mobile for key pages (home, news article, results portal)
- Prevents performance regressions from shipping

### Task 11.7 — Configure Environment Variables

Create `.env.example` files for both apps documenting every required variable:

| Category  | Variables                                                                     |
| --------- | ----------------------------------------------------------------------------- |
| Database  | `DATABASE_URL`, `POSTGRES_USER`, `POSTGRES_PASSWORD`                          |
| Auth      | `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` |
| Storage   | `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL` |
| Email     | `RESEND_API_KEY`                                                              |
| Analytics | `UMAMI_URL`, `UMAMI_WEBSITE_ID`                                               |
| Optional  | `SENTRY_DSN`                                                                  |

Never commit real secrets to the repository. Configure GitHub repository secrets for the CI/CD pipeline. Configure environment variables on the Hetzner server.

### Task 11.7b — Configure Optional Sentry Error Tracking

Wire up Sentry in both applications, gated entirely behind the `SENTRY_DSN` environment variable:

- If unset: platform runs exactly as it does today with no Sentry dependency
- If set: unhandled errors are reported with full context (session, request details, stack trace)

This is optional — the platform must remain fully functional without any external paid service.

### Task 11.8 — SSL and Security Headers

Verify TLS certificate provisioning. Configure security headers in Caddy:

| Header                    | Value                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Strict-Transport-Security | `max-age=31536000; includeSubDomains; preload`                                                             |
| Content-Security-Policy   | Strict policy — no inline scripts, external resources limited to approved origins (Feature Registry F-127) |
| X-Frame-Options           | `DENY`                                                                                                     |
| X-Content-Type-Options    | `nosniff`                                                                                                  |
| Referrer-Policy           | `strict-origin-when-cross-origin`                                                                          |

---

## Phase 12 — Launch Preparation

_The final checks before going live_

### Purpose

A failed launch is significantly worse than a delayed launch. This phase exists to ensure the launch is not a failure.

### Task 12.0 — Build the End-to-End Test Suite

Write Playwright E2E tests covering critical user journeys:

- Looking up exam results
- Submitting the contact form
- Switching locale and confirming page content changes
- Navigating between major sections

Run this suite in CI before every deployment and manually against the launch-candidate build.

### Task 12.1 — Content Population

Populate the database with real content before launch:

| Content                               | Quantity  |
| ------------------------------------- | --------- |
| Principal biography and portrait      | 1         |
| Full staff list with photos           | All staff |
| Recent news articles with images      | 10+       |
| Upcoming events                       | 5+        |
| Societies with logos and descriptions | All       |
| Gallery albums                        | 3+        |
| School statistics                     | All       |
| Alumni profiles                       | 20+       |

The site must not launch empty. An empty site signals abandonment, not freshness.

### Task 12.2 — Trilingual Content Verification

Verify every page works correctly in all three languages:

- Missing translation keys (runtime errors)
- Text overflow in Sinhala or Tamil (layout breaks)
- Untranslated strings appearing in the wrong locale
- Locale switcher working correctly on every page

### Task 12.3 — Accessibility Audit

Conduct a full accessibility audit:

| Tool      | Check                       |
| --------- | --------------------------- |
| Axe       | Automated checks            |
| Manual    | Keyboard navigation testing |
| Visual    | Colour contrast (WCAG AA)   |
| Assistive | Screen reader testing       |

### Task 12.4 — Security Review

Review the security posture:

- Admin panel not accessible without authentication
- Contact form has rate limiting
- No sensitive data in API responses
- Database credentials not in committed files
- R2 bucket does not have public write access

### Task 12.4a — PII Compliance Review

Review data storage across every surface that touches personal information — there is no single Results Portal to audit, so this now spans several modules:

- Alumni Directory (F-154): only what alumni themselves submitted, no private contact information exposed publicly
- Achievement Database and Digital Archive: student names in historical records — confirm consent/anonymisation policy for anything not already public record
- Contact form submissions: retention period documented, not kept indefinitely
- Cookie consent banner (F-158) covers Umami analytics correctly
- GDPR/Sri Lanka PDPA compliance across all of the above

### Task 12.5 — Load Testing

Simulate peak load on the public site during a high-traffic event (news going viral, admissions period, open house):

| Target           | Value                               |
| ---------------- | ----------------------------------- |
| Concurrent users | 100                                 |
| Response time    | <3 seconds on mobile connection     |
| Database queries | 1000 in 60 seconds without timeouts |

Use k6 or Artillery to simulate.

### Task 12.6 — Cross-Browser and Device Testing

| Browser          | Platform |
| ---------------- | -------- |
| Chrome           | Android  |
| Safari           | iOS      |
| Chrome           | Desktop  |
| Firefox          | Desktop  |
| Samsung Internet | Android  |

Test with slow network simulation.

### Task 12.7 — Set Up Monitoring

| Service                         | Frequency      | Alert             |
| ------------------------------- | -------------- | ----------------- |
| UptimeRobot (`cwwkcc.lk`)       | 5 minutes      | Email + SMS       |
| UptimeRobot (`admin.cwwkcc.lk`) | 5 minutes      | Email + SMS       |
| SSL Certificate Expiry          | 30 days before | Email             |
| Database backups                | Nightly        | Verify restorable |

### Task 12.8 — The Launch

| Step | Action                                 |
| ---- | -------------------------------------- |
| 1    | Change DNS                             |
| 2    | Verify both applications responding    |
| 3    | Verify TLS valid                       |
| 4    | Verify database has content            |
| 5    | Verify results portal works            |
| 6    | Monitor server logs for first 24 hours |

The launch is not an event — it is the beginning of the platform's operational life.

---

## Phase 13 — Stabilisation

_Observing reality and fixing what the plan missed_

### Purpose

Launch is not completion. The first four to six weeks of real usage reveal issues that no amount of testing in development can predict. This phase exists to observe real usage and fix real problems before handing the platform to the school permanently.

### Task 13.1 — Collect Structured Feedback

Create a simple feedback collection mechanism:

- A form that admin users see when they log in
- A feedback button accessible to all site visitors
- Collect separately: staff editor feedback, student feedback, parent feedback

### Task 13.2 — Review Analytics Data

After two weeks of live traffic, review the analytics dashboard:

| Question                                | Action                                     |
| --------------------------------------- | ------------------------------------------ |
| Which pages have high exit rates?       | Content not matching expectations — revise |
| Which search queries return no results? | Content gaps — fill                        |
| Which pages stay in Draft longest?      | Follow up with the owning editor           |
| Mobile vs desktop split?                | Layout adjustments                         |
| Which locale is most used?              | Prioritise translations                    |

### Task 13.3 — Review Failed Searches

Export all search queries that returned zero results:

- Some indicate missing content — create it
- Some indicate missing search index coverage — fix
- Some indicate translation gaps — add translations

### Task 13.4 — Review Editor Workflows

Sit with at least two staff editors and watch them use the admin panel without guidance. Do not help them unless they are completely stuck. Observe where they hesitate, where they make mistakes, where they ask questions. Every point of confusion is a UX failure.

### Task 13.5 — Fix All Discovered Issues

Triage all discovered issues:

| Priority | Response Time   | Examples                                                  |
| -------- | --------------- | --------------------------------------------------------- |
| Critical | 24 hours        | Broken functionality, data errors, accessibility failures |
| High     | 1 week          | Workflow confusion, performance issues, content gaps      |
| Low      | Before handover | Cosmetic issues, minor UX improvements                    |

### Task 13.6 — Performance Validation Under Real Load

- Compare Lighthouse scores against launch preparation phase
- Check database query performance using PostgreSQL slow query log
- Check if any page is slower than 3 seconds on a mobile connection

### Task 13.7 — Trilingual Content Audit

Review the site in all three languages with a native speaker of Sinhala and a native speaker of Tamil:

- Mistranslated strings
- Untranslated placeholder strings
- Layout breaks caused by longer Sinhala or Tamil text
- Incorrect font rendering

---

## Phase 14 — Post-Launch and Handover

_Ensuring the platform outlasts its creator_

### Purpose

The highest risk to this platform is not a technical failure. It is developer graduation. This phase exists to ensure the platform can be maintained by the next KITS generation without losing institutional knowledge.

### Task 14.0 — Establish Content Governance

Define, in writing, who owns each content type and what their responsibility is:

| Content Type        | Owner                                | Responsibility                          |
| ------------------- | ------------------------------------ | --------------------------------------- |
| **News**            | School administration + KITS editors | Minimum 2 articles/month                |
| **Events**          | Society leaders + class teachers     | Create events 2 weeks before occurrence |
| **Gallery**         | Media unit or photography club       | Upload photos within 1 week of events   |
| **Digital Archive** | History committee (teachers + OBA)   | Ongoing digitisation                    |
| **Staff**           | School administration                | Update when staff join or leave         |
| **Announcements**   | School administration only           | Post as needed, expire promptly         |
| **Social Media**    | Designated editors                   | As per social media content strategy    |

Document this governance plan and get it signed by the principal before handover.

### Task 14.0b — Disaster Recovery Plan

Document the recovery procedure for every failure mode. This document lives at `docs/operations/Disaster Recovery.md`.

| Failure Mode            | Recovery Time | Procedure                                                                                                                                                                              |
| ----------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Server failure**      | 2-4 hours     | Provision new server, restore from backup                                                                                                                                              |
| **Database corruption** | 1-2 hours     | Stop services, restore from backup, verify integrity                                                                                                                                   |
| **Accidental deletion** | Minutes       | Restore from `ContentEntryVersion` snapshot; for anything merely archived (not deleted), `setStatus` back to published — there is no soft-delete column to recover from (see Task 6.1) |
| **Domain loss**         | Hours-Days    | Contact LK domain registry with proof of ownership                                                                                                                                     |
| **R2 failure**          | Hours         | Restore from secondary backup                                                                                                                                                          |
| **GitHub loss**         | Hours         | Every clone is a full copy; mirror to second location                                                                                                                                  |

Every recovery procedure must be tested before handover. A backup that has never been restored is not a backup.

### Task 14.1 — User Training

Train 2-3 KITS members and at least 2 staff editors on the admin panel:

| Module        | Covered                        |
| ------------- | ------------------------------ |
| News          | Draft → Publish workflow       |
| Gallery       | Uploading photos to albums     |
| Events        | Creating and managing events   |
| Media Library | Uploading and using assets     |
| Audit Log     | Understanding who changed what |

Training must be recorded or documented step-by-step. Future staff must be able to train themselves from this documentation.

### Task 14.1a — Create Editor Video Tutorials

Record 5-minute video tutorials for each admin module:

1. News: Creating, editing, publishing an article
2. Gallery: Uploading photos to an album
3. Events: Creating and managing events
4. Staff: Updating staff profiles
5. Page Configuration: Reordering sections
6. Social Media: Creating and scheduling posts

Store videos in the school's Google Drive or YouTube (unlisted). Link from the admin panel dashboard.

### Task 14.2 — Developer Knowledge Map

Update `docs/Developer Knowledge Map.md` with the final architecture overview:

- Deployment procedure
- Database backup procedure
- Process for adding new content types
- Technology stack rationale (references ADRs)
- Development environment setup

Write it as if explaining to someone who has never seen the codebase.

### Task 14.3 — Runbook

Write an operational runbook at `docs/operations/Runbook.md` covering:

- How to deploy a change
- How to roll back a bad deployment
- How to restore from a database backup
- How to add a new admin user
- How to add a new language
- How to debug a failing API route
- How to renew a TLS certificate if automatic renewal fails
- How to scale the server if traffic grows

Every operation a future maintainer might need is documented step by step.

### Task 14.4 — Populate Legacy Content

Work with school administration to digitise and upload historical content:

- Old prize-giving photographs
- Historical records
- Past alumni profiles
- Archived news from school magazines

This is a long-running task, not a single sprint. The digital archive grows over time.

### Task 14.5 — Alumni Outreach

Announce the alumni directory to former students:

- WhatsApp groups
- Social media
- Notice boards at reunions

Seed the directory with 10-20 notable alumni profiles before launch to demonstrate its value.

### Task 14.6 — Final Handover

Formally hand over the platform to the school:

| Item                         | Recipient                  |
| ---------------------------- | -------------------------- |
| DNS management               | School administration      |
| Hosting credentials          | School administration      |
| R2 access                    | School administration      |
| GitHub repository ownership  | School GitHub organisation |
| Domain registrar credentials | School administration      |

Provide the school with a printed copy of the runbook and the disaster recovery plan. Conduct a final demonstration with the principal showing the complete platform.

The handover is not a moment — it is a transfer of responsibility, documented and signed by both parties.

---

## The Quality Standard

Every task in this roadmap should be completed to one standard: no future developer should be able to look at the output and say "this could have been done better if they had done it this way."

That means:

| Area       | Standard                                  |
| ---------- | ----------------------------------------- |
| Components | Correct TypeScript types                  |
| Pages      | Complete metadata                         |
| Images     | Alt text on every image                   |
| Forms      | Validation on both client and server      |
| Database   | Error handling on every operation         |
| API        | Authentication required where appropriate |
| Deployment | Fully automated                           |
| Secrets    | In environment variables, never committed |
| Decisions  | Documented in ADRs                        |

This is not perfectionism for its own sake. It is the baseline quality required for a platform that will be maintained by multiple developers over many years without the original author present to explain decisions.

---

## Launch Timeline Reference

This timeline assumes work begins in June 2026:

| Month         | Focus Areas                                                    |
| ------------- | -------------------------------------------------------------- |
| **June**      | Phase 0-1 (Concept, Repository), Phase 2 (Design System)       |
| **July**      | Phase 3 (Component Library), Phase 4 (Architecture Hardening)  |
| **August**    | Phase 5 (Principal Presentation), Phase 6 (Database & Backend) |
| **September** | Phase 7 (Admin Panel)                                          |
| **October**   | Phase 8 (Public Pages), Phase 9 (PWA)                          |
| **November**  | Phase 10 (SEO), Phase 11 (Infrastructure)                      |
| **December**  | Phase 12 (Launch Preparation)                                  |
| **January**   | Launch                                                         |
| **February**  | Phase 13 (Stabilisation)                                       |
| **March**     | Phase 14 (Handover)                                            |

_Adjust based on actual start date and available resources._

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

_Nexus Platform — Kannangara ICT Society (KITS)_

---
