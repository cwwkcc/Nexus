// apps/web/src/app/[locale]/alumni/page.tsx
//
// F-154: Alumni Directory. Searchable by graduation year, profession, and
// organization. Shows only APPROVED profiles — PENDING/REJECTED are admin-only.
// Was a comment-only stub with no default export at all — every request to
// this route would have failed to build.

import { SUPPORTED_LOCALES, ALStreamEnum, type LocaleEnumData } from '@nexus/contracts';
import { AlumniCard, Container, Grid, Hero, Text } from '@nexus/ui';
import type { Metadata } from 'next';

import { ALUMNI_STRINGS } from '../../../lib/i18n/alumni';
import { getAlumniList, getAlumniPageChrome } from '../../../server/alumni';
import { SubmitProfileBlock } from '../../../blocks/alumni/SubmitProfileBlock';

interface AlumniPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function resolveLocale(locale: string): LocaleEnumData {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale) ? (locale as LocaleEnumData) : 'en';
}

export async function generateMetadata({ params }: AlumniPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = ALUMNI_STRINGS[safeLocale];
  return {
    title: `${strings.pageTitle} — C.W.W. Kannangara Central College`,
    description: strings.pageTitle,
  };
}

export default async function AlumniPage({ params, searchParams }: AlumniPageProps) {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = ALUMNI_STRINGS[safeLocale];

  const query = await searchParams;
  const graduationYear = firstValue(query.graduationYear) ?? '';
  const profession = firstValue(query.profession) ?? '';
  const page = firstValue(query.page) ? Number(firstValue(query.page)) : 1;

  const [{ hero }, alumni] = await Promise.all([getAlumniPageChrome(safeLocale), getAlumniList({ graduationYear, profession, page })]);

  return (
    <>
      <Hero variant="subpage" heading={hero.title} eyebrow={hero.eyebrow} subheading={hero.subtitle} breadcrumb={[{ label: 'Home', href: `/${safeLocale}` }, { label: strings.pageTitle }]} />

      <Container size="lg" padding="lg" as="section">
        <div className="mt-space-8 flex flex-col gap-space-6">
          <div className="mt-space-8 flex flex-col gap-space-6">
            {alumni.items.length === 0 ? (
              <Text color="muted" className="py-space-12 text-center">
                {strings.noResults}
              </Text>
            ) : (
              <Grid columns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
                {alumni.items.map((alum) => (
                  <AlumniCard key={alum.id} id={alum.id} name={alum.name} graduationYear={alum.graduationYear} currentRole={alum.currentRole || undefined} portrait={alum.portrait || undefined} graduationYearLabel={strings.graduationYear} currentRoleLabel={strings.currentRole} />
                ))}
              </Grid>
            )}

            {alumni.pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-space-6 border-t border-border-light">
                <div className="text-sm text-text-muted">
                  Showing {alumni.pagination.page * alumni.pagination.pageSize - alumni.pagination.pageSize + 1} to {Math.min(alumni.pagination.page * alumni.pagination.pageSize, alumni.pagination.total)} of {alumni.pagination.total}
                </div>
                <div className="flex items-center gap-space-2">
                  <span className="text-sm">
                    Page {alumni.pagination.page} of {alumni.pagination.totalPages}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-space-12">
            <SubmitProfileBlock strings={strings} streamOptions={ALStreamEnum.options} />
          </div>
        </div>
      </Container>
    </>
  );
}
