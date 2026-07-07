// packages/contracts/src/system/storage/upload.ts
//
// The upload request and upload result shapes.

import { z } from 'zod';

export const UploadRequestSchema = z.object({
  fileName: z.string(),
  fileType: z.string(),
  fileSize: z.number(),
  folder: z.enum(['images', 'documents', 'media', 'avatars']),
});

export type UploadRequestData = z.infer<typeof UploadRequestSchema>;

export const UploadResultSchema = z.object({
  key: z.string(), // R2 object key
  url: z.string(), // CDN URL
  uploadedAt: z.string(),
});

export type UploadResultData = z.infer<typeof UploadResultSchema>;
