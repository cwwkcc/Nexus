// apps/web/src/app/[locale]/components/sections/page.tsx
'use client';

import {
  AchievementTicker,
  AdmissionsProcessSteps,
  AdmissionsKeyDatesTimeline,
  AlumniLegacyBlock,
  AudioPlayer,
  LifeAtKCCPhotoStrip,
  PrincipalMessage,
  StatsStrip,
  Timeline,
} from '@nexus/ui';

function DemoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12">
      <h2 className="font-display text-h2 mb-4 border-b border-border-light pb-2">
        {title}
      </h2>
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
      graduationYear: 1990,
      role: 'Doctor',
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

  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">Sections</h1>
        <p className="font-body text-body text-text-muted mb-12">
          Page‑specific sections for homepage, about, admissions and more.
        </p>

        <DemoSection title="AchievementTicker">
          <AchievementTicker
            achievements={sampleAchievements}
            archiveHref="/achievements"
          />
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

        <DemoSection title="AudioPlayer">
          <AudioPlayer src="/audio/sample.mp3" title="School Anthem" />
        </DemoSection>

        <DemoSection title="LifeAtKCCPhotoStrip">
          <LifeAtKCCPhotoStrip items={samplePhotos} />
        </DemoSection>

        <DemoSection title="PrincipalMessage">
          <PrincipalMessage
            name="Mr. Bandula Rajapaksa"
            title="Principal"
            tenure="Since 2019"
            portraitSrc="/images/white.jpg"
            portraitAlt="Principal"
            message="Welcome to KCC"
            fullMessageHref="/administration"
          />
        </DemoSection>

        <DemoSection title="StatsStrip">
          <StatsStrip />
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
      </div>
    </div>
  );
}
