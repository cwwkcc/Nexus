// packages/contracts/src/domains/extracurriculars/activity.ts

import { z } from 'zod';

import { ImageSchema } from '../../primitives/media/index.ts';

export const ExtracurricularCategoryEnum = z.enum(['sports', 'performing-arts', 'leadership']);

export const ActivitySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: ExtracurricularCategoryEnum,
  description: z.string().min(1),
  image: ImageSchema.optional(),
  teacherInCharge: z.string().optional(),
  achievements: z.array(z.string()).optional(),
  studentQuote: z.string().optional(),
});

export type ExtracurricularCategoryEnumData = z.infer<typeof ExtracurricularCategoryEnum>;
export type ActivityData = z.infer<typeof ActivitySchema>;
