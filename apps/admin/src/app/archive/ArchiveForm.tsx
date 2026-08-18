'use client';

// apps/admin/src/app/archive/ArchiveForm.tsx
//
// Shared create/edit form (Task 7.20, F-155/F-182). Mirrors
// apps/admin/src/app/achievements/AchievementForm.tsx's shape: one component for both
// modes, a MediaLibraryPicker for the file field, and every action
// returning an ActionResult shown inline instead of thrown.
//
// No status field — archive entries have no moderation workflow (F-182:
// simple create/edit/delete shape like Events).

import { ArchiveCategory } from '@nexus/contracts';
import { Button, Input, Select, Textarea } from '@nexus/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createArchiveEntry, updateArchiveEntry, type ArchiveFormInput } from './actions.js';
import { MediaLibraryPicker } from '../../features/media/MediaLibraryPicker.js';
import type { AdminMediaAsset } from '../../lib/media.js';
import { ARCHIVE_CATEGORY_LABELS, categoryOptions, type AdminArchive } from '../../lib/archive.js';

interface ArchiveFormProps {
  mode: 'create' | 'edit';
  initial?: AdminArchive;
}

export function ArchiveForm({ mode, initial }: ArchiveFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initial?.title ?? '');
  const [year, setYear] = useState(initial?.year ?? '');
  const [category, setCategory] = useState<ArchiveCategory>(initial?.category ?? 'photograph');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [fileUrl, setFileUrl] = useState(initial?.file.src ?? '');
  const [fileAlt, setFileAlt] = useState(initial?.file.alt ?? '');
  const [filePickerOpen, setFilePickerOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [yearError, setYearError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setTitleError(null);
    setYearError(null);
    setFileError(null);

    const trimmedTitle = title.trim();
    const trimmedYear = year.trim();
    const trimmedFileUrl = fileUrl.trim();
    let hasError = false;

    if (!trimmedTitle) {
      setTitleError('Title is required.');
      hasError = true;
    }
    if (!trimmedYear) {
      setYearError('Year is required.');
      hasError = true;
    }
    if (!trimmedFileUrl) {
      setFileError('File is required.');
      hasError = true;
    }
    if (hasError) return;

    setSubmitting(true);

    const payload: ArchiveFormInput = {
      title: trimmedTitle,
      year: trimmedYear,
      category,
      description: description.trim() || null,
      fileUrl: trimmedFileUrl,
      fileAlt: fileAlt.trim() || title,
    };

    const result = mode === 'create' ? await createArchiveEntry(payload) : await updateArchiveEntry(initial!.id, payload);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push('/archive');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-space-8">
      {error && (
        <div role="alert" className="rounded-md border border-semantic-error-base bg-surface-elevated px-space-4 py-space-3 text-body text-semantic-error-base">
          {error}
        </div>
      )}

      <Input label="Title" required value={title} error={titleError ?? undefined} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. 1987 Annual Magazine" />

      <div className="grid grid-cols-1 gap-space-6 md:grid-cols-2">
        <Select label="Category" required options={categoryOptions} value={category} onChange={(e) => setCategory(e.target.value as ArchiveCategory)} />
        <Input label="Year" required value={year} error={yearError ?? undefined} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 1987" />
      </div>

      <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} helperText="Optional — detailed description of the archive entry." />

      <div className="flex flex-col gap-space-2">
        <span className="font-body text-label uppercase tracking-label text-text-primary">File</span>
        {fileUrl ? (
          <div className="flex items-center gap-space-4">
            <div className="relative h-space-16 w-space-16 shrink-0 overflow-hidden rounded-md border border-border-default">
              {/* eslint-disable-next-line @next/next/no-img-element -- see AchievementForm.tsx's identical note: next/image would throw for a host outside next.config's remotePatterns. */}
              <img src={fileUrl} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-space-2">
              <Button type="button" variant="secondary" size="sm" onClick={() => setFilePickerOpen(true)}>
                Change file
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFileUrl('');
                  setFileAlt('');
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <Button type="button" variant="outline" onClick={() => setFilePickerOpen(true)}>
            Choose from Media Library
          </Button>
        )}
        {fileUrl && <Input label="File alt text" value={fileAlt} onChange={(e) => setFileAlt(e.target.value)} placeholder={title || 'Describe the file for screen readers'} helperText="Defaults to the title if left blank." />}
        {fileError && <div className="text-sm text-semantic-error-base">{fileError}</div>}
      </div>

      <MediaLibraryPicker
        open={filePickerOpen}
        onClose={() => setFilePickerOpen(false)}
        onSelect={(asset: AdminMediaAsset) => {
          setFileUrl(asset.url);
          setFilePickerOpen(false);
        }}
        folder="archive"
        title="Choose archive file"
      />

      <div className="flex items-center gap-space-4 border-t border-border-default pt-space-6">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving…' : mode === 'create' ? 'Add archive entry' : 'Save changes'}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.push('/archive')} disabled={submitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
