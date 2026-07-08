// packages/contracts/src/features/school/academic-stream.ts
//
// A/L academic stream definitions for KCC.
//
// Should contain:
//   ALStream     — z.enum(['combined-maths','bio-science','commerce','arts','technology'])
//   StreamSchema — key (ALStream), name (display label), subjects: string[],
//                  description?, icon?
//   StreamData   — z.infer type
//
// Used by: academics page, admissions requirements, results display
// Note: Combined Maths stream is you. Don't get the subjects wrong.

import { z } from 'zod';

export const ALStreamEnum = z.enum([
  'combined-maths',
  'bio-science',
  'commerce',
  'arts',
  'technology',
]);

export const StreamSchema = z.object({
  key: ALStreamEnum,
  name: z.string().min(1),
  subjects: z.array(z.string()),
  description: z.string().optional(),
  icon: z.string().optional(),
});

export type ALStream = z.infer<typeof ALStreamEnum>;
export type StreamData = z.infer<typeof StreamSchema>;
export type AcademicStream = StreamData;
