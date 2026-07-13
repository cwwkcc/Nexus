import { createServerCaller } from '@nexus/api';
import type {
  LocaleEnumData,
  HeroData,
  StatsData,
  FacilitiesGridData,
  CtaData,
} from '@nexus/contracts';
import { cache } from 'react';

// ── Facilities page ───────────────────────────────────────────────────────────

export interface FacilitiesPageContent {
  hero: HeroData;
  stats: StatsData;
  grid: FacilitiesGridData;
  cta: CtaData;
}

export const getFacilitiesPageContent = cache(
  async (locale: LocaleEnumData): Promise<FacilitiesPageContent> => {
    const sections = await createServerCaller().contentEntry.getByScope({
      scope: 'page:facilities',
      locale,
    });
    return {
      hero: sections['facilities.hero'] as HeroData,
      stats: sections['facilities.stats'] as StatsData,
      grid: sections['facilities.grid'] as FacilitiesGridData,
      cta: sections['facilities.cta'] as CtaData,
    };
  },
);
