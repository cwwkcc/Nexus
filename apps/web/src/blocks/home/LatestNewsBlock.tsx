// Latest News block — part of the Home Page (F-141).
// Three most recent published articles. NewsCard from @nexus/ui.
// Server component — fetches via newsRouter.getFeatured (getFeaturedNews).
//
// Built as a real, self-contained component ready to drop into the home
// page — but the home page itself (F-141: Hero, Stats Strip, Principal's
// Message, this block, Upcoming Events, Quick Access, Announcement Banner)
// isn't built yet (apps/web/src/app/[locale]/page.tsx is still a
// placeholder "Welcome to Nexus" page). That's a separate, much larger
// milestone than News — not composed in here.

import { Container, Grid, Heading, NewsCard } from '@nexus/ui';
import type { LocaleEnumData } from '@nexus/contracts';
import Link from 'next/link';

import { toArticleCard } from '../../lib/cards/news';
import { NEWS_STRINGS } from '../../lib/i18n/news';
import { getFeaturedNews } from '../../server/news';

interface LatestNewsBlockProps {
  locale: LocaleEnumData;
}

export async function LatestNewsBlock({ locale }: LatestNewsBlockProps) {
  const strings = NEWS_STRINGS[locale];
  const articles = await getFeaturedNews(locale, 3);

  if (articles.length === 0) {
    return null; // No published articles yet — nothing worth showing on the home page.
  }

  return (
    <Container size="lg" padding="lg" as="section">
      <div className="mb-space-8 flex items-center justify-between">
        <Heading level="h2">{strings.pageTitle}</Heading>
        <Link href={`/${locale}/news`} className="font-body text-caption uppercase tracking-caption text-gold-base hover:text-gold-hover">
          {strings.readMore}
        </Link>
      </div>

      <Grid columns="repeat(auto-fit, minmax(280px, 1fr))" gap={7}>
        {articles.map((article, index) => (
          <NewsCard key={article.id} {...toArticleCard(article, locale, index === 0 ? 'featured' : 'standard')} readMoreLabel={strings.readMore} />
        ))}
      </Grid>
    </Container>
  );
}
