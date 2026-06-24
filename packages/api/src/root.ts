// packages/api/src/root.ts
//
// Only pageContentRouter exists so far. The other routers listed in Task 6.4
// (newsRouter, staffRouter, eventsRouter, ...) get added here as their own
// phases are implemented — this file is meant to grow, not be replaced.

import { pageConfigRouter } from './routers/page-config.js';
import { pageContentRouter } from './routers/page-content.js';
import { router } from './trpc.js';

export const appRouter = router({
  pageContent: pageContentRouter,
  pageConfig: pageConfigRouter,
});

export type AppRouter = typeof appRouter;
