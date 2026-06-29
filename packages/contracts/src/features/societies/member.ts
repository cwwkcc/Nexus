// packages/contracts/src/features/societies/member.ts
//
// Society membership contracts.
//
// Should contain:
//   SocietyMemberRole   — z.enum(['president','secretary','treasurer','member','alumni'])
//   SocietyMemberSchema — id, name, role, image? (R2 key), bio?, year?
//   SocietyMemberData   — z.infer type
//
// Notes:
//   Members are stored as part of the society ContentEntry data.
//   Not linked to features/people/student.ts — no foreign key relationship.

import { z } from 'zod';

// TODO: implement
