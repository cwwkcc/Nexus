// apps/admin/src/lib/gallery.ts
//
// AdminGalleryAlbum is inferred directly from the real router output, the
// same convention every other admin module's lib file uses.

import type { AppRouter } from '@nexus/api';
import type { inferRouterOutputs } from '@trpc/server';

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type AdminGalleryAlbum = RouterOutputs['gallery']['adminList'][number];
export type AdminGalleryAlbumDetail = RouterOutputs['gallery']['adminGetById'];
export type AdminGalleryPhoto = AdminGalleryAlbumDetail['photos'][number];

/** Same normalization events.ts's/societies.ts's own slugify uses. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Identical semantics to staff.ts's own moveStaffId — reused here under
 * a gallery-specific name rather than imported cross-module, matching
 * this codebase's established per-module-copy convention (see
 * lib/events.ts's own note on why). Moves `id` to `targetIndex` within
 * `ids`, clamping out-of-range targets and no-op'ing for an absent id. */
export function moveAlbumId(ids: string[], id: string, targetIndex: number): string[] {
  const currentIndex = ids.indexOf(id);
  if (currentIndex === -1) {
    return ids;
  }

  const next = ids.filter((existing) => existing !== id);
  const clampedIndex = Math.max(0, Math.min(targetIndex, next.length));
  next.splice(clampedIndex, 0, id);
  return next;
}
