// packages/contracts/src/core/auth/index.ts
//
// Authentication contracts.
//
// Should contain:
//   UserSchema         — id, email, name, role, createdAt, updatedAt
//   SessionSchema      — id, userId, token, expiresAt
//   AuthInput          — email, password
//   AuthOutput         — user, session, token
//
// Notes:
//   Not implemented in Phase 1. Scaffold now for future auth system.

import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const SessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  token: z.string(),
  expiresAt: z.string(),
});

export const AuthInput = z.object({
  email: z.string(),
  password: z.string(),
});

export const AuthOutput = z.object({
  user: UserSchema,
  session: SessionSchema,
  token: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type Session = z.infer<typeof SessionSchema>;
