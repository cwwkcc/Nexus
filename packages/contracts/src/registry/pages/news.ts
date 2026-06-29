// packages/contracts/src/registry/pages/news.ts
//
// Page registry for: News
//
// Should contain:
//   newsRegistry — PageRegistry object:
//     page:        'news'
//     scope:       'page:news'
//     label:       'News'
//     description: What this page is and who manages it
//     sections:    SectionDefinition[] — one entry per block on this page
//
// Each SectionDefinition:
//   key:         'news.{sectionName}'  → stored as ContentEntry.sectionKey
//   blockKey:    key from BLOCKS registry (e.g. 'hero', 'stats', 'timeline')
//   label:       Section name shown in the admin editor
//   description: Help text for content editors explaining what this section is
//   schema:      The block schema — either a BLOCKS schema directly, or a
//                page-specific extension: HeroSchema.extend({ extraField: z.string() })
//
// When adding a section:
//   1. Add a SectionDefinition entry here
//   2. Add seed data in packages/database/prisma/seed-news.ts
//   3. Update the page fetcher in apps/web/src/server/content.ts
//   4. Build the block in apps/web/src/blocks/news/

import type { PageRegistry } from '../types.js';

export const newsRegistry: PageRegistry = {
  page: 'news',
  scope: 'page:news',
  label: 'News',
  description: '', // TODO: add a description for the admin panel
  sections: [
    // TODO: add SectionDefinition entries as blocks are designed and built
    //
    // Example:
    // {
    //   key: 'news.hero',
    //   blockKey: 'hero',
    //   label: 'Hero Banner',
    //   description: 'Top-of-page headline and eyebrow text.',
    //   schema: HeroSchema,
    // },
  ],
};
