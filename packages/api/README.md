# @nexus/api

The tRPC API layer for Nexus — shared by `apps/web` and `apps/admin`.

## What's here

- `trpc.ts` — tRPC instance, `publicProcedure`/`adminProcedure`/`adminMutation`,
  and the admin-secret auth middleware (a bootstrap stub — see the comment
  there for what changes once real Auth.js sessions are wired in).
- `context.ts` — builds the per-request `Context` (db handle + admin secret)
  from either real request headers (HTTP adapter) or nothing (server caller).
- `root.ts` — mounts the routers that make up `appRouter`.
- `routers/content-entry.ts` — the one router currently mounted: reads/writes
  `ContentEntry` / `ContentEntryVersion` (the CMS content model).

## Consuming it

- `apps/web/src/app/api/trpc/[trpc]/route.ts` and the admin equivalent wire
  `appRouter` + `createContext` into `fetchRequestHandler`.
- React Server Components use `createServerCaller()` for a direct, no-HTTP
  caller instead of going over the fetch adapter.

## Adding a new router

Follow `routers/content-entry.ts` as the template: Zod input schemas, a
`publicProcedure`/`adminProcedure` split, and errors handled per-procedure
(don't let a failed query crash the whole `appRouter`). Mount it in `root.ts`
once it's real — don't add placeholder routers ahead of the implementation;
track planned routers in the Feature Registry instead, so there's one source
of truth for what's built vs. planned.
