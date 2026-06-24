# adr/ADR-002-nextjs-app-router.md

#

**Date:** June 2026

**Status:** Accepted

---

## Context

The Nexus platform requires a web framework that supports:

- Server-side rendering (SSR) for SEO and performance
- Internationalisation (i18n) routing with three locales
- Static generation for content pages
- API routes for backend endpoints
- Server components for performance
- Client components for interactivity
- Image optimisation
- Middleware for authentication

The options considered:

1. **Next.js (Pages Router)** — The previous Next.js paradigm
2. **Next.js (App Router)** — The new Next.js paradigm
3. **Remix** — React framework with nested routing
4. **SvelteKit** — Framework built on Svelte
5. **Separate frontend/backend** — e.g., React + Express

---

## Decision

Use **Next.js 14+ with the App Router**.

### Justification

| Requirement        | How Next.js App Router Meets It   |
| ------------------ | --------------------------------- |
| SSR                | Native with server components     |
| i18n routing       | Deep integration with `next-intl` |
| Static generation  | `generateStaticParams`            |
| API routes         | Route handlers in `app/api/`      |
| Server components  | Default rendering mode            |
| Client components  | `'use client'` directive          |
| Image optimisation | `next/image`                      |
| Middleware         | Auth checks, i18n routing         |

---

## Alternatives Considered

### 1. Next.js Pages Router (Rejected)

**Pros:**

- Mature, well-understood
- Larger ecosystem

**Cons:**

- No server components
- i18n routing requires custom implementation
- More complex data fetching patterns
- Pages Router is legacy; App Router is the future

### 2. Remix (Rejected)

**Pros:**

- Excellent nested routing
- Progressive enhancement

**Cons:**

- No built-in image optimisation
- Less mature i18n support
- Smaller ecosystem
- Different mental model than React

### 3. Separate Frontend/Backend (Rejected)

**Pros:**

- Clear separation of concerns
- Backend can be reused for APIs

**Cons:**

- Two codebases to maintain
- Type safety requires code generation
- More complex deployment
- Additional latency for API calls

---

## Consequences

### Positive

- Single framework for both public site and admin panel
- Excellent performance with server components
- Built-in image optimisation (`next/image`)
- Deep i18n integration
- Static generation for content pages

### Negative

- App Router is still evolving
- Server/client component boundary requires understanding
- Some third-party libraries not fully App Router compatible

### Mitigations

- Use `'use client'` only when needed
- Keep components pure where possible
- Stay on latest stable Next.js version
- Document server/client patterns for the team

---
