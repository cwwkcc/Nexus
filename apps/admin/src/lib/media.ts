// apps/admin/src/lib/media.ts
//
// AdminMediaAsset is inferred directly from the real router output
// (inferRouterOutputs<AppRouter>), the same convention lib/news.ts
// established for AdminNewsArticle — it can't silently drift from
// packages/api/src/modules/media/validators.ts's MediaAssetOutput.

import type { AppRouter } from '@nexus/api';
import type { inferRouterOutputs } from '@trpc/server';

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type AdminMediaAsset = RouterOutputs['media']['list']['items'][number];
export type MediaFolder = AdminMediaAsset['folder'];

export const MEDIA_FOLDER_LABELS: Record<MediaFolder, string> = {
  images: 'Images',
  documents: 'Documents',
  media: 'Audio & video',
  avatars: 'Avatars',
};

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Which folder a file's mime type belongs in — used by UploadZone/MediaLibraryPicker to pick a default without asking the user, matching how avatars/documents/media are distinguished only by usage context, not by mime type alone (an 'avatars' image and an 'images' image look identical to the browser). Callers that need the 'avatars' distinction pass an explicit `folder` override instead of relying on this. */
export function folderForMimeType(mimeType: string): MediaFolder {
  if (mimeType.startsWith('image/')) return 'images';
  if (mimeType === 'application/pdf' || mimeType.startsWith('application/') || mimeType.startsWith('text/')) return 'documents';
  return 'media';
}
