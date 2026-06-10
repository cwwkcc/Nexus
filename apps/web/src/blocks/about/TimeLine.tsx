//web/src/app/[locale]/components/test/page.tsx
'use client';
import { useTranslations } from 'next-intl';
import { Container, Timeline, SectionHeader } from '@nexus/ui';

interface Milestone {
  id: string;
  year: string;
  title: string;
  desc: string;
  era: string;
}
export default function TimeLine() {
  const t = useTranslations('about.timeline');
  const milestones = t.raw('milestones')
    ? Object.values(t.raw('milestones') as Record<string, Milestone>)
    : [];
  const events = milestones.map((m) => ({
    id: m.id,
    year: String(m.year),
    title: m.title,
    description: m.desc,
    era: m.era as 'early' | 'mid' | 'modern',
  }));
  return (
    <>
      <Container
        size="full"
        padding="lg"
        as="section"
        className=" m-space-6 md:m-space-12 lg:m-space-16"
      >
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('heading')}
          align="center"
          className="mb-space-12"
        />
        <Timeline events={events} />
      </Container>
    </>
  );
}
