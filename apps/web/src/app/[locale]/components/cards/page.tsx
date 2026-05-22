// apps/web/src/app/[locale]/components/cards/page.tsx
'use client';

import {
  AcademicStreamCard,
  AchievementCard,
  DownloadableDocumentItem,
  EventCard,
  ExtracurricularCard,
  FacilityCard,
  GalleryAlbumCard,
  NewsCard,
  SocietyBanner,
  SocietyCard,
  StaffCard,
  StatCard,
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
      <div className="flex flex-wrap gap-6 items-start">{children}</div>
    </div>
  );
}

export default function CardsPage() {
  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">Cards</h1>
        <p className="font-body text-body text-text-muted mb-12">
          Content containers for news, events, societies, staff and more.
        </p>

        <DemoSection title="AcademicStreamCard">
          <AcademicStreamCard
            stream="science"
            name="Science"
            description="For future doctors, engineers and researchers."
            careerPaths={['Medicine', 'Engineering', 'Research']}
            href="/academics/science"
            subjectCount={4}
          />
          <AcademicStreamCard
            stream="technology"
            name="Technology"
            description="ICT, engineering technology and biosystems."
            careerPaths={['Software', 'Networking', 'BioTech']}
            href="/academics/technology"
          />
        </DemoSection>

        <DemoSection title="AchievementCard">
          <AchievementCard
            variant="archive-post"
            title="Gold at SLIIT Codefest"
            year="2024"
            category="Technology"
            context="KITS team won first place in the全校 competition."
          />
          <AchievementCard
            variant="ticker-item"
            title="214 University Entrances"
            year="2026"
          />
        </DemoSection>

        <DemoSection title="DownloadableDocumentItem">
          <DownloadableDocumentItem
            title="Application Form 2026"
            fileType="pdf"
            fileSize="2.4 MB"
            url="/documents/admission-form.pdf"
            description="Grade 1 admissions application"
          />
        </DemoSection>

        <DemoSection title="EventCard">
          <EventCard
            variant="standard"
            title="Pasdun Cricket Battle"
            date="2026-06-14"
            time="9:00 AM"
            venue="KCC Grounds"
            category="Sports"
            status="upcoming"
            href="/events/pasdun-2026"
          />
          <EventCard
            variant="compact"
            title="Annual Prize Giving"
            date="2026-07-20"
            venue="School Hall"
            status="upcoming"
            href="/events/prize-giving"
          />
        </DemoSection>

        <DemoSection title="ExtracurricularCard">
          <ExtracurricularCard
            variant="sport"
            name="Cricket Team"
            description="The Men in Green – Kalutara District champions."
            recentAchievements={[
              'District Champions 2025',
              'Pasdun Cup Winners',
            ]}
            teacherInCharge="Mr. Silva"
          />
          <ExtracurricularCard
            variant="performing-arts"
            name="Western Band"
            description="Performing at all major school events."
            studentQuote="Music is our second language."
          />
        </DemoSection>

        <DemoSection title="FacilityCard">
          <FacilityCard
            name="Swimming Pool"
            description="25m indoor pool with modern filtration."
            features={['Competition ready', 'Training lanes', 'Public hours']}
            href="/facilities/pool"
          />
        </DemoSection>

        <DemoSection title="GalleryAlbumCard">
          <GalleryAlbumCard
            title="Annual Prize Giving 2025"
            year="2025"
            photoCount={42}
            category="Events"
            href="/gallery/prize-giving-2025"
          />
        </DemoSection>

        <DemoSection title="NewsCard">
          <NewsCard
            variant="standard"
            title="KCC Tops Kalutara District Again"
            category="Academics"
            date="May 2026"
            href="/news/results"
            excerpt="214 university placements – the highest in the district."
          />
          <NewsCard
            variant="compact"
            title="KITS Launches Nexus"
            category="Technology"
            date="April 2026"
            href="/news/nexus-launch"
          />
        </DemoSection>

        <DemoSection title="SocietyBanner">
          <SocietyBanner name="Kannangara ICT Society" foundingYear={2010} />
        </DemoSection>

        <DemoSection title="SocietyCard">
          <SocietyCard
            variant="hub-grid"
            name="Science Society"
            tagline="Exploring the wonders of science."
            category="Academic"
            href="/societies/science"
            memberCount={60}
            founded="1975"
          />
          <SocietyCard
            variant="featured"
            name="KITS"
            tagline="Building the digital future of KCC."
            category="Technology"
            href="/societies/kits"
            memberCount={120}
            founded="2010"
          />
        </DemoSection>

        <DemoSection title="StaffCard">
          <StaffCard
            variant="grid"
            name="Mr. A. Perera"
            title="Deputy Principal"
            portfolio="Academic Affairs"
          />
          <StaffCard
            variant="compact"
            name="Nimal Perera"
            title="Head Prefect"
          />
        </DemoSection>

        <DemoSection title="StatCard">
          <StatCard value={5000} suffix="+" label="Students" />
          <StatCard value={153} label="Years of Excellence" />
          <StatCard
            value={96}
            suffix="%"
            label="Pass Rate"
            trend="up"
            trendValue="+5%"
          />
        </DemoSection>
      </div>
    </div>
  );
}
