// packages/contracts/src/features/extracurriculars/activity.ts
//
// Extracurricular activity contract.
// Informal activities distinct from registered societies.
//
// Should contain:
//   ActivityCategory  — z.enum(['sports','arts','community','academic','other'])
//   ActivitySchema    — id, name, category, description, image? (R2 key),
//                       coordinator?, schedule?, locale
//   ActivityCardSchema — id, name, category, image?
//   ActivityData      — z.infer type

import { z } from 'zod';

export const ExtracurricularVariant = z.enum(['sport', 'performing-arts', 'leadership']);

export const ActivitySchema = z.object({
  variant: ExtracurricularVariant.optional(),
  name: z.string(),
  description: z.string(),
  recentAchievements: z.array(z.string()).optional(),
  teacherInCharge: z.string().optional(),
  studentQuote: z.string().optional(),
  season: z.string().optional(),
  href: z.string().optional(),
  imageSrc: z.string().optional(),
  imageAlt: z.string().optional(),
});

export type ActivityData = z.infer<typeof ActivitySchema>;
export type ExtracurricularVariantType = z.infer<typeof ExtracurricularVariant>;

// Runtime enum values for comparisons
export const ExtracurricularVariantValues = ExtracurricularVariant.enum;
