// apps/admin/src/app/alumni/page.tsx
//
// F-180 Alumni Module list (Task 7.18). Mirrors
// apps/admin/src/app/staff/page.tsx's shape: filterable by status,
// graduation year, and profession, with bulk approve/reject actions.
// Delegates the display to AlumniListClient.

import { AlumniListClient } from './AlumniListClient.js';
import { AdminShell } from '../../features/shell/AdminShell.js';
import { getServerCaller } from '../../lib/server-caller.js';

interface AlumniPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AlumniPage({ searchParams }: AlumniPageProps) {
  const params = await searchParams;
  const query = firstValue(params.q) ?? '';
  const status = firstValue(params.status) ?? 'all';
  const graduationYear = firstValue(params.graduationYear) ?? '';
  const profession = firstValue(params.profession) ?? '';

  const caller = await getServerCaller();
  const alumni = await caller.alumni.adminList({
    query,
    status: status === 'all' ? undefined : (status as 'PENDING' | 'APPROVED' | 'REJECTED'),
    graduationYear: graduationYear || undefined,
    profession: profession || undefined,
  });

  return (
    <AdminShell title="Alumni">
      <AlumniListClient alumni={alumni} currentQuery={query} currentStatus={status} currentGraduationYear={graduationYear} currentProfession={profession} />
    </AdminShell>
  );
}
