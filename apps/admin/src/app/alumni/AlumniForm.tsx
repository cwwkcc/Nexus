'use client';

// apps/admin/src/app/alumni/AlumniForm.tsx
//
// Shared create/edit form (Task 7.18, F-154/F-180). Mirrors
// apps/admin/src/app/staff/StaffForm.tsx's shape: one component for both
// modes, a MediaLibraryPicker for the image field, and every action
// returning an ActionResult shown inline instead of thrown.
//
// Unlike StaffForm, this form includes a status field (PENDING/APPROVED/REJECTED)
// for the moderation workflow. Admin-direct entries can be set to APPROVED
// immediately, while public submissions default to PENDING.

import { ALStreamEnum, AlumniStatusEnum, type ALStreamEnumData, type AlumniStatusEnumData } from '@nexus/contracts';
import { Button, Input, Select, Textarea } from '@nexus/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createAlumniProfile, updateAlumniProfile, type AlumniFormInput } from './actions.js';
import { MediaLibraryPicker } from '../../features/media/MediaLibraryPicker.js';
import type { AdminMediaAsset } from '../../lib/media.js';
import { ALUMNI_STATUS_LABELS, type AdminAlumni } from '../../lib/alumni.js';

const streamOptions = [{ value: '', label: '— Unknown —' }, ...ALStreamEnum.options.map((value) => ({ value, label: value }))];
const statusOptions = AlumniStatusEnum.options.map((value) => ({ value, label: ALUMNI_STATUS_LABELS[value as AlumniStatusEnumData] }));

interface AlumniFormProps {
  mode: 'create' | 'edit';
  initial?: AdminAlumni;
}

export function AlumniForm({ mode, initial }: AlumniFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initial?.name ?? '');
  const [graduationYear, setGraduationYear] = useState(initial?.graduationYear ?? '');
  const [stream, setStream] = useState<ALStreamEnumData | ''>(initial?.stream ?? '');
  const [currentRole, setCurrentRole] = useState(initial?.currentRole ?? '');
  const [currentOrg, setCurrentOrg] = useState(initial?.currentOrg ?? '');
  const [quote, setQuote] = useState(initial?.quote ?? '');
  const [isFeatureworthy, setIsFeatureworthy] = useState(initial?.isFeatureworthy ?? false);
  const [status, setStatus] = useState<AlumniStatusEnumData>(initial?.status ?? 'PENDING');
  const [rejectionReason, setRejectionReason] = useState(initial?.rejectionReason ?? '');
  const [portraitUrl, setPortraitUrl] = useState(initial?.portrait?.src ?? '');
  const [portraitAlt, setPortraitAlt] = useState(initial?.portrait?.alt ?? '');
  const [imagePickerOpen, setImagePickerOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [graduationYearError, setGraduationYearError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setNameError(null);
    setGraduationYearError(null);

    const trimmedName = name.trim();
    const trimmedGraduationYear = graduationYear.trim();
    let hasError = false;

    if (!trimmedName) {
      setNameError('Name is required.');
      hasError = true;
    }
    if (!trimmedGraduationYear) {
      setGraduationYearError('Graduation year is required.');
      hasError = true;
    }
    if (hasError) return;

    setSubmitting(true);

    const payload: AlumniFormInput = {
      name: trimmedName,
      graduationYear: trimmedGraduationYear,
      stream: stream || null,
      currentRole: currentRole.trim() || null,
      currentOrg: currentOrg.trim() || null,
      quote: quote.trim() || null,
      isFeatureworthy,
      status,
      rejectionReason: rejectionReason.trim() || null,
      portraitUrl: portraitUrl.trim() || null,
      portraitAlt: portraitAlt.trim() || null,
    };

    const result = mode === 'create' ? await createAlumniProfile(payload) : await updateAlumniProfile(initial!.id, payload);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push('/alumni');
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
        <Input label="Name" required value={name} error={nameError ?? undefined} onChange={(e) => setName(e.target.value)} placeholder="e.g. Kamal Perera" />
        <Input label="Graduation Year" required value={graduationYear} error={graduationYearError ?? undefined} onChange={(e) => setGraduationYear(e.target.value)} placeholder="e.g. 2020" />
      </div>

      <div className="grid grid-cols-1 gap-space-6 md:grid-cols-2">
        <Select label="Stream" options={streamOptions} value={stream} onChange={(e) => setStream(e.target.value as ALStreamEnumData | '')} helperText="Optional — A/L stream if known." />
        <Select label="Status" options={statusOptions} value={status} onChange={(e) => setStatus(e.target.value as AlumniStatusEnumData)} helperText="Admin-direct entries can be APPROVED immediately; public submissions default to PENDING." />
      </div>

      <div className="grid grid-cols-1 gap-space-6 md:grid-cols-2">
        <Input label="Current Role" value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} placeholder="e.g. Software Engineer" helperText="Optional — shown on directory cards." />
        <Input label="Current Organization" value={currentOrg} onChange={(e) => setCurrentOrg(e.target.value)} placeholder="e.g. Google" helperText="Optional — shown on directory cards." />
      </div>

      <Textarea label="Quote" value={quote} onChange={(e) => setQuote(e.target.value)} rows={2} helperText="Optional — featured alumni quote for the homepage." />

      {status === 'REJECTED' && <Textarea label="Rejection Reason" value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} rows={2} helperText="Optional — logged for audit purposes when rejecting a submission." />}

      <div className="flex items-center gap-space-3">
        <input type="checkbox" id="isFeatureworthy" checked={isFeatureworthy} onChange={(e) => setIsFeatureworthy(e.target.checked)} className="w-4 h-4" />
        <label htmlFor="isFeatureworthy" className="text-body">
          Feature on homepage (approved profiles only)
        </label>
      </div>

      <div className="flex flex-col gap-space-2">
        <span className="font-body text-label uppercase tracking-label text-text-primary">Portrait</span>
        {portraitUrl ? (
          <div className="flex items-center gap-space-4">
            <div className="relative h-space-16 w-space-16 shrink-0 overflow-hidden rounded-full border border-border-default">
              {/* eslint-disable-next-line @next/next/no-img-element -- see StaffForm.tsx's identical note: next/image would throw for a host outside next.config's remotePatterns. */}
              <img src={portraitUrl} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-space-2">
              <Button type="button" variant="secondary" size="sm" onClick={() => setImagePickerOpen(true)}>
                Change portrait
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setPortraitUrl('');
                  setPortraitAlt('');
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
        {portraitUrl && <Input label="Portrait alt text" value={portraitAlt} onChange={(e) => setPortraitAlt(e.target.value)} placeholder={name || 'Describe the photo for screen readers'} helperText="Defaults to the person's name if left blank." />}
      </div>

      <MediaLibraryPicker
        open={imagePickerOpen}
        onClose={() => setImagePickerOpen(false)}
        onSelect={(asset: AdminMediaAsset) => {
          setPortraitUrl(asset.url);
          setImagePickerOpen(false);
        }}
        folder="avatars"
        title="Choose portrait"
      />

      <div className="flex items-center gap-space-4 border-t border-border-default pt-space-6">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving…' : mode === 'create' ? 'Add alumni profile' : 'Save changes'}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.push('/alumni')} disabled={submitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
