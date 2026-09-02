// apps/admin/src/lib/achievements.ts
//
// AdminAchievement is inferred directly from the real router output
// (inferRouterOutputs<AppRouter>), the same convention alumni.ts uses, so it
// can't silently drift from the API. The achievements module follows the same
// pattern as alumni: a list with pagination and filtering by category and year.

import type { AppRouter } from '@nexus/api';
import { ACHIEVEMENT_CATEGORY_LABELS, ACHIEVEMENT_LEVEL_LABELS, AchievementCategory, AchievementLevel } from '@nexus/contracts';
import type { inferRouterOutputs } from '@trpc/server';

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type AdminAchievement = RouterOutputs['achievements']['adminList']['items'][number];
export type AchievementCategory = AdminAchievement['category'];
export type AchievementLevel = AdminAchievement['level'];

// Re-exported from @nexus/contracts (shared with the web app) rather than
// declared locally — see achievement.ts's comment on why.
export { ACHIEVEMENT_CATEGORY_LABELS, ACHIEVEMENT_LEVEL_LABELS };

export const categoryOptions = [{ value: 'all', label: 'All categories' }, ...AchievementCategory.options.map((value) => ({ value, label: ACHIEVEMENT_CATEGORY_LABELS[value as AchievementCategory] }))];

/**
 * Extracts unique years from an achievement list for the filter dropdown.
 * Sorted in descending order (most recent first).
 */
export function getYears(achievements: AdminAchievement[]): string[] {
  const years = new Set(achievements.map((a) => a.date.substring(0, 4)));
  return Array.from(years).sort((a, b) => b.localeCompare(a));
}
