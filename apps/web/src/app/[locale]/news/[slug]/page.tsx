// apps/web/src/app/[locale]/news/[slug]/page.tsx
//
// F-144: individual article page. Was a 3-line stub. Statically generated
// at build time (generateStaticParams below) with per-article OG metadata
// and NewsArticle JSON-LD (F-104).

import { NEWS_CATEGORIES, SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { Badge, Container, Grid, Heading, NewsCard, RichTextRenderer, Text } from '@nexus/ui';
import { clientEnv } from '@nexus/env/client';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { JSONContent } from '@tiptap/react';

import { ArticleShareButton } from './ArticleShareButton';
import { toArticleCard } from '../../../../lib/news-card';
import { NEWS_STRINGS } from '../../../../lib/news-i18n';
import { getNewsArticleBySlug, getRelatedNews } from '../../../../server/news';

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

function resolveLocale(locale: string): LocaleEnumData {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale) ? (locale as LocaleEnumData) : 'en';
}

// Statically generated at build time (F-144) — every published article, in
// every locale it's actually published in. A brand-new article published
// after a build won't have a static page until the next build/ISR
// revalidation (see newsService.revalidateNews); that's the expected
// trade-off of static generation, not a bug to route around here.
export async function generateStaticParams(): Promise<Array<{ locale: string; slug: string }>> {
  const { createServerCaller } = await import('@nexus/api');
  const caller = createServerCaller();

  const perLocale = await Promise.all(
    SUPPORTED_LOCALES.map(async (locale) => {
      const { items } = await caller.news.list({ locale, status: 'published', page: 1, pageSize: 200 });
      return items.map((article) => ({ locale, slug: article.slug }));
    }),
  );

  return perLocale.flat();
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale = resolveLocale(locale);
  const article = await getNewsArticleBySlug(safeLocale, slug);

  if (!article) {
    return { title: 'Article not found' };
  }

  const description = article.excerpt ?? undefined;

  return {
    title: `${article.title} — C.W.W. Kannangara Central College`,
    description,
    // No `images` here: this segment has its own opengraph-image.tsx, and
    // Next.js's file-convention route already generates the og:image tag
    // for it. Setting images here too used to point social shares at the
    // raw uploaded cover photo instead of the branded template — two
    // uncoordinated sources for the same tag, whichever Next.js picked.
    openGraph: {
      title: article.title,
      description,
      type: 'article',
      publishedTime: article.publishedAt ?? undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = NEWS_STRINGS[safeLocale];

  const article = await getNewsArticleBySlug(safeLocale, slug);
  if (!article || article.status !== 'published') {
    notFound();
  }

  const related = await getRelatedNews(safeLocale, article.id, article.category, 3);
  const url = `${clientEnv.NEXT_PUBLIC_SITE_URL}/${safeLocale}/news/${article.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt ?? undefined,
    image: article.imageUrl ?? undefined,
    datePublished: article.publishedAt ?? article.createdAt,
    dateModified: article.updatedAt,
    author: article.author ? { '@type': 'Person', name: article.author } : { '@type': 'Organization', name: 'C.W.W. Kannangara Central College' },
    publisher: {
      '@type': 'Organization',
      name: 'C.W.W. Kannangara Central College',
      url: clientEnv.NEXT_PUBLIC_SITE_URL,
    },
    mainEntityOfPage: url,
  };

  return (
    <Container size="md" padding="lg" as="article">
      {/* eslint-disable-next-line react/no-danger -- static, server-generated JSON-LD from our own data, not user input. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href={`/${safeLocale}/news`} className="font-body text-caption uppercase tracking-caption text-gold-base hover:text-gold-hover">
        ← {strings.backToNews}
      </Link>

      <header className="mt-space-6 flex flex-col gap-space-4">
        <Badge variant="category" label={NEWS_CATEGORIES[article.category as keyof typeof NEWS_CATEGORIES] ?? article.category} />
        <Heading level="h1">{article.title}</Heading>
        <div className="flex flex-wrap items-center gap-space-3 font-body text-caption uppercase tracking-caption text-text-muted">
          <span>
            {strings.publishedOn} {new Date(article.publishedAt ?? article.createdAt).toLocaleDateString(safeLocale, { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          {article.author && (
            <span>
              · {strings.by} {article.author}
            </span>
          )}
        </div>
        <ArticleShareButton title={article.title} url={url} label={strings.share} />
      </header>

      <div className="mt-space-8">
        <RichTextRenderer value={article.content as JSONContent} />
      </div>

      {related.length > 0 && (
        <section className="mt-space-16 border-t border-border-default pt-space-10">
          <Heading level="h2" className="mb-space-6">
            {strings.relatedArticles}
          </Heading>
          <Grid columns="repeat(auto-fit, minmax(260px, 1fr))" gap={6}>
            {related.map((item) => (
              <NewsCard key={item.id} {...toArticleCard(item, safeLocale, 'compact')} readMoreLabel={strings.readMore} />
            ))}
          </Grid>
        </section>
      )}
    </Container>
  );
}
