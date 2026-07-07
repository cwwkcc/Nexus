// packages/contracts/src/system/auth/user.ts
//
// An authenticated user account.

import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserData = z.infer<typeof UserSchema>;
