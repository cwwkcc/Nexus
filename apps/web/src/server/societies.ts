// apps/web/src/server/societies.ts
//
// Server-side data fetchers for the Societies module (Task 7.6, F-167),
// mirroring server/events.ts's shape.

import { createServerCaller } from '@nexus/api';
import type { HeroData, LocaleEnumData } from '@nexus/contracts';
import { cache } from 'react';

export interface SocietiesPageChrome {
  hero: HeroData;
}

const fallbackHero: HeroData = { blockType: 'hero', eyebrow: 'Societies', title: 'Clubs & Societies' };

export const getSocietiesPageChrome = cache(async (locale: LocaleEnumData): Promise<SocietiesPageChrome> => {
  const sections = await createServerCaller().contentEntry.getByScope({
    scope: 'page:societies',
    locale,
  });

  return {
    hero: (sections['societies.hero'] as HeroData | undefined) ?? fallbackHero,
  };
});

export interface SocietyListParams {
  locale: LocaleEnumData;
  category?: string;
}

export const getSocietyList = cache(async ({ locale, category }: SocietyListParams) => {
  return createServerCaller().societies.list({ locale, category: (category as never) ?? 'all' });
});

export const getSocietyBySlug = cache(async (locale: LocaleEnumData, slug: string) => {
  return createServerCaller().societies.bySlug({ locale, slug });
});

/** The advisor StaffCard on a society's own page — see
 * packages/api/src/modules/staff/service.ts's own doc comment on why a
 * public `byId` lookup needed to be added for this. */
export const getAdvisor = cache(async (advisorStaffId: string) => {
  return createServerCaller().staff.byId({ id: advisorStaffId });
});
