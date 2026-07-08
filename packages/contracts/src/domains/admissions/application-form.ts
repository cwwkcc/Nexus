// packages/contracts/src/features/admissions/application.ts

import { z } from 'zod';

import { AddressSchema } from '../../primitives/address.ts';

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
