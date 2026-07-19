// packages/api/src/init.ts

// `t` and `Context` live here, separate from trpc.ts, so that middleware/
// and procedures/ files can import `t` directly without creating a
// circular import with trpc.ts (which re-exports from both of them).

import type { db as PrismaClient } from '@nexus/db';
import { initTRPC } from '@trpc/server';

import type { ApiConfig } from './config.js';

export interface Context {
  db: typeof PrismaClient;
  /** Resolved once at startup — see config.ts. Nothing else in this
   *  package reads `process.env` directly; everything goes through
   *  `ctx.config`. */
  config: ApiConfig;
  /** True only for the direct server caller (RSC via createServerCaller()),
   *  which never goes through the HTTP adapter and so never has a Headers
   *  object at all. See context.ts and middleware/auth.ts. */
  isDirectServerCall: boolean;
  /** Raw `x-admin-secret` header value from the incoming HTTP request, if
   *  any. Always null for direct server calls. See middleware/auth.ts. */
  providedAdminSecret: string | null;
}

export const t = initTRPC.context<Context>().create();
