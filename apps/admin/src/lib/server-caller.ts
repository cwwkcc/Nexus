// apps/admin/src/lib/server-caller.ts
//
// The one place every RSC page and server action in apps/admin gets a
// tRPC server-side caller from. Resolves the current Auth.js session and
// maps it to the plain SessionContext packages/api's context.ts expects —
// packages/api itself never imports next-auth, to keep it framework-
// agnostic (see packages/api/src/init.ts). Prefer this over importing
// `createServerCaller` from `@nexus/api` directly, so every call site
// resolves the session the same way.

import { createServerCaller } from '@nexus/api';

import { auth, toSessionContext } from './auth.js';

export async function getServerCaller(): Promise<ReturnType<typeof createServerCaller>> {
  const session = await auth();
  return createServerCaller(toSessionContext(session));
}
