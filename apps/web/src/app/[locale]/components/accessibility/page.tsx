// apps/web/src/app/[locale]/components/accessibility/page.tsx
'use client';

import { SkipToContent } from '@nexus/ui';

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
      <div className="flex flex-wrap gap-6 items-center">{children}</div>
    </div>
  );
}

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">Accessibility</h1>
        <p className="font-body text-body text-text-muted mb-12">
          Components that improve keyboard navigation and screen‑reader
          experience.
        </p>

        <DemoSection title="SkipToContent">
          <div className="relative border border-border-light p-4 rounded-md">
            <SkipToContent />
            <p className="font-body text-body-sm text-text-muted">
              Press <kbd className="px-2 py-1 bg-surface-deep rounded">Tab</kbd>{' '}
              to see the skip link appear.
            </p>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}
