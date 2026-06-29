// packages/contracts/src/features/school/identity.ts
//
// Core school identity — the typed shape assembled from SiteSettings.
//
// Should contain:
//   SchoolSchema — name, shortName ('KCC'), motto, established ('1873'),
//                  address (AddressData), phone, email, mapEmbedUrl?
//   SchoolData   — z.infer type
//
// Notes:
//   Not stored as a single DB row — assembled at runtime from SiteSetting rows.
//   SchoolSchema validates the assembled object.
//   Individual settings are read via getSiteSettingGroups() + SITE_SETTING_SCHEMAS.
//   Migrate from packages/validation/src/school/.

import { z } from 'zod';

// TODO: implement
