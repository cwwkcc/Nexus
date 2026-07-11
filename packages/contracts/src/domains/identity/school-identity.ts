// packages/contracts/src/domains/identity/school-identity.ts
//
// Core school identity — the typed shape assembled from SiteSettings.
//
// Notes:
//   Not stored as a single DB row — assembled at runtime from SiteSetting rows.
//   SchoolSchema validates the assembled object.
//   Individual settings are read via getSiteSettingGroups() + SITE_SETTING_SCHEMAS.

import { z } from 'zod';
import { AddressSchema } from '../../primitives/address.ts';

export const SchoolSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  motto: z.string().min(1),
  established: z.string().min(1),
  address: AddressSchema,
  phone: z.string().min(1),
  email: z.string().email(),
  mapEmbedUrl: z.string().url().optional(),
});

export type SchoolData = z.infer<typeof SchoolSchema>;
