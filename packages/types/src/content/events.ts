export type EventStatus =
  | 'upcoming'
  | 'today'
  | 'ongoing'
  | 'past'
  | 'registration-open'
  | 'registration-closed';

export type EventCategory =
  | 'academic'
  | 'sports'
  | 'cultural'
  | 'religious'
  | 'administrative'
  | 'community';

export interface SchoolEvent {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO yyyy-mm-dd
  time?: string;
  venue?: string;
  category?: EventCategory | string;
  status?: EventStatus;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  relativeTime?: string;
  registrationHref?: string;
}
