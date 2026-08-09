// packages/api/src/modules/societies/errors.ts

import { conflictError, internalError, notFoundError } from '../../errors/trpc-errors.js';

export const societiesErrors = {
  saveFailed: (cause: unknown) => internalError('Failed to save society.', cause),

  deleteFailed: (cause: unknown) => internalError('Failed to delete society.', cause),

  notFound: (id: string) => notFoundError(`No society found with id "${id}".`),

  slugConflict: (locale: string, slug: string) => conflictError(`A society with slug "${slug}" already exists in locale "${locale}".`),
};
