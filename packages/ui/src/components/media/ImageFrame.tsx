'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '../../utilities/cn';

export type ImageFrameAspectRatio =
  | '16/9'
  | '4/3'
  | '3/4'
  | '1/1'
  | '21/9'
  | '16/7';
export type ImageFrameVariant = 'standard' | 'featured' | 'full-bleed';

export interface ImageFrameProps {
  src: string;
  alt: string;
  aspectRatio?: ImageFrameAspectRatio;
  variant?: ImageFrameVariant;
  caption?: string;
  overlay?: 'light' | 'medium' | 'heavy' | false;
  cornerBadge?: React.ReactNode;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

const aspectRatioMap: Record<ImageFrameAspectRatio, string> = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '3/4': 'aspect-[3/4]',
  '1/1': 'aspect-square',
  '21/9': 'aspect-[21/9]',
  '16/7': 'aspect-[16/7]',
};

const overlayMap = {
  light: 'bg-overlay-light',
  medium: 'bg-overlay-medium',
  heavy: 'bg-overlay-heavy',
};

const variantClasses: Record<ImageFrameVariant, string> = {
  standard: 'rounded-md shadow-elevation-1',
  featured: 'rounded-md shadow-elevation-2',
  'full-bleed': 'rounded-none shadow-none',
};

export function ImageFrame({
  src,
  alt,
  aspectRatio = '16/9',
  variant = 'standard',
  caption,
  overlay = false,
  cornerBadge,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: ImageFrameProps) {
  const [error, setError] = useState(false);

  return (
    <figure
      className={cn('overflow-hidden', variantClasses[variant], className)}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden bg-surface-deep',
          aspectRatioMap[aspectRatio],
        )}
      >
        {!error ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-gentle group-hover:scale-[1.04]"
            sizes={sizes}
            priority={priority}
            onError={() => setError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-deep">
            <span className="font-body text-caption text-text-muted">
              Image unavailable
            </span>
          </div>
        )}
        {overlay && (
          <div
            className={cn(
              'absolute inset-0 pointer-events-none',
              overlayMap[overlay],
            )}
          />
        )}
        {cornerBadge && (
          <div className="absolute top-space-3 left-space-3 z-10">
            {cornerBadge}
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-space-2 font-body text-caption text-text-muted text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
