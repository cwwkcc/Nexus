// packages/api/src/init.ts

// `t` and `Context` live here, separate from trpc.ts, so that middleware/
// and procedures/ files can import `t` directly without creating a
// circular import with trpc.ts (which re-exports from both of them).

import type { RoleEnumData } from '@nexus/contracts';
import type { db as PrismaClient } from '@nexus/db';
import { initTRPC } from '@trpc/server';

import type { ApiConfig } from './config.js';

/**
 * The plain, framework-agnostic shape of "who is calling" — deliberately
 * not an Auth.js `Session`. This package never imports next-auth: resolving
 * a real session is the hosting app's job (apps/admin's `auth()`, see
 * apps/admin/src/lib/auth.ts), which then maps its result down to this
 * shape before calling `createContext`/`createServerCaller`. Null means the
 * request is unauthenticated.
 */
export interface SessionContext {
  userId: string;
  email: string;
  role: RoleEnumData;
}

export interface Context {
  db: typeof PrismaClient;
  /** Resolved once at startup — see config.ts. Nothing else in this
   *  package reads `process.env` directly; everything goes through
   *  `ctx.config`. */
  config: ApiConfig;
  /** The authenticated caller, or null. `authMiddleware` is the single
   *  place that rejects a null session for admin procedures — see
   *  middleware/auth.ts. Replaces the former `x-admin-secret` bootstrap
   *  stub now that real Auth.js sessions exist (Task 6.3). */
  session: SessionContext | null;
}

export const t = initTRPC.context<Context>().create();
