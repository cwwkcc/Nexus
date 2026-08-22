// packages/api/src/modules/alumni/errors.ts
//
// Error classes for the alumni module (Task 7.18, F-154/F-180).
//
// Rebuilt against the shared `errors/trpc-errors.ts` helpers — every other
// M4 module (staff/events/societies/gallery/announcements/
// extracurriculars) throws a real `TRPCError` here so tRPC reports the
// correct code (NOT_FOUND, CONFLICT, ...) to the client instead of
// collapsing every thrown error to INTERNAL_SERVER_ERROR. The previous
// version of this file threw plain `Error` subclasses that were never
// `TRPCError`s, so `getById`/`updateProfile`/`deleteProfile`'s "not found"
// path always surfaced as a generic 500 — `apps/admin/src/app/alumni/
// actions.ts`'s `messageFor()` branches on `err.code === 'NOT_FOUND'`
// specifically and would never have hit that branch. Fixed here.

import { conflictError, internalError, notFoundError } from '../../errors/trpc-errors.js';

export const alumniErrors = {
  notFound: (id: string) => notFoundError(`No alumni profile found with id "${id}".`),

  slugCollision: () => conflictError('An alumni profile with these details already exists.'),

  saveFailed: (cause: unknown) => internalError('Failed to save alumni profile.', cause),

  deleteFailed: (cause: unknown) => internalError('Failed to delete alumni profile.', cause),

  bulkUpdateFailed: (cause: unknown) => internalError('Failed to update alumni profiles.', cause),
};
