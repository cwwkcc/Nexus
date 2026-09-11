'use client';

// apps/web/src/app/[locale]/gallery/GalleryListingControls.tsx
//
// F-151: "Albums sorted by year... Year-based filtering." Category isn't
// filterable here — GalleryAlbum.category is free text with no fixed
// taxonomy (schema.prisma's own doc comment on why), and F-151's spec
// only calls for year-based filtering, not a category one. Pushes into
// the URL (?year=) so the server component re-filters, matching every
// other listing controls component's convention.

import { Select } from '@nexus/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

import type { GalleryStrings } from '../../../lib/i18n/gallery';

interface GalleryListingControlsProps {
  locale: string;
  strings: GalleryStrings;
  currentYear: string;
  availableYears: number[];
}

export function GalleryListingControls({ locale, strings, currentYear, availableYears }: GalleryListingControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const yearOptions = [{ value: 'all', label: strings.allYears }, ...availableYears.map((year) => ({ value: String(year), label: String(year) }))];

  const handleYearChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set('year', value);
    } else {
      params.delete('year');
    }
    startTransition(() => {
      router.push(`/${locale}/gallery?${params.toString()}`);
    });
  };

  return (
    <div className="flex justify-end">
      <Select label={strings.allYears} options={yearOptions} value={currentYear} onChange={(e) => handleYearChange(e.target.value)} className="w-full sm:w-48" />
    </div>
  );
}
