'use server';

// apps/admin/src/app/societies/actions.ts
//
// Server actions for the Societies module (Task 7.6, F-167). Mirrors
// events/actions.ts's shape: every action returns an ActionResult instead
// of throwing, so the calling client component can show an error inline
// instead of an opaque Next.js error overlay.

import { TRPCError } from '@trpc/server';
import { revalidatePath } from 'next/cache';

import { getServerCaller } from '../../lib/server-caller.js';

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

export interface SocietyFormInput {
  locale: string;
  slug: string;
  name: string;
  tagline?: string | null;
  category: string;
  foundingYear?: string | null;
  description?: string | null;
  meetingSchedule?: string | null;
  memberCount?: number | null;
  howToJoin?: string | null;
  logoUrl?: string | null;
  logoAlt?: string | null;
  bannerUrl?: string | null;
  bannerAlt?: string | null;
  isFeatured: boolean;
  advisorStaffId?: string | null;
}

function messageFor(err: unknown): string {
  if (err instanceof TRPCError) {
    if (err.code === 'NOT_FOUND') return err.message;
    if (err.code === 'BAD_REQUEST') return err.message;
    if (err.code === 'CONFLICT') return err.message;
    if (err.code === 'UNAUTHORIZED' || err.code === 'FORBIDDEN') return "You don't have permission to do that.";
    return 'Something went wrong saving the society. Please try again.';
  }
  return 'Something went wrong saving the society. Please try again.';
}

export async function createSociety(input: SocietyFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- input is validated server-side against SocietyCreateInput; re-declaring that shape here would just be a second copy to keep in sync.
    const society = await caller.societies.create(input as any);
    revalidatePath('/societies');
    return { ok: true, data: { id: society.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function updateSociety(id: string, input: SocietyFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const society = await caller.societies.update({ id, ...(input as any) });
    revalidatePath('/societies');
    revalidatePath(`/societies/${id}`);
    return { ok: true, data: { id: society.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function deleteSociety(id: string): Promise<ActionResult> {
  try {
    const caller = await getServerCaller();
    await caller.societies.delete({ id });
    revalidatePath('/societies');
    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}
