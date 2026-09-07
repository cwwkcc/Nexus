'use client';

// apps/admin/src/app/achievements/AchievementForm.tsx
//
// Shared create/edit form (Task 7.19, F-156/F-181). Mirrors
// apps/admin/src/app/alumni/AlumniForm.tsx's shape: one component for both
// modes, a MediaLibraryPicker for the image field, and every action
// returning an ActionResult shown inline instead of thrown.
//
// No status field — achievements have no moderation workflow (F-181:
// "no draft/review workflow").

import { AchievementCategory, AchievementLevel } from '@nexus/contracts';
import { Button, Input, Select, Textarea } from '@nexus/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createAchievement, updateAchievement, type AchievementFormInput } from './actions.js';
import { MediaLibraryPicker } from '../../features/media/MediaLibraryPicker.js';
import type { AdminMediaAsset } from '../../lib/media.js';
import { ACHIEVEMENT_CATEGORY_LABELS, ACHIEVEMENT_LEVEL_LABELS, type AdminAchievement } from '../../lib/achievements.js';

const categoryOptions = AchievementCategory.options.map((value) => ({ value, label: ACHIEVEMENT_CATEGORY_LABELS[value as AchievementCategory] }));
const levelOptions = AchievementLevel.options.map((value) => ({ value, label: ACHIEVEMENT_LEVEL_LABELS[value as AchievementLevel] }));

interface AchievementFormProps {
  mode: 'create' | 'edit';
  initial?: AdminAchievement;
  /** Published articles for the "related News article" picker — fetched
   * server-side by the page wrapper (new/page.tsx, [id]/page.tsx) since
   * this is a client component and achievements has no locale field to
   * scope the query by; deliberately simplified to just the 'en' locale's
   * published articles rather than resolving per-locale. */
  newsArticles: Array<{ id: string; title: string }>;
}

export function AchievementForm({ mode, initial, newsArticles }: AchievementFormProps) {
  const router = useRouter();

  const articleOptions = [{ value: '', label: 'None' }, ...newsArticles.map((article) => ({ value: article.id, label: article.title }))];

  const [studentName, setStudentName] = useState(initial?.studentName ?? '');
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [level, setLevel] = useState<AchievementLevel>(initial?.level ?? 'school');
  const [category, setCategory] = useState<AchievementCategory>(initial?.category ?? 'academic');
  const [date, setDate] = useState(initial?.date ?? '');
  const [awardedBy, setAwardedBy] = useState(initial?.awardedBy ?? '');
  const [relatedNewsArticleId, setRelatedNewsArticleId] = useState(initial?.relatedNewsArticleId ?? '');
  const [imageUrl, setImageUrl] = useState(initial?.image?.src ?? '');
  const [imageAlt, setImageAlt] = useState(initial?.image?.alt ?? '');
  const [imagePickerOpen, setImagePickerOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [studentNameError, setStudentNameError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setTitleError(null);
    setStudentNameError(null);
    setDateError(null);

    const trimmedStudentName = studentName.trim();
    const trimmedTitle = title.trim();
    const trimmedDate = date.trim();
    let hasError = false;

    if (!trimmedStudentName) {
      setStudentNameError('Student name is required.');
      hasError = true;
    }
    if (!trimmedTitle) {
      setTitleError('Title is required.');
      hasError = true;
    }
    if (!trimmedDate) {
      setDateError('Date is required.');
      hasError = true;
    }
    if (hasError) return;

    setSubmitting(true);

    const payload: AchievementFormInput = {
      studentName: trimmedStudentName,
      title: trimmedTitle,
      description: description.trim() || null,
      level,
      category,
      date: trimmedDate,
      awardedBy: awardedBy.trim() || null,
      relatedNewsArticleId: relatedNewsArticleId || null,
      imageUrl: imageUrl.trim() || null,
      imageAlt: imageAlt.trim() || null,
    };

    const result = mode === 'create' ? await createAchievement(payload) : await updateAchievement(initial!.id, payload);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push('/achievements');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-space-8">
      {error && (
        <div role="alert" className="rounded-md border border-semantic-error-base bg-surface-elevated px-space-4 py-space-3 text-body text-semantic-error-base">
          {error}
        </div>
      )}

      <Input label="Student Name" required value={studentName} error={studentNameError ?? undefined} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. Priya Fernando" />

      <Input label="Title" required value={title} error={titleError ?? undefined} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. National Science Olympiad Gold Medal" />

      <div className="grid grid-cols-1 gap-space-6 md:grid-cols-2">
        <Select label="Category" required options={categoryOptions} value={category} onChange={(e) => setCategory(e.target.value as AchievementCategory)} />
        <Select label="Level" required options={levelOptions} value={level} onChange={(e) => setLevel(e.target.value as AchievementLevel)} />
      </div>

      <Input label="Date" required value={date} error={dateError ?? undefined} onChange={(e) => setDate(e.target.value)} type="date" helperText="ISO date format (YYYY-MM-DD)" />

      <Input label="Awarded By" value={awardedBy} onChange={(e) => setAwardedBy(e.target.value)} placeholder="e.g. Ministry of Education" helperText="Optional — awarding body or organization." />

      <Select label="Related News Article" options={articleOptions} value={relatedNewsArticleId} onChange={(e) => setRelatedNewsArticleId(e.target.value)} helperText="Optional — links to a published article about this achievement, if one exists. List is the 'en' locale's published articles only." />

      <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} helperText="Optional — detailed description of the achievement." />

      <div className="flex flex-col gap-space-2">
        <span className="font-body text-label uppercase tracking-label text-text-primary">Image</span>
        {imageUrl ? (
          <div className="flex items-center gap-space-4">
            <div className="relative h-space-16 w-space-16 shrink-0 overflow-hidden rounded-md border border-border-default">
              {/* eslint-disable-next-line @next/next/no-img-element -- see AlumniForm.tsx's identical note: next/image would throw for a host outside next.config's remotePatterns. */}
              <img src={imageUrl} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-space-2">
              <Button type="button" variant="secondary" size="sm" onClick={() => setImagePickerOpen(true)}>
                Change image
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setImageUrl('');
                  setImageAlt('');
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <Button type="button" variant="outline" onClick={() => setImagePickerOpen(true)}>
            Choose from Media Library
          </Button>
        )}
        {imageUrl && <Input label="Image alt text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} placeholder={title || 'Describe the image for screen readers'} helperText="Defaults to the achievement title if left blank." />}
      </div>

      <MediaLibraryPicker
        open={imagePickerOpen}
        onClose={() => setImagePickerOpen(false)}
        onSelect={(asset: AdminMediaAsset) => {
          setImageUrl(asset.url);
          setImagePickerOpen(false);
        }}
        folder="achievements"
        title="Choose achievement image"
      />

      <div className="flex items-center gap-space-4 border-t border-border-default pt-space-6">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving…' : mode === 'create' ? 'Add achievement' : 'Save changes'}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.push('/achievements')} disabled={submitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
