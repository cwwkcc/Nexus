// packages/contracts/src/editorial/events/event.ts
//
// Calendar event contract.
//
// Should contain:
//   EventSchema      — id, title, slug, description, coverImage? (R2 key),
//                      category (EventCategoryKey), startDate (ISO), endDate? (ISO),
//                      location?, isAllDay? (bool), registrationUrl?, locale
//   EventCardSchema  — id, title, slug, category, startDate, coverImage?
//   EventData        — z.infer type
//   EventCardData    — z.infer type
//
// Notes:
//   EventSchema is for one-off or date-ranged events.
//   Recurring events (weekly assembly etc.) use CalendarEntrySchema in calendar.ts.



// TODO: implement

export type Event = unknown;
