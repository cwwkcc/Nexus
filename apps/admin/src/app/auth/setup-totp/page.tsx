// TOTP Setup Page for break-glass account (F-066)
// Renders QR code for standard authenticator apps.
// Generates 10 single-use backup codes. Not linked from any navigation.

import { AdminPlaceholder } from '@/features/shell/AdminPlaceholder';

export default function Page() {
  return <AdminPlaceholder title="auth / setup-totp" />;
}
