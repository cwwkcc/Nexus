// packages/api/src/modules/announcements/validators.ts
//
// Task 6.10/7.13, F-172. Resolves the Completion Plan's own open question
// ("may ride on SiteSetting or need its own model") — see schema.prisma's
// Announcement model doc comment for the full reasoning; this is a real
// entity, following the same layering as every other M4 module (full
// entity here, not in @nexus/contracts — there's no card/display
// projection to keep in contracts this time, since a banner has no
// individual page or card representation the way News/Events/Societies/
// Gallery all do).
//
// `variant` is AnnouncementBanner's own three-value union (@nexus/ui),
// not the four-value one on the unrelated page-embeddable
// `AnnouncementSchema` content block — see schema.prisma's own note on
// why those are two different things.

import { LocaleEnum } from '@nexus/contracts';
import { z } from 'zod';

export const AnnouncementVariantInput = z.enum(['info', 'warning', 'error']);

const AnnouncementFields = {
  locale: LocaleEnum,
  variant: AnnouncementVariantInput.default('info'),
  message: z.string().trim().min(1).max(500),
  // Independently optional — not a both-or-neither pair. A lone label
  // with no href, or a lone href with no label, simply doesn't render as
  // a link (see service.ts's serialize) rather than being rejected
  // outright; keeping the validation simple was judged a better trade
  // than a cross-field refinement for a field this minor.
  linkLabel: z.string().trim().max(60).optional().nullable(),
  linkHref: z.string().url().optional().nullable(),
  // ISO datetime strings — full timestamps, not date-only (contrast with
  // CalendarEntry.date's `@db.Date`): a same-day school-closure
  // announcement genuinely needs hour-level precision, not just a date.
  publishAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional().nullable(),
  isActive: z.boolean().default(true),
};

/** Always inserts. Rejects an `id` outright rather than silently updating. */
export const AnnouncementCreateInput = z.object({
  ...AnnouncementFields,
});

/** Always targets an existing row by `id`; service.ts throws NOT_FOUND
 * (P2025) if it's missing rather than inserting a duplicate. */
export const AnnouncementUpdateInput = z.object({
  id: z.string().min(1),
  ...AnnouncementFields,
});

export const AnnouncementOutput = z.object({
  id: z.string(),
  locale: LocaleEnum,
  variant: AnnouncementVariantInput,
  message: z.string(),
  linkLabel: z.string().nullable(),
  linkHref: z.string().nullable(),
  publishAt: z.string(),
  expiresAt: z.string().nullable(),
  isActive: z.boolean(),
  /** Computed, not stored — see service.ts's isCurrentlyVisible. Lets the
   * admin list show "active now" vs. "scheduled" vs. "expired" /
   * "deactivated" without the client re-deriving the same three-way
   * time comparison the server already had to make. */
  isCurrentlyVisible: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const AnnouncementListOutput = z.array(AnnouncementOutput);

/** Public — F-141's home-page banner slot and F-031's "every page" banner
 * (see apps/web/src/app/[locale]/layout.tsx's own wiring). At most one
 * announcement: F-172 calls this "deliberately simple — not a full
 * notification platform," so the site shows its single most urgent
 * currently-visible announcement (error > warning > info, then most
 * recently published), not a stack of them. */
export const ActiveAnnouncementInput = z.object({
  locale: LocaleEnum,
});

/** Admin list — deliberately unpaginated, matching
 * modules/societies/validators.ts's/modules/gallery/validators.ts's own
 * precedent: a school's announcement history is a small, naturally
 * self-limiting set (nobody keeps thousands of banner announcements
 * around), not an ever-growing archive like news or calendar entries. */
export const AnnouncementAdminListInput = z.object({
  locale: LocaleEnum,
});

export const AnnouncementGetByIdInput = z.object({
  id: z.string().min(1),
});

export const AnnouncementDeleteInput = z.object({
  id: z.string().min(1),
});

/** F-172's explicit "Deactivate" action — a single-click list action
 * distinct from the full edit form, same reasoning
 * modules/staff/router.ts's dedicated `reorder` mutation has for not
 * overloading the general `update`. */
export const AnnouncementDeactivateInput = z.object({
  id: z.string().min(1),
});
