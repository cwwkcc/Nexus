// packages/api/src/modules/archive/errors.ts
//
// Error classes for the archive module (Task 7.20, F-155/F-182).
// Mirrors the errors.ts pattern from modules/achievements/errors.ts.
//
// NOTE (found while completing Task 7.18/Alumni, not itself a completion of
// Task 7.20): same minimal, behavior-equivalent fix as achievements/
// errors.ts — see that file's own note for why.

import { internalError, notFoundError } from '../../errors/trpc-errors.js';

export const archiveErrors = {
  notFound: (id: string) => notFoundError(`No archive entry found with id "${id}".`),

  saveFailed: (cause: unknown) => internalError('Failed to save archive entry.', cause),

  deleteFailed: (cause: unknown) => internalError('Failed to delete archive entry.', cause),
};
