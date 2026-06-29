// packages/contracts/src/core/common/address.ts
//
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



// TODO: implement

export type Address = unknown;
