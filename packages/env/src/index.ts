// packages/env/src/index.ts
//
// Root export deliberately does NOT include server.ts or client.ts.
// If it re-exported server.ts, every consumer of the root import — even
// ones that only wanted sharedEnv or isProduction() — would transitively
// trigger the `server-only` guard, making the whole package unusable from
// client code. Import exactly what you need:
//
//   import { sharedEnv, isProduction } from '@nexus/env';
//   import { serverEnv } from '@nexus/env/server';   // server code only
//   import { clientEnv } from '@nexus/env/client';    // safe on client

export * from './shared.js';
export * from './utils.js';
export * from './types.js';
