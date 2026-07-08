// packages/contracts/src/blocks/page-specific/gallery.ts
// Defines the schema for gallery blocks and their image items.

import { z } from 'zod';

import { GALLERY_BLOCK } from '../block-type.js';

export const GalleryImageSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

export const GallerySchema = z.object({
  blockType: z.literal(GALLERY_BLOCK),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  images: z.array(GalleryImageSchema),
});

export type GalleryData = z.infer<typeof GallerySchema>;
export type GalleryImage = z.infer<typeof GalleryImageSchema>;
