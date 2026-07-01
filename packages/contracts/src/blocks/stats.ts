// packages/contracts/src/blocks/stats.ts

import { z } from 'zod';

export const StatItemSchema = z.object({
  id: z.string(),
  target: z.number(),
  label: z.string(),
  suffix: z.string().optional(),
  prefix: z.string().optional(),
  description: z.string().optional(),
  tooltip: z.string().optional(),
  disableCountUp: z.boolean().optional(),
});

export const StatsSchema = z.object({
  stats: z.array(StatItemSchema),
});

export type StatsData = z.infer<typeof StatsSchema>;
export type StatItem = z.infer<typeof StatItemSchema>;
