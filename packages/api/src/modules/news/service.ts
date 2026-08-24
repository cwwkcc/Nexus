// packages/api/src/modules/news/service.ts
//
// All NewsArticle Prisma access lives here — router.ts validates input and
// calls these functions instead of touching ctx.db directly, mirroring
// modules/content/service.ts's split.
//
// M3 fixes applied here (see docs/Completion Plan.md M3 notes):
//   - create/update are now separate functions (previously one `saveArticle`
//     silently switched on whether `id` was present — a real footgun where a
//     typo'd id on "create" would silently overwrite an unrelated article,
//     and a missing id on "update" would silently insert a duplicate).
//   - update() now 404s (P2025) on a missing id instead of falling through
//     to an insert, matching contentService.setEntryStatus's error handling.
//   - Slug collisions (P2002 on the [locale, slug] unique index) now surface
//     as a real "slug already in use" error instead of a raw 500.
//   - Every write triggers the same cross-process revalidation as
//     ContentEntry writes (F-195) — scoped to 'news' plus the specific
//     article's own tag, since both the listing/home "latest news" and the
//     individual article page need invalidating.
//   - Added pagination (article list can be more than one page), getFeatured
//     (home page "Latest News", part of F-141 — independent of the `featured` flag,
//     which instead marks the pinned/hero slot on the listing page itself),
//     getRelated (F-144 "related articles"), getById (admin edit-by-id),
//     and bulkSetStatus (admin bulk actions, F-164).
//
// Pinned/featured-hero enforcement (F-143's "Featured Article" section):
// createArticle/updateArticle now unset any other featured: true row in the
// same locale inside the same transaction as the write, so at most one
// article can hold the listing page's hero slot per locale at a time.
// getPinned reads that slot; see its own doc comment for how it differs
// from getFeatured below, which is a different thing that happens to share
// the word "featured".
//
// Unlike ContentEntry, a NewsArticle row is not itself a translation of one
// canonical entry — each locale's article is authored independently, so
// there's no English-first fallback here the way contentService.getByScope
// has one. An untranslated article simply doesn't appear in that locale's
// list yet, which is the correct behavior for an independently-authored
// news item (as opposed to a page section that's translated in place).

import { triggerRevalidation } from '@nexus/config';
import { Prisma, type db as Db } from '@nexus/db';
import type { z } from 'zod';

import { newsErrors } from './errors.js';
import type { NewsArticleCreateInput, NewsArticleUpdateInput, NewsBulkStatusUpdateInput, NewsBySlugInput, NewsCategoryInput, NewsFeaturedInput, NewsGetByIdInput, NewsListInput, NewsPinnedInput, NewsRelatedInput, NewsStatusUpdateInput } from './validators.js';
import type { ApiConfig } from '../../config.js';

export type NewsListQuery = z.infer<typeof NewsListInput>;
export type NewsArticleCreate = z.infer<typeof NewsArticleCreateInput>;
export type NewsArticleUpdate = z.infer<typeof NewsArticleUpdateInput>;
export type NewsStatusUpdate = z.infer<typeof NewsStatusUpdateInput>;
export type NewsBulkStatusUpdate = z.infer<typeof NewsBulkStatusUpdateInput>;
export type NewsBySlug = z.infer<typeof NewsBySlugInput>;
export type NewsGetById = z.infer<typeof NewsGetByIdInput>;
export type NewsFeaturedQuery = z.infer<typeof NewsFeaturedInput>;
export type NewsRelatedQuery = z.infer<typeof NewsRelatedInput>;
export type NewsPinnedQuery = z.infer<typeof NewsPinnedInput>;

type NewsArticleRow = Awaited<ReturnType<typeof Db.newsArticle.findFirstOrThrow>>;

function serialize(article: NewsArticleRow) {
  return {
    id: article.id,
    locale: article.locale,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt ?? null,
    content: article.content,
    category: article.category as z.infer<typeof NewsCategoryInput>,
    author: article.author ?? null,
    status: article.status,
    featured: article.featured,
    imageUrl: article.imageUrl ?? null,
    publishedAt: article.publishedAt ? article.publishedAt.toISOString() : null,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  };
}

