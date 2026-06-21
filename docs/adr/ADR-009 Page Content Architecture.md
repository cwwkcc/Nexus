## Status

Accepted

## Context

Editorial content for the public site — the About page's institutional history and timeline, the Admissions process steps and FAQ, and equivalent long-form sections on Academics, Contact, Extracurriculars, Facilities, Gallery, Home, News, Results, and Societies — was implemented as static next-intl message files (`apps/web/messages/{locale}/*.json`), edited directly in the repository and shipped via git commit and redeploy. These files mix two fundamentally different kinds of string: reusable interface chrome (button labels, form field labels, error and empty states, navigation labels) and page-specific editorial prose (the school's founding history, mission and vision statements, crest symbolism, the school anthem, the admissions process narrative). Both lived in the same files under the same editing workflow.

This has already produced concrete content-quality problems that a developer-only edit path doesn't catch: `about.json`'s alumni profiles section, written before the `AlumniProfile` table existed, still ships three placeholder profiles pointing at a generic `/images/ironman.jpg` portrait; and a `heritage.caption` field contains a stray Sinhala/Singlish development note instead of real caption text. Neither would have survived a content review step, and neither was caught because none exists for this content type. Nexus is built to be maintained for decades by a rotating team of student volunteers, and gating every wording change to institutional copy behind a developer with repository access and a deployment is not sustainable for that horizon.

## Decision

Split `messages/` strictly by function. `navigation.json` and `common.json` — along with the functional fields embedded in other namespaces (search placeholders, form field labels, filter pill labels, exam-type taxonomy) — remain static next-intl message files, because this content is reusable interface chrome tightly coupled to component logic and rarely changes independent of the component itself.

Everything else — every page hero, every section heading, and every block of editorial prose currently living in `about.json`, `academics.json`, `admissions.json`, `contact.json`, `extracurriculars.json`, `facilities.json`, `gallery.json`, `home.json`, `news.json`, `results.json`, and `societies.json` — moves into a new `PageContent` table: one generic model keyed by `page`, `sectionKey`, and `locale`, storing a JSON payload validated per-section by a Zod schema, exposed through a new `pageContentRouter`, and editable through a new admin module.

`PageContent` sits as a sibling to the existing `PageConfig` system (F-055): `PageConfig` controls whether a section is shown and in what order; `PageContent` controls what the section says. Content edits use the same version-snapshot pattern already implemented for News (F-152) rather than inventing a second versioning mechanism.

## Alternatives Considered

**Status quo — leave editorial copy in `messages/`.** Rejected. It has already produced the placeholder and stray-note defects described above, and it requires a developer for every wording change to institutional content the school will reasonably want to update without one.

**A bespoke Prisma model per page** (`AboutPageContent`, `AdmissionsPageContent`, and so on). Rejected as needless duplication of the same shape — locale-keyed structured JSON per named section — repeated across ten-plus near-identical tables, when the platform already favours one generic model referenced everywhere over per-content-type tables (`MediaAsset` is the existing precedent).

**Route this content through a general-purpose third-party CMS.** Rejected outright. `Page Specifications.md` already establishes — and this decision does not revisit — that there is no Sanity, Contentful, or other external CMS anywhere in this stack. The custom admin panel is the CMS.

## Consequences

Every previously-static public page except Home's data-driven sections, News, Events, and Results gains a new dependency on `PageContent` at request time, and the admin panel gains a new module requiring a section-type-aware editor (rich text for prose blocks, a repeatable-list editor for timeline milestones, crest symbols, and FAQ items, and plain structured forms for short fields) rather than a single textarea per key — meaningfully more admin UI work than Phase 7 originally scoped.

A one-time migration script must read the existing `en`/`si`/`ta` message JSON and seed it into `PageContent` as version 1 before the static files are deleted. The placeholder alumni profiles and the stray `heritage.caption` note must be replaced with real content during that migration, not carried forward.

Three things are deliberately out of scope for this decision:

- Form-field labels and taxonomy values (exam types, news/gallery filter categories) stay in `messages/` — they validate against fixed Zod enums and Prisma schemas elsewhere, and moving them risks the label and the value it represents drifting apart.
- The `societies.json` `kits` entry is not migrated into `PageContent` at all. It duplicates the Societies table and should become a normal `Society` row instead — a Societies Module fix, not a page-content one.
- Pages already fully data-driven (Home's dynamic sections, News, Events, Results) are unaffected; they have no static editorial copy to migrate.