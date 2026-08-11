'use server';

// apps/admin/src/app/gallery/actions.ts
//
// Server actions for the Gallery module (Task 7.7, F-168). Mirrors
// societies/actions.ts's shape: every action returns an ActionResult
// instead of throwing.

import { TRPCError } from '@trpc/server';
import { revalidatePath } from 'next/cache';

import { getServerCaller } from '../../lib/server-caller.js';

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

export interface AlbumPhotoFormInput {
  id?: string;
  src: string;
  alt: string;
  caption?: string | null;
}

export interface AlbumFormInput {
  locale: string;
  slug: string;
  title: string;
  description?: string | null;
  category?: string | null;
  year: number;
  coverPhotoUrl?: string | null;
  coverPhotoAlt?: string | null;
  order: number;
  photos: AlbumPhotoFormInput[];
}

function messageFor(err: unknown): string {
  if (err instanceof TRPCError) {
    if (err.code === 'NOT_FOUND') return err.message;
    if (err.code === 'BAD_REQUEST') return err.message;
    if (err.code === 'CONFLICT') return err.message;
    if (err.code === 'UNAUTHORIZED' || err.code === 'FORBIDDEN') return "You don't have permission to do that.";
    return 'Something went wrong saving the album. Please try again.';
  }
  return 'Something went wrong saving the album. Please try again.';
}

export async function createAlbum(input: AlbumFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- input is validated server-side against GalleryAlbumCreateInput; re-declaring that shape here would just be a second copy to keep in sync.
    const album = await caller.gallery.create(input as any);
    revalidatePath('/gallery');
    return { ok: true, data: { id: album.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function updateAlbum(id: string, input: AlbumFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const album = await caller.gallery.update({ id, ...(input as any) });
    revalidatePath('/gallery');
    revalidatePath(`/gallery/${id}`);
    return { ok: true, data: { id: album.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function deleteAlbum(id: string): Promise<ActionResult> {
  try {
    const caller = await getServerCaller();
    await caller.gallery.delete({ id });
    revalidatePath('/gallery');
    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function reorderAlbums(locale: string, orderedIds: string[]): Promise<ActionResult> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await caller.gallery.reorder({ locale: locale as any, orderedIds });
    revalidatePath('/gallery');
    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}
