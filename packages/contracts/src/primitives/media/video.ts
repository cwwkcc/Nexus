// packages/contracts/src/primitives/media/video.ts
//
// Video media reference for R2-stored video files.

import { z } from 'zod';

export const VideoSchema = z.object({
  src: z.string(), // R2 key
  poster: z.string().optional(), // R2 key
  title: z.string().optional(),
  duration: z.number().optional(), // seconds
});

export type VideoData = z.infer<typeof VideoSchema>;
