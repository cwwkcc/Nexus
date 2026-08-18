// apps/web/src/app/[locale]/achievements/page.tsx
//
// F-156: Achievement Database. Academic, sports, arts, competition results.
// Filterable by year and category. Was a comment-only stub with no default
// export at all — every request to this route would have failed to build.

import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { AchievementCard, Container, Grid, Hero, Text } from '@nexus/ui';
import type { Metadata } from 'next';

import { ACHIEVEMENTS_STRINGS } from '../../../lib/achievements-i18n';
import { getAchievementList, getAchievementsPageChrome } from '../../../server/achievements';

interface AchievementsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function resolveLocale(locale: string): LocaleEnumData {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale) ? (locale as LocaleEnumData) : 'en';
}

export async function generateMetadata({ params }: AchievementsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = ACHIEVEMENTS_STRINGS[safeLocale];
  return {
    title: `${strings.pageTitle} — C.W.W. Kannangara Central College`,
    description: strings.pageTitle,
  };
}

export default async function AchievementsPage({ params, searchParams }: AchievementsPageProps) {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = ACHIEVEMENTS_STRINGS[safeLocale];

  const query = await searchParams;
  const category = firstValue(query.category) ?? '';
  const year = firstValue(query.year) ?? '';
  const page = firstValue(query.page) ? Number(firstValue(query.page)) : 1;

  const [{ hero }, achievements] = await Promise.all([getAchievementsPageChrome(safeLocale), getAchievementList({ category, year, page })]);

  return (
    <>
      <Hero variant="subpage" heading={hero.title} eyebrow={hero.eyebrow} subheading={hero.subtitle} breadcrumb={[{ label: 'Home', href: `/${safeLocale}` }, { label: strings.pageTitle }]} />

      <Container size="lg" padding="lg" as="section">
        <div className="mt-space-8 flex flex-col gap-space-6">
          <div className="mt-space-8 flex flex-col gap-space-6">
            {achievements.items.length === 0 ? (
              <Text color="muted" className="py-space-12 text-center">
                {strings.noResults}
              </Text>
            ) : (
              <Grid columns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
                {achievements.items.map((achievement) => (
                  <AchievementCard key={achievement.id} id={achievement.id} title={achievement.title} year={achievement.date.substring(0, 4)} category={achievement.category} context={achievement.awardedBy || undefined} imageSrc={achievement.image?.src || undefined} imageAlt={achievement.image?.alt || undefined} />
                ))}
              </Grid>
            )}

            {achievements.pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-space-6 border-t border-border-light">
                <div className="text-sm text-text-muted">
                  Showing {achievements.pagination.page * achievements.pagination.pageSize - achievements.pagination.pageSize + 1} to {Math.min(achievements.pagination.page * achievements.pagination.pageSize, achievements.pagination.total)} of {achievements.pagination.total}
                </div>
                <div className="flex items-center gap-space-2">
                  <span className="text-sm">
                    Page {achievements.pagination.page} of {achievements.pagination.totalPages}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
