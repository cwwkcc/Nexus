# @nexus/api

The tRPC API layer for Nexus — shared by `apps/web` and `apps/admin`.

## What's here

- `trpc.ts` — stable public barrel: `publicProcedure`/`adminProcedure`/
  `adminMutation` and the `router`/`createCallerFactory` exports. The
  actual tRPC instance lives in `init.ts`; the procedure tiers live in
  `procedures/` and `middleware/` — see those files for the admin-secret
  auth stub (a bootstrap stub — see `middleware/auth.ts` for what changes
  once real Auth.js sessions are wired in).
- `config.ts` — the only place this package reads `process.env`. Every
  other file consumes `ctx.config` instead.
- `context.ts` — builds the per-request `Context` (db handle + config +
  admin-header state) from either real request headers (HTTP adapter) or
  nothing (server caller).
- `root.ts` — mounts the modules that make up `appRouter`.
- `modules/content/` — the one module currently mounted: reads/writes
  `ContentEntry` / `ContentEntryVersion` (the CMS content model).
  - `router.ts` — input/output validation + wiring, no Prisma calls.
  - `service.ts` — owns all Prisma access for this module.
  - `validators.ts` — Zod input/output schemas.
  - `errors.ts` — domain-specific error builders (wraps `errors/trpc-errors.ts`).
- `errors/trpc-errors.ts` — generic TRPCError builders shared across modules.

## Consuming it

- `apps/web/src/app/api/trpc/[trpc]/route.ts` and the admin equivalent wire
  `appRouter` + `createContext` into `fetchRequestHandler`.
- React Server Components use `createServerCaller()` for a direct, no-HTTP
  caller instead of going over the fetch adapter.

## Adding a new module

Follow `modules/content/` as the template:

```
modules/<name>/
  router.ts       — publicProcedure/adminProcedure wiring, .input()/.output(), no ctx.db calls
  service.ts       — all Prisma access, takes (db, config, input) and returns plain data
  validators.ts    — Zod input + output schemas
  errors.ts        — domain error builders wrapping errors/trpc-errors.ts
```

Mount it in `root.ts` once it's real — don't add placeholder modules ahead
of the implementation; track planned modules in the Feature Registry
instead, so there's one source of truth for what's built vs. planned.

`utils/` and a `settings/` module aren't created yet — there's no shared
cross-module utility or settings functionality to put in them yet. Add
them when a second module actually needs one, rather than scaffolding
empty folders.
