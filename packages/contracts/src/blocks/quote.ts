// packages/contracts/src/blocks/quote.ts
import { z } from 'zod';

export const QuoteSchema = z.object({
  eyebrow: z.string().optional(),
  quote: z.string(),
  attribution: z.string().optional(),
});
export type QuoteData = z.infer<typeof QuoteSchema>;
