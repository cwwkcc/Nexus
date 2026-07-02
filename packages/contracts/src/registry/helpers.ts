// packages/contracts/src/registry/helpers.ts

import { z } from 'zod';

import { GLOBAL_REGISTRY } from './globals/index.ts';
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
import type {
  GlobalSectionDefinition,
  PageRegistry,
  SectionDefinition,
} from './types.js';

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

export function getSectionDefinition(
  page: string,
  key: string,
): SectionDefinition | undefined {
  return getPageRegistry(page)?.sections.find((s) => s.key === key);
}

/**
 * Returns all section schemas — pages and globals — merged into a single
 * record, keyed by sectionKey. Used by the API router to validate incoming
 * writes without knowing which page (or global) a sectionKey belongs to.
 */
export function getAllSectionSchemas(): Record<string, z.ZodTypeAny> {
  const schemas: Record<string, z.ZodTypeAny> = {};
  for (const registry of PAGE_REGISTRY) {
    for (const section of registry.sections) {
      schemas[section.key] = section.schema;
    }
  }
  for (const [key, schema] of Object.entries(getGlobalSectionSchemas())) {
    schemas[key] = schema;
  }
  return schemas;
}

export function getGlobalSection(
  key: string,
): GlobalSectionDefinition | undefined {
  return GLOBAL_REGISTRY.find((g) => g.key === key);
}

/**
 * Returns all global section schemas merged into a single record.
 * Used by the API router to validate incoming writes for `global:*` scopes.
 */
export function getGlobalSectionSchemas(): Record<string, z.ZodTypeAny> {
  const schemas: Record<string, z.ZodTypeAny> = {};
  for (const section of GLOBAL_REGISTRY) {
    schemas[section.key] = section.schema;
  }
  return schemas;
}
