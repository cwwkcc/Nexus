**Date:** June 2026

**Status:** Accepted

---

## Context

The Nexus platform requires an API layer that connects the frontend (React/Next.js) to the backend (PostgreSQL). The key requirements are:

- End-to-end type safety
- No duplication of API schemas
- Excellent developer experience
- Support for server and client components
- Built-in validation

The options considered:

1. **tRPC** — TypeScript-native RPC framework
2. **REST + OpenAPI** — Traditional REST with code generation
3. **GraphQL** — Query language with code generation
4. **Server Actions** — Next.js native form actions

---

## Decision

Use **tRPC** with Zod validation.

### Justification

| Requirement             | How tRPC Meets It                               |
| ----------------------- | ----------------------------------------------- |
| End-to-end type safety  | Native TypeScript inference                     |
| No API spec duplication | Same router defines server and client types     |
| Developer experience    | Autocomplete, type checking, and error handling |
| Server components       | Client can be called from server components     |
| Validation              | Integration with Zod                            |

---

## Alternatives Considered

### 1. REST + OpenAPI (Rejected)

**Pros:**

- Industry standard
- Language-agnostic

**Cons:**

- Requires code generation for type safety
- Schema duplication (spec + implementation)
- Manual endpoint management

### 2. GraphQL (Rejected)

**Pros:**

- Flexible queries
- Single endpoint

**Cons:**

- Overkill for this use case
- Complex resolver chains
- Requires code generation

### 3. Server Actions (Rejected)

**Pros:**

- Simple, native to Next.js
- No additional dependencies

**Cons:**

- No built-in type safety across client/server
- Limited support for complex operations
- No middleware ecosystem

---

## Consequences

### Positive

- End-to-end type safety with zero code generation
- Excellent autocomplete in IDE
- Type-safe errors on client
- Integration with Next.js server components
- Easy to add middleware (auth, logging, rate limiting)

### Negative

- Tightly couples frontend and backend (acceptable in monorepo)
- Not language-agnostic (all clients must be TypeScript)

### Mitigations

- Both apps and packages are TypeScript
- Future API consumers can use tRPC client with proper types
