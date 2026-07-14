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

@nexus/contracts exists so that every layer of the monorepo — `apps/web`, `apps/admin`, `packages/api`, and conceptually `packages/database` — shares one, and only one, definition of what every piece of data looks like. A page section rendered on the public site, a form rendered in the CMS, and a tRPC procedure that moves data between them all validate against the exact same schema object.

Concretely, this package is responsible for:

- Every shared primitive value shape (image, link, address, SEO metadata, and so on).
- Every system-level contract needed to operate the platform itself (auth, RBAC, file storage, generic API envelopes, CMS mechanics).
- The full library of content types — page-composition blocks, editorial content, and domain business entities alike — expressed through one identifier system, not several.
- The Page Registry and Global Registry: the structural definition of which sections exist on which page, in what order, and how each section maps onto a `ContentEntry` row.
- A small set of pure, dependency-light helper functions and compile-time constants that the rest of the package (and its consumers) would otherwise reinvent per-file.

This package explicitly does **not**:

- Contain business logic of any kind. It has no side effects; every export is either a Zod schema, a value derived purely from one, or a pure function that takes a value and returns a value.
- Touch a database, a filesystem, or the network.
- Import or export any React component — and, just as importantly, it does not know the *names* of renderer components either, even as plain strings. A renderer's name is a UI-layer naming decision; contracts has no reason to be edited when `packages/ui` renames a component. `packages/ui` owns the mapping from a content-type identifier to the component that renders it, keyed off the identifier this package defines, but the mapping itself lives entirely outside this package.
- Perform database access, even read-only convenience queries.

---

## 2. The complete directory tree

