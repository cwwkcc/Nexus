// apps/web/src/server/achievements.ts
//
// Server-side data fetchers for the Achievements module (Task 7.19, F-156/F-181),
// mirroring server/alumni.ts's shape.

import { createServerCaller } from '@nexus/api';
import { AchievementCategory, type AchievementCategoryData, type HeroData, type LocaleEnumData } from '@nexus/contracts';
import { cache } from 'react';

export interface AchievementsPageChrome {
  hero: HeroData;
}

const fallbackHero: HeroData = { blockType: 'hero', eyebrow: 'Achievements', title: 'Achievement Database' };

export const getAchievementsPageChrome = cache(async (locale: LocaleEnumData): Promise<AchievementsPageChrome> => {
  const sections = await createServerCaller().contentEntry.getByScope({
    scope: 'page:achievements',
    locale,
  });

  return {
    hero: (sections['achievements.hero'] as HeroData | undefined) ?? fallbackHero,
  };
});

export interface AchievementListParams {
  category?: AchievementCategoryData | string;
  year?: string;
  page?: number;
  pageSize?: number;
}

function normalizeCategory(category: AchievementCategoryData | string | undefined): AchievementCategoryData | undefined {
  if (!category) return undefined;
  return AchievementCategory.options.includes(category as AchievementCategoryData) ? (category as AchievementCategoryData) : undefined;
}

export const getAchievementList = cache(async ({ category, year, page = 1, pageSize = 20 }: AchievementListParams) => {
  return createServerCaller().achievements.list({
    category: normalizeCategory(category),
    year,
    page,
    pageSize,
  });
});
