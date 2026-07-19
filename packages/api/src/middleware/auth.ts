// packages/api/src/middleware/auth.ts

import { TRPCError } from '@trpc/server';

import { t } from '../init.js';

/**
 * Bootstrap auth stub — checks the incoming request's `x-admin-secret`
 * header against the configured secret. Ready to be swapped for a real
 * Auth.js session check once Google Workspace OAuth (F-073) lands.
 *
 * Direct server callers (RSC via createServerCaller()) never carry a
 * header at all and are trusted as same-process; HTTP callers must supply
 * a header that matches the configured secret exactly.
 */
export const authMiddleware = t.middleware(({ ctx, next }) => {
  const expected = ctx.config.adminSecret;

  if (!expected) {
    // Bootstrap/early-phase mode: no secret configured, allow admin
    // procedures without one so the CMS can be used locally or in staging
    // before a real auth flow is wired up.
    return next({ ctx });
  }

  if (ctx.isDirectServerCall || ctx.providedAdminSecret === expected) {
    return next({ ctx });
  }

  throw new TRPCError({
    code: 'UNAUTHORIZED',
    message: 'Missing or invalid admin credentials (temporary auth stub — see middleware/auth.ts).',
  });
});
