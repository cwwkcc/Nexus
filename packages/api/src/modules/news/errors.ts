import { internalError, notFoundError } from '../../errors/trpc-errors.js';

export const newsErrors = {
  saveFailed: (cause: unknown) => internalError('Failed to save the news article.', cause),
  statusUpdateFailed: (cause: unknown) => internalError('Failed to update the article status.', cause),
  notFound: (id: string) => notFoundError(`No news article found for id "${id}".`),
};
