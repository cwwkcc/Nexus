// packages/contracts/src/features/societies/achievement.ts
//
// Society-specific achievement (e.g. debate team trophy).
// Distinct from editorial/achievements/ (school-wide achievements).
//
// Should contain:
//   SocietyAchievementSchema — id, title, description?, level (AchievementLevel),
//                              date (ISO), awardedBy?, image? (R2 key)
//   SocietyAchievementData   — z.infer type

import { z } from 'zod';

import { AchievementLevel } from '../../editorial/achievements/achievement.ts';

export const SocietyAchievementSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  level: AchievementLevel,
  date: z.string().min(1),
  awardedBy: z.string().optional(),
  image: z.string().optional(),
});

export type SocietyAchievementData = z.infer<typeof SocietyAchievementSchema>;
