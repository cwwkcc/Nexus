// apps/web/src/server/alumni.ts
//
// Server-side data fetchers for the Alumni module (Task 7.18, F-154/F-180),
// mirroring server/societies.ts's shape.

import { createServerCaller } from '@nexus/api';
import type { HeroData, LocaleEnumData } from '@nexus/contracts';
import { cache } from 'react';

export interface AlumniPageChrome {
  hero: HeroData;
}

const fallbackHero: HeroData = { blockType: 'hero', eyebrow: 'Alumni', title: 'Alumni Directory' };

export const getAlumniPageChrome = cache(async (locale: LocaleEnumData): Promise<AlumniPageChrome> => {
  const sections = await createServerCaller().contentEntry.getByScope({
    scope: 'page:alumni',
    locale,
  });

  return {
    hero: (sections['alumni.hero'] as HeroData | undefined) ?? fallbackHero,
  };
});

export interface AlumniListParams {
  graduationYear?: string;
  profession?: string;
  page?: number;
  pageSize?: number;
}

export const getAlumniList = cache(async ({ graduationYear, profession, page = 1, pageSize = 20 }: AlumniListParams) => {
  return createServerCaller().alumni.list({
    graduationYear,
    profession,
    page,
    pageSize,
  });
});
