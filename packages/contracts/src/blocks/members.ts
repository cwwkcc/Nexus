// packages/contracts/src/blocks/members.ts

import { z } from 'zod';

export const MemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  image: z.string().optional(),
  bio: z.string().optional(),
});

export const MembersSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  members: z.array(MemberSchema),
});

export type MembersData = z.infer<typeof MembersSchema>;
export type MemberItem = z.infer<typeof MemberSchema>;
