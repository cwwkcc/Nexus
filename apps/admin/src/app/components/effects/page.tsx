// apps/web/src/app/[locale]/components/effects/page.tsx
'use client';

import { AmbientEmbers } from '@nexus/ui';

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
      <div className="relative min-h-[200px] bg-surface-inverse rounded-md overflow-hidden">
        {children}
        <div className="absolute bottom-4 left-4 text-text-inverse text-sm bg-black/50 px-2 py-1 rounded">
          Ambient floating particles
        </div>
      </div>
    </div>
  );
}

export default function EffectsPage() {
  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">Effects</h1>
        <p className="font-body text-body text-text-muted mb-12">
          Atmospheric and decorative visual effects.
        </p>

        <DemoSection title="AmbientEmbers">
          <AmbientEmbers count={30} />
        </DemoSection>
      </div>
    </div>
  );
}
