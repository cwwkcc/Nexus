// packages/contracts/src/blocks/gallery.ts

import { z } from 'zod';

export const GalleryImageSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

export const GallerySchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  images: z.array(GalleryImageSchema),
});

export type GalleryData = z.infer<typeof GallerySchema>;
export type GalleryImage = z.infer<typeof GalleryImageSchema>;
