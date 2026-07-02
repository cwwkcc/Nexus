// Settings Module (F-161)
// School name, address, contact, social URLs, founding year, motto.
// Propagates everywhere (footer, JSON-LD, metadata) without a code deploy.

import { AdminPlaceholder } from '@/features/shell/AdminPlaceholder';

export default function Page() {
  return <AdminPlaceholder title="settings" />;
}
