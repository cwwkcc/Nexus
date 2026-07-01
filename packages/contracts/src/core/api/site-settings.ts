// packages/contracts/src/core/api/site-settings.ts

import { z } from 'zod';

export const GetSiteSettingInput = z.object({
  key: z.string(),
  locale: z.string().optional(),
});

export const UpdateSiteSettingInput = z.object({
  key: z.string(),
  locale: z.string(),
  value: z.unknown(),
});

export const SiteSettingOutput = z.object({
  key: z.string(),
  locale: z.string(),
  value: z.unknown(),
  updatedAt: z.string(),
});

export const BulkGetSiteSettingsInput = z.object({
  keys: z.array(z.string()),
  locale: z.string().optional(),
});
