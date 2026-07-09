// packages/contracts/src/content/media.ts
//
// Media contracts.
//
// Should contain:
//   LightboxImageSchema — src, alt, caption?
//   LightboxImageData   — z.infer type
//   VideoSource        — z.enum(['youtube','vimeo','direct'])

import { z } from 'zod';

import { ImageSchema } from '../primitives/index.ts';

export const LightboxImageSchema = ImageSchema.pick({
  src: true,
  alt: true,
  caption: true,
});

export type LightboxImageData = z.infer<typeof LightboxImageSchema>;

export const VideoSource = z.enum(['youtube', 'vimeo', 'direct']);
export type VideoSourceType = z.infer<typeof VideoSource>;

// Runtime enum values for comparisons
export const VideoSourceValues = VideoSource.enum;
