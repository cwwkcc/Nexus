'use client';

// apps/web/src/app/[locale]/archive/ArchivePagination.tsx
//
// Same fix and same reasoning as
// achievements/AchievementsPagination.tsx — see its comment.

import { Pagination } from '@nexus/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ArchivePaginationProps {
  currentPage: number;
  totalPages: number;
}

export function ArchivePagination({ currentPage, totalPages }: ArchivePaginationProps) {
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
