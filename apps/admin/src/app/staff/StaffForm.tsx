'use client';

// apps/admin/src/app/staff/StaffForm.tsx
//
// Shared create/edit form (M4, Task 7.4, F-165). Mirrors
// apps/admin/src/app/news/NewsForm.tsx's shape: one component for both
// modes, a MediaLibraryPicker for the image field, and every action
// returning an ActionResult shown inline instead of thrown.
//
// Unlike NewsForm, there's no draft/published Select here — the Staff
// Module has no status field at all (see schema.prisma's Staff model doc
// comment): every row this form saves is immediately live on the public
// site.

import { DepartmentKeyEnum, STAFF_ROLE_LABELS, StaffRoleEnum, type StaffRoleEnumData, type DepartmentKeyEnumData } from '@nexus/contracts';
import { Button, Input, Select, Textarea } from '@nexus/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createStaffMember, updateStaffMember, type StaffFormInput } from './actions.js';
import { MediaLibraryPicker } from '../../features/media/MediaLibraryPicker.js';
import type { AdminMediaAsset } from '../../lib/entities/media.js';
import { titleCaseFromKey, type AdminStaff } from '../../lib/entities/staff.js';

const roleOptions = StaffRoleEnum.options.map((value) => ({ value, label: STAFF_ROLE_LABELS[value] }));
const departmentOptions = [{ value: '', label: '— None —' }, ...DepartmentKeyEnum.options.map((value) => ({ value, label: titleCaseFromKey(value) }))];

interface StaffFormProps {
  mode: 'create' | 'edit';
  initial?: AdminStaff;
}

export function StaffForm({ mode, initial }: StaffFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initial?.name ?? '');
  const [role, setRole] = useState<StaffRoleEnumData>(initial?.role ?? 'teacher');
  const [title, setTitle] = useState(initial?.title ?? '');
  const [department, setDepartment] = useState<DepartmentKeyEnumData | ''>(initial?.department ?? '');
  const [portfolio, setPortfolio] = useState(initial?.portfolio ?? '');
  const [tenure, setTenure] = useState(initial?.tenure ?? '');
  const [quote, setQuote] = useState(initial?.quote ?? '');
  const [bio, setBio] = useState(initial?.bio ?? '');
  const [contactEmail, setContactEmail] = useState(initial?.contactEmail ?? '');
  const [joinedYear, setJoinedYear] = useState(initial?.joinedYear ?? '');
  const [portraitUrl, setPortraitUrl] = useState(initial?.portrait?.src ?? '');
  const [portraitAlt, setPortraitAlt] = useState(initial?.portrait?.alt ?? '');
  const [imagePickerOpen, setImagePickerOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setNameError(null);
    setTitleError(null);

    const trimmedName = name.trim();
    const trimmedTitle = title.trim();
    let hasError = false;

    if (!trimmedName) {
      setNameError('Name is required.');
      hasError = true;
    }
    if (!trimmedTitle) {
      setTitleError('Title is required.');
      hasError = true;
    }
    if (hasError) return;

    setSubmitting(true);

    const payload: StaffFormInput = {
      name: trimmedName,
      role,
      title: trimmedTitle,
      department: department || null,
      portfolio: portfolio.trim() || null,
      tenure: tenure.trim() || null,
      quote: quote.trim() || null,
      bio: bio.trim() || null,
      portraitUrl: portraitUrl.trim() || null,
      portraitAlt: portraitAlt.trim() || null,
      contactEmail: contactEmail.trim() || null,
      joinedYear: joinedYear.trim() || null,
    };

    const result = mode === 'create' ? await createStaffMember(payload) : await updateStaffMember(initial!.id, payload);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push('/staff');
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
        <Select label="Role" required options={roleOptions} value={role} onChange={(e) => setRole(e.target.value as StaffRoleEnumData)} helperText="Controls where this person appears on the Administration page and the list's role grouping." />
        <Select label="Department" options={departmentOptions} value={department} onChange={(e) => setDepartment(e.target.value as DepartmentKeyEnumData | '')} helperText="Optional — not every role belongs to an academic department." />
      </div>

      <Input label="Name" required value={name} error={nameError ?? undefined} onChange={(e) => setName(e.target.value)} placeholder="e.g. Mrs. Tharindrie Perera" />

      <Input label="Title" required value={title} error={titleError ?? undefined} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Deputy Principal (Academic)" />

      <div className="grid grid-cols-1 gap-space-6 md:grid-cols-2">
        <Input label="Portfolio" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="e.g. Head of Mathematics Department" helperText="Optional — shown under the name on grid cards." />
        <Input label="Tenure" value={tenure} onChange={(e) => setTenure(e.target.value)} placeholder="e.g. 12 years at KCC" />
      </div>

      <div className="grid grid-cols-1 gap-space-6 md:grid-cols-2">
        <Input label="Contact email" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="e.g. name@cwwkcc.lk" />
        <Input label="Joined year" value={joinedYear} onChange={(e) => setJoinedYear(e.target.value)} placeholder="e.g. 2014" />
      </div>

      <Textarea label="Quote" value={quote} onChange={(e) => setQuote(e.target.value)} rows={2} helperText="Shown on the principal's message banner, if this person is the principal." />

      <Textarea label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} helperText="Longer biography for a future staff profile page." />

      <div className="flex flex-col gap-space-2">
        <span className="font-body text-label uppercase tracking-label text-text-primary">Portrait</span>
        {portraitUrl ? (
          <div className="flex items-center gap-space-4">
            <div className="relative h-space-16 w-space-16 shrink-0 overflow-hidden rounded-full border border-border-default">
              {/* eslint-disable-next-line @next/next/no-img-element -- see NewsForm.tsx's identical note: next/image would throw for a host outside next.config's remotePatterns. */}
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
          {submitting ? 'Saving…' : mode === 'create' ? 'Add staff member' : 'Save changes'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push('/staff')} disabled={submitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
