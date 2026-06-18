import { z } from 'zod';

export const EventStatusSchema = z.enum([
  'upcoming',
  'today',
  'ongoing',
  'past',
  'registration-open',
  'registration-closed',
]);

export const EventCategorySchema = z.enum([
  'academic',
  'sports',
  'cultural',
  'religious',
  'administrative',
  'community',
]);

export const SchoolEventSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.string(), // ISO yyyy-mm-dd
  time: z.string().optional(),
  venue: z.string().optional(),
  category: EventCategorySchema.optional(),
  status: EventStatusSchema.optional(),
  href: z.string(),
  imageSrc: z.string().url().optional(),
  imageAlt: z.string().optional(),
  registrationHref: z.string().optional(),
});

export const SchoolEventFormSchema = SchoolEventSchema.omit({ id: true });

// --- Inferred types ---
export type EventStatus = z.infer<typeof EventStatusSchema>;
export type EventCategory = z.infer<typeof EventCategorySchema>;
export type SchoolEvent = z.infer<typeof SchoolEventSchema>;
export type SchoolEventForm = z.infer<typeof SchoolEventFormSchema>;
