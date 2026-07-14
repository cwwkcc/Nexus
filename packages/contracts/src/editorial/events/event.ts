// packages/contracts/src/editorial/events/event.ts
//
// Calendar event contract.
//
// EventSchema     — the full entity: id, title, slug, description, coverImage?,
//                   category (EventCategoryKey), startDate, endDate?, location?,
//                   isAllDay?, registrationUrl?, locale
// EventCardSchema — lighter projection for list/calendar display (used by @nexus/ui)
//
// Notes:
//   EventSchema is for one-off or date-ranged events.
//   Recurring events (weekly assembly etc.) use CalendarEntrySchema in calendar.ts.

import { z } from 'zod';

import { EventCategorySchema } from './category.ts';
import { MAX_TITLE_LENGTH, MAX_DESCRIPTION_LENGTH } from '../../constants/index.ts';
import { ImageSchema, LocaleEnum } from '../../primitives/index.ts';

export const EVENT_CONTENT_TYPE = 'event';

// The full entity — CMS/admin CRUD and ContentEntry storage.
export const EventSchema = z.object({
  id: z.string(),
  title: z.string().max(MAX_TITLE_LENGTH),
  slug: z.string(),
  description: z.string().max(MAX_DESCRIPTION_LENGTH),
  coverImage: ImageSchema.optional(),
  category: EventCategorySchema,
  startDate: z.string(), // ISO
  endDate: z.string().optional(), // ISO
  location: z.string().optional(),
  isAllDay: z.boolean().optional(),
  registrationUrl: z.string().url().optional(),
  locale: LocaleEnum,
});

export type EventData = z.infer<typeof EventSchema>;

export const EventStatus = z.enum(['upcoming', 'today', 'ongoing', 'past', 'registration-open', 'registration-closed']);

export const EventCardVariant = z.enum(['standard', 'compact', 'featured']);

// Card projection — matches @nexus/ui's EventCardProps / Calendar.tsx exactly.
export const EventCardSchema = z.object({
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

export type EventCardData = z.infer<typeof EventCardSchema>;
export type EventStatusType = z.infer<typeof EventStatus>;
export type EventCardVariantType = z.infer<typeof EventCardVariant>;

// Runtime enum values for comparisons
export const EventStatusValues = EventStatus.enum;
export const EventCardVariantValues = EventCardVariant.enum;
