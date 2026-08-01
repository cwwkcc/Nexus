// packages/database/src/lib/password.ts
//
// Password hashing for the break-glass account only (F-078). Every other
// admin authenticates via Google Workspace OAuth (M1b) and has no password
// in this system at all — `User.passwordHash` stays null for them.
//
// Lives here, not in apps/admin, so the seed script (which creates the
// break-glass account from ADMIN_EMAIL/ADMIN_PASSWORD) and the Credentials
// provider (which verifies a login attempt) hash and compare against the
// exact same algorithm and cost factor. Duplicating this in both places
// would make it possible for them to quietly drift apart.

import bcrypt from 'bcryptjs';

// 12 rounds is bcrypt's commonly recommended floor for an interactively-used
// admin account in 2026 — costly enough to resist offline brute force of a
// leaked hash, cheap enough that a real login isn't noticeably slow.
const BCRYPT_COST_FACTOR = 12;

export async function hashPassword(plaintext: string): Promise<string> {
  return bcrypt.hash(plaintext, BCRYPT_COST_FACTOR);
}

export async function verifyPassword(plaintext: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}
