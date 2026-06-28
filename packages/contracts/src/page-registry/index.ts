// packages/contracts/src/page-registry/index.ts
//
// The master page registry. Every page that participates in the CMS must be
// registered here. The admin panel reads this to build its page list; the
// API router reads it to validate incoming content.
//
// Adding a new page:
// 1. Create packages/contracts/src/page-registry/{page}.ts
// 2. Import the registry below and add it to PAGE_REGISTRY
// 3. Export the registry from this file

export * from './types.js';
export * from './about.js';
export * from './home.js';

import type { ZodTypeAny } from 'zod';

import { aboutRegistry } from './about.js';
import { homeRegistry } from './home.js';
import type { PageRegistry } from './types.js';

// ── Master list ───────────────────────────────────────────────────────────────
// Add new page registries here in the order they should appear in the admin panel.

export const PAGE_REGISTRY: PageRegistry[] = [aboutRegistry, homeRegistry];

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Look up a page registry by its page key.
 * Returns undefined if the page is not registered.
 */
export function getPageRegistry(page: string): PageRegistry | undefined {
  return PAGE_REGISTRY.find((r) => r.page === page);
}

/**
 * Look up a specific section definition within a page registry.
 */
export function getSectionDefinition(page: string, sectionKey: string) {
  return getPageRegistry(page)?.sections.find((s) => s.key === sectionKey);
}

/**
 * Collect all registered section schemas across all pages into a flat map
 * keyed by sectionKey. Used by the API router to validate incoming content
 * without knowing which page a sectionKey belongs to.
 *
 * Includes global registry sections (navigation, footer, etc.).
 */
export function getAllSectionSchemas(): Record<string, ZodTypeAny> {
  const result: Record<string, ZodTypeAny> = {};
  for (const registry of PAGE_REGISTRY) {
    for (const section of registry.sections) {
      result[section.key] = section.schema;
    }
  }
  return result;
}
