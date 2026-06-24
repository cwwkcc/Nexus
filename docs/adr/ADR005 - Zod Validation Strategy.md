
---

# adr/ADR-005-zod-validation.md

# 

**Date:** June 2026

**Status:** Accepted

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

Use **Zod** as the single source of truth for data shapes.

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    packages/validation                         │
│                                                                 │
│  UserSchema = z.object({ name: z.string(), ... })             │
│  TypeScript type = z.infer<typeof UserSchema>                 │
└─────────────────────────┬───────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  Admin Forms    │ │  tRPC Procedures│ │  Prisma Client  │
│  (client-side)  │ │  (server-side)  │ │  (server-side)  │
└─────────────────┘ └─────────────────┘ └─────────────────┘
```

### Benefits

1. **Single source of truth** — One schema defines the shape everywhere
2. **TypeScript type inference** — `z.infer<T>` generates types
3. **Client + server validation** — Same schema validates both
4. **Rich validation** — Email, URL, min/max, etc.
5. **Error messages** — Customisable validation messages

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

- Schemas live in `packages/validation` — a single source of truth
- Schema changes trigger TypeScript errors in dependent code
- Migration script for schema updates

---

