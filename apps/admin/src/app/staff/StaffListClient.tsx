'use client';

// apps/admin/src/app/staff/StaffListClient.tsx
//
// F-165: "list sorted by role hierarchy... drag-and-drop reorder." Search
// and role/department filters push into the URL (?q=&role=&department=) so
// the server component re-fetches via caller.staff.adminList — the same
// URL-driven-refetch convention NewsListClient.tsx uses, just without
// pagination (see lib/staff.ts's doc comment on why the Staff Module skips
// it — a single school's roster is small enough that it doesn't need it).
//
// Reordering uses native HTML5 drag-and-drop — no new dependency pulled in
// just for this one control — plus keyboard-accessible "Move up"/"Move
// down" buttons on every row. HTML5 drag-and-drop has no keyboard
// equivalent at all, so a drag-only control would be entirely unusable
// without a mouse or touchscreen; the buttons aren't a decorative extra,
// they're the only way a keyboard user can reorder anything here.
//
// A drop is only honored within the row's own role group (`groupIds`
// always comes from the same group the dragged row started in) — dragging
// a row from "Teacher" onto "Principal" would silently change someone's
// role, which isn't what dragging a list item means; changing role is an
// edit, done through the form, not a side effect of reordering.

import { DepartmentKeyEnum, STAFF_ROLE_LABELS, StaffRoleEnum } from '@nexus/contracts';
import { Button, Input, Select } from '@nexus/ui';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';

import { deleteStaffMember, reorderStaffMembers } from './actions.js';
import { groupStaffByRole, moveStaffId, titleCaseFromKey, type AdminStaff } from '../../lib/staff.js';

const roleOptions = [{ value: 'all', label: 'All roles' }, ...StaffRoleEnum.options.map((value) => ({ value, label: STAFF_ROLE_LABELS[value] }))];
const departmentOptions = [{ value: 'all', label: 'All departments' }, ...DepartmentKeyEnum.options.map((value) => ({ value, label: titleCaseFromKey(value) }))];

interface StaffListClientProps {
  staff: AdminStaff[];
  currentQuery: string;
  currentRole: string;
  currentDepartment: string;
}

