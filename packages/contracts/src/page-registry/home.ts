// packages/contracts/src/page-registry/home.ts
//
// Registry definition for the Homepage.
// Sections will be added here as the home page blocks are designed and built.
//
// To add a section:
// 1. Define a Zod schema in content/page-content.ts (or reuse a CONTENT_TYPES schema)
// 2. Add a SectionDefinition entry to the sections array below
// 3. Create the fetcher in apps/web/src/server/content.ts → getHomePageContent()
// 4. Build the React block component in apps/web/src/blocks/home/

import type { PageRegistry } from './types.js';

export const homeRegistry: PageRegistry = {
  page: 'home',
  scope: 'page:home',
  label: 'Homepage',
  description: 'The main landing page of the Nexus school website.',
  sections: [
    // Sections are added here as home page blocks are implemented.
    // Example entry (uncomment and adapt when ready):
    //
    // {
    //   key: 'home.hero',
    //   contentType: 'hero',
    //   label: 'Hero Banner',
    //   description: 'Main headline, subheadline, and hero image shown above the fold.',
    //   schema: HomeHeroSchema,
    // },
    //
    // {
    //   key: 'home.announcement',
    //   contentType: 'announcement',
    //   label: 'Announcement Banner',
    //   description: 'Optional site-wide notice displayed at the top of the homepage.',
    //   schema: AnnouncementSchema,
    // },
  ],
};
