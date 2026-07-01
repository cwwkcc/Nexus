// packages/contracts/src/blocks/results-display.ts

import { z } from 'zod';

export const ResultsSummarySchema = z.object({
  examType: z.enum(['OL', 'AL']),
  year: z.string(),
  heading: z.string().optional(),
  highlights: z.array(z.string()),
  downloadHref: z.string().optional(),
});

export const ResultsDisplaySchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  summaries: z.array(ResultsSummarySchema),
});

export type ResultsDisplayData = z.infer<typeof ResultsDisplaySchema>;
