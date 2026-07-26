# Architecture: @nexus/contracts

## Table of contents

1. Purpose
2. The complete directory tree
3. Dependency rules
4. Naming conventions
5. The canonical concept-file template
6. The content-type identifier and registry contract
7. Locale handling
8. Privacy and sensitivity rules
9. How to add X
10. Anti-patterns

---

## 1. Purpose

@nexus/contracts exists so that every layer of the monorepo — `apps/web`, `apps/admin`, `packages/api`, and conceptually `packages/database` — shares one, and only one, definition of what every piece of data looks like. A page section rendered on the public site, a form rendered in the CMS, and a tRPC procedure that moves data between them all validate against the exact same schema object.

Concretely, this package is responsible for:

- Every shared primitive value shape (image, link, address, SEO metadata, and so on).
- Every system-level contract needed to operate the platform itself (auth, RBAC, file storage, generic API envelopes, CMS mechanics).
- The full library of content types — page-composition blocks, editorial content, and domain business entities alike — expressed through one identifier system, not several.
- The Page Registry and Global Registry: the structural definition of which sections exist on which page, in what order, and how each section maps onto a `ContentEntry` row.
- A small set of pure, dependency-light helper functions and compile-time constants that the rest of the package (and its consumers) would otherwise reinvent per-file.

This package explicitly does **not**:

- Contain business logic of any kind. It has no side effects; every export is either a Zod schema, a value derived purely from one, or a pure function that takes a value and returns a value.
- Touch a database, a filesystem, or the network.
- Import or export any React component — and, just as importantly, it does not know the _names_ of renderer components either, even as plain strings. A renderer's name is a UI-layer naming decision; contracts has no reason to be edited when `packages/ui` renames a component. `packages/ui` owns the mapping from a content-type identifier to the component that renders it, keyed off the identifier this package defines, but the mapping itself lives entirely outside this package.
- Perform database access, even read-only convenience queries.

---

## 2. The complete directory tree

