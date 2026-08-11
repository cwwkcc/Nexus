'use client';

// apps/web/src/app/[locale]/gallery/[albumSlug]/PhotoGrid.tsx
//
// F-152: "Photo grid with Lightbox for full-screen viewing. All images
// via next/image." Lightbox (@nexus/ui) is a controlled overlay
// (isOpen/onClose) — needs client state, so it can't be triggered
// directly from the album page's server component, the same reasoning
// news/[slug]/ArticleShareButton.tsx's/events/[slug]/EventShareButton.tsx's
// own header comments give for their own small client wrappers.

import { Lightbox } from '@nexus/ui';
import Image from 'next/image';
import { useState } from 'react';

interface PhotoGridPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string | null;
}

interface PhotoGridProps {
  photos: PhotoGridPhoto[];
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
}

export function PhotoGrid({ photos, closeLabel, prevLabel, nextLabel }: PhotoGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const images = photos.map((photo) => ({ src: photo.src, alt: photo.alt, caption: photo.caption ?? undefined }));

  return (
    <>
      <div className="grid grid-cols-2 gap-space-3 sm:grid-cols-3 md:grid-cols-4">
        {photos.map((photo, index) => (
          <button key={photo.id} type="button" onClick={() => setOpenIndex(index)} className="relative aspect-square overflow-hidden rounded-sm bg-green-base">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw" className="object-cover transition-transform duration-gentle hover:scale-[1.04]" />
          </button>
        ))}
      </div>

      <Lightbox images={images} initialIndex={openIndex ?? 0} isOpen={openIndex !== null} onClose={() => setOpenIndex(null)} closeLabel={closeLabel} prevLabel={prevLabel} nextLabel={nextLabel} />
    </>
  );
}