- **primitives/** — foundational, dependency-free value shapes used across every other folder.
  - locale.ts — the closed `LocaleEnum` (en, si, ta) and its runtime value list.
  - localized-text.ts — the reusable field-level shape for a short string that must exist in all three locales.
  - image.ts — a still image reference: source, per-locale alt text, dimensions, blur placeholder, optional caption.
  - link.ts — an internal or external link with a per-locale label.
  - address.ts — a physical address shape.
  - seo.ts — page-level SEO metadata (per-locale title/description, canonical URL, social image).
  - pagination.ts — generic pagination request parameters (page/cursor, page size) used by any listing query.
  - rich-text.ts — the constrained, serializable rich-text document shape used wherever long-form authored prose appears.
  - media/
    - audio.ts — an audio media reference.
    - video.ts — a video media reference.
    - document.ts — a downloadable document reference (PDF, DOCX, and so on).
    - index.ts
  - enums/
    - publish-status.ts — draft / in-review / published / archived.
    - visibility.ts — public / internal / admin-only.
    - priority.ts — low / medium / high / urgent.
    - sort-direction.ts — ascending / descending, for query ordering.
    - index.ts
  - index.ts
- **constants/** — pure compile-time constants that are not schemas and not runtime configuration.
  - limits.ts — `DEFAULT_PAGE_SIZE`, `MAX_GALLERY_IMAGES`, `MIN_PASSWORD_LENGTH`, `DEFAULT_UPLOAD_LIMIT`, and any other fixed numeric/string limit referenced from more than one schema.
  - index.ts
- **utils/** — pure helper functions. Depends only on `primitives/` and `constants/`; nothing here touches Zod's runtime-parsing surface beyond composing schemas that are passed in.
  - schema.ts — generic, concept-agnostic helpers for building a discriminated-union schema and a keyed lookup record from a single ordered tuple of schemas (see section 6) — reusable anywhere this package needs that pattern, not just in the registry.
  - enum.ts — helpers for pairing a Zod enum with its runtime value list, and the `assertNever` exhaustiveness helper used at the bottom of any `switch` that must handle every enum member.
  - content.ts — `isLocalized()`, `normalizeRichText()`, and similar pure predicates/transforms over primitive shapes.
  - response.ts — `createResponseEnvelope()` and the paginated-envelope factory, parameterized over a payload schema.
  - index.ts
- **system/** — cross-cutting platform contracts, tied to no single business domain.
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
    - response-envelope.ts — the generic success/error response wrapper, parameterized over a payload schema (built on `utils/response.ts`).
    - pagination-meta.ts — the response-side pagination metadata (total items, total pages, current page).
    - index.ts
  - cms/
    - content-entry.ts — the generic content entry shape mirroring the database row: section key, scope, locale, content-type identifier, opaque data payload, status.
    - content-entry-version.ts — a single version-history row for a content entry.
    - field-definition.ts — the metadata shape describing one editable field for the admin dynamic form builder.
    - workflow-state.ts — the draft/review/publish workflow state enum and the set of legal transitions between states.
    - index.ts
  - index.ts
- **blocks/** — the ~20 reusable, page-agnostic content blocks. Each file is a self-contained concept: a schema, its inferred type, and its own content-type constant. There is deliberately no aggregator file in this folder — aggregation across every block happens once, in `registry/content-type-key.ts` (see section 6).
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
- **domains/** — school business entities.
  - academics/
    - curriculum.ts
    - department.ts
    - subject.ts
    - al-stream.ts
    - stream-comparison.ts
    - index.ts
  - admissions/ — *the application form itself lives outside this package; see section 8.*
    - key-dates.ts
    - process-steps.ts — built from `shared/process-step.ts`.
    - eligibility-requirements.ts
    - index.ts
  - people/ — *the student record itself lives outside this package; see section 8.*
    - staff-member.ts
    - principal-profile.ts
    - alumni.ts
    - index.ts
  - facilities/
    - facility-profile.ts
    - panoramic-viewer.ts
    - index.ts
  - extracurriculars/
    - activity.ts
    - index.ts
  - societies/
    - society-profile.ts
    - membership.ts
    - society-achievement.ts — a society's own achievements (renamed from `achievement.ts` specifically to avoid sharing a bare filename with the unrelated concept in `editorial/achievements/achievement.ts`).
    - index.ts
  - results/
    - ol-aggregate-statistics.ts
    - al-aggregate-statistics.ts
    - index.ts
  - contact/
    - contact-form.ts
    - feedback-form.ts
    - index.ts
  - identity/
    - school-identity.ts
    - academic-year.ts
    - term.ts
    - timetable.ts
    - index.ts
  - index.ts
- **editorial/** — CMS-authored content types that are not page-composition blocks.
  - news/
    - article.ts — includes featured-pin fields (`isPinned`, `pinnedOrder`) directly.
    - category.ts
    - index.ts
  - events/
    - event.ts
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
- **shared/** — small, cross-cutting content utilities that are neither foundational primitives nor page-composition blocks.
  - search-result.ts
  - nav-structure.ts
  - media-lightbox-item.ts
  - process-step.ts
  - index.ts
- **registry/** — the composition layer; the only folder permitted to depend on every other folder.
  - section-definition.ts — the atomic unit of page/global composition (section key, scope, content-type identifier, order). Locale-requirement is *not* declared here — it is intrinsic to the content type itself and is looked up from `content-type-key.ts`, not re-declared per section.
  - page-definition.ts — a full page's section list plus its SEO defaults, keyed by a closed `PageKeyEnum`.
  - content-type-key.ts — the single identifier system for every content type in the package (see section 6 for the full construction pattern). Contains, in order: the ordered tuple of every registrable schema; the derived `ContentTypeKeyEnum`; the derived all-content discriminated-union schema; the derived `CONTENT_TYPE_REGISTRY` record of `ContentTypeDefinition` values.
  - lookup.ts — the only supported way to query the registry: `getContentSchema()`, `getContentTypeDefinition()`, `getContentTypesByCategory()`, `getSectionDefinition()`, `getPageDefinition()`, `getGlobalSection()`. Nothing outside this file indexes `CONTENT_TYPE_REGISTRY`, `PAGE_REGISTRY`, or `GLOBAL_REGISTRY` directly.
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
    - index.ts — builds and exports `PAGE_REGISTRY`, exhaustively checked against `PageKeyEnum`.
  - global-registry/
    - navigation.ts
    - footer.ts
    - index.ts — builds and exports `GLOBAL_REGISTRY`.
  - index.ts
- **index.ts** — the package root barrel. Re-exports each top-level folder as its own namespace (`Primitives`, `Constants`, `Utils`, `System`, `Blocks`, `Domains`, `Editorial`, `Shared`, `Registry`), each namespace itself built from explicit named exports, never a wildcard re-export at any level.

---

## 3. Dependency rules

| Tier | Folder                        | May import from                                   |
| ---- | ----------------------------- | ------------------------------------------------- |
| 0    | primitives/, constants/       | nothing internal (only the `zod` package)         |
| 1    | utils/                        | primitives/, constants/                           |
| 2    | system/                       | primitives/, constants/, utils/                   |
| 3    | shared/                       | primitives/, constants/, utils/, system/          |
| 4    | blocks/, domains/, editorial/ | primitives/, constants/, utils/, system/, shared/ |
| 5    | registry/                     | everything below it                               |

Forbidden import directions:

- **Any lower tier importing from a higher one.** The usual reasons: a lower tier that depended upward could no longer be understood, tested, or reused in isolation from the tiers built on top of it.
- **Lateral imports between tier-4 peers** (blocks/ ↔ domains/, blocks/ ↔ editorial/, domains/ ↔ editorial/). A domain entity does not know what a page block is; a "flexible block area" on a domain-backed page is composed one tier up, in the page registry, not by a domain schema embedding a block schema.
- **Any tier-4 module importing a sibling module's concept type directly** (`editorial/news/article.ts` importing `domains/academics/department.ts`). Cross-references are made by an opaque identifier string field, never by importing the other schema.
- **Anything importing registry/.** Registry is composition-only; nothing inside `@nexus/contracts` needs to import it back.

**Exception for genuine aggregators.** A file whose entire stated purpose is to aggregate across a tier it does not itself belong to — currently, the only such file in the package is `registry/content-type-key.ts`, importing across `blocks/`, `domains/`, and `editorial/` — is not violating the tier rules at all, since registry sits above tier 4 and is explicitly permitted to depend on it. This is worth stating plainly because an earlier draft of this package kept a block-only aggregator (`blocks/block-registry.ts`) living *inside* tier 4, which would have been a same-tier sibling import masquerading as an aggregation step. Folding the block identifier system into the single content-type system (section 6) removed that file entirely, along with the contradiction it caused. Should a genuine need for a same-tier aggregator ever arise again, it must say so explicitly in its own doc comment as a stated exception to the sibling-import rule — the rule itself has no silent exceptions.

Enforcement is two separate mechanisms, matched to two separate scopes:

- **Monorepo-level boundary:** an Nx project tag, `scope:contracts`, applied to the package, with an `onlyDependOnLibsWithTags` rule stating that `scope:contracts` may not depend on `scope:database`, `scope:api`, `scope:ui`, or any `scope:app-*` tag.
- **Intra-package folder boundary:** an `import/no-restricted-paths` ESLint rule (or an equivalent dependency-cruiser ruleset), one zone per tier, matching the table above.

---

## 4. Naming conventions

| Subject                | Convention                                                                                                                                                        | Example                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| File names             | kebab-case, always ending in an explicit `.ts` extension in relative imports                                                                                      | `staff-grid.ts`                                      |
| Schema constant        | `PascalCase` name ending in the literal word `Schema`                                                                                                             | `HeroSchema`                                         |
| Inferred type          | The schema name with `Schema` replaced by `Data`, applied with zero exceptions                                                                                    | `HeroData`                                           |
| Content-type constant  | `SCREAMING_SNAKE_CASE`, ending in `_CONTENT_TYPE`, declared once in the concept's own file and imported everywhere else it's needed                               | `HERO_CONTENT_TYPE`, `NEWS_ARTICLE_CONTENT_TYPE`     |
| Enums (Zod side)       | `PascalCase` name ending in `Enum`                                                                                                                                | `PublishStatusEnum`                                  |
| Enums (inferred type)  | Same `Data` rule as any other inferred type                                                                                                                       | `PublishStatusEnumData`                              |
| Enums (runtime values) | A `SCREAMING_SNAKE_CASE` constant array holding the literal values, declared once and passed into the enum builder                                                | `PUBLISH_STATUS_VALUES`                              |
| Barrels                | Every `index.ts`, at every depth, uses an explicit named-export list. A wildcard re-export (`export * from`) never appears anywhere in this package, at any depth | —                                                    |
| Root package export    | The root `index.ts` re-exports each top-level folder as a namespace object                                                                                        | `import { Blocks, Domains } from '@nexus/contracts'` |

**Why `XData` and never a bare `X`:** several concepts this package needs — `Document`, `Event`, `Location`, `History`, `Storage`, `Range`, `Text` — are also global TS/DOM types. A blanket `Data` suffix removes the need to judge collisions file-by-file.

**Why every registrable concept exports its own content-type constant:** the constant is the one place a content type's identifier string is declared. `registry/content-type-key.ts` *imports* these constants to assemble its tuple (section 6) rather than inventing the literal strings itself — so a content type's identifier is never typed as a free-floating string literal in two different files.

**Directory/file collision rule:** no two concepts may ever share both a directory name and a sibling file name for the same subject in the same parent, and no folder may repeat its own parent's name one level down. Where two unrelated concepts would otherwise land on the identical filename in different folders (as `domains/societies/achievement.ts` and `editorial/achievements/achievement.ts` originally did), the filename itself is made specific enough to disambiguate without needing a comment — hence `society-achievement.ts`.

---

## 5. The canonical concept-file template

Every schema file in the package follows the same internal shape and ordering:

1. A one-line doc comment describing the concept.
2. Imports, in tier order: `zod`'s `z` first, then `primitives/`, `constants/`, `utils/`, `system/`, `shared/` as needed. A same-tier sibling is never imported by type — only referenced by an opaque identifier field with a comment naming what it points to.
3. Any runtime literal-value array backing a local enum, declared before the schema that uses it.
4. The schema constant itself, named per the `XSchema` convention, rejecting unknown keys by default.
5. Field-level defaults only, never object-level defaults, and only for structural/system fields.
6. The inferred type export, using the `XData` convention with zero exceptions.
7. If the concept is directly addressable as a `ContentEntry` (that is, it appears in `registry/content-type-key.ts`'s tuple), its own `<NAME>_CONTENT_TYPE` constant, declared here and nowhere else.
8. An optional `fieldDefinitions` export — an array of `FieldDefinitionData` values — present only on concepts editable through the admin dynamic form builder. This is a fully independent named export, not a required part of the pattern: a concept can have a schema, a type, and a content-type constant with no `fieldDefinitions` at all if nothing about it is ever hand-edited through the CMS form builder, and the presence of `fieldDefinitions` signals nothing about the other three exports beyond living in the same file.

**When a concept earns its own subdirectory:** a concept stays a single file for as long as every sub-shape it needs only ever appears nested inside it, and is promoted to a directory the moment either it needs more than one independently-referenced schema file, or one of its nested sub-entities itself needs to be imported on its own from elsewhere in the package.

**Exception to that rule — pure derivation pipelines.** `registry/content-type-key.ts` contains several distinct artifacts (a tuple, an enum, a discriminated-union schema, a lookup record) yet stays one file on purpose. Every artifact in it is mechanically derived from the single ordered tuple declared at its top; splitting the derivations across files would risk the source tuple and its derived artifacts drifting out of sync with each other — exactly the failure mode this pattern exists to prevent. A file earns an exception to the one-schema-per-file default only when everything in it is derived, not independently authored.

---

## 6. The content-type identifier and registry contract

A single identifier system, not two. Every concept that can be stored as a `ContentEntry` — whether it's a page block (`hero`), an editorial content type (`news-article`), or a domain content type (`staff-member`) — is a member of one closed enum, `ContentTypeKeyEnum`, built in `registry/content-type-key.ts`. Blocks are not a separate identifier universe with their own registry; they are simply the subset of content types whose `category` is `"block"`.

**Construction pattern.** `registry/content-type-key.ts` declares one ordered array literal — an `as const` tuple, not a plain array — listing every registrable concept's already-exported schema and content-type constant, one entry per concept (`HeroSchema` alongside `HERO_CONTENT_TYPE`, `NewsArticleSchema` alongside `NEWS_ARTICLE_CONTENT_TYPE`, and so on for every block, domain, and editorial concept). Three further artifacts are then *derived* from that one tuple, using the generic helper in `utils/schema.ts`, and never independently declared:

- The `ContentTypeKeyEnum` itself, built from the tuple's content-type constants.
- The all-content discriminated-union schema, built directly over the tuple's schemas.
- `CONTENT_TYPE_REGISTRY`, a record keyed by each entry's content-type constant, whose value is a `ContentTypeDefinition`: the schema, a `category` (`"block" | "domain" | "editorial"`), an `editable` flag, a `localeRequired` flag, and an optional `fieldDefinitions` reference.

Declaring the tuple first and deriving the enum, the union, and the record from it — rather than building a plain keyed record up front and trying to reconstruct a discriminated union from its values afterward — is what keeps every entry's discriminant a literal type all the way through every derived artifact. Building the union from `Object.values()` of an already-built record widens the discriminant to a plain `string`, which is not narrow enough for `z.discriminatedUnion` to actually discriminate. The tuple is the one source of truth; everything else is a projection of it.

**What this buys structurally:** adding a concept to the tuple without it being a real, already-exported schema is a type error, since the tuple's entries are typed against the concrete schema and constant exports themselves, not against `unknown`. Referencing a content-type key anywhere in the registry (a section definition's `contentTypeKey` field) that isn't a member of `ContentTypeKeyEnum` is a type error for the same reason `BlockTypeEnum` used to guarantee this for blocks alone — the guarantee is unchanged, it's just now expressed once, over the whole content-type space, instead of twice.

**What is deliberately not in `ContentTypeDefinition`:** a renderer name, or any reference to a UI component. `packages/ui`maintains its own `RendererRegistry`, keyed by the same `ContentTypeKeyEnum` imported from this package for type-safety, mapping each content-type key to the actual component that renders it. `@nexus/contracts` supplies the identifier space; it has no opinion about, and no dependency on, what renders each identifier.

**The registry's public API.** Nothing outside `registry/lookup.ts` indexes `CONTENT_TYPE_REGISTRY`, `PAGE_REGISTRY`, or `GLOBAL_REGISTRY` directly. `getContentSchema(key)`, `getContentTypeDefinition(key)`, `getContentTypesByCategory(category)` (used, for example, by the admin "add a block" picker, which only wants the `"block"` category), `getSectionDefinition(scope, sectionKey)`, `getPageDefinition(pageKey)`, and `getGlobalSection(sectionKey)` are the entire consumer-facing surface of the registry layer.

**`SectionDefinitionSchema`** ties a `sectionKey` (unique within its owning page or the global scope, and exactly the value written to `ContentEntry.sectionKey`), a `scope` (`global` or `page:<pageKey>`, exactly matching `ContentEntry.scope`), a `contentTypeKey` (typed against `ContentTypeKeyEnum`), and an `order` integer. It does not carry its own locale-requirement flag — that's looked up from the content type's own `ContentTypeDefinition`, since whether a concept is translated is intrinsic to the concept, not to where it's placed.

**`PageDefinitionSchema`** is a `pageKey` drawn from a closed `PageKeyEnum`, the page's route `path`, an ordered array of `SectionDefinitionData`, and a default `SeoMetadataSchema`-shaped SEO block.

**Mapping to the database:** the triple of `scope`, `sectionKey`, and (when the content type's `localeRequired` is true) `locale` is exactly the natural key a `ContentEntry` row satisfies. `getContentSchema()` resolves a `(scope, sectionKey)` pair, by way of its `contentTypeKey`, to the concrete schema that must validate that entry's `data` payload — used identically by `apps/admin` before writing and by `apps/web` after reading.

---

## 7. Locale handling

- **`LocaleEnum`**, in `primitives/locale.ts`, is the single closed set of supported locales — English, Sinhala, Tamil.
- Two distinct, non-overlapping patterns cover every case of locale-scoped data:
  1. **Row-level locale scoping**, used for anything stored as a `ContentEntry`: one full row per locale, sharing the same `sectionKey` and `scope`, distinguished by the `locale` column on the entry itself. Whether a given content type uses this pattern is recorded once, on its `ContentTypeDefinition` (`localeRequired`), not per placement.
  2. **Field-level locale scoping**, used inside a single schema for short translatable strings that travel alongside locale-independent structural data, modeled through `primitives/localized-text.ts`. All three locales are required — a missing translation fails validation immediately rather than silently falling back at render time.
- A single concept never mixes both patterns.
- Enum values themselves are never locale-scoped; any user-facing label for an enum value is a separate lookup owned by the UI/i18n layer (`messages/` JSON), never something this package produces.

---

## 8. Privacy and sensitivity rules

The admissions application form and the student directory record carry personally identifiable information and must never be reachable from `apps/web`, even transitively. Enforcing that with an Nx project tag applied to "just these two files" does not work — Nx module boundaries tag whole projects, not individual files inside one project, so there is no way to give two files inside `packages/contracts` a different tag from the rest of the package.

The two real options are to enforce this with a plain ESLint `no-restricted-imports` rule blocking specific file globs in `apps/web`'s config (weaker — a lint-config rule, not a build-graph rule, and only as strong as whoever maintains that config remembering it exists), or to physically split these two concepts into their own Nx project, where a real tag-based `onlyDependOnLibsWithTags` rule can forbid `apps/web` from depending on it at all. This package takes the second option.

**`@nexus/contracts-restricted`** is a small sibling package, at `packages/contracts-restricted`, holding exactly:

- domains/admissions/application-form.ts
- domains/people/student.ts
- index.ts

It follows every convention in this document — the same concept-file template, the same `XSchema`/`XData` naming — it is simply a second, separate Nx project, tagged `scope:contracts-restricted`, with `apps/web`'s Nx tag configured to forbid depending on it via `onlyDependOnLibsWithTags`. Only `apps/admin` and the admin-facing procedures in `packages/api` depend on it.

Critically, `@nexus/contracts` (this package) never imports from `@nexus/contracts-restricted`, in either direction. Neither `application-form` nor `student` appears in `registry/content-type-key.ts`'s tuple, and neither has a page or global section anywhere in the registry — because neither is genuinely a piece of composed page content in the first place. An admissions application is data a visitor submits through a form; a student record is an internal roster entry. Neither is ever rendered as a page section the way a hero block or a news article is, so excluding them from the content-type/registry system isn't a workaround — it reflects what they actually are. This is also what keeps the restriction real rather than nominal: if `@nexus/contracts`'s own registry re-exported these schemas anywhere on its public surface, `apps/web`'s dependency on `@nexus/contracts` would transitively pull them in regardless of what any lint rule says about direct imports. Because the main package's registry has no path to them at all, there is nothing for `apps/web` to pull in even by accident.

Every remaining PII-adjacent boundary still uses the doc-comment convention as a secondary signal — a mandatory, literal, greppable "ADMIN-ONLY" comment on anything under `domains/people/` or `domains/admissions/` that's admin-facing but not itself PII (a staff member's internal notes field, say) — but the load-bearing guarantee, for the two genuinely PII-bearing concepts, is the separate package, not the comment.

**Results data is unaffected by any of this**, and stays in the main package. Every schema under `domains/results/` models school-level aggregate statistics only — counts, percentages, pass rates. There is no field, anywhere in the package, capable of holding an individual student's grade. That boundary is a design omission rather than a runtime filter: the guarantee isn't that sensitive fields get stripped before the data leaves the server, it's that no such field exists to strip in the first place.

---

## 9. How to add X

**Adding a new content block**

1. Create `blocks/<block-name>.ts` following the canonical concept-file template: its schema, its inferred type, and its own `<NAME>_CONTENT_TYPE` constant.
2. Add that schema and constant as one new entry in the ordered tuple at the top of `registry/content-type-key.ts`, with `category: "block"`.
3. Reference the new content-type constant from any `SectionDefinitionData` in `registry/page-registry/` or `registry/global-registry/`that should use it.

The enum, the discriminated union, and the registry record all update automatically from step 2 — there is no second map to remember to touch.

**Adding a new page to the registry**

1. Add the new page's key to the closed `PageKeyEnum`.
2. Create `registry/page-registry/<page-key>.ts`, exporting a `PageDefinitionData` built from an ordered list of `SectionDefinitionData`entries, each pointing at a content-type key already present in `content-type-key.ts`.
3. Register the new file's export in `registry/page-registry/index.ts`'s `PAGE_REGISTRY` map.
4. If the page introduces any new content-type identifiers, add them to `registry/content-type-key.ts`'s tuple first.

**Adding a new domain entity**

1. Decide which existing `domains/` subfolder the concept belongs to, or create a new one with its own `index.ts`.
2. If the concept carries PII or must never reach the public app, it does not go in `domains/` at all — it goes in `packages/contracts-restricted`, following the same template.
3. Otherwise, create the concept file following the canonical concept-file template, export it from the subfolder's `index.ts`, and confirm the subfolder is exported from `domains/index.ts`.
4. If the concept should appear as a registry section anywhere, add it to `registry/content-type-key.ts`'s tuple with `category: "domain"` and reference it from the relevant page or global section definition.

**Adding a new global section**

1. Create `registry/global-registry/<section-name>.ts`, exporting a `SectionDefinitionData` with `scope` set to `global`.
2. Register it in `registry/global-registry/index.ts`'s `GLOBAL_REGISTRY` map.
3. If the section's content shape doesn't already exist, add it to `shared/` or the appropriate domain/editorial folder, then add its content-type constant to `registry/content-type-key.ts`'s tuple.

---

## 10. Anti-patterns

- **Ambiguous nesting.** A folder that repeats its parent's name one level down, or a directory and a file of the same name coexisting in the same parent.
- **Duplicate concept homes.** Defining the same shape twice under two different names because it was needed from two different folders. If a shape is genuinely reused, it belongs in exactly one place and every other consumer imports that one definition.
- **A second identifier universe.** Maintaining a separate enum or registry for any subset of content types (blocks, or any other category) instead of one member of the single `ContentTypeKeyEnum` with a `category` field. This was a real mistake in an earlier draft of this package and is the single largest structural change this revision makes.
- **Renderer knowledge leaking into contracts.** A field, map, or constant anywhere in this package that names a UI component, even as a plain string. That knowledge belongs entirely to `packages/ui`'s own registry.
- **Reconstructing a discriminated union from a record's values.** Building `CONTENT_TYPE_REGISTRY` first and deriving the all-content schema from `Object.values()` of it, rather than declaring the ordered tuple first and deriving both the record and the union from that one tuple. The former silently widens every discriminant to `string` and breaks narrowing.
- **Untyped, string-based registry keys.** A `contentTypeKey` field typed as bare `string` anywhere in the registry layer.
- **Indexing a registry map directly.** Reaching into `CONTENT_TYPE_REGISTRY`, `PAGE_REGISTRY`, or `GLOBAL_REGISTRY` from outside `registry/lookup.ts` instead of calling the corresponding `get*()` function.
- **Mixing CMS mechanics into domain entities.** A domain schema directly embedding fields that belong to `system/cms` (a `status` workflow field, a raw `sectionKey`).
- **Bare inferred type names.** Exporting `type Event = z.infer<...>` instead of `EventData`, on the assumption that a particular name is unlikely to collide with a global type.
- **Object-level schema defaults.** Applying a `.default()` to an entire object rather than to individual structural fields.
- **A wildcard barrel export anywhere in the package**, at any depth, for any reason.
- **Treating a PII-bearing concept as a registry-composable content type.** Giving the admissions application form or the student record a content-type constant and a page-registry section, rather than recognizing that neither is genuinely composed page content and both belong in `@nexus/contracts-restricted` instead.
- **Sibling tier-4 folders importing each other's schemas directly**, instead of holding an opaque identifier string.
