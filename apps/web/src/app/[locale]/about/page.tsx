'use client';

import { useTranslations } from 'next-intl';
import { Footer } from '@nexus/ui';

// In apps/web/src/app/[locale]/about/page.tsx
import AboutHero from '../../../blocks/about/AboutHero';
import AboutStatsStrip from '../../../blocks/about/AboutStatsStrip';
import OurNameSake from '../../../blocks/about/OurNameSake';
import OurStory from '../../../blocks/about/OurStory';
import TimeLine from '../../../blocks/about/TimeLine';
import Ethos from '../../../blocks/about/Ethos';
import Values from '../../../blocks/about/Values';
import { CrestExplained } from '../../../blocks/about/CrestExplained';
import Legacy from '../../../blocks/about/Legacy';
import ClosingStatement from '../../../blocks/about/ClosingStatement';
import AlumniLegacy from '../../../blocks/about/AlumniLegacy';
import SchoolAnthem from '../../../blocks/about/SchoolAnthem';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <main className="bg-surface-deep">
      {/* Hero Section */}
      <AboutHero />
      {/* StatsStrip */}
      <AboutStatsStrip />
      {/* Founding narrative + Kannangara */}
      <OurNameSake />
      <OurStory />
      {/* Timeline */}
      <TimeLine />
      {/* Vision, Mission, Values */}
      <Ethos />
      <Values />
      {/* Crest explained */}
      <CrestExplained />
      {/* Alumni Legacy */}
      <AlumniLegacy />
      {/* Spirit of Kannangara & Physical Heritage – static section, no keys needed */}
      <Legacy />
      {/* School Anthem */}
      <SchoolAnthem />
      {/* Closing Statement */}
      <ClosingStatement />
      {/* Footer */}
      <Footer />
    </main>
  );
}
