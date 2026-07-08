// packages/contracts/src/domains/academics/al-stream.ts
//
// AL stream contract for the academics page display.

import { z } from 'zod';

export const ALStreamSchema = z.object({
  id: z.string(),
  stream: z.enum(['science', 'commerce', 'arts', 'technology']),
  name: z.string(),
  description: z.string(),
  careerPaths: z.array(z.string()),
  subjectCount: z.number().optional(),
});

export type ALStreamData = z.infer<typeof ALStreamSchema>;
