'use client';

import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useInView } from '../../hooks/useInView';

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  era?: 'early' | 'mid' | 'modern';
}

export interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const eraStyles = {
  early: 'sepia-[0.6] contrast-[1.1]',
  mid: 'sepia-[0.2] contrast-[1.05]',
  modern: 'sepia-0 contrast-100',
};

export function Timeline({ events, className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.children[0]?.clientWidth || 0;
      const newIndex = Math.round(scrollLeft / itemWidth);
      if (
        newIndex !== activeIndex &&
        newIndex >= 0 &&
        newIndex < events.length
      ) {
        setActiveIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex, events.length]);

  const { ref: inViewRef, isInView } = useInView<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div ref={inViewRef} className={clsx('relative', className)}>
      {/* Era indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-border-light z-10">
        <div
          className="h-full bg-gold-base transition-all duration-300"
          style={{ width: `${((activeIndex + 1) / events.length) * 100}%` }}
        />
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-12"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {events.map((event, idx) => (
          <div
            key={event.id}
            className="snap-start shrink-0 w-full md:w-[85%] lg:w-[70%] px-6 transition-opacity duration-500"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.5s ease-out ${idx * 0.1}s, transform 0.5s ease-out ${idx * 0.1}s`,
            }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Image side */}
              <div
                className={clsx(
                  'rounded-lg overflow-hidden transition-all duration-700',
                  eraStyles[event.era || 'modern'],
                )}
              >
                {event.imageSrc ? (
                  <img
                    src={event.imageSrc}
                    alt={event.imageAlt || event.title}
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                ) : (
                  <div className="aspect-[4/3] bg-surface-deep flex items-center justify-center">
                    <span className="font-display text-6xl text-gold-base/30">
                      {event.year}
                    </span>
                  </div>
                )}
              </div>

              {/* Text side */}
              <div>
                <span className="font-body text-eyebrow uppercase tracking-wider text-gold-base">
                  {event.year}
                </span>
                <h3 className="font-display text-h3 mt-2 text-text-primary">
                  {event.title}
                </h3>
                <p className="font-body text-body text-text-muted mt-4 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="text-center mt-4">
        <span className="font-body text-caption text-text-muted uppercase tracking-wider">
          ← Drag to explore →
        </span>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
