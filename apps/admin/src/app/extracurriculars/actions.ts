'use server';

// apps/admin/src/app/extracurriculars/actions.ts
//
// Server actions for the Extracurriculars module (Task 7.17, F-179).
// Mirrors societies/actions.ts and gallery/actions.ts's shape: every
// action returns an ActionResult instead of throwing.

import { TRPCError } from '@trpc/server';
import { revalidatePath } from 'next/cache';

import { getServerCaller } from '../../lib/server-caller.js';

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

export interface ActivityAchievementFormInput {
  id?: string;
  title: string;
  description?: string | null;
  level: string;
  date: string;
  awardedBy?: string | null;
}

export interface ActivityFormInput {
  locale: string;
  name: string;
  category: string;
  description: string;
  studentQuote?: string | null;
  season?: string | null;
  coachStaffId?: string | null;
  photoUrl?: string | null;
  photoAlt?: string | null;
  isActive: boolean;
  achievements: ActivityAchievementFormInput[];
}

function messageFor(err: unknown): string {
  if (err instanceof TRPCError) {
    if (err.code === 'NOT_FOUND') return err.message;
    if (err.code === 'BAD_REQUEST') return err.message;
    if (err.code === 'CONFLICT') return err.message;
    if (err.code === 'UNAUTHORIZED' || err.code === 'FORBIDDEN') return "You don't have permission to do that.";
    return 'Something went wrong saving the activity. Please try again.';
  }
  return 'Something went wrong saving the activity. Please try again.';
}

export async function createActivity(input: ActivityFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- input is validated server-side against ExtracurricularActivityCreateInput; re-declaring that shape here would just be a second copy to keep in sync.
    const activity = await caller.extracurriculars.create(input as any);
    revalidatePath('/extracurriculars');
    return { ok: true, data: { id: activity.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function updateActivity(id: string, input: ActivityFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const activity = await caller.extracurriculars.update({ id, ...(input as any) });
    revalidatePath('/extracurriculars');
    revalidatePath(`/extracurriculars/${id}`);
    return { ok: true, data: { id: activity.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function deleteActivity(id: string): Promise<ActionResult> {
  try {
    const caller = await getServerCaller();
    await caller.extracurriculars.delete({ id });
    revalidatePath('/extracurriculars');
    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}
