// apps/web/src/app/[locale]/events/[slug]/page.tsx
//
// F-146: individual event detail page. Was a 3-line comment-only stub
// with no default export — every request to this route would have
// failed to build. Rendered dynamically (no generateStaticParams), unlike
// news/[slug]/page.tsx's static generation — F-144 explicitly asked for
// that on News; nothing in F-146/the Engineering Roadmap's Task 7.5 spec
// asks for it here, and adding it would mean adding new public API
// surface (an "every published slug" list) purely to support a build-time
// concern this milestone's own spec never called for. A dynamic route is
// simpler and equally correct for what was actually asked.

import { EVENT_CATEGORY_META, SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { clientEnv } from '@nexus/env/client';
import { Badge, Container, Heading, MapEmbed, Text } from '@nexus/ui';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { EventShareButton } from './EventShareButton';
import { EVENTS_STRINGS } from '../../../../lib/i18n/events';
import { getEventBySlug } from '../../../../server/events';

interface EventDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

function resolveLocale(locale: string): LocaleEnumData {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale) ? (locale as LocaleEnumData) : 'en';
}

function categoryLabel(category: string): string {
  return EVENT_CATEGORY_META.find((meta) => meta.key === category)?.label ?? category;
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale = resolveLocale(locale);
  const entry = await getEventBySlug(safeLocale, slug);

  if (!entry?.detail) {
    return { title: 'Event not found' };
  }

  const { detail } = entry;
  return {
    title: `${entry.title} — C.W.W. Kannangara Central College`,
    description: detail.description,
    openGraph: {
      title: entry.title,
      description: detail.description,
      type: 'article',
      images: detail.coverImage ? [{ url: detail.coverImage.src }] : undefined,
    },
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { locale, slug } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = EVENTS_STRINGS[safeLocale];

  const entry = await getEventBySlug(safeLocale, slug);
  if (!entry?.detail) {
    notFound();
  }

  const { detail } = entry;
  const url = `${clientEnv.NEXT_PUBLIC_SITE_URL}/${safeLocale}/events/${detail.slug}`;
  const formattedDate = new Date(`${entry.date}T00:00:00.000Z`).toLocaleDateString(safeLocale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

  // Embeddable without an API key (the classic `output=embed` query form) —
  // there's no stored lat/lng or dedicated map-embed URL for an event, only
  // the free-text `location` string, so this is the simplest correct way
  // to turn that into a map without adding new fields the F-198 field list
  // never called for.
  const mapSrc = detail.location ? `https://maps.google.com/maps?q=${encodeURIComponent(detail.location)}&output=embed` : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: entry.title,
    description: detail.description,
    startDate: entry.date,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: detail.location ? { '@type': 'Place', name: detail.location } : undefined,
    image: detail.coverImage?.src ?? undefined,
    organizer: {
      '@type': 'Organization',
      name: 'C.W.W. Kannangara Central College',
      url: clientEnv.NEXT_PUBLIC_SITE_URL,
    },
    url,
  };

  return (
    <Container size="md" padding="lg" as="article">
      {}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href={`/${safeLocale}/events`} className="font-body text-caption uppercase tracking-caption text-gold-base hover:text-gold-hover">
        ← {strings.backToEvents}
      </Link>

      <header className="mt-space-6 flex flex-col gap-space-4">
        <Badge variant="category" label={categoryLabel(entry.category)} />
        <Heading level="h1">{entry.title}</Heading>
        <div className="flex flex-wrap items-center gap-space-3 font-body text-caption uppercase tracking-caption text-text-muted">
          <span>{formattedDate}</span>
          {!detail.isAllDay && detail.startTime && <span>· {detail.startTime}</span>}
          {detail.isAllDay && <span>· {strings.allDay}</span>}
          {detail.location && (
            <span>
              · {strings.location}: {detail.location}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-space-3">
          {detail.registrationUrl && (
            <Link href={detail.registrationUrl} className="inline-block px-space-6 py-space-2.5 bg-green-base text-text-inverse font-body text-caption uppercase tracking-caption">
              {strings.register}
            </Link>
          )}
          <EventShareButton title={entry.title} url={url} label={strings.share} />
        </div>
      </header>

      {detail.coverImage && (
        <div className="relative mt-space-8 aspect-[16/7] overflow-hidden rounded-sm bg-green-base">
          {}
          <img src={detail.coverImage.src} alt={detail.coverImage.alt} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="mt-space-8">
        <Text as="p" className="whitespace-pre-line leading-relaxed">
          {detail.description}
        </Text>
      </div>

      {mapSrc && (
        <div className="mt-space-10">
          <MapEmbed src={mapSrc} title={detail.location ?? entry.title} nearbyNote={detail.location ?? undefined} />
        </div>
      )}
    </Container>
  );
}
