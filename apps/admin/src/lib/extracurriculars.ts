// apps/admin/src/lib/extracurriculars.ts
//
// AdminActivity is inferred directly from the real router output, the
// same convention societies.ts/gallery.ts use.

import type { AppRouter } from '@nexus/api';
import { EXTRACURRICULAR_CATEGORY_META } from '@nexus/contracts';
import type { inferRouterOutputs } from '@trpc/server';

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type AdminActivity = RouterOutputs['extracurriculars']['adminList'][number];

export function categoryLabel(category: string): string {
  return EXTRACURRICULAR_CATEGORY_META.find((meta) => meta.key === category)?.label ?? category;
}

/** Label map for the achievement-level `<Select>` in ActivityForm.tsx —
 * AchievementLevel (@nexus/contracts) is a bare enum with no display-label
 * source of its own, the same gap SOCIETY_CATEGORY_META's header comment
 * describes SocietyCategoryEnum having had before it was added. Kept as a
 * small local map here rather than a new contracts export since this is
 * the first UI consumer of AchievementLevel in this codebase — a second
 * consumer (Task 7.19's school-wide Achievements module) is the right
 * trigger to promote this into @nexus/contracts alongside the others, not
 * a copy authored ahead of that actual need. */
export const ACHIEVEMENT_LEVEL_OPTIONS = [
  { value: 'national', label: 'National' },
  { value: 'provincial', label: 'Provincial' },
  { value: 'district', label: 'District' },
  { value: 'school', label: 'School' },
] as const;

export function achievementLevelLabel(level: string): string {
  return ACHIEVEMENT_LEVEL_OPTIONS.find((option) => option.value === level)?.label ?? level;
}
