// packages/api/src/modules/extracurriculars/validators.ts
//
// Task 7.17/F-179. Mirrors modules/societies/validators.ts's layering —
// the full, persisted `ExtracurricularActivity`/`ExtracurricularAchievement`
// entities live here, not in @nexus/contracts (which only keeps the
// display projection `ActivitySchema` and the category taxonomy — see
// domains/extracurriculars/activity.ts's header comment).
//
// Achievements are modeled as a single authoritative array on the
// activity's own create/update input, not as separate per-achievement
// mutations — an achievement has no independent lifecycle outside its
// activity, the exact same reasoning modules/gallery/validators.ts's own
// header comment gives for GalleryAlbum.photos (which this mirrors
// closely). service.ts's createActivity/updateActivity reconcile the
// submitted array against what's in the database in one transaction:
// achievements with a matching `id` are updated in place, achievements
// without an `id` are new and get created, and any existing achievement
// *not* present in the submitted array was removed by the editor and gets
// deleted.
//
// Deliberately unpaginated list, matching modules/societies/validators.ts's
// own precedent: a school's extracurriculars roster is a small, bounded
// set, the same order of magnitude as its societies or staff roster, not
// an ever-growing archive like news articles or calendar entries.

import { AchievementLevel, ExtracurricularCategoryEnum, LocaleEnum, MAX_ACTIVITY_ACHIEVEMENTS } from '@nexus/contracts';
import { z } from 'zod';

/** `id` present = update that existing achievement; absent = a new one to
 * create. `date` travels the wire as a plain `YYYY-MM-DD` string (an
 * admin `<input type="date">`'s native format) and is parsed to a
 * `DateTime @db.Date` at the service layer — see service.ts's
 * `achievementWriteData`. */
export const ExtracurricularAchievementFields = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(1000).optional().nullable(),
  level: AchievementLevel,
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format.'),
  awardedBy: z.string().trim().max(200).optional().nullable(),
});

const ExtracurricularActivityFields = {
  locale: LocaleEnum,
  name: z.string().trim().min(1).max(160),
  category: ExtracurricularCategoryEnum,
  description: z.string().trim().min(1).max(4000),
  studentQuote: z.string().trim().max(500).optional().nullable(),
  season: z.string().trim().max(100).optional().nullable(),
  // F-179's "coach/advisor via staff selection" — same nullable-FK
  // convention as SocietyCreateInput.advisorStaffId.
  coachStaffId: z.string().trim().min(1).optional().nullable(),
  // Full CDN URLs (an already-uploaded MediaAsset's `.url`), matching
  // SocietyCreateInput.logoUrl's established convention.
  photoUrl: z.string().url().optional().nullable(),
  photoAlt: z.string().trim().max(300).optional().nullable(),
  isActive: z.boolean().default(true),
  achievements: z.array(ExtracurricularAchievementFields).max(MAX_ACTIVITY_ACHIEVEMENTS),
};

/** Always inserts. Rejects an `id` outright rather than silently updating. */
export const ExtracurricularActivityCreateInput = z.object({
  ...ExtracurricularActivityFields,
});

/** Always targets an existing row by `id`; service.ts throws NOT_FOUND
 * (P2025) if it's missing rather than inserting a duplicate. */
export const ExtracurricularActivityUpdateInput = z.object({
  id: z.string().min(1),
  ...ExtracurricularActivityFields,
});

export const ExtracurricularAchievementOutput = z.object({
  id: z.string(),
  activityId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  level: AchievementLevel,
  date: z.string(), // YYYY-MM-DD
  awardedBy: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const ExtracurricularActivityBaseOutput = {
  id: z.string(),
  locale: LocaleEnum,
  name: z.string(),
  category: ExtracurricularCategoryEnum,
  description: z.string(),
  studentQuote: z.string().nullable(),
  season: z.string().nullable(),
  coachStaffId: z.string().nullable(),
  photo: z.object({ src: z.string(), alt: z.string() }).nullable(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
};

/** Full — the only shape this module returns. Unlike GalleryAlbum's
 * summary/full split, an activity's achievement list is small (bounded by
 * MAX_ACTIVITY_ACHIEVEMENTS, realistically a handful) and every surface
 * that reads an activity — the public listing's grouped cards, the admin
 * list, the admin edit form — wants it, so there's no lighter projection
 * to bother maintaining separately. */
export const ExtracurricularActivityOutput = z.object({
  ...ExtracurricularActivityBaseOutput,
  achievements: z.array(ExtracurricularAchievementOutput),
});

export const ExtracurricularActivityListOutput = z.array(ExtracurricularActivityOutput);

/** Public — F-161 Extracurriculars page, grouped by category client-side
 * (apps/web/src/server/extracurriculars.ts). No slug/generateStaticParams
 * input here — see this module's own header comment and
 * domains/extracurriculars/activity.ts's for why there's no individual
 * route to enumerate. */
export const ExtracurricularActivityListInput = z.object({
  locale: LocaleEnum,
  category: z
    .union([ExtracurricularCategoryEnum, z.literal('all')])
    .optional()
    .default('all'),
});

export const ExtracurricularActivityGetByIdInput = z.object({
  id: z.string().min(1),
});

/** Admin list — same query shape as the public one, minus the `isActive`
 * filter (an admin needs to see retired activities to reactivate them —
 * see schema.prisma's ExtracurricularActivity doc comment), plus a text
 * search, deliberately unpaginated (see this file's header comment). */
export const ExtracurricularActivityAdminListInput = z.object({
  locale: LocaleEnum,
  category: z
    .union([ExtracurricularCategoryEnum, z.literal('all')])
    .optional()
    .default('all'),
  query: z.string().trim().max(200).optional(),
});

export const ExtracurricularActivityDeleteInput = z.object({
  id: z.string().min(1),
});
