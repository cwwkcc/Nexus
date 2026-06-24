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
│   ├── config/       # Design tokens and Tailwind preset
│   ├── validation/   # Zod schemas
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
