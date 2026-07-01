// packages/contracts/src/core/api/errors.ts

import { z } from 'zod';

export const NexusErrorCode = z.enum([
  'NOT_FOUND',
  'VALIDATION_ERROR',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'CONFLICT',
  'INTERNAL_ERROR',
]);

export const ApiErrorSchema = z.object({
  code: NexusErrorCode,
  message: z.string(),
  details: z.unknown().optional(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;
