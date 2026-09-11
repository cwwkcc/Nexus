'use server';

// apps/admin/src/app/media/actions.ts
//
// Mirrors news/actions.ts's ActionResult pattern (see that file's header
// comment for why actions return {ok, ...} instead of throwing).
//
// Unlike news's actions, several of these are called directly from client
// components that aren't page-level forms — MediaLibraryPicker needs live
// search-as-you-type, and UploadZone needs to run the two-step upload flow
// (F-067) interactively. Next.js server actions are already a supported
// browser-callable RPC mechanism (see news/actions.ts's own header comment),
// so this doesn't need any new client-tRPC infrastructure: `requestUpload`
// returns a presigned URL as plain JSON, and the actual file bytes go
// straight from the browser to R2 via `fetch(uploadUrl, {method:'PUT', ...})`
// in UploadZone.tsx — this server action never sees them. That's what
// F-067/F-120 actually require ("the Next.js server is never in the upload
// path"), not that the browser can't call a server action at all.

import { TRPCError } from '@trpc/server';

import type { MediaFolder } from '../../lib/entities/media.js';
import { getServerCaller } from '../../lib/server-caller.js';

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

export interface MediaListParams {
  folder: MediaFolder | 'all';
  query?: string;
  page: number;
  pageSize?: number;
}

function messageFor(err: unknown, fallback: string): string {
  if (err instanceof TRPCError) {
    if (err.code === 'BAD_REQUEST' || err.code === 'CONFLICT' || err.code === 'NOT_FOUND') return err.message;
    if (err.code === 'UNAUTHORIZED' || err.code === 'FORBIDDEN') return "You don't have permission to do that.";
    return fallback;
  }
  return fallback;
}

export async function listMediaAssets(params: MediaListParams) {
  const caller = await getServerCaller();
  return caller.media.list({
    folder: params.folder,
    query: params.query,
    page: params.page,
    pageSize: params.pageSize ?? 24,
  });
}

export async function requestMediaUpload(input: { fileName: string; fileType: string; fileSize: number; folder: MediaFolder }): Promise<ActionResult<{ uploadUrl: string; stagingKey: string; expiresAt: string }>> {
  try {
    const caller = await getServerCaller();
    const result = await caller.media.requestUpload(input);
    return { ok: true, data: result };
  } catch (err) {
    return { ok: false, error: messageFor(err, 'Could not start the upload. Please try again.') };
  }
}

export interface ConfirmMediaUploadInput {
  stagingKey: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  folder: MediaFolder;
  altText?: string | null;
  caption?: string | null;
  tags?: string[];
}

export async function confirmMediaUpload(input: ConfirmMediaUploadInput) {
  try {
    const caller = await getServerCaller();
    const asset = await caller.media.confirmUpload(input);
    return { ok: true as const, data: asset };
  } catch (err) {
    return { ok: false as const, error: messageFor(err, 'The file uploaded, but saving it failed. Please try again.') };
  }
}

export async function updateMediaAsset(id: string, input: { altText?: string | null; caption?: string | null; tags?: string[] }) {
  try {
    const caller = await getServerCaller();
    const asset = await caller.media.update({ id, ...input });
    return { ok: true as const, data: asset };
  } catch (err) {
    return { ok: false as const, error: messageFor(err, 'Could not save those changes. Please try again.') };
  }
}

export async function getMediaAssetUsage(id: string) {
  try {
    const caller = await getServerCaller();
    const usage = await caller.media.getUsage({ id });
    return { ok: true as const, data: usage };
  } catch (err) {
    return { ok: false as const, error: messageFor(err, 'Could not check where this asset is used.') };
  }
}

export async function deleteMediaAsset(id: string): Promise<ActionResult> {
  try {
    const caller = await getServerCaller();
    await caller.media.delete({ id });
    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, error: messageFor(err, 'Could not delete the asset. Please try again.') };
  }
}

export async function bulkDeleteMediaAssets(ids: string[]): Promise<ActionResult<{ deletedCount: number }>> {
  try {
    const caller = await getServerCaller();
    const result = await caller.media.bulkDelete({ ids });
    return { ok: true, data: result };
  } catch (err) {
    return { ok: false, error: messageFor(err, 'Could not delete the selected assets. Please try again.') };
  }
}
