// packages/contracts/src/features/results/display.ts

// Results page display contracts — editorial layer over raw results data.

import { z } from 'zod';

import { ALResultSchema } from './al-aggregate-statistics.ts';
import { OLResultSchema } from './ol-aggregate-statistics.ts';

export const GradeBadgeSchema = z.object({
  grade: z.string().min(1),
  count: z.number().int().nonnegative().optional(),
});

export const ResultsYearSchema = z.object({
  year: z.string().min(1),
  olResult: OLResultSchema.optional(),
  alResult: ALResultSchema.optional(),
});

export const ResultsPageSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  years: z.array(ResultsYearSchema),
  disclaimer: z.string().optional(),
});

export type GradeBadgeData = z.infer<typeof GradeBadgeSchema>;
export type ResultsYearData = z.infer<typeof ResultsYearSchema>;
export type ResultsPageData = z.infer<typeof ResultsPageSchema>;
