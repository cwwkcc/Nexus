'use client';

// apps/admin/src/app/events/EventForm.tsx
//
// Shared create/edit form (M4, Task 7.5, F-166/F-198). Mirrors
// StaffForm.tsx/NewsForm.tsx's shape: one component for both modes, a
// MediaLibraryPicker for the cover image, every action returning an
// ActionResult shown inline instead of thrown.
//
// F-166's two-branch flow ("the editor makes one choice: calendar-only, or
// calendar + event card") is the "Add event details" toggle below — off
// submits `detail: null` (calendar-only), on submits a full
// EventDetailFormInput. Toggling it off after it was on, or back on after
// it was off, is a deliberate extension beyond F-166's literal "the fork
// is made at the point of creation" wording — see
// packages/api/src/modules/events/validators.ts's header comment for why
// service.ts supports upgrading/downgrading an existing entry rather than
// requiring delete-and-recreate.

import { EVENT_CATEGORY_META, LOCALE_LABELS, SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { Button, Input, Select, Textarea, Toggle } from '@nexus/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createCalendarEntry, updateCalendarEntry, type EventFormInput } from './actions.js';
import { MediaLibraryPicker } from '../../features/media/MediaLibraryPicker.js';
import type { AdminCalendarEntry } from '../../lib/entities/events.js';
import { slugify } from '../../lib/entities/events.js';
import type { AdminMediaAsset } from '../../lib/entities/media.js';

const categoryOptions = EVENT_CATEGORY_META.map(({ key, label }) => ({ value: key, label }));
const localeOptions = SUPPORTED_LOCALES.map((value) => ({ value, label: LOCALE_LABELS[value] }));
const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

interface EventFormProps {
  mode: 'create' | 'edit';
  initial?: AdminCalendarEntry;
}

export function EventForm({ mode, initial }: EventFormProps) {
  const router = useRouter();

  const [locale, setLocale] = useState<LocaleEnumData>(initial?.locale ?? 'en');
  const [category, setCategory] = useState(initial?.category ?? 'academic');
  const [title, setTitle] = useState(initial?.title ?? '');
  const [date, setDate] = useState(initial?.date ?? '');
  const [isRecurring, setIsRecurring] = useState(initial?.isRecurring ?? false);
  const [recurrenceRule, setRecurrenceRule] = useState(initial?.recurrenceRule ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');

  const [hasDetail, setHasDetail] = useState(initial?.detail !== null && initial?.detail !== undefined);
  const [slug, setSlug] = useState(initial?.detail?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(mode === 'edit');
  const [description, setDescription] = useState(initial?.detail?.description ?? '');
  const [location, setLocation] = useState(initial?.detail?.location ?? '');
  const [isAllDay, setIsAllDay] = useState(initial?.detail?.isAllDay ?? false);
  const [startTime, setStartTime] = useState(initial?.detail?.startTime ?? '');
  const [registrationUrl, setRegistrationUrl] = useState(initial?.detail?.registrationUrl ?? '');
  const [status, setStatus] = useState(initial?.detail?.status ?? 'draft');
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.detail?.coverImage?.src ?? '');
  const [coverImageAlt, setCoverImageAlt] = useState(initial?.detail?.coverImage?.alt ?? '');
  const [imagePickerOpen, setImagePickerOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setTitleError(null);
    setDateError(null);
    setSlugError(null);
    setDescriptionError(null);

    let hasError = false;

    if (!title.trim()) {
      setTitleError('Title is required.');
      hasError = true;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      setDateError('Date is required.');
      hasError = true;
    }

    const normalizedSlug = slugify(slug);
    if (hasDetail) {
      if (!normalizedSlug) {
        setSlugError('Slug is required for an event with a card.');
        hasError = true;
      }
      if (!description.trim()) {
        setDescriptionError('Description is required for an event with a card.');
        hasError = true;
      }
    }

    if (hasError) return;

    setSubmitting(true);

    const payload: EventFormInput = {
      locale,
      title: title.trim(),
      date,
      category,
      isRecurring,
      recurrenceRule: isRecurring ? recurrenceRule.trim() || null : null,
      notes: notes.trim() || null,
      detail: hasDetail
        ? {
            slug: normalizedSlug,
            description: description.trim(),
            coverImageUrl: coverImageUrl.trim() || null,
            coverImageAlt: coverImageAlt.trim() || null,
            location: location.trim() || null,
            startTime: isAllDay ? null : startTime.trim() || null,
            isAllDay,
            registrationUrl: registrationUrl.trim() || null,
            status,
          }
        : null,
    };

    const result = mode === 'create' ? await createCalendarEntry(payload) : await updateCalendarEntry(initial!.id, payload);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push('/events');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-space-8">
      {error && (
        <div role="alert" className="rounded-md border border-semantic-error-base bg-surface-elevated px-space-4 py-space-3 text-body text-semantic-error-base">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-space-6 md:grid-cols-2">
        <Select label="Locale" required options={localeOptions} value={locale} onChange={(e) => setLocale(e.target.value as LocaleEnumData)} disabled={mode === 'edit'} helperText={mode === 'edit' ? 'Locale cannot be changed after creation — create a separate calendar entry for another language instead.' : 'Which language this calendar entry is written in.'} />
        <Select label="Category" required options={categoryOptions} value={category} onChange={(e) => setCategory(e.target.value as typeof category)} />
      </div>

      <Input label="Title" required value={title} error={titleError ?? undefined} onChange={(e) => handleTitleChange(e.target.value)} placeholder="e.g. Sports Day 2026" />

      <div className="grid grid-cols-1 gap-space-6 md:grid-cols-2">
        <Input label="Date" type="date" required value={date} error={dateError ?? undefined} onChange={(e) => setDate(e.target.value)} />
        <div className="flex flex-col gap-space-3">
          <Toggle label="Recurring" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} />
          {isRecurring && <Input label="Recurrence rule" value={recurrenceRule} onChange={(e) => setRecurrenceRule(e.target.value)} placeholder="e.g. Every Monday" helperText="Free text — shown to editors, not parsed." />}
        </div>
      </div>

      <Textarea label="Internal notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} helperText="Admin-only — never shown on the public site." />

      <div className="flex flex-col gap-space-6 rounded-md border border-border-default p-space-6">
        <Toggle label="Add event details (publish a card on the Events page)" checked={hasDetail} onChange={(e) => setHasDetail(e.target.checked)} />

        {!hasDetail && <p className="font-body text-caption text-text-muted">This entry will only appear on the calendar grid — no public card or detail page.</p>}

        {hasDetail && (
          <>
            <Input
              label="Slug"
              required
              value={slug}
              error={slugError ?? undefined}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              helperText="Used in the event's URL — lowercase letters, numbers, and hyphens only."
            />

            <Textarea label="Description" required value={description} error={descriptionError ?? undefined} onChange={(e) => setDescription(e.target.value)} rows={4} />

            <div className="grid grid-cols-1 gap-space-6 md:grid-cols-2">
              <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. School Main Hall" />
              <Select label="Status" required options={statusOptions} value={status} onChange={(e) => setStatus(e.target.value as typeof status)} />
            </div>

            <div className="grid grid-cols-1 gap-space-6 md:grid-cols-2">
              <div className="flex flex-col gap-space-3">
                <Toggle label="All-day" checked={isAllDay} onChange={(e) => setIsAllDay(e.target.checked)} />
                {!isAllDay && <Input label="Start time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />}
              </div>
              <Input label="Registration link" type="url" value={registrationUrl} onChange={(e) => setRegistrationUrl(e.target.value)} placeholder="https://…" helperText="Optional — shown as a button on the event detail page." />
            </div>

            <div className="flex flex-col gap-space-2">
              <span className="font-body text-label uppercase tracking-label text-text-primary">Cover image</span>
              {coverImageUrl ? (
                <div className="flex items-center gap-space-4">
                  <div className="relative h-space-16 w-space-24 shrink-0 overflow-hidden rounded-sm border border-border-default">
                    {/* eslint-disable-next-line @next/next/no-img-element -- see NewsForm.tsx's identical note: next/image would throw for a host outside next.config's remotePatterns. */}
                    <img src={coverImageUrl} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-space-2">
                    <Button type="button" variant="secondary" size="sm" onClick={() => setImagePickerOpen(true)}>
                      Change cover image
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCoverImageUrl('');
                        setCoverImageAlt('');
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
              {coverImageUrl && <Input label="Cover image alt text" value={coverImageAlt} onChange={(e) => setCoverImageAlt(e.target.value)} placeholder={title || 'Describe the image for screen readers'} />}
            </div>

            <MediaLibraryPicker
              open={imagePickerOpen}
              onClose={() => setImagePickerOpen(false)}
              onSelect={(asset: AdminMediaAsset) => {
                setCoverImageUrl(asset.url);
                setImagePickerOpen(false);
              }}
              folder="images"
              title="Choose cover image"
            />
          </>
        )}
      </div>

      <div className="flex items-center gap-space-4 border-t border-border-default pt-space-6">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving…' : mode === 'create' ? 'Add calendar entry' : 'Save changes'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push('/events')} disabled={submitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
