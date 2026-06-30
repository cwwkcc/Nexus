// packages/contracts/src/blocks/crest.ts
import { z } from 'zod';

export const CrestSymbolSchema = z.object({
  id: z.string(),
  name: z.string(),
  meaning: z.string(),
  position: z.string().optional(),
});
export type CrestSymbol = z.infer<typeof CrestSymbolSchema>;

export const CrestSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  intro: z.string().optional(),
  symbols: z.array(CrestSymbolSchema),
});
export type CrestData = z.infer<typeof CrestSchema>;
