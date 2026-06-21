// packages/api/src/context.ts

import { db } from '@nexus/db';
import type { Context } from './trpc.js';

/**
 * Builds tRPC context from an optional Headers object. The HTTP fetch
 * adapter (apps/web/src/app/api/trpc/[trpc]/route.ts) passes real request
 * headers; the direct server caller (used by React Server Components, which
 * never go over HTTP) calls this with no arguments.
 */
export function createContext(headers?: Headers): Context {
  return {
    db,
    adminSecret: headers?.get('x-admin-secret') ?? null,
  };
}
