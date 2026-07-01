// packages/contracts/src/blocks/photo-strip.ts

import { z } from 'zod';

export const PhotoStripItemSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

export const PhotoStripSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  photos: z.array(PhotoStripItemSchema),
});

export type PhotoStripData = z.infer<typeof PhotoStripSchema>;
