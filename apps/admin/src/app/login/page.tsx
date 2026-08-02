// Admin Login Page (F-063)
//
// Google Workspace sign-in (F-073), restricted to @cwwkcc.lk, lands in M1b
// as the primary path for most admins and will be added above this form.
// Today this is the only way in: the break-glass account (F-064/F-078),
// gated by password and — once enrolled via /auth/setup-totp — a TOTP or
// backup code (F-080).
'use client';

import { Button, Container, FormErrorMessage, FormFieldGroup, Heading, Input, Text } from '@nexus/ui';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await signIn('break-glass', {
      email,
      password,
      totpCode,
      redirect: false,
    });

    setSubmitting(false);

    if (!result || result.error) {
      // Deliberately generic — never discloses whether it was the
      // password or the authenticator code that was wrong. This is a
      // standing target for credential-stuffing attempts, not a form to
      // help someone debug their login.
      setError('Incorrect email, password, or authenticator code.');
      return;
    }

    router.push('/');
    router.refresh();
  }

  return (
    <Container size="sm" padding="lg" className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-8 rounded-3xl border border-border-default bg-surface-elevated p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <Heading level="h1">Nexus Admin</Heading>
          <Text color="muted">C.W.W. Kannangara Central College</Text>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <FormFieldGroup>
            <Input label="Email" type="email" name="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={submitting} />
            <Input label="Password" type="password" name="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={submitting} />
            <Input label="Authenticator code" type="text" name="totpCode" autoComplete="one-time-code" helperText="Leave blank if you haven't set up an authenticator yet." value={totpCode} onChange={(e) => setTotpCode(e.target.value)} disabled={submitting} />
          </FormFieldGroup>

          {error && <FormErrorMessage>{error}</FormErrorMessage>}

          <Button type="submit" fullWidth loading={submitting} loadingText="Signing in…">
            Sign in
          </Button>
        </form>
      </div>
    </Container>
  );
}
