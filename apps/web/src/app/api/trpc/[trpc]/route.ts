// apps/web/src/app/api/trpc/[trpc]/route.ts
//
// HTTP entry point for tRPC. React Server Components in apps/web don't need
// this — they use createServerCaller() directly (see
// apps/web/src/server/trpc-caller.ts) and never go over HTTP. This route
// exists for client components and, eventually, the admin panel's React
// Query client (Task 6.4 / 7.x).

import { appRouter, createContext } from '@nexus/api';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req.headers),
  });
}

export { handler as GET, handler as POST };
