'use server';

// apps/admin/src/app/auth/setup-totp/actions.ts
//
// TOTP enrollment confirmation (F-066/F-080). The secret is generated and
// shown to the user by the page component but deliberately NOT persisted
// until they prove they scanned it correctly — this action re-verifies the
// submitted code against the still-unsaved secret and only writes anything
// to the database once that check passes. Abandoning the page mid-setup
// therefore leaves no half-configured TOTP state behind.

import { db, generateBackupCodes, verifyTotpToken } from '@nexus/db';

import { auth } from '@/lib/auth';

export interface ConfirmTotpSetupResult {
  ok: boolean;
  error?: string;
  backupCodes?: string[];
}

export async function confirmTotpSetup(secret: string, code: string): Promise<ConfirmTotpSetupResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, error: 'Your session has expired — sign in again and retry.' };
  }

  const trimmedCode = code.trim();
  if (!trimmedCode || !(await verifyTotpToken(trimmedCode, secret))) {
    return { ok: false, error: 'That code did not match. Check the time on your device and try again.' };
  }

  const user = await db.user.findUnique({ where: { id: session.user.id }, select: { totpEnabledAt: true } });
  if (user?.totpEnabledAt) {
    // Already enrolled by the time this ran (e.g. a second tab finished
    // first) — nothing further to do, and definitely don't overwrite it.
    return { ok: false, error: 'An authenticator is already set up for this account.' };
  }

  const { plaintextCodes, hashedCodes } = await generateBackupCodes();

  await db.$transaction([
    db.user.update({
      where: { id: session.user.id },
      data: { totpSecret: secret, totpEnabledAt: new Date() },
    }),
    db.backupCode.createMany({
      data: hashedCodes.map((codeHash) => ({ userId: session.user.id, codeHash })),
    }),
  ]);

  return { ok: true, backupCodes: plaintextCodes };
}
