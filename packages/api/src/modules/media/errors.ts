// packages/api/src/modules/media/errors.ts

import { TRPCError } from '@trpc/server';

import { conflictError, internalError, notFoundError } from '../../errors/trpc-errors.js';

export const mediaErrors = {
  notFound: (id: string) => notFoundError(`No media asset found with id "${id}".`),

  presignFailed: (cause: unknown) => internalError('Failed to create an upload URL. Please try again.', cause),

  /** The staging object either was never uploaded, was already confirmed once, or is outside the tmp/ prefix confirmUpload only ever trusts. */
  stagingObjectMissing: () => new TRPCError({ code: 'BAD_REQUEST', message: 'Upload not found — it may have expired or already been confirmed. Please upload the file again.' }),

  invalidStagingKey: () => new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid upload reference.' }),

  processingFailed: (cause: unknown) => internalError('Failed to process the uploaded image.', cause),

  confirmFailed: (cause: unknown) => internalError('Failed to save the uploaded file.', cause),

  keyConflict: (key: string) => conflictError(`An asset with key "${key}" already exists.`),

  deleteFailed: (cause: unknown) => internalError('Failed to delete the asset.', cause),

  updateFailed: (cause: unknown) => internalError('Failed to update the asset.', cause),

  notConfigured: (cause: unknown) => internalError('Media storage is not configured on this server.', cause),
};
