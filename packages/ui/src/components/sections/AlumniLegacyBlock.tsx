// packages/ui/src/components/sections/AlumniLegacyBlock.tsx
'use client';

import { useState } from 'react';

import { cn } from '../../utilities/cn';
import { Icon } from '../icons';
import { Container } from '../layout/Container';
import { HStack, VStack } from '../layout/Stack';
import { ImageFrame } from '../media/ImageFrame';

interface AlumniProfile {
  id: string;
  name: string;
  // Updated to accept both string and number based on the JSON
  graduationYear: number | string;
  position: string;
  quote: string;
  portraitSrc?: string;
  portraitAlt?: string;
}

interface AlumniLegacyBlockProps {
  alumni: AlumniProfile[];
  className?: string;
}

export function AlumniLegacyBlock({ alumni, className }: AlumniLegacyBlockProps) {
  const [selectedYear, setSelectedYear] = useState<number | string | 'all'>('all');
  const [activeIndex, setActiveIndex] = useState(0);

  // Cast years to Number for accurate descending sorting
  const years = Array.from(new Set(alumni.map((a) => a.graduationYear))).sort((a, b) => Number(b) - Number(a));

  const filteredAlumni = selectedYear === 'all' ? alumni : alumni.filter((a) => a.graduationYear === selectedYear);

  const currentAlumnus = filteredAlumni[activeIndex];

  // FIX: Reset index when filter changes to prevent out-of-bounds crashes
  const handleYearChange = (year: number | string | 'all') => {
    setSelectedYear(year);
    setActiveIndex(0);
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % filteredAlumni.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + filteredAlumni.length) % filteredAlumni.length);
  };

  if (filteredAlumni.length === 0) return null;

  return (
    <Container className={className}>
      {/* Year filter */}
      {/* FIX: Removed accidental leading space in className */}
      <div className="flex justify-center gap-space-2 mb-space-8 flex-wrap">
        <button onClick={() => handleYearChange('all')} className={cn('px-space-3 py-space-1 font-body text-sm rounded-full transition-all', selectedYear === 'all' ? 'bg-green-base text-text-inverse' : 'bg-surface-default text-text-muted hover:bg-surface-deep')}>
          All Years
        </button>
        {years.map((year) => (
          <button key={year} onClick={() => handleYearChange(year)} className={cn('px-space-3 py-space-1 font-body text-sm rounded-full transition-all', selectedYear === year ? 'bg-green-base text-text-inverse' : 'bg-surface-default text-text-muted hover:bg-surface-deep')}>
            {year}
          </button>
        ))}
      </div>

      {/* Quote carousel */}
      <VStack className="text-center">
        {currentAlumnus.portraitSrc && <ImageFrame src={currentAlumnus.portraitSrc} alt={currentAlumnus.portraitAlt || currentAlumnus.name} aspectRatio="3/4" variant="featured" frameColor="gold" frameWidth="border-md" size="full" className="mx-auto mb-space-6 max-w-size-screen-h-45" />}

        <blockquote className="font-display text-pullquote italic text-text-primary mb-space-6 mx-auto">&ldquo;{currentAlumnus.quote}&rdquo;</blockquote>

        <HStack justify="between" className="m-auto">
          <button onClick={prev} className="bg-surface-elevated rounded-full p-space-2 shadow-elevation-1 hover:bg-gold-base transition-colors" aria-label="Previous alumnus">
            <Icon name="chevron-left" />
          </button>
          <div>
            <p className="font-display text-h3 mb-space-2">{currentAlumnus.name}</p>
            <p className="font-body text-body-sm text-text-muted">
              {currentAlumnus.position} · Class of {currentAlumnus.graduationYear}
            </p>
          </div>
          <button onClick={next} className="bg-surface-elevated rounded-full p-space-2 shadow-elevation-1 hover:bg-gold-base transition-colors" aria-label="Next alumnus">
            <Icon name="chevron-right" />
          </button>
        </HStack>
      </VStack>

      {/* Dots indicator */}
      <div className="flex justify-center gap-space-2 mt-space-8">
        {filteredAlumni.map((_, idx) => (
          <button key={idx} onClick={() => setActiveIndex(idx)} className={cn('w-size-2 h-size-2 rounded-full transition-all', idx === activeIndex ? 'w-size-4 bg-gold-base' : 'bg-border-default')} aria-label={`Go to slide ${idx + 1}`} />
        ))}
      </div>
    </Container>
  );
}
