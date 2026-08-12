// apps/admin/src/lib/announcements.ts
//
// AdminAnnouncement is inferred directly from the real router output, the
// same convention every other admin module's lib file uses.

import type { AppRouter } from '@nexus/api';
import type { inferRouterOutputs } from '@trpc/server';

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type AdminAnnouncement = RouterOutputs['announcements']['adminList'][number];

export const VARIANT_LABELS: Record<string, string> = {
  info: 'Info',
  warning: 'Warning',
  error: 'Error',
};

export function variantLabel(variant: string): string {
  return VARIANT_LABELS[variant] ?? variant;
}

/**
 * `<input type="datetime-local">` uses local time with no timezone
 * suffix ("2026-09-01T14:30"), while the API's `publishAt`/`expiresAt`
 * are full ISO instants. Converts one to the other at the form boundary
 * — kept as pure, independently testable functions rather than inlined
 * into the form component, since a timezone conversion bug here is
 * exactly the kind of thing that's easy to get subtly wrong and hard to
 * notice in a manual click-through.
 */
export function toDateTimeLocalValue(isoString: string): string {
  const date = new Date(isoString);
  const offsetMs = date.getTimezoneOffset() * 60_000;
  const local = new Date(date.getTime() - offsetMs);
  return local.toISOString().slice(0, 16);
}

export function fromDateTimeLocalValue(value: string): string {
  return new Date(value).toISOString();
}

/** Human status label for the admin list — active now / scheduled /
 * expired / deactivated. Mirrors service.ts's own isCurrentlyVisible
 * logic on the read side, but the server's own `isCurrentlyVisible` field
 * is the source of truth for "is it visible right now"; this just adds
 * the finer-grained *why not* for display. */
export function statusLabel(announcement: Pick<AdminAnnouncement, 'isActive' | 'isCurrentlyVisible' | 'publishAt' | 'expiresAt'>): string {
  if (announcement.isCurrentlyVisible) return 'Active now';
  if (!announcement.isActive) return 'Deactivated';
  if (new Date(announcement.publishAt) > new Date()) return 'Scheduled';
  if (announcement.expiresAt && new Date(announcement.expiresAt) <= new Date()) return 'Expired';
  return 'Inactive';
}
