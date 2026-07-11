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
//   Members are recorded here directly, by name — there's no student roster
//   or enrollment concept anywhere in this package for it to link to, and
//   nothing in the Feature Registry calls for one. Keep it that way unless
//   an actual student-facing feature gets scoped in.

import { z } from 'zod';

export const SocietyMemberRoleEnum = z.enum([
  'president',
  'secretary',
  'treasurer',
  'member',
  'alumni',
]);

export const SocietyMemberSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: SocietyMemberRoleEnum,
  image: z.string().optional(),
  bio: z.string().optional(),
  year: z.string().optional(),
});

export type SocietyMemberRoleEnumData = z.infer<typeof SocietyMemberRoleEnum>;
export type SocietyMemberData = z.infer<typeof SocietyMemberSchema>;
