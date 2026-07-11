// packages/contracts/src/domains/societies/society-profile.ts
//
// Society profile contracts for the Societies Hub and individual society
// pages (sections 09 of docs/Design System/Page Specifications.md, routed
// at /societies/[slug]). Category values match the hub's own filter options
// (Academic, Sports, Arts, Technology).
//
// Leadership, achievements, recent events, and gallery are deliberately not
// embedded here — they're separate content (StaffSchema, SocietyAchievement,
// editorial events, gallery albums) queried by this society's id, per the
// package's rule against one tier-4 schema embedding another directly.

import { z } from 'zod';

import { AvatarSchema, ImageSchema } from '../../primitives/media/index.ts';

export const SocietyCategoryEnum = z.enum([
  'academic',
  'sports',
  'arts',
  'technology',
]);

export const SocietySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  tagline: z.string().optional(),
  category: SocietyCategoryEnum,
  foundingYear: z.string().optional(),
  description: z.string().optional(),
  meetingSchedule: z.string().optional(),
  memberCount: z.number().int().nonnegative().optional(),
  howToJoin: z.string().optional(),
  bannerImage: ImageSchema.optional(),
  logo: AvatarSchema.optional(),
  isFeatured: z.boolean().optional(),
});

export const SocietyCardSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  tagline: z.string().optional(),
  category: SocietyCategoryEnum,
  logo: AvatarSchema.optional(),
  isFeatured: z.boolean().optional(),
});

export type SocietyCategoryEnumData = z.infer<typeof SocietyCategoryEnum>;
export type SocietyData = z.infer<typeof SocietySchema>;
export type SocietyCardData = z.infer<typeof SocietyCardSchema>;
