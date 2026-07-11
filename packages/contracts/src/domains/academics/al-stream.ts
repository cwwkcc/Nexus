// packages/contracts/src/domains/academics/al-stream.ts
//
// A/L academic stream definitions for KCC.
//
// This is the single canonical stream concept for the package. It previously
// existed twice — a generic display-only version here and a second,
// differently-valued version at domains/identity/school/stream.ts — which had
// drifted to disagree on both the enum values and the field set. Consolidated
// per the anti-pattern in docs/architecture/Contracts.md section 10
// ("Duplicate concept homes").

import { z } from 'zod';

export const ALStreamEnum = z.enum([
  'combined-maths',
  'bio-science',
  'commerce',
  'arts',
  'technology',
]);

export const ALStreamSchema = z.object({
  key: ALStreamEnum,
  name: z.string().min(1),
  description: z.string().optional(),
  subjects: z.array(z.string()),
  careerPaths: z.array(z.string()).optional(),
  icon: z.string().optional(),
});

export type ALStreamEnumData = z.infer<typeof ALStreamEnum>;
export type ALStreamData = z.infer<typeof ALStreamSchema>;
