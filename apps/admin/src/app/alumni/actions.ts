'use server';

// apps/admin/src/app/alumni/actions.ts
//
// Server actions for the Alumni module (Task 7.18, F-154/F-180). Mirrors
// staff/actions.ts's shape: every action returns an ActionResult instead of
// throwing, so the calling client component can show an error inline
// instead of an opaque Next.js error overlay.

import { TRPCError } from '@trpc/server';
import { revalidatePath } from 'next/cache';

import { getServerCaller } from '../../lib/server-caller.js';

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

export interface AlumniFormInput {
  name: string;
  graduationYear: string;
  stream?: string | null;
  currentRole?: string | null;
  currentOrg?: string | null;
  portraitUrl?: string | null;
  portraitAlt?: string | null;
  quote?: string | null;
  isFeatureworthy?: boolean;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string | null;
}

function messageFor(err: unknown): string {
  if (err instanceof TRPCError) {
    if (err.code === 'NOT_FOUND') return err.message;
    if (err.code === 'BAD_REQUEST') return err.message;
    if (err.code === 'UNAUTHORIZED' || err.code === 'FORBIDDEN') return "You don't have permission to do that.";
    return 'Something went wrong saving the alumni profile. Please try again.';
  }
  return 'Something went wrong saving the alumni profile. Please try again.';
}

export async function createAlumniProfile(input: AlumniFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- input is validated server-side against AlumniCreateInput; re-declaring that shape here would just be a second copy to keep in sync.
    const alumni = await caller.alumni.create(input as any);
    revalidatePath('/alumni');
    return { ok: true, data: { id: alumni.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function updateAlumniProfile(id: string, input: AlumniFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const alumni = await caller.alumni.update({ id, ...(input as any) });
    revalidatePath('/alumni');
    revalidatePath(`/alumni/${id}`);
    return { ok: true, data: { id: alumni.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function deleteAlumniProfile(id: string): Promise<ActionResult> {
  try {
    const caller = await getServerCaller();
    await caller.alumni.delete({ id });
    revalidatePath('/alumni');
    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function updateAlumniStatus(id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED', rejectionReason?: string): Promise<ActionResult> {
  try {
    const caller = await getServerCaller();
    await caller.alumni.setStatus({ id, status, rejectionReason });
    revalidatePath('/alumni');
    revalidatePath(`/alumni/${id}`);
    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function bulkUpdateAlumniStatus(ids: string[], status: 'PENDING' | 'APPROVED' | 'REJECTED', rejectionReason?: string): Promise<ActionResult> {
  try {
    const caller = await getServerCaller();
    await caller.alumni.bulkSetStatus({ ids, status, rejectionReason });
    revalidatePath('/alumni');
    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}
