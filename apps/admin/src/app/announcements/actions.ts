'use server';

// apps/admin/src/app/announcements/actions.ts
//
// Server actions for the Announcements module (Task 6.10/7.13, F-172).
// Mirrors societies/actions.ts's shape: every action returns an
// ActionResult instead of throwing.

import { TRPCError } from '@trpc/server';
import { revalidatePath } from 'next/cache';

import { getServerCaller } from '../../lib/server-caller.js';

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

export interface AnnouncementFormInput {
  locale: string;
  variant: string;
  message: string;
  linkLabel?: string | null;
  linkHref?: string | null;
  publishAt?: string;
  expiresAt?: string | null;
  isActive: boolean;
}

function messageFor(err: unknown): string {
  if (err instanceof TRPCError) {
    if (err.code === 'NOT_FOUND') return err.message;
    if (err.code === 'BAD_REQUEST') return err.message;
    if (err.code === 'UNAUTHORIZED' || err.code === 'FORBIDDEN') return "You don't have permission to do that.";
    return 'Something went wrong saving the announcement. Please try again.';
  }
  return 'Something went wrong saving the announcement. Please try again.';
}

export async function createAnnouncement(input: AnnouncementFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- input is validated server-side against AnnouncementCreateInput; re-declaring that shape here would just be a second copy to keep in sync.
    const announcement = await caller.announcements.create(input as any);
    revalidatePath('/announcements');
    return { ok: true, data: { id: announcement.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function updateAnnouncement(id: string, input: AnnouncementFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const announcement = await caller.announcements.update({ id, ...(input as any) });
    revalidatePath('/announcements');
    return { ok: true, data: { id: announcement.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function deactivateAnnouncement(id: string): Promise<ActionResult> {
  try {
    const caller = await getServerCaller();
    await caller.announcements.deactivate({ id });
    revalidatePath('/announcements');
    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function deleteAnnouncement(id: string): Promise<ActionResult> {
  try {
    const caller = await getServerCaller();
    await caller.announcements.delete({ id });
    revalidatePath('/announcements');
    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}
