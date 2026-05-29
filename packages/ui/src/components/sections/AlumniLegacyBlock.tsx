// packages/ui/src/components/sections/AlumniLegacyBlock.tsx
'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import Image from 'next/image';

export interface AlumniProfile {
  id: string;
  name: string;
  graduationYear: number;
  position: string;
  quote: string;
  portraitSrc?: string;
  portraitAlt?: string;
}

export interface AlumniLegacyBlockProps {
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
    <div className={clsx('py-12', className)}>
      {/* Year filter */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        <button
          onClick={() => setSelectedYear('all')}
          className={clsx(
            'px-3 py-1 font-body text-sm rounded-full transition-all',
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
            className={clsx(
              'px-3 py-1 font-body text-sm rounded-full transition-all',
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
      <div className="relative max-w-3xl mx-auto">
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-surface-elevated rounded-full p-2 shadow-elevation-1 hover:bg-gold-base transition-colors"
          aria-label="Previous alumnus"
        >
          ←
        </button>

        <div className="text-center">
          {currentAlumnus.portraitSrc && (
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
              <Image
                src={currentAlumnus.portraitSrc}
                alt={currentAlumnus.portraitAlt || currentAlumnus.name}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          )}

          <div className="w-12 h-0.5 bg-gold-base mx-auto mb-6" />

          <blockquote className="font-display text-pullquote italic text-text-primary mb-6">
            &ldquo;{currentAlumnus.quote}&rdquo;
          </blockquote>

          <p className="font-display text-h3 mb-2">{currentAlumnus.name}</p>
          <p className="font-body text-body-sm text-text-muted">
            {currentAlumnus.position} · Class of {currentAlumnus.graduationYear}
          </p>
        </div>

        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-surface-elevated rounded-full p-2 shadow-elevation-1 hover:bg-gold-base transition-colors"
          aria-label="Next alumnus"
        >
          →
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {filteredAlumni.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={clsx(
              'w-2 h-2 rounded-full transition-all',
              idx === activeIndex ? 'w-4 bg-gold-base' : 'bg-border-default',
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
