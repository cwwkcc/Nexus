// packages/api/src/modules/extracurriculars/errors.ts

import { internalError, notFoundError } from '../../errors/trpc-errors.js';

export const extracurricularsErrors = {
  saveFailed: (cause: unknown) => internalError('Failed to save extracurricular activity.', cause),

  deleteFailed: (cause: unknown) => internalError('Failed to delete extracurricular activity.', cause),

  notFound: (id: string) => notFoundError(`No extracurricular activity found with id "${id}".`),
};
