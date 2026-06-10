// apps/web/src/app/[locale]/components/system/page.tsx
'use client';

import { useState } from 'react';
import {
  CookieConsentBanner,
  LoadingScreen,
  NotFoundPage,
  OfflineBanner,
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

export default function SystemPage() {
  const [showLoading, setShowLoading] = useState(false);

  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">System</h1>
        <p className="font-body text-body text-text-muted mb-12">
          Global system components like loading screens, cookie consent, offline
          banners and 404 pages.
        </p>

        <DemoSection title="CookieConsentBanner">
          <CookieConsentBanner />
          <p className="text-sm text-text-muted">
            (Appears at bottom of the page if consent not given)
          </p>
        </DemoSection>

        <DemoSection title="LoadingScreen (Trigger)">
          <button
            onClick={() => setShowLoading(true)}
            className="px-4 py-2 bg-green-base text-white rounded"
          >
            Show Loading Screen
          </button>
          <LoadingScreen
            visible={showLoading}
            onExited={() => setShowLoading(false)}
          />
        </DemoSection>

        <DemoSection title="OfflineBanner">
          <OfflineBanner />
          <p className="text-sm text-text-muted">
            (Simulate offline mode in devtools to see)
          </p>
        </DemoSection>

        <DemoSection title="NotFound Page (Preview)">
          <div className="border border-border-light rounded-md overflow-hidden max-h-96 overflow-y-auto">
            <NotFoundPage />
          </div>
        </DemoSection>
      </div>
    </div>
  );
}
