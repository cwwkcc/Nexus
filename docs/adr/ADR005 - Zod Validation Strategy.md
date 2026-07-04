**Date:** June 2026 **Status:** Accepted **Supersedes:** Original text of this ADR, which named the package `packages/validation` and described a flat one-schema-per-entity structure. The decision to use Zod never changed; the package's name and internal organisation did, as its scope grew beyond validation alone. See Naming Note at the end.

---

## Context

The Nexus platform validates data at multiple layers:

1. **Admin forms** — Validate user input before submission
2. **API layer** — Validate incoming requests
3. **Database** — Validate data before insertion

Without a single source of truth, validation logic diverges across layers, leading to bugs and inconsistent behaviour.

The options considered:

1. **Zod** — TypeScript-native schema validation
2. **TypeScript interfaces** — No runtime validation
3. **Yup** — Object schema validation
4. **class-validator** — Decorator-based validation

---

## Decision

Use **Zod** as the single source of truth for data shapes, organised as `packages/contracts`.

### Architecture

```
┌───────────────────────────────────────────────────────────────────────┐
│                          packages/contracts                          │
│                                                                       │
│  core/        common primitives (address, date, image, link, locale, │
│               media, pagination, rich-text, SEO), plus cms/, api/,   │
│               auth/, permissions/, storage/                          │
│  blocks/      one Zod schema per reusable content block type         │
│               (hero, richText, timeline, faq, stats, ...)            │
│  content/     editorial domain schemas (news, events, gallery,       │
│               achievements)                                          │
│  school/      school-specific domain schemas (academics, admissions, │
│               facilities, people, societies)                        │
│  registry/    Page Registry + Global Registry + Site Settings        │
│               Registry — typed structure, not content itself         │
│                                                                       │
│  TypeScript type = z.infer<typeof SomeSchema>, everywhere            │
└─────────────────────────┬─────────────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  Admin Forms    │ │  tRPC Procedures│ │  Prisma Client  │
│  (client-side)  │ │  (server-side)  │ │  (server-side)  │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

Every tRPC procedure that accepts input validates it against the corresponding `@nexus/contracts` schema before touching the database — there is no procedure that skips this layer.

### Benefits

1. **Single source of truth** — One schema defines the shape everywhere
2. **TypeScript type inference** — `z.infer<T>` generates types
3. **Client + server validation** — Same schema validates both
4. **Rich validation** — Email, URL, min/max, etc.
5. **Error messages** — Customisable validation messages
6. **Grows by folder, not by flat list** — a new block type or domain entity gets its own file under `blocks/`, `content/`, or `school/` rather than growing one giant schema file

---

## Alternatives Considered

### 1. TypeScript Interfaces (Rejected)

**Pros:**

- Simple, no runtime overhead

**Cons:**

- No runtime validation
- Type drift between layers

### 2. Yup (Rejected)

**Pros:**

- Similar to Zod
- Good API

**Cons:**

- Less TypeScript integration
- Slower than Zod
- Less active development

### 3. class-validator (Rejected)

**Pros:**

- Decorator-based
- Works with classes

**Cons:**

- Requires classes, not plain objects
- More verbose than Zod
- Less friendly with inferred types

---

## Consequences

### Positive

- Single source of truth for data shapes
- End-to-end type safety
- Consistent validation across layers
- Excellent TypeScript integration

### Negative

- One more library to maintain
- Schemas must be updated when data model changes

### Mitigations

- Schemas live in `packages/contracts` — a single source of truth
- Schema changes trigger TypeScript errors in dependent code
- Migration script for schema updates

---

## Naming Note

This package was originally created and named `packages/validation`, and this ADR originally described it that way — a flat table of one schema per domain entity (`UserSchema`, `NewsArticleSchema`, `PageContentSchema`, and so on).

The rename to `packages/contracts` reflects what the package actually grew into: it is no longer just validation logic. It holds the Page Registry and Global Registry (structure, not content — see ADR-009), the reusable content block library that the CMS's dynamic form builder reads directly, and inferred types consumed throughout both apps whether or not validation is happening at that call site. "Contracts" describes what's actually being shared between the admin panel, the public site, and the database — validation is one thing the package does, not the whole of it.

The Zod-as-single-source-of-truth decision this ADR records did not change. Only the package's name and internal folder structure did, to match what it had already become.