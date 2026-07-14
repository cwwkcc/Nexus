// apps/web/src/app/[locale]/components/global/page.tsx
'use client';

import { AnnouncementBanner, BackToTopButton, CrestAnimation, LanguageSwitcher, MapEmbed, MasonryGrid, ScrollProgressBar } from '@nexus/ui';

function DemoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="font-display text-h2 mb-4 border-b border-border-light pb-2">{title}</h2>
      <div className="flex flex-wrap gap-6 items-start">{children}</div>
    </div>
  );
}

export default function GlobalPage() {
  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">Global Components</h1>
        <p className="font-body text-body text-text-muted mb-12">Site‑wide elements like banners, animations, maps and the language switcher.</p>

        <DemoSection title="AnnouncementBanner">
          <AnnouncementBanner variant="info" dismissible>
            School reopens on 5 May.
          </AnnouncementBanner>
          <AnnouncementBanner variant="warning">Admissions closing soon.</AnnouncementBanner>
        </DemoSection>

        <DemoSection title="BackToTopButton">
          <BackToTopButton />
          <p className="text-sm text-text-muted">(Scroll down to see the button appear)</p>
        </DemoSection>

        <DemoSection title="CrestAnimation">
          <CrestAnimation size="md" />
        </DemoSection>

        <DemoSection title="LanguageSwitcher">
          <LanguageSwitcher locale="en" variant="header" />
        </DemoSection>

        <DemoSection title="MapEmbed">
          <MapEmbed src="https://www.openstreetmap.org/export/embed.html?bbox=80.0%2C6.0%2C80.1%2C6.1&layer=mapnik" title="KCC Location" />
        </DemoSection>

        <DemoSection title="MasonryGrid">
          <MasonryGrid columnCount={{ mobile: 2, tablet: 3, desktop: 4 }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-surface-elevated border border-border-light p-4 text-center">
                Item {i}
              </div>
            ))}
          </MasonryGrid>
        </DemoSection>

        <DemoSection title="ScrollProgressBar">
          <ScrollProgressBar />
          <p className="text-sm text-text-muted">(Scroll down to see the progress bar at the top of the page)</p>
        </DemoSection>
      </div>
    </div>
  );
}
