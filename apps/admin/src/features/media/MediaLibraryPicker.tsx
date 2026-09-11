'use client';

// apps/admin/src/features/media/MediaLibraryPicker.tsx
//
// Modal-style Media Library picker for use inside other forms — select an
// existing asset or upload a new one, hand the caller back a single
// AdminMediaAsset. Wired in today by NewsForm.tsx's cover image field and
// RichTextEditorClient's "insert image" toolbar button
// (features/editor/MediaPickerPlugin.tsx); the stub this replaces also
// named Staff portrait / Society logo / Gallery cover / Facility photos as
// future consumers — those modules don't exist yet (M4), so they aren't
// wired here, but this component's API (`onSelect`, `folder` filter) is
// intentionally generic enough that they can adopt it directly once built.
//
// Deliberately not @nexus/ui's Modal or Drawer: Modal is fixed at
// min(520px, 100vw-32px) and Drawer maxes out at w-96 (384px) — neither
// fits a real searchable grid. This reuses Modal's actual accessibility
// mechanics (portal, useLockBodyScroll, the same FOCUSABLE_SELECTOR focus
// trap, Escape-to-close, focus restore on close) rather than its fixed
// layout, so a picker gets the same a11y guarantees as every other overlay
// in the app without being squeezed into a 520px dialog.

import { Button, Input, Select, useLockBodyScroll } from '@nexus/ui';
import { useEffect, useRef, useState, useTransition } from 'react';
import { createPortal } from 'react-dom';

import { MediaAssetThumbnail } from './MediaAssetThumbnail.js';
import { UploadZone } from './UploadZone.js';
import { listMediaAssets } from '../../app/media/actions.js';
import { MEDIA_FOLDER_LABELS, type AdminMediaAsset, type MediaFolder } from '../../lib/entities/media.js';

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const folderOptions: Array<{ value: MediaFolder | 'all'; label: string }> = [{ value: 'all', label: 'All folders' }, ...(Object.entries(MEDIA_FOLDER_LABELS) as Array<[MediaFolder, string]>).map(([value, label]) => ({ value, label }))];

interface MediaLibraryPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (asset: AdminMediaAsset) => void;
  /** Restricts both the browse grid and the upload tab's default target to one folder — e.g. a portrait picker would pass `folder="avatars"`. Omit for a general-purpose picker (all folders, upload tab infers folder per file). */
  folder?: MediaFolder;
  title?: string;
}

export function MediaLibraryPicker({ open, onClose, onSelect, folder, title = 'Choose from Media Library' }: MediaLibraryPickerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const [tab, setTab] = useState<'browse' | 'upload'>('browse');
  const [query, setQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState<MediaFolder | 'all'>(folder ?? 'all');
  const [page, setPage] = useState(1);
  const [assets, setAssets] = useState<AdminMediaAsset[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isPending, startTransition] = useTransition();

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    startTransition(async () => {
      const result = await listMediaAssets({ folder: activeFolder, query, page, pageSize: 24 });
      setAssets(result.items);
      setTotalPages(result.pagination.totalPages);
    });
  }, [open, activeFolder, query, page]);

  // Resets to a clean browse view at the moment the picker closes (not when
  // it opens) — the cleanup of an [open]-dependent effect runs right before
  // `open` flips back to true on the *next* open, which is always a
  // separate commit from this one. Resetting on open instead would race the
  // fetch effect above within the same commit: it would fire once with
  // whatever page/tab were left over from last time, then again once the
  // reset's setState calls actually took effect.
  useEffect(() => {
    if (!open) return;
    return () => {
      setTab('browse');
      setPage(1);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusables?.[0]?.focus();

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (typeof document === 'undefined' || !open) return null;

  const handleUploaded = (asset: AdminMediaAsset) => {
    onSelect(asset);
    onClose();
  };

  return createPortal(
    <>
      <div onClick={onClose} aria-hidden="true" className="z-80 bg-overlay-medium fixed inset-0" />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="media-picker-title" className="z-90 bg-surface-elevated shadow-elevation-3 fixed left-1/2 top-1/2 flex h-[min(720px,calc(100vh-64px))] w-[min(920px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 flex-col">
        <div className="border-border-default px-space-6 py-space-4 flex items-center justify-between border-b">
          <h2 id="media-picker-title" className="font-display text-h4 text-text-primary font-medium">
            {title}
          </h2>
          <button onClick={onClose} aria-label="Close" className="font-body text-text-muted duration-fast hover:text-text-primary focus-visible:outline-gold-base text-[1.25rem] leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2">
            ×
          </button>
        </div>

        <div className="gap-space-1 border-border-light px-space-6 flex border-b">
          <button onClick={() => setTab('browse')} className={`px-space-4 py-space-3 font-body text-label tracking-label uppercase transition-colors ${tab === 'browse' ? 'border-gold-base text-gold-base border-b-2' : 'text-text-muted hover:text-text-primary border-b-2 border-transparent'}`}>
            Browse
          </button>
          <button onClick={() => setTab('upload')} className={`px-space-4 py-space-3 font-body text-label tracking-label uppercase transition-colors ${tab === 'upload' ? 'border-gold-base text-gold-base border-b-2' : 'text-text-muted hover:text-text-primary border-b-2 border-transparent'}`}>
            Upload new
          </button>
        </div>

        <div className="p-space-6 flex-1 overflow-y-auto">
          {tab === 'upload' ? (
            <UploadZone folder={folder} onUploaded={handleUploaded} label="Upload and use" />
          ) : (
            <div className="gap-space-4 flex flex-col">
              <div className="gap-space-3 flex flex-col sm:flex-row">
                <Input
                  label="Search"
                  placeholder="Search by filename, alt text, or tag…"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  type="search"
                  className="flex-1"
                />
                {!folder && (
                  <Select
                    label="Folder"
                    options={folderOptions}
                    value={activeFolder}
                    onChange={(e) => {
                      setActiveFolder(e.target.value as MediaFolder | 'all');
                      setPage(1);
                    }}
                    className="w-full sm:w-48"
                  />
                )}
              </div>

              <div className={isPending ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
                {assets.length === 0 ? (
                  <p className="py-space-9 font-body text-body text-text-muted text-center">{query ? 'No assets match that search.' : 'No assets in this folder yet — switch to "Upload new" to add one.'}</p>
                ) : (
                  <div className="gap-space-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
                    {assets.map((asset) => (
                      <MediaAssetThumbnail key={asset.id} asset={asset} onClick={() => onSelect(asset)} />
                    ))}
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <div className="gap-space-3 flex items-center justify-center">
                  <Button type="button" variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                    Previous
                  </Button>
                  <span className="font-body text-caption text-text-muted">
                    Page {page} of {totalPages}
                  </span>
                  <Button type="button" variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>,
    document.body,
  );
}
