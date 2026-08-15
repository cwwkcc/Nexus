// apps/web/src/lib/extracurricular-card.ts
//
// Maps an ExtracurricularActivity domain row
// (packages/api/src/modules/extracurriculars) onto ActivityData
// (@nexus/contracts), the projection @nexus/ui's ExtracurricularCard
// renders. Same reasoning as society-card.ts's own header comment —
// centralized here since it's non-trivial: achievements are a structured
// array server-side but the card wants a flattened `string[]`, and the
// card's `variant` prop uses a deliberately different vocabulary than the
// stored `category` (see domains/extracurriculars/activity.ts's own
// ExtracurricularVariantEnum doc comment for why).
//
// No `href` is ever set — see this module's own header comment
// (packages/api/src/modules/extracurriculars/validators.ts) for why
// there's no individually routable detail page for an activity.

import type { ActivityData, ExtracurricularVariantType } from '@nexus/contracts';

/** ExtracurricularCategoryEnum ('sports' plural) -> ExtracurricularCard's
 * own `variant` vocabulary ('sport' singular for the sports case only —
 * performing-arts/leadership match their category value exactly). */
const CATEGORY_TO_CARD_VARIANT: Record<string, ExtracurricularVariantType> = {
  sports: 'sport',
  'performing-arts': 'performing-arts',
  leadership: 'leadership',
};

/** How many of an activity's most recent achievements the card shows —
 * achievements arrive from the service layer already sorted
 * newest-first (schema.prisma's ExtracurricularActivity doc comment), so
 * this is simply "take the first N," not a second sort. A card is a
 * compact summary, not the full trophy cabinet. */
const MAX_CARD_ACHIEVEMENTS = 3;

export interface ExtracurricularAchievementSource {
  title: string;
  date: string; // YYYY-MM-DD
}

export interface ExtracurricularActivitySource {
  id: string;
  name: string;
  category: string;
  description: string;
  studentQuote: string | null;
  season: string | null;
  photo: { src: string; alt: string } | null;
  achievements: ExtracurricularAchievementSource[];
}

function achievementYear(date: string): string {
  return date.slice(0, 4);
}

export function toExtracurricularCard(activity: ExtracurricularActivitySource, coachName: string | null): ActivityData {
  return {
    id: activity.id,
    name: activity.name,
    category: activity.category as ActivityData['category'],
    description: activity.description,
    imageSrc: activity.photo?.src,
    imageAlt: activity.photo?.alt,
    teacherInCharge: coachName ?? undefined,
    recentAchievements: activity.achievements.slice(0, MAX_CARD_ACHIEVEMENTS).map((a) => `${a.title} (${achievementYear(a.date)})`),
    studentQuote: activity.studentQuote ?? undefined,
    season: activity.season ?? undefined,
  };
}

export function cardVariantForCategory(category: string): ExtracurricularVariantType {
  return CATEGORY_TO_CARD_VARIANT[category] ?? 'sport';
}
