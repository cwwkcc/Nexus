// packages/api/src/modules/content/errors.ts

import { internalError, notFoundError } from '../../errors/trpc-errors.js';

export const contentErrors = {
  saveFailed: (cause: unknown) => internalError('Failed to save content entry.', cause),

  statusUpdateFailed: (cause: unknown) => internalError('Failed to update content entry status.', cause),

  notFound: (scope: string, sectionKey: string, locale: string) => notFoundError(`No content entry found for scope "${scope}", sectionKey "${sectionKey}", locale "${locale}".`),
};
