// apps/admin/src/lib/news.ts
//
// M3 rewrite. This used to be a self-contained mock-data helper (a
// `normalizeNewsArticle` that invented sensible defaults for a client-only
// prototype, plus the old 5-category enum). Now that the news pages read
// real data via tRPC, `AdminNewsArticle` is inferred directly from the
// actual router output (inferRouterOutputs<AppRouter>) rather than
// hand-declared, so it can't silently drift from the API. `slugify` and
// `filterNewsArticles` survive since both are still genuinely useful;
// `normalizeNewsArticle` is gone — there's nothing left to "normalize",
// since createArticle/updateArticle now validate against the real schema
// and reject bad input outright instead of silently coercing it.

import type { AppRouter } from '@nexus/api';
import type { inferRouterOutputs } from '@trpc/server';

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type AdminNewsArticle = RouterOutputs['news']['adminList']['items'][number];
export type NewsStatus = AdminNewsArticle['status'];
export type NewsCategory = AdminNewsArticle['category'];

export interface NewsFilters {
  query?: string;
  status?: NewsStatus | 'all';
  category?: NewsCategory | 'all';
}

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Plain-text search over title/excerpt/author. Not searching `content` —
 * it's a Tiptap document object now, not a string; see service.ts's note
 * on the same limitation for the server-side search. */
export function filterNewsArticles(articles: AdminNewsArticle[], filters: NewsFilters = {}): AdminNewsArticle[] {
  const query = (filters.query ?? '').trim().toLowerCase();
  const status = filters.status ?? 'all';
  const category = filters.category ?? 'all';

  return articles.filter((article) => {
    const matchesQuery = !query || [article.title, article.excerpt ?? '', article.author ?? '', article.slug].some((value) => value.toLowerCase().includes(query));
    const matchesStatus = status === 'all' || article.status === status;
    const matchesCategory = category === 'all' || article.category === category;

    return matchesQuery && matchesStatus && matchesCategory;
  });
}
