// packages/contracts/src/blocks/map.ts

import { z } from 'zod';

export const MapSchema = z.object({
  embedUrl: z.string(),
  title: z.string().optional(),
  height: z.number().default(400),
  caption: z.string().optional(),
});

export type MapData = z.infer<typeof MapSchema>;
