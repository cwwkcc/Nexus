// apps/web/src/app/[locale]/components/sections/page.tsx
'use client';

import { AchievementTicker, AdmissionsProcessSteps, AdmissionsKeyDatesTimeline, AlumniLegacyBlock, AudioPlayer, LifeAtKCCPhotoStrip, PrincipalMessage, StatsStrip, Timeline, SectionSlider, type StatItem } from '@nexus/ui';

function DemoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="font-display text-h2 mb-4 border-b border-border-light pb-2">{title}</h2>
      {children}
    </div>
  );
}

export default function SectionsPage() {
  const sampleSteps = [
    {
      step: 1,
      title: 'Apply Online',
      description: 'Fill the application form',
      timeframe: 'May – June',
    },
    {
      step: 2,
      title: 'Interview',
      description: 'Shortlisted candidates called',
      timeframe: 'July',
    },
  ];
  const sampleDates = [
    { id: '1', date: '1 May', title: 'Applications Open', isActive: true },
    { id: '2', date: '30 June', title: 'Deadline', isCompleted: false },
  ];
  const sampleAlumni = [
    {
      id: '1',
      name: 'Dr. A. Silva',
      graduationYear: '1990',
      currentRole: 'Doctor',
      quote: 'KCC shaped my future.',
    },
  ];
  const sampleAchievements = [{ id: 'a1', text: 'Gold Medal', year: '2024' }];
  const samplePhotos = [
    {
      id: 'p1',
      imageSrc: '/images/white.jpg',
      imageAlt: 'Sports',
      category: 'sports' as const,
    },
  ];

  const DEFAULT_STATS: StatItem[] = [
    {
      id: 'students',
      target: 5000,
      suffix: '+',
      label: 'Students',
      description: 'Enrolled across all grades',
      tooltip: {
        content: 'Total student population (Grades 1–13)',
        position: 'bottom',
      },
      trend: { direction: 'up', value: '+8%', label: 'vs 2025' },
    },
    {
      id: 'staff',
      target: 200,
      suffix: '+',
      label: 'Staff',
      description: 'Teaching & support',
      tooltip: {
        content: 'Dedicated educators and administrative personnel',
        position: 'bottom',
      },
    },
    {
      id: 'years',
      target: 153,
      suffix: '',
      label: 'Years',
      description: 'of excellence',
      tooltip: {
        content: 'Since 1873 – Sri Lanka’s first Central College',
        position: 'left',
      },
    },
    {
      id: 'university',
      target: 200,
      suffix: '+',
      label: 'University Entrances',
      description: 'Annually (2025)',
      tooltip: { content: 'Highest in Kalutara District', position: 'bottom' },
      trend: { direction: 'up', value: '+12%', label: 'vs 2024' },
    },
    {
      id: 'university',
      target: 200,
      suffix: '+',
      label: 'University Entrances',
      description: 'Annually (2025)',
      tooltip: { content: 'Highest in Kalutara District', position: 'bottom' },
      trend: { direction: 'up', value: '+12%', label: 'vs 2024' },
    },
  ];

  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">Sections</h1>
        <p className="font-body text-body text-text-muted mb-12">Page‑specific sections for homepage, about, admissions and more.</p>

        <DemoSection title="AchievementTicker">
          <AchievementTicker achievements={sampleAchievements} archiveHref="/achievements" />
        </DemoSection>

        <DemoSection title="AdmissionsProcessSteps">
          <AdmissionsProcessSteps steps={sampleSteps} activeStep={1} />
        </DemoSection>

        <DemoSection title="AdmissionsKeyDatesTimeline">
          <AdmissionsKeyDatesTimeline dates={sampleDates} />
        </DemoSection>

        <DemoSection title="AlumniLegacyBlock">
          <AlumniLegacyBlock alumni={sampleAlumni} />
        </DemoSection>

        <DemoSection title="LifeAtKCCPhotoStrip">
          <LifeAtKCCPhotoStrip items={samplePhotos} />
        </DemoSection>

        <DemoSection title="PrincipalMessage">
          <PrincipalMessage name="Mr. Bandula Rajapaksa" title="Principal" tenure="Since 2019" portraitSrc="/images/white.jpg" portraitAlt="Principal" message="Welcome to KCC" fullMessageHref="/administration" />
        </DemoSection>

        <DemoSection title="StatsStrip">
          <StatsStrip stats={DEFAULT_STATS} />
        </DemoSection>

        <DemoSection title="Timeline">
          <Timeline
            events={[
              {
                id: 'e1',
                year: '1873',
                title: 'Founded',
                description: 'School established',
              },
            ]}
          />
        </DemoSection>
        <DemoSection title="SectionSlider – Carousel">
          <SectionSlider variant="image" direction="horizontal" loop>
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-space-8 bg-surface-deep text-center rounded-lg">
                <p className="font-body text-body">Slide {i}</p>
                <p className="font-body text-caption text-text-muted">Works with images, text, or any content.</p>
              </div>
            ))}
          </SectionSlider>
          <p className="font-body text-caption text-text-muted mt-space-2">
            Variants: <code>full</code>, <code>image</code>, <code>text</code>, <code>image-compact</code>. Supports horizontal/vertical, loop, drag, keyboard arrows.
          </p>
        </DemoSection>
      </div>
    </div>
  );
}
