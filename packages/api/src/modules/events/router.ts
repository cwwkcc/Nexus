// packages/api/src/modules/events/router.ts
//
// month/upcoming/bySlug are public — F-145's calendar grid + list view,
// F-141's home "Upcoming Events" strip, and F-146's detail page.
// Everything else is admin-panel-only, matching modules/staff/router.ts's
// shape.
//
// `delete` additionally requires the 'admin' role via adminOnlyMutation —
// same reasoning as modules/staff/router.ts's hard delete: a bare
// CalendarEntry has no archived/soft-deleted state to fall back to (see
// service.ts's own doc comment on deleteCalendarEntry), so removing one
// from the calendar is always permanent, and @nexus/contracts' RBAC
// matrix grants `events: ['read','write','publish']` to Editor but
// `[...,'admin']` to Admin. create/update stay on adminMutation — an
// Editor can freely create, edit, and publish/unpublish an event's
// detail; only the irreversible calendar removal is withheld.

import { adminList, createCalendarEntry, deleteCalendarEntry, getById, getBySlug, getMonth, getUpcoming, updateCalendarEntry } from './service.js';
import { CalendarAdminListInput, CalendarEntryCreateInput, CalendarEntryDeleteInput, CalendarEntryListOutput, CalendarEntryOutput, CalendarEntryUpdateInput, CalendarMonthInput, EventBySlugInput, EventGetByIdInput, UpcomingEventsInput } from './validators.js';
import { adminMutation, adminOnlyMutation, adminProcedure, publicProcedure, router } from '../../trpc.js';

export const eventsRouter = router({
  month: publicProcedure
    .input(CalendarMonthInput)
    .output(CalendarEntryOutput.array())
    .query(({ ctx, input }) => getMonth(ctx.db, input)),

  upcoming: publicProcedure
    .input(UpcomingEventsInput)
    .output(CalendarEntryOutput.array())
    .query(({ ctx, input }) => getUpcoming(ctx.db, input)),

  bySlug: publicProcedure
    .input(EventBySlugInput)
    .output(CalendarEntryOutput.nullable())
    .query(({ ctx, input }) => getBySlug(ctx.db, input)),

  adminList: adminProcedure
    .input(CalendarAdminListInput)
    .output(CalendarEntryListOutput)
    .query(({ ctx, input }) => adminList(ctx.db, input)),

  adminGetById: adminProcedure
    .input(EventGetByIdInput)
    .output(CalendarEntryOutput)
    .query(({ ctx, input }) => getById(ctx.db, input)),

  create: adminMutation
    .input(CalendarEntryCreateInput)
    .output(CalendarEntryOutput)
    .mutation(({ ctx, input }) => createCalendarEntry(ctx.db, ctx.config, input)),

  update: adminMutation
    .input(CalendarEntryUpdateInput)
    .output(CalendarEntryOutput)
    .mutation(({ ctx, input }) => updateCalendarEntry(ctx.db, ctx.config, input)),

  delete: adminOnlyMutation
    .input(CalendarEntryDeleteInput)
    .output(CalendarEntryDeleteInput)
    .mutation(async ({ ctx, input }) => {
      await deleteCalendarEntry(ctx.db, ctx.config, input);
      return { id: input.id };
    }),
});

export type EventsRouter = typeof eventsRouter;
