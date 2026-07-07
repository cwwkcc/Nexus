// packages/contracts/src/registry/pages/results.ts
//
// Page registry for: Results
//
// Should contain:
//   resultsRegistry — PageRegistry object:
//     page:        'results'
//     scope:       'page:results'
//     label:       'Results'
//     description: What this page is and who manages it
//     sections:    SectionDefinition[] — one entry per block on this page
//
// Each SectionDefinition:
//   key:         'results.{sectionName}'  → stored as ContentEntry.sectionKey
//   blockKey:    key from BLOCKS registry (e.g. 'hero', 'stats', 'timeline')
//   label:       Section name shown in the admin editor
//   description: Help text for content editors explaining what this section is
//   schema:      The block schema — either a BLOCKS schema directly, or a
//                page-specific extension: HeroSchema.extend({ extraField: z.string() })
//
// When adding a section:
//   1. Add a SectionDefinition entry here
//   2. Add seed data in packages/database/prisma/seed-results.ts
//   3. Update the page fetcher in apps/web/src/server/content.ts
//   4. Build the block in apps/web/src/blocks/results/

import type { PageRegistry } from '../types.js';

export const resultsRegistry: PageRegistry = {
  page: 'results',
  scope: 'page:results',
  label: 'Results',
  description: '', // TODO: add a description for the admin panel
  sections: [
    // TODO: add SectionDefinition entries as blocks are designed and built
    //
    // Example:
    // {
    //   key: 'results.hero',
    //   blockKey: 'hero',
    //   label: 'Hero Banner',
    //   description: 'Top-of-page headline and eyebrow text.',
    //   schema: HeroSchema,
    // },
  ],
};
