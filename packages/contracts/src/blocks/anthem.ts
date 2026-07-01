// packages/contracts/src/blocks/anthem.ts

import { z } from 'zod';

export const AnthemSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string(),
  paragraph: z.string().optional(),
  anthemSrc: z.string(),
  playerTitle: z.string(),
  playerSubtitle: z.string().optional(),
  lyricsSinhala: z.string().optional(),
});
export type AnthemData = z.infer<typeof AnthemSchema>;
