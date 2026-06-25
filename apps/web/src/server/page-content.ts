// apps/web/src/server/page-content.ts
//
// Typed page fetchers for apps/web.
//
// Each fetcher wraps React's cache() for request-scoped memoisation: every
// block component on a page calls getAboutPageContent(locale), but only the
// first call hits the DB; the rest read the in-memory result for that request.
//
// Router: contentEntry.getByScope (canonical) — not the old pageContent.getByPage.
// Scope convention: 'page:about', 'page:home', etc.
//
// IMPORTANT: getByScope only returns sections whose status is 'published'.
// Sections saved as 'draft' will not appear here. Use the admin editor to
// publish sections before expecting them to render on the public site.

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

// ── About page ────────────────────────────────────────────────────────────────

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
    const sections = await createServerCaller().contentEntry.getByScope({
      scope: 'page:about',
      locale,
    });

    // Cast per key: if a section hasn't been published yet, the field will be
    // undefined here rather than silently rendering an empty page. Block
    // components should handle `undefined` gracefully until seeded.
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

// ── Home page ─────────────────────────────────────────────────────────────────
// Sections are added here as home blocks are designed and registered.

export interface HomePageContent {
  // e.g. hero: HomeHeroData;
}

export const getHomePageContent = cache(
  async (locale: Locale): Promise<HomePageContent> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _sections = await createServerCaller().contentEntry.getByScope({
      scope: 'page:home',
      locale,
    });

    return {};
  },
);
