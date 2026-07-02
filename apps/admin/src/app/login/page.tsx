// Admin Login Page (F-063)
// "Sign in with Google" button restricted to @cwwkcc.lk domain.
// Separate break-glass path (F-064) deliberately unadvertised.
// Shows domain rejection message — not a generic error — for outside accounts.

import { AdminPlaceholder } from '@/features/shell/AdminPlaceholder';

export default function Page() {
  return <AdminPlaceholder title="login" />;
}
