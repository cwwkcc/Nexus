// packages/contracts/src/blocks/contact-info.ts
//
// Contact info block — structured school contact details for the contact page.
//
// Should contain:
//   ContactInfoBlockSchema — address (AddressData), phone, email, officeHours?,
//                            admissionsPhone?, admissionsEmail?, mapEmbedUrl?
//   ContactInfoBlockData   — z.infer type
//
// Notes:
//   This block assembles values from several SiteSettings into one renderable shape.
//   The Contact page reads individual settings and validates the assembled object
//   against this schema before passing it to the ContactInfo component.

import { z } from 'zod';

// TODO: implement
