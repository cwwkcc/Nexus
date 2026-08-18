'use server';

// apps/admin/src/app/archive/actions.ts
//
// Server actions for the Archive module (Task 7.20, F-155/F-182). Mirrors
// achievements/actions.ts's shape: every action returns an ActionResult instead of
// throwing, so the calling client component can show an error inline
// instead of an opaque Next.js error overlay.

import { TRPCError } from '@trpc/server';
import { revalidatePath } from 'next/cache';

import { getServerCaller } from '../../lib/server-caller.js';

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

export interface ArchiveFormInput {
  title: string;
  year: string;
  category: string;
  description?: string | null;
  fileUrl: string;
  fileAlt: string;
}

function messageFor(err: unknown): string {
  if (err instanceof TRPCError) {
    if (err.code === 'NOT_FOUND') return err.message;
    if (err.code === 'BAD_REQUEST') return err.message;
    if (err.code === 'UNAUTHORIZED' || err.code === 'FORBIDDEN') return "You don't have permission to do that.";
    return 'Something went wrong saving the archive entry. Please try again.';
  }
  return 'Something went wrong saving the archive entry. Please try again.';
}

export async function createArchiveEntry(input: ArchiveFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- input is validated server-side against ArchiveCreateInput; re-declaring that shape here would just be a second copy to keep in sync.
    const archive = await caller.archive.create(input as any);
    revalidatePath('/archive');
    return { ok: true, data: { id: archive.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function updateArchiveEntry(id: string, input: ArchiveFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const archive = await caller.archive.update({ id, ...(input as any) });
    revalidatePath('/archive');
    revalidatePath(`/archive/${id}`);
    return { ok: true, data: { id: archive.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function deleteArchiveEntry(id: string): Promise<ActionResult> {
  try {
    const caller = await getServerCaller();
    await caller.archive.delete({ id });
    revalidatePath('/archive');
    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}
