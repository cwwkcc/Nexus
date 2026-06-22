'use client';

import {
  Caption,
  ImageFrame,
  Lightbox,
  PanoramicFacilityViewer,
  VideoFrame,
  type LightboxImage,
} from '@nexus/ui';
import { useState } from 'react';

import { DemoSection } from '../_components/DemoSection';

export default function MediaPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const demoImages: LightboxImage[] = [
    {
      src: '/images/white.jpg',
      alt: 'Demo image 1',
      caption: 'Main building at sunset',
    },
    {
      src: '/images/white.jpg',
      alt: 'Demo image 2',
      caption: 'Science laboratory',
    },
    {
      src: '/images/white.jpg',
      alt: 'Demo image 3',
      caption: 'Annual prize giving ceremony',
    },
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const panoramicImages = [
    {
      src: '/images/white.jpg',
      alt: 'Panorama 1',
      label: 'Main building – front view',
    },
    { src: '/images/white.jpg', alt: 'Panorama 2', label: 'Sports ground' },
    { src: '/images/white.jpg', alt: 'Panorama 3', label: 'Library interior' },
  ];

  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Media Components</h1>
        <p className="font-body text-body text-text-muted mb-space-12">
          ImageFrame, VideoFrame, Lightbox, Panoramic viewer, and Caption – all
          powered by design tokens.
        </p>

        {/* ImageFrame */}
        <DemoSection title="ImageFrame – Variants & Ratios">
          <ImageFrame
            src="/images/white.jpg"
            alt="Standard 16:9"
            aspectRatio="16/9"
            variant="standard"
            className="w-64"
          />
          <ImageFrame
            src="/images/white.jpg"
            alt="Featured with overlay"
            aspectRatio="4/3"
            variant="featured"
            overlay="medium"
            className="w-64"
          />
          <ImageFrame
            src="/images/white.jpg"
            alt="Full bleed"
            aspectRatio="21/9"
            variant="full-bleed"
            className="w-80"
          />
          <ImageFrame
            src="/images/white.jpg"
            alt="Portrait"
            aspectRatio="3/4"
            className="w-48"
          />
        </DemoSection>

        <DemoSection title="ImageFrame – With Caption & Corner Badge">
          <ImageFrame
            src="/images/white.jpg"
            alt="With caption"
            aspectRatio="16/9"
            caption="Main building, completed in 1965"
            className="w-80"
          />
          <ImageFrame
            src="/images/white.jpg"
            alt="With badge"
            aspectRatio="16/9"
            cornerBadge={
              <span className="bg-gold-base text-green-base px-space-2 py-space-0.5 text-caption rounded">
                Featured
              </span>
            }
            className="w-80"
          />
        </DemoSection>

        {/* VideoFrame */}
        <DemoSection title="VideoFrame – YouTube Embed">
          <VideoFrame
            src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            source="youtube"
            title="Sample YouTube video"
            aspectRatio="16/9"
            className="w-96"
          />
        </DemoSection>

        <DemoSection title="VideoFrame – Direct MP4 with Poster">
          <VideoFrame
            src="/videos/sample.mp4"
            source="direct"
            posterSrc="/images/white.jpg"
            title="School promotional video"
            aspectRatio="16/9"
            className="w-96"
          />
        </DemoSection>

        {/* Lightbox */}
        <DemoSection title="Lightbox – Image Gallery">
          <div className="flex gap-space-4">
            {demoImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => openLightbox(idx)}
                className="cursor-pointer"
              >
                <ImageFrame
                  src={img.src}
                  alt={img.alt}
                  aspectRatio="4/3"
                  className="w-32 transition-opacity hover:opacity-80"
                />
              </button>
            ))}
          </div>
          <Lightbox
            images={demoImages}
            initialIndex={lightboxIndex}
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
          />
        </DemoSection>

        {/* PanoramicFacilityViewer */}
        <DemoSection title="PanoramicFacilityViewer">
          <PanoramicFacilityViewer
            images={panoramicImages}
            defaultIndex={0}
            className="w-full max-w-2xl"
          />
        </DemoSection>

        {/* Caption standalone */}
        <DemoSection title="Caption – Inline & Overlay">
          <figure className="relative w-80">
            <ImageFrame src="/images/white.jpg" alt="Demo" aspectRatio="16/9" />
            <Caption variant="inline">Inline caption below image</Caption>
          </figure>
          <figure className="relative w-80">
            <ImageFrame src="/images/white.jpg" alt="Demo" aspectRatio="16/9" />
            <Caption variant="overlay">Overlay caption on image</Caption>
          </figure>
        </DemoSection>
      </div>
    </div>
  );
}
