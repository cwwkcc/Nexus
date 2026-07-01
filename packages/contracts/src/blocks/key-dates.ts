// packages/contracts/src/blocks/key-dates.ts

import { z } from 'zod';

export const KeyDateSchema = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
});

export const KeyDatesSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  dates: z.array(KeyDateSchema),
});

export type KeyDatesData = z.infer<typeof KeyDatesSchema>;
