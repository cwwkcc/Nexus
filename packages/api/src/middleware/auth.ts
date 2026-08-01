// packages/api/src/middleware/auth.ts

import type { RoleEnumData } from '@nexus/contracts';
import { TRPCError } from '@trpc/server';

import { t } from '../init.js';

/**
 * Requires a resolved session — real Auth.js authentication (Task 6.3),
 * replacing the former `x-admin-secret` header stub. `ctx.session` is set
 * upstream by whichever app hosts this router, from Auth.js's `auth()` (see
 * apps/admin/src/lib/auth.ts). A null session covers both "no cookie at
 * all" and "Auth.js itself refused to return one" — for example, the
 * `session` callback there returns null for a deactivated user (F-081)
 * even if their browser still holds an otherwise-valid session cookie.
 */
export const authMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Sign in required.',
    });
  }

  // Narrows `ctx.session` from `SessionContext | null` to `SessionContext`
  // for every procedure downstream of this middleware.
  return next({ ctx: { ...ctx, session: ctx.session } });
});

/**
 * Role-gate factory for procedures that need more than "any signed-in
 * user" — User Management and Settings (F-075) are admin-only once those
 * modules exist (M5). Must run after `authMiddleware` (or another
 * middleware that guarantees `ctx.session` is set) — a null session is
 * rejected the same way regardless of which roles are passed.
 */
export function requireRole(...roles: RoleEnumData[]) {
  return t.middleware(({ ctx, next }) => {
    if (!ctx.session || !roles.includes(ctx.session.role)) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You do not have permission to perform this action.',
      });
    }

    return next({ ctx: { ...ctx, session: ctx.session } });
  });
}
