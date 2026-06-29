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

// TODO: implement
