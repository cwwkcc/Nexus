// packages/contracts/src/domains/extracurriculars/activity.ts
//
// Extracurricular activity contracts for the Extracurriculars page (section
// 08 of docs/Design System/Page Specifications.md). Three categories match
// ExtracurricularCard's own variant vocabulary in Component Reference.md —
// 'sports', 'performing-arts', 'leadership' — with Scouts and the National
// Cadet Corps both filed under 'leadership' rather than getting their own
// categories, matching how the actual card component group them.

import { z } from 'zod';

import { ImageSchema } from '../../primitives/media/index.ts';

export const ExtracurricularCategoryEnum = z.enum([
  'sports',
  'performing-arts',
  'leadership',
]);

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

export type ExtracurricularCategoryEnumData = z.infer<
  typeof ExtracurricularCategoryEnum
>;
export type ActivityData = z.infer<typeof ActivitySchema>;
