'use client';

import { AcademicStreamCard, AchievementCard, DownloadableDocumentItem, EventCard, ExtracurricularCard, FacilityCard, GalleryAlbumCard, NewsCard, SocietyBanner, SocietyCard, StaffCard, StatCard } from '@nexus/ui';

function DemoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-space-16">
      <h2 className="font-display text-h2 mb-space-6 pb-space-2 border-b border-border-light">{title}</h2>
      <div className="flex flex-wrap gap-space-6 items-start">{children}</div>
    </div>
  );
}

export default function CardsDemoPage() {
  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Cards – All Variations</h1>
        <p className="font-body text-body text-text-muted mb-space-12">Complete showcase of every card component with all available variants and states.</p>

        {/* AcademicStreamCard */}
        <DemoSection title="AcademicStreamCard">
          <AcademicStreamCard name="Science" description="For future doctors, engineers and researchers." careerPaths={['Medicine', 'Engineering', 'Research']} href="/academics/science" subjects={['Bio', 'Chem', 'Phy', 'Agri']} />
          <AcademicStreamCard name="Technology" description="ICT, engineering technology and biosystems." careerPaths={['Software', 'Networking', 'BioTech']} href="/academics/technology" subjects={['SFT', 'ET', 'ICT', 'BST', 'SNT', 'Agri']} />
          <AcademicStreamCard name="Commerce" description="Accounting, economics, business studies." careerPaths={['Accountant', 'Banker', 'Entrepreneur']} href="/academics/commerce" subjects={['Accounting', 'Economics', 'BS', 'IT']} />
          <AcademicStreamCard name="Arts" description="Humanities, languages, social sciences." careerPaths={['Law', 'Teaching', 'Civil Service']} href="/academics/arts" subjects={['Logic', 'PolSc', 'History', 'Geo', 'Lang']} />
        </DemoSection>

        {/* AchievementCard */}
        <DemoSection title="AchievementCard – Archive Post & Ticker Item">
          <AchievementCard variant="archive-post" title="Gold at SLIIT Codefest 2024" year="2024" category="Technology" context="KITS team won first place in the全校 competition." imageSrc="/images/white.jpg" href="/achievements/codefest-2024" />
          <AchievementCard variant="archive-post" title="214 University Entrances" year="2026" category="Academics" context="Highest in Kalutara District – 95% pass rate." />
          <div className="flex flex-col gap-space-4">
            <AchievementCard variant="ticker-item" title="Gold Medal – Science Exhibition" year="2025" category="Science" />
            <AchievementCard variant="ticker-item" title="President's Scout Award" year="2024" category="Scouts" />
            <AchievementCard variant="ticker-item" title="District Cricket Champions" year="2026" category="Sports" />
          </div>
        </DemoSection>

        {/* DownloadableDocumentItem */}
        <DemoSection title="DownloadableDocumentItem">
          <DownloadableDocumentItem title="Application Form 2026" fileType="pdf" fileSize="2.4 MB" url="/documents/admission-form.pdf" description="Grade 1 admissions application – fill and submit" />
          <DownloadableDocumentItem title="Annual Sports Meet Schedule" fileType="doc" fileSize="1.1 MB" url="/documents/sports-schedule.doc" />
        </DemoSection>

        {/* EventCard */}
        <DemoSection title="EventCard – Standard">
          <EventCard variant="standard" title="Pasdun Cricket Battle" description="Annual cricket match against Sri Palee Vidyalaya" date="2026-06-14" time="9:00 AM" venue="KCC Grounds" category="Sports" status="upcoming" href="/events/pasdun-2026" relativeTime="In 3 days" />
          <EventCard variant="standard" title="Annual Prize Giving" date="2026-07-20" time="3:00 PM" venue="School Hall" category="Ceremony" status="registration-open" href="/events/prize-giving" relativeTime="Registration open" />
          <EventCard variant="standard" title="Science Exhibition 2025" date="2025-02-10" category="Academics" status="past" href="/events/science-exhibition-2025" />
        </DemoSection>

        <DemoSection title="EventCard – Compact">
          <div className="w-80">
            <EventCard variant="compact" title="Parent-Teacher Meeting" date="2026-06-20" time="2:00 PM" venue="Auditorium" status="upcoming" href="/events/ptm" />
            <EventCard variant="compact" title="Swimming Pool Public Hours" date="2026-06-10" time="5:00 AM" status="ongoing" href="/facilities/pool" relativeTime="Today" />
          </div>
        </DemoSection>

        <DemoSection title="EventCard – Featured">
          <EventCard variant="featured" title="KITS Nexus Launch Ceremony" description="Official launch of the school's new digital platform, built entirely by students." date="2026-05-01" time="10:00 AM" venue="KCC Auditorium" category="Technology" status="registration-open" href="/events/nexus-launch" imageSrc="/images/white.jpg" registrationHref="/events/nexus-launch/register" relativeTime="Starts in 2 weeks" />
        </DemoSection>

        {/* ExtracurricularCard */}
        <DemoSection title="ExtracurricularCard – Sport">
          <ExtracurricularCard id="cricket" category="sports" variant="sport" name="Cricket Team" description="The Men in Green – Kalutara District champions 2025." recentAchievements={['District Champions 2025', 'Pasdun Cup Winners 2024']} teacherInCharge="Mr. Silva" season="Current Season: 2026" imageSrc="/images/white.jpg" href="/extracurriculars/cricket" />
        </DemoSection>

        <DemoSection title="ExtracurricularCard – Performing Arts">
          <ExtracurricularCard id="western-band" category="performing-arts" variant="performing-arts" name="Western Band" description="Performing at all major school events and competitions." studentQuote="Music is our second language." teacherInCharge="Mrs. Perera" imageSrc="/images/white.jpg" href="/extracurriculars/western-band" />
        </DemoSection>

        <DemoSection title="ExtracurricularCard – Leadership">
          <ExtracurricularCard id="scouts" category="leadership" variant="leadership" name="Scout Troop" description="Founded 1952 – 35+ President's Scout Award winners." recentAchievements={["President's Scout – 2025", 'Best Troop – Kalutara District']} teacherInCharge="Mr. Jayawardena" href="/extracurriculars/scouts" />
        </DemoSection>

        {/* FacilityCard */}
        <DemoSection title="FacilityCard – Standard">
          <FacilityCard id="labs" slug="labs" type="laboratory" name="Science Laboratories" description="Fully equipped labs for physics, chemistry, and biology." features={['Modern equipment', 'Safety compliant', 'Separate prep rooms']} href="/facilities/labs" image={{ src: '/images/white.jpg', alt: 'Science laboratories' }} imageSrc="/images/white.jpg" />
          <FacilityCard id="library" slug="library" type="library" name="Library" description="Over 10,000 books and digital resources." features={['Reading hall', 'E-library', 'Periodicals section']} href="/facilities/library" image={{ src: '/images/white.jpg', alt: 'Library' }} />
        </DemoSection>

        <DemoSection title="FacilityCard – Schedule (Swimming Pool)">
          <FacilityCard
            id="pool"
            slug="pool"
            type="pool"
            variant="schedule"
            name="Swimming Pool"
            description="25m indoor pool with modern filtration."
            features={['Competition ready', 'Training lanes', 'Public hours available']}
            schedule={[
              { day: 'Monday', time: '6:00-8:00 AM', group: 'Team Training' },
              { day: 'Tuesday', time: '4:00-6:00 PM', group: 'Public Access' },
              {
                day: 'Saturday',
                time: '8:00-10:00 AM',
                group: 'Beginners Class',
              },
            ]}
            href="/facilities/pool"
            image={{ src: '/images/white.jpg', alt: 'Swimming pool' }}
            imageSrc="/images/white.jpg"
          />
        </DemoSection>

        {/* GalleryAlbumCard */}
        <DemoSection title="GalleryAlbumCard">
          <GalleryAlbumCard title="Annual Prize Giving 2025" year="2025" photoCount={42} category="Events" href="/gallery/prize-giving-2025" coverSrc="/images/white.jpg" />
          <GalleryAlbumCard title="Science Exhibition" year="2024" photoCount={28} category="Academics" href="/gallery/science-exhibition-2024" />
          <GalleryAlbumCard title="Big Match 2026" year="2026" photoCount={56} category="Sports" href="/gallery/big-match-2026" />
        </DemoSection>

        {/* NewsCard */}
        <DemoSection title="NewsCard – Featured">
          <NewsCard variant="featured" title="KCC Tops Kalutara District Again with 214 University Entrances" excerpt="The highest number of university placements in the district, with a 95% pass rate at A/L examinations." category="Academics" date="May 2026" href="/news/results-2026" imageSrc="/images/white.jpg" />
        </DemoSection>

        <DemoSection title="NewsCard – Standard">
          <NewsCard variant="standard" title="KITS Launches Nexus" excerpt="The official school website built entirely by students under the guidance of KITS." category="Technology" date="April 2026" href="/news/nexus-launch" imageSrc="/images/white.jpg" />
          <NewsCard variant="standard" title="Cadet Corps Annual Camp" excerpt="Students participated in the Rantambe training camp with great success." category="Extracurricular" date="March 2026" href="/news/cadet-camp" />
        </DemoSection>

        <DemoSection title="NewsCard – Compact">
          <div className="w-96">
            <NewsCard variant="compact" title="Swimming Pool Reopens After Renovation" category="Facilities" date="Jun 1, 2026" href="/news/pool-reopens" />
            <NewsCard variant="compact" title="Alumni Reunion 2026 – Save the Date" category="Alumni" date="May 28, 2026" href="/news/alumni-reunion" />
            <NewsCard variant="compact" title="Scholarship Exam Results Announced" category="Academics" date="May 20, 2026" href="/news/scholarship-results" />
          </div>
        </DemoSection>

        {/* SocietyBanner */}
        <DemoSection title="SocietyBanner">
          <SocietyBanner name="Kannangara ICT Society" foundingYear={2010} coverImageSrc="/images/white.jpg" />
          <SocietyBanner name="Science Society" foundingYear={1975} />
        </DemoSection>

        {/* SocietyCard */}
        <DemoSection title="SocietyCard – Hub Grid">
          <SocietyCard id="science-society" slug="science" variant="hub-grid" name="Science Society" tagline="Exploring the wonders of science through experiments and field trips." category="academic" href="/societies/science" memberCount={60} founded="1975" />
          <SocietyCard id="drama-club" slug="drama" variant="hub-grid" name="Drama Club" tagline="Annual stage plays and cultural performances." category="arts" href="/societies/drama" memberCount={35} founded="1980" />
          <SocietyCard id="sports-council" slug="sports" variant="hub-grid" name="Sports Council" tagline="Organizing inter-house and district-level competitions." category="sports" href="/societies/sports" memberCount={120} founded="1950" />
        </DemoSection>

        <DemoSection title="SocietyCard – Featured (KITS)">
          <SocietyCard id="kits" slug="kits" variant="featured" name="KITS – Kannangara ICT Society" tagline="Building the digital future of KCC. Creators of Nexus and Paideon." category="technology" href="/societies/kits" memberCount={120} founded="2010" imageSrc="/images/white.jpg" />
        </DemoSection>

        {/* StaffCard */}
        <DemoSection title="StaffCard – Principal">
          <StaffCard id="principal" role="principal" variant="principal" name="Mr. Bandula Rajapaksa" title="Principal" tenure="Since 2019" quote="..." imageSrc="/images/white.jpg" href="/administration" />
        </DemoSection>

        <DemoSection title="StaffCard – Grid">
          <StaffCard id="deputy" role="deputy-principal" variant="grid" name="Mrs. Kamala Perera" title="Deputy Principal" portfolio="Academic Affairs" tenure="15 years" imageSrc="/images/white.jpg" />
          <StaffCard id="hos" role="teacher" variant="grid" name="Mr. Nimal Jayasuriya" title="Head of Science" portfolio="Physics Department" tenure="10 years" />
          <StaffCard id="kits-teacher" role="teacher" variant="grid" name="Ms. Dilani Fernando" title="Teacher in Charge – KITS" portfolio="ICT & Computing" />
        </DemoSection>

        <DemoSection title="StaffCard – Compact">
          <StaffCard id="head-prefect" role="head-prefect" variant="compact" name="Lakshan Perera" title="Head Prefect" />
          <StaffCard id="asst-principal" role="assistant-principal" variant="compact" name="Ms. Priyani Silva" title="Assistant Principal – Primary" />
          <StaffCard id="sports-director" role="teacher" variant="compact" name="Mr. Sunil Rathnayake" title="Sports Director" />
        </DemoSection>

        {/* StatCard */}
        <DemoSection title="StatCard – Single Metric">
          <StatCard id="students" target={5000} suffix="+" label="Students" />
          <StatCard id="years" target={153} label="Years of Excellence" />
          <StatCard id="entrances" target={200} suffix="+" label="University Entrances (2025)" />
        </DemoSection>

        <DemoSection title="StatCard – With Trend">
          <StatCard id="ol-pass" target={98} suffix="%" label="O/L Pass Rate" variant="with-trend" trend={{ direction: 'up', value: '+5%', label: 'vs 2024' }} />
          <StatCard id="al-pass" target={76} suffix="%" label="A/L Pass Rate" variant="with-trend" trend={{ direction: 'up', value: '+8%' }} />{' '}
        </DemoSection>
      </div>
    </div>
  );
}
