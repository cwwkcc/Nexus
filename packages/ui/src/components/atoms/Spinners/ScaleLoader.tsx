'use client';

import { motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';

type ScaleLoaderSize = 'sm' | 'md' | 'lg';
type ScaleLoaderVariant = 'green' | 'gold' | 'muted';
type ScaleLoaderSpeed = 'fast' | 'normal' | 'slow';

type ScaleLoaderProps = {
  size?: ScaleLoaderSize;
  variant?: ScaleLoaderVariant;
  speed?: ScaleLoaderSpeed;
  label?: string;
  className?: string;
};

const sizeConfig: Record<ScaleLoaderSize, { bar: string; gap: string }> = {
  sm: { bar: 'w-0.5 h-3', gap: 'gap-0.5' },
  md: { bar: 'w-1 h-5', gap: 'gap-1' },
  lg: { bar: 'w-1.5 h-7', gap: 'gap-1.5' },
};

const variantConfig: Record<ScaleLoaderVariant, string> = {
  green: 'text-green-base',
  gold: 'text-gold-base',
  muted: 'text-text-muted',
};

const speedConfig: Record<ScaleLoaderSpeed, number> = {
  fast: 0.6,
  normal: 0.9,
  slow: 1.3,
};

// Sine-wave-like stagger — each bar peaks at a different point in the cycle
const DELAYS = [0, 0.15, 0.3, 0.15, 0];

export function ScaleLoader({
  size = 'md',
  variant = 'green',
  speed = 'normal',
  label = 'Loading',
  className,
}: ScaleLoaderProps) {
  const reduced = useReducedMotion();
  const { bar, gap } = sizeConfig[size];
  const duration = speedConfig[speed];

  return (
    <span
      role="status"
      aria-label={label}
      className={clsx(
        'inline-flex items-center',
        gap,
        variantConfig[variant],
        className,
      )}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className={clsx('rounded-sm bg-current shrink-0', bar)}
          animate={
            reduced
              ? { opacity: [1, 0.3, 1] }
              : {
                  scaleY: [0.35, 1, 0.35],
                  opacity: [0.4, 1, 0.4],
                }
          }
          style={{ originY: 0.5 }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: DELAYS[i] * duration,
          }}
        />
      ))}
    </span>
  );
}

ScaleLoader.displayName = 'ScaleLoader';
