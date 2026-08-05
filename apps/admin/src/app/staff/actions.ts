'use server';

// apps/admin/src/app/staff/actions.ts
//
// Server actions for the Staff module (M4, Task 7.4, F-165). Mirrors
// news/actions.ts's shape: every action returns an ActionResult instead of
// throwing, so the calling client component can show an error inline
// instead of an opaque Next.js error overlay.

import { TRPCError } from '@trpc/server';
import { revalidatePath } from 'next/cache';

import { getServerCaller } from '../../lib/server-caller.js';

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

export interface StaffFormInput {
  name: string;
  role: string;
  title: string;
  department?: string | null;
  portfolio?: string | null;
  tenure?: string | null;
  quote?: string | null;
  bio?: string | null;
  portraitUrl?: string | null;
  portraitAlt?: string | null;
  contactEmail?: string | null;
  joinedYear?: string | null;
}

function messageFor(err: unknown): string {
  if (err instanceof TRPCError) {
    if (err.code === 'NOT_FOUND') return err.message;
    if (err.code === 'BAD_REQUEST') return err.message;
    if (err.code === 'UNAUTHORIZED' || err.code === 'FORBIDDEN') return "You don't have permission to do that.";
    return 'Something went wrong saving the staff member. Please try again.';
  }
  return 'Something went wrong saving the staff member. Please try again.';
}

export async function createStaffMember(input: StaffFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- input is validated server-side against StaffCreateInput; re-declaring that shape here would just be a second copy to keep in sync.
    const staff = await caller.staff.create(input as any);
    revalidatePath('/staff');
    revalidatePath('/administration');
    return { ok: true, data: { id: staff.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function updateStaffMember(id: string, input: StaffFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const staff = await caller.staff.update({ id, ...(input as any) });
    revalidatePath('/staff');
    revalidatePath(`/staff/${id}`);
    revalidatePath('/administration');
    return { ok: true, data: { id: staff.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function deleteStaffMember(id: string): Promise<ActionResult> {
  try {
    const caller = await getServerCaller();
    await caller.staff.delete({ id });
    revalidatePath('/staff');
    revalidatePath('/administration');
    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

/** F-165 drag-and-drop reorder — `orderedIds` is the whole role group's ids
 * in their new order (see packages/api/src/modules/staff/validators.ts's
 * doc comment on StaffReorderInput for why not a from/to index pair). */
export async function reorderStaffMembers(role: string, orderedIds: string[]): Promise<ActionResult> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- `role` is re-validated server-side against StaffRoleEnum.
    await caller.staff.reorder({ role, orderedIds } as any);
    revalidatePath('/staff');
    revalidatePath('/administration');
    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}
