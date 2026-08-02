# Nexus — Completion Plan (Track B: Engineering)

**Status:** Phase 5 approval secured (Task 5.4) — clear to build

the backend phase. **Scope of this document:** Track B only (engineering). Track A (content collection per Task 5.5 / Appendix C.4) runs in parallel on its own timeline and isn't tracked here. **Convention:** task/feature numbers reference `docs/technical/Engineering Roadmap.md` and `docs/technical/Feature Registry.md`. Check items off as they land — mirrors the `docs/TODO.md` style you're already using.

---

## M0 — Close out Phase 3/4 (in flight)

- [x] Work through remaining `docs/TODO.md` items, prioritizing real type-contract issues first
  - [x] `FacilityCard.tsx` — properly typed with contracts, no issues found
  - [x] `SocietyCard.tsx` — properly typed with contracts, no issues found
  - [x] `StaffCard.tsx` — properly typed with contracts, no issues found
  - [x] `StatCard.tsx` — properly typed with contracts, no issues found
  - [x] `ImageFrame.tsx` — properly typed with contracts, no issues found
- [x] Re-verify `CrestDiagram.tsx` — checked off in `docs/TODO.md` but layout bugs are still open; fix and confirm, or uncheck until actually clean — Fixed `w-size-screen-80` → `w-size-screen-w-80` (token name was incorrect)
- [x] Finish clearing type errors surfaced by the `@ts-nocheck` removal (removal itself is done — confirmed zero occurrences left in the repo) — Typecheck passes with zero errors across entire monorepo
- [ ] Decide the social-icon consolidation question flagged in `docs/TODO.md` (33 variants → single prop-driven `SocialIcon`, or keep as-is) — low priority, can run in background

---

## M0.5 — `packages/ui/src/components/sections/` architecture cleanup

Decision made: split generic reusable primitives from page-narrative-specific blocks. Do this before M1 — everything downstream imports from `ui/`, so cleaner now than after 40 more components depend on the current names.

- [x] **Delete** `sections/AdmissionsProcessSteps.tsx` — confirmed duplicate of `visualization/ProcessSteps.tsx`
- [x] Update any references to the deleted component to import `ProcessSteps` from `visualization/` instead
- [x] **Rename** `AlumniLegacyBlock` → `ProfileCarousel`
  - [x] Update export in `sections/index.ts`
  - [x] Update import in `apps/web/src/blocks/about/AlumniLegacy.tsx`
- [x] **Rename/merge** `AdmissionsKeyDatesTimeline` — either fold into `Timeline` as a variant, or rename to something generic (e.g. `MilestoneTimeline`) and keep separate
  - [x] Update export in `sections/index.ts`
  - [x] Update consuming imports
- [x] **Rename** `PrincipalMessage` → `LeaderMessage` (or `SpotlightMessage`)
  - [x] Update export in `sections/index.ts`
  - [x] Update consuming imports
- [x] **Rename** `LifeAtKCCPhotoStrip` → `CategorizedPhotoStrip`
  - [x] Refactor to use `ImageFrame` instead of raw `next/image`
  - [x] Update export in `sections/index.ts`
  - [x] Update consuming imports
- [x] **Relocate** `SectionErrorBoundary` out of `sections/` into `page-states/` or `utilities/`
  - [x] Update export path in the moved-to folder's `index.ts`
  - [x] Remove from `sections/index.ts`
  - [x] Update consuming imports
- [x] Build `apps/web/src/blocks/admissions/ProcessBlock.tsx` as a thin wrapper around the consolidated `ProcessSteps`(currently a stub)
- [x] Build `apps/web/src/blocks/admissions/RequirementsBlock.tsx` (currently a stub)
- [x] Sweep the rest of `sections/` (and spot-check other categories) for the same smell — any other component named after a page/content concept instead of its UI shape

---

## M1a — Auth infrastructure (no Google dependency)

Everything here can be built and tested now, without external access.

