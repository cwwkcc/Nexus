// packages/api/src/trpc.ts
//
// This tRPC setup provides the API layer for the backend and admin panel.
// The current authentication path is still a bootstrap stub, but the structure
// is now ready to accept a real Auth.js session once Task 6.3 is implemented.

import type { db as PrismaClient } from '@nexus/db';
import { initTRPC, TRPCError } from '@trpc/server';

export interface Context {
  db: typeof PrismaClient;
  /** Raw header value, not yet a real session. See adminProcedure below. */
  adminSecret: string | null;
}

const t = initTRPC.context<Context>().create();

const authMiddleware = t.middleware(({ ctx, next }) => {
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

const auditMiddleware = t.middleware(async ({ next }) => {
  // AuditLog model not yet in schema (F-057). Keep the middleware hook so
  // adminMutation's call shape stays stable; wire up persistence once the
  // model lands.
  return next();
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const adminProcedure = t.procedure.use(authMiddleware);
export const adminMutation = adminProcedure.use(auditMiddleware);
export const createCallerFactory = t.createCallerFactory;
