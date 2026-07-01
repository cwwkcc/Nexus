// packages/contracts/src/blocks/hero.ts

import { z } from 'zod';

export const HeroSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  titleEm: z.string().optional(),
  subtitle: z.string().optional(),
});

export type HeroData = z.infer<typeof HeroSchema>;
