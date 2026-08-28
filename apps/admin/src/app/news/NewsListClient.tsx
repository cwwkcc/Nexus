'use client';

// apps/admin/src/app/news/NewsListClient.tsx
//
// F-164: status badges, search, category/date filter, bulk actions. Search,
// category/status filters, and the date range push into the URL (?q=&
// category=&status=&dateFrom=&dateTo=&page=) so the server component
// re-fetches via caller.news.adminList — real server-side pagination, not
// a client-side slice-of-100 pretending to paginate. The date range
// filters on `updatedAt` (see validators.ts's NewsListInput) rather than
// publishedAt, so it applies to drafts too, not just published articles.

import { LOCALE_LABELS, NEWS_CATEGORIES, SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { Badge, Button, Input, Pagination, Select } from '@nexus/ui';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

import { bulkSetNewsArticleStatus, setNewsArticleStatus } from './actions.js';
import type { AdminNewsArticle, NewsCategory, NewsStatus } from '../../lib/news.js';

const localeOptions = SUPPORTED_LOCALES.map((value) => ({ value, label: LOCALE_LABELS[value] }));
const categoryOptions = [{ value: 'all', label: 'All categories' }, ...Object.entries(NEWS_CATEGORIES).map(([value, label]) => ({ value, label }))];
const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'In Review' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

interface NewsListClientProps {
  articles: AdminNewsArticle[];
  pagination: { page: number; totalPages: number };
  currentQuery: string;
  currentStatus: string;
  currentCategory: string;
  currentLocale: LocaleEnumData;
  currentDateFrom: string;
  currentDateTo: string;
}

export function NewsListClient({ articles, pagination, currentQuery, currentStatus, currentCategory, currentLocale, currentDateFrom, currentDateTo }: NewsListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState(currentQuery);
  const [bulkError, setBulkError] = useState<string | null>(null);

  const pushParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    if (!('page' in updates)) {
      params.delete('page');
    }
    startTransition(() => {
      router.push(`/news?${params.toString()}`);
    });
  };

  const toggleSelected = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelected((prev) => (prev.size === articles.length ? new Set() : new Set(articles.map((a) => a.id))));
  };

  const runBulk = async (status: NewsStatus) => {
    setBulkError(null);
    const result = await bulkSetNewsArticleStatus(Array.from(selected), status);
    if (!result.ok) {
      setBulkError(result.error);
      return;
    }
    setSelected(new Set());
    router.refresh();
  };

  const runRowAction = async (id: string, status: NewsStatus) => {
    const result = await setNewsArticleStatus(id, status);
    if (!result.ok) {
      setBulkError(result.error);
      return;
    }
    router.refresh();
  };

  return (
    <div className="gap-space-6 flex flex-col">
      <div className="gap-space-4 flex flex-col md:flex-row md:items-end">
        <form
          className="flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            pushParams({ q: query });
          }}
        >
          <Input label="Search" placeholder="Search by title, excerpt, or author…" value={query} onChange={(e) => setQuery(e.target.value)} type="search" />
        </form>
        <Select label="Category" options={categoryOptions} value={currentCategory} onChange={(e) => pushParams({ category: e.target.value })} className="w-full md:w-56" />
        <Select label="Status" options={statusOptions} value={currentStatus} onChange={(e) => pushParams({ status: e.target.value })} className="w-full md:w-48" />
        <Input label="From" type="date" value={currentDateFrom} onChange={(e) => pushParams({ dateFrom: e.target.value })} className="w-full md:w-40" />
        <Input label="To" type="date" value={currentDateTo} onChange={(e) => pushParams({ dateTo: e.target.value })} className="w-full md:w-40" />
        <Select label="Language" options={localeOptions} value={currentLocale} onChange={(e) => pushParams({ locale: e.target.value })} className="w-full md:w-40" />
        <Button type="button" variant="secondary" onClick={() => router.push('/news/new')}>
          New article
        </Button>
      </div>

      {bulkError && (
        <div role="alert" className="border-semantic-error-base bg-surface-elevated px-space-4 py-space-3 text-body text-semantic-error-base rounded-md border">
          {bulkError}
        </div>
      )}

      {selected.size > 0 && (
        <div role="toolbar" aria-label="Bulk actions" className="gap-space-3 border-border-default bg-surface-default px-space-4 py-space-3 flex flex-wrap items-center rounded-md border">
          <span className="text-label text-text-primary">{selected.size} selected</span>
          <Button size="sm" variant="secondary" onClick={() => runBulk('review')}>
            Submit for review
          </Button>
          <Button size="sm" variant="secondary" onClick={() => runBulk('published')}>
            Publish
          </Button>
          <Button size="sm" variant="outline" onClick={() => runBulk('archived')}>
            Archive
          </Button>
          <Button size="sm" variant="ghost" onClick={() => runBulk('draft')}>
            Move to draft
          </Button>
        </div>
      )}

      <div className={isPending ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
        {articles.length === 0 ? (
          <div className="border-border-default px-space-6 py-space-8 text-body text-text-muted rounded-md border border-dashed text-center">No articles match these filters.</div>
        ) : (
          <div className="border-border-default overflow-hidden rounded-md border">
            <table className="w-full border-collapse text-left">
              <thead className="bg-surface-default">
                <tr>
                  <th className="w-space-9 px-space-4 py-space-3">
                    <input type="checkbox" aria-label="Select all articles" checked={selected.size === articles.length && articles.length > 0} onChange={toggleSelectAll} />
                  </th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Title</th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Category</th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Status</th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Updated</th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-border-default bg-surface-elevated border-t">
                    <td className="px-space-4 py-space-3">
                      <input type="checkbox" aria-label={`Select "${article.title}"`} checked={selected.has(article.id)} onChange={() => toggleSelected(article.id)} />
                    </td>
                    <td className="px-space-4 py-space-3">
                      <Link href={`/news/${article.id}`} className="font-body text-body text-text-primary hover:text-gold-hover">
                        {article.title}
                      </Link>
                      {article.featured && <Badge variant="category" label="Featured" className="ml-space-2" />}
                    </td>
                    <td className="px-space-4 py-space-3 text-body text-text-muted">{NEWS_CATEGORIES[article.category as NewsCategory]}</td>
                    <td className="px-space-4 py-space-3">
                      <Badge variant="status" status={article.status} />
                    </td>
                    <td className="px-space-4 py-space-3 text-body text-text-muted">{new Date(article.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td className="px-space-4 py-space-3">
                      <div className="gap-space-2 flex items-center">
                        <Button size="sm" variant="ghost" onClick={() => router.push(`/news/${article.id}`)}>
                          Edit
                        </Button>
                        {article.status === 'draft' && (
                          <Button size="sm" variant="ghost" onClick={() => runRowAction(article.id, 'review')}>
                            Submit for Review
                          </Button>
                        )}
                        {article.status === 'review' && (
                          <Button size="sm" variant="ghost" onClick={() => runRowAction(article.id, 'published')}>
                            Publish
                          </Button>
                        )}
                        {article.status !== 'archived' && (
                          <Button size="sm" variant="ghost" onClick={() => runRowAction(article.id, 'archived')}>
                            Archive
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} onPageChange={(page) => pushParams({ page: String(page) })} />
    </div>
  );
}
