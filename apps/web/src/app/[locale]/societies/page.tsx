// apps/web/src/app/[locale]/societies/page.tsx
//
// F-147: Societies Hub. All societies with a category filter, each shown
// as a SocietyCard — the featured one (isFeatured, KITS) gets the
// 'featured' variant, everyone else 'hub-grid'. Was a comment-only stub
// with no default export at all — every request to this route would have
// failed to build.

import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { Container, Grid, Hero, SocietyCard, Text } from '@nexus/ui';
import type { Metadata } from 'next';

import { SocietiesListingControls } from './SocietiesListingControls';
import { toSocietyCard } from '../../../lib/cards/society';
import { SOCIETIES_STRINGS } from '../../../lib/i18n/societies';
import { getSocietiesPageChrome, getSocietyList } from '../../../server/societies';

interface SocietiesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function resolveLocale(locale: string): LocaleEnumData {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale) ? (locale as LocaleEnumData) : 'en';
}

export async function generateMetadata({ params }: SocietiesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = SOCIETIES_STRINGS[safeLocale];
  return {
    title: `${strings.pageTitle} — C.W.W. Kannangara Central College`,
    description: strings.pageTitle,
  };
}

export default async function SocietiesPage({ params, searchParams }: SocietiesPageProps) {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = SOCIETIES_STRINGS[safeLocale];

  const query = await searchParams;
  const category = firstValue(query.category) ?? 'all';

  const [{ hero }, societies] = await Promise.all([getSocietiesPageChrome(safeLocale), getSocietyList({ locale: safeLocale, category: category === 'all' ? undefined : category })]);

  const featured = societies.find((s) => s.isFeatured);
  const rest = societies.filter((s) => s.id !== featured?.id);

  return (
    <>
      <Hero variant="subpage" heading={hero.title} eyebrow={hero.eyebrow} subheading={hero.subtitle} breadcrumb={[{ label: 'Home', href: `/${safeLocale}` }, { label: strings.pageTitle }]} />

      <Container size="lg" padding="lg" as="section">
        <SocietiesListingControls locale={safeLocale} strings={strings} currentCategory={category} />

        <div className="mt-space-8 flex flex-col gap-space-10">
          {featured && <SocietyCard {...toSocietyCard(featured, safeLocale)} variant="featured" membersLabel={strings.membersLabel} foundedLabel={strings.foundedLabel} learnMoreLabel={strings.learnMoreLabel} featuredLabel={strings.featuredLabel} />}

          {rest.length === 0 && !featured ? (
            <Text color="muted" className="py-space-12 text-center">
              {strings.noResults}
            </Text>
          ) : (
            <Grid columns="repeat(auto-fit, minmax(280px, 1fr))" gap={7}>
              {rest.map((society) => (
                <SocietyCard key={society.id} {...toSocietyCard(society, safeLocale)} membersLabel={strings.membersLabel} foundedLabel={strings.foundedLabel} />
              ))}
            </Grid>
          )}
        </div>
      </Container>
    </>
  );
}
