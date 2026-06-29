// packages/contracts/src/registry/index.ts
//
// The registry layer — defines what exists in the Nexus CMS.
//
// Consumers:
//   apps/admin       — reads PAGE_REGISTRY to render the content editor
//   packages/api     — reads getAllSectionSchemas() to validate writes
//   packages/database/prisma/seed.ts — reads registries to know what to seed

export * from './types.js';
export * from './helpers.js';
export * from './pages/index.js';
export * from './globals/index.js';
export * from './site-settings/index.js';
