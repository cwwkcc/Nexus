'use client';

import { useTranslations } from 'next-intl';
import {
  Hero,
  SectionHeader,
  AlumniLegacyBlock,
  AudioPlayer,
  Container,
  Footer,
  StatsStrip,
} from '@nexus/ui';

// In apps/web/src/app/[locale]/about/page.tsx

import ClosingStatement from '../../../sections/about/ClosingStatement';
import Ethos from '../../../sections/about/Ethos';
import Legacy from '../../../sections/about/Legacy';
import OurNameSake from '../../../sections/about/OurNameSake';
import OurStory from '../../../sections/about/OurStory';
import TimeLine from '../../../sections/about/TimeLine';
import Values from '../../../sections/about/Values';

export default function AboutPage() {
  const t = useTranslations('about');

  // Safe fallbacks for missing arrays
  const alumniProfiles = t.raw('alumni.profiles') ?? [];

  const anthemSrc = '/audio/anthem.mp3';
  const anthemLyrics = t('anthem.lyrics') || '';

  return (
    <main>
      {/* Hero Section */}
      <Hero
        variant="subpage"
        heading={t('hero.title')}
        subheading={t('hero.subtitle')}
        eyebrow={t('hero.eyebrow')}
        imageSrc="/images/about-hero.jpg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />
      {/* StatsStrip */}
      <StatsStrip />
      {/* Founding narrative + Kannangara */}
      <OurNameSake />
      <OurStory />
      {/* Timeline */}
      <TimeLine />
      {/* Vision, Mission, Values */}
      <Ethos />
      <Values />
      {/* Crest explained */}
      {/* Alumni Legacy */}
      <Container size="lg" padding="md" as="section" className="py-space-16">
        <SectionHeader
          eyebrow="Generations of Excellence"
          title={t('alumni.heading')}
          align="center"
          withAccentRule
          className="mb-space-12"
        />
        <AlumniLegacyBlock alumni={alumniProfiles} />{' '}
        {/* ✅ component handles keys internally */}
      </Container>
      {/* Spirit of Kannangara & Physical Heritage – static section, no keys needed */}
      <Legacy />
      {/* School Anthem */}
      <Container size="md" padding="md" as="section" className="py-space-16">
        <SectionHeader
          eyebrow={t('anthem.eyebrow')}
          title={t('anthem.heading')}
          align="center"
          withAccentRule
          className="mb-space-12"
        />
        <AudioPlayer
          src={anthemSrc}
          title={t('anthem.playerTitle')}
          subtitle={t('anthem.playerSubtitle')}
          lyrics={anthemLyrics}
          lyricsSinhala={anthemLyrics}
        />
      </Container>
      {/* Closing Statement */}
      <ClosingStatement />
      {/* Footer */}
      <Footer />
    </main>
  );
}
