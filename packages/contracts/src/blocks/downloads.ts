// packages/contracts/src/blocks/downloads.ts

import { z } from 'zod';

export const DownloadItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  href: z.string(),
  fileType: z.enum(['PDF', 'DOCX', 'XLSX', 'PPT', 'ZIP']).optional(),
  fileSize: z.string().optional(),
});

export const DownloadsSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  items: z.array(DownloadItemSchema),
});

export type DownloadsData = z.infer<typeof DownloadsSchema>;
export type DownloadItem = z.infer<typeof DownloadItemSchema>;
