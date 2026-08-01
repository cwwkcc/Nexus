// packages/api/src/index.ts

import { createContext } from './context.js';
import type { SessionContext } from './init.js';
import { appRouter, type AppRouter } from './root.js';
import { createCallerFactory } from './trpc.js';

export { appRouter };
export type { AppRouter };
export { createContext };
export type { SessionContext };

const createCaller = createCallerFactory(appRouter);

/**
 * Direct, no-HTTP caller for use inside React Server Components. Each call
 * creates a fresh context, so this is cheap and safe to call per-request —
 * do not memoise it across requests.
 *
 * Takes the caller's already-resolved session (or omit it/pass null for an
 * unauthenticated caller) — this package never resolves an Auth.js session
 * itself. In apps/admin, use `getServerCaller()` from `@/lib/server-caller`
 * rather than calling this directly, so every RSC page resolves the session
 * the same way.
 */
export const createServerCaller = (session: SessionContext | null = null): ReturnType<typeof createCaller> => createCaller(createContext(session));
