// packages/contracts/src/registry/globals/index.ts
//
// Global content registry — site-wide sections not tied to any single page.
// Managed in the admin panel under 'Global Content'.
//
// Adding a new global section:
//   1. Define its schema in registry/globals/{name}.ts
//   2. Add a GlobalSectionDefinition to GLOBAL_REGISTRY below
//   3. Seed it in packages/database/prisma/seed-globals.ts

export * from './navigation.js';
export * from './footer.js';

import { NavigationContentSchema } from './navigation.js';
import { FooterContentSchema }     from './footer.js';
import type { GlobalSectionDefinition } from '../types.js';

export const GLOBAL_REGISTRY: GlobalSectionDefinition[] = [
  {
    key: 'navigation.main',
    scope: 'global:navigation',
    contentType: 'navigation',
    label: 'Main Navigation',
    description: 'Top navigation links and CTA button. Changes affect every page.',
    schema: NavigationContentSchema,
  },
  {
    key: 'footer.main',
    scope: 'global:footer',
    contentType: 'footer',
    label: 'Footer',
    description: 'Footer link columns, tagline, copyright notice, and legal links.',
    schema: FooterContentSchema,
  },
];
