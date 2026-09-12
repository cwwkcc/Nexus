import type { inferRouterOutputs } from '@trpc/server';

type ServerCaller = ReturnType<(typeof import('@nexus/api'))['createServerCaller']>;
export type ServerRouterOutputs = inferRouterOutputs<import('@nexus/api').AppRouter>;

export async function getServerCaller(): Promise<ServerCaller> {
  const { createServerCaller } = await import('@nexus/api');
  return createServerCaller();
}
