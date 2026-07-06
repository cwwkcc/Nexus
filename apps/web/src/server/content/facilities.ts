import { createServerCaller } from '@nexus/api';
import type {
  Locale,
  FacilitiesHeroData,
  FacilitiesStatsData,
  FacilitiesGridData,
  FacilitiesCtaData,
} from '@nexus/contracts';
import { cache } from 'react';

// ── Facilities page ───────────────────────────────────────────────────────────

export interface FacilitiesPageContent {
  hero: FacilitiesHeroData;
  stats: FacilitiesStatsData;
  grid: FacilitiesGridData;
  cta: FacilitiesCtaData;
}

export const getFacilitiesPageContent = cache(
  async (locale: Locale): Promise<FacilitiesPageContent> => {
    const sections = await createServerCaller().contentEntry.getByScope({
      scope: 'page:facilities',
      locale,
    });
    return {
      hero: sections['facilities.hero'] as FacilitiesHeroData,
      stats: sections['facilities.stats'] as FacilitiesStatsData,
      grid: sections['facilities.grid'] as FacilitiesGridData,
      cta: sections['facilities.cta'] as FacilitiesCtaData,
    };
  },
);
