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

import { z } from 'zod';

export const EventStatus = z.enum([
  'upcoming',
  'today',
  'ongoing',
  'past',
  'registration-open',
  'registration-closed',
]);

export const EventCardVariant = z.enum(['standard', 'compact', 'featured']);

export const EventSchema = z.object({
  id: z.string(),
  variant: EventCardVariant.optional(),
  title: z.string(),
  description: z.string().optional(),
  date: z.string(),
  time: z.string().optional(),
  venue: z.string().optional(),
  category: z.string().optional(),
  status: EventStatus.optional(),
  href: z.string(),
  imageSrc: z.string().optional(),
  imageAlt: z.string().optional(),
  relativeTime: z.string().optional(),
  registrationHref: z.string().optional(),
});

export type EventData = z.infer<typeof EventSchema>;
export type EventStatusType = z.infer<typeof EventStatus>;
export type EventCardVariantType = z.infer<typeof EventCardVariant>;

// Runtime enum values for comparisons
export const EventStatusValues = EventStatus.enum;
export const EventCardVariantValues = EventCardVariant.enum;
