// packages/api/src/context.ts

import { db } from '@nexus/db';

import { loadApiConfig } from './config.js';
import type { Context, SessionContext } from './init.js';

/**
 * Builds tRPC context from an already-resolved session (or null, for an
 * unauthenticated request). Resolving *how* to get that session — reading
 * the Auth.js cookie for an HTTP request, or calling `auth()` directly for
 * an RSC's direct server caller — is the hosting app's job, not this
 * package's: see apps/admin/src/lib/auth.ts and src/lib/server-caller.ts.
 * This keeps packages/api free of any Next.js or Auth.js dependency.
 */
export function createContext(session: SessionContext | null = null): Context {
  return {
    db,
    config: loadApiConfig(),
    session,
  };
}
