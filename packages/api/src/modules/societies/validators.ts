// packages/api/src/modules/societies/validators.ts
//
// Task 7.6/F-167. Mirrors modules/news/validators.ts and
// modules/events/validators.ts's layering — the full, persisted `Society`
// entity lives here, not in @nexus/contracts (which only keeps the
// display projection `SocietyCardSchema` and the category taxonomy — see
// domains/societies/society-profile.ts's header comment).
//
// Deliberately unpaginated list, matching modules/staff/validators.ts's
// own precedent, not modules/events/validators.ts's: a school's roster of
// societies is a small, bounded set (a handful to a few dozen), the same
// order of magnitude as its staff roster, not an ever-growing archive
// like news articles or calendar entries.

import { AvatarSchema, LocaleEnum, SocietyCategoryEnum } from '@nexus/contracts';
import { z } from 'zod';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const SocietyFields = {
  locale: LocaleEnum,
  slug: z.string().trim().min(1).max(200).regex(SLUG_PATTERN, 'Slug must be lowercase, alphanumeric, and hyphen-separated (e.g. "science-society").'),
  name: z.string().trim().min(1).max(160),
  tagline: z.string().trim().max(200).optional().nullable(),
  category: SocietyCategoryEnum,
  foundingYear: z.string().trim().max(20).optional().nullable(),
  description: z.string().trim().max(4000).optional().nullable(),
  meetingSchedule: z.string().trim().max(200).optional().nullable(),
  memberCount: z.number().int().nonnegative().max(10000).optional().nullable(),
  howToJoin: z.string().trim().max(2000).optional().nullable(),
  // Full CDN URLs (an already-uploaded MediaAsset's `.url`), matching
  // StaffCreateInput.portraitUrl's established convention.
  logoUrl: z.string().url().optional().nullable(),
  logoAlt: z.string().trim().max(200).optional().nullable(),
  bannerUrl: z.string().url().optional().nullable(),
  bannerAlt: z.string().trim().max(200).optional().nullable(),
  isFeatured: z.boolean().default(false),
  // F-148's advisor StaffCard. Nullable — see schema.prisma's Society
  // model doc comment on why an advisor is optional and SetNull, not a
  // required relation.
  advisorStaffId: z.string().trim().min(1).optional().nullable(),
};

/** Always inserts. Rejects an `id` outright rather than silently updating. */
export const SocietyCreateInput = z.object({
  ...SocietyFields,
});

/** Always targets an existing row by `id`; service.ts throws NOT_FOUND
 * (P2025) if it's missing rather than inserting a duplicate. */
export const SocietyUpdateInput = z.object({
  id: z.string().min(1),
  ...SocietyFields,
});

export const SocietyOutput = z.object({
  id: z.string(),
  locale: LocaleEnum,
  slug: z.string(),
  name: z.string(),
  tagline: z.string().nullable(),
  category: SocietyCategoryEnum,
  foundingYear: z.string().nullable(),
  description: z.string().nullable(),
  meetingSchedule: z.string().nullable(),
  memberCount: z.number().int().nullable(),
  howToJoin: z.string().nullable(),
  logo: AvatarSchema.nullable(),
  banner: AvatarSchema.nullable(),
  isFeatured: z.boolean(),
  advisorStaffId: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const SocietyListOutput = z.array(SocietyOutput);

/** Public — F-147 Societies Hub. Also what `[locale]/societies/[slug]`'s
 * `generateStaticParams` calls (unfiltered) to enumerate every slug to
 * pre-render, the same role modules/news/validators.ts's own unfiltered
 * `list` call plays for News's static generation. */
export const SocietyListInput = z.object({
  locale: LocaleEnum,
  category: z
    .union([SocietyCategoryEnum, z.literal('all')])
    .optional()
    .default('all'),
});

export const SocietyBySlugInput = z.object({
  locale: LocaleEnum,
  slug: z.string().min(1),
});

export const SocietyGetByIdInput = z.object({
  id: z.string().min(1),
});

/** Admin list — same query shape as the public one plus a text search,
 * deliberately unpaginated (see this file's header comment). */
export const SocietyAdminListInput = z.object({
  locale: LocaleEnum,
  category: z
    .union([SocietyCategoryEnum, z.literal('all')])
    .optional()
    .default('all'),
  query: z.string().trim().max(200).optional(),
});

export const SocietyDeleteInput = z.object({
  id: z.string().min(1),
});
