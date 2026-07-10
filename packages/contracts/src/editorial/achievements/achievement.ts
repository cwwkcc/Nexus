// packages/contracts/src/editorial/achievements/achievement.ts
//
// School-level achievement contract.
//
// AchievementSchema     — the full entity: id, title, description?, level,
//                         category, date (ISO), awardedBy?, image? (R2 key), locale
// AchievementCardSchema — lighter projection for grid display (used by @nexus/ui)
//
// Notes:
//   School-wide achievements — distinct from features/societies/achievement.ts
//   (which is specific to a single society).
//   Used on the home page achievement section and a dedicated achievements list.

import { z } from 'zod';

import {
  MAX_TITLE_LENGTH,
  MAX_DESCRIPTION_LENGTH,
} from '../../constants/index.ts';
import { ImageSchema, LocaleEnum } from '../../primitives/index.ts';

export const ACHIEVEMENT_CONTENT_TYPE = 'achievement';

export const AchievementLevel = z.enum([
  'national',
  'provincial',
  'district',
  'school',
]);

export const AchievementCategory = z.enum([
  'academic',
  'sports',
  'cultural',
  'other',
]);

// The full entity — CMS/admin CRUD and ContentEntry storage.
export const AchievementSchema = z.object({
  id: z.string(),
  title: z.string().max(MAX_TITLE_LENGTH),
  description: z.string().max(MAX_DESCRIPTION_LENGTH).optional(),
  level: AchievementLevel,
  category: AchievementCategory,
  date: z.string(), // ISO date
  awardedBy: z.string().optional(),
  image: ImageSchema.optional(),
  locale: LocaleEnum,
});

export type AchievementData = z.infer<typeof AchievementSchema>;
export type AchievementLevelData = z.infer<typeof AchievementLevel>;
export type AchievementCategoryData = z.infer<typeof AchievementCategory>;

// Card projection — matches @nexus/ui's AchievementCardProps exactly.
export const AchievementCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  year: z.string(),
  category: z.string().optional(),
  context: z.string().optional(),
  imageSrc: z.string().optional(),
  imageAlt: z.string().optional(),
  href: z.string().optional(),
});

export type AchievementCardData = z.infer<typeof AchievementCardSchema>;
