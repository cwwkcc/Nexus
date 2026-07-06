import { createServerCaller } from '@nexus/api';
import type {
  Locale,
  AcademicsHeroData,
  AcademicsStreamCardsData,
  AcademicsStreamComparisonData,
  AcademicsContactsData,
  AcademicsCtaData,
} from '@nexus/contracts';
import { cache } from 'react';

// ── Academics page ───────────────────────────────────────────────────────────

export interface AcademicsPageContent {
  hero: AcademicsHeroData;
  streams: AcademicsStreamCardsData;
  comparison: AcademicsStreamComparisonData;
  contacts: AcademicsContactsData;
  cta: AcademicsCtaData;
}

export const getAcademicsPageContent = cache(
  async (locale: Locale): Promise<AcademicsPageContent> => {
    const sections = await createServerCaller().contentEntry.getByScope({
      scope: 'page:academics',
      locale,
    });
    return {
      hero: sections['academics.hero'] as AcademicsHeroData,
      streams: sections['academics.streams'] as AcademicsStreamCardsData,
      comparison: sections['academics.comparison'] as AcademicsStreamComparisonData,
      contacts: sections['academics.contacts'] as AcademicsContactsData,
      cta: sections['academics.cta'] as AcademicsCtaData,
    };
  },
);
