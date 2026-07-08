// packages/contracts/src/blocks/generic/stats.ts
// Defines the schema for statistics blocks and their metric items.

import { z } from 'zod';

import { STATS_BLOCK } from '../block-type.js';

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
  blockType: z.literal(STATS_BLOCK),
  stats: z.array(StatItemSchema),
});

export type StatsData = z.infer<typeof StatsSchema>;
export type StatItem = z.infer<typeof StatItemSchema>;
