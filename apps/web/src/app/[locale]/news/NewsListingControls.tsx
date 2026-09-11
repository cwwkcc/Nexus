'use client';

// apps/web/src/app/[locale]/news/NewsListingControls.tsx
//
// F-143: search input, category filter, and pagination for the public News
// listing. Pushes into the URL (?category=&q=&page=) so the server
// component re-fetches via getNewsListing — real pagination against the
// actual result set, not a client-side slice.

import { NEWS_CATEGORIES, type LocaleEnumData } from '@nexus/contracts';
import { Input, Pagination, Select } from '@nexus/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

import type { NewsStrings } from '../../../lib/i18n/news';

interface NewsListingControlsProps {
  locale: LocaleEnumData;
  strings: NewsStrings;
  currentCategory: string;
  currentQuery: string;
  page: number;
  totalPages: number;
}

export function NewsListingControls({ locale, strings, currentCategory, currentQuery, page, totalPages }: NewsListingControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [query, setQuery] = useState(currentQuery);

  const categoryOptions = [{ value: 'all', label: strings.allCategories }, ...Object.entries(NEWS_CATEGORIES).map(([value, label]) => ({ value, label }))];

  const pushParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value && value !== 'all') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    if (!('page' in updates)) {
      params.delete('page');
    }
    startTransition(() => {
      router.push(`/${locale}/news?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col gap-space-6">
      <div className="flex flex-col gap-space-4 sm:flex-row sm:items-end">
        <form
          className="flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            pushParams({ q: query });
          }}
        >
          <Input label={strings.searchPlaceholder} placeholder={strings.searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} type="search" />
        </form>
        <Select label={strings.allCategories} options={categoryOptions} value={currentCategory} onChange={(e) => pushParams({ category: e.target.value })} className="w-full sm:w-64" />
      </div>

      {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={(next) => pushParams({ page: String(next) })} />}
    </div>
  );
}
