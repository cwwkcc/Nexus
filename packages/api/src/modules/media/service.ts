// packages/api/src/modules/media/service.ts
//
// All MediaAsset Prisma access, plus the R2/Sharp orchestration around it,
// lives here — router.ts validates input and calls these functions instead
// of touching ctx.db or r2-client.ts directly, mirroring
// modules/news/service.ts's split.
//
// Unlike news/content, media mutations don't call triggerRevalidation:
// a MediaAsset has no public route of its own to invalidate. Whatever
// consumes it (a NewsArticle's imageUrl today; Staff/Gallery/Events once
// M4 builds them) already revalidates its own cache tag when *it* saves,
// which is the point at which a stale image would actually become visible.
//
// The two-step upload flow (F-067):
//   1. requestUpload   — mints a `tmp/`-prefixed staging key and a
//                         presigned PUT URL. No DB row exists yet.
//   2. confirmUpload   — the browser has now PUT the raw file directly to
//                         that staging key. This step downloads it back
//                         (images only — see below), runs it through Sharp
//                         (F-115: resize, WebP, EXIF strip), writes the
//                         processed result to its final key, deletes the
//                         staging object, and only then creates the
//                         MediaAsset row.
// Non-image folders (documents, audio/video under 'media') skip Sharp
// entirely — CopyObjectCommand moves staging -> final without ever pulling
// the bytes through this Node process, then headObject reads back the real
// size/content-type R2 actually stored rather than trusting the client's
// declared numbers for what goes in the database.

import { randomUUID } from 'node:crypto';

import { Prisma, type db as Db } from '@nexus/db';
import sharp from 'sharp';
import type { z } from 'zod';

import { mediaErrors } from './errors.js';
import { copyObject, createPresignedUploadUrl, deleteObject, deleteObjects, getObjectBuffer, headObject, objectUrl, PRESIGNED_UPLOAD_EXPIRY_SECONDS, putObject, requireR2Settings, type R2Settings } from './r2-client.js';
import type { MediaBulkDeleteInput, MediaConfirmUploadInput, MediaDeleteInput, MediaGetByIdInput, MediaListInput, MediaRequestUploadInput, MediaUpdateInput, MediaUsageInput, UploadFolderEnum } from './validators.js';
import type { ApiConfig } from '../../config.js';

export type MediaListQuery = z.infer<typeof MediaListInput>;
export type MediaGetById = z.infer<typeof MediaGetByIdInput>;
export type MediaRequestUpload = z.infer<typeof MediaRequestUploadInput>;
export type MediaConfirmUpload = z.infer<typeof MediaConfirmUploadInput>;
export type MediaUpdate = z.infer<typeof MediaUpdateInput>;
export type MediaDelete = z.infer<typeof MediaDeleteInput>;
export type MediaBulkDelete = z.infer<typeof MediaBulkDeleteInput>;
export type MediaUsage = z.infer<typeof MediaUsageInput>;

type MediaAssetRow = Awaited<ReturnType<typeof Db.mediaAsset.findFirstOrThrow>>;

/** Longest dimension (px) a processed image is resized to fit within — never upscaled (F-115). 2000px comfortably covers this site's largest real slot (full-bleed hero banners) at 2x pixel density. */
const MAX_IMAGE_DIMENSION = 2000;

/** Sharp's WebP quality (0-100) — 82 is the commonly-cited sweet spot for photographic content: visually lossless at typical display sizes, meaningfully smaller than the 90+ range. */
const WEBP_QUALITY = 82;

function serialize(asset: MediaAssetRow, settings: R2Settings) {
  return {
    id: asset.id,
    key: asset.key,
    url: objectUrl(settings, asset.key),
    fileName: asset.fileName,
    mimeType: asset.mimeType,
    fileSize: asset.fileSize,
    folder: asset.folder as z.infer<typeof UploadFolderEnum>,
    width: asset.width ?? null,
    height: asset.height ?? null,
    altText: asset.altText ?? null,
    caption: asset.caption ?? null,
    tags: asset.tags,
    uploadedBy: asset.uploadedBy ?? null,
    createdAt: asset.createdAt.toISOString(),
    updatedAt: asset.updatedAt.toISOString(),
  };
}

function emptyPage(page: number, pageSize: number) {
  return {
    items: [] as ReturnType<typeof serialize>[],
    pagination: { total: 0, page, pageSize, totalPages: 1, hasNextPage: false, hasPrevPage: false },
  };
}

