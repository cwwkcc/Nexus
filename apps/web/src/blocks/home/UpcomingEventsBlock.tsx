// apps/web/src/blocks/home/UpcomingEventsBlock.tsx
//
// Upcoming Events block, part of the Home Page (F-141/F-127). Next three
// upcoming events with a published EventDetail — EventCard from
// @nexus/ui. Same shape and same caveat as LatestNewsBlock.tsx: a real,
// self-contained component ready to drop into the home page, but the home
// page itself (F-141: Hero, Stats Strip, Principal's Message, Latest
// News, this block, Quick Access, Announcement Banner) isn't assembled
// yet — apps/web/src/app/[locale]/page.tsx is still a placeholder. That's
// a separate, much larger milestone than Events — not composed in here.

import type { LocaleEnumData } from '@nexus/contracts';
import { Container, EventCard, Grid, Heading } from '@nexus/ui';
import Link from 'next/link';

import { toEventCard } from '../../lib/event-card';
import { EVENTS_STRINGS } from '../../lib/events-i18n';
import { getUpcomingEvents } from '../../server/events';

interface UpcomingEventsBlockProps {
  locale: LocaleEnumData;
}

export async function UpcomingEventsBlock({ locale }: UpcomingEventsBlockProps) {
  const strings = EVENTS_STRINGS[locale];
  const entries = await getUpcomingEvents(locale, 3);

  if (entries.length === 0) {
    return null; // No published, upcoming events — nothing worth showing on the home page.
  }

  return (
    <Container size="lg" padding="lg" as="section">
      <div className="mb-space-8 flex items-center justify-between">
        <Heading level="h2">{strings.upcomingEvents}</Heading>
        <Link href={`/${locale}/events`} className="font-body text-caption uppercase tracking-caption text-gold-base hover:text-gold-hover">
          {strings.pageTitle}
        </Link>
      </div>

      <Grid columns="repeat(auto-fit, minmax(280px, 1fr))" gap={7}>
        {entries.map((entry) => (
          <EventCard key={entry.id} {...toEventCard(entry, locale)} registerLabel={strings.register} />
        ))}
      </Grid>
    </Container>
  );
}
