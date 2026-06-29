// packages/contracts/src/editorial/events/calendar.ts
//
// Academic calendar and recurring event contracts.
//
// Should contain:
//   CalendarEntrySchema    — id, title, date (ISO), category (EventCategoryKey),
//                            isRecurring?, recurrenceRule? (RRULE string), notes?
//   AcademicCalendarSchema — academicYear (e.g. '2025'), entries: CalendarEntry[]
//   AcademicCalendarData   — z.infer type
//
// Notes:
//   Stored in ContentEntry with scope 'editorial:calendar'.
//   The events page and home page upcoming strip both read from this.

import { z } from 'zod';

// TODO: implement
