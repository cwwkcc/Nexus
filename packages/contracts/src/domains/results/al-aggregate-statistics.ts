// packages/contracts/src/features/results/al.ts
//
// A/L exam results — aggregate school-level statistics only.
//
// Should contain:
//   ALGrade        — z.enum(['A','B','C','S','F','AB'])
//   ALStreamResult — stream (ALStream), totalSitting, totalPassed,
//                    districtRanks?, islandRanks?
//   ALResultSchema — year (string), results: ALStreamResult[],
//                    totalUniversityQualified?
//   ALResultData   — z.infer type
//
// PRIVACY:
//   Same constraints as ol.ts — aggregate stats only on the public site.
//   islandRanks = number of students who achieved island-level rankings.

import { z } from 'zod';
import { ALStreamEnum } from '../identity/school/stream';

export const ALGradeEnum = z.enum(['A', 'B', 'C', 'S', 'F', 'AB']);

export const ALStreamResultSchema = z.object({
  stream: ALStreamEnum,
  totalSitting: z.number().int().nonnegative(),
  totalPassed: z.number().int().nonnegative(),
  districtRanks: z.number().int().nonnegative().optional(),
  islandRanks: z.number().int().nonnegative().optional(),
});

export const ALResultSchema = z.object({
  year: z.string().min(1),
  results: z.array(ALStreamResultSchema),
  totalUniversityQualified: z.number().int().nonnegative().optional(),
});

export type ALGrade = z.infer<typeof ALGradeEnum>;
export type ALStreamResultData = z.infer<typeof ALStreamResultSchema>;
export type ALResultData = z.infer<typeof ALResultSchema>;
export type Al = ALResultData;
