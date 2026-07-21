// packages/contracts/src/domains/extracurriculars/activity.ts

import { z } from 'zod';

import { ImageSchema } from '../../primitives/media/index.ts';

export const ExtracurricularCategoryEnum = z.enum(['sports', 'performing-arts', 'leadership']);

export const ExtracurricularVariantEnum = z.enum(['sport', 'performing-arts', 'leadership']);

export const ActivitySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: ExtracurricularCategoryEnum,
  description: z.string().min(1),
  image: ImageSchema.optional(),
  imageSrc: z.string().optional(),
  imageAlt: z.string().optional(),
  teacherInCharge: z.string().optional(),
  recentAchievements: z.array(z.string()).optional(),
  studentQuote: z.string().optional(),
  season: z.string().optional(),
  href: z.string().optional(),
});

export type ExtracurricularCategoryEnumData = z.infer<typeof ExtracurricularCategoryEnum>;
export type ExtracurricularVariantType = z.infer<typeof ExtracurricularVariantEnum>;
export type ActivityData = z.infer<typeof ActivitySchema>;
