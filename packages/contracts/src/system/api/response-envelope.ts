// packages/contracts/src/system/api/response-envelope.ts
//
// The generic success/error response wrapper, parameterized over a payload schema.

import { z } from 'zod';
import { ErrorEnvelopeSchema } from './error-envelope.js';

export const ResponseEnvelopeSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: ErrorEnvelopeSchema.optional(),
  });

export type ResponseEnvelopeData<T> = {
  success: boolean;
  data?: T;
  error?: z.infer<typeof ErrorEnvelopeSchema>;
};
