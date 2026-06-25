// packages/validation/src/global-registry/index.ts
//
// Global content sections: navigation, footer, and other site-wide content.
// These live in ContentEntry with scopes like 'global:navigation', 'global:footer'.
//
// Unlike page sections, global sections are not tied to one page. They appear
// across the entire site and are managed centrally in the admin panel under
// "Global Content".

import { z } from 'zod';
import type { ZodTypeAny } from 'zod';

// ── Navigation ────────────────────────────────────────────────────────────────

export const NavLinkSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
});

export const NavGroupSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string().optional(),
  children: z.array(NavLinkSchema).optional(),
});

export const NavigationContentSchema = z.object({
  links: z.array(NavGroupSchema),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
});
export type NavigationContentData = z.infer<typeof NavigationContentSchema>;
export type NavGroup = z.infer<typeof NavGroupSchema>;
export type NavLink = z.infer<typeof NavLinkSchema>;

// ── Footer ────────────────────────────────────────────────────────────────────

export const FooterLinkSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
});

export const FooterColumnSchema = z.object({
  id: z.string(),
  heading: z.string(),
  links: z.array(FooterLinkSchema),
});

export const FooterContentSchema = z.object({
  tagline: z.string().optional(),
  columns: z.array(FooterColumnSchema),
  copyright: z.string().optional(),
  legalLinks: z.array(FooterLinkSchema).optional(),
});
export type FooterContentData = z.infer<typeof FooterContentSchema>;
export type FooterColumn = z.infer<typeof FooterColumnSchema>;

// ── Global section definition ─────────────────────────────────────────────────

export interface GlobalSectionDefinition {
  /** The sectionKey stored in ContentEntry (e.g. 'navigation.main') */
  key: string;
  /** The scope stored in ContentEntry (e.g. 'global:navigation') */
  scope: string;
  /** Generic content type category */
  contentType: string;
  /** Human-readable label for the admin panel */
  label: string;
  /** Help text for admins */
  description?: string;
  /** Zod schema used for validation and form building */
  schema: ZodTypeAny;
}

// ── GLOBAL_REGISTRY ───────────────────────────────────────────────────────────

export const GLOBAL_REGISTRY: GlobalSectionDefinition[] = [
  {
    key: 'navigation.main',
    scope: 'global:navigation',
    contentType: 'navigation',
    label: 'Main Navigation',
    description:
      'Top navigation links (with optional dropdown children) and CTA button. Changes affect every page.',
    schema: NavigationContentSchema,
  },
  {
    key: 'footer.main',
    scope: 'global:footer',
    contentType: 'footer',
    label: 'Footer',
    description:
      'Footer link columns, tagline, copyright notice, and legal links.',
    schema: FooterContentSchema,
  },
];

/**
 * Look up a global section by its sectionKey.
 */
export function getGlobalSection(
  key: string,
): GlobalSectionDefinition | undefined {
  return GLOBAL_REGISTRY.find((s) => s.key === key);
}

/**
 * Collect all global section schemas into a flat map keyed by sectionKey.
 * Merged into getAllSectionSchemas() in the page-registry index.
 */
export function getGlobalSectionSchemas(): Record<string, ZodTypeAny> {
  const result: Record<string, ZodTypeAny> = {};
  for (const section of GLOBAL_REGISTRY) {
    result[section.key] = section.schema;
  }
  return result;
}
