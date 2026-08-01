import type { db as Db } from '@nexus/db';
import type { z } from 'zod';

import { newsErrors } from './errors.js';
import type { NewsArticleInput, NewsBySlugInput, NewsListInput, NewsStatusUpdateInput } from './validators.js';

export type NewsListQuery = z.infer<typeof NewsListInput>;
export type NewsArticlePayload = z.infer<typeof NewsArticleInput>;
export type NewsStatusUpdate = z.infer<typeof NewsStatusUpdateInput>;
export type NewsBySlug = z.infer<typeof NewsBySlugInput>;

export async function listNews(db: typeof Db, input: NewsListQuery) {
  const { locale, query, status, category } = input;

  const where: Record<string, unknown> = { locale };

  if (status && status !== 'all') {
    where.status = status;
  }

  if (category && category !== 'all') {
    where.category = category;
  }

  if (query && query.trim()) {
    where.OR = [{ title: { contains: query, mode: 'insensitive' } }, { excerpt: { contains: query, mode: 'insensitive' } }, { content: { contains: query, mode: 'insensitive' } }];
  }

  const articles = await db.newsArticle.findMany({
    where,
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
  });

  return articles.map((article) => ({
    id: article.id,
    locale: article.locale,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt ?? null,
    content: article.content,
    category: article.category as 'Academic' | 'Sports' | 'Events' | 'Achievements' | 'General',
    status: article.status,
    featured: article.featured,
    imageUrl: article.imageUrl ?? null,
    publishedAt: article.publishedAt ? article.publishedAt.toISOString() : null,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  }));
}

export async function getBySlug(db: typeof Db, input: NewsBySlug) {
  const article = await db.newsArticle.findUnique({
    where: { locale_slug: { locale: input.locale, slug: input.slug } },
  });

  if (!article) {
    return null;
  }

  return {
    id: article.id,
    locale: article.locale,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt ?? null,
    content: article.content,
    category: article.category as 'Academic' | 'Sports' | 'Events' | 'Achievements' | 'General',
    status: article.status,
    featured: article.featured,
    imageUrl: article.imageUrl ?? null,
    publishedAt: article.publishedAt ? article.publishedAt.toISOString() : null,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  };
}

export async function saveArticle(db: typeof Db, input: NewsArticlePayload) {
  const payload = {
    locale: input.locale,
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt ?? null,
    content: input.content,
    category: input.category,
    status: input.status,
    featured: input.featured,
    imageUrl: input.imageUrl ?? null,
    publishedAt: input.publishedAt ? new Date(input.publishedAt) : null,
  };

  const article = input.id
    ? await db.newsArticle.update({
        where: { id: input.id },
        data: payload,
      })
    : await db.newsArticle.create({ data: payload });

  if (!article) {
    throw newsErrors.saveFailed(new Error('No article returned from the database.'));
  }

  return {
    id: article.id,
    locale: article.locale,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt ?? null,
    content: article.content,
    category: article.category as 'Academic' | 'Sports' | 'Events' | 'Achievements' | 'General',
    status: article.status,
    featured: article.featured,
    imageUrl: article.imageUrl ?? null,
    publishedAt: article.publishedAt ? article.publishedAt.toISOString() : null,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  };
}

export async function updateStatus(db: typeof Db, input: NewsStatusUpdate) {
  try {
    const article = await db.newsArticle.update({
      where: { id: input.id },
      data: { status: input.status },
    });

    return {
      id: article.id,
      locale: article.locale,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt ?? null,
      content: article.content,
      category: article.category as 'Academic' | 'Sports' | 'Events' | 'Achievements' | 'General',
      status: article.status,
      featured: article.featured,
      imageUrl: article.imageUrl ?? null,
      publishedAt: article.publishedAt ? article.publishedAt.toISOString() : null,
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
    };
  } catch (error) {
    throw newsErrors.statusUpdateFailed(error);
  }
}
