'use client';

import { motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';

type SpinnerSize = 'sm' | 'md' | 'lg';

type SpinnerProps = {
  size?: SpinnerSize;
  label?: string;
  className?: string;
};

// Full static strings — Tailwind can scan these at build time
const spinnerConfig: Record<
  SpinnerSize,
  { dot: string; gap: string; speed: number }
> = {
  sm: { dot: 'w-1.5 h-1.5', gap: 'gap-1', speed: 0.5 },
  md: { dot: 'w-2 h-2', gap: 'gap-1.5', speed: 0.7 },
  lg: { dot: 'w-3 h-3', gap: 'gap-2', speed: 0.9 },
};

const buildVariants = (speed: number, reduced: boolean) => ({
  animate: (i: number) => ({
    scale: reduced ? 1 : [1, 0.6, 1],
    opacity: reduced ? [1, 0.4, 1] : [1, 0.2, 1],
    transition: {
      duration: speed,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      delay: reduced ? 0 : i * 0.15,
    },
  }),
});

export function Spinner({
  size = 'md',
  label = 'Loading',
  className,
}: SpinnerProps) {
  const prefersReducedMotion = useReducedMotion();
  const { dot, gap, speed } = spinnerConfig[size];

  return (
    <span
      role="status"
      aria-label={label}
      className={clsx(
        'inline-flex items-center text-green-base',
        gap,
        className,
      )}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          custom={i}
          variants={buildVariants(speed, prefersReducedMotion ?? false)}
          animate="animate"
          className={clsx('rounded-full bg-current shrink-0', dot)}
        />
      ))}
    </span>
  );
}

Spinner.displayName = 'Spinner';
