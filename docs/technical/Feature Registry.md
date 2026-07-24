# Nexus — Complete Feature Registry

**C.W.W. Kannangara Central College Digital Platform** _Kannangara ICT Society (KITS) · Mathugama_

This document is the single authoritative list of every feature, system, and capability that Nexus will include. Every item here has a home in the Engineering Roadmap. Nothing is built that is not listed here. Nothing listed here is omitted from the build.

---

## How to Read This Document

Each feature has:

- A **stable number** (never changes, even if order shifts)
- A **name**
- A **brief explanation** of what it is and why it exists

Features are grouped by concern. The build order is defined in the **Engineering Roadmap** — not by the order items appear here.

---

## Group 1 — Monorepo & Developer Tooling

**F-001 · pnpm Monorepo with Nx Orchestration** The entire project lives in one repository managed by pnpm workspaces. Nx provides task caching (build, lint, typecheck) and affected commands so only changed packages rebuild. This keeps developer iteration fast as the codebase grows.

**F-002 · Shared TypeScript Base Configuration** A single `tsconfig.base.json` at the root defines strict TypeScript options (strict mode, `noImplicitReturns`, `noUnusedLocals`) and path aliases for all packages (`@nexus/ui`, `@nexus/api`, `@nexus/db`, `@nexus/config`, `@nexus/contracts`). Every app and package extends this base — one change propagates everywhere.

**F-003 · Root TypeScript Project References** The root `tsconfig.json` holds project references to every app and package. This enables incremental compilation across the monorepo — TypeScript only recompiles what changed.

**F-004 · Shared ESLint Configuration** A root `eslint.config.mjs` enforces consistent rules across all packages and apps: no unused variables, no implicit any, consistent import ordering, no console statements in production. Each package extends this base and adds package-specific rules.

**F-005 · Prettier Code Formatting** Prettier with a shared `.prettierrc` and `.prettierignore` enforces consistent formatting across every file in the monorepo. No debates about spacing or quotes — the formatter decides.

**F-006 · EditorConfig** A `.editorconfig` at the root ensures consistent indentation, line endings, and charset across editors and operating systems. Prevents invisible whitespace bugs when multiple developers work on the same files.

**F-007 · Environment Variable Documentation** `.env.example` files in the root and in each app document every required environment variable with its purpose and source. A developer who has never seen the project can know exactly what secrets are needed without reading the codebase.

**F-008 · Automated Dependency Vulnerability Scanning** `pnpm audit` runs in the GitHub Actions CI pipeline on every push. Any high-severity vulnerability in a third-party dependency fails the build and surfaces as a required fix before merging.

**F-009 · GitHub Actions CI Pipeline** A `.github/workflows/ci.yml` workflow runs on every push and pull request: TypeScript typecheck, ESLint lint, and a production build of both apps. No broken TypeScript or lint errors can merge to main.

**F-010 · GitHub Actions CD Pipeline** A `.github/workflows/deploy.yml` workflow runs on push to `main`: builds Docker images, pushes to GitHub Container Registry, SSHes into the Hetzner server, pulls new images, and restarts services with zero-downtime deployment. Every deployment is automatic, auditable, and reversible.

**F-011 · Build-Time Automation Framework** Scripts in `packages/config/scripts/` automate repetitive generation tasks. This feature covers the infrastructure: the script runner, watch mode, and the convention for how generation scripts are structured and triggered. Two specific outputs live under this umbrella: the token CSS generator (F-019) and the `cn`group generator that creates the typed class name utility. Running these ensures generated output is always in sync with source definitions.

---

## Group 2 — Design System Tokens (`packages/config`)

**F-012 · Color Token System** The complete institutional color palette defined as named tokens: forest greens (primary brand), parchment tones (content surfaces), gold accents, glass overlays, semantic colors (success, warning, error, info), and text hierarchy (primary, secondary, muted, inverted). No hardcoded hex values anywhere in the codebase after this is established.

**F-013 · Typography Token System** Typeface definitions and the complete type scale as tokens: Cormorant Garamond for display, Inter for body, IBM Plex Mono for code, Maname for Sinhala display, Noto Serif Sinhala for Sinhala body, Noto Serif Tamil for Tamil. Scale covers display sizes down to caption, with defined line heights, letter spacing, and weights at every step.

**F-014 · Trilingual CSS Variable Font Stack** Rather than per-component font classes, a single `--font-family-display` and `--font-family-body` CSS variable is composed from Next.js font variables. The browser automatically selects the correct typeface based on character unicode range. Zero per-component font management — add Tamil text anywhere and the right font loads automatically.

**F-015 · Spacing and Sizing Token System** Every margin, padding, gap, width, and height in the platform comes from a consistent scale based on a 4px unit. Arbitrary pixel values are banned. This is what makes the UI feel visually coherent — users perceive it even if they cannot articulate it.

**F-016 · Motion Token System** Animation tokens define durations (fast, base, slow, ceremonial) and easing functions (standard, decelerate, accelerate, `ceremonial` ember). Every animation in the platform draws from these tokens so the institutional feel — deliberate, dignified, never playful — is consistent without per-developer judgment calls.

**F-017 · Utility & Effect Token System** Focus ring tokens (for keyboard navigation visibility), opacity scale, blur scale, border radius scale, z-index scale, aspect ratio tokens, and gradient definitions. Together with the above, these cover every visual dimension a component might need. Grouped as "utility and effect" because each family serves a distinct CSS concern (interactivity, visual depth, layout, layering) while sharing the common trait of not belonging to color, typography, spacing, or motion.

**F-018 · Tailwind nexusPreset** A single Tailwind preset in `packages/config` maps every token into Tailwind's theme. Both `apps/web` and `apps/admin` consume this preset — one source of truth for the entire visual language expressed as utility classes.

**F-019 · tokens.css Generator** A script reads the TypeScript token definitions and generates a `tokens.css` file containing every token as a CSS custom property. This file is imported once in each app's `global.css`. Tokens are defined in TypeScript (type-safe, auditable) and consumed in CSS (zero runtime cost). This is one specific deliverable under the Build-Time Automation Framework (F-011); the automation infrastructure itself belongs to F-011, while this feature describes the concrete output and the script that produces it.

**Depends on:** F-011 (Build-Time Automation Framework) — the token CSS generator is one script within the F-011 automation infrastructure.

**F-020 · Design System Viewer** Interactive documentation pages in `apps/admin/src/app/design-system/` covering every token category and every component. Serves as a live reference for developers and a demonstration tool for the principal presentation. Only exists in admin — never ships to the public site.

---

## Group 3 — Component Library (`packages/ui`)

**F-021 · Atom Components** The smallest building blocks: Button, ButtonLink, Badge, Avatar, Tag, InlineHelpText. Every other component is built from these or alongside them. Each has TypeScript props, ARIA attributes, design token usage only, and all variants from the design system.

**F-022 · Spinner Components** BeatLoader, ScaleLoader, BarLoader — animated with Framer Motion. Used wherever asynchronous operations run. Institutional character: subtle, not aggressive.

**F-023 · Form Components** The complete form system: Input, Select, Textarea, Checkbox, Radio, Toggle, Slider, FileUploadZone, Calendar, FormFieldGroup, FormErrorMessage, FormValidationSummary, RequirementsChecklist, ProgressIndicator. Used in both the public contact forms and the entire admin panel. Built once in `packages/ui`, identical quality everywhere.

**F-024 · Card Components** Every card variant: NewsCard, StaffCard (principal, grid, and compact variants), EventCard, SocietyCard, SocietyBanner, FacilityCard, GalleryAlbumCard, AchievementCard, ExtracurricularCard, AcademicStreamCard, StatCard, DownloadableDocumentItem. Cards are the primary display format for database content on the public site.

**F-025 · Layout Components** Structural components: Container (content width constraints), Grid (responsive), Hero (background, overlay, content slots), Navigation (mobile menu, locale switcher, scroll behaviour), Footer (identity strip, links, social icons), Stack, MasonryGrid, QuickAccessPortal.

**F-026 · Brand Components** CrestAnimation (hero variant with entrance animation; loading variant for transitions — the defining visual of the platform), CrestDiagram (interactive explainer with labelled parts), SchoolLogo. Built from official SVG artwork, not approximated. The crest animation: single deliberate sweep, settles — institutional, not decorative.

**F-027 · Social Media Icon Components** All social icons as React SVG components from official brand kits: Facebook (color, white), Instagram (glyph gradient, glyph black, glyph white), LinkedIn (black, color, inline color, white), YouTube (black, color, inline variants, white), WhatsApp (glyph black, green, white; stacked variants), GitHub (Invertocat and lockup variants). Never icon fonts or third-party libraries for brand icons.

**F-028 · Icon Registry System** `Icon.tsx` and `registry.ts` provide a unified icon API across the component library. A named `<Icon name="search" />` pattern means no direct Lucide imports scattered throughout the codebase, and the icon set can be swapped or extended in one place.

