// packages/api/src/modules/gallery/validators.ts
//
// Task 7.7/F-168. Mirrors modules/societies/validators.ts's layering —
// the full, persisted `GalleryAlbum`/`GalleryPhoto` entities live here,
// not in @nexus/contracts (see editorial/gallery/album.ts's header
// comment).
//
// Photos are modeled as a single authoritative array on the album's own
// create/update input, not as separate per-photo mutations
// (addPhoto/removePhoto/reorderPhoto endpoints) — a photo has no
// independent lifecycle outside its album (F-168's whole admin flow is
// "batch upload into an album, set alt text, save"), so
// service.ts's updateAlbum reconciles the submitted array against what's
// in the database in one transaction: photos with a matching `id` are
// updated in place, photos without an `id` are new (batch-uploaded since
// the form was opened) and get created, and any existing photo *not*
// present in the submitted array was removed by the editor and gets
// deleted. This keeps the whole photo-management UI working off one
// piece of form state instead of juggling several small mutations against
// a list that can change shape mid-edit.

import { LocaleEnum, MAX_GALLERY_IMAGES } from '@nexus/contracts';
import { z } from 'zod';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CURRENT_YEAR = new Date().getFullYear();

/** `id` present = update that existing photo; absent = a new one
 * (typically just batch-uploaded) to create. */
export const GalleryPhotoFields = z.object({
  id: z.string().optional(),
  src: z.string().url(),
  // Required — F-168: "Per-photo alt text | Required — accessibility
  // compliance." No `.optional()` here, unlike every other alt-text
  // field in this codebase.
  alt: z.string().trim().min(1).max(300),
  caption: z.string().trim().max(500).optional().nullable(),
});

const GalleryAlbumFields = {
  locale: LocaleEnum,
  slug: z.string().trim().min(1).max(200).regex(SLUG_PATTERN, 'Slug must be lowercase, alphanumeric, and hyphen-separated (e.g. "sports-day-2026").'),
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().max(2000).optional().nullable(),
  category: z.string().trim().max(60).optional().nullable(),
  year: z
    .number()
    .int()
    .min(1900)
    .max(CURRENT_YEAR + 1),
  coverPhotoUrl: z.string().url().optional().nullable(),
  coverPhotoAlt: z.string().trim().max(300).optional().nullable(),
  order: z.number().int().default(0),
  photos: z.array(GalleryPhotoFields).max(MAX_GALLERY_IMAGES),
};

/** Always inserts. Rejects an `id` outright rather than silently updating. */
export const GalleryAlbumCreateInput = z.object({
  ...GalleryAlbumFields,
});

/** Always targets an existing row by `id`; service.ts throws NOT_FOUND
 * (P2025) if it's missing rather than inserting a duplicate. */
export const GalleryAlbumUpdateInput = z.object({
  id: z.string().min(1),
  ...GalleryAlbumFields,
});

export const GalleryPhotoOutput = z.object({
  id: z.string(),
  albumId: z.string(),
  src: z.string(),
  alt: z.string(),
  caption: z.string().nullable(),
  order: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const GalleryAlbumBaseOutput = {
  id: z.string(),
  locale: LocaleEnum,
  slug: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  category: z.string().nullable(),
  year: z.number().int(),
  coverPhoto: z.object({ src: z.string(), alt: z.string() }).nullable(),
  order: z.number().int(),
  photoCount: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
};

/** Lightweight — public Hub listing (F-151) and admin list. No `photos`
 * array; `photoCount` (matching GalleryAlbumCardSchema's own field) is
 * all either surface needs. */
export const GalleryAlbumSummaryOutput = z.object(GalleryAlbumBaseOutput);

/** Full — individual album page (F-152) and the admin edit form, both of
 * which need every photo. */
export const GalleryAlbumOutput = z.object({
  ...GalleryAlbumBaseOutput,
  photos: z.array(GalleryPhotoOutput),
});

export const GalleryAlbumListOutput = z.array(GalleryAlbumSummaryOutput);

/** Public — F-151 Gallery listing, and `[slug]/page.tsx`'s
 * `generateStaticParams` (unfiltered) for F-112's static generation. */
export const GalleryAlbumListInput = z.object({
  locale: LocaleEnum,
  year: z.number().int().optional(),
  category: z.string().optional(),
});

export const GalleryAlbumBySlugInput = z.object({
  locale: LocaleEnum,
  slug: z.string().min(1),
});

export const GalleryAlbumGetByIdInput = z.object({
  id: z.string().min(1),
});

/** Admin list — same query shape as the public one plus a text search,
 * deliberately unpaginated, matching modules/societies/validators.ts's
 * own precedent (a school's gallery is a bounded, curated set of albums,
 * not an ever-growing per-visitor archive). */
export const GalleryAlbumAdminListInput = z.object({
  locale: LocaleEnum,
  year: z.number().int().optional(),
  category: z.string().optional(),
  query: z.string().trim().max(200).optional(),
});

export const GalleryAlbumDeleteInput = z.object({
  id: z.string().min(1),
});

/** F-168 drag-and-drop album reordering — same shape as
 * modules/staff/validators.ts's StaffReorderInput. */
export const GalleryAlbumReorderInput = z.object({
  locale: LocaleEnum,
  orderedIds: z.array(z.string().min(1)).min(1),
});
