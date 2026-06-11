// packages/ui/src/components/sections/AlumniLegacyBlock.tsx
'use client';

import { useState } from 'react';
import { cn } from '../../utilities/cn';
import { ImageFrame } from '../media/ImageFrame';
import { Container } from '../layout/Container';

interface AlumniProfile {
  id: string;
  name: string;
  graduationYear: number;
  position: string;
  quote: string;
  portraitSrc?: string;
  portraitAlt?: string;
}

interface AlumniLegacyBlockProps {
  alumni: AlumniProfile[];
  className?: string;
}

export function AlumniLegacyBlock({
  alumni,
  className,
}: AlumniLegacyBlockProps) {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [activeIndex, setActiveIndex] = useState(0);

  const years = Array.from(new Set(alumni.map((a) => a.graduationYear))).sort(
    (a, b) => b - a,
  );

  const filteredAlumni =
    selectedYear === 'all'
      ? alumni
      : alumni.filter((a) => a.graduationYear === selectedYear);

  const currentAlumnus = filteredAlumni[activeIndex];

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % filteredAlumni.length);
  };

  const prev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + filteredAlumni.length) % filteredAlumni.length,
    );
  };

  if (filteredAlumni.length === 0) return null;

  return (
    <Container>
      {/* Year filter */}
      <div className="flex justify-center gap-space-2 mb-space-8 flex-wrap">
        <button
          onClick={() => setSelectedYear('all')}
          className={cn(
            'px-space-3 py-space-1 font-body text-sm rounded-full transition-all',
            selectedYear === 'all'
              ? 'bg-green-base text-text-inverse'
              : 'bg-surface-default text-text-muted hover:bg-surface-deep',
          )}
        >
          All Years
        </button>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={cn(
              'px-space-3 py-space-1 font-body text-sm rounded-full transition-all',
              selectedYear === year
                ? 'bg-green-base text-text-inverse'
                : 'bg-surface-default text-text-muted hover:bg-surface-deep',
            )}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Quote carousel */}
      <div className="relative mx-auto">
        <button
          onClick={prev}
          className="absolute left-space-0 top-space-40 -translate-y-1/2 -translate-x-12 bg-surface-elevated rounded-full p-space-2 shadow-elevation-1 hover:bg-gold-base transition-colors"
          aria-label="Previous alumnus"
        >
          ←
        </button>

        <div className="text-center">
          {currentAlumnus.portraitSrc && (
            <ImageFrame
              src={currentAlumnus.portraitSrc}
              alt={currentAlumnus.portraitAlt || currentAlumnus.name}
              aspectRatio="3/4"
              variant="featured"
              frameColor="gold"
              frameWidth="border-md"
              size="lg"
              className="m-space-4 mx-auto"
            ></ImageFrame>
          )}

          <div className="w-size-12 h-size-0p5 bg-gold-base mx-auto mb-space-6" />

          <blockquote className="font-display text-pullquote italic text-text-primary mb-space-6">
            &ldquo;{currentAlumnus.quote}&rdquo;
          </blockquote>

          <p className="font-display text-h3 mb-space-2">
            {currentAlumnus.name}
          </p>
          <p className="font-body text-body-sm text-text-muted">
            {currentAlumnus.position} · Class of {currentAlumnus.graduationYear}
          </p>
        </div>

        <button
          onClick={next}
          className="absolute right-space-0 top-space-40 -translate-y-1/2 translate-x-12 bg-surface-elevated rounded-full p-space-2 shadow-elevation-1 hover:bg-gold-base transition-colors"
          aria-label="Next alumnus"
        >
          →
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-space-2 mt-space-8">
        {filteredAlumni.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              'w-size-2 h-size-2 rounded-full transition-all',
              idx === activeIndex
                ? 'w-size-4 bg-gold-base'
                : 'bg-border-default',
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </Container>
  );
}
