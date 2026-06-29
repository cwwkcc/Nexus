// packages/contracts/src/core/api/errors.ts
//
// Typed error codes for the Nexus API.
//
// Should contain:
//   NexusErrorCode  — z.enum([
//                       'NOT_FOUND', 'VALIDATION_ERROR', 'UNAUTHORIZED',
//                       'FORBIDDEN', 'CONFLICT', 'INTERNAL_ERROR'
//                     ])
//   ApiErrorSchema  — { code: NexusErrorCode, message: string, details?: unknown }
//   ApiError        — z.infer type
//
// Notes:
//   tRPC errors are thrown via TRPCError in the router.
//   These codes map to tRPC's built-in error codes and produce consistent
//   error shapes in the error formatter and client-side error handlers.



// TODO: implement

export type Errors = unknown;