/** Strips everything but the characters ObjectKeySchema allows (alphanumeric, `.`, `_`, `-`) — deliberately excludes `/`, so a crafted filename can't inject extra path segments into the staging key. Keeps the tail (not the head) if truncated, so a long-but-meaningful extension survives. */
function sanitizeFileName(fileName: string): string {
  const cleaned = fileName.trim().replace(/[^a-zA-Z0-9._-]+/g, '-');
  const withoutRepeats = cleaned.replace(/-{2,}/g, '-');
  const safe = withoutRepeats.length > 0 ? withoutRepeats : 'file';
  return safe.slice(-150);
}

/** Lowercased extension without the dot, or '' if the name has none — used only for the passthrough (non-image) key, since processed images always land as `.webp` regardless of their original extension. */
function extname(fileName: string): string {
  const idx = fileName.lastIndexOf('.');
  if (idx <= 0 || idx === fileName.length - 1) return '';
  return fileName
    .slice(idx + 1)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

/** Used by `list` — like newsService.listNews, a read degrades to an empty result on DB/R2 failure rather than 500ing the admin Media Library page. */
export async function listMedia(db: typeof Db, config: ApiConfig, input: MediaListQuery) {
  const { folder, query, page, pageSize } = input;

  const where: Record<string, unknown> = {};
  if (folder && folder !== 'all') {
    where.folder = folder;
  }
  if (query && query.trim()) {
    const q = query.trim();
    where.OR = [{ fileName: { contains: q, mode: 'insensitive' } }, { altText: { contains: q, mode: 'insensitive' } }, { caption: { contains: q, mode: 'insensitive' } }, { tags: { has: q } }];
    // `tags: { has: q }` is an exact match against one tag, not a
    // substring search — Prisma's array filters don't support
    // contains-within-element. Good enough at this library's real scale;
    // a proper tag search would want a GIN index and ILIKE ANY(tags),
    // which is a bigger, separate piece of work than this module needs yet.
  }

  try {
    const settings = requireR2Settings(config);

    const [total, assets] = await Promise.all([
      db.mediaAsset.count({ where }),
      db.mediaAsset.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return {
      items: assets.map((asset) => serialize(asset, settings)),
      pagination: { total, page, pageSize, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 },
    };
  } catch (err) {
    console.error('[mediaService.listMedia] falling back to an empty page —', err);
    return emptyPage(page, pageSize);
  }
}

export async function getById(db: typeof Db, config: ApiConfig, input: MediaGetById) {
  const asset = await db.mediaAsset.findUnique({ where: { id: input.id } });
  if (!asset) {
    throw mediaErrors.notFound(input.id);
  }
  const settings = requireR2Settings(config);
  return serialize(asset, settings);
}

/** Step 1 of F-067 — mints a staging key and a short-lived presigned PUT URL. Creates no database row; see this file's header comment. */
export async function requestUpload(config: ApiConfig, input: MediaRequestUpload) {
  let settings;
  try {
    settings = requireR2Settings(config);
  } catch (err) {
    throw mediaErrors.notConfigured(err);
  }

  const stagingKey = `tmp/${randomUUID()}-${sanitizeFileName(input.fileName)}`;

  let uploadUrl: string;
  try {
    uploadUrl = await createPresignedUploadUrl(settings, stagingKey, input.fileType);
  } catch (err) {
    throw mediaErrors.presignFailed(err);
  }

  return {
    uploadUrl,
    stagingKey,
    expiresAt: new Date(Date.now() + PRESIGNED_UPLOAD_EXPIRY_SECONDS * 1000).toISOString(),
  };
}

/** Step 2 of F-067 — processes and registers a staged upload. See this file's header comment for the image vs. passthrough split. */
export async function confirmUpload(db: typeof Db, config: ApiConfig, input: MediaConfirmUpload, uploaderId: string | null) {
  if (!input.stagingKey.startsWith('tmp/')) {
    // Defense against a client passing an arbitrary key it doesn't own —
    // confirmUpload only ever trusts keys it (or requestUpload) minted.
    throw mediaErrors.invalidStagingKey();
  }

  let settings;
  try {
    settings = requireR2Settings(config);
  } catch (err) {
    throw mediaErrors.notConfigured(err);
  }

  const isImage = input.mimeType.startsWith('image/');
  const id = randomUUID();

  let finalKey: string;
  let finalMimeType: string;
  let finalSize: number;
  let width: number | null = null;
  let height: number | null = null;

  try {
    if (isImage) {
      const original = await getObjectBuffer(settings, input.stagingKey);
      const { data, info } = await sharp(original, { failOn: 'none' })
        .rotate() // auto-orient from the EXIF Orientation tag *before* the encode below strips all EXIF, or a re-oriented-on-upload photo would render sideways forever.
        .resize({ width: MAX_IMAGE_DIMENSION, height: MAX_IMAGE_DIMENSION, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toBuffer({ resolveWithObject: true });

      width = info.width;
      height = info.height;
      finalKey = `${input.folder}/${id}.webp`;
      finalMimeType = 'image/webp';
      finalSize = data.byteLength;

      await putObject(settings, finalKey, Buffer.from(data), finalMimeType);
      await deleteObject(settings, input.stagingKey);
    } else {
      const ext = extname(input.fileName);
      finalKey = `${input.folder}/${id}${ext ? `.${ext}` : ''}`;
      await copyObject(settings, input.stagingKey, finalKey);
      await deleteObject(settings, input.stagingKey);

      const head = await headObject(settings, finalKey);
      finalMimeType = head.contentType ?? input.mimeType;
      finalSize = head.contentLength ?? input.fileSize;
    }
  } catch (err) {
    // R2/S3 raises "NoSuchKey" when the staging object was never actually
    // PUT (client abandoned the upload, or is replaying a stale/expired
    // stagingKey) — surfaced as a clear, actionable error rather than a
    // generic "processing failed".
    if (err instanceof Error && err.name === 'NoSuchKey') {
      throw mediaErrors.stagingObjectMissing();
    }
    throw mediaErrors.processingFailed(err);
  }

  let asset;
  try {
    asset = await db.mediaAsset.create({
      data: {
        key: finalKey,
        fileName: input.fileName,
        mimeType: finalMimeType,
        fileSize: finalSize,
        folder: input.folder,
        width,
        height,
        altText: input.altText ?? null,
        caption: input.caption ?? null,
        tags: input.tags,
        uploadedBy: uploaderId,
      },
    });
  } catch (err) {
    // The R2 object now exists but the DB write failed — clean it up
    // rather than leaving an orphaned, unreferenced object in the bucket.
    await deleteObject(settings, finalKey).catch((cleanupErr) => {
      console.error(`[mediaService.confirmUpload] failed to roll back orphaned R2 object "${finalKey}" after a DB write failure —`, cleanupErr);
    });
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
      throw mediaErrors.keyConflict(finalKey);
    }
    throw mediaErrors.confirmFailed(err);
  }

  return serialize(asset, settings);
}

export async function updateAsset(db: typeof Db, config: ApiConfig, input: MediaUpdate) {
  const settings = requireR2Settings(config);
  const { id, ...rest } = input;

  let asset;
  try {
    asset = await db.mediaAsset.update({
      where: { id },
      data: {
        altText: rest.altText,
        caption: rest.caption,
        tags: rest.tags,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw mediaErrors.notFound(id);
    }
    throw mediaErrors.updateFailed(err);
  }

  return serialize(asset, settings);
}

/**
 * F-169's "bulk delete with usage warning" — the client calls this first to
 * populate the confirmation dialog. Only checks NewsArticle.imageUrl today,
 * the only content model that references media so far; each M4 module that
 * gets its own image field (Staff portraits, Society logos, Gallery items,
 * ...) needs to be added to the Promise.all below as it's built, or this
 * will silently under-report usage once those modules exist.
 */
export async function getUsage(db: typeof Db, config: ApiConfig, input: MediaUsage) {
  const asset = await db.mediaAsset.findUnique({ where: { id: input.id } });
  if (!asset) {
    throw mediaErrors.notFound(input.id);
  }
  const settings = requireR2Settings(config);
  const url = objectUrl(settings, asset.key);

  try {
    const [count, articles] = await Promise.all([db.newsArticle.count({ where: { imageUrl: url } }), db.newsArticle.findMany({ where: { imageUrl: url }, select: { id: true, title: true }, take: 5 })]);
    return { count, articles };
  } catch (err) {
    console.error('[mediaService.getUsage] falling back to zero usage —', err);
    return { count: 0, articles: [] };
  }
}

export async function deleteAsset(db: typeof Db, config: ApiConfig, input: MediaDelete) {
  const asset = await db.mediaAsset.findUnique({ where: { id: input.id } });
  if (!asset) {
    throw mediaErrors.notFound(input.id);
  }
  const settings = requireR2Settings(config);

  try {
    await deleteObject(settings, asset.key);
  } catch (err) {
    throw mediaErrors.deleteFailed(err);
  }

  await db.mediaAsset.delete({ where: { id: input.id } });
}

export async function bulkDeleteAssets(db: typeof Db, config: ApiConfig, input: MediaBulkDelete) {
  const assets = await db.mediaAsset.findMany({ where: { id: { in: input.ids } } });
  if (assets.length === 0) {
    return { deletedCount: 0 };
  }
  const settings = requireR2Settings(config);

  try {
    await deleteObjects(
      settings,
      assets.map((asset) => asset.key),
    );
  } catch (err) {
    throw mediaErrors.deleteFailed(err);
  }

  const result = await db.mediaAsset.deleteMany({
    where: { id: { in: assets.map((asset) => asset.id) } },
  });
  return { deletedCount: result.count };
}
