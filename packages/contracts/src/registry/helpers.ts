// packages/contracts/src/registry/helpers.ts
//
// Helper functions for querying the combined registry.
//
// Should contain:
//   getPageRegistry(page)            — PageRegistry | undefined
//   getSectionDefinition(page, key)  — SectionDefinition | undefined
//   getAllSectionSchemas()            — Record<sectionKey, ZodSchema>
//                                      merges all pages + globals
//   getGlobalSection(key)            — GlobalSectionDefinition | undefined
//   getGlobalSectionSchemas()        — Record<sectionKey, ZodSchema> for globals only
//
// Notes:
//   getAllSectionSchemas() is used by the API router to validate incoming writes
//   without knowing which page a sectionKey belongs to.
//   Migrate from current page-registry/index.ts and global-registry/index.ts.

import { z } from 'zod';

import {
  aboutRegistry,
  academicsRegistry,
  administrationRegistry,
  admissionsRegistry,
  contactRegistry,
  eventsRegistry,
  extracurricularsRegistry,
  facilitiesRegistry,
  galleryRegistry,
  homeRegistry,
  newsRegistry,
  resultsRegistry,
  societiesRegistry,
} from './pages/index.js';
import type { PageRegistry } from './types.js';

export const PAGE_REGISTRY: PageRegistry[] = [
  aboutRegistry,
  academicsRegistry,
  administrationRegistry,
  admissionsRegistry,
  contactRegistry,
  eventsRegistry,
  extracurricularsRegistry,
  facilitiesRegistry,
  galleryRegistry,
  homeRegistry,
  newsRegistry,
  resultsRegistry,
  societiesRegistry,
];

export function getPageRegistry(page: string): PageRegistry | undefined {
  return PAGE_REGISTRY.find((r) => r.page === page);
}

/**
 * Returns all section schemas from all page registries merged into a single record.
 * Used by the API router to validate incoming writes without knowing which page
 * a sectionKey belongs to.
 */
export function getAllSectionSchemas(): Record<string, z.ZodTypeAny> {
  const schemas: Record<string, z.ZodTypeAny> = {};
  for (const registry of PAGE_REGISTRY) {
    for (const section of registry.sections) {
      schemas[section.key] = section.schema;
    }
  }
  return schemas;
}

/**
 * Returns all global section schemas merged into a single record.
 * Used by the API router to validate incoming writes for global sections.
 */
export function getGlobalSectionSchemas(): Record<string, z.ZodTypeAny> {
  // Global sections are defined in registry/globals/*.ts
  // For now, return empty object as globals are not fully implemented
  return {};
}
