// packages/contracts/src/features/admissions/requirements.ts
//
// Eligibility and requirements contracts.
//
// Should contain:
//   GradeLevel        — z.enum(['grade-6','grade-10','grade-12','other'])
//   RequirementSchema — id, title, description, gradeLevel,
//                       documents?: string[], notes?
//   EligibilitySchema — gradeLevel, requirements: Requirement[], cutoffMark?
//   EligibilityData   — z.infer type

import { z } from 'zod';

export const GradeLevelEnum = z.enum([
  'grade-6',
  'grade-10',
  'grade-12',
  'other',
]);

export const RequirementSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  gradeLevel: GradeLevelEnum,
  documents: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export const EligibilitySchema = z.object({
  gradeLevel: GradeLevelEnum,
  requirements: z.array(RequirementSchema),
  cutoffMark: z.number().int().min(0).max(100).optional(),
});

export type GradeLevel = z.infer<typeof GradeLevelEnum>;
export type RequirementData = z.infer<typeof RequirementSchema>;
export type EligibilityData = z.infer<typeof EligibilitySchema>;
export type Requirements = EligibilityData;
