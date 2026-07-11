# @nexus/contracts

## What this package is

@nexus/contracts is the single source of truth for every data shape shared across the Nexus monorepo. It holds the Zod schemas, their inferred TypeScript types, the Page Registry and Global Registry (the structural map of which content sections exist on which page, in what order), and the reusable content-block schema library that the admin panel's dynamic form builder reads directly to render editing UI.

This package is pure. It defines shapes and pure validation/lookup functions only. It never touches a database, never imports React, never performs a network call, and never contains business logic — only what a value must look like, and, at the registry layer, how values compose into pages. `packages/database` keeps its Prisma schema conceptually in sync with the core entry/versioning shapes defined here; `packages/api` validates tRPC input and output against these schemas; `apps/web` and `apps/admin` both consume the same shapes so that public rendering and CMS editing can never silently disagree about what a piece of content looks like.

## Folder overview

- **primitives/** — foundational, dependency-free value objects reused everywhere: locale, image, link, address, SEO metadata, pagination params, rich text, non-image media, and the small shared enums (publish status, visibility, priority, sort direction).
- **constants/** — pure compile-time constants that aren't schemas (page-size defaults, upload limits, and the like).
- **utils/** — pure, dependency-light helper functions (schema-derivation helpers, enum/exhaustiveness helpers, content and response helpers) used throughout the rest of the package.
- **system/** — cross-cutting platform contracts that belong to no single domain: auth (user, session), RBAC (role, permission), file storage (upload flow, object keys), generic API envelopes (errors, pagination meta), and CMS mechanics (content entry, version history, field-definition metadata, workflow state).
- **blocks/** — the ~20 reusable, page-agnostic content blocks (hero, stats, timeline, FAQ, gallery, and so on). Each is simply one category of content type within the single identifier system the registry maintains — there is no separate block-only registry.
- **domains/** — school business entities: academics, admissions, people, facilities, extracurriculars, societies, results, contact, and school identity/calendar concepts. The two concepts here that carry PII (the admissions application form, the student record) live outside this package entirely — see below.
- **editorial/** — CMS-authored content types distinct from page blocks: news, events, photo galleries, and achievements.
- **shared/** — a small set of cross-cutting content utilities that are neither foundational primitives nor page blocks: search results, the navigation content shape, the media lightbox item, and the reusable "step" primitive.
- **registry/** — the composition layer. Defines every page and every global section, ties each section to a content-type identifier (the single identifier space spanning blocks, domain entities, and editorial content alike) and a database `(scope, sectionKey)` pair, and is the only folder allowed to depend on everything else. It has no knowledge of renderer components — `packages/ui` owns its own registry mapping the same identifiers to actual components.

## How to import

Every top-level folder is re-exported from the package root as its own namespace, so a consumer always writes `Blocks.Hero.HeroSchema` or `Domains.Academics.DepartmentSchema` rather than a flat, collision-prone import. Never import a file from deep inside another folder directly — always go through that folder's namespace on the root barrel. This keeps every consumer's import statements stable even as files move around inside a folder.

## Going deeper

This README only orients. For the full directory manifest, the dependency and naming rules, the content-type identifier and registry contract, locale handling, the privacy rules for PII-bearing concepts, and copy-pasteable checklists for extending the package, see `docs/architecture/contracts.md`. That document is the authoritative reference — when in doubt about where a file belongs or what a schema should be named, it wins.
