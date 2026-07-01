// packages/contracts/src/blocks/rich-text.ts

import { z } from 'zod';

export const RichTextSchema = z.object({
  content: z.string(),
});
export type RichTextData = z.infer<typeof RichTextSchema>;
