// packages/contracts/src/editorial/gallery/photo.ts
//
// Individual photo within an album.
//
// Notes:
//   src is an R2 key resolved to a CDN URL at render time.
//   order determines display sequence within the album lightbox.

import { z } from 'zod';

export const GALLERY_PHOTO_CONTENT_TYPE = 'gallery-photo';

export const PhotoSchema = z.object({
  id: z.string().min(1),
  albumId: z.string().min(1),
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().optional(),
  takenAt: z.string().optional(),
  order: z.number().int().nonnegative(),
});

export type PhotoData = z.infer<typeof PhotoSchema>;
