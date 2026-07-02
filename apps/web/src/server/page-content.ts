import { createServerCaller } from '@nexus/api';
import type {
  Locale,
  AboutHeroData,
  AboutStatsData,
  AboutStoryData,
  AboutKannangaraData,
  AboutTimelineData,
  AboutEthosData,
  AboutValuesData,
  AboutCrestData,
  AboutLegacyData,
  AboutAnthemData,
  AboutClosingData,
} from '@nexus/contracts';
import { cache } from 'react';

// ── About page ────────────────────────────────────────────────────────────────

export interface AboutPageContent {
  hero: AboutHeroData;
  stats: AboutStatsData;
  story: AboutStoryData;
  aboutKannangara: AboutKannangaraData;
  timeline: AboutTimelineData;
  ethos: AboutEthosData;
  values: AboutValuesData;
  crest: AboutCrestData;
  legacy: AboutLegacyData;
  anthem: AboutAnthemData;
  closing: AboutClosingData;
}

export const getAboutPageContent = cache(
  async (locale: Locale): Promise<AboutPageContent> => {
    const sections = await createServerCaller().contentEntry.getByScope({
      scope: 'page:about',
      locale,
    });
    return {
      hero: sections['about.hero'] as AboutHeroData,
      stats: sections['about.stats'] as AboutStatsData,
      story: sections['about.story'] as AboutStoryData,
      aboutKannangara: sections['about.aboutKannangara'] as AboutKannangaraData,
      timeline: sections['about.timeline'] as AboutTimelineData,
      ethos: sections['about.ethos'] as AboutEthosData,
      values: sections['about.values'] as AboutValuesData,
      crest: sections['about.crest'] as AboutCrestData,
      legacy: sections['about.legacy'] as AboutLegacyData,
      anthem: sections['about.anthem'] as AboutAnthemData,
      closing: sections['about.closing'] as AboutClosingData,
    };
  },
);
