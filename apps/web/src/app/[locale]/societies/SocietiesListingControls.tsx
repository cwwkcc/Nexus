'use client';

// apps/web/src/app/[locale]/societies/SocietiesListingControls.tsx
//
// F-147: category filter for the Societies Hub. Pushes into the URL
// (?category=) so the server component re-fetches via getSocietyList,
// matching NewsListingControls.tsx's/EventsListingControls.tsx's shape —
// much simpler than either, since a Society has no month/date dimension
// to navigate.

import { SOCIETY_CATEGORY_META } from '@nexus/contracts';
import { Select } from '@nexus/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

import type { SocietiesStrings } from '../../../lib/i18n/societies';

interface SocietiesListingControlsProps {
  locale: string;
  strings: SocietiesStrings;
  currentCategory: string;
}

export function SocietiesListingControls({ locale, strings, currentCategory }: SocietiesListingControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const categoryOptions = [{ value: 'all', label: strings.allCategories }, ...SOCIETY_CATEGORY_META.map(({ key, label }) => ({ value: key, label }))];

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    startTransition(() => {
      router.push(`/${locale}/societies?${params.toString()}`);
    });
  };

  return (
    <div className="flex justify-end">
      <Select label={strings.allCategories} options={categoryOptions} value={currentCategory} onChange={(e) => handleCategoryChange(e.target.value)} className="w-full sm:w-56" />
    </div>
  );
}
