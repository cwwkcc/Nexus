// packages/contracts/src/blocks/timeline.ts

import { z } from 'zod';

export const TimelineItemSchema = z.object({
  id: z.string(),
  year: z.string(),
  title: z.string(),
  description: z.string(),
  era: z.enum(['early', 'mid', 'modern']).optional(),
});
export type TimelineItem = z.infer<typeof TimelineItemSchema>;

export const TimelineSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  items: z.array(TimelineItemSchema),
});
export type TimelineData = z.infer<typeof TimelineSchema>;
