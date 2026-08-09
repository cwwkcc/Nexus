// apps/web/src/app/[locale]/events/page.tsx
//
// F-145: Events listing page. Calendar view + list view, filterable by
// category and month, upcoming vs. past distinguished by each card's own
// status (see lib/event-card.ts's computeStatus). Was a comment-only stub
// with no default export at all before this milestone — every request to
// this route would have failed to build.

import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { Container, EventCard, Grid, Hero, Text } from '@nexus/ui';
import type { Metadata } from 'next';

import { EventsCalendarView } from './EventsCalendarView';
import { EventsListingControls } from './EventsListingControls';
import { toEventCard } from '../../../lib/event-card';
import { EVENTS_STRINGS } from '../../../lib/events-i18n';
import { currentMonthParam } from '../../../lib/events-month';
import { getCalendarMonth, getEventsPageChrome } from '../../../server/events';

interface EventsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function resolveLocale(locale: string): LocaleEnumData {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale) ? (locale as LocaleEnumData) : 'en';
}

export async function generateMetadata({ params }: EventsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = EVENTS_STRINGS[safeLocale];
  return {
    title: `${strings.pageTitle} — C.W.W. Kannangara Central College`,
    description: strings.pageTitle,
  };
}

const MONTH_NAMES_BY_LOCALE: Record<LocaleEnumData, string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  si: ['ජනවාරි', 'පෙබරවාරි', 'මාර්තු', 'අප්‍රේල්', 'මැයි', 'ජූනි', 'ජූලි', 'අගෝස්තු', 'සැප්තැම්බර්', 'ඔක්තෝබර්', 'නොවැම්බර්', 'දෙසැම්බර්'],
  ta: ['ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'],
};

export default async function EventsPage({ params, searchParams }: EventsPageProps) {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = EVENTS_STRINGS[safeLocale];

  const query = await searchParams;
  const category = firstValue(query.category) ?? 'all';
  const month = firstValue(query.month) ?? currentMonthParam();
  const view = firstValue(query.view) === 'list' ? 'list' : 'calendar';

  const [{ hero }, entries] = await Promise.all([getEventsPageChrome(safeLocale), getCalendarMonth({ locale: safeLocale, month, category: category === 'all' ? undefined : category })]);

  const cards = entries.map((entry) => toEventCard(entry, safeLocale));
  // F-145: the calendar grid renders every entry (calendar-only included);
  // the list view is card-only — an entry without a description never had
  // a linked EventDetail, so it has nothing to list.
  const cardsWithDetail = cards.filter((card) => card.description !== undefined);

  return (
    <>
      <Hero variant="subpage" heading={hero.title} eyebrow={hero.eyebrow} subheading={hero.subtitle} breadcrumb={[{ label: 'Home', href: `/${safeLocale}` }, { label: strings.pageTitle }]} />

      <Container size="lg" padding="lg" as="section">
        <EventsListingControls locale={safeLocale} strings={strings} currentCategory={category} currentMonth={month} currentView={view} />

        <div className="mt-space-8">
          {view === 'calendar' ? (
            <EventsCalendarView key={month} locale={safeLocale} events={cards} month={month} monthNames={MONTH_NAMES_BY_LOCALE[safeLocale]} prevMonthLabel={strings.prevMonth} nextMonthLabel={strings.nextMonth} />
          ) : cardsWithDetail.length === 0 ? (
            <Text color="muted" className="py-space-12 text-center">
              {strings.noResults}
            </Text>
          ) : (
            <Grid columns="repeat(auto-fit, minmax(300px, 1fr))" gap={7}>
              {cardsWithDetail.map((card) => (
                <EventCard key={card.id} {...card} />
              ))}
            </Grid>
          )}
        </div>
      </Container>
    </>
  );
}
