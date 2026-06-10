// apps/web/src/app/[locale]/components/logos/page.tsx
'use client';

import { SchoolLogo } from '@nexus/ui';

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

export default function LogosPage() {
  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">Logos</h1>
        <p className="font-body text-body text-text-muted mb-12">
          School crest and lockup.
        </p>

        <DemoSection title="SchoolLogo (Crest Only)">
          <SchoolLogo variant="crest-only" size="md" />
          <SchoolLogo variant="crest-only" size="lg" />
        </DemoSection>

        <DemoSection title="SchoolLogo (Lockup)">
          <SchoolLogo variant="lockup" size="md" />
          <SchoolLogo variant="lockup" size="lg" />
        </DemoSection>
      </div>
    </div>
  );
}
