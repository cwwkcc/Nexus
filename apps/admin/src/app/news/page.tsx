import { Badge, Button, Container, Grid, GridItem, Input, Select, SectionHeader, Text } from '@nexus/ui';
import Link from 'next/link';

import { AdminShell } from '@/features/shell/AdminShell';
import { filterNewsArticles, normalizeNewsArticle } from '@/lib/news';

const initialArticles = [
  normalizeNewsArticle({
    title: 'School wins district sports title',
    slug: 'school-wins-district-sports-title',
    excerpt: 'Students celebrated a memorable finish after a strong season across all major fixtures.',
    category: 'Sports',
    publishedAt: '2026-08-01T09:00:00.000Z',
    status: 'published',
    featured: true,
    content: '<p>Students celebrated a memorable finish...</p>',
    imageUrl: '',
  }),
  normalizeNewsArticle({
    title: 'Academic excellence awards announced',
    slug: 'academic-excellence-awards-announced',
    excerpt: 'Top-performing students were recognised for outstanding results this year.',
    category: 'Academic',
    publishedAt: '2026-07-28T09:00:00.000Z',
    status: 'draft',
    featured: false,
    content: '<p>Top-performing students were recognised.</p>',
    imageUrl: '',
  }),
  normalizeNewsArticle({
    title: 'Open day schedule released',
    slug: 'open-day-schedule-released',
    excerpt: 'Families can tour the campus and meet faculty during the annual open day.',
    category: 'Events',
    publishedAt: '2026-07-15T09:00:00.000Z',
    status: 'archived',
    featured: false,
    content: '<p>Families can tour the campus.</p>',
    imageUrl: '',
  }),
];

export default function Page() {
  const articles = filterNewsArticles(initialArticles, { category: 'all', status: 'all' });

  return (
    <AdminShell title="News">
      <Container size="full" padding="none" className="space-y-8">
        <SectionHeader eyebrow="Content module" title="News" description="Review, publish, and manage school announcements and stories." variant="eyebrow-title-description" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            <Input label="Search" placeholder="Search by title or keyword" className="min-w-[220px]" />
            <Select
              label="Category"
              options={[
                { label: 'All categories', value: 'all' },
                { label: 'Academic', value: 'Academic' },
                { label: 'Sports', value: 'Sports' },
                { label: 'Events', value: 'Events' },
                { label: 'Achievements', value: 'Achievements' },
                { label: 'General', value: 'General' },
              ]}
              defaultValue="all"
            />
            <Select
              label="Status"
              options={[
                { label: 'All status', value: 'all' },
                { label: 'Published', value: 'published' },
                { label: 'Draft', value: 'draft' },
                { label: 'Archived', value: 'archived' },
              ]}
              defaultValue="all"
            />
          </div>

          <Link href="/news/new" className="rounded-xl bg-green-base px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-hover">
            New article
          </Link>
        </div>

        <Grid columns={1} gap={6} className="xl:grid-cols-2">
          {articles.map((article) => (
            <GridItem key={article.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-slate-950/30">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{article.title}</h3>
                  <Text color="muted" className="mt-1 text-sm">
                    {new Date(article.publishedAt).toLocaleDateString()} · {article.category}
                  </Text>
                </div>
                <Badge variant="status" status={article.status} />
              </div>

              <Text color="muted" className="mt-3 text-sm leading-6">
                {article.excerpt || article.content.replace(/<[^>]+>/g, '').slice(0, 140)}
              </Text>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={`/news/${article.id}`} className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-slate-500 hover:text-white">
                  Edit
                </Link>
                <Button type="button" variant="secondary" size="sm">
                  Publish
                </Button>
                <Button type="button" variant="ghost" size="sm">
                  Archive
                </Button>
              </div>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </AdminShell>
  );
}
