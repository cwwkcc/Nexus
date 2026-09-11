// apps/admin/src/lib/news.ts
//
// M3 rewrite. This used to be a self-contained mock-data helper (a
// `normalizeNewsArticle` that invented sensible defaults for a client-only
// prototype, plus the old 5-category enum). Now that the news pages read
// real data via tRPC, `AdminNewsArticle` is inferred directly from the
// actual router output (inferRouterOutputs<AppRouter>) rather than
// hand-declared, so it can't silently drift from the API. `slugify`
// survives since it's still genuinely useful for NewsForm's title-to-slug
// auto-fill; `normalizeNewsArticle` is gone — there's nothing left to
// "normalize", since createArticle/updateArticle now validate against the
// real schema and reject bad input outright instead of silently coercing
// it. `filterNewsArticles` (and the `NewsFilters` type it existed for) is
// gone as of this pass too: NewsListClient does real server-side filtering
// via URL params + adminList now, and this had no live callers left.

import type { AppRouter } from '@nexus/api';
import type { inferRouterOutputs } from '@trpc/server';

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type AdminNewsArticle = RouterOutputs['news']['adminList']['items'][number];
export type NewsStatus = AdminNewsArticle['status'];
export type NewsCategory = AdminNewsArticle['category'];

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
