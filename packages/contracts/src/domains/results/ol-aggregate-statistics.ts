// packages/contracts/src/features/results/ol.ts
//
// O/L exam results — aggregate school-level statistics only.
//
// Should contain:
//   OLGrade         — z.enum(['A','B','C','S','F','AB'])
//   OLSubjectResult — subject (name), passRate (0–100)
//   OLResultSchema  — year (string e.g. '2024'), totalSitting, totalPassed,
//                     subjectResults?: OLSubjectResult[]
//   OLResultData    — z.infer type
//
// PRIVACY:
//   Never store or display individual student O/L grades on the public website.
//   This schema captures school-level aggregate statistics only.

import { z } from 'zod';

export const OLGradeEnum = z.enum(['A', 'B', 'C', 'S', 'F', 'AB']);

export const OLSubjectResultSchema = z.object({
  subject: z.string().min(1),
  passRate: z.number().min(0).max(100),
});

export const OLResultSchema = z.object({
  year: z.string().min(1),
  totalSitting: z.number().int().nonnegative(),
  totalPassed: z.number().int().nonnegative(),
  subjectResults: z.array(OLSubjectResultSchema).optional(),
});

export type OLGrade = z.infer<typeof OLGradeEnum>;
export type OLSubjectResultData = z.infer<typeof OLSubjectResultSchema>;
export type OLResultData = z.infer<typeof OLResultSchema>;
export type Ol = OLResultData;
