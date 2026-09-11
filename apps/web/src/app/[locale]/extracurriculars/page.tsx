// apps/web/src/app/[locale]/extracurriculars/page.tsx
//
// F-161: Extracurriculars page. Every active ExtracurricularActivity,
// grouped by category into three sections (Sports / Performing Arts /
// Scouts & National Cadet Corps — the latter two share the 'leadership'
// category value, see domains/extracurriculars/activity.ts's
// ExtracurricularVariantEnum doc comment and registry/page-registry/
// extracurriculars.ts's own header comment for why), each rendered as
// ExtracurricularCard with the category's own presentational variant. Was
// a comment-only stub with no default export at all — every request to
// this route would have failed to build.
//
// Not done: "Design System/Page Specifications.md" section 09's Section
// Map also lists a `LifeAtKCCPhotoStrip` alongside the Sports section
// (built here as @nexus/ui's CategorizedPhotoStrip). Wiring it needs a
// real "gallery photos tagged by category" data source that doesn't
// exist yet — GalleryAlbum/GalleryPhoto (Task 7.7) have no category
// taxonomy shared with Extracurriculars', and building one is a
// meaningfully separate piece of scope Task 7.17's own field list never
// asked for. Flagged here rather than either faking it with placeholder
// images or silently dropping it from the page spec. The stub's own
// "ExtracurricularsJoinCTA section" note doesn't correspond to anything
// in the actual page spec or an existing @nexus/ui component — it
// appears to have been aspirational placeholder text, not a real
// requirement, so it isn't built either.

import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { Container, ExtracurricularCard, Grid, Hero, Text } from '@nexus/ui';
import type { Metadata } from 'next';

import { cardVariantForCategory, toExtracurricularCard } from '../../../lib/cards/extracurricular';
import { EXTRACURRICULARS_STRINGS } from '../../../lib/i18n/extracurriculars';
import { getActivityList, getCoachNames, getExtracurricularsPageChrome } from '../../../server/extracurriculars';

interface ExtracurricularsPageProps {
  params: Promise<{ locale: string }>;
}

function resolveLocale(locale: string): LocaleEnumData {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale) ? (locale as LocaleEnumData) : 'en';
}

export async function generateMetadata({ params }: ExtracurricularsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = EXTRACURRICULARS_STRINGS[safeLocale];
  return {
    title: `${strings.pageTitle} – Sports, Performing Arts, Scouts, Cadets — C.W.W. Kannangara Central College`,
    description: 'Beyond the classroom – develop character, leadership, and teamwork through our vibrant extracurricular programmes.',
  };
}

export default async function ExtracurricularsPage({ params }: ExtracurricularsPageProps) {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = EXTRACURRICULARS_STRINGS[safeLocale];

  const [{ hero }, activities] = await Promise.all([getExtracurricularsPageChrome(safeLocale), getActivityList(safeLocale)]);

  const coachNames = await getCoachNames(activities.map((activity) => activity.coachStaffId));

  const sportsActivities = activities.filter((a) => a.category === 'sports');
  const performingArtsActivities = activities.filter((a) => a.category === 'performing-arts');
  const leadershipActivities = activities.filter((a) => a.category === 'leadership');

  const sections = [
    { heading: strings.sportsHeading, items: sportsActivities },
    { heading: strings.performingArtsHeading, items: performingArtsActivities },
    { heading: strings.leadershipHeading, items: leadershipActivities },
  ].filter((section) => section.items.length > 0);

  return (
    <>
      <Hero variant="subpage" heading={hero.title} eyebrow={hero.eyebrow} subheading={hero.subtitle} breadcrumb={[{ label: 'Home', href: `/${safeLocale}` }, { label: strings.pageTitle }]} />

      <Container size="lg" padding="lg" as="section">
        {sections.length === 0 ? (
          <Text color="muted" className="py-space-12 text-center">
            {strings.emptyState}
          </Text>
        ) : (
          <div className="flex flex-col gap-space-14">
            {sections.map((section) => (
              <div key={section.heading} className="flex flex-col gap-space-6">
                <h2 className="font-display text-h2 font-medium text-text-primary">{section.heading}</h2>
                <Grid columns="repeat(auto-fit, minmax(300px, 1fr))" gap={7}>
                  {section.items.map((activity) => (
                    <ExtracurricularCard key={activity.id} {...toExtracurricularCard(activity, activity.coachStaffId ? (coachNames[activity.coachStaffId] ?? null) : null)} variant={cardVariantForCategory(activity.category)} />
                  ))}
                </Grid>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
