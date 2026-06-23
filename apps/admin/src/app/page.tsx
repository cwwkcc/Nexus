import Link from 'next/link';
import { db } from '@nexus/db';
import {
  Badge,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  SectionHeader,
  Text,
} from '@nexus/ui';

export default async function AdminDashboardPage() {
  const [newsCount, staffCount, eventCount, societiesCount, pendingAlumniCount, recentAudit] =
    await Promise.all([
      db.news.count(),
      db.staffMember.count({ where: { deletedAt: null } }),
      db.schoolEvent.count({ where: { deletedAt: null } }),
      db.society.count({ where: { deletedAt: null } }),
      db.alumniProfile.count({ where: { status: 'pending' } }),
      db.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

  return (
    <Container size="full" padding="lg" className="space-y-10">
      <SectionHeader
        eyebrow="Admin Dashboard"
        title="Overview"
        description="Live counts, pending items, and recent audit activity."
      />

      <Grid columns={1} gap={6} className="lg:grid-cols-3">
        {[
          { label: 'News articles', value: newsCount },
          { label: 'Staff profiles', value: staffCount },
          { label: 'Events', value: eventCount },
          { label: 'Societies', value: societiesCount },
          { label: 'Pending alumni', value: pendingAlumniCount },
        ].map((metric) => (
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

      <section className="space-y-4 rounded-3xl bg-slate-900 p-6 shadow-lg shadow-slate-950/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Heading level="h3">Recent audit activity</Heading>
          <Button asChild>
            <Link href="/page-config">Open page config</Link>
          </Button>
        </div>
        <div className="space-y-3">
          {recentAudit.length === 0 ? (
            <Text color="muted">No audit activity yet.</Text>
          ) : (
            recentAudit.map((entry) => (
              <div
                key={entry.id}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                  <span>{new Date(entry.createdAt).toLocaleString()}</span>
                  <Badge variant="secondary">{entry.entityType}</Badge>
                  <span>{entry.action}</span>
                </div>
                <Text className="mt-2 text-slate-200">
                  Performed by {entry.performedBy}
                </Text>
              </div>
            ))
          )}
        </div>
      </section>
    </Container>
  );
}
