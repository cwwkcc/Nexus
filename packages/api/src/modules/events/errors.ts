// packages/api/src/modules/events/errors.ts

import { conflictError, internalError, notFoundError } from '../../errors/trpc-errors.js';

export const eventsErrors = {
  saveFailed: (cause: unknown) => internalError('Failed to save calendar entry.', cause),

  deleteFailed: (cause: unknown) => internalError('Failed to delete calendar entry.', cause),

  notFound: (id: string) => notFoundError(`No calendar entry found with id "${id}".`),

  slugConflict: (locale: string, slug: string) => conflictError(`An event with slug "${slug}" already exists in locale "${locale}".`),
};
