// packages/contracts/src/features/extracurriculars/achievement.ts

// Achievement earned through an extracurricular activity.

import { z } from 'zod';

import { AchievementLevel } from '../../editorial/achievements/achievement.ts';

export const ExtracurricularAchievementSchema = z.object({
  id: z.string().min(1),
  activityId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  level: AchievementLevel,
  date: z.string().min(1),
  awardedBy: z.string().optional(),
});

export type ExtracurricularAchievementData = z.infer<typeof ExtracurricularAchievementSchema>;
