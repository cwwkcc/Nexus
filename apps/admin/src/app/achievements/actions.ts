'use server';

// apps/admin/src/app/achievements/actions.ts
//
// Server actions for the Achievements module (Task 7.19, F-156/F-181). Mirrors
// alumni/actions.ts's shape: every action returns an ActionResult instead of
// throwing, so the calling client component can show an error inline
// instead of an opaque Next.js error overlay.

import { TRPCError } from '@trpc/server';
import { revalidatePath } from 'next/cache';

import { getServerCaller } from '../../lib/server-caller.js';

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

export interface AchievementFormInput {
  studentName: string;
  title: string;
  description?: string | null;
  level: string;
  category: string;
  date: string;
  awardedBy?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
}

function messageFor(err: unknown): string {
  if (err instanceof TRPCError) {
    if (err.code === 'NOT_FOUND') return err.message;
    if (err.code === 'BAD_REQUEST') return err.message;
    if (err.code === 'UNAUTHORIZED' || err.code === 'FORBIDDEN') return "You don't have permission to do that.";
    return 'Something went wrong saving the achievement. Please try again.';
  }
  return 'Something went wrong saving the achievement. Please try again.';
}

export async function createAchievement(input: AchievementFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- input is validated server-side against AchievementCreateInput; re-declaring that shape here would just be a second copy to keep in sync.
    const achievement = await caller.achievements.create(input as any);
    revalidatePath('/achievements');
    return { ok: true, data: { id: achievement.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function updateAchievement(id: string, input: AchievementFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const achievement = await caller.achievements.update({ id, ...(input as any) });
    revalidatePath('/achievements');
    revalidatePath(`/achievements/${id}`);
    return { ok: true, data: { id: achievement.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function deleteAchievement(id: string): Promise<ActionResult> {
  try {
    const caller = await getServerCaller();
    await caller.achievements.delete({ id });
    revalidatePath('/achievements');
    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}
