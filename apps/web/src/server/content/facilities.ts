import type { LocaleEnumData, HeroData, StatsData, FacilitiesGridData, CtaData } from '@nexus/contracts';
import { cache } from 'react';

import { getServerCaller } from '../lib/server-caller';

// ── Facilities page ───────────────────────────────────────────────────────────

export interface FacilitiesPageContent {
  hero: HeroData;
  stats: StatsData;
  grid: FacilitiesGridData;
  cta: CtaData;
}

export const getFacilitiesPageContent = cache(async (locale: LocaleEnumData): Promise<FacilitiesPageContent> => {
  const caller = await getServerCaller();
  const sections = await caller.contentEntry.getByScope({
    scope: 'page:facilities',
    locale,
  });
  return {
    hero: sections['facilities.hero'] as HeroData,
    stats: sections['facilities.stats'] as StatsData,
    grid: sections['facilities.grid'] as FacilitiesGridData,
    cta: sections['facilities.cta'] as CtaData,
  };
});
