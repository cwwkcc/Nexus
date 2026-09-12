// apps/web/src/app/[locale]/news/page.tsx
//
// F-143: News listing page. All published articles for this locale, with
// category filter, pagination, and search. Was a 4-line stub.

import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { Container, Grid, NewsCard, Text } from '@nexus/ui';
import { AnnouncementBanner } from '@nexus/ui';
import { Hero } from '@nexus/ui';
import type { Metadata } from 'next';

import { NewsListingControls } from './NewsListingControls';
import { toArticleCard } from '../../../lib/cards/news';
import { NEWS_STRINGS } from '../../../lib/i18n/news';
import { getNewsListing, getNewsPageChrome, getPinnedNews } from '../../../server/news';

interface NewsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function resolveLocale(locale: string): LocaleEnumData {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale) ? (locale as LocaleEnumData) : 'en';
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = NEWS_STRINGS[safeLocale];
  return {
    title: `${strings.pageTitle} — C.W.W. Kannangara Central College`,
    description: strings.pageTitle,
  };
}

export default async function NewsPage({ params, searchParams }: NewsPageProps) {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = NEWS_STRINGS[safeLocale];

  const query = await searchParams;
  const page = Number(firstValue(query.page) ?? '1') || 1;
  const category = firstValue(query.category) ?? 'all';
  const search = firstValue(query.q) ?? '';

  // The pinned hero only makes sense on the plain, unfiltered first page —
  // once the visitor has filtered, searched, or paged past it, showing an
  // unrelated pinned article above their results would just be noise.
  const showPinned = category === 'all' && page === 1 && !search;

  const [{ hero, announcement }, listing, pinned] = await Promise.all([getNewsPageChrome(safeLocale), getNewsListing({ locale: safeLocale, page, category: category === 'all' ? undefined : category, query: search || undefined }), showPinned ? getPinnedNews(safeLocale) : Promise.resolve(null)]);

  // Pinned article gets its own hero slot above the feed, so it's excluded
  // from the grid rather than appearing twice.
  const gridItems = pinned ? listing.items.filter((item) => item.id !== pinned.id) : listing.items;

  return (
    <>
      {announcement && <AnnouncementBanner variant={announcement.variant === 'success' ? 'info' : announcement.variant}>{announcement.message}</AnnouncementBanner>}
      <Hero variant="subpage" heading={hero.title} eyebrow={hero.eyebrow} subheading={hero.subtitle} breadcrumb={[{ label: 'Home', href: `/${safeLocale}` }, { label: strings.pageTitle }]} />

      <Container size="lg" padding="lg" as="section">
        {pinned && (
          <div className="mb-space-10">
            <NewsCard {...toArticleCard(pinned, safeLocale, 'featured')} readMoreLabel={strings.readMore} />
          </div>
        )}

        <NewsListingControls locale={safeLocale} strings={strings} currentCategory={category} currentQuery={search} page={listing.pagination.page} totalPages={listing.pagination.totalPages} />

        {gridItems.length === 0 ? (
          pinned ? null : (
            <Text color="muted" className="py-space-12 text-center">
              {strings.noResults}
            </Text>
          )
        ) : (
          <Grid columns="repeat(auto-fit, minmax(300px, 1fr))" gap={7} className="mt-space-8">
            {gridItems.map((article) => (
              <NewsCard key={article.id} {...toArticleCard(article, safeLocale, 'standard')} readMoreLabel={strings.readMore} />
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
