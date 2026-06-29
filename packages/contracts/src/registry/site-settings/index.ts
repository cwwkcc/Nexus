// packages/contracts/src/registry/site-settings/index.ts
//
// Site settings registry — operational configuration in the SiteSetting table.
//
// Contrast with ContentEntry (editorial, versioned, per-locale):
//   SiteSetting → operational config, last-write-wins, keyed by (key, locale)
//
// Should contain:
//   SITE_SETTING_KEYS          — as const tuple of all valid setting keys
//   SiteSettingKey             — union type
//   SITE_SETTING_SCHEMAS       — Record<SiteSettingKey, ZodTypeAny>
//   SITE_SETTING_META          — SiteSettingMeta[] with label, group, isGlobal
//   GLOBAL_SETTING_KEYS        — locale-independent keys (URLs, phone, flags)
//   TRANSLATABLE_SETTING_KEYS  — keys with per-locale rows (en, si, ta)
//   getSiteSettingGroups()     — groups meta by admin UI group label
//   SiteSettingMeta            — { key, label, description?, group, isGlobal }
//
// Notes:
//   Migrate directly from packages/validation/src/site-settings/index.ts.
//   No logic changes needed — just move the file and update the import path.

import { z } from 'zod';

// TODO: implement (migrate from packages/validation/src/site-settings/index.ts)