function emptyPage(page: number, pageSize: number) {
  return {
    items: [] as ReturnType<typeof serialize>[],
    pagination: { total: 0, page, pageSize, totalPages: 1, hasNextPage: false, hasPrevPage: false },
  };
}

/** Used by both the public `list` and admin `adminList` procedures — like
 * contentService.getByScope/adminGetByScope, a read degrades to an empty
 * result on DB failure rather than 500ing the news page or admin list. */
export async function listNews(db: typeof Db, input: NewsListQuery) {
  const { locale, query, status, category, page, pageSize } = input;

  const where: Record<string, unknown> = { locale };

  if (status && status !== 'all') {
    where.status = status;
  }

  if (category && category !== 'all') {
    where.category = category;
  }

  if (query && query.trim()) {
    where.OR = [{ title: { contains: query, mode: 'insensitive' } }, { excerpt: { contains: query, mode: 'insensitive' } }];
    // Not searching `content` — it's now Json (a Tiptap document), and
    // Prisma's `contains` string filter doesn't apply to JSON columns. A
    // full-text search over article body content is a real gap this
    // leaves open, but bolting on a raw-SQL JSON-text search here would be
    // a bigger, separate piece of work than fixing this module's shape.
  }

  try {
    const [total, articles] = await Promise.all([
      db.newsArticle.count({ where }),
      db.newsArticle.findMany({
        where,
        orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return {
      items: articles.map(serialize),
      pagination: {
        total,
        page,
        pageSize,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (err) {
    console.error('[newsService.listNews] falling back to an empty page —', err);
    return emptyPage(page, pageSize);
  }
}

export async function getBySlug(db: typeof Db, input: NewsBySlug) {
  try {
    const article = await db.newsArticle.findUnique({
      where: { locale_slug: { locale: input.locale, slug: input.slug } },
    });
    return article ? serialize(article) : null;
  } catch (err) {
    console.error('[newsService.getBySlug] falling back to null —', err);
    return null;
  }
}

export async function getById(db: typeof Db, input: NewsGetById) {
  const article = await db.newsArticle.findUnique({ where: { id: input.id } });
  if (!article) {
    throw newsErrors.notFound(input.id);
  }
  return serialize(article);
}

/** Home page "Latest News" (F-141) — the N most recently published
 * articles, independent of the `featured` boolean (which instead marks the
 * pinned hero slot on the News listing page itself, a separate concept). */
export async function getFeatured(db: typeof Db, input: NewsFeaturedQuery) {
  try {
    const articles = await db.newsArticle.findMany({
      where: { locale: input.locale, status: 'published' },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      take: input.limit,
    });
    return articles.map(serialize);
  } catch (err) {
    console.error('[newsService.getFeatured] falling back to [] —', err);
    return [];
  }
}

/** F-143 "Featured Article" hero slot on the listing page — the one
 * published article currently pinned via the `featured` flag, or null if
 * none is. Independent of getFeatured above: that's the home page's "N
 * most recent" and never looks at this flag. The shared word "featured" is
 * an unfortunate naming collision between two different concepts, not the
 * same mechanism used twice. orderBy is a defensive tiebreaker only —
 * normal operation should never have more than one row with featured: true
 * per locale, see createArticle/updateArticle. */
export async function getPinned(db: typeof Db, input: NewsPinnedQuery) {
  try {
    const article = await db.newsArticle.findFirst({
      where: { locale: input.locale, status: 'published', featured: true },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    });
    return article ? serialize(article) : null;
  } catch (err) {
    console.error('[newsService.getPinned] falling back to null —', err);
    return null;
  }
}

/** F-144 "related articles" — same category, published, excluding the
 * current article, most recent first. */
export async function getRelated(db: typeof Db, input: NewsRelatedQuery) {
  try {
    const articles = await db.newsArticle.findMany({
      where: {
        locale: input.locale,
        status: 'published',
        category: input.category,
        id: { not: input.excludeId },
      },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      take: input.limit,
    });
    return articles.map(serialize);
  } catch (err) {
    console.error('[newsService.getRelated] falling back to [] —', err);
    return [];
  }
}

export async function createArticle(db: typeof Db, config: ApiConfig, input: NewsArticleCreate) {
  const payload = {
    locale: input.locale,
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt ?? null,
    content: input.content as Prisma.InputJsonValue,
    category: input.category,
    author: input.author ?? null,
    status: input.status,
    featured: input.featured,
    imageUrl: input.imageUrl ?? null,
    publishedAt: input.publishedAt ? new Date(input.publishedAt) : null,
  };

  let article;
  try {
    if (input.featured) {
      // Only one article can hold the pinned/hero slot per locale — unset
      // whoever currently holds it in the same transaction as the insert.
      const [, created] = await db.$transaction([db.newsArticle.updateMany({ where: { locale: input.locale, featured: true }, data: { featured: false } }), db.newsArticle.create({ data: payload })]);
      article = created;
    } else {
      article = await db.newsArticle.create({ data: payload });
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
      throw newsErrors.slugConflict(input.locale, input.slug);
    }
    throw newsErrors.saveFailed(err);
  }

  await revalidateNews(config, article.id);
  return serialize(article);
}

export async function updateArticle(db: typeof Db, config: ApiConfig, input: NewsArticleUpdate) {
  const { id, ...rest } = input;
  const payload = {
    locale: rest.locale,
    slug: rest.slug,
    title: rest.title,
    excerpt: rest.excerpt ?? null,
    content: rest.content as Prisma.InputJsonValue,
    category: rest.category,
    author: rest.author ?? null,
    status: rest.status,
    featured: rest.featured,
    imageUrl: rest.imageUrl ?? null,
    publishedAt: rest.publishedAt ? new Date(rest.publishedAt) : null,
  };

  let article;
  try {
    if (rest.featured) {
      const [, updated] = await db.$transaction([db.newsArticle.updateMany({ where: { locale: rest.locale, featured: true, id: { not: id } }, data: { featured: false } }), db.newsArticle.update({ where: { id }, data: payload })]);
      article = updated;
    } else {
      article = await db.newsArticle.update({ where: { id }, data: payload });
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw newsErrors.notFound(id);
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
      throw newsErrors.slugConflict(rest.locale, rest.slug);
    }
    throw newsErrors.saveFailed(err);
  }

  await revalidateNews(config, article.id);
  return serialize(article);
}

export async function updateStatus(db: typeof Db, config: ApiConfig, input: NewsStatusUpdate) {
  let article;
  try {
    article = await db.newsArticle.update({
      where: { id: input.id },
      data: { status: input.status, publishedAt: input.status === 'published' ? new Date() : undefined },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw newsErrors.notFound(input.id);
    }
    throw newsErrors.statusUpdateFailed(err);
  }

  await revalidateNews(config, article.id);
  return serialize(article);
}

/** Admin bulk actions (F-164) — publish/archive/draft several selected
 * articles in one round trip instead of the client firing N sequential
 * setStatus calls. Runs as a single transaction: either every row updates
 * or none do, rather than leaving a bulk action half-applied if one id in
 * the batch is stale. */
export async function bulkUpdateStatus(db: typeof Db, config: ApiConfig, input: NewsBulkStatusUpdate) {
  const publishedAt = input.status === 'published' ? new Date() : undefined;

  const articles = await db.$transaction(
    input.ids.map((id) =>
      db.newsArticle.update({
        where: { id },
        data: { status: input.status, publishedAt },
      }),
    ),
  );

  await Promise.all(articles.map((article) => revalidateNews(config, article.id)));
  return articles.map(serialize);
}

/** On-demand cache invalidation (F-195), same mechanism as
 * contentService.revalidateScope. Tags both the general 'news' scope
 * (listing page + home "Latest News" block) and the specific article, so
 * an edit to one published article doesn't force-bust every other
 * article's cached page too. */
async function revalidateNews(config: ApiConfig, articleId: string): Promise<void> {
  const { webAppUrl, secret } = config.revalidate;

  if (!webAppUrl || !secret) {
    console.error(`[newsService] skipping revalidation for article "${articleId}" — WEB_APP_URL_INTERNAL or REVALIDATE_SECRET not set`);
    return;
  }

  await Promise.all([triggerRevalidation({ webAppUrl, secret, scope: 'news' }), triggerRevalidation({ webAppUrl, secret, scope: `news:${articleId}` })]);
}
