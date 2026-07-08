// packages/contracts/src/features/results/display.ts
//
// Results page display contracts — editorial layer over raw results data.
//
// Should contain:
//   GradeBadgeSchema  — grade (OLGrade | ALGrade), count?
//   ResultsYearSchema — year, olResult?: OLResultData, alResult?: ALResultData
//   ResultsPageSchema — eyebrow?, heading?, years: ResultsYear[], disclaimer?
//   ResultsPageData   — z.infer type
//
// Notes:
//   The admin composes a ResultsPage from available OLResult and ALResult records.
//   GradeBadge is rendered by the ResultsGradeBadge component in @nexus/ui.

import { z } from 'zod';
import { OLResultSchema } from './ol-aggregate-statistics';
import { ALResultSchema } from './al-aggregate-statistics';

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
export type Display = ResultsPageData;
