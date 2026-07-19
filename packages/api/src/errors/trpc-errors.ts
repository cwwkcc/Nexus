// packages/api/src/errors/trpc-errors.ts
//
// Generic TRPCError builders shared across modules, so a module's own
// errors.ts (e.g. modules/content/errors.ts) wraps these with domain-
// specific messages instead of every module constructing
// `new TRPCError({ ... })` inline with slightly different shapes each time.

import { TRPCError } from '@trpc/server';

export function notFoundError(message: string): TRPCError {
  return new TRPCError({ code: 'NOT_FOUND', message });
}

export function internalError(message: string, cause?: unknown): TRPCError {
  return new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message, cause });
}

export function unauthorizedError(message: string): TRPCError {
  return new TRPCError({ code: 'UNAUTHORIZED', message });
}
