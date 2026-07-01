// packages/contracts/src/school/results.ts
//
// Exam results contracts.
//
// Should contain:
//   SubjectResultSchema — name, grade
//   SubjectResultData  — z.infer type
//
// Note: This is a lightweight result type for UI display.
// Full exam result schemas are in school/results/ directory.

import { z } from 'zod';

export const SubjectResultSchema = z.object({
  name: z.string(),
  grade: z.string(),
});

export type SubjectResultData = z.infer<typeof SubjectResultSchema>;

