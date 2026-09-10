// apps/web/src/server/archive.ts
//
// Server-side data fetchers for the Archive module (Task 7.20, F-155/F-182),
// mirroring server/achievements.ts's shape.

import { createServerCaller } from '@nexus/api';
import { ArchiveCategory, type ArchiveCategoryData, type HeroData, type LocaleEnumData } from '@nexus/contracts';
import { cache } from 'react';

export interface ArchivePageChrome {
  hero: HeroData;
}

const fallbackHero: HeroData = { blockType: 'hero', eyebrow: 'Archive', title: 'Digital Archive' };

export const getArchivePageChrome = cache(async (locale: LocaleEnumData): Promise<ArchivePageChrome> => {
  const sections = await createServerCaller().contentEntry.getByScope({
    scope: 'page:archive',
    locale,
  });

  return {
    hero: (sections['archive.hero'] as HeroData | undefined) ?? fallbackHero,
  };
});

export interface ArchiveListParams {
  category?: ArchiveCategoryData | string;
  year?: string;
  page?: number;
  pageSize?: number;
}

function normalizeCategory(category: ArchiveCategoryData | string | undefined): ArchiveCategoryData | undefined {
  if (!category) return undefined;
  return ArchiveCategory.options.includes(category as ArchiveCategoryData) ? (category as ArchiveCategoryData) : undefined;
}

export const getArchiveList = cache(async ({ category, year, page = 1, pageSize = 20 }: ArchiveListParams) => {
  return createServerCaller().archive.list({
    category: normalizeCategory(category),
    year,
    page,
    pageSize,
  });
});
