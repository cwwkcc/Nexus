'use server';

// apps/admin/src/app/events/actions.ts
//
// Server actions for the Events module (M4, Task 7.5, F-198). Mirrors
// staff/actions.ts's shape: every action returns an ActionResult instead
// of throwing, so the calling client component can show an error inline
// instead of an opaque Next.js error overlay.
//
// EventDetailFormInput is always present on EventFormInput but may be
// `null` — see packages/api/src/modules/events/validators.ts's header
// comment for exactly what `null` vs an object means on create vs update.

import { TRPCError } from '@trpc/server';
import { revalidatePath } from 'next/cache';

import { getServerCaller } from '../../lib/server-caller.js';

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

export interface EventDetailFormInput {
  slug: string;
  description: string;
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
  location?: string | null;
  startTime?: string | null;
  isAllDay: boolean;
  registrationUrl?: string | null;
  status: string;
}

export interface EventFormInput {
  locale: string;
  title: string;
  date: string;
  category: string;
  isRecurring: boolean;
  recurrenceRule?: string | null;
  notes?: string | null;
  detail: EventDetailFormInput | null;
}

function messageFor(err: unknown): string {
  if (err instanceof TRPCError) {
    if (err.code === 'NOT_FOUND') return err.message;
    if (err.code === 'BAD_REQUEST') return err.message;
    if (err.code === 'CONFLICT') return err.message;
    if (err.code === 'UNAUTHORIZED' || err.code === 'FORBIDDEN') return "You don't have permission to do that.";
    return 'Something went wrong saving the calendar entry. Please try again.';
  }
  return 'Something went wrong saving the calendar entry. Please try again.';
}

export async function createCalendarEntry(input: EventFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- input is validated server-side against CalendarEntryCreateInput; re-declaring that shape here would just be a second copy to keep in sync.
    const entry = await caller.events.create(input as any);
    revalidatePath('/events');
    return { ok: true, data: { id: entry.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function updateCalendarEntry(id: string, input: EventFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entry = await caller.events.update({ id, ...(input as any) });
    revalidatePath('/events');
    revalidatePath(`/events/${id}`);
    return { ok: true, data: { id: entry.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function deleteCalendarEntry(id: string): Promise<ActionResult> {
  try {
    const caller = await getServerCaller();
    await caller.events.delete({ id });
    revalidatePath('/events');
    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}