**F-029 · Visualization Components** DataTable (sortable, paginated), ComparisonBar (stream comparison), ProgressArc, StudentJourneyFlow, StreamComparisonTable, TimetableGrid, ProcessSteps. Serve the academic and institutional data needs of the platform.

**F-030 · Page State Components** LoadingScreen (with CrestAnimation), LoadingSkeleton (content placeholders), ErrorState (inline and section variants), EmptyState, NotFound, OfflineBanner, CookieConsentBanner. Every possible application state has a designed response — no user ever sees a blank white screen or unhandled browser error.

**F-031 · Notification Components** Alert (inline messaging), Toast (transient feedback), AnnouncementBanner (urgent school-wide communications at the top of every page). The AnnouncementBanner is how the school publishes urgent information — exam dates, closures — to all visitors.

**F-032 · Overlay Components** Modal, Drawer, DropDownMenu, ShareSheet, ToolTip. All handle focus trapping, keyboard navigation, and scroll locking correctly. Used throughout both admin and public interfaces.

**F-033 · Navigation Components** Accordion, Breadcrumb, FilterBar, LanguageSwitcher, MobileMenu, NavLink, Pagination, SearchInput, TableOfContents, Tabs. The navigation system must work correctly in all three languages and across all device sizes.

**F-034 · Media Components** AudioPlayer (school anthem), Caption, ImageFrame, Lightbox (gallery), MapEmbed, PanoramicFacilityViewer, VideoFrame. Handle all rich media types the platform needs with consistent design treatment.

**F-035 · Section Components** Generic page-section composition components used across the public website: Section, SectionHeader, SectionContainer, SectionGrid, SectionSlider, StatsStrip, Timeline. These components provide layout structure but contain no school-specific business logic or content.

**F-036 · Public Domain Components** School-specific composite components used by public pages, located under `apps/web/src/components/domain/`: PrincipalMessage, AchievementTicker, AdmissionsProcessSteps, AdmissionsKeyDatesTimeline, AlumniLegacyBlock, LifeAtKCCPhotoStrip, and section components for Admissions, Alumni, and Achievement presentation.

**F-037 · Typography Components** EyebrowLabel, Heading, InlineLink, QuoteBlock, RichTextRenderer, SectionHeader, Text. Enforce consistent typographic treatment — a developer never hardcodes a font size or picks a heading level arbitrarily.

**F-038 · Utility Components** BackToTopButton, CountdownTimer, ScrollProgressBar. Small quality-of-life additions that add polish to the public experience.

**F-039 · AmbientEmbers Effect** A subtle particle effect used in specific hero contexts. Reinforces the `ember` motion token aesthetic — the living warmth of an institution, not a visual gimmick.

**F-040 · Shared Hooks** `useCountUp` (animated number counting for statistics), `useInView` (intersection observer for scroll-triggered animations), `useActiveSection` (scroll tracking for navigation highlighting), `useScrollDirection` (show/hide navigation bar), `useMediaQuery`, `useLocalStorage`, `useFormField`. Consumed by components throughout the library.

**F-041 · Utility** The `cn()` function combines `clsx` and `tailwind-merge`. Allows conditional class names without Tailwind conflicts. Used in virtually every component.

---

## Group 4 — Contracts: Primitives, System & Shared Utilities (`packages/contracts/src/primitives`, `packages/contracts/src/system`, `packages/contracts/src/utils`, `packages/contracts/src/constants`)

_Renamed from "Core & Common" — the `core/` folder this group used to describe no longer exists. It split into `primitives/` (the shared atoms) and `system/` (cross-cutting platform contracts), and two folders that didn't exist under the old model, `utils/` and `constants/`, now live alongside them._

**F-042 · Common Primitive Schemas** `primitives/`: enums (`link-target`, `priority`, `publish-status`, `sort-direction`, `visibility`), media (`audio`, `document`, `image` + `avatar`, `video`), plus `locale`, `localized-text`, `pagination`, `rich-text`, `link`, `seo`, and `address`. The shared atoms every block, page, editorial, and domain schema composes from. There is no standalone `date` primitive — dates are plain validated strings inline wherever they're needed, not a shared schema. Also home to `utils/` (`assertNever`, `buildLookupRecord`, `isLocalized`, `normalizeRichText` — small runtime helpers the registry and lookup layers are built on top of, not Zod schemas themselves) and `constants/` (`DEFAULT_PAGE_SIZE`, `MAX_GALLERY_IMAGES`, `MIN_PASSWORD_LENGTH`, `DEFAULT_UPLOAD_LIMIT`, `MAX_RICH_TEXT_LENGTH`, `MAX_TITLE_LENGTH`, `MAX_DESCRIPTION_LENGTH`) — validation limits deliberately owned here rather than in `@nexus/config`, so any downstream package can import a limit without pulling in config's build tooling.

**F-043 · CMS Core Contracts** `system/cms/`: `ContentEntrySchema` (`content-entry.ts`) and `ContentEntryVersionSchema` (`content-entry-version.ts`) — the runtime row shapes, kept in sync with the Prisma models — plus `FieldDefinitionSchema` / `FieldTypeEnum` (`field-definition.ts`: text, textarea, richtext, number, boolean, select, multiselect, image, date, url, email, array, object) so the admin dynamic form builder knows what to render without re-deriving it from raw Zod introspection. The originally-planned separate `FieldMeta` type never materialized as its own thing — `FieldDefinitionSchema` is the whole contract. `RendererKey` / `RendererMap` also never got built here: the only renderer-mapping that exists anywhere in the package is `BLOCK_RENDERER_MAP` over in `blocks/block-registry.ts`, and that file's own header says it's a backward-compatible stopgap meant to be removed once the content-type system (F-197) is finished — contracts still has no proper renderer-mapping contract living where this feature originally placed it.

**F-044 · Typed API Envelope Contracts** `system/api/`: `ErrorEnvelopeSchema` / `ErrorCodeEnum` (`error-envelope.ts` — unchanged: `NOT_FOUND`, `VALIDATION_ERROR`, `UNAUTHORIZED`, `FORBIDDEN`, `CONFLICT`, `INTERNAL_ERROR`) and `ResponseEnvelopeSchema` / `PaginatedResponseEnvelopeSchema` (`response-envelope.ts` — a generic `{ success, data, error }` wrapper, with the paginated variant adding `items` + `meta`). Renamed from "Typed API Boundary Contracts" because that's no longer an accurate description: none of the per-procedure input/output schemas this feature originally promised (`CreateContentEntryInput`, `GetByScopeInput`, `GetSiteSettingInput`, `RequestUploadUrlInput`) exist anywhere in the package. What actually got built is the generic envelope and error-code vocabulary every router response shares — a real, useful layer, just a smaller and different one than originally scoped. Where (or whether) per-procedure input schemas will live is an open question this entry previously papered over.

