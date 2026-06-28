// packages/contracts/src/site-settings/index.ts
//
// Definitions for SiteSetting values. These are global, non-page-specific
// settings stored in the SiteSetting table.
//
// Contrast with ContentEntry (page content, global content):
// - ContentEntry → editorial content, versioned, per-locale, per-section
// - SiteSetting  → operational config, last-write-wins, keyed by (key, locale)
//
// Settings with locale: 'global' are not translated (URLs, phone numbers, etc.)
// Settings with locale: 'en' | 'si' | 'ta' are translated.

import { z } from 'zod';
import type { ZodTypeAny } from 'zod';

// ── Setting key list ──────────────────────────────────────────────────────────

export const SITE_SETTING_KEYS = [
  // School identity
  'school.name',
  'school.shortName',
  'school.motto',
  'school.established',

  // Contact
  'school.address',
  'school.phone',
  'school.email',
  'school.mapEmbedUrl',

  // Leadership
  'principal.name',
  'principal.title',

  // Social media (locale: 'global' — URLs don't need translation)
  'social.facebook',
  'social.youtube',
  'social.whatsapp',
  'social.linkedin',

  // Site-wide UX
  'site.announcementBanner',
  'site.maintenanceMode',
] as const;

export type SiteSettingKey = (typeof SITE_SETTING_KEYS)[number];

// ── Schemas ───────────────────────────────────────────────────────────────────

const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  province: z.string(),
  country: z.string().default('Sri Lanka'),
  postalCode: z.string().optional(),
});

const AnnouncementBannerSchema = z
  .object({
    enabled: z.boolean(),
    variant: z.enum(['info', 'warning', 'error']).default('info'),
    message: z.string().min(1),
    linkLabel: z.string().optional(),
    linkHref: z.string().optional(),
  })
  .nullable();

export const SITE_SETTING_SCHEMAS: Record<SiteSettingKey, ZodTypeAny> = {
  'school.name': z.string().min(1),
  'school.shortName': z.string().min(1),
  'school.motto': z.string().min(1),
  'school.established': z.string().regex(/^\d{4}$/, 'Must be a 4-digit year'),

  'school.address': AddressSchema,
  'school.phone': z.string().min(1),
  'school.email': z.string().email(),
  'school.mapEmbedUrl': z.string().url(),

  'principal.name': z.string().min(1),
  'principal.title': z.string().min(1),

  'social.facebook': z.string().url().optional(),
  'social.youtube': z.string().url().optional(),
  'social.whatsapp': z.string().optional(),
  'social.linkedin': z.string().url().optional(),

  'site.announcementBanner': AnnouncementBannerSchema,
  'site.maintenanceMode': z.boolean(),
};

// ── Locale classification ─────────────────────────────────────────────────────

/**
 * These settings are locale-independent — they use locale: 'global'.
 * URLs, phone numbers, and technical values don't need translation.
 */
export const GLOBAL_SETTING_KEYS: SiteSettingKey[] = [
  'social.facebook',
  'social.youtube',
  'social.whatsapp',
  'social.linkedin',
  'school.mapEmbedUrl',
  'school.established',
  'site.maintenanceMode',
];

/**
 * These settings are translatable — they have a row per locale (en, si, ta).
 */
export const TRANSLATABLE_SETTING_KEYS: SiteSettingKey[] =
  SITE_SETTING_KEYS.filter(
    (k) =>
      !GLOBAL_SETTING_KEYS.includes(k as (typeof GLOBAL_SETTING_KEYS)[number]),
  );

// ── Admin metadata ────────────────────────────────────────────────────────────

export interface SiteSettingMeta {
  key: SiteSettingKey;
  label: string;
  description?: string;
  group: string;
  isGlobal: boolean;
}

export const SITE_SETTING_META: SiteSettingMeta[] = [
  // School identity
  {
    key: 'school.name',
    label: 'School Name',
    group: 'School Identity',
    isGlobal: false,
  },
  {
    key: 'school.shortName',
    label: 'Short Name / Abbreviation',
    group: 'School Identity',
    isGlobal: false,
  },
  {
    key: 'school.motto',
    label: 'School Motto',
    group: 'School Identity',
    isGlobal: false,
  },
  {
    key: 'school.established',
    label: 'Year Established',
    description: '4-digit year, e.g. 1873',
    group: 'School Identity',
    isGlobal: true,
  },

  // Contact
  {
    key: 'school.address',
    label: 'Address',
    group: 'Contact',
    isGlobal: false,
  },
  {
    key: 'school.phone',
    label: 'Phone Number',
    group: 'Contact',
    isGlobal: false,
  },
  {
    key: 'school.email',
    label: 'Email Address',
    group: 'Contact',
    isGlobal: false,
  },
  {
    key: 'school.mapEmbedUrl',
    label: 'Google Maps Embed URL',
    description:
      'Paste the full embed URL from Google Maps > Share > Embed a map.',
    group: 'Contact',
    isGlobal: true,
  },

  // Leadership
  {
    key: 'principal.name',
    label: 'Principal Name',
    group: 'Leadership',
    isGlobal: false,
  },
  {
    key: 'principal.title',
    label: 'Principal Title',
    description: 'e.g. "Principal", "Acting Principal"',
    group: 'Leadership',
    isGlobal: false,
  },

  // Social
  {
    key: 'social.facebook',
    label: 'Facebook Page URL',
    group: 'Social Media',
    isGlobal: true,
  },
  {
    key: 'social.youtube',
    label: 'YouTube Channel URL',
    group: 'Social Media',
    isGlobal: true,
  },
  {
    key: 'social.whatsapp',
    label: 'WhatsApp Number',
    description: 'International format, e.g. +94771234567',
    group: 'Social Media',
    isGlobal: true,
  },
  {
    key: 'social.linkedin',
    label: 'LinkedIn Page URL',
    group: 'Social Media',
    isGlobal: true,
  },

  // Site UX
  {
    key: 'site.announcementBanner',
    label: 'Announcement Banner',
    description:
      'Set to null to hide the banner. When enabled, appears site-wide.',
    group: 'Site',
    isGlobal: false,
  },
  {
    key: 'site.maintenanceMode',
    label: 'Maintenance Mode',
    description: 'When true, the public site shows a maintenance page.',
    group: 'Site',
    isGlobal: true,
  },
];

/**
 * Get all setting keys grouped by their admin group label.
 */
export function getSiteSettingGroups(): Record<string, SiteSettingMeta[]> {
  const groups: Record<string, SiteSettingMeta[]> = {};
  for (const meta of SITE_SETTING_META) {
    if (!groups[meta.group]) groups[meta.group] = [];
    groups[meta.group].push(meta);
  }
  return groups;
}
