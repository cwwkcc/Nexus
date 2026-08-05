// packages/api/src/modules/staff/errors.ts

import { internalError, notFoundError } from '../../errors/trpc-errors.js';

export const staffErrors = {
  saveFailed: (cause: unknown) => internalError('Failed to save staff member.', cause),

  deleteFailed: (cause: unknown) => internalError('Failed to delete staff member.', cause),

  reorderFailed: (cause: unknown) => internalError('Failed to reorder staff members.', cause),

  notFound: (id: string) => notFoundError(`No staff member found with id "${id}".`),
};
