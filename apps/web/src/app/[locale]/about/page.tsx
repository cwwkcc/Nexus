import AboutHero from '../../../blocks/about/AboutHero';
import AboutStatsStrip from '../../../blocks/about/AboutStatsStrip';
import AlumniLegacy from '../../../blocks/about/AlumniLegacy';
import ClosingStatement from '../../../blocks/about/ClosingStatement';
import { CrestExplained } from '../../../blocks/about/CrestExplained';
import Ethos from '../../../blocks/about/Ethos';
import Legacy from '../../../blocks/about/Legacy';
import OurNameSake from '../../../blocks/about/OurNameSake';
import OurStory from '../../../blocks/about/OurStory';
import SchoolAnthem from '../../../blocks/about/SchoolAnthem';
import TimeLine from '../../../blocks/about/TimeLine';
import Values from '../../../blocks/about/Values';
import { getAboutPageContent, type AboutPageContent } from '../../../server/page-content';

interface AboutPageProps {
  params: {
    locale: string;
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const content: AboutPageContent = await getAboutPageContent(params.locale as 'en' | 'si' | 'ta');

  return (
    <>
      {/* Hero Section */}
      <AboutHero hero={content.hero} />
      {/* StatsStrip */}
      <AboutStatsStrip />
      {/* Founding narrative + Kannangara */}
      <OurNameSake aboutKannangara={content.aboutKannangara} />
      <OurStory story={content.story} />
      {/* Timeline */}
      <TimeLine timeline={content.timeline} />
      {/* Vision, Mission, Values */}
      <Ethos ethos={content.ethos} />
      <Values values={content.values} />
      {/* Crest explained */}
      <CrestExplained crest={content.crest} />
      {/* Alumni Legacy */}
      <AlumniLegacy />
      {/* Spirit of Kannangara & Physical Heritage – static section, no keys needed */}
      <Legacy legacy={content.legacy} />
      {/* School Anthem */}
      <SchoolAnthem anthem={content.anthem} />
      {/* Closing Statement */}
      <ClosingStatement closing={content.closing} />
    </>
  );
}
