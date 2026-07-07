// packages/contracts/src/features/people/staff.ts
//
// Staff member contracts.
//
// Should contain:
//   StaffRole       — z.enum(['teacher','admin','support'])
//   StaffSchema     — id, name, role (StaffRole), department? (DepartmentKey),
//                     subject?, image? (R2 key), bio?, joinedYear?
//   StaffCardSchema — id, name, role, department?, image?
//   StaffData       — z.infer type
//   StaffCardData   — z.infer type
//
// Notes:
//   email is admin-only — never expose in StaffCardSchema.
//   The public staff directory shows StaffCardData only.
//   Migrate from packages/validation/src/people/.

import { z } from 'zod';

export const StaffCardVariant = z.enum(['principal', 'grid', 'compact']);

export const StaffSchema = z.object({
  variant: StaffCardVariant.optional(),
  name: z.string(),
  title: z.string(),
  tenure: z.string().optional(),
  quote: z.string().optional(),
  imageSrc: z.string().optional(),
  imageAlt: z.string().optional(),
  portfolio: z.string().optional(),
  href: z.string().optional(),
});

export type StaffData = z.infer<typeof StaffSchema>;
export type StaffCardVariantType = z.infer<typeof StaffCardVariant>;

// Runtime enum values for comparisons
export const StaffCardVariantValues = StaffCardVariant.enum;
