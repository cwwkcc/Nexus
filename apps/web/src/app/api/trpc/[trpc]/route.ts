import { appRouter, createContext } from '@nexus/api';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

// apps/web is the public site — there is no Auth.js session here at all
// (Auth.js is only configured in apps/admin). Every router this app calls
// through is `publicProcedure`, so a null session is correct, not a stand-in
// for one this app doesn't bother resolving.
function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(null),
  });
}

export { handler as GET, handler as POST };
