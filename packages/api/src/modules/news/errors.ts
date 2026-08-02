// packages/api/src/modules/news/errors.ts

import { conflictError, internalError, notFoundError } from '../../errors/trpc-errors.js';

export const newsErrors = {
  saveFailed: (cause: unknown) => internalError('Failed to save news article.', cause),

  statusUpdateFailed: (cause: unknown) => internalError('Failed to update news article status.', cause),

  notFound: (id: string) => notFoundError(`No news article found with id "${id}".`),

  slugConflict: (locale: string, slug: string) => conflictError(`A news article with slug "${slug}" already exists in locale "${locale}".`),
};
