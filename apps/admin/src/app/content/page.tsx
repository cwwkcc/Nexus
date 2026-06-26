// apps/admin/src/app/content/page.tsx
//
// Content management landing page.
// Lists all registered pages with fill-status indicators.
// Clicking a page navigates to /admin/content/[pageKey].

import { createServerCaller } from '@nexus/api';
import { Container, Heading, SectionHeader, Text } from '@nexus/ui';
import { PAGE_REGISTRY } from '@nexus/validation';
import Link from 'next/link';

export default async function ContentIndexPage() {
  const caller = createServerCaller();

  // Check fill status for all pages across all three locales.
  // One DB query per page (not per section) — acceptable at this scale.
  const pageStatuses = await Promise.all(
    PAGE_REGISTRY.map(async (registry) => {
      // Fetch published entries for EN (the baseline locale) to count sections.
      const enEntries = await caller.contentEntry.adminGetByScope({
        scope: registry.scope,
        locale: 'en',
      });

      const totalSections = registry.sections.length;
      const publishedCount = Object.values(enEntries).filter(
        (e) => e.status === 'published',
      ).length;
      const draftCount = Object.values(enEntries).filter(
        (e) => e.status === 'draft',
      ).length;

      return {
        registry,
        totalSections,
        publishedCount,
        draftCount,
        emptyCount: totalSections - publishedCount - draftCount,
      };
    }),
  );

  return (
    <Container size="full" padding="lg" className="space-y-10">
      <SectionHeader
        eyebrow="Content Management"
        title="Pages"
        description="Select a page to edit its content in English, Sinhala, and Tamil."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pageStatuses.map(
          ({
            registry,
            totalSections,
            publishedCount,
            draftCount,
            emptyCount,
          }) => {
            const allPublished =
              publishedCount === totalSections && totalSections > 0;
            const allEmpty = publishedCount === 0 && draftCount === 0;

            const statusLabel = allPublished
              ? 'Complete'
              : allEmpty
                ? 'Empty'
                : 'In progress';

            const statusColor = allPublished
              ? 'text-green-400'
              : allEmpty
                ? 'text-slate-500'
                : 'text-yellow-400';

            return (
              <Link
                key={registry.page}
                href={`/content/${registry.page}`}
                className="group block rounded-3xl bg-slate-900 p-6 shadow-lg shadow-slate-950/30 transition hover:bg-slate-800"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <Heading level="h3" className="text-lg">
                    {registry.label}
                  </Heading>
                  <span
                    className={['text-xs font-medium', statusColor].join(' ')}
                  >
                    {statusLabel}
                  </span>
                </div>

                {registry.description && (
                  <Text color="muted" className="mb-4 text-sm">
                    {registry.description}
                  </Text>
                )}

                {/* Fill progress bar */}
                {totalSections > 0 && (
                  <div className="space-y-2">
                    <div className="flex overflow-hidden rounded-full bg-slate-800 h-1.5">
                      <div
                        className="bg-green-600 transition-all"
                        style={{
                          width: `${(publishedCount / totalSections) * 100}%`,
                        }}
                      />
                      <div
                        className="bg-yellow-600 transition-all"
                        style={{
                          width: `${(draftCount / totalSections) * 100}%`,
                        }}
                      />
                    </div>
                    <Text color="muted" className="text-xs">
                      {publishedCount} published · {draftCount} draft ·{' '}
                      {emptyCount} empty · {totalSections} total
                    </Text>
                  </div>
                )}

                {totalSections === 0 && (
                  <Text color="muted" className="text-xs italic">
                    No sections registered yet.
                  </Text>
                )}
              </Link>
            );
          },
        )}
      </div>
    </Container>
  );
}
