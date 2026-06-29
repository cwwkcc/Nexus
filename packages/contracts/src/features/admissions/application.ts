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

// TODO: implement
