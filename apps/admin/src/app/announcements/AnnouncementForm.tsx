'use client';

// apps/admin/src/app/announcements/AnnouncementForm.tsx
//
// Shared create/edit form (Task 6.10/7.13, F-172). The simplest of the M4
// forms — no images, no nested lists — mirrors StaffForm.tsx's overall
// shape.

import { LOCALE_LABELS, SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { Button, Input, Select, Textarea, Toggle } from '@nexus/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createAnnouncement, updateAnnouncement, type AnnouncementFormInput } from './actions.js';
import { fromDateTimeLocalValue, toDateTimeLocalValue, type AdminAnnouncement } from '../../lib/announcements.js';

const localeOptions = SUPPORTED_LOCALES.map((value) => ({ value, label: LOCALE_LABELS[value] }));
const variantOptions = [
  { value: 'info', label: 'Info' },
  { value: 'warning', label: 'Warning' },
  { value: 'error', label: 'Error' },
];

interface AnnouncementFormProps {
  mode: 'create' | 'edit';
  initial?: AdminAnnouncement;
}

export function AnnouncementForm({ mode, initial }: AnnouncementFormProps) {
  const router = useRouter();

  const [locale, setLocale] = useState<LocaleEnumData>(initial?.locale ?? 'en');
  const [variant, setVariant] = useState(initial?.variant ?? 'info');
  const [message, setMessage] = useState(initial?.message ?? '');
  const [linkLabel, setLinkLabel] = useState(initial?.linkLabel ?? '');
  const [linkHref, setLinkHref] = useState(initial?.linkHref ?? '');
  const [publishAt, setPublishAt] = useState(initial ? toDateTimeLocalValue(initial.publishAt) : toDateTimeLocalValue(new Date().toISOString()));
  const [hasExpiry, setHasExpiry] = useState(initial?.expiresAt != null);
  const [expiresAt, setExpiresAt] = useState(initial?.expiresAt ? toDateTimeLocalValue(initial.expiresAt) : '');
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessageError(null);

    if (!message.trim()) {
      setMessageError('Message is required.');
      return;
    }

    setSubmitting(true);

    const payload: AnnouncementFormInput = {
      locale,
      variant,
      message: message.trim(),
      linkLabel: linkLabel.trim() || null,
      linkHref: linkHref.trim() || null,
      publishAt: fromDateTimeLocalValue(publishAt),
      expiresAt: hasExpiry && expiresAt ? fromDateTimeLocalValue(expiresAt) : null,
      isActive,
    };

    const result = mode === 'create' ? await createAnnouncement(payload) : await updateAnnouncement(initial!.id, payload);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push('/announcements');
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
        <Select label="Locale" required options={localeOptions} value={locale} onChange={(e) => setLocale(e.target.value as LocaleEnumData)} helperText="Which language this announcement is written in. A closure notice needs one row per language, same as every other translated content type." />
        <Select label="Variant" required options={variantOptions} value={variant} onChange={(e) => setVariant(e.target.value as typeof variant)} helperText="Controls the banner's color and icon on the public site." />
      </div>

      <Textarea label="Message" required value={message} error={messageError ?? undefined} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="e.g. School will be closed tomorrow due to inclement weather." />

      <div className="grid grid-cols-1 gap-space-6 md:grid-cols-2">
        <Input label="Link label (optional)" value={linkLabel} onChange={(e) => setLinkLabel(e.target.value)} placeholder="e.g. Read more" />
        <Input label="Link URL (optional)" type="url" value={linkHref} onChange={(e) => setLinkHref(e.target.value)} placeholder="https://…" />
      </div>

      <div className="grid grid-cols-1 gap-space-6 md:grid-cols-2">
        <Input label="Publish at" type="datetime-local" required value={publishAt} onChange={(e) => setPublishAt(e.target.value)} helperText="Defaults to now — set a future time to schedule it instead." />
        <div className="flex flex-col gap-space-3">
          <Toggle label="Has an expiry" checked={hasExpiry} onChange={(e) => setHasExpiry(e.target.checked)} />
          {hasExpiry && <Input label="Expires at" type="datetime-local" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />}
        </div>
      </div>

      <Toggle label="Active" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />

      <div className="flex items-center gap-space-4 border-t border-border-default pt-space-6">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving…' : mode === 'create' ? 'Create announcement' : 'Save changes'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push('/announcements')} disabled={submitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
