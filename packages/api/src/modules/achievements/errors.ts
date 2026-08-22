// packages/api/src/modules/achievements/errors.ts
//
// Error classes for the achievements module (Task 7.19, F-156/F-181).
// Mirrors the errors.ts pattern from modules/alumni/errors.ts.
//
// NOTE (found while completing Task 7.18/Alumni, not itself a completion of
// Task 7.19): rebuilt against the shared `errors/trpc-errors.ts` helpers,
// same fix and same reasoning as alumni/errors.ts — the previous version
// threw a plain `Error` subclass that tRPC would have reported as a generic
// INTERNAL_SERVER_ERROR rather than NOT_FOUND. This module's own business
// logic, tests, admin UI wiring, and Completion Plan checkbox are still
// unverified and untouched — this is a minimal, behavior-equivalent fix
// needed only because `packages/api` is a single TypeScript project and
// this file's compile errors were blocking verification of unrelated
// modules (including Alumni) from ever producing a clean build.

import { internalError, notFoundError } from '../../errors/trpc-errors.js';

export const achievementErrors = {
  notFound: (id: string) => notFoundError(`No achievement found with id "${id}".`),

  saveFailed: (cause: unknown) => internalError('Failed to save achievement.', cause),

  deleteFailed: (cause: unknown) => internalError('Failed to delete achievement.', cause),
};
