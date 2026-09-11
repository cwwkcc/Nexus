'use client';

// apps/admin/src/features/media/MediaAssetThumbnail.tsx
//
// A lean, dense-grid thumbnail — deliberately not @nexus/ui's ImageFrame,
// which is built for the public marketing site's presentational needs
// (captions, decorative frame borders, fixed editorial aspect ratios).
// This is admin-CMS chrome: a plain square preview, a selection checkbox,
// and a file-type badge for non-image assets, meant to be scanned quickly
// in a grid of dozens.

import Image from 'next/image';

import { formatFileSize, type AdminMediaAsset } from '../../lib/entities/media.js';

/** Short, all-caps kind label shown on non-image thumbnails — derived from mimeType since MediaAsset.folder ('documents'/'media') isn't granular enough (a video and an mp3 are both 'media'). */
function kindLabel(mimeType: string): string {
  if (mimeType.startsWith('video/')) return 'VIDEO';
  if (mimeType.startsWith('audio/')) return 'AUDIO';
  if (mimeType === 'application/pdf') return 'PDF';
  const subtype = mimeType.split('/')[1];
  return subtype ? subtype.toUpperCase().slice(0, 5) : 'FILE';
}

interface MediaAssetThumbnailProps {
  asset: AdminMediaAsset;
  selected?: boolean;
  onSelectToggle?: () => void;
  onClick?: () => void;
  className?: string;
}

export function MediaAssetThumbnail({ asset, selected = false, onSelectToggle, onClick, className }: MediaAssetThumbnailProps) {
  const isImage = asset.mimeType.startsWith('image/');

  return (
    <div className={`group relative aspect-square overflow-hidden rounded-md border bg-surface-default ${selected ? 'border-gold-base ring-2 ring-gold-base' : 'border-border-default'} ${className ?? ''}`}>
      <button type="button" onClick={onClick} className="block h-full w-full cursor-pointer text-left" aria-label={asset.altText ? `${asset.fileName} — ${asset.altText}` : asset.fileName}>
        {isImage ? (
          <Image src={asset.url} alt={asset.altText ?? ''} fill sizes="(min-width: 768px) 200px, 33vw" className="object-cover transition-transform duration-fast group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-space-2 bg-surface-elevated px-space-2 text-center">
            <span aria-hidden="true" className="font-body text-[1.75rem] leading-none text-text-muted">
              ⬚
            </span>
            <span className="font-body text-caption font-semibold uppercase tracking-caption text-text-muted">{kindLabel(asset.mimeType)}</span>
          </div>
        )}

        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 bg-overlay-medium px-space-2 py-space-1.5 opacity-0 transition-opacity duration-fast group-hover:opacity-100">
          <p className="truncate font-body text-caption text-white">{asset.fileName}</p>
          <p className="font-body text-caption text-white/70">{formatFileSize(asset.fileSize)}</p>
        </div>

        {!asset.altText && isImage && (
          <span title="Missing alt text" aria-hidden="true" className="absolute right-space-1.5 top-space-1.5 flex h-space-5 w-space-5 items-center justify-center rounded-full bg-semantic-error-base font-body text-caption font-bold text-white">
            !
          </span>
        )}
      </button>

      {onSelectToggle && (
        <label className="absolute left-space-1.5 top-space-1.5 flex h-space-5 w-space-5 cursor-pointer items-center justify-center rounded-sm border border-border-default bg-surface-elevated/90">
          <span className="sr-only">Select {asset.fileName}</span>
          <input type="checkbox" checked={selected} onChange={onSelectToggle} className="h-3.5 w-3.5 accent-green-base" />
        </label>
      )}
    </div>
  );
}
