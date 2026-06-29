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

// TODO: implement