export function StaffListClient({ staff, currentQuery, currentRole, currentDepartment }: StaffListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  // Hard delete is admin-role-only server-side (see
  // packages/api/src/modules/staff/router.ts) — hiding the button for an
  // Editor avoids a click that's guaranteed to be rejected, but the server
  // check is still what actually enforces it.
  const canDelete = session?.user?.role === 'admin';

  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(currentQuery);
  const [actionError, setActionError] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const groups = groupStaffByRole(staff);

  const pushParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    startTransition(() => {
      router.push(`/staff?${params.toString()}`);
    });
  };

  const commitReorder = async (role: string, orderedIds: string[]) => {
    setActionError(null);
    const result = await reorderStaffMembers(role, orderedIds);
    if (!result.ok) {
      setActionError(result.error);
      return;
    }
    router.refresh();
  };

  const moveRow = (role: string, groupIds: string[], id: string, direction: -1 | 1) => {
    void commitReorder(role, moveStaffId(groupIds, id, groupIds.indexOf(id) + direction));
  };

  const handleDrop = (role: string, groupIds: string[], targetId: string) => {
    const sourceId = draggingId;
    setDraggingId(null);
    if (!sourceId || sourceId === targetId || !groupIds.includes(sourceId)) {
      return;
    }
    void commitReorder(role, moveStaffId(groupIds, sourceId, groupIds.indexOf(targetId)));
  };

  const runDelete = async (member: AdminStaff) => {
    if (!window.confirm(`Remove ${member.name} from the Staff Module? This cannot be undone.`)) {
      return;
    }
    setActionError(null);
    const result = await deleteStaffMember(member.id);
    if (!result.ok) {
      setActionError(result.error);
      return;
    }
    router.refresh();
  };

  return (
    <div className="gap-space-6 flex flex-col">
      <div className="gap-space-4 flex flex-col md:flex-row md:items-end">
        <form
          className="flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            pushParams({ q: query });
          }}
        >
          <Input label="Search" placeholder="Search by name, title, or portfolio…" value={query} onChange={(e) => setQuery(e.target.value)} type="search" />
        </form>
        <Select label="Role" options={roleOptions} value={currentRole} onChange={(e) => pushParams({ role: e.target.value })} className="w-full md:w-56" />
        <Select label="Department" options={departmentOptions} value={currentDepartment} onChange={(e) => pushParams({ department: e.target.value })} className="w-full md:w-56" />
        <Button type="button" variant="secondary" onClick={() => router.push('/staff/new')}>
          New staff member
        </Button>
      </div>

      {actionError && (
        <div role="alert" className="border-semantic-error-base bg-surface-elevated px-space-4 py-space-3 text-body text-semantic-error-base rounded-md border">
          {actionError}
        </div>
      )}

      <div className={isPending ? 'opacity-50 transition-opacity flex flex-col gap-space-8' : 'transition-opacity flex flex-col gap-space-8'}>
        {groups.length === 0 ? (
          <div className="border-border-default px-space-6 py-space-8 text-body text-text-muted rounded-md border border-dashed text-center">No staff match these filters.</div>
        ) : (
          groups.map((group) => {
            const groupIds = group.members.map((member) => member.id);

            return (
              <section key={group.role} className="flex flex-col gap-space-3">
                <h2 className="font-body text-label uppercase tracking-label text-text-muted">
                  {group.label} <span className="text-text-subtle">({group.members.length})</span>
                </h2>
                <div className="border-border-default overflow-hidden rounded-md border">
                  <table className="w-full border-collapse text-left">
                    <thead className="bg-surface-default">
                      <tr>
                        <th className="w-space-9 px-space-4 py-space-3" aria-hidden="true" />
                        <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Name</th>
                        <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Title</th>
                        <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Department</th>
                        <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Order</th>
                        <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.members.map((member, index) => (
                        <tr key={member.id} draggable onDragStart={() => setDraggingId(member.id)} onDragEnd={() => setDraggingId(null)} onDragOver={(e) => e.preventDefault()} onDrop={() => handleDrop(group.role, groupIds, member.id)} className="border-border-default bg-surface-elevated border-t cursor-grab active:cursor-grabbing">
                          <td className="px-space-4 py-space-3 text-body text-text-subtle" aria-hidden="true">
                            ⠿
                          </td>
                          <td className="px-space-4 py-space-3">
                            <Link href={`/staff/${member.id}`} className="font-body text-body text-text-primary hover:text-gold-hover">
                              {member.name}
                            </Link>
                          </td>
                          <td className="px-space-4 py-space-3 text-body text-text-muted">{member.title}</td>
                          <td className="px-space-4 py-space-3 text-body text-text-muted">{member.department ? titleCaseFromKey(member.department) : '—'}</td>
                          <td className="px-space-4 py-space-3">
                            <div className="gap-space-1 flex items-center">
                              <Button size="icon-sm" variant="ghost" aria-label={`Move ${member.name} up`} disabled={index === 0} onClick={() => moveRow(group.role, groupIds, member.id, -1)}>
                                ↑
                              </Button>
                              <Button size="icon-sm" variant="ghost" aria-label={`Move ${member.name} down`} disabled={index === group.members.length - 1} onClick={() => moveRow(group.role, groupIds, member.id, 1)}>
                                ↓
                              </Button>
                            </div>
                          </td>
                          <td className="px-space-4 py-space-3">
                            <div className="gap-space-2 flex items-center">
                              <Button size="sm" variant="ghost" onClick={() => router.push(`/staff/${member.id}`)}>
                                Edit
                              </Button>
                              {canDelete && (
                                <Button size="sm" variant="ghost" onClick={() => runDelete(member)}>
                                  Delete
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })
        )}
      </div>
    </div>
  );
}
