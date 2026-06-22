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

export default function AboutPage() {
  return (
    <>
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
    </>
  );
}
