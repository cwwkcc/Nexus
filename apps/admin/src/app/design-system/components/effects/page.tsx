'use client';

import { AmbientEmbers } from '@nexus/ui';
import { DemoSection } from '../_components/DemoSection';

export default function EffectsPage() {
  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Effects</h1>
        <p className="font-body text-body text-text-muted mb-space-12">
          Atmospheric and decorative visual effects.
        </p>

        <DemoSection title="AmbientEmbers">
          <div className="relative min-h-[200px] bg-surface-inverse rounded-md overflow-hidden">
            <AmbientEmbers count={40} />
            <div className="absolute bottom-4 left-4 text-text-inverse text-sm bg-black/50 px-2 py-1 rounded">
              Floating particles – respects reduced motion
            </div>
          </div>
          <p className="font-body text-caption text-text-muted mt-space-2">
            Props: <code>count</code> (default 20), <code>className</code>.
            Automatically disabled or simplified when{' '}
            <code>prefers-reduced-motion</code> is set.
          </p>
        </DemoSection>

        {/* Note about GSAP */}
        <div className="mt-space-8 p-space-6 bg-surface-default border border-border-light rounded-md">
          <h3 className="font-display text-h3 mb-space-2">
            Cinematic Effects (GSAP)
          </h3>
          <p className="font-body text-body-sm text-text-muted">
            For timeline‑based animations (hero crest drawing, page
            transitions), GSAP is used directly in page components. See{' '}
            <code className="bg-surface-deep px-1 rounded">CrestAnimation</code>{' '}
            and{' '}
            <code className="bg-surface-deep px-1 rounded">LoadingScreen</code>{' '}
            for examples.
          </p>
        </div>
      </div>
    </div>
  );
}
