// packages/contracts/src/blocks/announcement.ts

import { z } from 'zod';

export const AnnouncementSchema = z.object({
  variant: z.enum(['info', 'warning', 'error', 'success']).default('info'),
  message: z.string(),
  linkLabel: z.string().optional(),
  linkHref: z.string().optional(),
  expiresAt: z.string().optional(),
});

export type AnnouncementData = z.infer<typeof AnnouncementSchema>;
