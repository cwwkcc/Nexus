// apps/admin/src/app/page.tsx
//
// Admin dashboard — only queries models that exist in the current Prisma schema:
//   ContentEntry, ContentEntryVersion, SiteSetting
//
// Models that don't exist yet (News, StaffMember, SchoolEvent, Society,
// AlumniProfile, AuditLog) are NOT referenced here. They will be added as
// their own features are implemented.

import { db } from '@nexus/db';
import {
  Container,
  Grid,
  GridItem,
  Heading,
  SectionHeader,
  Text,
} from '@nexus/ui';
import { PAGE_REGISTRY } from '@nexus/validation';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const [totalEntries, publishedEntries, draftEntries] = await Promise.all([
    db.contentEntry.count(),
    db.contentEntry.count({ where: { status: 'published' } }),
    db.contentEntry.count({ where: { status: 'draft' } }),
  ]);

  const recentVersions = await db.contentEntryVersion.findMany({
    take: 10,
    orderBy: { changedAt: 'desc' },
    include: {
      contentEntry: {
        select: { scope: true, sectionKey: true },
      },
    },
  });

  const metrics = [
    { label: 'Total sections', value: totalEntries },
    { label: 'Published', value: publishedEntries },
    { label: 'Drafts', value: draftEntries },
    { label: 'Pages in registry', value: PAGE_REGISTRY.length },
  ];

  return (
    <Container size="full" padding="lg" className="space-y-10">
      <SectionHeader
        eyebrow="Admin Dashboard"
        title="Overview"
        description="Content entry counts and recent save activity."
      />

      <Grid columns={1} gap={6} className="lg:grid-cols-4">
        {metrics.map((metric) => (
          <GridItem
            key={metric.label}
            className="rounded-3xl bg-slate-900 p-6 shadow-lg shadow-slate-950/30"
          >
            <Text variant="caption" color="muted">
              {metric.label}
            </Text>
            <Heading level="h2" className="mt-4">
              {metric.value}
            </Heading>
          </GridItem>
        ))}
      </Grid>

      {/* Quick links to page editors */}
      <section className="space-y-4 rounded-3xl bg-slate-900 p-6 shadow-lg shadow-slate-950/30">
        <Heading level="h3">Pages</Heading>
        <div className="flex flex-wrap gap-3">
          {PAGE_REGISTRY.map((r) => (
            <Link
              key={r.page}
              href={`/content/${r.page}`}
              className="rounded-xl bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
            >
              {r.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Recent save activity */}
      <section className="space-y-4 rounded-3xl bg-slate-900 p-6 shadow-lg shadow-slate-950/30">
        <Heading level="h3">Recent saves</Heading>
        <div className="space-y-3">
          {recentVersions.length === 0 ? (
            <Text color="muted">No saves recorded yet.</Text>
          ) : (
            recentVersions.map((v) => (
              <div
                key={v.id}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                  <span className="tabular-nums">
                    {new Date(v.changedAt).toLocaleString()}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    {v.contentEntry.scope} / {v.contentEntry.sectionKey}
                  </span>
                  <span>v{v.version}</span>
                </div>
                {v.changedBy && (
                  <Text className="mt-1 text-sm text-slate-300">
                    Saved by {v.changedBy}
                  </Text>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </Container>
  );
}
