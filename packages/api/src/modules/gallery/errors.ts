// packages/api/src/modules/gallery/errors.ts

import { conflictError, internalError, notFoundError } from '../../errors/trpc-errors.js';

export const galleryErrors = {
  saveFailed: (cause: unknown) => internalError('Failed to save gallery album.', cause),

  deleteFailed: (cause: unknown) => internalError('Failed to delete gallery album.', cause),

  reorderFailed: (cause: unknown) => internalError('Failed to reorder gallery albums.', cause),

  notFound: (id: string) => notFoundError(`No gallery album found with id "${id}".`),

  slugConflict: (locale: string, slug: string) => conflictError(`An album with slug "${slug}" already exists in locale "${locale}".`),
};
