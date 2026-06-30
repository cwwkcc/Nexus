// packages/contracts/src/blocks/anthem.ts
//
// Note: rewritten to match the real field names already used by
// apps/web/src/blocks/about/SchoolAnthem.tsx (anthemSrc/playerTitle, not
// the originally-planned audioSrc/audioTitle).
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
