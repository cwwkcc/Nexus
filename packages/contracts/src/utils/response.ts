// packages/contracts/src/utils/response.ts
//
// Response envelope factories parameterized over a payload schema.

import { z } from 'zod';
import { ErrorEnvelopeSchema } from '../system/api/error-envelope.js';

export function createResponseEnvelope<T extends z.ZodType>(dataSchema: T) {
  return z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: ErrorEnvelopeSchema.optional(),
  });
}

export function createPaginatedEnvelope<T extends z.ZodType>(dataSchema: T) {
  const paginationMetaSchema = z.object({
    totalItems: z.number(),
    totalPages: z.number(),
    currentPage: z.number(),
    pageSize: z.number(),
  });

  return z.object({
    success: z.boolean(),
    data: z.object({
      items: z.array(dataSchema),
      meta: paginationMetaSchema,
    }).optional(),
    error: ErrorEnvelopeSchema.optional(),
  });
}
