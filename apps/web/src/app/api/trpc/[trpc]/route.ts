import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

async function getRouter() {
  const { appRouter, createContext } = await import('@nexus/api');
  return { appRouter, createContext };
}

// apps/web is the public site — there is no Auth.js session here at all
// (Auth.js is only configured in apps/admin). Every router this app calls
// through is `publicProcedure`, so a null session is correct, not a stand-in
// for one this app doesn't bother resolving.
async function handler(req: Request) {
  const { appRouter, createContext } = await getRouter();
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(null),
  });
}

export { handler as GET, handler as POST };
