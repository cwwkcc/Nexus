'use client';

// apps/admin/src/app/gallery/AlbumForm.tsx
//
// Shared create/edit form (Task 7.7, F-168). Photos are one array of
// local form state — batch upload (UploadZone, reused verbatim from the
// Media Library's own upload pipeline, see UploadZone.tsx's own header
// comment) appends new entries, move up/down buttons reorder them, and
// the whole array is submitted together on save (see
// packages/api/src/modules/gallery/validators.ts's header comment for
// why photos aren't separate mutations). Each photo needs a stable React
// key that survives before it has a real database `id` (a batch-uploaded
// photo has none yet) — `clientKey` is generated once per photo entry and
// never sent to the server.
//
// No drag-and-drop for photo reordering, only move up/down buttons — see
// schema.prisma's GalleryPhoto.order doc comment for why that's a
// deliberate, lighter-weight choice for this level, not a dropped
// requirement (F-168's own "Reorder" line is about album-level ordering,
// which the admin *list* — GalleryListClient.tsx — handles with the same
// drag-and-drop + move-buttons combination StaffListClient.tsx already
// established).

import { LOCALE_LABELS, SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { Button, Input, Select, Textarea } from '@nexus/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createAlbum, updateAlbum, type AlbumFormInput, type AlbumPhotoFormInput } from './actions.js';
import { UploadZone } from '../../features/media/UploadZone.js';
import type { AdminGalleryAlbumDetail } from '../../lib/entities/gallery.js';
import { slugify } from '../../lib/entities/gallery.js';
import type { AdminMediaAsset } from '../../lib/entities/media.js';

const localeOptions = SUPPORTED_LOCALES.map((value) => ({ value, label: LOCALE_LABELS[value] }));

interface PhotoFormState extends AlbumPhotoFormInput {
  clientKey: string;
}

interface AlbumFormProps {
  mode: 'create' | 'edit';
  initial?: AdminGalleryAlbumDetail;
}

function newClientKey(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `photo-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function AlbumForm({ mode, initial }: AlbumFormProps) {
  const router = useRouter();

  const [locale, setLocale] = useState<LocaleEnumData>(initial?.locale ?? 'en');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(mode === 'edit');
  const [title, setTitle] = useState(initial?.title ?? '');
  const [year, setYear] = useState(initial ? String(initial.year) : String(new Date().getFullYear()));
  const [category, setCategory] = useState(initial?.category ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [coverPhotoUrl, setCoverPhotoUrl] = useState(initial?.coverPhoto?.src ?? '');
  const [coverPhotoAlt, setCoverPhotoAlt] = useState(initial?.coverPhoto?.alt ?? '');
  const [photos, setPhotos] = useState<PhotoFormState[]>(() => (initial?.photos ?? []).map((photo) => ({ clientKey: newClientKey(), id: photo.id, src: photo.src, alt: photo.alt, caption: photo.caption ?? '' })));

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [photoErrors, setPhotoErrors] = useState<Record<string, string>>({});

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  };

  const handleUploaded = (asset: AdminMediaAsset) => {
    setPhotos((prev) => [...prev, { clientKey: newClientKey(), src: asset.url, alt: asset.altText ?? '', caption: asset.caption ?? '' }]);
  };

  const updatePhoto = (clientKey: string, patch: Partial<PhotoFormState>) => {
    setPhotos((prev) => prev.map((photo) => (photo.clientKey === clientKey ? { ...photo, ...patch } : photo)));
  };

  const removePhoto = (clientKey: string) => {
    const removed = photos.find((p) => p.clientKey === clientKey);
    setPhotos((prev) => prev.filter((photo) => photo.clientKey !== clientKey));
    // A removed photo can't stay the cover.
    if (removed && removed.src === coverPhotoUrl) {
      setCoverPhotoUrl('');
      setCoverPhotoAlt('');
    }
  };

  const movePhoto = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= photos.length) return;
    setPhotos((prev) => {
      const next = [...prev];
      const [moved] = next.splice(index, 1);
      next.splice(targetIndex, 0, moved!);
      return next;
    });
  };

  const setCover = (photo: PhotoFormState) => {
    setCoverPhotoUrl(photo.src);
    setCoverPhotoAlt(photo.alt);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setTitleError(null);
    setSlugError(null);
    setPhotoErrors({});

    let hasError = false;

    if (!title.trim()) {
      setTitleError('Title is required.');
      hasError = true;
    }
    const normalizedSlug = slugify(slug);
    if (!normalizedSlug) {
      setSlugError('Slug is required.');
      hasError = true;
    }

    // F-168: per-photo alt text is required — the same rule
    // GalleryPhoto.alt's non-nullable column enforces server-side, caught
    // here first for a faster, per-row error instead of a generic save
    // failure.
    const nextPhotoErrors: Record<string, string> = {};
    for (const photo of photos) {
      if (!photo.alt.trim()) {
        nextPhotoErrors[photo.clientKey] = 'Alt text is required for every photo.';
        hasError = true;
      }
    }
    setPhotoErrors(nextPhotoErrors);

    if (hasError) return;

    setSubmitting(true);

    const payload: AlbumFormInput = {
      locale,
      slug: normalizedSlug,
      title: title.trim(),
      description: description.trim() || null,
      category: category.trim() || null,
      year: Number(year),
      coverPhotoUrl: coverPhotoUrl.trim() || null,
      coverPhotoAlt: coverPhotoAlt.trim() || null,
      order: initial?.order ?? 0,
      photos: photos.map(({ clientKey: _clientKey, ...photo }) => ({ ...photo, caption: photo.caption?.trim() || null })),
    };

    const result = mode === 'create' ? await createAlbum(payload) : await updateAlbum(initial!.id, payload);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push('/gallery');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-space-8">
      {error && (
        <div role="alert" className="rounded-md border border-semantic-error-base bg-surface-elevated px-space-4 py-space-3 text-body text-semantic-error-base">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-space-6 md:grid-cols-3">
        <Select label="Locale" required options={localeOptions} value={locale} onChange={(e) => setLocale(e.target.value as LocaleEnumData)} disabled={mode === 'edit'} helperText={mode === 'edit' ? 'Locale cannot be changed after creation — create a separate album for another language instead.' : 'Which language this album is written in.'} />
        <Input label="Year" type="number" required value={year} onChange={(e) => setYear(e.target.value)} />
        <Input label="Category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Sports, Cultural" helperText="Free text — no fixed category list." />
      </div>

      <Input label="Title" required value={title} error={titleError ?? undefined} onChange={(e) => handleTitleChange(e.target.value)} placeholder="e.g. Sports Day 2026" />

      <Input
        label="Slug"
        required
        value={slug}
        error={slugError ?? undefined}
        onChange={(e) => {
          setSlugTouched(true);
          setSlug(e.target.value);
        }}
        helperText="Used in the album's URL — lowercase letters, numbers, and hyphens only."
      />

      <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />

      <div className="flex flex-col gap-space-4 rounded-md border border-border-default p-space-6">
        <span className="font-body text-label uppercase tracking-label text-text-primary">Photos ({photos.length})</span>

        <UploadZone folder="images" multiple onUploaded={handleUploaded} label="Upload photos" />

        {photos.length > 0 && (
          <ul className="flex flex-col gap-space-4">
            {photos.map((photo, index) => (
              <li key={photo.clientKey} className="flex gap-space-4 rounded-md border border-border-default p-space-4">
                <div className="relative h-space-20 w-space-20 shrink-0 overflow-hidden rounded-sm border border-border-default">
                  {}
                  <img src={photo.src} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col gap-space-3">
                  <Input label="Alt text" required value={photo.alt} error={photoErrors[photo.clientKey]} onChange={(e) => updatePhoto(photo.clientKey, { alt: e.target.value })} placeholder="Describe what's in the photo" />
                  <Input label="Caption (optional)" value={photo.caption ?? ''} onChange={(e) => updatePhoto(photo.clientKey, { caption: e.target.value })} />
                  <div className="flex flex-wrap items-center gap-space-2">
                    <Button type="button" size="sm" variant="ghost" onClick={() => movePhoto(index, -1)} disabled={index === 0}>
                      ↑ Move up
                    </Button>
                    <Button type="button" size="sm" variant="ghost" onClick={() => movePhoto(index, 1)} disabled={index === photos.length - 1}>
                      ↓ Move down
                    </Button>
                    <Button type="button" size="sm" variant={coverPhotoUrl === photo.src ? 'secondary' : 'ghost'} onClick={() => setCover(photo)}>
                      {coverPhotoUrl === photo.src ? 'Cover photo ✓' : 'Set as cover'}
                    </Button>
                    <Button type="button" size="sm" variant="ghost" onClick={() => removePhoto(photo.clientKey)}>
                      Remove
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-space-4 border-t border-border-default pt-space-6">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving…' : mode === 'create' ? 'Create album' : 'Save changes'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push('/gallery')} disabled={submitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