- [x] Add `User`, `Account`, `Session`, `VerificationToken` models to `schema.prisma` (Auth.js adapter shape)
- [x] Write and run the migration
- [x] Wire Auth.js with a stand-in provider (Credentials/dev login) so the flow is testable end-to-end locally
- [x] Define RBAC roles/permissions (Admin, Editor, etc.)
- [x] Seed the break-glass admin account + TOTP (Task 6.5 — doesn't need Google)
- [x] Replace `apps/admin/src/middleware.ts` pass-through with real redirect-to-`/login` logic
- [x] Build `SessionProvider.tsx` for real
- [x] Build the real `login/page.tsx` (currently a stub) — dev-provider sign-in for now, Google button added in M1b
- [x] Upgrade `packages/api`'s `authMiddleware` from the `x-admin-secret` header check to real session-based auth
- [x] Fix `auditMiddleware` (currently writes to a nonexistent `ctx.db.auditLog` — will resolve once the `AuditLog` model lands in M5, but wire the logic now)

**Exit criteria:** a dev/break-glass login reaches a protected dashboard; an unauthenticated request is redirected.

> **Verification note (2026-07-31):** Migration SQL was hand-verified against a real local PostgreSQL 16 instance (this sandbox has no network route to `binaries.prisma.sh`, so `prisma generate`/`migrate dev` couldn't be run directly here — run `pnpm db:generate && pnpm db:migrate` on a machine with normal network access to produce the tracked Prisma Client and confirm the migration name Prisma assigns). Password/TOTP/backup-code logic was verified standalone against the real `bcryptjs`/`otplib`/`qrcode` packages. `packages/contracts`, `packages/env`, and `packages/config` were fully typechecked and pass. The full `packages/api`/`apps/admin` typecheck and test suite still need to run once the Prisma Client is generated — do that before treating this milestone as done-done.

> **Addendum (2026-08-02):** the migration referenced above was never actually committed — `schema.prisma` had `User`/`Account`/`Session`/`VerificationToken`/`BackupCode` declared, but `packages/database/prisma/migrations/` only ever contained `20260712053043_init` (ContentEntry/ContentEntryVersion/SiteSetting). Found and fixed while starting M3, since it would otherwise conflate this milestone's schema drift with News's in whatever migration got generated next. Added `20260713090000_add_auth_models` to cover it retroactively. Same "hand-verified, not machine-run" caveat as above applies to this migration file too.

---

## M2 — Admin Shell (Task 7.1–7.2)

- [x] Build `AdminShell.tsx` layout for real
- [x] Build `Sidebar.tsx` — role-aware (hide User Management from Editors)
- [x] Build `Topbar.tsx`
- [x] Build `Breadcrumb.tsx`
- [x] Build the dashboard (`dashboard/page.tsx`) — content counts + quick actions first pass (audit-entries panel can wait for M5)

> **Addendum (2026-08-02):** `AdminShell`/`Sidebar`/`Topbar`/`Breadcrumb` (and `login/page.tsx`, adjacent) were hand-rolling raw Tailwind slate/green classes instead of `@nexus/tokens` — root cause is that `getDarkTheme()`/`getLightTheme()`/`getHighContrastTheme()` in `packages/tokens/src/themes/` are literal `throw new Error(...)` stubs, and the generated CSS variables are identical (and light-only) across both apps, so there was no working dark theme to follow. Fixed these four files plus `login/page.tsx` to use the real (parchment/forest) semantic tokens instead. **Not fixed:** `dashboard/page.tsx`, the `content/` admin editor, and the `design-system/` showcase pages still have the same raw-Tailwind pattern — a real dark theme, if still wanted for admin, is its own separate piece of work (CSS-variable wiring + `getDarkTheme()` + a `data-theme` switch), not a quick follow-on to this.

---

## M3 — First vertical slice: News (Task 7.3 / 8.4, F-057, F-069)

Build this one completely before parallelizing — it's the template every later module copies.

- [x] Add `News` model to `schema.prisma`, write migration
- [x] Build `newsRouter` in `packages/api/src/modules/news/` (`router.ts`, `service.ts`, `validators.ts`, `errors.ts`, tests) — mirror the existing `content` module's shape
- [x] Build admin News list view (status badges, search, category/date filter, bulk publish/archive/delete)
- [x] Build admin News new/edit forms
- [ ] Get `apps/admin/e2e/news-crud.spec.ts` passing against the real implementation
- [x] Wire public News listing page (`apps/web/src/app/[locale]/news/page.tsx`)
- [x] Wire public News detail page (`apps/web/src/app/[locale]/news/[slug]/page.tsx`)
- [ ] Verify a published article renders correctly in all three locales

**Exit criteria:** an editor can create, publish, and see an article live on the public site in all three languages, with the e2e spec passing in CI.

> **Verification note (2026-08-02):** `packages/contracts`, `packages/api`, `apps/admin`, and `apps/web` all typecheck clean (`tsc -p tsconfig.lib.json`/`tsconfig.json --noEmit`) except for `TS6305` project-reference errors, which are exclusively because `packages/database`'s Prisma Client can't be generated in this sandbox (no route to `binaries.prisma.sh` — same limitation as M1a) — nothing else in the referenced-project chain builds without it either. Two real bugs were caught and fixed by this typecheck, not just theorized: (1) `NewsCategoryInput`'s enum construction didn't satisfy Zod 4's stricter `z.enum()` overloads — replaced with reusing `NewsCategorySchema` directly from `@nexus/contracts` instead of re-deriving it; (2) `err instanceof Prisma.PrismaClientKnownRequestError` doesn't narrow `err` in this project's TS setup (the same reason `contentService.ts` already casts explicitly with `(err as Prisma.PrismaClientKnownRequestError)` rather than relying on the `instanceof` guard alone) — matched that existing pattern. `apps/admin/src/lib/news.test.ts` was actually **run** (via `tsx --test`, not just typechecked) — 3/3 pass. `packages/api/src/modules/news/__tests__/router.test.ts` cannot run at all here — it fails at module resolution (`packages/database/src/generated/prisma/client.js` doesn't exist) before any test body executes, the direct consequence of the same missing Prisma Client, not a bug in the test. Run it for real once `pnpm db:generate` succeeds somewhere with network access.
>
> Two real architecture problems were found and fixed as prerequisites, not scope creep — the checklist above couldn't be honestly completed without them:
>
> - **Category taxonomy mismatch:** the original `packages/api/modules/news/validators.ts` invented `['Academic','Sports','Events','Achievements','General']`, which collides with the real Event/Achievement models landing in M4. Now derives from `@nexus/contracts`' `NEWS_CATEGORIES` (`academic/sports/cultural/community/general`), the taxonomy `ArticleCardSchema`/`NewsCard` already used.
> - **Content storage type mismatch:** `NewsArticle.content` was `String @db.Text`, but `RichTextRenderer` (@nexus/ui, already built) expects a Tiptap/ProseMirror JSON document, and `RichTextEditor.tsx` (the thing meant to produce that JSON) was a 3-line comment stub. Changed the column to `Json`, built a real Tiptap-based editor (F-150) scoped to exactly what `RichTextRenderer` renders, and exported `TiptapNodeSchema` from `@nexus/contracts` for validating it.
> - Removed the `news.featured`/`news.feed` `PageRegistry` sections (and the now-fully-dead `NewsFeaturedSchema`/`NewsFeedSchema`) — ContentEntry-era placeholders from when News was still a "deferred domain model" (F-057), superseded by the real router and never cleaned up.
>
> **Not done:** the e2e spec and `playwright.config.ts` are written for real (not stubs) but **not run** — no browser, no live Postgres, no dev-server chain in this sandbox. Needs `pnpm --filter @nexus/admin exec playwright install` plus a real seeded DB and `ADMIN_EMAIL`/`ADMIN_PASSWORD` to actually execute. Trilingual rendering is correct by construction (locale flows through every query, `NEWS_STRINGS` covers en/si/ta) but **not visually verified** — no browser available here either, and the Sinhala/Tamil UI strings are a best-effort translation, not reviewed by a native speaker. Both remaining checkboxes need a real dev environment, not more code, to close out.

---

## M4 — Remaining content modules (repeat the M3 pattern)

Suggested order (Media Library pulled forward since News/Gallery both depend on real upload). For each module: **model + migration → router → admin UI → public page.**

**Media Library** (Task 7.8, F-057)

- [ ] `MediaAsset` model + migration
- [ ] `mediaRouter`
- [ ] Admin media library UI (`MediaLibraryPicker.tsx`, `UploadZone.tsx` — currently stubs) + R2 upload wiring
- [ ] Wire into News module's image fields retroactively if needed

**Staff** (Task 7.4)

- [ ] `Staff` model + migration
- [ ] `staffRouter`
- [ ] Admin Staff module (list/new/edit)
- [ ] Confirm whether Administration page's existing `StaffCard`/`StaffGridSection` usage switches over to the new model or stays on `ContentEntry`

**Events** (Task 7.5)

- [ ] `Event` model + migration
- [ ] `eventsRouter`
- [ ] Admin Events module (list/new/edit)
- [ ] Public Events listing page
- [ ] Public Event detail page

**Societies** (Task 7.6)

- [ ] `Society` model + migration
- [ ] `societiesRouter`
- [ ] Admin Societies module (list/new/edit)
- [ ] Public Societies hub page
- [ ] Public Society detail page

**Gallery** (Task 7.7)

- [ ] `GalleryAlbum` + `GalleryPhoto` models + migration
- [ ] `galleryRouter`
- [ ] Admin Gallery module (album/new/edit)
- [ ] Public Gallery listing page
- [ ] Public Gallery album detail page

**Announcements** (Task 7.13)

- [ ] Confirm data shape (may ride on `SiteSetting` or need its own model)
- [ ] Admin Announcements module
- [ ] `AnnouncementBanner` wired to real data on public site

**Extracurriculars** (Task 7.17)

- [ ] Model + migration (check contracts: `domains/extracurriculars/`)
- [ ] Router
- [ ] Admin module
- [ ] Public page

**Alumni** (Task 7.18)

- [ ] `AlumniProfile` model + migration
- [ ] `alumniRouter`
- [ ] Admin Alumni module
- [ ] Public Alumni Directory page

**Achievements** (Task 7.19)

- [ ] `Achievement` model + migration
- [ ] `achievementsRouter`
- [ ] Admin Achievement module
- [ ] Public Achievement Database page

**Digital Archive** (Task 7.20)

- [ ] Confirm data shape (check contracts + old Archive scope)
- [ ] Admin Archive module
- [ ] Public Digital Archive page

**Facilities profiles** (Task 7.21)

- [ ] Confirm whether Facilities needs its own model or can extend `ContentEntry`
- [ ] Admin Facilities module
- [ ] Finish `FacilitiesStats.tsx` stub on the already-wired public Facilities page

---

## M5 — System modules (Task 7.9–7.16, F-057)

- [ ] `AuditLog` model + migration
- [ ] `auditRouter`
- [ ] Audit Log Viewer module (7.14) — and confirm `auditMiddleware` from M1a now writes correctly
- [ ] User Management module (7.11) — role assignment UI
- [ ] ContentEntry admin module (7.9) — editor for the generic page sections already backed by the real model
- [ ] Analytics module (7.10, Umami-based per F-101/F-102)
- [ ] Settings module (7.15)
- [ ] Academic Programs admin screen (7.16) — likely a `ContentEntry` editor view, not a new model
- [ ] Social Media Management module (7.22) — low priority, can slot in near launch instead if time is tight

---

## M6 — Home page + remaining stub sub-blocks

- [ ] Build real home page: `HeroBlock`, `LatestNewsBlock`, `QuickAccessBlock`, `UpcomingEventsBlock` (currently comment stubs behind a placeholder page)
- [ ] Finish stub sub-blocks on the About page: `AboutStatsStrip`, `EthosBlock`, `NamesakeBlock`, `SchoolAnthemBlock`, `SchoolStoryBlock`
- [ ] Finish `FacilitiesStats.tsx` (if not already done in M4)
- [ ] Build Search (Task 8.14) — once News/Events/Societies/Staff all have real, indexable content

---

## M7 — Harden PWA / SEO / infra against real content (Phase 9–11)

- [ ] Confirm sitemap generation covers the now-real News/Events/Societies/Gallery routes
- [ ] Confirm OG image generation works across all new dynamic routes
- [ ] Confirm service worker / offline page behave correctly with real data
- [ ] Expand e2e coverage — one spec per module built in M3–M5 (currently only 2 admin specs + 4 web specs exist)
- [ ] Accessibility audit (Task 12.3)
- [ ] Security review (Task 12.4)
- [ ] PII compliance review (Task 12.4a) — now genuinely relevant with Alumni Directory, Achievement Database, Digital Archive

---

## M8 — Content population + trilingual verification (Task 12.1–12.2)

- [ ] Load Track A's collected content through the now-complete admin CMS
- [ ] Verify every page in Sinhala
- [ ] Verify every page in Tamil
- [ ] Trilingual content audit sign-off

---

## M1b — Google Workspace OAuth (deferred to end, pre-launch)

Do this once Google Cloud Console access is available — everything else has been built against the dev/break-glass provider from M1a and doesn't block on it.

- [ ] Configure Google Cloud Console OAuth app (Task 6.4)
- [ ] Wire the real Google provider into Auth.js
- [ ] Restrict to `@cwwkcc.lk` domain, with correct rejection messaging for outside accounts
- [ ] Swap the login page's dev-provider button for the real "Sign in with Google" button
- [ ] Test against real staff accounts
- [ ] Confirm break-glass path still works and stays unadvertised

---

## M9 — Launch, stabilisation, handover (Phase 12.5–14)

- [ ] Load testing (Task 12.5)
- [ ] Cross-browser / device testing (Task 12.6)
- [ ] Monitoring set up (Task 12.7)
- [ ] Launch (Task 12.8)
- [ ] Collect structured feedback (Task 13.1)
- [ ] Review analytics data (Task 13.2)
- [ ] Review failed searches (Task 13.3)
- [ ] Review editor workflows (Task 13.4)
- [ ] Fix discovered issues (Task 13.5)
- [ ] Performance validation under real load (Task 13.6)
- [ ] Trilingual content audit, post-launch pass (Task 13.7)
- [ ] Content governance established (Task 14.0)
- [ ] Disaster recovery plan confirmed (Task 14.0b)
- [ ] User training delivered (Task 14.1)
- [ ] Editor video tutorials created (Task 14.1a)
- [ ] Developer Knowledge Map finalized (Task 14.2)
- [ ] Runbook finalized (Task 14.3)
- [ ] Legacy content populated (Task 14.4)
- [ ] Alumni outreach (Task 14.5)
- [ ] Final handover (Task 14.6)

---

_Update `docs/technical/Engineering Roadmap.md` and `docs/technical/Feature Registry.md` as milestones land, per their own sync policy — Feature Registry is the scope source of truth, Roadmap is the build-order source of truth._
