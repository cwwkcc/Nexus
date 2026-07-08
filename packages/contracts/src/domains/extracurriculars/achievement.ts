// packages/contracts/src/features/extracurriculars/achievement.ts
//
// Achievement earned through an extracurricular activity.
//
// Should contain:
//   ExtracurricularAchievementSchema — id, activityId, title, description?,
//                                      level (AchievementLevel), date (ISO), awardedBy?
//   ExtracurricularAchievementData   — z.infer type

import { z } from 'zod';
import { AchievementLevel } from '../../editorial/achievements/achievement';

export const ExtracurricularAchievementSchema = z.object({
  id: z.string().min(1),
  activityId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  level: AchievementLevel,
  date: z.string().min(1),
  awardedBy: z.string().optional(),
});

export type ExtracurricularAchievementData = z.infer<
  typeof ExtracurricularAchievementSchema
>;
export type ExtracurricularAchievement = ExtracurricularAchievementData;
