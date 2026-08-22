'use client';

// apps/web/src/blocks/alumni/SubmitProfileBlock.tsx
//
// Alumni submission form block (Task 7.18, F-140/F-180). Public form →
// alumniRouter.submit() → enters the admin approval queue.
//
// A collapsed "Submit your profile" button that reveals the form in place
// — no separate route/modal needed for a single-purpose form at the
// bottom of the directory page. Renders `AlumniSubmitForm` from
// `@nexus/ui` (a presentation-only component with no knowledge of any API
// route) and supplies the actual submit behaviour via the
// `submitAlumniProfile` server action.

import type { ALStreamEnumData } from '@nexus/contracts';
import { AlumniSubmitForm, type AlumniSubmitValues, Button } from '@nexus/ui';
import { useState } from 'react';

import { submitAlumniProfile } from '../../app/[locale]/alumni/actions';
import type { AlumniStrings } from '../../lib/alumni-i18n';

export interface SubmitProfileBlockProps {
  strings: AlumniStrings;
  /** A/L stream options for the form's Stream select — raw enum values as
   * both value and label, same as `apps/admin/src/app/alumni/
   * AlumniForm.tsx`'s equivalent select (no per-stream translation exists
   * yet, see this codebase's i18n docs on F-084's message-file system
   * still being unbuilt). */
  streamOptions: readonly ALStreamEnumData[];
}

export function SubmitProfileBlock({ strings, streamOptions }: SubmitProfileBlockProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: AlumniSubmitValues) => {
    // `AlumniSubmitForm`'s own values are plain strings (it has no
    // knowledge of `@nexus/contracts`' `ALStreamEnum` — see that
    // component's own header note) — the Select's own options are already
    // constrained to real `ALStreamEnumData` values (or '' for
    // "unknown"), so this narrowing is safe; the server still validates
    // it independently regardless.
    const result = await submitAlumniProfile({
      name: data.name,
      graduationYear: data.graduationYear,
      stream: (data.stream || undefined) as ALStreamEnumData | undefined,
      currentRole: data.currentRole || undefined,
      currentOrg: data.currentOrg || undefined,
      quote: data.quote || undefined,
    });

    if (!result.ok) {
      throw new Error(result.error);
    }
  };

  if (!isOpen) {
    return (
      <div className="flex justify-center border-t border-border-light pt-space-8">
        <Button variant="secondary" onClick={() => setIsOpen(true)}>
          {strings.submitProfile}
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border-light bg-surface-elevated p-space-8">
      <h2 className="mb-space-6 font-heading text-h4 text-text-primary">{strings.submitProfile}</h2>
      <AlumniSubmitForm
        onSubmit={handleSubmit}
        streamOptions={streamOptions.map((value) => ({ value, label: value }))}
        labels={{
          name: strings.name,
          namePlaceholder: strings.namePlaceholder,
          graduationYear: strings.graduationYear,
          graduationYearPlaceholder: strings.graduationYearPlaceholder,
          stream: strings.stream,
          streamUnknown: strings.streamUnknown,
          currentRole: strings.currentRole,
          currentOrg: strings.organization,
          quote: strings.quote,
          submit: strings.submitButton,
          successMessage: strings.submitSuccess,
          errorMessage: strings.submitError,
        }}
      />
    </div>
  );
}
