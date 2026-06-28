// packages/contracts/src/page-registry/types.ts
//
// Type definitions for the page and section registries.
// Developers declare the structure of each page using these types.

import type { ZodTypeAny } from 'zod';

/**
 * Defines one content section within a page.
 * Developers create one SectionDefinition per block on a page.
 */
export interface SectionDefinition {
  /**
   * Unique key for this section. Used as:
   * - The `sectionKey` column in the ContentEntry table
   * - The prop key in the typed page fetcher
   * Convention: `{page}.{sectionName}` e.g. 'about.hero'
   */
  key: string;

  /**
   * Maps to a key in CONTENT_TYPES. Stored as `contentType` in the DB.
   * Used by the admin panel to categorise sections and (eventually)
   * select an appropriate form renderer.
   */
  contentType: string;

  /**
   * Human-readable label shown in the admin panel section list.
   */
  label: string;

  /**
   * Optional help text shown below the section label in the admin panel.
   * Describe what this section contains and any constraints.
   */
  description?: string;

  /**
   * The Zod schema used to:
   * 1. Validate data before it is written to the DB (in the API router)
   * 2. Drive the dynamic form builder in the admin panel
   *
   * May be a generic CONTENT_TYPES schema or a page-specific extension.
   */
  schema: ZodTypeAny;
}

/**
 * The complete definition for one page.
 * One file per page in page-registry/, imported into index.ts.
 */
export interface PageRegistry {
  /**
   * Unique page identifier. Used in URL segments and as the scope prefix.
   * e.g. 'about' → scope 'page:about'
   */
  page: string;

  /**
   * Full scope string used as the `scope` column in ContentEntry.
   * Convention: `page:{page}` e.g. 'page:about'
   */
  scope: string;

  /**
   * Display name shown in the admin content list.
   */
  label: string;

  /**
   * Optional description of this page for the admin panel.
   */
  description?: string;

  /**
   * All content sections for this page, in the order they appear on the page.
   * The admin panel renders one editor card per section.
   */
  sections: SectionDefinition[];
}
