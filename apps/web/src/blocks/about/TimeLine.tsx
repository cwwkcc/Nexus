import type { AboutTimelineData } from '@nexus/contracts';
import { Container, Timeline, SectionHeader } from '@nexus/ui';

export default function TimeLine({
  timeline,
}: {
  timeline: AboutTimelineData;
}) {
  const events = timeline.milestones.map((m) => ({
    id: m.id,
    year: String(m.year),
    title: m.title,
    description: m.description,
    era: m.era as 'early' | 'mid' | 'modern',
  }));

  return (
    <Container
      size="full"
      padding="lg"
      as="section"
      className=" m-space-6 md:m-space-12 lg:m-space-16"
    >
      <SectionHeader
        eyebrow={timeline.eyebrow}
        title={timeline.heading}
        align="center"
        className="mb-space-12"
      />
      <Timeline events={events} />
    </Container>
  );
}
