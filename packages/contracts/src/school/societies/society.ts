// packages/contracts/src/features/societies/society.ts
//
// Society profile contract.
//
// Should contain:
//   SocietyType      — z.enum(['academic','sports','cultural','service','religious','other'])
//   SocietySchema    — id, slug, name, type, description, coverImage? (R2 key),
//                      logo? (R2 key), founded? (year string), advisor?,
//                      memberCount?, meetingSchedule?, locale
//   SocietyCardSchema — id, slug, name, type, coverImage?, memberCount?
//   SocietyData      — z.infer type
//   SocietyCardData  — z.infer type
//
// Notes:
//   Each society gets a detail page at /societies/{slug}.

import { z } from 'zod';

export const SocietyCardVariant = z.enum(['hub-grid', 'featured']);

export const SocietySchema = z.object({
  variant: SocietyCardVariant.optional(),
  name: z.string(),
  tagline: z.string(),
  category: z.string(),
  href: z.string(),
  imageSrc: z.string().optional(),
  imageAlt: z.string().optional(),
  isFeatured: z.boolean().optional(),
  memberCount: z.number().optional(),
  founded: z.string().optional(),
});

export type SocietyData = z.infer<typeof SocietySchema>;
export type SocietyCardVariantType = z.infer<typeof SocietyCardVariant>;

// Runtime enum values for comparisons
export const SocietyCardVariantValues = SocietyCardVariant.enum;
