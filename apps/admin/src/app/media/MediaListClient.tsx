'use client';

// apps/admin/src/app/media/MediaListClient.tsx
//
// F-169 Media Library grid. Search and folder filters push into the URL
// (?q=&folder=&page=) the same way NewsListClient does, so the server
// component re-fetches via caller.media.list — real server-side
// pagination, not a client-side slice pretending to paginate.
//
// The edit/delete panel below deliberately doesn't use @nexus/ui Modal's
// built-in onConfirm/variant="confirmation" plumbing: that button always
// calls onClose() immediately after onConfirm() (see Modal.tsx's own
// source), which is fine for a synchronous confirm but wrong here — a save
// or delete can fail, and the modal shouldn't vanish out from under an
// error message. So this uses variant="information" (a title +
// close-only footer) and puts every real action button in `children`,
// closing only on an explicit success.

import { Button, EmptyState, Input, Modal, Pagination, Select, Textarea } from '@nexus/ui';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

import { bulkDeleteMediaAssets, deleteMediaAsset, getMediaAssetUsage, updateMediaAsset } from './actions.js';
import { MediaAssetThumbnail } from '../../features/media/MediaAssetThumbnail.js';
import { UploadZone } from '../../features/media/UploadZone.js';
import { MEDIA_FOLDER_LABELS, type AdminMediaAsset, type MediaFolder } from '../../lib/media.js';

const folderOptions: Array<{ value: MediaFolder | 'all'; label: string }> = [{ value: 'all', label: 'All folders' }, ...(Object.entries(MEDIA_FOLDER_LABELS) as Array<[MediaFolder, string]>).map(([value, label]) => ({ value, label }))];

interface MediaListClientProps {
  assets: AdminMediaAsset[];
  pagination: { page: number; totalPages: number };
  currentQuery: string;
  currentFolder: MediaFolder | 'all';
}

