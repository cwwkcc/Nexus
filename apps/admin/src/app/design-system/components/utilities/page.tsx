'use client';

import { CountdownTimer, ScrollProgressBar, BackToTopButton } from '@nexus/ui';

import { DemoSection } from '../_components/DemoSection';

export default function UtilitiesPage() {
  const now = Date.now();

  const targetDates = [
    { label: '10 Seconds', targetDate: new Date(now + 10 * 1000) },
    { label: '5 Minutes', targetDate: new Date(now + 5 * 60 * 1000) },
    { label: '2 Hours', targetDate: new Date(now + 2 * 60 * 60 * 1000) },
    { label: '2 Days', targetDate: new Date(now + 2 * 24 * 60 * 60 * 1000) },
  ];

  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      {/* ScrollProgressBar is fixed at the top – will appear when you scroll down */}
      <ScrollProgressBar />

      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Utilities</h1>

        <DemoSection title="ScrollProgressBar">
          <div className="space-y-space-4">
            <p className="font-body text-body-sm text-text-muted">
              A thin progress bar at the top of the page that fills as you scroll.
              <br />
              <span className="text-caption">(Scroll down on any page to see it – implemented with design tokens)</span>
            </p>
            <div className="p-space-6 bg-surface-elevated border border-border-light rounded-md text-center">
              <p className="font-body text-body-sm text-text-primary">
                The bar is currently <strong>active above 0% scroll</strong>. Try scrolling this page – the gold line will grow.
              </p>
            </div>
          </div>
        </DemoSection>

        <DemoSection title="CountdownTimer">
          <div className="space-y-space-8">
            {targetDates.map(({ label, targetDate }) => (
              <div key={label}>
                <h3 className="font-display text-h3 mb-space-3">{label}</h3>
                <CountdownTimer targetDate={targetDate} />
              </div>
            ))}
          </div>
        </DemoSection>

        <DemoSection title="BackToTopButton">
          <div className="p-space-6 bg-surface-elevated border border-border-light rounded-md">
            <p className="font-body text-body-sm text-text-muted mb-space-4">Appears in the bottom‑right corner after scrolling past window.innerHeight * 0.5.</p>
            {/* The button is already fixed – no need to render it twice, but we can show a static preview */}
            <BackToTopButton />
            <p className="font-body text-caption text-text-muted mt-space-3 text-center">(Actual button appears on scroll – check bottom‑right corner)</p>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}
