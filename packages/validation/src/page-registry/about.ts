// packages/validation/src/page-registry/about.ts
//
// Registry definition for the About page.
// Each section maps its sectionKey → Zod schema → admin label/description.
//
// When adding or removing sections from the About page:
// 1. Update this file
// 2. Update getAboutPageContent() in apps/web/src/server/content.ts
// 3. Run a migration script to seed/update DB content

import {
  AboutHeroSchema,
  AboutStorySchema,
  AboutKannangaraSchema,
  AboutTimelineSchema,
  AboutEthosSchema,
  AboutValuesSchema,
  AboutCrestSchema,
  AboutLegacySchema,
  AboutAnthemSchema,
  AboutClosingSchema,
} from '../content/page-content.js';
import type { PageRegistry } from './types';

export const aboutRegistry: PageRegistry = {
  page: 'about',
  scope: 'page:about',
  label: 'About KCC',
  description:
    "The About page introduces KCC — its history, the legacy of Dr. Kannangara, the school's ethos, and more.",
  sections: [
    {
      key: 'about.hero',
      contentType: 'hero',
      label: 'Hero Banner',
      description:
        'Eyebrow text (e.g. "Est. 1873 · Mathugama"), page headline, optional emphasised word, and subtitle shown at the top of the page.',
      schema: AboutHeroSchema,
    },
    {
      key: 'about.story',
      contentType: 'richText',
      label: 'Our Story',
      description:
        'The founding narrative of KCC — eyebrow, heading, body paragraph, and optional pull-quote with attribution.',
      schema: AboutStorySchema,
    },
    {
      key: 'about.aboutKannangara',
      contentType: 'richText',
      label: 'Our Namesake',
      description:
        'Profile of Dr. C.W.W. Kannangara — name, title, portrait image, biography paragraph, and optional quote.',
      schema: AboutKannangaraSchema,
    },
    {
      key: 'about.timeline',
      contentType: 'timeline',
      label: 'Historical Timeline',
      description:
        "Key milestones in KCC's history. Each milestone has a year, title, description, and era (early / mid / modern).",
      schema: AboutTimelineSchema,
    },
    {
      key: 'about.ethos',
      contentType: 'quote',
      label: 'Ethos — Vision, Mission & Motto',
      description:
        "The school's eyebrow labels, vision statement, mission statement, and motto. Each has its own eyebrow.",
      schema: AboutEthosSchema,
    },
    {
      key: 'about.values',
      contentType: 'values',
      label: 'Core Values',
      description:
        'The four school values. Each has an English name, a Latin name, and a description.',
      schema: AboutValuesSchema,
    },
    {
      key: 'about.crest',
      contentType: 'richText',
      label: 'Crest Explained',
      description:
        'Eyebrow, heading, intro paragraph, and list of crest symbols. Each symbol has a name, meaning, and position label.',
      schema: AboutCrestSchema,
    },
    {
      key: 'about.legacy',
      contentType: 'richText',
      label: 'Legacy',
      description:
        'Two sub-sections: "Spirit of Kannangara" (eyebrow, heading, paragraph, pull-quote) and "Physical Heritage" (eyebrow, heading, caption).',
      schema: AboutLegacySchema,
    },
    {
      key: 'about.anthem',
      contentType: 'richText',
      label: 'School Anthem',
      description:
        'Anthem section heading, description paragraph, audio player labels, and Sinhala lyrics text.',
      schema: AboutAnthemSchema,
    },
    {
      key: 'about.closing',
      contentType: 'richText',
      label: 'Closing Statement',
      description:
        'Eyebrow, final heading, body paragraph, and footnote rule shown at the very bottom of the page.',
      schema: AboutClosingSchema,
    },
  ],
};
