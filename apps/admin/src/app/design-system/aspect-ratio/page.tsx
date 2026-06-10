// apps/admin/src/app/design-system/aspect-ratio/page.tsx
'use client';

import { ImageFrame } from '@nexus/ui';

export default function AspectRatioPage() {
  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Aspect Ratio Tokens</h1>
        <p className="font-body text-body text-text-muted mb-space-12">
          Predefined aspect ratios for images and media.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-8">
          <div>
            <h2 className="font-display text-h3 mb-space-4">hero (16:9)</h2>
            <ImageFrame
              src="/images/ironman.jpg"
              alt="16:9"
              aspectRatio="16/9"
              className="max-w-md"
            />
          </div>
          <div>
            <h2 className="font-display text-h3 mb-space-4">portrait (3:4)</h2>
            <ImageFrame
              src="/images/ironman.jpg"
              alt="3:4"
              aspectRatio="3/4"
              className="max-w-sm"
            />
          </div>
          <div>
            <h2 className="font-display text-h3 mb-space-4">square (1:1)</h2>
            <ImageFrame
              src="/images/ironman.jpg"
              alt="1:1"
              aspectRatio="1/1"
              className="max-w-xs"
            />
          </div>
          <div>
            <h2 className="font-display text-h3 mb-space-4">event (16:7)</h2>
            <ImageFrame
              src="/images/ironman.jpg"
              alt="16:7"
              aspectRatio="16/7"
              className="max-w-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
