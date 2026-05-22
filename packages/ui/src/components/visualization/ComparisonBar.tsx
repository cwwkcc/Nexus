// packages/ui/src/components/visualization/ComparisonBar.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';

export interface ComparisonBarProps {
  label: string;
  value: number; // 0-100
  targetValue?: number; // optional target line
  showPercentage?: boolean;
  animate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const heightMap = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

export function ComparisonBar({
  label,
  value,
  targetValue,
  showPercentage = true,
  animate = true,
  size = 'md',
  className,
}: ComparisonBarProps) {
  const [width, setWidth] = useState(
    animate ? 0 : Math.min(100, Math.max(0, value)),
  );
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!animate || animated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animated.current = true;
          // Animate to target value
          const targetWidth = Math.min(100, Math.max(0, value));
          const duration = 1000;
          const startTime = performance.now();

          const animateWidth = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setWidth(targetWidth * eased);
            if (progress < 1) requestAnimationFrame(animateWidth);
          };

          requestAnimationFrame(animateWidth);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animate, value]);

  // If not animating on scroll, just set the value
  useEffect(() => {
    if (!animate) setWidth(Math.min(100, Math.max(0, value)));
  }, [animate, value]);

  const displayValue = animate ? Math.round(width) : value;
  const targetPosition =
    targetValue !== undefined
      ? Math.min(100, Math.max(0, targetValue))
      : undefined;

  return (
    <div ref={ref} className={clsx('w-full', className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-body text-label text-text-primary uppercase tracking-wide">
          {label}
        </span>
        {showPercentage && (
          <span className="font-body text-label text-gold-base uppercase tracking-wide">
            {displayValue}%
          </span>
        )}
      </div>
      <div
        className={clsx(
          'relative w-full bg-surface-deep rounded-full overflow-hidden',
          heightMap[size],
        )}
      >
        <div
          className="absolute left-0 top-0 h-full bg-green-base rounded-full transition-all duration-75 ease-out"
          style={{ width: `${displayValue}%` }}
        />
        {targetPosition !== undefined && (
          <div
            className="absolute top-0 w-0.5 h-full bg-gold-base z-10"
            style={{ left: `${targetPosition}%` }}
          />
        )}
      </div>
    </div>
  );
}
