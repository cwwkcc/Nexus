'use client';

import { Button, Input, Text } from '@nexus/ui';
import { useState } from 'react';

import { confirmTotpSetup } from './actions';

interface TotpEnrollmentFormProps {
  secret: string;
  qrDataUrl: string;
  email: string;
}

export function TotpEnrollmentForm({ secret, qrDataUrl, email }: TotpEnrollmentFormProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await confirmTotpSetup(secret, code);
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.error ?? 'Unable to complete setup.');
      return;
    }

    if (result.backupCodes?.length) {
      setBackupCodes(result.backupCodes);
    }
  }

  if (backupCodes.length > 0) {
    return (
      <div className="space-y-4">
        <Text color="muted">Authenticator setup complete for {email}. Save these backup codes in a safe place.</Text>
        <ul className="grid gap-2 rounded-2xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-200">
          {backupCodes.map((item) => (
            <li key={item} className="font-mono text-xs">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
        <img src={qrDataUrl} alt="QR code for authenticator app" className="mx-auto h-44 w-44 rounded-xl bg-white p-2" />
      </div>

      <div className="space-y-2 text-sm text-slate-300">
        <p>Scan this code with your authenticator app and enter the 6-digit verification code below.</p>
        <p className="font-mono text-xs text-slate-500">Secret: {secret}</p>
      </div>

      <Input label="Verification code" name="totpCode" value={code} onChange={(event) => setCode(event.target.value)} placeholder="123456" autoComplete="one-time-code" inputMode="numeric" />

      {error ? (
        <Text color="error" className="text-sm">
          {error}
        </Text>
      ) : null}

      <Button type="submit" variant="primary" disabled={isSubmitting || code.length < 6} className="w-full">
        {isSubmitting ? 'Verifying…' : 'Complete setup'}
      </Button>
    </form>
  );
}

export default TotpEnrollmentForm;
