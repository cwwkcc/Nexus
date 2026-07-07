// packages/contracts/src/primitives/localized-text.ts
//
// Field-level locale scoping for short translatable strings.

import { z } from 'zod';

export const LocalizedTextSchema = z.object({
  en: z.string(),
  si: z.string(),
  ta: z.string(),
});

export type LocalizedTextData = z.infer<typeof LocalizedTextSchema>;
