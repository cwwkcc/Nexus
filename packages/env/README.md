# @nexus/env

Environment variable validation for Nexus applications, split by where it's safe to run.

## Usage

```ts
// Anywhere — safe on client or server
import { sharedEnv, isProduction, isDevelopment, isCI } from '@nexus/env';

// Server code only (Server Components, Route Handlers, tRPC context, scripts)
import { serverEnv } from '@nexus/env/server';
serverEnv.DATABASE_URL; // typed, validated once at module load

// Client-safe code (Client Components, anything that ships to the browser)
import { clientEnv } from '@nexus/env/client';
clientEnv.NEXT_PUBLIC_SITE_URL;
```

There's no `validateEnv()` call to remember to run anymore — `serverEnv` /
`clientEnv` / `sharedEnv` are parsed once at import time. If a required
variable is missing or invalid, the app fails to boot immediately with a
formatted list of every problem, instead of failing lazily whenever some
code path first happens to call a validation function.

## Structure

```
src/
├── shared.ts      — NODE_ENV. The only variable genuinely used by both
│                    client and server today; see the note in that file
│                    about why APP_NAME/APP_URL aren't here.
├── server.ts      — DATABASE_URL, NEXTAUTH_*, R2_*, RESEND_API_KEY,
│                    ADMIN_API_SECRET, REVALIDATE_SECRET, ADMIN_EMAIL/PASSWORD,
│                    SENTRY_DSN, UMAMI_WEBSITE_ID. Guarded by the
│                    `server-only` package — see the caveat below.
├── client.ts      — NEXT_PUBLIC_* only.
├── validation.ts  — shared safeParse + formatted-error helper.
├── utils.ts       — isProduction/isDevelopment/isTest/isCI. No isVercel() —
│                    Nexus is self-hosted on Hetzner, not deployed to Vercel.
├── types.ts       — SharedEnv/ServerEnv/ClientEnv/Env (type-only, erased at
│                    compile time — doesn't trigger the server-only guard).
└── index.ts       — exports shared.ts + utils.ts + types.ts only.
```

`index.ts` deliberately does **not** re-export `server.ts`. If it did,
importing `@nexus/env` for something as small as `isProduction()` would
transitively pull in the server-only guard and break in client code.
Import `@nexus/env/server` and `@nexus/env/client` explicitly from wherever
each is actually safe to run.

## The `server-only` guard — what it does and doesn't catch

`server.ts` imports the `server-only` package, which is the actual
enforcement mechanism (not just a naming convention) behind "never import
server env in client components." It works by conditional package export:
Next.js's bundler resolves it to a no-op when compiling genuine Server
Components, and to a throwing stub otherwise.

**This only works inside Next.js's own build pipeline.** Plain Node,
`tsx`/`ts-node`, and test runners (Vitest, etc.) don't set the resolution
condition Next uses, so importing `@nexus/env/server` from a seed script,
CLI tool, or test file will throw immediately — not because anything is
wrong, but because there's no React-Server-Components-aware bundler
present to resolve the no-op branch. If `packages/database`'s seed scripts
or `packages/api`'s test files ever need server env values, read
`process.env` directly there (as `context.ts` already does for
`ADMIN_API_SECRET` today) rather than importing `@nexus/env/server`.

## What changed from the old single-file version

- **Split into shared/server/client** instead of one `env.ts` exporting
  both schemas — matches the original package plan, and the `server-only`
  guard now actually enforces the separation instead of relying on
  discipline.
- **Parsed once at import time**, not re-validated on every
  `validateEnv()` call.
- **Removed the hardcoded `.default('https://cwwkcc.lk')` /
  `.default('https://admin.cwwkcc.lk')`** on the two `NEXT_PUBLIC_*` URLs.
  Those defaults meant a forgotten env var would silently fall back to a
  literal in every environment, including production — and
  `NEXT_PUBLIC_SITE_URL` wasn't even documented in `.env.example`, so
  there was no way to discover it was needed. Also removed the same
  redundant fallback from the two call sites that had their own copy of
  it (`packages/config/src/metadata.ts`, `apps/web/src/app/sitemap.ts`).
- **Added `ADMIN_API_SECRET` and `REVALIDATE_SECRET`** to the schema and
  `.env.example`. Both were read via raw `process.env` in real code
  (`packages/api/src/trpc.ts` / `context.ts`, and
  `apps/web/src/app/api/revalidate/route.ts`) but were never validated or
  documented anywhere. `REVALIDATE_SECRET` is required now — the route's
  own check (`secret !== process.env.REVALIDATE_SECRET`) silently passes
  when the var is unset and the caller omits `secret` too, which was an
  open revalidation endpoint with no auth at all. `ADMIN_API_SECRET`
  stays optional, matching its documented "bootstrap mode" behavior in
  `trpc.ts` — but see that file's comment: this needs to become required
  (or be replaced by real session auth) before production launch.
- **Upgraded zod from `^3.23.8` to `^4.3.6`** — every other package in the
  monorepo (root, `@nexus/contracts`, `@nexus/api`) was already on zod v4;
  `@nexus/env` was the one holdout. Schema syntax (`.string().url()`,
  `.min()`, etc.) is unchanged and matches the style already used in
  `@nexus/contracts`.
- **Added `/server` and `/client` subpath exports** to `package.json` so
  the import boundary above is possible at all.
