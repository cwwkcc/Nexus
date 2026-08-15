'use client';

// apps/admin/src/app/extracurriculars/ActivityForm.tsx
//
// Shared create/edit form (Task 7.17, F-179). Mirrors SocietyForm.tsx's
// shape most closely for the single-entity fields (locale/name/category/
// description, a staff picker for the coach, a single Media Library photo
// picker) — F-179 explicitly describes this module as "identical shape to
// the Societies Module." The one real structural addition is
// `achievements`, a nested array of local form state edited and submitted
// together, the same reconcile-on-save pattern AlbumForm.tsx's `photos`
// established (see packages/api/src/modules/extracurriculars/
// validators.ts's header comment for exactly why achievements aren't
// separate mutations). Each achievement needs a stable React key that
// survives before it has a real database `id` — `clientKey` is generated
// once per entry and never sent to the server, the same convention
// AlbumForm.tsx's photos use.
//
// No move up/down for achievements (contrast with AlbumForm.tsx's
// photos): the public/admin achievement list is always sorted by date
// (most recent first) at the service layer — see schema.prisma's
// ExtracurricularActivity doc comment on why there's no `order` field —
// so there's nothing for manual reordering to control.

import { EXTRACURRICULAR_CATEGORY_META, LOCALE_LABELS, SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { Button, Input, Select, Textarea, Toggle } from '@nexus/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createActivity, updateActivity, type ActivityAchievementFormInput, type ActivityFormInput } from './actions.js';
import { MediaLibraryPicker } from '../../features/media/MediaLibraryPicker.js';
import { ACHIEVEMENT_LEVEL_OPTIONS, type AdminActivity } from '../../lib/extracurriculars.js';
import type { AdminMediaAsset } from '../../lib/media.js';

const categoryOptions = EXTRACURRICULAR_CATEGORY_META.map(({ key, label }) => ({ value: key, label }));
const localeOptions = SUPPORTED_LOCALES.map((value) => ({ value, label: LOCALE_LABELS[value] }));
const levelOptions = ACHIEVEMENT_LEVEL_OPTIONS.map(({ value, label }) => ({ value, label }));

interface AchievementFormState extends ActivityAchievementFormInput {
  clientKey: string;
}

interface StaffOption {
  id: string;
  name: string;
  title: string;
}

interface ActivityFormProps {
  mode: 'create' | 'edit';
  initial?: AdminActivity;
  staffOptions: StaffOption[];
}

function newClientKey(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `achievement-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function blankAchievement(): AchievementFormState {
  return { clientKey: newClientKey(), title: '', description: '', level: 'school', date: '', awardedBy: '' };
}

export function ActivityForm({ mode, initial, staffOptions }: ActivityFormProps) {
  const router = useRouter();

  const [locale, setLocale] = useState<LocaleEnumData>(initial?.locale ?? 'en');
  const [name, setName] = useState(initial?.name ?? '');
  const [category, setCategory] = useState(initial?.category ?? 'sports');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [studentQuote, setStudentQuote] = useState(initial?.studentQuote ?? '');
  const [season, setSeason] = useState(initial?.season ?? '');
  const [coachStaffId, setCoachStaffId] = useState(initial?.coachStaffId ?? '');
  const [photoUrl, setPhotoUrl] = useState(initial?.photo?.src ?? '');
  const [photoAlt, setPhotoAlt] = useState(initial?.photo?.alt ?? '');
  const [photoPickerOpen, setPhotoPickerOpen] = useState(false);
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);
  const [achievements, setAchievements] = useState<AchievementFormState[]>(() => (initial?.achievements ?? []).map((a) => ({ clientKey: newClientKey(), id: a.id, title: a.title, description: a.description ?? '', level: a.level, date: a.date, awardedBy: a.awardedBy ?? '' })));

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [achievementErrors, setAchievementErrors] = useState<Record<string, string>>({});

  const coachOptions = [{ value: '', label: 'No coach assigned' }, ...staffOptions.map((s) => ({ value: s.id, label: `${s.name} — ${s.title}` }))];

  const updateAchievement = (clientKey: string, patch: Partial<AchievementFormState>) => {
    setAchievements((prev) => prev.map((a) => (a.clientKey === clientKey ? { ...a, ...patch } : a)));
  };

  const removeAchievement = (clientKey: string) => {
    setAchievements((prev) => prev.filter((a) => a.clientKey !== clientKey));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setNameError(null);
    setDescriptionError(null);
    setAchievementErrors({});

    let hasError = false;

    if (!name.trim()) {
      setNameError('Name is required.');
      hasError = true;
    }
    if (!description.trim()) {
      setDescriptionError('Description is required.');
      hasError = true;
    }

    const nextAchievementErrors: Record<string, string> = {};
    for (const achievement of achievements) {
      if (!achievement.title.trim() || !achievement.date.trim()) {
        nextAchievementErrors[achievement.clientKey] = 'Title and date are required for every achievement.';
        hasError = true;
      }
    }
    setAchievementErrors(nextAchievementErrors);

    if (hasError) return;

    setSubmitting(true);

    const payload: ActivityFormInput = {
      locale,
      name: name.trim(),
      category,
      description: description.trim(),
      studentQuote: studentQuote.trim() || null,
      season: season.trim() || null,
      coachStaffId: coachStaffId || null,
      photoUrl: photoUrl.trim() || null,
      photoAlt: photoAlt.trim() || null,
      isActive,
      achievements: achievements.map(({ clientKey: _clientKey, ...achievement }) => ({
        ...achievement,
        description: achievement.description?.trim() || null,
        awardedBy: achievement.awardedBy?.trim() || null,
      })),
    };

    const result = mode === 'create' ? await createActivity(payload) : await updateActivity(initial!.id, payload);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push('/extracurriculars');
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
        <Select label="Locale" required options={localeOptions} value={locale} onChange={(e) => setLocale(e.target.value as LocaleEnumData)} disabled={mode === 'edit'} helperText={mode === 'edit' ? 'Locale cannot be changed after creation — create a separate activity for another language instead.' : 'Which language this activity profile is written in.'} />
        <Select label="Category" required options={categoryOptions} value={category} onChange={(e) => setCategory(e.target.value as typeof category)} />
      </div>

      <Input label="Name" required value={name} error={nameError ?? undefined} onChange={(e) => setName(e.target.value)} placeholder="e.g. Cricket, Western Band, Scouts" />

      <Textarea label="Description" required value={description} error={descriptionError ?? undefined} onChange={(e) => setDescription(e.target.value)} rows={4} />

      <div className="grid grid-cols-1 gap-space-6 md:grid-cols-2">
        <Input label="Season" value={season} onChange={(e) => setSeason(e.target.value)} placeholder="e.g. Jan – Mar term" helperText="Optional — shown on the card if set." />
        <Select label="Coach / advisor" options={coachOptions} value={coachStaffId} onChange={(e) => setCoachStaffId(e.target.value)} helperText="Shown as the teacher-in-charge on the activity's card." />
      </div>

      <Textarea label="Student quote" value={studentQuote} onChange={(e) => setStudentQuote(e.target.value)} rows={2} helperText="Optional — only rendered on the Performing Arts card variant." />

      <div className="flex flex-col gap-space-2">
        <span className="font-body text-label uppercase tracking-label text-text-primary">Photo</span>
        {photoUrl ? (
          <div className="flex items-center gap-space-4">
            <div className="relative h-space-16 w-space-24 shrink-0 overflow-hidden rounded-sm border border-border-default">
              {/* eslint-disable-next-line @next/next/no-img-element -- admin-supplied absolute Media Library URL, same reasoning as SocietyForm.tsx's logo/banner previews. */}
              <img src={photoUrl} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-space-2">
              <Button type="button" variant="secondary" size="sm" onClick={() => setPhotoPickerOpen(true)}>
                Change photo
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setPhotoUrl('');
                  setPhotoAlt('');
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <Button type="button" variant="outline" onClick={() => setPhotoPickerOpen(true)}>
            Choose from Media Library
          </Button>
        )}
        {photoUrl && <Input label="Photo alt text" value={photoAlt} onChange={(e) => setPhotoAlt(e.target.value)} placeholder={name || 'Describe the image for screen readers'} />}
        <MediaLibraryPicker
          open={photoPickerOpen}
          onClose={() => setPhotoPickerOpen(false)}
          onSelect={(asset: AdminMediaAsset) => {
            setPhotoUrl(asset.url);
            setPhotoPickerOpen(false);
          }}
          folder="images"
          title="Choose photo"
        />
      </div>

      <div className="flex flex-col gap-space-2">
        <Toggle label="Active (shown on the public Extracurriculars page)" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        <p className="font-body text-caption text-text-secondary">Turn off to retire this activity without deleting its history.</p>
      </div>

      <div className="flex flex-col gap-space-4 rounded-md border border-border-default p-space-6">
        <div className="flex items-center justify-between">
          <span className="font-body text-label uppercase tracking-label text-text-primary">Achievements ({achievements.length})</span>
          <Button type="button" size="sm" variant="secondary" onClick={() => setAchievements((prev) => [...prev, blankAchievement()])}>
            + Add achievement
          </Button>
        </div>

        {achievements.length > 0 && (
          <ul className="flex flex-col gap-space-4">
            {achievements.map((achievement) => (
              <li key={achievement.clientKey} className="flex flex-col gap-space-3 rounded-md border border-border-default p-space-4">
                <div className="grid grid-cols-1 gap-space-3 md:grid-cols-2">
                  <Input label="Title" required value={achievement.title} error={achievementErrors[achievement.clientKey]} onChange={(e) => updateAchievement(achievement.clientKey, { title: e.target.value })} placeholder="e.g. Zonal Champions" />
                  <Input label="Date" type="date" required value={achievement.date} onChange={(e) => updateAchievement(achievement.clientKey, { date: e.target.value })} />
                </div>
                <div className="grid grid-cols-1 gap-space-3 md:grid-cols-2">
                  <Select label="Level" options={levelOptions} value={achievement.level} onChange={(e) => updateAchievement(achievement.clientKey, { level: e.target.value })} />
                  <Input label="Awarded by" value={achievement.awardedBy ?? ''} onChange={(e) => updateAchievement(achievement.clientKey, { awardedBy: e.target.value })} placeholder="e.g. Zonal Education Office" />
                </div>
                <Textarea label="Description (optional)" value={achievement.description ?? ''} onChange={(e) => updateAchievement(achievement.clientKey, { description: e.target.value })} rows={2} />
                <div>
                  <Button type="button" size="sm" variant="ghost" onClick={() => removeAchievement(achievement.clientKey)}>
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-space-4 border-t border-border-default pt-space-6">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving…' : mode === 'create' ? 'Add activity' : 'Save changes'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push('/extracurriculars')} disabled={submitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
