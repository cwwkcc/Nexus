// packages/contracts/src/features/admissions/application.ts
//
// Admissions application form contract — ADMIN PANEL ONLY.
//
// Should contain:
//   ApplicationFormSchema — studentName, dateOfBirth, currentSchool?,
//                           gradeApplyingFor, parentName, parentPhone, parentEmail,
//                           address (AddressData), preferredStream? (ALStream)
//   ApplicationStatus     — z.enum(['pending','reviewing','accepted','rejected','waitlisted'])
//   ApplicationData       — z.infer type
//
// PRIVACY:
//   Application data is PII. apps/web submits the form but never reads stored applications.
//   Only the admin panel reads ApplicationData.

import { z } from 'zod';
import { AddressSchema } from '../../primitives/address';

export const ApplicationStatusEnum = z.enum([
  'pending',
  'reviewing',
  'accepted',
  'rejected',
  'waitlisted',
]);

export const ApplicationFormSchema = z.object({
  studentName: z.string().min(1),
  dateOfBirth: z.string().datetime({ offset: true }).or(z.string().min(1)),
  currentSchool: z.string().optional(),
  gradeApplyingFor: z.string().min(1),
  parentName: z.string().min(1),
  parentPhone: z.string().min(1),
  parentEmail: z.string().email(),
  address: AddressSchema,
  preferredStream: z.string().optional(),
  status: ApplicationStatusEnum.default('pending'),
});

export type ApplicationStatus = z.infer<typeof ApplicationStatusEnum>;
export type ApplicationData = z.infer<typeof ApplicationFormSchema>;
export type Application = ApplicationData;
