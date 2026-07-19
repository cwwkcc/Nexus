// packages/api/src/context.ts

import { db } from '@nexus/db';

import { loadApiConfig } from './config.js';
import type { Context } from './init.js';

/**
 * Builds tRPC context from an optional Headers object. The HTTP fetch
 * adapter (apps/web/src/app/api/trpc/[trpc]/route.ts) passes real request
 * headers; the direct server caller (used by React Server Components, which
 * never go over HTTP) calls this with no arguments at all.
 *
 * `headers === undefined` is what actually means "direct server call" —
 * checking that instead of "was x-admin-secret present" matters because a
 * real HTTP request that simply forgot to set the header also produces an
 * empty header value, and the two cases must not be treated the same way
 * (see middleware/auth.ts).
 */

export function createContext(headers?: Headers): Context {
  const isDirectServerCall = headers === undefined;
  const providedAdminSecret = headers?.get('x-admin-secret')?.trim() || null;

  return {
    db,
    config: loadApiConfig(),
    isDirectServerCall,
    providedAdminSecret,
  };
}
