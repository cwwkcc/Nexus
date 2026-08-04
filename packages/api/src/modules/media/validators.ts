// packages/api/src/modules/media/validators.ts
//
// Reuses @nexus/contracts' existing presigned-upload contracts
// (UploadRequestSchema/UploadFolderEnum/ObjectKeySchema, system/storage/)
// rather than re-declaring them — those were built for exactly this flow
// (F-067) and this is their first real consumer. UploadResultSchema
// (key/url/uploadedAt) is *not* reused for the router's output: a
// MediaAsset carries several more fields (id, dimensions, alt text, tags,
// uploader) than that generic shape covers, so MediaAssetOutput below is a
// module-specific superset, the same relationship NewsArticleOutput has to
// the generic primitives it composes rather than replaces.

import { DEFAULT_UPLOAD_LIMIT, ObjectKeySchema, PageInputSchema, PaginationMetaSchema, UploadFolderEnum, UploadRequestSchema } from '@nexus/contracts';
import { z } from 'zod';

export { UploadFolderEnum };

export const MediaListInput = PageInputSchema.extend({
  folder: z
    .union([UploadFolderEnum, z.literal('all')])
    .optional()
    .default('all'),
  query: z.string().trim().max(200).optional(),
});

export const MediaAssetOutput = z.object({
  id: z.string(),
  key: ObjectKeySchema,
  url: z.string().url(),
  fileName: z.string(),
  mimeType: z.string(),
  fileSize: z.number().int().nonnegative(),
  folder: UploadFolderEnum,
  width: z.number().int().positive().nullable(),
  height: z.number().int().positive().nullable(),
  altText: z.string().nullable(),
  caption: z.string().nullable(),
  tags: z.array(z.string()),
  uploadedBy: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const MediaListOutput = z.object({
  items: z.array(MediaAssetOutput),
  pagination: PaginationMetaSchema,
});

export const MediaGetByIdInput = z.object({
  id: z.string().min(1),
});

/** Request a presigned PUT URL — the input is exactly @nexus/contracts' UploadRequestSchema. */
export const MediaRequestUploadInput = UploadRequestSchema;

export const MediaRequestUploadOutput = z.object({
  uploadUrl: z.string().url(),
  /** The `tmp/`-prefixed staging key the browser PUTs to — passed back into confirmUpload once the PUT succeeds. */
  stagingKey: ObjectKeySchema,
  expiresAt: z.string(),
});

/**
 * Confirms a completed presigned-PUT upload and registers the asset
 * (F-067's second step). `fileSize` is re-validated here against the same
 * limit as the original request — the presigned URL only constrains
 * *content type*, not size, so a client could in principle PUT more bytes
 * than it originally declared; re-checking the declared size here doesn't
 * catch that (only R2's own object metadata would), but it does stop a
 * confirm call whose declared size was never valid in the first place.
 */
export const MediaConfirmUploadInput = z.object({
  stagingKey: ObjectKeySchema,
  fileName: z.string().trim().min(1).max(255),
  mimeType: z.string().trim().min(1),
  fileSize: z.number().int().positive().max(DEFAULT_UPLOAD_LIMIT),
  folder: UploadFolderEnum,
  altText: z.string().trim().max(300).optional().nullable(),
  caption: z.string().trim().max(300).optional().nullable(),
  tags: z.array(z.string().trim().min(1).max(50)).max(20).optional().default([]),
});

export const MediaUpdateInput = z.object({
  id: z.string().min(1),
  altText: z.string().trim().max(300).optional().nullable(),
  caption: z.string().trim().max(300).optional().nullable(),
  tags: z.array(z.string().trim().min(1).max(50)).max(20).optional(),
});

export const MediaDeleteInput = z.object({
  id: z.string().min(1),
});

export const MediaBulkDeleteInput = z.object({
  ids: z.array(z.string().min(1)).min(1).max(100),
});

/** F-169's "bulk delete with usage warning" — the client calls this before showing the confirmation dialog. */
export const MediaUsageInput = z.object({
  id: z.string().min(1),
});

export const MediaUsageOutput = z.object({
  count: z.number().int().nonnegative(),
  articles: z.array(z.object({ id: z.string(), title: z.string() })),
});
