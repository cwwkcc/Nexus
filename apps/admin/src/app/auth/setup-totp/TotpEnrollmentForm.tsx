// TOTP Setup Page for the break-glass account (F-066/F-080)
//
// Renders a QR code for standard authenticator apps and, once confirmed,
// 10 single-use backup codes. Not linked from any navigation — reached
// directly at /auth/setup-totp by whoever is provisioning the break-glass
// account, immediately after the seed script creates it.

import { Container, Heading, Text } from '@nexus/ui';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { db, totpKeyUri, totpQrCodeDataUrl, generateTotpSecret } from '@nexus/db';

import { TotpEnrollmentForm } from './TotpEnrollmentForm';

export const dynamic = 'force-dynamic';

export default async function SetupTotpPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { email: true, totpEnabledAt: true },
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <Container size="sm" padding="lg" className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-lg shadow-slate-950/30">
        <div className="space-y-2 text-center">
          <Heading level="h1">Set up an authenticator</Heading>
          <Text color="muted">{user.email}</Text>
        </div>

        {user.totpEnabledAt ? (
          <Text color="muted" className="text-center">
            An authenticator is already set up for this account.
          </Text>
        ) : (
          <EnrollmentSetup email={user.email} />
        )}
      </div>
    </Container>
  );
}

async function EnrollmentSetup({ email }: { email: string }) {
  // Generated fresh on every render of this branch and only persisted by
  // the confirmTotpSetup server action once the user proves they scanned
  // it correctly — see actions.ts. Reloading this page before confirming
  // simply issues a new secret; nothing is left half-configured.
  const secret = generateTotpSecret();
  const keyUri = totpKeyUri(email, secret);
  const qrDataUrl = await totpQrCodeDataUrl(keyUri);

  return <TotpEnrollmentForm secret={secret} qrDataUrl={qrDataUrl} email={email} />;
}