- **primitives/** — foundational, dependency-free value shapes used across every other folder.
  - locale.ts — the closed `LocaleEnum` (en, si, ta) and its runtime value list.
  - localized-text.ts — the reusable field-level shape for a short string that must exist in all three locales.
  - link.ts — an internal or external link with a per-locale label.
  - address.ts — a physical address shape.
  - seo.ts — page-level SEO metadata (per-locale title/description, canonical URL, social image).
  - pagination.ts — generic pagination request parameters (page/cursor, page size) used by any listing query.
  - rich-text.ts — the constrained, serializable rich-text document shape used wherever long-form authored prose appears.
  - media/
    - image.ts — a still image reference: source, per-locale alt text, dimensions, blur placeholder, optional caption; also exports `AvatarSchema`.
    - audio.ts — an audio media reference.
    - video.ts — a video media reference.
    - document.ts — a downloadable document reference (PDF, DOCX, and so on).
    - index.ts
  - enums/
    - publish-status.ts — draft / in-review / published / archived.
    - visibility.ts — public / internal / admin-only.
    - priority.ts — low / medium / high / urgent.
    - sort-direction.ts — ascending / descending, for query ordering.
    - link-target.ts — self / blank, for whether a link opens in the same tab or a new one.
    - index.ts
  - index.ts
- **constants/** — pure compile-time constants that are not schemas and not runtime configuration.
  - limits.ts — `DEFAULT_PAGE_SIZE`, `MAX_GALLERY_IMAGES`, `MIN_PASSWORD_LENGTH`, `DEFAULT_UPLOAD_LIMIT`, and any other fixed numeric/string limit referenced from more than one schema.
  - index.ts
- **utils/** — pure helper functions. Depends only on `primitives/` and `constants/`; nothing here touches Zod's runtime-parsing surface beyond composing schemas that are passed in.
  - schema.ts — generic, concept-agnostic helpers for building a keyed lookup record from a single ordered tuple of schemas — reusable anywhere this package needs that pattern, not just in the registry.
  - enum.ts — helpers for pairing a Zod enum with its runtime value list, and the `assertNever` exhaustiveness helper used at the bottom of any `switch` that must handle every enum member.
  - content.ts — `isLocalized()`, `normalizeRichText()`, and similar pure predicates/transforms over primitive shapes.
  - response.ts — `createResponseEnvelope()` and the paginated-envelope factory, parameterized over a payload schema.
  - index.ts
- **system/** — cross-cutting platform contracts, tied to no single business domain.
  - auth/
    - user.ts — an authenticated user account.
    - session.ts — an active login session.
    - index.ts
  - rbac/
    - role.ts — the closed set of built-in roles and the role assignment shape.
    - permission.ts — a resource/action permission pair.
    - index.ts
  - storage/
    - upload.ts — the upload request and upload result shapes.
    - object-key.ts — the validated, R2-style object key format.
    - index.ts
  - api/
    - error-envelope.ts — the standard API error shape (code, message, optional field errors).
    - response-envelope.ts — the generic success/error response wrapper, parameterized over a payload schema (built on `utils/response.ts`).
    - pagination-meta.ts — the response-side pagination metadata (total items, total pages, current page).
    - index.ts
  - cms/
    - content-entry.ts — the generic content entry shape mirroring the database row: section key, scope, locale, content-type identifier, opaque data payload, status.
    - content-entry-version.ts — a single version-history row for a content entry.
    - field-definition.ts — the metadata shape describing one editable field for the admin dynamic form builder.
    - workflow-state.ts — the draft/review/publish workflow state enum and the set of legal transitions between states.
    - index.ts
  - index.ts
- **blocks/** — the ~20 reusable, page-agnostic content blocks. Each file is a self-contained concept: a schema, its inferred type, and its own content-type constant. There is deliberately no aggregator file in this folder — aggregation across every block happens once, in `registry/content-type-key.ts` (see section 6).
  - hero.ts
  - stats.ts
  - timeline.ts
  - quote.ts
  - faq.ts
  - cta.ts
  - gallery.ts
  - downloads.ts
  - announcement.ts
  - contact-info.ts
  - map.ts
  - staff-grid.ts
  - photo-strip.ts
  - process-steps.ts
  - results-display.ts
  - rich-text-block.ts
  - key-dates.ts
  - crest-symbols.ts
  - anthem.ts
  - values-grid.ts
  - index.ts — explicit named exports of every block's schema, data type, and content-type constant.
- **domains/** — school business entities.
  - academics/
    - curriculum.ts
    - department.ts
    - subject.ts
    - al-stream.ts
    - stream-comparison.ts
    - index.ts
  - admissions/ — _PII-bearing concepts (the application form itself) are not yet built here; see section 8._
    - key-dates.ts
    - process-steps.ts — self-contained; not built from a shared file.
    - eligibility-requirements.ts
    - index.ts
  - people/ — _PII-bearing concepts (the student record) are not yet built here; see section 8._
    - staff-member.ts
    - principal-profile.ts
    - alumni.ts
    - index.ts
  - facilities/
    - facility-profile.ts
    - panoramic-viewer.ts
    - index.ts
  - extracurriculars/
    - achievement.ts — `ExtracurricularAchievementSchema`, an achievement earned through an activity; imports `AchievementLevel` from `editorial/achievements/achievement.ts`. **This filename currently collides with `editorial/achievements/achievement.ts`** the same way `domains/societies/achievement.ts` once did (see below) — this one has not yet been renamed for disambiguation.
    - activity.ts
    - index.ts
  - societies/
    - society-profile.ts
    - membership.ts
    - society-achievement.ts — a society's own achievements (renamed from `achievement.ts` specifically to avoid sharing a bare filename with the unrelated concept in `editorial/achievements/achievement.ts`).
    - index.ts
  - results/
    - ol-aggregate-statistics.ts
    - al-aggregate-statistics.ts
    - display.ts — `GradeBadgeSchema` and related display/formatting shapes composed from the two aggregate-statistics files.
    - index.ts
  - contact/
    - contact-form.ts
    - feedback-form.ts
    - index.ts
  - identity/
    - school-identity.ts
    - index.ts
  - index.ts
- **editorial/** — CMS-authored content types that are not page-composition blocks.
  - news/
    - article.ts — `NewsArticleSchema` (id, title, slug, excerpt, content, coverImage, category, author, publishedAt, tags, seo, locale) and the lighter `ArticleCardSchema` projection. Featuring (pinning an article) is a separate mechanism — see `featured.ts` below — not a field on the article itself.
    - category.ts
    - featured.ts — `FeaturedArticleSchema`/`FeaturedNewsSchema`: a lightweight pointer (`articleId`, optional `displayUntil`) to one primary and any number of secondary featured articles, stored as its own `ContentEntry` (`sectionKey: 'news.featured'`) rather than a field on the article.
    - index.ts
  - events/
    - event.ts
    - calendar.ts — calendar entries (holidays, exam dates, assemblies, recurring or single-date) via `CalendarEntrySchema`, plus `AcademicCalendarSchema`. Distinct from `event.ts`'s one-off published events; the two schemas are not related to each other.
    - recurrence-rule.ts
    - category.ts
    - index.ts
  - gallery/
    - album.ts
    - photo.ts
    - index.ts
  - achievements/
    - achievement.ts — a school-wide achievement.
    - ticker-config.ts
    - index.ts
  - index.ts
- **shared/** — small, cross-cutting content utilities that are neither foundational primitives nor page-composition blocks.
  - search-result.ts
  - filter-option.ts — `value`/`label`/optional `count`, for any filterable listing (news category, gallery year, and so on).
  - lightbox-image.ts — a `pick()` off `ImageSchema` (src, alt, caption) for gallery/lightbox display.
  - toc-section.ts — `id`/`label` pair for a page's table-of-contents navigation.
  - video-source.ts — the `youtube` / `vimeo` / `direct` enum for embedded video.
  - index.ts
- **registry/** — the composition layer; the only folder permitted to depend on every other folder.
  - page-key.ts — `PAGE_KEY_VALUES`/`PageKeyEnum`, the closed set of 13 public page keys.
  - types.ts — `PageSection` (`key`, `blockKey`, `label`, `description`, `schema` — a direct, live schema reference, not a content-type-key indirection) and `PageRegistry` (`page`, `scope`, `label`, `description`, `sections`), the plain TypeScript interfaces every page-registry and global-registry file is built from.
  - content-type-key.ts — `CONTENT_TYPE_KEY_VALUES`, a flat array combining every block type with a hand-written list of editorial and domain type name strings (`'news-article'`, `'event'`, `'staff-member'`, and so on), and the `ContentTypeKeyEnum` built from it. See section 6 for exactly what this identifier system does and does not resolve today.
  - lookup.ts — `PAGE_REGISTRY` and `GLOBAL_SECTIONS`, built by directly aggregating each page-registry/global-registry file's exported object (not by resolving anything through `content-type-key.ts`), plus the query functions: `getPageDefinition()`, `getSectionDefinition()`, `getGlobalSection()`, `getAllSectionSchemas()`, `getGlobalSectionSchemas()` (both used by `content-entry.ts`'s `update` mutation to validate against the right schema), `getContentSchema()`, `getContentTypeDefinition()`, `getContentTypesByCategory()`. Nothing outside this file indexes `PAGE_REGISTRY` or `GLOBAL_SECTIONS` directly.
  - page-registry/
    - about.ts
    - home.ts
    - academics.ts
    - administration.ts
    - admissions.ts
    - contact.ts
    - events.ts
    - extracurriculars.ts
    - facilities.ts
    - gallery.ts
    - news.ts
    - results.ts
    - societies.ts
    - index.ts — a barrel, re-exporting every page file. `PAGE_REGISTRY` itself is assembled in `lookup.ts`, which imports this barrel as `* as PageRegistries` and hand-lists each page's registry object against `PageKeyEnum`.
  - global-registry/
    - navigation.ts
    - footer.ts
    - index.ts — a barrel, re-exporting `footer.ts` and `navigation.ts`. The real aggregated array is `GLOBAL_SECTIONS`, built in `lookup.ts` from this barrel's exports.
  - index.ts
- **index.ts** — the package root barrel. Re-exports each top-level folder as its own namespace (`Primitives`, `Constants`, `Utils`, `System`, `Blocks`, `Domains`, `Editorial`, `Shared`, `Registry`), each namespace itself built from explicit named exports, never a wildcard re-export at any level.

---

## 3. Dependency rules

| Tier | Folder                        | May import from                                   |
| ---- | ----------------------------- | ------------------------------------------------- |
| 0    | primitives/, constants/       | nothing internal (only the `zod` package)         |
| 1    | utils/                        | primitives/, constants/                           |
| 2    | system/                       | primitives/, constants/, utils/                   |
| 3    | shared/                       | primitives/, constants/, utils/, system/          |
| 4    | blocks/, domains/, editorial/ | primitives/, constants/, utils/, system/, shared/ |
| 5    | registry/                     | everything below it                               |

Forbidden import directions:

- **Any lower tier importing from a higher one.** The usual reasons: a lower tier that depended upward could no longer be understood, tested, or reused in isolation from the tiers built on top of it.
- **Lateral imports between tier-4 peers** (blocks/ ↔ domains/, blocks/ ↔ editorial/, domains/ ↔ editorial/). A domain entity does not know what a page block is; a "flexible block area" on a domain-backed page is composed one tier up, in the page registry, not by a domain schema embedding a block schema.
- **Any tier-4 module importing a sibling module's concept type directly** (`editorial/news/article.ts` importing `domains/academics/department.ts`). Cross-references are made by an opaque identifier string field, never by importing the other schema.
- **Anything importing registry/.** Registry is composition-only; nothing inside `@nexus/contracts` needs to import it back.

**Exception for genuine aggregators.** A file whose entire stated purpose is to aggregate across a tier it does not itself belong to — currently, the only such file in the package is `registry/content-type-key.ts`, importing across `blocks/`, `domains/`, and `editorial/` — is not violating the tier rules at all, since registry sits above tier 4 and is explicitly permitted to depend on it. An earlier draft of this package instead kept a block-only aggregator (`blocks/block-registry.ts`) living _inside_ tier 4, which was a same-tier sibling import masquerading as an aggregation step; folding the block identifier system into the single content-type system (section 6) removed that file. Should a genuine need for a same-tier aggregator ever arise again, it must say so explicitly in its own doc comment as a stated exception to the sibling-import rule — the rule itself has no silent exceptions.

Enforcement is two separate mechanisms, matched to two separate scopes:

- **Monorepo-level boundary:** an Nx project tag, `scope:contracts`, applied to the package, with an `onlyDependOnLibsWithTags` rule stating that `scope:contracts` may not depend on `scope:database`, `scope:api`, `scope:ui`, or any `scope:app-*` tag.
- **Intra-package folder boundary:** an `import/no-restricted-paths` ESLint rule (or an equivalent dependency-cruiser ruleset), one zone per tier, matching the table above.

---

## 4. Naming conventions

| Subject                | Convention                                                                                                                                                        | Example                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| File names             | kebab-case, always ending in an explicit `.ts` extension in relative imports                                                                                      | `staff-grid.ts`                                      |
| Schema constant        | `PascalCase` name ending in the literal word `Schema`                                                                                                             | `HeroSchema`                                         |
| Inferred type          | The schema name with `Schema` replaced by `Data`, applied with zero exceptions                                                                                    | `HeroData`                                           |
| Content-type constant  | `SCREAMING_SNAKE_CASE`, ending in `_CONTENT_TYPE`, declared once in the concept's own file and imported everywhere else it's needed                               | `HERO_CONTENT_TYPE`, `NEWS_ARTICLE_CONTENT_TYPE`     |
| Enums (Zod side)       | `PascalCase` name ending in `Enum`                                                                                                                                | `PublishStatusEnum`                                  |
| Enums (inferred type)  | Same `Data` rule as any other inferred type                                                                                                                       | `PublishStatusEnumData`                              |
| Enums (runtime values) | A `SCREAMING_SNAKE_CASE` constant array holding the literal values, declared once and passed into the enum builder                                                | `PUBLISH_STATUS_VALUES`                              |
| Barrels                | Every `index.ts`, at every depth, uses an explicit named-export list. A wildcard re-export (`export * from`) never appears anywhere in this package, at any depth | —                                                    |
| Root package export    | The root `index.ts` re-exports each top-level folder as a namespace object                                                                                        | `import { Blocks, Domains } from '@nexus/contracts'` |

**Why `XData` and never a bare `X`:** several concepts this package needs — `Document`, `Event`, `Location`, `History`, `Storage`, `Range`, `Text` — are also global TS/DOM types. A blanket `Data` suffix removes the need to judge collisions file-by-file.

**Why every registrable concept exports its own content-type constant:** the constant is the one place a content type's identifier string is declared. `registry/content-type-key.ts` _imports_ these constants to assemble its tuple (section 6) rather than inventing the literal strings itself — so a content type's identifier is never typed as a free-floating string literal in two different files.

**Directory/file collision rule:** no two concepts may ever share both a directory name and a sibling file name for the same subject in the same parent, and no folder may repeat its own parent's name one level down. Where two unrelated concepts would otherwise land on the identical filename in different folders (as `domains/societies/achievement.ts` and `editorial/achievements/achievement.ts` originally did), the filename itself is made specific enough to disambiguate without needing a comment — hence `society-achievement.ts`. (`domains/extracurriculars/achievement.ts` has the same collision today and is still pending the equivalent rename — see section 2.)

---

## 5. The canonical concept-file template

Every schema file in the package follows the same internal shape and ordering:

1. A one-line doc comment describing the concept.
2. Imports, in tier order: `zod`'s `z` first, then `primitives/`, `constants/`, `utils/`, `system/`, `shared/` as needed. A same-tier sibling is never imported by type — only referenced by an opaque identifier field with a comment naming what it points to.
3. Any runtime literal-value array backing a local enum, declared before the schema that uses it.
4. The schema constant itself, named per the `XSchema` convention, rejecting unknown keys by default.
5. Field-level defaults only, never object-level defaults, and only for structural/system fields.
6. The inferred type export, using the `XData` convention with zero exceptions.
7. If the concept is directly addressable as a `ContentEntry` (that is, it appears in `registry/content-type-key.ts`'s tuple), its own `<NAME>_CONTENT_TYPE` constant, declared here and nowhere else.
8. An optional `fieldDefinitions` export — an array of `FieldDefinitionData` values — present only on concepts editable through the admin dynamic form builder. This is a fully independent named export, not a required part of the pattern: a concept can have a schema, a type, and a content-type constant with no `fieldDefinitions` at all if nothing about it is ever hand-edited through the CMS form builder, and the presence of `fieldDefinitions` signals nothing about the other three exports beyond living in the same file.

**When a concept earns its own subdirectory:** a concept stays a single file for as long as every sub-shape it needs only ever appears nested inside it, and is promoted to a directory the moment either it needs more than one independently-referenced schema file, or one of its nested sub-entities itself needs to be imported on its own from elsewhere in the package.

**Exception to that rule — pure derivation pipelines.** `registry/content-type-key.ts` holds two artifacts — the `CONTENT_TYPE_KEY_VALUES` tuple and the `ContentTypeKeyEnum` built from it — yet stays one file on purpose, since the enum is mechanically derived from the tuple declared right above it. Splitting the two across files would risk them drifting out of sync. A file earns an exception to the one-schema-per-file default only when everything in it is derived, not independently authored.

---

## 6. The content-type identifier and registry contract

**What exists today.** `registry/content-type-key.ts` declares `CONTENT_TYPE_KEY_VALUES`, a flat `as const` array: every block type (spread in from `BLOCK_TYPE_VALUES`), followed by a hand-written list of editorial and domain type-name strings (`'news-article'`, `'news-category'`, `'event'`, `'event-category'`, `'gallery-album'`, `'gallery-photo'`, `'achievement'`, `'achievement-ticker'`, `'department'`, `'subject'`, `'stream'`, `'staff-member'`, `'facility'`, `'extracurricular'`, `'society'`, `'contact-form'`, `'feedback-form'`). `ContentTypeKeyEnum` is a plain `z.enum` over that array. There is no per-entry pairing of a schema with its constant, no discriminated-union schema, and no `CONTENT_TYPE_REGISTRY` anywhere in the package.

**What the enum is actually used for.** Only the block-type subset is functional. `lookup.ts` hand-writes `BLOCK_SCHEMA_MAP` and imports `BLOCK_RENDERER_MAP` (from `blocks/block-registry.ts`), each keyed by block type, and builds `getContentSchema(key)` and `getContentTypeDefinition(key)` on top of those two maps alone. Call either with an editorial or domain key from `ContentTypeKeyEnum` and you get `undefined` back, or a `{ key, renderer: undefined, schema: undefined }` shell — nothing behind the door yet. `getContentTypesByCategory('editorial' | 'domain')` returns an empty array unconditionally. `getContentTypesByCategory('block')` is the one category that actually works, returning `Object.keys(BLOCK_SCHEMA_MAP)`.

**Page and global composition don't go through this system at all.** `PageSection` and `PageRegistry` (`registry/types.ts`) are plain TypeScript interfaces, not Zod schemas, and a `PageSection` carries a `blockKey` plus a _direct_ `schema` reference — there's no `contentTypeKey` field, and nothing about placing a section on a page ever touches `ContentTypeKeyEnum` or the maps in `lookup.ts`. `PAGE_REGISTRY` is built in `lookup.ts` by directly importing and assembling each page-registry file's already-constructed `PageRegistry` object (`home: PageRegistries.homeRegistry`, `about: PageRegistries.aboutRegistry`, and so on). `getPageDefinition()`, `getSectionDefinition()`, and `getGlobalSection()` all operate on `PAGE_REGISTRY`/`GLOBAL_SECTIONS` directly. `getAllSectionSchemas()` and `getGlobalSectionSchemas()` flatten every page's (or every global section's) schemas into one `sectionKey → schema` map — this is what `content-entry.ts`'s `update` mutation actually validates incoming admin-panel data against.

**Net effect.** For blocks, the enum-plus-lookup pattern is real and does what a reader would expect. For editorial and domain content (news, events, staff, facilities, and so on), `ContentTypeKeyEnum` is currently just a closed list of name strings with no schema, renderer, or category resolution behind any of them — those concepts are validated and rendered entirely through their own dedicated schemas in `editorial/`/`domains/` and the page-registry files that reference them directly, bypassing this system entirely rather than routing through it.

**Known gap.** Mapping editorial and domain content types into `BLOCK_SCHEMA_MAP`/a renderer map (so `getContentSchema`/`getContentTypesByCategory` work uniformly across all three categories) is tracked as in-progress work, not a design decision still to be made — see the Feature Registry entry for the content-type registry.

---

## 7. Locale handling

- **`LocaleEnum`**, in `primitives/locale.ts`, is the single closed set of supported locales — English, Sinhala, Tamil.
- Two distinct, non-overlapping patterns cover every case of locale-scoped data:
  1. **Row-level locale scoping**, used for anything stored as a `ContentEntry`: one full row per locale, sharing the same `sectionKey` and `scope`, distinguished by the `locale` column on the entry itself. Whether a concept uses this pattern is implicit in its own schema — there is no shared `localeRequired` flag recorded in the registry.
  2. **Field-level locale scoping**, used inside a single schema for short translatable strings that travel alongside locale-independent structural data, modeled through `primitives/localized-text.ts`. All three locales are required — a missing translation fails validation immediately rather than silently falling back at render time.
- A single concept never mixes both patterns.
- Enum values themselves are never locale-scoped; any user-facing label for an enum value is a separate lookup owned by the UI/i18n layer (`messages/` JSON), never something this package produces.

---

## 8. Privacy and sensitivity rules

The admissions application form and the student directory record will carry personally identifiable information and must never be reachable from `apps/web`, even transitively — but **neither schema has been built yet**. `domains/admissions/` and `domains/people/` currently hold only the non-PII concepts listed in section 2 (key dates, process steps, eligibility requirements, staff/principal/alumni profiles); there is no `application-form.ts` and no `student.ts` anywhere in the package today.

**The isolation mechanism is an open decision, not yet made.** A dedicated sibling package — `@nexus/contracts-restricted`, tagged separately so `apps/web` could be forbidden from depending on it via Nx's `onlyDependOnLibsWithTags` — was proposed and considered, but was deliberately not pursued (see the Feature Registry). No replacement approach has been recorded in its place. Enforcing the boundary with a plain ESLint `no-restricted-imports` rule in `apps/web`'s config remains the other option on the table, but it is weaker than a build-graph-level tag rule and depends on whoever maintains that config remembering it exists.

**This means the two PII-bearing concepts need a real decision before either is built**, not just an implementation following an existing pattern. Whatever mechanism is chosen, the same principle should hold regardless: neither concept should ever get a content-type constant or a page-registry section, since neither is genuinely composed page content — an admissions application is data a visitor submits through a form, and a student record is an internal roster entry, not something rendered as a page section the way a hero block or a news article is.

Every other PII-adjacent boundary uses the doc-comment convention as a signal — a mandatory, literal, greppable "ADMIN-ONLY" comment on anything under `domains/people/` or `domains/admissions/` that's admin-facing but not itself PII (a staff member's internal notes field, say).

**Results data is unaffected by any of this**, and stays in the main package. Every schema under `domains/results/` models school-level aggregate statistics only — counts, percentages, pass rates. There is no field, anywhere in the package, capable of holding an individual student's grade. That boundary is a design omission rather than a runtime filter: the guarantee isn't that sensitive fields get stripped before the data leaves the server, it's that no such field exists to strip in the first place.

---

## 9. How to add X

**Adding a new content block**

1. Create `blocks/<block-name>.ts` following the canonical concept-file template: its schema and its inferred type.
2. Add the new key to `BLOCK_TYPE_VALUES` in `blocks/block-type.ts`.
3. Add the schema to `BLOCK_SCHEMA_MAP`, and its renderer to `BLOCK_RENDERER_MAP`, in `lookup.ts`/`block-registry.ts`. These are two hand-written maps, not derived from anything — both need updating by hand; only `BLOCK_SCHEMA_MAP` has a `satisfies Record<BlockTypeEnumData, z.ZodTypeAny>` check forcing every key to be present.
4. Add the same key string to `CONTENT_TYPE_KEY_VALUES` in `content-type-key.ts`.
5. Reference the new block from any `PageSection.blockKey` in `registry/page-registry/` or `registry/global-registry/` that should use it.

**Adding a new page to the registry**

1. Add the new page's key to `PAGE_KEY_VALUES` in `page-key.ts`.
2. Create `registry/page-registry/<page-key>.ts`, exporting a `PageRegistry` object (the interface from `types.ts`) built from an ordered list of `PageSection` entries, each with a direct `blockKey` and `schema`.
3. Re-export the new file from `registry/page-registry/index.ts` (a plain barrel).
4. Add the new page as one more entry in the hand-written `PAGE_REGISTRY` map in `lookup.ts`.

**Adding a new domain entity**

1. Decide which existing `domains/` subfolder the concept belongs to, or create a new one with its own `index.ts`.
2. If the concept carries PII or must never reach the public app, **stop and resolve the open isolation-mechanism decision in section 8 first** — there is currently no ready-made restricted package to drop it into.
3. Otherwise, create the concept file following the canonical concept-file template, export it from the subfolder's `index.ts`, and confirm the subfolder is exported from `domains/index.ts`.
4. If the concept's identifier should be part of the closed list, add its name string to `CONTENT_TYPE_KEY_VALUES`. Be aware this is currently bookkeeping only for editorial and domain entries — as section 6 explains, nothing wires one of them to a schema or renderer yet; validation for these concepts happens entirely through the page-registry section that references the concept's own schema directly.

**Adding a new global section**

1. Create `registry/global-registry/<section-name>.ts`, exporting a `PageSection` (from `types.ts`) with `key` set to `global.<section-name>`.
2. Re-export it from `registry/global-registry/index.ts` (a plain barrel).
3. Add it to the hand-written `GLOBAL_SECTIONS` array in `lookup.ts`.
4. If the section's content shape doesn't already exist, add it to `shared/` or the appropriate domain/editorial folder.

## 10. Anti-patterns

- **Ambiguous nesting.** A folder that repeats its parent's name one level down, or a directory and a file of the same name coexisting in the same parent.
- **A second identifier universe.** Maintaining a separate enum or registry for any subset of content types instead of one member of `ContentTypeKeyEnum`. Note that today only the block subset actually has working schema/renderer resolution behind that enum (section 6) — that's a gap being closed, not a model to copy for new content types.
- **Two hand-written maps drifting apart.** `BLOCK_SCHEMA_MAP` and `BLOCK_RENDERER_MAP` in `lookup.ts` are maintained by hand, keyed by the same `BlockTypeEnumData`. Only `BLOCK_SCHEMA_MAP` has a `satisfies` check forcing every key to be present; `BLOCK_RENDERER_MAP` (in `blocks/block-registry.ts`) has no equivalent guarantee. Adding a block type to one map without the other is the real risk.
- **Untyped, string-based keys.** A `blockKey` (or any registry key) typed as bare `string` anywhere in the registry layer, rather than against `BlockTypeEnumData` or `PageKeyEnumData`.
- **Indexing a registry map directly.** Reaching into `PAGE_REGISTRY` or `GLOBAL_SECTIONS` from outside `registry/lookup.ts` instead of calling the corresponding `get*()` function.
- **Mixing CMS mechanics into domain entities.** A domain schema directly embedding fields that belong to `system/cms` (a `status` workflow field, a raw `sectionKey`).
- **Bare inferred type names.** Exporting `type Event = z.infer<...>` instead of `EventData`, on the assumption that a particular name is unlikely to collide with a global type.
- **Object-level schema defaults.** Applying a `.default()` to an entire object rather than to individual structural fields.
- **A wildcard barrel export anywhere in the package**, at any depth, for any reason.
- **Treating a PII-bearing concept as a registry-composable content type.** Giving the admissions application form or the student record a content-type constant and a page-registry section, rather than recognizing that neither is genuinely composed page content and both need the isolation decision in section 8 resolved first.
- **Sibling tier-4 folders importing each other's schemas directly**, instead of holding an opaque identifier string.
