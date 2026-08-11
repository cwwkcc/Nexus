// apps/admin/src/app/gallery/new/page.tsx
//
// F-168 create form.

import { AlbumForm } from '../AlbumForm.js';
import { AdminShell } from '../../../features/shell/AdminShell.js';

export default function NewAlbumPage() {
  return (
    <AdminShell title="New album">
      <AlbumForm mode="create" />
    </AdminShell>
  );
}
