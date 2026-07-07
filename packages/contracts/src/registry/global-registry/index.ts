// packages/contracts/src/registry/globals/index.ts

import type { GlobalSectionDefinition } from '../types.ts';
import { FooterContentSchema } from './footer.ts';
import { NavigationContentSchema } from './navigation.ts';

export * from './footer.ts';
export * from './navigation.ts';

/**
 * Every global (non-page-scoped) content section, in the same shape
 * PAGE_REGISTRY uses for pages. Consumed by getGlobalSectionSchemas() /
 * getGlobalSection() so the ContentEntry router can validate writes to
 * `global:*` scopes without special-casing them.
 */
export const GLOBAL_REGISTRY: GlobalSectionDefinition[] = [
  {
    key: 'navigation.main',
    scope: 'global:navigation',
    contentType: 'navigation',
    label: 'Main Navigation',
    description:
      'Top navigation links, including one level of dropdown children.',
    schema: NavigationContentSchema,
  },
  {
    key: 'footer.main',
    scope: 'global:footer',
    contentType: 'footer',
    label: 'Site Footer',
    description:
      'School name, tagline, contact lines, footer link columns, social links, and copyright.',
    schema: FooterContentSchema,
  },
];
