// packages/contracts/src/registry/pages/index.ts
//
// Master page registry — every CMS-managed page registered here.
//
// Adding a new page:
//   1. Create registry/pages/{page}.ts
//   2. Import the registry and add it to PAGE_REGISTRY below
//   3. Export from this file
//   4. Add the page fetcher in apps/web/src/server/content.ts
//   5. Build the page in apps/web/src/app/[locale]/{page}/page.tsx

export * from './about.js';
export * from './home.js';
export * from './academics.js';
export * from './admissions.js';
export * from './news.js';
export * from './events.js';
export * from './societies.js';
export * from './facilities.js';
export * from './extracurriculars.js';
export * from './gallery.js';
export * from './contact.js';
export * from './results.js';
export * from './administration.js';

import { aboutRegistry }          from './about.js';
import { homeRegistry }           from './home.js';
import { academicsRegistry }      from './academics.js';
import { admissionsRegistry }     from './admissions.js';
import { newsRegistry }           from './news.js';
import { eventsRegistry }         from './events.js';
import { societiesRegistry }      from './societies.js';
import { facilitiesRegistry }     from './facilities.js';
import { extracurricularsRegistry } from './extracurriculars.js';
import { galleryRegistry }        from './gallery.js';
import { contactRegistry }        from './contact.js';
import { resultsRegistry }        from './results.js';
import { administrationRegistry } from './administration.js';
import type { PageRegistry }      from '../types.js';

export const PAGE_REGISTRY: PageRegistry[] = [
  homeRegistry,
  aboutRegistry,
  academicsRegistry,
  admissionsRegistry,
  newsRegistry,
  eventsRegistry,
  societiesRegistry,
  facilitiesRegistry,
  extracurricularsRegistry,
  galleryRegistry,
  contactRegistry,
  resultsRegistry,
  administrationRegistry,
];
