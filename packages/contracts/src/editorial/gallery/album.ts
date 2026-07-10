// packages/contracts/src/editorial/gallery/album.ts
//
// Photo album contract.
//
// GalleryAlbumSchema     — the full entity: id, title, slug, description?,
//                          coverImage (R2 key), category?, date (ISO), photoCount, locale
// GalleryAlbumCardSchema — lighter projection for grid display (used by @nexus/ui)
//
// Notes:
//   Albums are the top-level container. Individual photos are in gallery/photo.ts.
//   Gallery page shows AlbumCard grid; clicking opens the album lightbox.

import { z } from 'zod';

import {
  MAX_TITLE_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MAX_GALLERY_IMAGES,
} from '../../constants/index.ts';
import { ImageSchema, LocaleEnum } from '../../primitives/index.ts';

export const GALLERY_ALBUM_CONTENT_TYPE = 'gallery-album';

// The full entity — CMS/admin CRUD and ContentEntry storage.
export const GalleryAlbumSchema = z.object({
  id: z.string(),
  title: z.string().max(MAX_TITLE_LENGTH),
  slug: z.string(),
  description: z.string().max(MAX_DESCRIPTION_LENGTH).optional(),
  coverImage: ImageSchema,
  category: z.string().optional(),
  date: z.string(), // ISO
  photoCount: z.number().int().nonnegative().max(MAX_GALLERY_IMAGES),
  locale: LocaleEnum,
});

export type GalleryAlbumData = z.infer<typeof GalleryAlbumSchema>;

// Card projection — matches @nexus/ui's GalleryAlbumCardProps exactly.
export const GalleryAlbumCardSchema = z.object({
  title: z.string(),
  year: z.string(),
  photoCount: z.number(),
  category: z.string().optional(),
  href: z.string(),
  coverSrc: z.string().optional(),
  coverAlt: z.string().optional(),
});

export type GalleryAlbumCardData = z.infer<typeof GalleryAlbumCardSchema>;
