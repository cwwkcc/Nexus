// packages/contracts/src/features/people/student.ts
//
// Student data contracts — ADMIN PANEL ONLY. Never import in apps/web.
//
// Should contain:
//   StudentSchema — id, name, admissionNumber, grade (string),
//                   stream? (ALStream), enrolledYear,
//                   status ('active'|'graduated'|'transferred')
//   StudentData   — z.infer type
//
// PRIVACY:
//   Student data is PII. Only add fields strictly needed for administration.
//   Review docs/governance/Data Privacy Policy.md before adding fields.

import { z } from 'zod';
import { ALStreamEnum } from '../identity/school/stream';

export const StudentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  admissionNumber: z.string().min(1),
  grade: z.string().min(1),
  stream: ALStreamEnum.optional(),
  enrolledYear: z.string().min(1),
  status: z.enum(['active', 'graduated', 'transferred']),
});

export type StudentData = z.infer<typeof StudentSchema>;
export type Student = StudentData;
