// packages/database/prisma/seed/admin/auth.ts
//
// Seeds the break-glass admin account (F-078/Task 6.5) from
// ADMIN_EMAIL/ADMIN_PASSWORD. Idempotent — safe to run against an
// environment that already has this account: it upserts by email and never
// touches totpSecret/totpEnabledAt/backup codes, so re-running the seed
// can't accidentally strip an operator's already-configured second factor.
//
// TOTP itself is deliberately NOT seeded here. Enrollment (scanning a real
// QR code with a real authenticator app) is inherently interactive — see
// apps/admin/src/app/auth/setup-totp, reached once signed in with the
// password this script sets.

import type { PrismaClient } from '../../src/generated/prisma/client.js';
import { hashPassword } from '../../src/lib/password.js';

export async function seedBreakGlassAdmin(db: PrismaClient): Promise<void> {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn('[seed] Skipping break-glass admin: ADMIN_EMAIL/ADMIN_PASSWORD not set.');
    return;
  }

  const passwordHash = await hashPassword(password);
  const existing = await db.user.findUnique({ where: { email } });

  if (existing) {
    await db.user.update({
      where: { email },
      data: { passwordHash, role: 'admin', isActive: true },
    });
    console.log(`[seed] Break-glass admin ${email} already exists — password refreshed.`);
    return;
  }

  await db.user.create({
    data: {
      email,
      name: 'Break-glass Admin',
      role: 'admin',
      isActive: true,
      passwordHash,
    },
  });

  console.log(`[seed] Created break-glass admin ${email}. Sign in, then visit /auth/setup-totp to enable 2FA.`);
}
