'use client';

// apps/admin/src/app/societies/SocietyForm.tsx
//
// Shared create/edit form (Task 7.6, F-167). Mirrors StaffForm.tsx's
// shape most closely — a single straightforward entity, no two-branch
// fork the way EventForm.tsx needs. `staffOptions` is fetched server-side
// (caller.staff.adminList({})) and passed in, powering the advisor
// picker — F-148's "advisor StaffCard" needs a real staff member id, not
// free text.

import { LOCALE_LABELS, SOCIETY_CATEGORY_META, SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { Button, Input, Select, Textarea, Toggle } from '@nexus/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createSociety, updateSociety, type SocietyFormInput } from './actions.js';
import { MediaLibraryPicker } from '../../features/media/MediaLibraryPicker.js';
import type { AdminSociety } from '../../lib/entities/societies.js';
import { slugify } from '../../lib/entities/societies.js';
import type { AdminMediaAsset } from '../../lib/entities/media.js';

const categoryOptions = SOCIETY_CATEGORY_META.map(({ key, label }) => ({ value: key, label }));
const localeOptions = SUPPORTED_LOCALES.map((value) => ({ value, label: LOCALE_LABELS[value] }));

interface StaffOption {
  id: string;
  name: string;
  title: string;
}

interface SocietyFormProps {
  mode: 'create' | 'edit';
  initial?: AdminSociety;
  staffOptions: StaffOption[];
}

export function SocietyForm({ mode, initial, staffOptions }: SocietyFormProps) {
  const router = useRouter();

  const [locale, setLocale] = useState<LocaleEnumData>(initial?.locale ?? 'en');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(mode === 'edit');
  const [name, setName] = useState(initial?.name ?? '');
  const [category, setCategory] = useState(initial?.category ?? 'academic');
  const [tagline, setTagline] = useState(initial?.tagline ?? '');
  const [foundingYear, setFoundingYear] = useState(initial?.foundingYear ?? '');
  const [memberCount, setMemberCount] = useState(initial?.memberCount != null ? String(initial.memberCount) : '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [meetingSchedule, setMeetingSchedule] = useState(initial?.meetingSchedule ?? '');
  const [howToJoin, setHowToJoin] = useState(initial?.howToJoin ?? '');
  const [isFeatured, setIsFeatured] = useState(initial?.isFeatured ?? false);
  const [advisorStaffId, setAdvisorStaffId] = useState(initial?.advisorStaffId ?? '');
  const [logoUrl, setLogoUrl] = useState(initial?.logo?.src ?? '');
  const [logoAlt, setLogoAlt] = useState(initial?.logo?.alt ?? '');
  const [bannerUrl, setBannerUrl] = useState(initial?.banner?.src ?? '');
  const [bannerAlt, setBannerAlt] = useState(initial?.banner?.alt ?? '');
  const [logoPickerOpen, setLogoPickerOpen] = useState(false);
  const [bannerPickerOpen, setBannerPickerOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  };

  const advisorOptions = [{ value: '', label: 'No advisor assigned' }, ...staffOptions.map((s) => ({ value: s.id, label: `${s.name} — ${s.title}` }))];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setNameError(null);
    setSlugError(null);

    let hasError = false;
    if (!name.trim()) {
      setNameError('Name is required.');
      hasError = true;
    }
    const normalizedSlug = slugify(slug);
    if (!normalizedSlug) {
      setSlugError('Slug is required.');
      hasError = true;
    }
    if (hasError) return;

    setSubmitting(true);

    const payload: SocietyFormInput = {
      locale,
      slug: normalizedSlug,
      name: name.trim(),
      tagline: tagline.trim() || null,
      category,
      foundingYear: foundingYear.trim() || null,
      description: description.trim() || null,
      meetingSchedule: meetingSchedule.trim() || null,
      memberCount: memberCount.trim() ? Number(memberCount) : null,
      howToJoin: howToJoin.trim() || null,
      logoUrl: logoUrl.trim() || null,
      logoAlt: logoAlt.trim() || null,
      bannerUrl: bannerUrl.trim() || null,
      bannerAlt: bannerAlt.trim() || null,
      isFeatured,
      advisorStaffId: advisorStaffId || null,
    };

    const result = mode === 'create' ? await createSociety(payload) : await updateSociety(initial!.id, payload);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push('/societies');
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
        <Select label="Locale" required options={localeOptions} value={locale} onChange={(e) => setLocale(e.target.value as LocaleEnumData)} disabled={mode === 'edit'} helperText={mode === 'edit' ? 'Locale cannot be changed after creation — create a separate society profile for another language instead.' : 'Which language this society profile is written in.'} />
        <Select label="Category" required options={categoryOptions} value={category} onChange={(e) => setCategory(e.target.value as typeof category)} />
      </div>

      <Input label="Name" required value={name} error={nameError ?? undefined} onChange={(e) => handleNameChange(e.target.value)} placeholder="e.g. Science Society" />

      <Input
        label="Slug"
        required
        value={slug}
        error={slugError ?? undefined}
        onChange={(e) => {
          setSlugTouched(true);
          setSlug(e.target.value);
        }}
        helperText="Used in the society's URL — lowercase letters, numbers, and hyphens only."
      />

      <Input label="Tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="One line describing the society" />

      <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />

      <div className="grid grid-cols-1 gap-space-6 md:grid-cols-3">
        <Input label="Founding year" value={foundingYear} onChange={(e) => setFoundingYear(e.target.value)} placeholder="e.g. 1998" />
        <Input label="Member count" type="number" value={memberCount} onChange={(e) => setMemberCount(e.target.value)} />
        <Select label="Advisor" options={advisorOptions} value={advisorStaffId} onChange={(e) => setAdvisorStaffId(e.target.value)} helperText="Shown as the advisor's StaffCard on the society's public page." />
      </div>

      <Input label="Meeting schedule" value={meetingSchedule} onChange={(e) => setMeetingSchedule(e.target.value)} placeholder="e.g. Every Wednesday, 2:30 PM, Science Lab" />

      <Textarea label="How to join" value={howToJoin} onChange={(e) => setHowToJoin(e.target.value)} rows={2} />

      <Toggle label="Featured (shown prominently on the Societies Hub)" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />

      <div className="grid grid-cols-1 gap-space-8 md:grid-cols-2">
        <div className="flex flex-col gap-space-2">
          <span className="font-body text-label uppercase tracking-label text-text-primary">Logo</span>
          {logoUrl ? (
            <div className="flex items-center gap-space-4">
              <div className="relative h-space-16 w-space-16 shrink-0 overflow-hidden rounded-sm border border-border-default">
                {/* eslint-disable-next-line @next/next/no-img-element -- admin-supplied absolute Media Library URL, same reasoning as EventForm.tsx's cover image preview. */}
                <img src={logoUrl} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col gap-space-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setLogoPickerOpen(true)}>
                  Change logo
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setLogoUrl('');
                    setLogoAlt('');
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <Button type="button" variant="outline" onClick={() => setLogoPickerOpen(true)}>
              Choose from Media Library
            </Button>
          )}
          {logoUrl && <Input label="Logo alt text" value={logoAlt} onChange={(e) => setLogoAlt(e.target.value)} placeholder={name || 'Describe the image for screen readers'} />}
          <MediaLibraryPicker
            open={logoPickerOpen}
            onClose={() => setLogoPickerOpen(false)}
            onSelect={(asset: AdminMediaAsset) => {
              setLogoUrl(asset.url);
              setLogoPickerOpen(false);
            }}
            folder="images"
            title="Choose logo"
          />
        </div>

        <div className="flex flex-col gap-space-2">
          <span className="font-body text-label uppercase tracking-label text-text-primary">Banner</span>
          {bannerUrl ? (
            <div className="flex items-center gap-space-4">
              <div className="relative h-space-16 w-space-24 shrink-0 overflow-hidden rounded-sm border border-border-default">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={bannerUrl} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col gap-space-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setBannerPickerOpen(true)}>
                  Change banner
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setBannerUrl('');
                    setBannerAlt('');
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <Button type="button" variant="outline" onClick={() => setBannerPickerOpen(true)}>
              Choose from Media Library
            </Button>
          )}
          {bannerUrl && <Input label="Banner alt text" value={bannerAlt} onChange={(e) => setBannerAlt(e.target.value)} placeholder={name || 'Describe the image for screen readers'} />}
          <MediaLibraryPicker
            open={bannerPickerOpen}
            onClose={() => setBannerPickerOpen(false)}
            onSelect={(asset: AdminMediaAsset) => {
              setBannerUrl(asset.url);
              setBannerPickerOpen(false);
            }}
            folder="images"
            title="Choose banner"
          />
        </div>
      </div>

      <div className="flex items-center gap-space-4 border-t border-border-default pt-space-6">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving…' : mode === 'create' ? 'Add society' : 'Save changes'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push('/societies')} disabled={submitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
