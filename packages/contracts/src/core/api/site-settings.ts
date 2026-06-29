// packages/contracts/src/core/api/site-settings.ts
//
// Input/output schemas for the siteSettings tRPC router.
//
// Should contain:
//   GetSiteSettingInput       — key (SiteSettingKey), locale?
//   UpdateSiteSettingInput    — key, locale, value (unknown)
//   SiteSettingOutput         — key, locale, value, updatedAt
//   BulkGetSiteSettingsInput  — keys: SiteSettingKey[], locale?
//
// Notes:
//   value is stored as JSONB in Postgres. The admin panel validates each
//   value against SITE_SETTING_SCHEMAS[key] before calling the procedure.

import { z } from 'zod';

// TODO: implement
