// packages/contracts/src/core/api/media.ts

import { z } from 'zod';

export const RequestUploadUrlInput = z.object({
  fileName: z.string(),
  contentType: z.string(),
  folder: z.enum(['images', 'documents', 'media', 'avatars']),
});

export const RequestUploadUrlOutput = z.object({
  uploadUrl: z.string(),
  key: z.string(),
  expiresAt: z.string(),
});

export const ConfirmUploadInput = z.object({
  key: z.string(),
  title: z.string().optional(),
  altText: z.string().optional(),
});

export const MediaAssetOutput = z.object({
  key: z.string(),
  url: z.string(),
  contentType: z.string(),
  size: z.number(),
  title: z.string().optional(),
  altText: z.string().optional(),
  uploadedAt: z.string(),
});
