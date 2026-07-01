// packages/contracts/src/blocks/cta.ts

import { z } from 'zod';

export const CtaSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  buttonLabel: z.string(),
  buttonHref: z.string(),
  secondaryButtonLabel: z.string().optional(),
  secondaryButtonHref: z.string().optional(),
});

export type CtaData = z.infer<typeof CtaSchema>;
