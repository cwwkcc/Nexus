// packages/contracts/src/primitieves/address.ts

// Physical address contract. Reused across contact info and facility locations.
//
// Should contain:
//   AddressSchema  — street, city, province, postalCode?, country (default 'Sri Lanka')
//   AddressData    — z.infer<typeof AddressSchema>
//
// Notes:
//   Currently defined inline in registry/site-settings/index.ts.
//   Extracted here so features/contact/info.ts and features/facilities/facility.ts
//   can reference the same shape without duplication.

import { z } from 'zod';

export const AddressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  province: z.string().min(1),
  postalCode: z.string().optional(),
  country: z.string().default('Sri Lanka'),
});

export type AddressData = z.infer<typeof AddressSchema>;
export type Address = AddressData;
