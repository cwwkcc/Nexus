import { appRouter, createContext } from '@nexus/api';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { auth, toSessionContext } from '@/lib/auth';

async function handler(req: Request) {
  const session = await auth();
  const sessionContext = toSessionContext(session);

  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(sessionContext),
  });
}

export { handler as GET, handler as POST };
