// packages/contracts/src/features/academics/stream.ts
//
// Stream card contract for the academics page display.
//
// Should contain:
//   StreamCardSchema — key (ALStream), name, tagline, subjects: string[],
//                      image? (R2 key), description?, cta?: LinkData
//   StreamCardData   — z.infer type
//
// Notes:
//   The raw ALStream enum lives in features/school/academic-stream.ts.
//   This file extends it with editorial display fields (tagline, image, cta).

import { z } from 'zod';

export const StreamSchema = z.object({
  id: z.string(),
  stream: z.enum(['science', 'commerce', 'arts', 'technology']),
  name: z.string(),
  description: z.string(),
  careerPaths: z.array(z.string()),
  subjectCount: z.number().optional(),
});

export type StreamData = z.infer<typeof StreamSchema>;

export const StreamComparisonSchema = z.object({
  id: z.string(),
  name: z.string(),
  subjects: z.array(z.string()),
  careerPaths: z.array(z.string()),
  entryRequirements: z.string(),
  passRate: z.number(),
});

export type StreamComparisonData = z.infer<typeof StreamComparisonSchema>;
