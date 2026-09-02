'use client';

// apps/web/src/app/[locale]/achievements/AchievementsPagination.tsx
//
// The page itself rendered "Page X of Y" as plain text with no way to
// actually move between pages — Pagination's onPageChange needs a real
// callback, which a server component can't pass down, so this thin client
// wrapper is what the page renders instead. usePathname() rather than a
// hardcoded '/achievements' so this doesn't need to know its own locale
// prefix.

import { Pagination } from '@nexus/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface AchievementsPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function AchievementsPagination({ currentPage, totalPages }: AchievementsPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page > 1) {
      params.set('page', String(page));
    } else {
      params.delete('page');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} className="mt-space-2" />;
}
