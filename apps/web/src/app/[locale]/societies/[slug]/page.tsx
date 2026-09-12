// apps/web/src/app/[locale]/societies/[slug]/page.tsx
//
// F-148: individual society detail page. Was a comment-only stub with no
// default export — every request to this route would have failed to
// build. Statically generated (generateStaticParams below) with per-
// society OG metadata — F-112 explicitly calls for this on society pages,
// unlike events/[slug]/page.tsx's own deliberate choice not to (see that
// file's header comment for the contrast).
//
// Gallery preview is not rendered — the Gallery module (Task 7.7,
// GalleryAlbum/GalleryPhoto) doesn't exist yet at all. "Recent events" is
// not rendered either — no Society↔CalendarEntry relation exists in the
// Events schema (Task 7.5 didn't call for one, and adding one now would
// mean reopening an already-shipped, already-verified module for a
// feature this task's own spec doesn't explicitly require). Both are
// flagged in docs/Completion Plan.md's verification note as explicit,
// documented scope boundaries, not silent omissions.

import { SOCIETY_CATEGORY_META, SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { clientEnv } from '@nexus/env/client';
import { Container, Heading, StaffCard, SocietyBanner, Text } from '@nexus/ui';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { SOCIETIES_STRINGS } from '../../../../lib/i18n/societies';
import { getAdvisor, getSocietyBySlug } from '../../../../server/societies';

interface SocietyDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

function resolveLocale(locale: string): LocaleEnumData {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale) ? (locale as LocaleEnumData) : 'en';
}

function categoryLabel(category: string): string {
  return SOCIETY_CATEGORY_META.find((meta) => meta.key === category)?.label ?? category;
}

export async function generateStaticParams(): Promise<Array<{ locale: string; slug: string }>> {
  const { createServerCaller } = await import('@nexus/api');
  const caller = createServerCaller();

  const perLocale = await Promise.all(
    SUPPORTED_LOCALES.map(async (locale) => {
      const societies = await caller.societies.list({ locale, category: 'all' });
      return societies.map((society) => ({ locale, slug: society.slug }));
    }),
  );

  return perLocale.flat();
}

export async function generateMetadata({ params }: SocietyDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale = resolveLocale(locale);
  const society = await getSocietyBySlug(safeLocale, slug);

  if (!society) {
    return { title: 'Society not found' };
  }

  return {
    title: `${society.name} — C.W.W. Kannangara Central College`,
    description: society.tagline ?? society.description ?? society.name,
    openGraph: {
      title: society.name,
      description: society.tagline ?? society.description ?? undefined,
      type: 'website',
      images: society.banner ? [{ url: society.banner.src }] : undefined,
    },
  };
}

export default async function SocietyDetailPage({ params }: SocietyDetailPageProps) {
  const { locale, slug } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = SOCIETIES_STRINGS[safeLocale];

  const society = await getSocietyBySlug(safeLocale, slug);
  if (!society) {
    notFound();
  }

  const advisor = society.advisorStaffId ? await getAdvisor(society.advisorStaffId) : null;
  const url = `${clientEnv.NEXT_PUBLIC_SITE_URL}/${safeLocale}/societies/${society.slug}`;

  // foundingYear is stored as free text (schema.prisma's Society model
  // doc comment explains why) but SocietyBanner's own prop is typed as a
  // number — parsed here, at the display boundary, rather than changing
  // the stored representation; a non-numeric value (rare, but possible
  // free text like "Founded in the 1990s") just omits the "Est." line
  // rather than rendering "NaN".
  const parsedFoundingYear = society.foundingYear ? Number(society.foundingYear) : undefined;
  const bannerFoundingYear = parsedFoundingYear !== undefined && !Number.isNaN(parsedFoundingYear) ? parsedFoundingYear : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: society.name,
    description: society.tagline ?? society.description ?? undefined,
    url,
    image: society.banner?.src ?? society.logo?.src ?? undefined,
    parentOrganization: {
      '@type': 'Organization',
      name: 'C.W.W. Kannangara Central College',
      url: clientEnv.NEXT_PUBLIC_SITE_URL,
    },
  };

  return (
    <Container size="md" padding="lg" as="article">
      {}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href={`/${safeLocale}/societies`} className="font-body text-caption uppercase tracking-caption text-gold-base hover:text-gold-hover">
        ← {strings.backToSocieties}
      </Link>

      <div className="mt-space-6">
        <SocietyBanner name={society.name} foundingYear={bannerFoundingYear} coverImageSrc={society.banner?.src} coverImageAlt={society.banner?.alt} />
      </div>

      <div className="mt-space-6 flex flex-wrap items-center gap-space-3 font-body text-caption uppercase tracking-caption text-text-muted">
        <span>{categoryLabel(society.category)}</span>
        {society.memberCount != null && (
          <span>
            · {society.memberCount} {strings.membersLabel}
          </span>
        )}
      </div>

      {society.tagline && (
        <Text as="p" className="mt-space-4 text-body-lg text-text-muted">
          {society.tagline}
        </Text>
      )}

      {society.description && (
        <div className="mt-space-8">
          <Text as="p" className="whitespace-pre-line leading-relaxed">
            {society.description}
          </Text>
        </div>
      )}

      <div className="mt-space-10 grid grid-cols-1 gap-space-8 md:grid-cols-2">
        {society.meetingSchedule && (
          <div>
            <Heading level="h3">{strings.meetingScheduleHeading}</Heading>
            <Text as="p" className="mt-space-2 text-text-muted">
              {society.meetingSchedule}
            </Text>
          </div>
        )}
        {society.howToJoin && (
          <div>
            <Heading level="h3">{strings.howToJoinHeading}</Heading>
            <Text as="p" className="mt-space-2 whitespace-pre-line text-text-muted">
              {society.howToJoin}
            </Text>
          </div>
        )}
      </div>

      {advisor && (
        <div className="mt-space-10">
          <Heading level="h3" className="mb-space-4">
            {strings.advisorHeading}
          </Heading>
          <StaffCard variant="compact" id={advisor.id} name={advisor.name} role={advisor.role} title={advisor.title} department={advisor.department ?? undefined} portfolio={advisor.portfolio ?? undefined} tenure={advisor.tenure ?? undefined} quote={advisor.quote ?? undefined} portrait={advisor.portrait ?? undefined} contactEmail={advisor.contactEmail ?? undefined} />
        </div>
      )}
    </Container>
  );
}
