// packages/api/src/trpc.ts
//
// This is the first real tRPC setup in the project — Task 6.4 ("Implement
// tRPC") hasn't been built yet, so this file does the minimum needed to make
// pageContentRouter work, not the full router/context architecture described
// in the roadmap. When Task 6.4 is done properly, this file is what it
// replaces: context should gain the authenticated session from Auth.js once
// Task 6.3 exists, and `adminProcedure` below should check that session
// instead of the shared-secret placeholder.

import type { db as PrismaClient } from '@nexus/db';
import { initTRPC, TRPCError } from '@trpc/server';

export interface Context {
  db: typeof PrismaClient;
  /** Raw header value, not yet a real session. See adminProcedure below. */
  adminSecret: string | null;
}

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;

/**
 * TEMPORARY. Gates writes behind a single shared secret read from
 * ADMIN_API_SECRET, sent as the `x-admin-secret` header. This is NOT
 * per-admin auth, has no audit trail, and must not be relied on past
 * bootstrap — it exists only so the Page Content write path can be tested
 * before Task 6.3 (Google Workspace OAuth, F-060/F-061) lands. Replace the
 * body of this procedure with a real session check and delete this comment
 * when that happens.
 */
export const adminProcedure = t.procedure.use(({ ctx, next }) => {
  const expected = process.env.ADMIN_API_SECRET;
  if (!expected || ctx.adminSecret !== expected) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message:
        'Missing or invalid admin credentials (temporary auth stub — see trpc.ts).',
    });
  }
  return next({ ctx });
});
