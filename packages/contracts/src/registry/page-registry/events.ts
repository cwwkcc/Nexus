// packages/contracts/src/registry/page-registry/events.ts
//
// Page registry for: Events. Not covered in docs/Design System/Page
// Specifications.md (sections 01-12 don't include it), but it's one of the
// 13 real pages per the Feature Registry (F-052) and PAGE_KEY_VALUES, and
// editorial/events/calendar.ts's own comment already assumes it exists
// ("The events page and home page upcoming strip both read from this").
// Worth getting Page Specifications.md updated to cover it properly —
// this section list is a reasonable best guess from the real EventSchema/
// EventCardSchema, not a transcription of a written spec.

import { z } from 'zod';

import { HeroSchema } from '../../blocks/index.ts';
import { EventCardSchema } from '../../editorial/events/event.ts';
import type { PageRegistry } from '../types.ts';

export const EventsHeroSchema = HeroSchema;

export const EventsUpcomingSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  events: z.array(EventCardSchema),
});
export type EventsUpcomingData = z.infer<typeof EventsUpcomingSchema>;

export const EventsPastSchema = z.object({
  heading: z.string().optional(),
  events: z.array(EventCardSchema),
});
export type EventsPastData = z.infer<typeof EventsPastSchema>;

export const eventsRegistry: PageRegistry = {
  page: 'events',
  scope: 'page:events',
  label: 'Events',
  description: 'Manage the Events page \u2014 upcoming and past events, filterable by category. The same calendar data also feeds the homepage upcoming strip.',
  sections: [
    {
      key: 'events.hero',
      blockKey: 'hero',
      label: 'Hero Banner',
      description: 'Top-of-page headline and eyebrow text.',
      schema: EventsHeroSchema,
    },
    {
      key: 'events.upcoming',
      blockKey: 'rich-text-block',
      label: 'Upcoming Events',
      description: 'Events with a future date, soonest first.',
      schema: EventsUpcomingSchema,
    },
    {
      key: 'events.past',
      blockKey: 'rich-text-block',
      label: 'Past Events',
      description: 'Completed events, most recent first.',
      schema: EventsPastSchema,
    },
  ],
};
