// packages/api/src/modules/announcements/errors.ts

import { internalError, notFoundError } from '../../errors/trpc-errors.js';

export const announcementsErrors = {
  saveFailed: (cause: unknown) => internalError('Failed to save announcement.', cause),

  deleteFailed: (cause: unknown) => internalError('Failed to delete announcement.', cause),

  deactivateFailed: (cause: unknown) => internalError('Failed to deactivate announcement.', cause),

  notFound: (id: string) => notFoundError(`No announcement found with id "${id}".`),
};
