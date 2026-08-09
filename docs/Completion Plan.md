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

**Media Library** (Task 7.8, F-057/F-067/F-115/F-120/F-169)

- [x] `MediaAsset` model + migration
- [x] `mediaRouter`
- [x] Admin media library UI (`MediaLibraryPicker.tsx`, `UploadZone.tsx` — currently stubs) + R2 upload wiring
- [x] Wire into News module's image fields retroactively if needed

> **Verification note (2026-08-02):** This sandbox had a working route to `registry.npmjs.org` (M1a/M3 didn't) — ran a real `pnpm install` (1,398 packages resolved) rather than typechecking against nothing. Isolated the dependency chain by hand: `@nexus/contracts`, `@nexus/env`, `@nexus/tokens`, `@nexus/config` all **build** (not just typecheck) with zero errors. `@nexus/db` fails at exactly the two lines everyone already knew about — `Cannot find module '../generated/prisma/client.js'` — confirmed still exclusively `binaries.prisma.sh` returning 403, nothing else. With that isolated, `@nexus/api` (including this module) typechecks down to exactly one residual error class, shared identically by `content/service.ts` and `news/service.ts`: `Module '"@nexus/db"' has no exported member 'Prisma'` — the direct, unavoidable fallout of the missing client, not a defect in any of the three modules. `apps/admin` typechecks clean except one pre-existing, unrelated error in `app/page.tsx` (`recentVersions.map((v) => ...)`, implicit-any — same root cause, not introduced here, not fixed here since patching it would mean adding a real `any` where a generated type belongs). ESLint ran clean (0 errors) across every new and modified file in `packages/api`, `packages/ui`, and `apps/admin` — including, incidentally, three **pre-existing** `import/order` violations in already-shipped `news/actions.ts`, `news/page.tsx`, and `NewsListClient.tsx` that had apparently never actually been linted with working `node_modules` before now; fixed alongside (mechanical reordering only, no behavior change). `packages/api/src/modules/media/__tests__/router.test.ts` was written and fails at the same module-resolution point as `news/__tests__/router.test.ts`, for the same reason — not run for real here.
>
> Three real things were found and fixed along the way, not scope creep:
>
> - The three stub files this task replaces (`UploadZone.tsx`, `MediaLibraryPicker.tsx`, `MediaPickerPlugin.tsx`) cited stale feature IDs (F-155, F-101, F-116) that don't match `Feature Registry.md` (the real ones are F-169, F-115, F-067) — same class of drift M3's audit found elsewhere. Fixed in the replacing code's own comments.
> - `useLockBodyScroll` existed in `packages/ui` and was already used internally by `Modal`, but wasn't re-exported from the hooks barrel — meant `@nexus/ui` didn't actually expose it as public API. `MediaLibraryPicker` is a bespoke overlay (neither `Modal` at 520px nor `Drawer` at 384px fits a real media grid) that needed the same body-scroll-lock behavior, so this got added to the barrel rather than reimplemented.
> - F-067 ("browser uploads directly to R2") and F-115 ("processed with Sharp before upload to R2") read as contradictory taken literally — Sharp needs the bytes in a Node process, which the first phrase seems to rule out. Resolved as a two-key flow: the browser PUTs the original to a `tmp/`-prefixed staging key directly (satisfies F-067/F-120's actual point — the Next.js server never sees the raw upload bandwidth), then `confirmUpload` downloads _that_ small staged object, runs Sharp, writes the processed result to its final key, and deletes the staging object. Non-image folders skip the download entirely (`CopyObjectCommand`, staging → final, bytes never enter the Node process).
>
> **Also decided, not just implemented:** usage-tracking (F-169's "which content uses each asset") only checks `NewsArticle.imageUrl` — the only model that references media so far. It's written to be honest about that limit (a code comment says exactly which `Promise.all` to extend) rather than pretending to cover Staff/Gallery/Events/etc. that don't exist yet. Bulk delete uses a blanket warning instead of a per-item usage check (one `getUsage` round trip per selected asset doesn't scale); single-asset delete does the real check.
>
> **Not done:** no live R2 bucket, no live Postgres, no browser — so the actual presigned-PUT round trip, Sharp processing against a real image, and the picker's interactive behavior have not been exercised, only written and statically verified as far as this sandbox allows. Needs `pnpm db:generate` + a real R2 bucket + `pnpm --filter @nexus/admin dev` to close out for real.
>
> **Addendum (2026-08-05, from Staff/Task 7.4's verification pass):** the "not run for real here" limitation above no longer holds. Task 7.4's pass built out the hand-written Prisma stub used to isolate `@nexus/db` into a schema-complete one (every model, `select`/`skip`/`take`/`upsert`/`deleteMany`, correctly-overloaded `$transaction`) rather than a Staff-only one, specifically to check whether the "one residual error class" reasoning above still held once the stub stopped being the limiting factor. It did: `packages/api` typechecks with **zero errors** across content/media/news/staff, and this module's own `router.test.ts` now actually **executes** (`tsx --test`) and passes, rather than failing at module resolution. No additional real bugs turned up in this module beyond what's already documented above — the expanded stub confirmed this task's verification rather than correcting it.

**Staff** (Task 7.4)

- [x] `Staff` model + migration
- [x] `staffRouter`
- [x] Admin Staff module (list/new/edit)
- [x] Confirm whether Administration page's existing `StaffCard`/`StaffGridSection` usage switches over to the new model or stays on `ContentEntry`

> **Verification note (2026-08-05):** This sandbox had a working route to `registry.npmjs.org` — installed pnpm and ran a real `pnpm install` (1,397 packages resolved). `prisma generate` still fails exactly as documented (`binaries.prisma.sh` → 403), so the real Prisma Client can't be produced here either. To verify past that wall rather than just asserting it, this pass hand-wrote a throwaway runtime stub at `packages/database/src/generated/prisma/client.ts` (gitignored by `packages/database/.gitignore` — never shipped, deleted before this patch was produced) — a real, instantiable `PrismaClient` class whose delegate methods throw, modeling the `Staff` table's actual shape precisely and every other table loosely. That let `@nexus/db` actually **build** for the first time in this sandbox, which in turn let `@nexus/contracts`, `@nexus/tokens`, `@nexus/env`, `@nexus/config`, and `@nexus/ui` all build clean, and let `@nexus/api` typecheck down past the previously-unavoidable `TS6305` wall entirely. Result: **zero** type errors anywhere in `packages/api/src/modules/staff/`, `apps/admin/src/app/staff/`, `apps/admin/src/lib/staff.ts`, or the modified `apps/web` administration files. The handful of remaining errors in `apps/admin` (`app/page.tsx`'s `recentVersions.map` implicit-any, `backupCode`/`contentEntryVersion` model access) and `apps/web` (`@tiptap/react`, `@nexus/ui/visualization/ProcessSteps`, one admissions block) are pre-existing and unrelated to this task — either already documented in M4's note or simply models/paths this pass's stub never modeled, not defects in anything Staff touches. ESLint ran clean across every new/modified file except one environmental false positive (`@next/next/no-img-el` "rule not found" when invoking `eslint` from the repo root instead of through `apps/admin`'s own `next lint` — reproduces identically on the already-shipped `NewsForm.tsx`, confirmed side by side) and the same repo-wide `tailwindcss/no-custom-classname` noise every file in `apps/admin`/`apps/web` already produces (the design-token class names aren't in Tailwind's default palette; pre-existing, not introduced here). Went one step further than prior verification notes could: with the runtime stub in place, `packages/api/src/modules/staff/__tests__/router.test.ts` and `apps/admin/src/lib/staff.test.ts` were actually **executed** (`tsx --test`), not just written — 12/12 pass, including the two "degrades to `[]` when the database is unavailable" cases exercised for real against a delegate method that genuinely throws. The stub used for that first pass was intentionally minimal (Staff's own shape only); it was then generalized to cover the full `schema.prisma` surface — every model, `select`/`skip`/`take`/`upsert`/`deleteMany`, correctly-overloaded `$transaction` — specifically to check whether the errors that first pass saw in `content/service.ts`/`media/service.ts`/`news/service.ts` were real defects the minimal stub happened to expose, or just gaps in the stub itself. They were the latter: with the complete stub, all of `packages/api` (all four modules) typechecks with **zero errors**, and all four modules' `__tests__/router.test.ts` files execute for real — 16/16 pass, including `media`'s and `content`'s, which no prior verification pass had ever actually run. See the Media task's addendum above for the same finding from that side.
>
> Real things found and fixed along the way, not scope creep:
>
> - The three stub files this task replaces (`app/staff/page.tsx`, `new/page.tsx`, `[id]/page.tsx`) cited a stale feature ID — "F-151" — which is actually the Gallery Listing Page's id in `Feature Registry.md`; the Staff Module's real id is F-165. Same class of drift M3/M4's audits already found and fixed elsewhere.
> - `PrincipalSection.tsx` and `StaffGridSection.tsx` spread a full `StaffData` object (whose `portrait` field is a nested `{ src, alt }`) directly into `StaffCard`, which actually reads flat `imageSrc`/`imageAlt` props. Every portrait has silently never rendered. Fixed by adding a `toStaffCardData()` helper next to `StaffCardSchema` in `@nexus/contracts` and using it at both call sites.
> - Wiring real data through the Administration page's four Staff-derived sections surfaced a genuine type mismatch: `StaffOutput` (this task's API layer) validates optional fields as `X | null`, the same convention `NewsArticleOutput` already established for a raw Postgres column with no value; `StaffSchema` (pre-existing, in `@nexus/contracts`) models the same absence as `X | undefined`, because it originated as hand-authored ContentEntry JSON where an absent key is the natural way to omit a field. Reconciled with a small `toStaffData()` normalizer at the one place they actually meet (`apps/web/src/server/content/administration.ts`), rather than papering over it with a cast.
>
> **Also decided, not just implemented:**
>
> - **No draft/published status.** `StaffSchema` never modeled one and F-165's spec doesn't call for one — every row is live on the public site as soon as it's saved (`schema.prisma`'s `Staff` model doc comment). A hard, admin-role-only delete is therefore the only way to remove someone, mirroring Media's precedent for the same reason Media has one: no soft-hide state to fall back on.
> - **`role`/`department` are plain `String` columns**, not native Postgres enums — the exact precedent `NewsArticle.category` and `MediaAsset.folder` already set for hyphenated, Zod-managed taxonomies (a Postgres enum can't represent `'deputy-principal'` as a bare identifier without `@map` obscuring the client-facing value from the exact string `@nexus/contracts` exports).
> - **F-165's drag-and-drop reorder uses native HTML5 drag-and-drop**, not a new dependency — plus keyboard-accessible "Move up"/"Move down" buttons on every row, since HTML5 drag-and-drop has no keyboard equivalent at all and a drag-only control would be unusable without a mouse or touchscreen.
> - **Reorder is scoped per role group**, never global — `order` only has meaning relative to the row's own `role`; a drop is ignored if the dragged row didn't start in the target's group, since crossing groups is a role change (an edit), not a reorder.
> - **No pagination on `staff.adminList`** — unlike News, a single school's roster is small enough that fetching it all and grouping client-side is simpler and correct; documented in `lib/staff.ts` rather than silently diverging from News's pattern with no explanation.
> - **Portraits use the Media Library's `'avatars'` folder** (already reserved for exactly this in `UploadFolderEnum` and named in `MediaLibraryPicker.tsx`'s own doc comment as a future consumer).
> - **Department display labels are a local, best-effort humanization** of `DepartmentKeyEnum` keys (`apps/admin/src/lib/staff.ts`'s `titleCaseFromKey`), not a new canonical label map — `DepartmentSchema` already models a department's `name` as admin-editable data, and building a real Departments admin module to author one is out of scope for F-165.
>
> **Not done:** no live Postgres, no live R2, no browser — the migration has never run against a real database, and the drag-and-drop/media-picker interactions have been read carefully and typechecked but not clicked through. Needs `pnpm db:generate` (once `binaries.prisma.sh` is reachable) + `pnpm db:migrate:deploy` + a real dev server to close out for real.

**Events** (Task 7.5)

- [x] `Event` model + migration
- [x] `eventsRouter`
- [x] Admin Events module (list/new/edit)
- [x] Public Events listing page
- [x] Public Event detail page

> **Architecture note:** what shipped is not the `Event` model this checklist's own wording implies. Feature Registry's **F-198 "Calendar-First Event Architecture"** supersedes the plain Task 7.5 spec above (a standalone `Event` row with its own Draft→Published→Past status) — building that literal version would have repeated the exact class of mistake M3's News pass caught and fixed for the category taxonomy. Per F-198: `CalendarEntry` (`schema.prisma`) is the single source of truth for every dated item on the platform — holidays, exam dates, fixtures, prize-givings, internal meetings — and it optionally carries a linked `EventDetail` (description, cover image, location, registration link, draft/published/archived status) which is what actually produces a public `EventCard` and a routable `/events/[slug]` page. A calendar-only entry has no detail, is never rendered as a card, and has no route. The old standalone `EventSchema`/`AcademicCalendarSchema` in `@nexus/contracts` are removed (nothing consumed them); `EventCardSchema`/`EventCategorySchema` survive unchanged since `@nexus/ui` still renders directly from those. `events.upcoming`/`events.past` are removed from `registry/page-registry/events.ts` — the same ContentEntry-placeholder removal M3 did for News's `news.featured`/`news.feed` — leaving only `events.hero` as page chrome.
>
> **Verification note (2026-08-08):** Same sandbox constraints as every prior pass — `pnpm install` succeeds (1,398 packages), `prisma generate` still 403s against `binaries.prisma.sh`. Rebuilt the hand-written runtime stub at `packages/database/src/generated/prisma/client.ts` (gitignored, never shipped, deleted before this patch was produced) from scratch — Staff/Task 7.4's addendum describes generalizing a stub to cover the full schema; this pass started from that same complete-surface goal directly (every model, `createMany`, `select`/`skip`/`take`/`upsert`/`deleteMany`, a tuple-preserving overloaded `$transaction`), plus two small honest widenings the previous stub hadn't needed: `CalendarEntry`/`EventDetail` modeled precisely (this task's own tables), and `ContentEntryVersion.contentEntry` added as a required relation field (a real, pre-existing stub gap `app/page.tsx`'s dashboard already depended on — not something Events introduced). Result: **zero** type errors across `@nexus/contracts`, `@nexus/database`, `@nexus/api` (all five modules, including this one), `apps/admin`, and `apps/web` — the only four remaining `apps/web` errors (`@tiptap/react`, `@nexus/ui/visualization/ProcessSteps`, one admissions block, one unused import in `news/[slug]/page.tsx`) are pre-existing, confirmed via `git status` to be files this task never touched. `packages/api/src/modules/events/__tests__/router.test.ts` was actually **executed** (`tsx --test`), not just written — 11/11 pass, covering DB-failure degradation on every public/admin read, RBAC gating on `create`/`delete`, and the two-branch `detail: null` vs `detail: {...}` input contract at the Zod layer. `apps/admin/src/lib/events.test.ts` (7/7) and `apps/web/src/lib/events-month.test.ts` (3/3) also executed and pass, including a UTC-midnight round-trip case specifically pinned against the classic timezone-west-of-UTC off-by-one-day bug. Full suite across all three packages: **47/47**.
>
> Real things found and fixed along the way, not scope creep:
>
> - `apps/web/src/app/[locale]/events/page.tsx` and `[slug]/page.tsx` weren't stubs in the `AdminPlaceholder` sense — they were comment-only files with **no default export at all**. Every request to either route would have failed to build outright. Same for `apps/web/src/blocks/home/UpcomingEventsBlock.tsx`, built out for the same reason `getUpcomingEvents` needed a real caller (see "Also decided" below on why the rest of the home page isn't assembled here).
> - `apps/admin/src/app/staff/page.tsx.rej`, `new/page.tsx.rej`, `[id]/page.tsx.rej` — three stray `git apply` reject files left over in the repo from a previous session, sitting alongside the real, already-correct `.tsx` files they were rejected against. Deleted; not otherwise related to Events.
> - `@nexus/ui`'s `Input` component had no `date`/`time` type in its `type` union — needed for `EventForm.tsx`'s actual date/time fields. Extended the union by two values rather than reaching for an unstyled native `<input>` outside the design system.
> - `@nexus/ui`'s `Calendar` (month-view) manages its own current-month state internally, seeded once from its `month` prop, with no prop to suppress its own built-in prev/next buttons. Left unwired against this task's own URL-driven month navigation, clicking Calendar's own buttons would have flipped to a month whose events were never fetched, silently showing an empty grid. Fixed with a small client wrapper (`EventsCalendarView.tsx`) that pipes `onMonthChange` into the same `?month=` URL param the list view's own nav uses, plus `key={month}` on the server page so Calendar remounts with correctly-seeded state on every navigation — and `EventsListingControls` only renders its own month-nav row for the list view, so there's never two redundant sets of arrows on screen at once.
>
> **Also decided, not just implemented:**
>
> - **Two-branch creation, and a documented upgrade/downgrade path beyond it.** F-166: "the editor makes one choice at creation: calendar-only, or calendar + event card." Modeled as `detail: null | {...}` on both create and update (`validators.ts`'s header comment has the exact semantics) — update additionally supports adding details to a previously calendar-only entry, or removing them from one that had them, since forcing a delete-and-recreate for either would be worse UX than F-198's own wording strictly requires and nothing in the spec forbids it.
> - **No `endDate` on `EventDetail`.** F-198's own carried-over field list from the old `EventSchema` names `slug`/`description`/`coverImage`/`location`/`isAllDay`/`registrationUrl` explicitly and doesn't include a second date. A multi-day event is one `CalendarEntry` whose description states the span in prose — flagged in `schema.prisma`'s own doc comment as a real, documented simplification, not silently dropped scope.
> - **`startTime` added anyway**, despite not being in that same carried-over list — Engineering Roadmap's own Task 7.5 spec explicitly asks for a time field, and `EventCardSchema.time`/`EventCard`'s `DateBlock` both already expect one; omitting it would have made every card silently timeless.
> - **`EventDetail.locale` is denormalized from its parent `CalendarEntry`** (kept in sync by `service.ts`, never independently editable) purely so `/events/[slug]` can look a detail up by `(locale, slug)` with one indexed query — the same convention `NewsArticle.locale`/`slug` already established, not a new pattern.
> - **A bare `CalendarEntry` hard-delete is admin-role-only** (`adminOnlyMutation`), mirroring Staff's precedent for the identical reason: no archived/soft-deleted state to fall back to. Create/update/publish stay on `editor`, matching News's own `publish` grant — `@nexus/contracts`' RBAC matrix now has an `events` resource.
> - **Admin list paginates** (unlike Staff's deliberately-unpaginated one) — a school calendar accumulates every dated item ever entered, a far larger and ever-growing set than a static roster — and additionally takes an optional `month` filter distinct from that pagination, since an admin browsing a calendar naturally thinks in months.
> - **No `generateStaticParams` on the event detail page**, unlike News's static generation — F-144 explicitly asked for that on News; nothing in F-146/Task 7.5's spec asks for it here, and adding one would mean adding new public API surface solely to support a build-time concern this milestone never called for.
> - **Public reads gate only on the linked `EventDetail`'s own `status`**, never on the `CalendarEntry` itself — a `CalendarEntry` has no status of its own (F-198), so every entry is always visible on the calendar grid regardless (F-145: "a school holiday and a prize-giving are equally present on the grid"); only whether it also renders as a card depends on its detail being published.
>
> **Not done:** no live Postgres, no live R2, no browser — the migration has never run for real, and the admin form's Media Library picker / month-navigation interactions have been read carefully and typechecked but not clicked through. Needs `pnpm db:generate` (once `binaries.prisma.sh` is reachable) + `pnpm db:migrate:deploy` + a real dev server to close out for real. The admin browsing UI is a filtered/paginated table, not a drag-interactive month grid — Task 7.5's "calendar view" is fully real on the **public** side (`@nexus/ui`'s `Calendar` component, its actual intended consumer); building a second, admin-only interactive grid widget from scratch was judged out of scope for this pass. `UpcomingEventsBlock.tsx` is real and wired to live data but, like `LatestNewsBlock.tsx` before it, isn't composed into the home page yet — that's a separate, larger milestone (`docs/Completion Plan.md`'s own M6 section, below).

**Societies** (Task 7.6)

- [x] `Society` model + migration
- [x] `societiesRouter`
- [x] Admin Societies module (list/new/edit)
- [x] Public Societies hub page
- [x] Public Society detail page

> **Verification note (2026-08-08):** Same sandbox constraints as every prior pass — `prisma generate` still 403s against `binaries.prisma.sh`. Extended the hand-written stub client (`packages/database/src/generated/prisma/client.ts`, gitignored, deleted before this patch was produced) with a precisely-modeled `SocietyRow`, matching Events' own precedent from the previous pass. **Zero** type errors across `@nexus/contracts`, `@nexus/database`, `@nexus/api` (all six modules), `apps/admin`, and `apps/web` — the same four pre-existing `apps/web` errors as the Events pass (confirmed unchanged via `git status`), none introduced by this one. `packages/api/src/modules/societies/__tests__/router.test.ts` executed (`tsx --test`), 7/7 — DB-failure degradation on every public/admin read, RBAC gating on `create`/`delete`, slug validation at the Zod layer. `apps/admin/src/lib/societies.test.ts` (3/3) also executed and passes. Full suite across all three packages, this task's tests plus everything from before it: **58/58**.
>
> Real things found and fixed along the way, not scope creep:
>
> - `apps/web/src/app/[locale]/societies/page.tsx` and `[slug]/page.tsx` were the same class of bug as Events' own pair last pass — comment-only files with **no default export at all**. Every request to either route would have failed to build outright.
> - **`staffRouter` had no way to look up one specific staff member by id** — only `byRole` (a role-group listing), which F-148's "advisor StaffCard" can't use. Added a public `staff.byId` (degrades to `null`, matching every other public read's convention) to the _already-shipped_ Staff module — a small, necessary extension to fulfill a requirement this task's own spec explicitly states, not a reopening of that module's actual scope. Covered by a new test in staff's own `router.test.ts` (6/6 now, was 5/5).
> - `@nexus/contracts`' `society-profile.ts` had a bare `SocietyCategoryEnum` with **no label map at all** — every other taxonomy in this codebase (`EVENT_CATEGORIES`/`EVENT_CATEGORY_META`, `STAFF_ROLE_LABELS`) has one; there was no way to render a human-readable category name anywhere. Added `SOCIETY_CATEGORIES`/`SOCIETY_CATEGORY_META`, matching `EVENT_CATEGORY_META`'s exact shape.
>
> **Also decided, not just implemented:**
>
> - **Society follows the News/EventDetail per-locale-row pattern, not Staff's single-global-row one** — `locale` + `(locale, slug)` unique index. Two structural signals point this way, not the Staff way: `tagline`/`description`/`meetingSchedule`/`howToJoin` are prose that genuinely needs translation for a trilingual site, and F-148 requires an individually routable `/societies/[slug]` page, which Staff (no slug, no individual page) doesn't have at all. Documented directly in `schema.prisma`'s own `Society` doc comment, contrasting explicitly with `Staff`'s.
> - **No draft/published/archived status** — matching Staff's precedent here, not News/EventDetail's. F-167's field list doesn't include one, and a school society either exists on the roster or it doesn't; there's no realistic "written but not ready to announce" state the way there is for a news article.
> - **`advisorStaffId` is nullable with `onDelete: SetNull`, not a required FK or `Cascade`.** A society keeps existing (and keeps its own page) if its advisor is ever removed from the staff roster — it just stops showing an advisor card until a new one is assigned. A required FK would make deleting _any_ staff member who happens to advise a society throw a foreign-key violation on an otherwise-unrelated admin action, which is the wrong failure mode.
> - **Admin list is unpaginated**, matching Staff's precedent, not Events'/News's — a school's roster of societies is a small, bounded set, the same order of magnitude as its staff roster, not an ever-growing archive.
> - **`generateStaticParams` _is_ implemented on the society detail page** — the opposite call from the Events pass's own event-detail page, and deliberately so: F-112 explicitly lists society pages for static generation; nothing in F-146/Task 7.5 asked for it on events. Same reasoning, opposite spec, opposite answer — not an inconsistency.
> - **Recent Events and Gallery preview are not rendered** on the society detail page, despite F-148 listing both. Recent Events would need a Society↔CalendarEntry relation that doesn't exist — Task 7.5 didn't call for one, and adding it now would mean reopening an already-shipped, already-verified module for a feature outside _this_ task's own explicit spec (F-167's admin field list has no such relation either). Gallery preview has no possible real implementation yet — the Gallery module (Task 7.7: `GalleryAlbum`/`GalleryPhoto`) doesn't exist at all. Both are flagged here explicitly rather than either faked with placeholder content or silently dropped without a note.
> - **Achievements/membership are out of scope.** `SocietyAchievementSchema`/`SocietyMemberSchema` already existed in `@nexus/contracts` (untouched by this pass) but neither F-167's admin field list nor Task 7.6's own spec table mentions achievements or membership management — left as-is for a future milestone, not built speculatively.
>
> **Not done:** no live Postgres, no live R2, no browser — same standing limitation as every prior milestone. The admin form's advisor picker / Media Library interactions have been read carefully and typechecked but not clicked through. Needs `pnpm db:generate` (once `binaries.prisma.sh` is reachable) + `pnpm db:migrate:deploy` + a real dev server to close out for real.

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
