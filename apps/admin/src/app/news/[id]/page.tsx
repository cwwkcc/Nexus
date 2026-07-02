// Edit News Article form (F-150)
// Same form as /news/new, pre-populated. Status workflow: draft → review → published → archived.
// Version history sidebar (F-163).

import { AdminPlaceholder } from '@/features/shell/AdminPlaceholder';

export default function Page() {
  return <AdminPlaceholder title="news / :id" />;
}
