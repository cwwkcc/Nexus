import { PAGE_REGISTRY } from '@nexus/contracts';
import { Container, Grid, GridItem, Heading, SectionHeader, Text } from '@nexus/ui';
import Link from 'next/link';

import { AdminShell } from '@/features/shell/AdminShell';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const session = await auth();

  const metrics = [
    { label: 'Pages managed', value: Object.keys(PAGE_REGISTRY).length },
    { label: 'Published content', value: 'Live' },
    { label: 'Drafts in review', value: 'Ready' },
    { label: 'Current role', value: session?.user?.role ?? 'viewer' },
  ];

  return (
    <AdminShell title="Dashboard">
      <Container size="full" padding="none" className="space-y-8">
        <SectionHeader eyebrow="Admin Dashboard" title="Overview" description="Operational status across the CMS." variant="eyebrow-title-description" />

        <Grid columns={1} gap={6} className="lg:grid-cols-4">
          {metrics.map((metric) => (
            <GridItem key={metric.label} className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-slate-950/30">
              <Text variant="caption" color="muted">
                {metric.label}
              </Text>
              <Heading level="h2" className="mt-4 text-3xl font-semibold text-white">
                {metric.value}
              </Heading>
            </GridItem>
          ))}
        </Grid>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-slate-950/30">
            <div className="mb-4 flex items-center justify-between gap-3">
              <Heading level="h3">Quick actions</Heading>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/news" className="rounded-xl bg-green-base px-4 py-2 text-sm font-medium text-white transition hover:bg-green-hover">
                Manage News
              </Link>
              <Link href="/content/home" className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:text-white">
                Edit home page
              </Link>
              <Link href="/content/about" className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:text-white">
                Edit about page
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-slate-950/30">
            <Heading level="h3">Current session</Heading>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div>
                <Text color="muted">Signed in as</Text>
                <div className="mt-1 font-medium text-white">{session?.user?.email ?? 'Signed out'}</div>
              </div>
              <div>
                <Text color="muted">Role</Text>
                <div className="mt-1 font-medium capitalize text-white">{session?.user?.role ?? 'viewer'}</div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </AdminShell>
  );
}
