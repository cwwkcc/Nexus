// apps/web/src/app/[locale]/archive/page.tsx
//
// F-155: Digital Archive. Historical photographs, magazines (PDFs), prize-giving
// records, prefect lists. Browsable by year and category. Was a comment-only stub
// with no default export at all — every request to this route would have failed to build.

import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { ArchiveCard, Container, Grid, Hero, Text } from '@nexus/ui';
import { toArchiveCardData } from '@nexus/contracts';
import type { Metadata } from 'next';

import { ArchivePagination } from './ArchivePagination';
import { ARCHIVE_STRINGS } from '../../../lib/archive-i18n';
import { getArchiveList, getArchivePageChrome } from '../../../server/archive';

interface ArchivePageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function resolveLocale(locale: string): LocaleEnumData {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale) ? (locale as LocaleEnumData) : 'en';
}

export async function generateMetadata({ params }: ArchivePageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = ARCHIVE_STRINGS[safeLocale];
  return {
    title: `${strings.pageTitle} — C.W.W. Kannangara Central College`,
    description: strings.pageTitle,
  };
}

export default async function ArchivePage({ params, searchParams }: ArchivePageProps) {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = ARCHIVE_STRINGS[safeLocale];

  const query = await searchParams;
  const category = firstValue(query.category) ?? '';
  const year = firstValue(query.year) ?? '';
  const page = firstValue(query.page) ? Number(firstValue(query.page)) : 1;

  const [{ hero }, archive] = await Promise.all([getArchivePageChrome(safeLocale), getArchiveList({ category, year, page })]);

  return (
    <>
      <Hero variant="subpage" heading={hero.title} eyebrow={hero.eyebrow} subheading={hero.subtitle} breadcrumb={[{ label: 'Home', href: `/${safeLocale}` }, { label: strings.pageTitle }]} />

      <Container size="lg" padding="lg" as="section">
        <div className="mt-space-8 flex flex-col gap-space-6">
          <div className="mt-space-8 flex flex-col gap-space-6">
            {archive.items.length === 0 ? (
              <Text color="muted" className="py-space-12 text-center">
                {strings.noResults}
              </Text>
            ) : (
              <Grid columns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
                {archive.items.map((entry) => (
                  <ArchiveCard key={entry.id} {...toArchiveCardData(entry)} categoryLabel={strings.categoryLabel + ': '} yearLabel={strings.yearLabel + ': '} />
                ))}
              </Grid>
            )}

            {archive.pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-space-6 border-t border-border-light">
                <div className="text-sm text-text-muted">
                  Showing {archive.pagination.page * archive.pagination.pageSize - archive.pagination.pageSize + 1} to {Math.min(archive.pagination.page * archive.pagination.pageSize, archive.pagination.total)} of {archive.pagination.total}
                </div>
                <ArchivePagination currentPage={archive.pagination.page} totalPages={archive.pagination.totalPages} />
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
