import { createServerCaller } from '@nexus/api';
import type {
  LocaleEnumData,
  HeroData,
  AcademicsStreamCardsData,
  AcademicsStreamComparisonData,
  AcademicsContactsData,
  CtaData,
} from '@nexus/contracts';
import { cache } from 'react';

// ── Academics page ───────────────────────────────────────────────────────────

export interface AcademicsPageContent {
  hero: HeroData;
  streams: AcademicsStreamCardsData;
  comparison: AcademicsStreamComparisonData;
  contacts: AcademicsContactsData;
  cta: CtaData;
}

export const getAcademicsPageContent = cache(
  async (locale: LocaleEnumData): Promise<AcademicsPageContent> => {
    const sections = await createServerCaller().contentEntry.getByScope({
      scope: 'page:academics',
      locale,
    });
    return {
      hero: sections['academics.hero'] as HeroData,
      streams: sections['academics.streams'] as AcademicsStreamCardsData,
      comparison: sections[
        'academics.comparison'
      ] as AcademicsStreamComparisonData,
      contacts: sections['academics.contacts'] as AcademicsContactsData,
      cta: sections['academics.cta'] as CtaData,
    };
  },
);
