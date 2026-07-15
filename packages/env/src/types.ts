// packages/env/src/types.ts
//
// Type-only re-exports. `export type` is erased by tsc — importing from
// this file never pulls in server.ts's `server-only` side effect, so it's
// safe to reference `ServerEnv` for typing purposes (e.g. a function
// signature in a shared script) without accidentally making that file
// server-only itself.

export type { SharedEnv } from './shared.js';
export type { ServerEnv } from './server.js';
export type { ClientEnv } from './client.js';

import type { ClientEnv } from './client.js';
import type { ServerEnv } from './server.js';
import type { SharedEnv } from './shared.js';

/**
 * Full app-boundary env shape. For Node-only scripts that run outside the
 * Next.js client/server split entirely (e.g. a one-off seed or migration
 * script) and legitimately need everything in one type. Don't use this in
 * app code — import serverEnv/clientEnv/sharedEnv directly instead, so
 * the `server-only` guard stays meaningful.
 */
export type Env = SharedEnv & ServerEnv & ClientEnv;
