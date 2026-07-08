// packages/contracts/src/registry/global-registry/index.ts

export * from './footer.js';
export * from './navigation.js';

/**
 * Every global (non-page-scoped) content section.
 * TODO: Update to use proper SectionDefinitionData once registry is fully implemented.
 */
export const GLOBAL_REGISTRY = [
  {
    sectionKey: 'navigation.main',
    scope: 'global:navigation',
    contentTypeKey: 'navigation',
    order: 1,
    localeRequired: false,
  },
  {
    sectionKey: 'footer.main',
    scope: 'global:footer',
    contentTypeKey: 'footer',
    order: 2,
    localeRequired: false,
  },
];
