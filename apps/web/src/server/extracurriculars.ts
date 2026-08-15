// apps/web/src/server/extracurriculars.ts
//
// Server-side data fetchers for the Extracurriculars module (Task 7.17,
// F-161/F-179), mirroring server/societies.ts's shape. No `bySlug`/
// `getByHref` — there's no individual detail page for an activity (see
// packages/api/src/modules/extracurriculars/validators.ts's own header
// comment).

import { createServerCaller } from '@nexus/api';
import type { HeroData, LocaleEnumData } from '@nexus/contracts';
import { cache } from 'react';

export interface ExtracurricularsPageChrome {
  hero: HeroData;
}

const fallbackHero: HeroData = { blockType: 'hero', eyebrow: 'Extracurriculars', title: 'Beyond the Classroom' };

export const getExtracurricularsPageChrome = cache(async (locale: LocaleEnumData): Promise<ExtracurricularsPageChrome> => {
  const sections = await createServerCaller().contentEntry.getByScope({
    scope: 'page:extracurriculars',
    locale,
  });

  return {
    hero: (sections['extracurriculars.hero'] as HeroData | undefined) ?? fallbackHero,
  };
});

export const getActivityList = cache(async (locale: LocaleEnumData) => {
  return createServerCaller().extracurriculars.list({ locale, category: 'all' });
});

/** Resolves a set of coach `Staff` ids into `{ id: name }`, deduplicated
 * so an activity list with a repeat coach across several teams only
 * issues one lookup per distinct id. Reuses `staff.byId`, the same
 * public single-lookup procedure server/societies.ts's own `getAdvisor`
 * calls for a society's advisor — there's no bulk "staff by ids"
 * procedure to add scope for when the activities list is realistically a
 * few dozen rows at most (see modules/extracurriculars/validators.ts's
 * own note on why this module stays deliberately unpaginated). */
export const getCoachNames = cache(async (coachStaffIds: readonly (string | null)[]): Promise<Record<string, string>> => {
  const uniqueIds = [...new Set(coachStaffIds.filter((id): id is string => Boolean(id)))];
  if (uniqueIds.length === 0) return {};

  const caller = createServerCaller();
  const results = await Promise.all(uniqueIds.map((id) => caller.staff.byId({ id })));

  const names: Record<string, string> = {};
  uniqueIds.forEach((id, index) => {
    const staff = results[index];
    if (staff) names[id] = staff.name;
  });
  return names;
});
