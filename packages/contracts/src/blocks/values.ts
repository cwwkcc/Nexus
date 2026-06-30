// packages/contracts/src/blocks/values.ts
import { z } from 'zod';

export const ValueItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});
export type ValueItem = z.infer<typeof ValueItemSchema>;

export const ValuesSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  values: z.array(ValueItemSchema),
});
export type ValuesData = z.infer<typeof ValuesSchema>;
