// apps/web/src/server/page-content.ts
//
// Each about/* block component needs its own section of `about` page
// content. Calling createServerCaller().pageContent.getByPage() directly in
// every component would mean nine separate DB round-trips for one page load
// (getByPage returns the whole page's sections, not one). Wrapping it in
// React's cache() makes it request-scoped-memoized — every block component
// below calls getAboutPageContent(locale) and only the first call actually
// hits the database; the rest read the cached result for that request.

import { createServerCaller } from '@nexus/api';
import type {
  Locale,
  AboutHeroData,
  AboutStoryData,
  AboutKannangaraData,
  AboutTimelineData,
  AboutEthosData,
  AboutValuesData,
  AboutCrestData,
  AboutLegacyData,
  AboutAnthemData,
  AboutClosingData,
} from '@nexus/validation';
import { cache } from 'react';

export interface AboutPageContent {
  hero: AboutHeroData;
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
    const sections = await createServerCaller().pageContent.getByPage({
      page: 'about',
      locale,
    });

    // Cast per key rather than the whole object — if the migration script
    // hasn't been run yet, a missing key surfaces here as `undefined` at a
    // specific field instead of silently rendering an empty page.
    return {
      hero: sections['about.hero'] as AboutHeroData,
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
