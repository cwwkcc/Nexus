// apps/web/src/app/[locale]/components/media/page.tsx
'use client';

import {
  Caption,
  ImageFrame,
  Lightbox,
  PanoramicfacilityViewer,
  VideoFrame,
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

export default function MediaPage() {
  const demoImages = [
    { src: '/images/white.jpg', alt: 'Demo image 1' },
    { src: '/images/white.jpg', alt: 'Demo image 2' },
  ];

  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">Media</h1>
        <p className="font-body text-body text-text-muted mb-12">
          Images, videos, lightboxes and panoramic viewers.
        </p>

        <DemoSection title="ImageFrame">
          <ImageFrame
            src="/images/white.jpg"
            alt="Demo"
            aspectRatio="16/9"
            variant="standard"
          />
          <ImageFrame
            src="/images/white.jpg"
            alt="Featured"
            variant="featured"
          />
        </DemoSection>

        <DemoSection title="Caption">
          <figure>
            <ImageFrame src="/images/white.jpg" alt="Demo" />
            <Caption variant="inline">This is an inline caption</Caption>
          </figure>
          <div className="relative">
            <ImageFrame src="/images/white.jpg" alt="Overlay" />
            <Caption variant="overlay">Overlay caption</Caption>
          </div>
        </DemoSection>

        <DemoSection title="VideoFrame">
          <VideoFrame
            src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            source="youtube"
            title="Sample Video"
            aspectRatio="16/9"
          />
        </DemoSection>

        <DemoSection title="Lightbox (Trigger)">
          <Lightbox images={demoImages} isOpen={false} onClose={() => {}} />
          <p className="text-text-muted text-sm">
            (Interactive example omitted – see code for implementation)
          </p>
        </DemoSection>

        <DemoSection title="PanoramicfacilityViewer">
          <PanoramicfacilityViewer
            images={[{ src: '/images/white.jpg', alt: 'Panorama' }]}
          />
        </DemoSection>
      </div>
    </div>
  );
}
