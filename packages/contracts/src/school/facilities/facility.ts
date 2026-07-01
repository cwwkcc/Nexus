// packages/contracts/src/features/facilities/facility.ts
//
// Campus facility contract.
//
// Should contain:
//   FacilityType      — z.enum(['classroom','laboratory','library','sports',
//                               'auditorium','canteen','administrative','other'])
//   FacilitySchema    — id, slug, name, type, description,
//                       images: GalleryImage[], capacity?, features?: string[],
//                       hasPanorama? (bool), locale
//   FacilityCardSchema — id, slug, name, type, coverImage?
//   FacilityData      — z.infer type
//   FacilityCardData  — z.infer type
//
// Notes:
//   hasPanorama: true → renders PanoramicFacilityViewer with data from panoramic.ts.

import { z } from 'zod';

export const FacilityScheduleSlotSchema = z.object({
  day: z.string(),
  time: z.string(),
  group: z.string(),
});

export const FacilityCardVariant = z.enum(['standard', 'schedule']);

export const FacilitySchema = z.object({
  variant: FacilityCardVariant.optional(),
  name: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  href: z.string().optional(),
  imageSrc: z.string().optional(),
  imageAlt: z.string().optional(),
  schedule: z.array(FacilityScheduleSlotSchema).optional(),
});

export type FacilityData = z.infer<typeof FacilitySchema>;
export type FacilityCardVariantType = z.infer<typeof FacilityCardVariant>;

// Runtime enum values for comparisons
export const FacilityCardVariantValues = FacilityCardVariant.enum;
