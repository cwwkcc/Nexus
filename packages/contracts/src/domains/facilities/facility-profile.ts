// packages/contracts/src/domains/facilities/facility-profile.ts
//
// Facility profile contracts for the Facilities page (section 07 of
// docs/Design System/Page Specifications.md). Seven facilities are shown
// today (Main Building, Science Labs, ICT Labs, Auditorium, Sports Grounds,
// Swimming Pool, Library); the Swimming Pool is the only one with a
// schedule, per FacilityCard's two variants (standard / schedule) in
// Component Reference.md — that's why `schedule` is optional rather than a
// stored variant flag: whether a facility has one is a fact about the
// facility, not a presentation choice made separately from it.

import { z } from 'zod';

import { ImageSchema } from '../../primitives/media/index.ts';

export const FacilityTypeEnum = z.enum([
  'building',
  'laboratory',
  'auditorium',
  'sports',
  'pool',
  'library',
]);

export const FacilityScheduleSlotSchema = z.object({
  day: z.string().min(1),
  opens: z.string().min(1),
  closes: z.string().min(1),
  notes: z.string().optional(),
});

export const FacilitySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  type: FacilityTypeEnum,
  description: z.string().min(1),
  images: z.array(ImageSchema).min(1),
  features: z.array(z.string()).optional(),
  capacity: z.number().int().positive().optional(),
  schedule: z.array(FacilityScheduleSlotSchema).optional(),
});

export const FacilityCardSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  type: FacilityTypeEnum,
  image: ImageSchema,
  features: z.array(z.string()).optional(),
});

export type FacilityTypeEnumData = z.infer<typeof FacilityTypeEnum>;
export type FacilityScheduleSlotData = z.infer<typeof FacilityScheduleSlotSchema>;
export type FacilityData = z.infer<typeof FacilitySchema>;
export type FacilityCardData = z.infer<typeof FacilityCardSchema>;
