**Date:** June 2026

**Status:** Accepted

---

## Context

The Nexus platform consists of multiple deployable applications (public website and admin panel) and multiple shared libraries (UI components, design tokens, validation schemas, database client, API definitions). These pieces need to be developed and deployed together, and they share dependencies and code.

The options considered:

1. **Separate repositories** — each application and package in its own repo, published via npm
2. **Monorepo with pnpm workspaces** — all code in one repository, managed with pnpm workspaces
3. **Monorepo with Turborepo** — similar to pnpm workspaces but with additional caching

---

## Decision

Use a **pnpm monorepo with Nx orchestration**.

### Structure

```
nexus/
├── apps/
│   ├── web/          # Public website
│   └── admin/        # Admin panel
├── packages/
│   ├── ui/           # Shared component library
│   ├── config/       # Next.js/Tailwind/font build configuration
│   ├── tokens/       # Design tokens (generates CSS vars + Tailwind class groups)
│   ├── contracts/    # Zod schemas, Page Registry, content blocks (ADR-005)
│   ├── env/          # Typed, validated environment variables (server/client split)
│   ├── transport/    # Non-tRPC HTTP client, for third-party APIs (Resend, R2, reCAPTCHA)
│   ├── database/     # Prisma client and schema
│   └── api/          # tRPC router definitions
└── docker-compose.yml
```

### Nx Integration

Nx provides:

- Task caching (`build`, `lint`, `typecheck`)
- Affected commands (`nx affected:build` only rebuilds changed packages)
- Dependency graph visualisation
- Consistent task running across the monorepo

---

## Alternatives Considered

### 1. Separate Repositories (Rejected)

**Pros:**

- Clear ownership boundaries
- Independent versioning

**Cons:**

- Cross-repo changes require multiple PRs
- Publishing npm packages for every change
- Duplicated configuration
- Harder to make breaking changes across packages

### 2. Turborepo (Rejected)

**Pros:**

- Excellent caching
- Good integration with Vercel

**Cons:**

- Additional tool to learn
- pnpm workspaces already provide most of the same benefits
- Nx has better TypeScript integration for monorepos

---

## Consequences

### Positive

- All code in one place — easier to find and refactor
- Cross-package changes in a single commit
- Consistent tooling across all packages
- `nx affected` prevents unnecessary rebuilds in CI
- Simplified dependency management (pnpm workspaces)

### Negative

- Repository grows larger over time
- Requires discipline to maintain package boundaries
- CI pipeline must handle monorepo complexity

### Mitigations

- Clear package ownership and boundaries (ADR-009)
- `nx affected` prevents slow CI
- Regular codebase hygiene reviews

---

## Update Note

The original version of this ADR listed five packages: `ui`, `config` (which it described as also holding design tokens), `validation`, `database`, and `api`. The monorepo decision itself hasn't changed, but the package list has grown as the platform did:

- `validation` was renamed to **`contracts`** — see the Naming Note in ADR-005.
- Design tokens split out of `config` into their own **`tokens`** package, which generates CSS variables and Tailwind class groups from a single source; `config` now holds Next.js, Tailwind, and font build configuration only.
- **`env`** was added to centralise typed, validated environment variable access, split into server and client entry points.
- **`transport`** was added as a lightweight HTTP client for calls that don't go through tRPC — third-party services such as Resend, R2, and reCAPTCHA.

The structure diagram above reflects the current eight-package layout.

---
