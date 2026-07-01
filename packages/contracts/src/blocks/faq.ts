// packages/contracts/src/blocks/faq.ts

import { z } from 'zod';

export const FaqItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});

export const FaqSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  items: z.array(FaqItemSchema),
});

export type FaqData = z.infer<typeof FaqSchema>;
export type FaqItem = z.infer<typeof FaqItemSchema>;