export function MediaListClient({ assets, pagination, currentQuery, currentFolder }: MediaListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(currentQuery);
  const [showUpload, setShowUpload] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editingAsset, setEditingAsset] = useState<AdminMediaAsset | null>(null);
  const [listError, setListError] = useState<string | null>(null);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const pushParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    if (!('page' in updates)) {
      params.delete('page');
    }
    startTransition(() => {
      router.push(`/media?${params.toString()}`);
    });
  };

  const toggleSelected = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleUploaded = () => {
    setShowUpload(false);
    router.refresh();
  };

  const runBulkDelete = async () => {
    if (selected.size === 0) return;
    // eslint-disable-next-line no-alert -- a native confirm is a reasonable stopgap for a rare, low-stakes bulk action; a per-item usage check for every selected asset would mean one getUsage round trip per item, which doesn't scale the way the single-asset panel's real check does.
    const confirmed = window.confirm(`Permanently delete ${selected.size} asset${selected.size === 1 ? '' : 's'}? If any are used in published content, those images will break there. This cannot be undone.`);
    if (!confirmed) return;

    setBulkDeleting(true);
    setListError(null);
    const result = await bulkDeleteMediaAssets(Array.from(selected));
    setBulkDeleting(false);

    if (!result.ok) {
      setListError(result.error);
      return;
    }
    setSelected(new Set());
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-space-6">
      <div className="flex flex-col gap-space-4 md:flex-row md:items-end">
        <form
          className="flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            pushParams({ q: query });
          }}
        >
          <Input label="Search" placeholder="Search by filename, alt text, or tag…" value={query} onChange={(e) => setQuery(e.target.value)} type="search" />
        </form>
        <Select label="Folder" options={folderOptions} value={currentFolder} onChange={(e) => pushParams({ folder: e.target.value })} className="w-full md:w-56" />
        <Button type="button" variant="secondary" onClick={() => setShowUpload((prev) => !prev)}>
          {showUpload ? 'Close upload' : 'Upload files'}
        </Button>
      </div>

      {showUpload && (
        <div className="rounded-md border border-border-default bg-surface-default p-space-6">
          <UploadZone onUploaded={handleUploaded} label="Upload to Media Library" />
        </div>
      )}

      {listError && (
        <div role="alert" className="rounded-md border border-semantic-error-base bg-surface-elevated px-space-4 py-space-3 text-body text-semantic-error-base">
          {listError}
        </div>
      )}

      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-space-3 rounded-md border border-border-default bg-surface-default px-space-4 py-space-3">
          <span className="text-label text-text-primary">{selected.size} selected</span>
          <Button size="sm" variant="outline" onClick={runBulkDelete} disabled={bulkDeleting}>
            {bulkDeleting ? 'Deleting…' : 'Delete selected'}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setSelected(new Set())}>
            Clear selection
          </Button>
        </div>
      )}

      <div className={isPending ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
        {assets.length === 0 ? (
          <EmptyState heading="No media yet" description="Upload an image, document, or video to get started." action={{ label: 'Upload files', onClick: () => setShowUpload(true) }} />
        ) : (
          <div className="grid grid-cols-2 gap-space-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {assets.map((asset) => (
              <MediaAssetThumbnail key={asset.id} asset={asset} selected={selected.has(asset.id)} onSelectToggle={() => toggleSelected(asset.id)} onClick={() => setEditingAsset(asset)} />
            ))}
          </div>
        )}
      </div>

      <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} onPageChange={(page) => pushParams({ page: String(page) })} />

      {editingAsset && (
        <MediaAssetEditPanel
          asset={editingAsset}
          onClose={() => setEditingAsset(null)}
          onSaved={() => {
            setEditingAsset(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

interface MediaAssetEditPanelProps {
  asset: AdminMediaAsset;
  onClose: () => void;
  onSaved: () => void;
}

function MediaAssetEditPanel({ asset, onClose, onSaved }: MediaAssetEditPanelProps) {
  const [altText, setAltText] = useState(asset.altText ?? '');
  const [caption, setCaption] = useState(asset.caption ?? '');
  const [tags, setTags] = useState(asset.tags.join(', '));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [checkingUsage, setCheckingUsage] = useState(false);
  const [usageNote, setUsageNote] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    const result = await updateMediaAsset(asset.id, {
      altText: altText.trim() || null,
      caption: caption.trim() || null,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onSaved();
  };

  const handleDeleteClick = async () => {
    setCheckingUsage(true);
    setError(null);
    const usage = await getMediaAssetUsage(asset.id);
    setCheckingUsage(false);

    if (usage.ok && usage.data.count > 0) {
      const titles = usage.data.articles.map((article) => article.title).join(', ');
      const more = usage.data.count > usage.data.articles.length ? ` and ${usage.data.count - usage.data.articles.length} more` : '';
      setUsageNote(`This is used as the cover image for: ${titles}${more}. Deleting it will break those images.`);
    } else {
      setUsageNote(null);
    }
    setConfirmingDelete(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    setError(null);
    const result = await deleteMediaAsset(asset.id);
    setDeleting(false);
    if (!result.ok) {
      setError(result.error);
      setConfirmingDelete(false);
      return;
    }
    onSaved();
  };

  return (
    <Modal variant="information" open onClose={confirmingDelete ? () => setConfirmingDelete(false) : onClose} title={confirmingDelete ? 'Delete this asset?' : 'Edit asset'} closeLabel={confirmingDelete ? 'Cancel' : 'Close'}>
      <div className="flex flex-col gap-space-4">
        {error && (
          <p role="alert" className="font-body text-body-sm text-semantic-error-base">
            {error}
          </p>
        )}

        {confirmingDelete ? (
          <>
            <p className="font-body text-body text-text-primary">{usageNote ?? 'This will permanently remove the file from storage. This cannot be undone.'}</p>
            <div className="flex justify-end gap-space-3">
              <Button type="button" variant="destructive" onClick={handleConfirmDelete} disabled={deleting}>
                {deleting ? 'Deleting…' : 'Delete permanently'}
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="break-all font-body text-caption text-text-muted">{asset.fileName}</p>

            {asset.mimeType.startsWith('image/') && (
              <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border-default bg-surface-default">
                <Image src={asset.url} alt={asset.altText ?? ''} fill sizes="460px" className="object-contain" />
              </div>
            )}

            <Input label="Alt text" value={altText} onChange={(e) => setAltText(e.target.value)} helperText="Describes the image for screen readers and search engines." />
            <Textarea label="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} rows={2} />
            <Input label="Tags" value={tags} onChange={(e) => setTags(e.target.value)} helperText="Comma-separated." />

            <div className="flex justify-between gap-space-3 border-t border-border-default pt-space-4">
              <Button type="button" variant="ghost" onClick={handleDeleteClick} disabled={checkingUsage}>
                {checkingUsage ? 'Checking usage…' : 'Delete asset'}
              </Button>
              <Button type="button" variant="primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving…' : 'Save changes'}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
