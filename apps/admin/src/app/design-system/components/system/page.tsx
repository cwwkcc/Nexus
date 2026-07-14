// apps/admin/src/app/design-system/components/system/page.tsx
'use client';

import { AnnouncementBanner, CookieConsentBanner, EmptyState, ErrorState, LoadingScreen, LoadingSkeleton, NotFoundPage, OfflineBanner, Button } from '@nexus/ui';
import { useState } from 'react';

import { DemoSection } from '../_components/DemoSection';

export default function SystemPage() {
  const [showLoading, setShowLoading] = useState(false);

  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">System Components</h1>
        <p className="font-body text-body text-text-muted mb-space-12">Global system components – banners, empty/error states, loading screens, cookie consent, offline banners, and the 404 page.</p>

        {/* Announcement Banner */}
        <DemoSection title="AnnouncementBanner" description="Dismissible top‑of‑page announcement strip for urgent notices.">
          <div className="space-y-space-4">
            <AnnouncementBanner variant="info">School reopens on 5 May.</AnnouncementBanner>
            <AnnouncementBanner variant="warning" dismissible>
              Admissions closing soon – apply by 30 June.
            </AnnouncementBanner>
            <AnnouncementBanner variant="error">Website maintenance scheduled for Sunday 2 AM – 4 AM.</AnnouncementBanner>
          </div>
        </DemoSection>

        {/* Cookie Consent Banner */}
        <DemoSection title="CookieConsentBanner" description="Appears at the bottom of the page if consent not given. Uses localStorage to remember preference.">
          <div className="p-space-6 bg-surface-elevated border border-border-light rounded-md">
            <p className="font-body text-body-sm text-text-muted mb-space-4">The banner is fixed to the viewport. Scroll down to see it appear at the bottom of the page.</p>
            <CookieConsentBanner />
            <p className="font-body text-caption text-text-muted mt-space-4">
              (Clear localStorage to reset: <code className="bg-surface-deep px-space-1 rounded-sm">localStorage.removeItem('kcc-cookie-consent')</code>)
            </p>
          </div>
        </DemoSection>

        {/* Empty State */}
        <DemoSection title="EmptyState" description="Displayed when no data is available (e.g., empty search results, no news).">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
            <div className="border border-border-light rounded-md overflow-hidden">
              <EmptyState heading="No news found" description="There are no articles matching your criteria. Try adjusting your filters." />
            </div>
            <div className="border border-border-light rounded-md overflow-hidden">
              <EmptyState
                heading="No results"
                description="We couldn't find any societies matching your search."
                action={{
                  label: 'Clear filters',
                  onClick: () => alert('Filters cleared (demo)'),
                }}
              />
            </div>
          </div>
        </DemoSection>

        {/* Error State */}
        <DemoSection title="ErrorState" description="Displayed when something goes wrong – inline or full section variants.">
          <div className="space-y-space-6">
            <div>
              <p className="font-body text-label mb-space-2">Inline variant</p>
              <ErrorState variant="inline" message="Failed to load comments. Please try again." onRetry={() => alert('Retry clicked')} />
            </div>
            <div>
              <p className="font-body text-label mb-space-2">Section variant</p>
              <ErrorState variant="section" message="Unable to load content. Check your connection and refresh." onRetry={() => alert('Refresh clicked')} />
            </div>
          </div>
        </DemoSection>

        {/* Loading Screen */}
        <DemoSection title="LoadingScreen" description="Full‑viewport loading overlay with animated crest. Used for page transitions and initial load.">
          <Button onClick={() => setShowLoading(true)} variant="primary">
            Show Loading Screen
          </Button>
          <LoadingScreen visible={showLoading} onExited={() => setShowLoading(false)} />
        </DemoSection>

        {/* Loading Skeleton */}
        <DemoSection title="LoadingSkeleton" description="Shimmer placeholders for content loading. Variants: card, table-row, section.">
          <div className="space-y-space-8">
            <div>
              <p className="font-body text-label mb-space-2">Card grid (default)</p>
              <LoadingSkeleton variant="card" count={3} />
            </div>
            <div>
              <p className="font-body text-label mb-space-2">Table row</p>
              <LoadingSkeleton variant="table-row" count={4} />
            </div>
            <div>
              <p className="font-body text-label mb-space-2">Section (header + cards)</p>
              <LoadingSkeleton variant="section" />
            </div>
          </div>
        </DemoSection>

        {/* Offline Banner */}
        <DemoSection title="OfflineBanner" description="Shows a banner at the top when the user loses network connection.">
          <div className="p-space-6 bg-surface-elevated border border-border-light rounded-md">
            <p className="font-body text-body-sm text-text-muted mb-space-4">Simulate offline mode in DevTools (Network tab → "Offline") to see the banner appear at the top of the page.</p>
            <OfflineBanner />
          </div>
        </DemoSection>

        {/* 404 Page Preview */}
        <DemoSection title="NotFoundPage (404)" description="Full‑page 404 component with animated count‑up and quick navigation links.">
          <div className="border border-border-light rounded-md overflow-hidden max-h-96 overflow-y-auto">
            <NotFoundPage />
          </div>
        </DemoSection>
      </div>
    </div>
  );
}
