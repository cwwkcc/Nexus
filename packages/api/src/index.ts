// packages/api/src/index.ts

import { appRouter, type AppRouter } from './root.js';
import { createContext } from './context.js';
import { createCallerFactory } from './trpc.js';

export { appRouter };
export type { AppRouter };
export { createContext };

const createCaller = createCallerFactory(appRouter);

/**
 * Direct, no-HTTP caller for use inside React Server Components. Each call
 * creates a fresh context, so this is cheap and safe to call per-request —
 * do not memoise it across requests.
 */
export function createServerCaller() {
  return createCaller(createContext());
}
