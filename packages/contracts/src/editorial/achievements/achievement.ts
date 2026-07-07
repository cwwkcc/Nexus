// packages/contracts/src/editorial/achievements/achievement.ts
//
// School-level achievement contract.
//
// Should contain:
//   AchievementLevel    — z.enum(['national','provincial','district','school'])
//   AchievementCategory — z.enum(['academic','sports','cultural','other'])
//   AchievementSchema   — id, title, description?, level, category,
//                         date (ISO), awardedBy?, image? (R2 key), locale
//   AchievementCardData — lighter projection for grid display
//
// Notes:
//   School-wide achievements — distinct from features/societies/achievement.ts
//   (which is specific to a single society).
//   Used on the home page achievement section and a dedicated achievements list.

import { z } from 'zod';

export const AchievementLevel = z.enum(['national', 'provincial', 'district', 'school']);

export const AchievementCategory = z.enum(['academic', 'sports', 'cultural', 'other']);

export const AchievementSchema = z.object({
  id: z.string(),
  title: z.string(),
  year: z.string(),
  category: z.string().optional(),
  context: z.string().optional(),
  imageSrc: z.string().optional(),
  imageAlt: z.string().optional(),
  href: z.string().optional(),
});

export type AchievementData = z.infer<typeof AchievementSchema>;
