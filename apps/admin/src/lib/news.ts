export type NewsStatus = 'draft' | 'published' | 'archived';
export type NewsCategory = 'Academic' | 'Sports' | 'Events' | 'Achievements' | 'General';

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: NewsCategory;
  status: NewsStatus;
  featured: boolean;
  publishedAt: string;
  content: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsFilters {
  query?: string;
  status?: NewsStatus | 'all';
  category?: NewsCategory | 'all';
}

const categorySet = new Set<NewsCategory>(['Academic', 'Sports', 'Events', 'Achievements', 'General']);

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function normalizeNewsArticle(input: Partial<NewsArticle> & Pick<NewsArticle, 'title' | 'slug' | 'category' | 'publishedAt' | 'status' | 'featured' | 'content'>): NewsArticle {
  const safeCategory = categorySet.has(input.category as NewsCategory) ? (input.category as NewsCategory) : 'General';
  const normalizedTitle = input.title?.trim() ?? 'Untitled article';
  const normalizedSlug = slugify(input.slug ?? normalizedTitle) || slugify(normalizedTitle) || 'untitled-article';

  return {
    id: input.id ?? normalizedSlug,
    title: normalizedTitle,
    slug: normalizedSlug,
    excerpt: (input.excerpt ?? '').trim(),
    category: safeCategory,
    status: input.status ?? 'draft',
    publishedAt: input.publishedAt ?? new Date().toISOString(),
    featured: Boolean(input.featured),
    content: input.content?.trim() || 'No content provided yet.',
    imageUrl: input.imageUrl ?? '',
    createdAt: input.createdAt ?? new Date().toISOString(),
    updatedAt: input.updatedAt ?? new Date().toISOString(),
  };
}

export function filterNewsArticles(articles: NewsArticle[], filters: NewsFilters = {}): NewsArticle[] {
  const query = (filters.query ?? '').trim().toLowerCase();
  const status = filters.status ?? 'all';
  const category = filters.category ?? 'all';

  return articles.filter((article) => {
    const matchesQuery = !query || [article.title, article.excerpt, article.content, article.slug].some((value) => value.toLowerCase().includes(query));
    const matchesStatus = status === 'all' || article.status === status;
    const matchesCategory = category === 'all' || article.category === category;

    return matchesQuery && matchesStatus && matchesCategory;
  });
}
