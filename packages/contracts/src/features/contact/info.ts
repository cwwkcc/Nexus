// packages/contracts/src/features/contact/info.ts
//
// Assembled contact information for the contact page.
//
// Should contain:
//   ContactInfoSchema — address (AddressData), phone, email, officeHours?,
//                       admissionsContact?: { phone, email }, mapEmbedUrl?
//   ContactInfoData   — z.infer type
//
// Notes:
//   Individual fields come from SiteSettings.
//   This schema validates the assembled object after reading from settings.

import { z } from 'zod';

// TODO: implement