**F-045 · Auth, RBAC & Storage Contracts (scaffolded)** `system/auth/` (`UserSchema` in `user.ts`, `SessionSchema` in `session.ts`), `system/rbac/` (renamed from "permissions": `RoleEnum` + `RoleAssignmentSchema` in `role.ts`, `PermissionSchema` in `permission.ts`), `system/storage/` (`ObjectKeySchema` in `object-key.ts`, `UploadFolderEnum` / `UploadRequestSchema` / `UploadResultSchema` in `upload.ts`, the latter now wired to `DEFAULT_UPLOAD_LIMIT` from F-042's `constants/`). Still explicitly not implemented — placeholders so Google Workspace OAuth (F-073), role-based access control (F-075), and the upload pipeline can be built against a stable contract without redesigning the package mid-build.

**F-046 · Content Workflow Transition Contract (scaffolded)** `system/cms/workflow-state.ts`: a single `WorkflowTransitionSchema` (`from`, `to`, `triggeredBy`), built directly on the existing four-state `PublishStatusEnum` from `primitives/enums/publish-status.ts` (`draft` / `in-review` / `published` / `archived`). This is a real scope reduction from the original plan, not just a rename: the five-state `ContentStatus` (`draft` → `in_review` → `approved` → `published` → `archived`) and the `ApprovalRequest` / `ApprovalDecision` shapes for a two-person submit-then-approve pipeline were never built — nothing beyond the plain transition record exists. Whether a real approval tier is still wanted, or the four-state model is now the permanent answer, is an open decision this entry was quietly assuming away.

---

## Group 5 — Contracts: Reusable Content Block Library (`packages/contracts/src/blocks`)

**F-047 · Reusable Content Block Schemas** 20 Zod schemas covering every placeable section type, now split across two folders that make the reusability claim explicit instead of asserting it for all 20: `generic/` (8, genuinely page-agnostic — `hero`, `stats`, `cta`, `faq`, `quote`, `downloads`, `announcement`, `rich-text-block`) and `page-specific/` (12, each tied to one page's content shape — `anthem`, `contact-info`, `crest-symbol`, `gallery`, `key-dates`, `map`, `photo-strip`, `process-steps`, `results-display`, `staff-grid`, `timeline`, `values-grid`). Both folders export identically from one barrel and share a single closed `BlockTypeEnum` — now 22 values, not 20, since `footer` and `navigation` (F-053's global sections, not page sections) were folded into the same enum. Renamed since the original list: `members` → `staff-grid`, `richText` → `rich-text-block`, `crest` → `crest-symbols`, `values` → `values-grid` — though the underlying Zod export names (`MembersSchema`, `CrestSchema`, `ValuesSchema`) still carry the pre-rename names, so the rename is only half-applied even in the code, not just in old docs. `RendererKey` (F-043) never actually keyed off this list (see F-043); the registry's section definitions (F-052) do, with caveats — see that entry.

**Depends on:** F-042 (Common Primitive Schemas) — several blocks (contact-info, gallery) compose address, image, and media primitives rather than redefining them.

---

## Group 6 — Contracts: Editorial, Shared Display & Domain Schemas (`packages/contracts/src/editorial`, `packages/contracts/src/shared`, `packages/contracts/src/domains`)

_Renamed from "Editorial & Domain Schemas" — the `content/` and `school/` folders it used to describe are now `editorial/` and `domains/`, and a third folder, `shared/`, was carved out of the old `content/` for the display primitives that don't belong in either._

**F-048 · Editorial Content Schemas** `editorial/`: News (article, category, featured), Events (event, category, calendar), Gallery (album, photo), Achievements (achievement, ticker-config) — unchanged in substance, just relocated. A block describes how a chunk of UI is shaped; an editorial schema describes a real recurring entity with its own identity, list views, and lifecycle. **The Events sub-entry described here (a standalone `EventSchema` sitting alongside a separate `CalendarEntrySchema`) is superseded by F-198.** The two were never actually unified in the codebase — `CalendarEntrySchema` (`calendar.ts`) and `EventSchema` (`event.ts`) exist side by side with no relationship field between them, despite `calendar.ts`'s own header comment already claiming "the events page and home page upcoming strip both read from this." F-198 is the real design for how every dated item on the site — not just what most people would call an "event" — is meant to work.

**F-049 · Shared Display Primitives** `shared/`: table-of-contents sections (`toc-section.ts`), filter options (`filter-option.ts`), a video-source enum (`video-source.ts`), a lightbox image shape derived via `.pick()` from the primitives `Image` schema (`lightbox-image.ts`), and search results (`search-result.ts`). Renamed from "Display & Interaction Contracts" and narrower than that name implied: there is no separate stats/stat-card shape here (stats lives solely in the `stats` block, F-047) and no process-steps/journey-node shape here either (process steps exist as both a block, F-047, and a domain schema, F-051, for admissions specifically) — this folder doesn't own either concept.

**F-050 · Admin Form Schema Variants (not yet built)** No `.omit()` / `.extend()` admin create/edit form variants exist anywhere in the package yet — not for News, Staff, Events, or anything else. The pattern that has actually emerged is a different one: a `*Card` schema derived from a full domain entity via `.omit()` for compact public-facing views (see `StaffCardSchema` under F-051) — trimming an entity for display, not shaping a form's client-side validation surface. The two may end up sharing the same `.omit()`/`.extend()` mechanics, but nothing serving the admin-form use case has been written.

**F-051 · Domain Type Contracts** `domains/`: academics (curriculum, department, subject, A/L stream, stream-comparison), admissions (key dates, process steps, eligibility requirements — no `application` schema exists), contact (contact-form, feedback-form), extracurriculars (activity, achievement), facilities (facility-profile, panoramic-viewer), people (staff-member, principal-profile, alumni — no `student` schema exists; prefects, who are students, are modeled as a `head-prefect` value on `StaffRoleEnum` instead), results (A/L aggregate statistics, O/L aggregate statistics, display), societies (society-profile, membership, society-achievement), and core school identity (`school-identity.ts` — today just a flat, hand-written `SchoolSchema`; the "assembled at runtime from Site Settings" idea depends on F-054, which hasn't been built). Several entities here now follow a `*Card` derivation pattern — a full entity schema plus a `.omit()`-derived `*CardSchema` for compact views, e.g. `StaffSchema` / `StaffCardSchema` — rather than a hand-written card shape.

**F-198 · Calendar-First Event Architecture** The school calendar is the single source of truth for every dated item on the platform — holidays, exam dates, sports fixtures, cultural events, internal meetings, prize-givings, anything with a date. Nothing reaches the public site as an "event" through any path except a `CalendarEntry` row; there is no separate manual event-listing mechanism anywhere in the admin panel. Every `CalendarEntry` (`editorial/events/calendar.ts`) carries `id`, `title`, `date`, `category` (the existing `EventCategorySchema` from `editorial/events/category.ts`), and the existing optional recurrence fields (`isRecurring`, `recurrenceRule`, `notes`). Creating one is a single form with one fork, made at the point of creation: **(1) calendar-only** — the entry is saved as-is and appears on the calendar grid and nowhere else; or **(2) calendar + event card** — the same save additionally creates a linked `EventDetail` row (`slug`, `description`, `coverImage`, `location`, `isAllDay`, `registrationUrl` — the fields the current standalone `EventSchema` in `event.ts` already defines, now attached to a `CalendarEntry` by id instead of existing as its own independent entity) which is what produces an `EventCard` (F-024) projection and a routable detail page (F-146). A calendar-only entry — a public holiday, an internal staff meeting — is never rendered as a card and never gets a detail route, because there is nothing in it meant for public display beyond a date and a label.

**Depends on:** F-047 (block library — `EventCardSchema`'s projection is consumed the same way any block-rendered card is), F-048 (Editorial Content Schemas — this feature supersedes the Events sub-entry described there).

**Current state, honestly:** this is a design decision recorded here to close a real gap, not a description of code that already works this way. As of this revision, `CalendarEntrySchema` and `EventSchema` are two unconnected schemas in the same `editorial/events/` folder — no field on either references the other. Implementing F-198 means adding the relationship (an `eventDetailId` on `CalendarEntry`, or equivalently a required `calendarEntryId` on what `event.ts` currently calls `EventSchema`, renamed `EventDetailSchema`), updating the Events Module (F-166) to present the single two-branch creation form instead of two separate flows, and updating the Events Listing Page (F-145) and Event Detail Page (F-146) to read accordingly. No Prisma model changes are implied beyond this — both concepts already live under the same `ContentEntry` foundation (`editorial:calendar` scope per `calendar.ts`'s own comment); this is a contracts-and-UI change, not a new database table.

---

## Group 7 — Contracts: Page & Global Content Registry (`packages/contracts/src/registry`)

**F-052 · Page Registry** One `PageRegistry` entry per public page (about, academics, administration, admissions, contact, events, extracurriculars, facilities, gallery, home, news, results, societies — unchanged, still 13, still matches `PAGE_KEY_VALUES`): a `scope` (`page:<key>`), a label, and an ordered list of `PageSection`s, each declaring a `sectionKey`, a `blockKey`, and the `schema` that actually validates it. Section order is still fixed by array order. Still supersedes the old `PageConfig` model and `pageConfigRouter`, both removed entirely.

**Known gap, not yet resolved:** the model assumes every section's `blockKey` names the F-047 block-library schema that validates it — true for roughly half of all section entries across the 13 pages. The rest (36 of ~74 sections at last count, spanning at least academics, administration, contact, and facilities) use bespoke, page-specific composite schemas — e.g. academics' `AcademicsStreamCardsSchema`, which assembles domain schemas like `ALStreamSchema` and has nothing to do with rich text — but are declared `blockKey: 'rich-text-block'` regardless, since `PageSection.blockKey` only accepts `BlockTypeEnumData` and there's no "custom" option. This satisfies the type-checker but is functionally wrong: anything that keys off `blockKey` to choose a renderer (i.e. `BLOCK_RENDERER_MAP`) would render these sections as plain rich text instead of whatever bespoke shape they actually hold. The `schema` field itself is correct in every case — `blockKey` is the field that lies. This needs a real design decision (a genuine `blockKey: 'custom'`, or dropping `blockKey` from `PageSection` in favor of some other renderer-selection mechanism) before anything downstream trusts `blockKey` for more than the schema lookup it happens to work for today.

**Depends on:** F-047 (Reusable Content Block Schemas) for the sections that do use a block-library schema directly — see the known gap above for the rest.

**F-053 · Global Content Registry** Site-wide content that isn't scoped to a single page: Navigation (nav links with one level of dropdown children) and Footer (link columns, social links, contact lines, copyright). One correction to how this is keyed: sections use dot-notation scopes (`global.navigation`, `global.footer`), not the colon notation (`global:navigation`) this feature has always described — page scopes (`page:academics`) do use colons, so the two scope families aren't actually written the same way despite sharing the word "scope." Still lets nav and footer be edited through the same `ContentEntry` system as page content instead of living in hardcoded component defaults.

**F-054 · Site Settings Registry (not yet built)** None of this exists yet — no typed key registry, no `GetSiteSettingInput` / `UpdateSiteSettingInput` / `SiteSettingOutput` / `BulkGetSiteSettingsInput` schemas anywhere in the package. The only trace of the idea is a comment in `domains/identity/school-identity.ts` noting `SchoolSchema` is meant to be "assembled from SiteSettings" — but `SchoolSchema` is just a flat, hand-written shape today, not assembled from anything. F-066 (Site Settings Router) has correctly said "planned" all along; this entry should have matched that status and didn't.

**F-055 · Registry Helper Functions** `getPageDefinition()` (renamed from the originally-planned `getPageRegistry()`), `getSectionDefinition()`, `getGlobalSection()`, `getAllSectionSchemas()`, `getGlobalSectionSchemas()` — merge the page and global registries into the lookup tables the ContentEntry Router (F-065) uses. Three more helpers have since been added that this entry never covered — `getContentSchema()`, `getContentTypeDefinition()`, `getContentTypesByCategory()` — these belong to the newer content-type layer; see F-197.

**F-196 · Section-Level Content Ownership (not planned)** The original architecture review proposed an `ownerRoles` / `ownerGroups` / `editableBy` field on `SectionDefinition` or `PageRegistry` entries, so that e.g. only Science Society staff could edit `page:societies#science` while the Principal could edit anything. This is explicitly **not** built and has no target phase — access control today is coarse-grained (F-075: Admin vs. Editor, platform-wide), and content ownership is handled organisationally, not technically, via F-192 (Content Governance Document) and the roles/users system (F-075, F-171). Recorded here only so the idea isn't lost if per-department delegated editing is ever needed; it is not a commitment to build it.

**F-197 · Content-Type Registry (in progress)** `registry/content-type-key.ts` plus the second half of `registry/lookup.ts`: a `ContentTypeKeyEnum` unioning every block type (F-047) with every editorial (F-048) and domain (F-051) content-type identifier, plus `BLOCK_SCHEMA_MAP` (all 22 block-level schemas keyed by `BlockTypeEnumData`) and query helpers (`getContentSchema`, `getContentTypeDefinition`, `getContentTypesByCategory`). Its own in-code comments describe the end state: this is meant to replace `block-registry.ts`'s `BLOCK_RENDERER_MAP`, which currently leaks UI component names (`'HeroBlock'`, `'StaffGridBlock'`, and so on) into the contracts package — the exact renderer-knowledge-in-contracts anti-pattern this system exists to retire — once editorial and domain content types are mapped in too. Today only the block-type slice is actually mapped: editorial and domain content types are enumerated in `ContentTypeKeyEnum` but have no entry in `BLOCK_SCHEMA_MAP` or any renderer map yet, and `getContentTypesByCategory('editorial' | 'domain')` currently just returns an empty array. Not documented anywhere before this revision, despite already being exported from the package's public `registry/index.ts`.

_A `@nexus/contracts-restricted` package, isolating PII-bearing schemas at the workspace-boundary level, was considered during this revision and deliberately not pursued — no entry for it is recorded here._

---

## Group 8 — Database (`packages/database`)

**F-056 · Current Prisma Schema: ContentEntry, ContentEntryVersion, SiteSetting** The schema currently contains exactly these three models — the CMS foundation, not yet the full platform. `ContentEntry` is keyed by the compound unique `(scope, sectionKey, locale)`, carries a `status` (`draft` / `published` / `archived`, default `draft`), a `contentType` column that preserves the developer's original intent even if the registry's mapping changes later, a `version` counter, and a JSON `data` payload. `ContentEntryVersion` snapshots the prior `data` and `version` every time a row is overwritten, cascading on delete. `SiteSetting` is keyed by `(key, locale)`, with `locale` allowed to be the literal string `'global'` for values that aren't translatable, like URLs.

**F-057 · Deferred Domain Models** `User`, `News`, `Staff`, `Society`, `Event`, `GalleryAlbum`, `GalleryPhoto`, `Achievement`, `AlumniProfile`, `MediaAsset`, `AuditLog`, and `NotificationQueue` do not exist in the schema yet. This is intentional: rather than re-introduce the full old domain model wholesale, each is added back one module at a time as that module is rebuilt on top of the `ContentEntry` foundation. The admin dashboard (F-163) and the root tRPC router (F-064) currently reference only the three models in F-056 — any feature elsewhere in this registry that depends on one of these deferred models is not yet buildable.

**F-058 · Prisma Client Singleton** A properly initialised Prisma client with the singleton pattern for Next.js (prevents connection exhaustion in development with hot reload). Exported as the single `db` import used everywhere in the backend.

**F-059 · Database Migrations** Every schema change gets a Prisma migration file. Migration files are committed to the repository and never edited. The full migration history is the complete record of how the schema evolved — including the migration that dropped the old `PageContent` / `PageContentVersion` / `PageConfig` models in favour of F-056.

**F-060 · Database Seed Script** Seeds `ContentEntry` rows for the pages that have been migrated onto the new foundation (currently: About, across all three locales), idempotently upserted on the `(scope, sectionKey, locale)` unique key. Seeding the initial admin user, default roles, and permissions is deferred along with the `User` model (F-057) and will be added back to this script once Google Workspace OAuth access control exists.

**F-061 · Automated Database Backups** Production databases are automatically backed up on a scheduled basis, stored off-site, encrypted at rest, retained according to policy, and periodically tested for successful restoration. Implementation details (tooling, storage provider, schedule, retention period) are defined in the Infrastructure documentation.

**F-062 · Automated Database Cleanup Tasks** Scheduled jobs remove technical debris: expired sessions, expired authentication tokens, and temporary upload artifacts. Content is never touched by automated cleanup. Media asset cleanup is intentionally excluded from automation — the risk of inadvertently deleting a still-referenced asset outweighs the storage savings. Sessions and tokens don't exist in the schema yet (F-057); this job activates once Auth.js is wired up.

**F-063 · Status-Based Archiving Pattern** `ContentEntry` has no separate `deletedAt` column; archiving is expressed through the same `status` field used for the publish workflow (F-072) — setting `status` to `'archived'` removes a section from public view without deleting the row or its version history (F-056). A dedicated soft-delete column is reconsidered for the deferred domain models (F-057) if any of them need a "removed" state that a status enum doesn't capture cleanly, such as a hard moderation reject.

---

## Group 9 — API Layer (`packages/api`)

**F-064 · tRPC Server Setup** tRPC router initialisation with context (`db`, plus `adminSecret`: a raw `x-admin-secret` header value, not yet a real session). Two procedure tiers today: `publicProcedure` for unauthenticated reads, and `adminProcedure` — built on an `authMiddleware` that checks the header against `ADMIN_API_SECRET` — for everything else, with `adminMutation`layering an `auditMiddleware` on top that writes to `AuditLog` on every mutation. This is an explicit bootstrap stub; the code itself documents that it's ready to accept a real Auth.js session once Google Workspace OAuth (F-073) lands, at which point the tier model can grow back toward public/protected/admin. `auditMiddleware` does not yet function correctly: it writes to `ctx.db.auditLog`, which doesn't exist until F-057 adds the model back.

**F-065 · ContentEntry Router** `contentEntryRouter`, replacing the deleted `pageContentRouter` (which referenced the now-gone `pageContent` Prisma model). Procedures: `getByScope` (public, published-only, English fallback for missing locales), `adminGetByScope` (admin, all statuses, used by the editor to show draft/published badges), `getVersionHistory` (admin, last 30 snapshots), `update` (admin, validates against the registry's merged schema lookup from F-055, snapshots the prior version, then upserts with the requested `status`), and `setStatus` (admin, changes publish state without touching content). Built so it never needs to know in advance which page or global a `sectionKey` belongs to.

**Depends on:** F-056 (Current Prisma Schema), F-055 (Registry Helper Functions), F-064 (tRPC Server Setup).

**F-066 · Site Settings Router (planned)** Contracts already exist (F-044: `GetSiteSettingInput` / `UpdateSiteSettingInput` / `SiteSettingOutput` / `BulkGetSiteSettingsInput`) and the registry (F-054), but the router itself is not implemented or mounted yet. The Settings Module (F-174) and the public site's footer/contact rendering both wait on this.

**F-067 · Media Upload Router (planned)** Contracts already exist (F-044) for the presigned-URL R2 upload flow: request a presigned PUT URL, upload directly to R2 from the browser, then confirm the upload to register the asset. Router not yet implemented; the Media Library (F-169) depends on it.

**F-068 · System Routers (planned)** `auditRouter`, `userRouter`, `notificationRouter`. Deferred until their backing models (`AuditLog`, `User`, `NotificationQueue` — see F-057) exist. The former `pageConfigRouter` is not part of this list: section ordering is now defined entirely by the Page Registry (F-052) and is not admin-configurable at runtime.

**F-069 · Domain Content Routers (planned)** `newsRouter`, `staffRouter`, `eventsRouter`, `societiesRouter`, `galleryRouter`, `achievementsRouter`, `alumniRouter`, `mediaRouter`. Stub files documenting each router's intended procedures already exist; none are implemented or mounted yet — they wait on their Prisma models (F-057) and, where relevant, the editorial content schemas (F-048).

**F-070 · Input Validation on Every Procedure** Every tRPC procedure that accepts input validates it against the corresponding `@nexus/contracts` schema (package renamed from `@nexus/validation`). Invalid input is rejected with a typed error (F-044) before touching the database.

**F-071 · Rate Limiting** API-level rate limiting protects public endpoints against abuse. The contact form and general API routes are capped at appropriate thresholds. Implementation is deployment-dependent — acceptable approaches include Cloudflare WAF rules, Upstash Redis, or Next.js middleware. In-memory limits must not be used in a multi-instance deployment as they become inconsistent across instances.

**F-072 · Draft/Publish/Archive Workflow** Live today: every `ContentEntry` row carries a `status` of `draft`, `published`, or `archived`(default `draft`). `getByScope` (public) only ever returns `published` rows; `adminGetByScope` returns everything so the editor can show status badges. `setStatus` changes status without touching content, and `update` snapshots the prior version (F-056) before overwriting regardless of status, so a draft-in-progress is never lost either. This is the three-state workflow actually wired up; F-046 covers the more elaborate five-state review/approval workflow that's contracted but not yet built on top of it.

**Depends on:** F-056 (Current Prisma Schema), F-065 (ContentEntry Router).

**F-195 · ContentEntry Cache & Revalidation** Public reads of `ContentEntry` data (via the per-page typed fetchers described in F-141–F-161) are wrapped in Next.js Data Cache with a tag equal to the entry's `scope` (e.g. `page:about`, `global:navigation`). `ContentEntry.update` (F-065) calls `revalidateTag(scope)` after a successful write, so published changes are reflected on the public site on the next request without a redeploy or a fixed TTL. This is the caching mechanism the original CMS architecture specified from the outset; it lacked its own entry because it had been treated as an implementation detail of F-065 rather than a distinct behaviour worth tracking.

**Depends on:** F-065 (ContentEntry Router) — `update` is what triggers invalidation; F-056 (`scope` is the cache tag key).

_Numbered out of sequence — appended at the end of the registry per the stable-number rule (see How to Read This Document), rather than renumbering Group 9, since it was identified after F-001–F-194 were already assigned._

---

## Group 10 — Authentication & Access Control

**F-073 · Google Workspace OAuth via Auth.js** Auth.js (NextAuth) configured with the Google provider as the primary sign-in method, restricted to the school's `@cwwkcc.lk` Google Workspace domain. Domain is verified server-side in the `signIn` callback — never trust the `hd` claim alone, since it can be spoofed outside a genuine Workspace flow. Sessions are stored in the database via the Prisma adapter.

**F-074 · Invite-Based Access Control** Successfully authenticating with Google is not sufficient on its own. An existing Admin must first add a colleague's `@cwwkcc.lk` email to the User table with an assigned role; only then does that person's Google sign-in succeed past the application's own check. Nexus's User table — not the school's Google directory — is the actual source of truth for who has access, and revoking access never depends on the school's IT department.

**F-075 · Role-Based Access Control** Two roles: Admin (full access to all modules, user management, settings) and Editor (create and edit content, cannot manage users, cannot access settings, cannot delete published content). Role is checked in tRPC procedures and in admin UI conditionally rendering controls.

**F-076 · Admin Route Protection Middleware** Next.js middleware on `apps/admin` checks for a valid Auth.js session on every request to any route except `/login`. Unauthenticated requests are redirected to `/login`. The public site has no authentication layer.

**F-077 · Admin Login Page** A "Sign in with Google" button restricted to `@cwwkcc.lk`, with a clear rejection message — not a generic error — for any account outside the domain. A separate, deliberately unadvertised path leads to the break-glass credentials login (F-078), used only for bootstrap and recovery.

**F-078 · Break-Glass Admin Account** One Credentials-based super-admin account, seeded from environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, bcrypt-hashed) at first deploy. Used only to invite the first real `@cwwkcc.lk`admins at launch, and for emergency recovery if Google OAuth becomes unavailable — a Workspace misconfiguration, an OAuth app restriction, a Google outage. Protected by its own TOTP requirement (F-080), since it is the one path that bypasses Google's account security entirely.

**Depends on:** F-080 (TOTP Two-Factor Authentication) — TOTP must be implemented before this account can be safely used in production. The break-glass account has elevated privilege precisely because it bypasses Google; leaving it unprotected by a second factor before launch is a security hole, not a temporary gap.

**F-079 · Break-Glass Password Rotation** The break-glass account has no self-service "forgot password" email flow — an internet-facing reset surface on the platform's single highest-privilege bypass account is a liability, not a convenience. If the break-glass password is lost, it is rotated via a server-side CLI script run over SSH, re-hashing a new password directly into the database.

**Depends on:** F-078 (Break-Glass Admin Account) — this feature is the rotation procedure for the account established by F-078; it has no meaning without it.

**F-080 · TOTP Two-Factor Authentication** Applies only to the break-glass account (F-078) — every other admin's account security is inherited from the school's own Google Workspace 2FA enforcement, a setting controlled entirely outside Nexus by the school's Google Admin console. TOTP via standard authenticator apps (Google Authenticator, Authy, 1Password); ten single-use backup codes generated at setup are the only recovery path if the device protecting the break-glass account is lost.

**Depends on:** F-078 (Break-Glass Admin Account) — TOTP is not used anywhere else in the platform; this feature exists solely to protect the break-glass account. F-078 defines the account; F-080 secures it. Both must be complete before production launch.

**F-081 · User Deactivation** Admin users are never deleted from the database — they are deactivated (a boolean flag). Deactivated users cannot log in, regardless of whether their underlying Google account is still active. Their records are retained so the audit log remains meaningful — every action is still traceable to a real person.

**F-082 · Secret Management** All credentials (database URL, Auth.js secret, Google OAuth client ID and secret, R2 keys, Resend API key) live in environment variables. Never committed to the repository. `.env.example` documents what is needed. GitHub repository secrets hold CI/CD values. Production secrets live in `.env` on the Hetzner server.

---

## Group 11 — Internationalisation

**F-083 · next-intl Locale Routing** Three locale routes: `/en/`, `/si/`, `/ta/`. The routing is defined in `packages/web/src/i18n/routing.ts`. Every public page is available in all three languages. The admin panel is English-only.

**F-084 · Per-Feature Message Files** Translation strings are split into separate JSON files per locale per feature area: navigation, common, home, about, news, events, societies, facilities, admissions, contact, gallery. This prevents a single massive translation file and allows partial updates without touching unrelated strings.

**F-085 · Complete English Translations** All message keys for all feature areas filled in English. English is the baseline — every key that exists in English must exist in the other locales.

**F-086 · Complete Sinhala Translations** All message keys translated into Sinhala by a native speaker. Machine translation is used for drafts only — a human native speaker reviews all strings before launch.

**F-087 · Complete Tamil Translations** All message keys translated into Tamil by a native speaker. Same quality process as Sinhala.

**F-088 · Automatic Locale Fallback** If a translation key is missing for a locale, the system falls back to English rather than crashing. Missing keys surface as build warnings so they can be tracked and filled before launch.

**F-089 · LanguageSwitcher Component** A component on every page that switches the locale while preserving the current page path. Stores the user's preference. Works correctly with dynamic routes (a user reading a news article in English can switch to Sinhala and stay on the same article).

---

## Group 12 — Error Handling & Resilience

**F-090 · Locale-Level Error Boundary** `error.tsx` at the `[locale]` layout level in `apps/web`. Any component crash within a page renders the `ErrorState` component with a retry button instead of a broken or blank page. Users always get a designed response.

**F-091 · Root-Level Error Boundary** `global-error.tsx` at the root layout level in both apps. Catches crashes in the root layout itself (font loading failure, token CSS failure). Uses raw inline styles — no design system imports, because the system that loads the design system is what failed. A last line of defence.

**F-092 · Designed 404 Page** `not-found.tsx` in both apps with the institutional visual treatment — CrestAnimation, a clear message, and a link back to the home page. A 404 should feel like the school, not like a browser default.

**F-093 · Section-Level Error Boundaries** React `ErrorBoundary` wrappers around major page sections (News, Gallery) so a failure in one section does not take down the whole page. A user can still read the rest of the page if the gallery section fails to load.

**F-094 · OfflineBanner** Detects when the user loses network connectivity and shows a non-blocking banner explaining that some content may be unavailable. Disappears automatically when connectivity is restored. Relevant given the network conditions in the Mathugama area.

---

## Group 13 — Logging & Monitoring

**F-095 · Audit Logging** Every write operation in the tRPC API creates an immutable audit log entry: who performed the action, what entity was affected, what the before and after values were, when. The log is append-only — no entry is ever edited or deleted. Answers "who changed this and when" for any piece of content.

**F-096 · Audit Log Viewer** A read-only admin panel module showing the full audit log with filters by user, entity type, action type, and date range. Individual entries show the diff of changed fields. Never editable.

**F-097 · Structured Server-Side Logging** Server-side operations log structured events (not `console.log`). Log levels (info, warn, error) allow filtering. Errors include stack traces. Logs are readable via `docker logs` in production.

**F-098 · UptimeRobot Monitoring** UptimeRobot checks `cwwkcc.lk` and `admin.cwwkcc.lk` every 5 minutes. Sends email alerts to the KITS lead and on-call developer when either goes down. Free tier is sufficient.

**F-099 · Optional Sentry Error Tracking** Sentry integration configured via `SENTRY_DSN` environment variable. When set, unhandled errors in both apps are reported to Sentry with full context (user session, request details, stack trace). Optional — the platform functions without it, but it significantly accelerates debugging.

**F-100 · Docker Healthchecks** Each Docker service defines a healthcheck. The compose orchestrator restarts unhealthy containers automatically. The deployment script waits for containers to report healthy before marking a deployment successful.

---

## Group 14 — Analytics

**F-101 · Umami Self-Hosted Analytics** Umami runs as a Docker container on the same Hetzner server. Privacy-first, GDPR-friendly, no third-party JavaScript on the public site. Data stays on school-controlled infrastructure. Provides page views, referrers, device split, and locale distribution out of the box.

**F-102 · Analytics Dashboard** Admin panel module displaying Umami data: total page views by day/week/month, top pages with trend indicators, content performance (views per article), locale distribution, device split.

**Depends on:** F-101 (Umami Self-Hosted Analytics) — the dashboard surfaces data from Umami; F-101 must be running and collecting data before this module is meaningful.

---

## Group 15 — SEO & Discoverability

**F-103 · generateMetadata for Every Page** The root layout provides baseline metadata. Every page type overrides with specifics: news articles include headline, author, publication date; events include start date and location; staff profiles include name and role. Every page has a unique title and description.

**F-104 · JSON-LD Structured Data** Schema.org markup for every relevant content type: EducationalOrganization (school), NewsArticle, Event, Person (staff), WebApplication. Correct structured data enables rich results and knowledge panels in Google Search.

**F-105 · Dynamic Sitemap** `sitemap.ts` using Next.js conventions generates a sitemap covering all static pages and all dynamic pages (every news article, society, gallery album). Submitted to Google Search Console and Bing Webmaster Tools.

**F-106 · robots.txt** Allows indexing of all public pages. Disallows the admin panel and API routes.

**F-107 · Sitemap Ping on Content Publish** When a news article or event is published, the sitemap is regenerated and a ping is sent to search engines. New content is discoverable within hours, not the next crawl cycle.

**F-108 · Open Graph Image Generation** Programmatically generated OG images for all page types using Next.js image generation. When a page is shared on social media, the preview shows a branded image rather than a blank placeholder.

---

## Group 16 — Performance

**F-109 · next/image for All Images** Every image on the public site uses `next/image` with explicit dimensions, blur placeholder, and responsive `sizes`. Prevents layout shift, enables lazy loading, and automatically serves WebP.

**F-110 · Dynamic Imports for Heavy Components** CrestAnimation, AudioPlayer, the Tiptap rich text editor, and PanoramicFacilityViewer are dynamically imported. The initial page bundle does not include these until they are needed. Reduces Time to Interactive on first load.

**F-111 · Package Import Optimisation** `optimizePackageImports` in `next.config.js` for `@nexus/ui` and `framer-motion`. Only imported components are bundled — not the entire library.

**F-112 · Static Generation for Content Pages** `generateStaticParams` for news articles, society pages, and gallery albums. These pages are pre-rendered at build time and served from the CDN edge. Database is not queried on every visitor request.

**F-113 · Cloudflare R2 CDN for Media** All images and PDFs served from Cloudflare R2 with edge caching. Zero egress fees. Global delivery. The school's media assets load fast regardless of where in the world a visitor is.

**F-114 · Performance Budget Monitoring** Lighthouse CI runs in GitHub Actions on every build. Fails if Performance, Accessibility, Best Practices, or SEO scores drop below 90 on mobile. Prevents performance regressions from silently shipping.

**F-115 · Image Optimisation Pipeline** Images uploaded through the admin panel are processed with Sharp before upload to R2: resized to maximum required display dimensions, converted to WebP, stripped of EXIF metadata. Smaller files, faster loads, no private metadata leaking.

---

## Group 17 — Infrastructure & Deployment

**F-116 · Multi-Stage Dockerfiles** Dockerfiles for both apps use multi-stage builds: install and build stage, then a minimal runtime stage with only the compiled output. Production images are small, fast to pull, and contain no build tools.

**F-117 · Docker Compose Orchestration** `docker-compose.yml` defines five services: postgres, nexus-web, nexus-admin, umami, caddy. Named volumes for persistence. Environment variable references for secrets. Health checks and restart policies on every service.

**Depends on:** F-116 (Multi-Stage Dockerfiles) — the compose file references the images produced by the Dockerfiles; the images must exist before compose can orchestrate them.

**F-118 · Caddy Reverse Proxy with Automatic HTTPS** Caddy routes `cwwkcc.lk` to nexus-web and `admin.cwwkcc.lk` to nexus-admin. Provisions and renews TLS certificates automatically via Let's Encrypt. No manual certificate management ever.

**F-119 · Hetzner CX22 VPS** The production server: 2 vCPU, 4GB RAM, 40GB SSD. Self-hosted. School-controlled. No vendor lock-in beyond the hosting provider.

**F-120 · Cloudflare R2 Media Storage** Object storage for all uploaded media. Presigned URLs mean the browser uploads directly to R2 — the Next.js server is never in the upload path. No egress fees. S3-compatible API.

**F-121 · Resend Transactional Email** Email sending for contact form notifications, feedback form acknowledgements, and admin password reset. Free tier (3,000 emails/month) is more than sufficient. Simple REST API, no SMTP configuration.

**F-122 · Security Headers via Caddy** Strict-Transport-Security (HSTS), Content-Security-Policy, X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy (strict-origin-when-cross-origin). Configured once in Caddyfile, applies to all traffic.

**F-123 · Server Firewall** `ufw` allows only ports 80 (HTTP), 443 (HTTPS), and 22 (SSH). All other ports blocked. The PostgreSQL port is never exposed to the public internet — only accessible within the Docker internal network.

**F-124 · SSH Key Authentication** Password-based SSH login disabled on the Hetzner server. Only SSH key holders can access the machine. A deployment user with minimal permissions handles automated deployments.

**F-125 · GitHub Container Registry** Docker images are pushed to GitHub Container Registry (GHCR) as part of the CD pipeline. The production server pulls from GHCR. Images are versioned by commit SHA — any deployment can be rolled back to a specific image.

---

## Group 18 — Security

**F-126 · Security Architecture Principles** Least privilege, defence in depth, secure defaults, deny-by-default access controls. Every significant security decision is documented in an ADR. Security properties are first-class concerns, not afterthoughts.

**F-127 · Content Security Policy** A strict CSP prevents inline script execution and limits external resource loading to approved origins only. Defined in the Caddy configuration and tested against each app's actual resource usage.

**F-128 · CSRF Protection** All state-changing operations are protected against Cross-Site Request Forgery. Auth.js provides baseline protection; all non-idempotent API calls verify origin and session integrity.

**F-129 · Secure Session Management** Secure cookies, HttpOnly, SameSite protection, session expiration policies, and forced session invalidation on user deactivation. A deactivated user's existing sessions are immediately invalidated — they cannot complete in-flight requests after deactivation.

**F-130 · File Upload Security** Every file uploaded through the admin panel is validated before storage: MIME type validation, extension validation, file size limits, rejection of dangerous file types, and metadata stripping via Sharp. Teachers and students will upload files — the pipeline must be safe by default.

**F-131 · Server-Side Authorization Verification** Every write operation verifies authorization server-side, regardless of what the UI shows. A user without the required role cannot perform an action even by calling the API directly. Hidden UI controls are never a substitute for server-side checks.

**F-132 · Security Audit Trail** Security-sensitive actions receive enhanced logging separate from normal content edits: login events, failed login attempts, role changes, user deactivation, permission changes, and break-glass account usage.

**F-133 · Dependency Security Monitoring** Automated dependency vulnerability scanning (F-008) is the detection mechanism. This feature covers the remediation process: a documented procedure for triaging, assessing, and resolving dependency vulnerabilities before they are exploited.

**F-134 · Backup Encryption** Database backups and media backups are encrypted before off-site storage. Encryption keys are stored separately from the backups themselves.

**F-135 · Secrets Rotation Procedures** Documented process for rotating credentials — Auth.js secret, OAuth credentials, R2 access keys, database passwords, Resend API key — without service downtime. Rotation is scheduled periodically and triggered immediately on any suspected compromise.

**F-136 · Security Incident Response Plan** Documented procedure covering every incident type: compromised account, lost admin device, exposed secret, server intrusion. Defines who is contacted, what is done first, and how recovery is verified. Completed before production launch.

**F-137 · Security Review Before Launch** A formal pre-launch checklist covering authentication, authorization, file uploads, secrets management, backup integrity, security headers, rate limiting, and the break-glass account. Signed off before any public traffic is served.

---

## Group 19 — Testing

**F-138 · Unit Tests** Vitest unit tests for shared utilities and hooks in `packages/ui`: `useCountUp`, `useInView`, `cn`, form validation logic. Pure functions are the easiest to test and the most valuable — they run on every component render.

**F-139 · Integration Tests** Integration tests for tRPC API routes against a test database. Verifies that authentication, validation, and data persistence work correctly end-to-end through the API layer — not just in isolation.

**F-140 · End-to-End Tests** Playwright E2E tests covering the critical user journeys: submitting the contact form, switching locale, navigating between pages, searching for content. These run in CI against a built version of the app.

---

## Group 20 — Public Website (`apps/web`)

**F-141 · Home Page** Hero with CrestAnimation, headline, and call to action. Statistics Strip with animated counters. Principal's Message. Latest News (three most recent published articles). Upcoming Events (next three). Quick Access Portal (links to Admissions, Societies, Gallery). Announcement Banner when active. Section order is fixed by this page's entry in the Page Registry (F-052) — code, not a runtime-configurable setting.

**F-142 · About Page** Hero. Stats. Namesake section (C.W.W. Kannangara portrait and biography). School story. Timeline. Ethos. Values. Interactive CrestDiagram. Alumni Legacy. School Anthem with AudioPlayer. Closing statement. The centrepiece of the platform — complete before the principal presentation.

**F-143 · News Listing Page** All published news articles with category filter, pagination, and search. Server-rendered with static generation for each category. Metadata for SEO.

**F-144 · News Article Page** Individual article with rich text rendering via RichTextRenderer, author attribution, publication date, related articles, social sharing via ShareSheet. Statically generated at build time. OG metadata per article.

**F-145 · Events / School Calendar Listing Page** One page, two views, over a single dataset: every `CalendarEntry` (F-198), filterable by category and month. The calendar view renders every entry — a school holiday and a prize-giving are equally present on the grid. The list view renders only entries with a linked `EventDetail` as a full `EventCard` (title, date, venue, cover image where set); entries without one are never listed as cards, since there's no detail page for a card to link to. Upcoming and past are distinguished by date, not by a separate status field. There is no page-level manual event list independent of the calendar — nothing reaches this page except through a `CalendarEntry` row.

**F-146 · Event Detail Page** Full event description, date, time, venue, category, optional registration link. Map embed for venue location. Exists only for a `CalendarEntry` that was given an `EventDetail` (F-198) — a calendar-only entry (a holiday, an exam date, an internal meeting) has no detail page and no route resolves for it. The page renders from the `CalendarEntry` plus its linked `EventDetail`, not from a standalone `Event` row.

**F-147 · Societies Hub** All societies with category filter. Each society shown as a SocietyCard. High-engagement page for current students.

**F-148 · Society Detail Page** Banner, description, advisor StaffCard, founding year, member count, recent events, gallery preview.

**F-149 · Facilities Page** FacilityCard grid for all school facilities. Content managed through admin. Descriptions and photos updatable without a developer.

**F-150 · Admissions Page** Admissions process via ProcessSteps. Key dates via AdmissionsKeyDatesTimeline (sourced from Events table). Requirements. ContactForm for admissions enquiries.

**F-151 · Gallery Listing Page** Albums sorted by year. GalleryAlbumCard for each. Year-based filtering.

**F-152 · Gallery Album Page** Photo grid with Lightbox for full-screen viewing. All images via `next/image`. Alt text on every photo.

**F-153 · Contact Page** ContactForm wired to Resend. FeedbackForm for general feedback. Both rate-limited. Both validate on client and server using Zod schemas.

**F-154 · Alumni Directory** Searchable by graduation year, profession, country. Shows name, year, position, quote — no private contact information. Submission form for new profiles enters an admin approval queue. Builds the school's network over time.

**F-155 · Digital Archive** Historical photographs, old annual magazines (PDFs with searchable metadata), prize-giving records, prefect lists by year. Browsable by year, searchable by full-text. Unique institutional value — a 150-year-old school with a properly organised digital memory.

**F-156 · Achievement Database** Academic achievements (A/L results, university admissions), sports (tournament wins, national athletes), arts and cultural, competition results. Filterable by year, category, student name. Updated each year, becoming a permanent living record.

**F-157 · Unified Search** Single search box accessible from every page via Navigation. Queries across all content types simultaneously. PostgreSQL full-text search supporting Sinhala, Tamil, and English. Results grouped by type, ranked by relevance. New content types automatically searchable.

**F-158 · Cookie Consent Banner** CookieConsentBanner shown on first visit. Persisted to localStorage. GDPR-compliant: no analytics cookies set before consent. The school serves an international diaspora — compliance matters.

**F-159 · Academics Page** Academic streams (Bio Science, Physical Science, Commerce, Arts, Technology) via AcademicStreamCard, with subject lists and StreamComparisonTable for side-by-side comparison. Stream descriptions are editable via the Academic Programs admin screen (F-178); the set of streams itself is fixed by the national A/L system, not a create/delete list.

**F-160 · Administration Page** A role-grouped view of the existing Staff Module (F-165): Principal, Vice Principals, Heads of Department, and Board of Management, each shown via StaffCard, plus an AdvisoryBoardSection for the Board specifically. No new admin module — administrators are entered as staff like anyone else; this page is a filtered query, not a new content type.

**F-161 · Extracurriculars Page** Sports teams and co-curricular activities (cricket, athletics, scouting, cadetting) via ExtracurricularCard — distinct from Societies (F-147/F-148), which covers academic and interest clubs. Includes an ExtracurricularsJoinCTA section.

---

## Group 21 — Admin Panel (`apps/admin`)

**F-162 · Admin Shell Layout** Persistent sidebar navigation, topbar with user avatar and session info, breadcrumb navigation, responsive mobile drawer. Every admin module lives inside this shell. The shell is the first thing built — before any module.

**F-163 · Dashboard** Every page from the Page Registry (F-052) listed with a per-page fill status (Empty / Partially Filled / Complete), computed from its sections' `ContentEntry` status rows — this is the `/admin/content` page-list view the original CMS architecture specified. Below it: section counts by status (total/published/draft `ContentEntry` rows) platform-wide, a feed of recent `ContentEntryVersion` saves, and quick links into each page editor. Audit-log activity and pending-moderation summaries (unapproved alumni profiles, and similar) are added back once their backing models exist (see Deferred Domain Models) — the dashboard only queries models present in the current schema.

**F-164 · News Module** List view with status badges, search and filter by category and date, bulk actions. Create/edit with Tiptap rich text editor, cover image via media library, category, status workflow (draft → review → published → archived), SEO preview. Validates against `NewsArticleSchema`.

**Depends on:** F-057 (Deferred Domain Models — News doesn't exist in the schema yet), F-069 (Domain Content Routers), F-050 (Admin Form Schema Variants).

**F-165 · Staff Module** List sorted by role hierarchy. Create/edit with name, title, role, department, tenure, quote, portrait via media library. Drag-and-drop reorder (the `order` field controls public site display sequence).

**F-166 · Calendar & Events Module** Calendar view and list view over `CalendarEntry` rows (F-198). Every entry starts the same way — pick a date, a title, a category — then the editor makes one choice: **save as calendar-only** (the entry appears on the calendar and nowhere else), or **add event details** (the same save additionally opens the description, cover image, venue, and registration-link fields that create the linked `EventDetail`, publishing an `EventCard` and a detail page at F-146). There is no separate, disconnected "create an event" flow — every public-facing event on the site originates from this one calendar-entry form. Status workflow (draft → published → archived) applies to the `EventDetail` half only; a calendar-only entry has no publish state of its own, since it was never a piece of content meant for standalone review.

**F-167 · Societies Module** Create/edit with name, slug, category, tagline, description, member count, founding year, logo upload, banner upload, advisor staff member selection.

**F-168 · Gallery Module** Album creation with title, year, category, cover photo selection. Batch photo upload to R2 with progress indicators. Per-photo alt text (required). Album reordering.

**F-169 · Media Library** Grid view of all uploaded assets with search and tag filtering. Sharp-processed upload (resize + WebP). Alt text editing. Usage tracking (which content uses each asset). Bulk delete with usage warning. The central asset management system.

**F-170 · Analytics Dashboard Module** The Umami analytics interface in admin: views by day/week/month, top pages, content performance, locale and device distribution.

**F-171 · User Management Module** List all admin users with roles. Invite new users by adding their `@cwwkcc.lk` email to the allowlist (F-074) — they then sign in with their own Google account, no password to set or reset. Role assignment. User deactivation. Roles enforced — an Editor cannot access this module.

**F-172 · Announcements Module** Create announcements with variant (info, warning, error), message, publish date, optional expiry. View active and past. Deactivate or expire. Simple and deliberate — not a full notification platform.

**F-173 · Audit Log Viewer Module** Chronological feed of all admin actions. Filters by user, entity type, action, date range. Per-entry diff of changed fields. Read-only. The transparency layer of the platform.

**F-174 · Settings Module** Global platform settings — school name, address, contact details, social URLs, founding year, motto — edited as `SiteSetting` rows rather than a one-off settings table. Each field validates against its registered schema (F-054) before saving. Read by the public site for footer, JSON-LD, and metadata. Changes here propagate everywhere without a code deploy.

**Depends on:** F-054 (Site Settings Registry), F-066 (Site Settings Router — not yet implemented; this module has nothing to call until it exists).

**F-175 · Content Preview Mode** Editors can see a live preview of draft content before publishing. Preview is accessible only to authenticated admin users. The public site never shows draft content to unauthenticated visitors.

**F-176 · Content Versioning** Every published content edit creates a version snapshot. Editors can view the version history of any article and revert to a previous state. Prevents accidental content loss.

**F-177 · ContentEntry Module** Admin interface for editing `ContentEntry` rows by scope: section list per scope (`page:about`, `global:navigation`, and similar), with a rich text editor for prose blocks, a repeatable-list editor for timeline/crest/FAQ-style sections, and structured forms for short fields, driven by the FieldDefinition/FieldMeta metadata from F-043 rather than per-entity hand-built forms. Locale switcher per section. Status controls (draft/publish/archive) call `setStatus` directly without re-saving content. Every save versioned via F-056's snapshot pattern, viewable and revertible the same way as News (F-176). Supersedes the old page-only "Page Content Module" concept — scope generalises beyond pages to any `global:*` or future entity-scoped content.

**Depends on:** F-056 (Current Prisma Schema), F-065 (ContentEntry Router), F-043 (CMS Core Contracts — FieldDefinition/FieldMeta drive the form, not Admin Form Schema Variants).

**F-178 · Academic Programs Admin Screen** Config-style, not a CRUD module — the same editing pattern as Settings (F-174). A fixed set of stream entries with editable description, subject list, image, and contact department. No create, no delete, no draft/publish workflow, no versioning — streams don't get added or removed by content editors, only their descriptive content changes.

**F-179 · Extracurriculars Module** Full CRUD, identical shape to the Societies Module (F-167): name, category, description, coach/advisor via staff selection, achievements, photo, active/inactive status. Unlike Academic Programs, activities genuinely get added and retired over the years.

**F-180 · Alumni Module** Two entry paths into one list: admin-direct entry for building the initial alumni dataset, and public submissions awaiting moderation. Filterable by status (pending/approved/rejected), graduation year, profession. Approve publishes immediately to the public directory; reject discards with an optional logged reason. Editable before approving, since public submissions may be incomplete. The Dashboard's pending-items count (F-163) links directly into this module's pending filter.

**F-181 · Achievement Module** CRUD for the Achievement Database (F-156): student name, category (academic/sports/arts/competition), achievement level, description, year, optional photo, optional link to a related News article. Same simple create/edit/delete shape as Events — no draft/review workflow.

**F-182 · Digital Archive Module** Curated content layer over the Media Library (F-169), not a replacement for it. Each entry has a title, year, category (photograph/magazine/prize-giving record/prefect list), description, and a file uploaded through the standard Media Library pipeline. Year and category are what the public Digital Archive page (F-155) filters and full-text-searches by — the Media Library alone has no concept of "this PDF is the 1987 prefects list."

**F-183 · Facilities Module** Full CRUD, lighter than Societies: name, category, description, photo(s), display order. Unlike Academic Programs, the facility list isn't nationally fixed — the school adds a new lab or renovates a building and should be able to reflect that without a developer.

---

## Group 22 — PWA & Offline Support

**F-184 · Service Worker** Caches the shell (navigation, footer, CSS, fonts) on first load. Caches home and about pages for offline access. Network-first strategy for dynamic pages (news, events) with a cached fallback. Implemented with `next-pwa` or a custom service worker.

**F-185 · Web App Manifest** `manifest.json` with school name, icons in all required sizes (192px, 512px, maskable), theme color matching the design system, display mode `standalone`. Enables "Add to Home Screen" — the platform appears as an app icon on mobile.

**F-186 · Designed Offline Page** A cached offline page shown when a user attempts to visit an uncached page without connectivity. Institutional design treatment, links to cached pages that are available. No browser default error.

---

## Group 23 — Comprehensive Project Documentation

**F-187 · Architecture Decision Records (ADRs)** `docs/adr/` contains a record for every significant technical choice: ADR-001 Monorepo, ADR-002 Next.js App Router, ADR-003 PostgreSQL, ADR-004 tRPC, ADR-005 Zod Contracts Strategy (renamed from "Zod Validation Strategy" — the package it documents is now `packages/contracts`), ADR-006 R2 Storage, ADR-007 Analytics, ADR-008 Multilingual Font Architecture, ADR-009 ContentEntry Architecture (renamed from "Page Content Architecture" — the model it documents is now `ContentEntry`/`ContentEntryVersion`/`SiteSetting`, not `PageContent`). A new ADR is expected to cover the Page & Global Content Registry split once that design settles. Each ADR documents context, decision, alternatives considered, and consequences. Written once, never edited — reversals get new ADRs. The reasoning behind every architectural decision survives developer turnover.

**F-188 · Developer Knowledge Map** `docs/Developer Knowledge Map.md` — a curriculum covering every technology used in the platform, why it is used, and what a new developer needs to understand about it. A completely new developer can read this and understand what they need to learn before touching the codebase.

**F-189 · Engineering Roadmap** `docs/Engineering Roadmap.md` — the complete phased build plan with every task, the reason for each task, and the correct order. The authoritative guide for what to build next and why. Updated as phases complete.

**F-190 · Operational Runbook** `docs/operations/Runbook.md` — step-by-step instructions for every operation a maintainer might need: deploy a change, roll back a bad deployment, restore from backup, add a new admin user, add a new language, debug a failing API route, renew a TLS certificate, scale the server.

**F-191 · Disaster Recovery Plan** `docs/operations/Disaster Recovery.md` — documented recovery procedures for every failure mode: server failure, database corruption, accidental content deletion, domain loss, GitHub repository loss, R2 storage failure. Includes estimated recovery times and contact responsibilities. Every procedure has been tested before handover.

**F-192 · Content Governance Document** `docs/governance/Content Governance.md` — signed by the principal. Defines who owns each content type (News, Events, Gallery, Staff, Archive, Announcements) and what their publishing responsibilities are. Without this, the platform becomes a dead website within six months of developer graduation.

**F-193 · Design System Documentation** `docs/Design System/` — Foundations.md (design principles, color, typography, spacing, motion), Tokens Reference.md (every token value), Page Specifications.md (every page's sections, components, data sources), Component Reference.md (every component's props and usage). A designer or developer can understand the entire visual system without asking anyone.

**F-194 · Complete Trilingual Content Documentation** Documentation of the translation workflow: how to add a new translation key, how to request a review from a native speaker, how to handle strings that have no direct translation, how to test a locale in development. Includes a glossary of institutional terms in all three languages (school motto, titles, department names) so translations are consistent across the platform.

---

## Summary Table

| Group                                                            | Range                | Count   |
| ---------------------------------------------------------------- | -------------------- | ------- |
| Monorepo & Developer Tooling                                     | F-001 – F-011        | 11      |
| Design System Tokens                                             | F-012 – F-020        | 9       |
| Component Library                                                | F-021 – F-041        | 21      |
| Contracts: Primitives, System & Shared Utilities                 | F-042 – F-046        | 5       |
| Contracts: Reusable Content Block Library                        | F-047 – F-047        | 1       |
| Contracts: Editorial, Shared Display & Domain Schemas            | F-048 – F-051        | 4       |
| Contracts: Editorial, Shared Display & Domain Schemas (addendum) | F-198                | 1       |
| Contracts: Page & Global Content Registry                        | F-052 – F-055        | 4       |
| Database                                                         | F-056 – F-063        | 8       |
| API Layer                                                        | F-064 – F-072, F-195 | 10      |
| Authentication & Access Control                                  | F-073 – F-082        | 10      |
| Internationalisation                                             | F-083 – F-089        | 7       |
| Error Handling & Resilience                                      | F-090 – F-094        | 5       |
| Logging & Monitoring                                             | F-095 – F-100        | 6       |
| Analytics                                                        | F-101 – F-102        | 2       |
| SEO & Discoverability                                            | F-103 – F-108        | 6       |
| Performance                                                      | F-109 – F-115        | 7       |
| Infrastructure & Deployment                                      | F-116 – F-125        | 10      |
| Security                                                         | F-126 – F-137        | 12      |
| Testing                                                          | F-138 – F-140        | 3       |
| Public Website                                                   | F-141 – F-161        | 21      |
| Admin Panel                                                      | F-162 – F-183        | 22      |
| PWA & Offline Support                                            | F-184 – F-186        | 3       |
| Comprehensive Project Documentation                              | F-187 – F-194        | 8       |
| Contracts: Page & Global Content Registry (addendum)             | F-196 – F-197        | 2       |
| **Total**                                                        |                      | **198** |