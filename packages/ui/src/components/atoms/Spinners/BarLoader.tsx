'use client';

import { motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';

type BarLoaderSize = 'sm' | 'md' | 'lg';
type BarLoaderVariant = 'green' | 'gold' | 'muted';
type BarLoaderSpeed = 'fast' | 'normal' | 'slow';

type BarLoaderProps = {
  size?: BarLoaderSize;
  variant?: BarLoaderVariant;
  speed?: BarLoaderSpeed;
  label?: string;
  className?: string;
};

const sizeConfig: Record<BarLoaderSize, { height: string; width: string }> = {
  sm: { height: 'h-0.5', width: 'w-16' },
  md: { height: 'h-1', width: 'w-24' },
  lg: { height: 'h-1.5', width: 'w-36' },
};

// Variant drives both the track tint and the shimmer color via CSS vars
const variantConfig: Record<
  BarLoaderVariant,
  { text: string; shimmer: string }
> = {
  green: {
    text: 'text-green-base',
    shimmer: 'from-transparent via-green-base to-transparent',
  },
  gold: {
    text: 'text-gold-base',
    shimmer: 'from-transparent via-gold-base to-transparent',
  },
  muted: {
    text: 'text-text-muted',
    shimmer: 'from-transparent via-text-muted to-transparent',
  },
};

const speedConfig: Record<BarLoaderSpeed, number> = {
  fast: 0.9,
  normal: 1.4,
  slow: 2.0,
};

export function BarLoader({
  size = 'md',
  variant = 'green',
  speed = 'normal',
  label = 'Loading',
  className,
}: BarLoaderProps) {
  const reduced = useReducedMotion();
  const { height, width } = sizeConfig[size];
  const { text, shimmer } = variantConfig[variant];
  const duration = speedConfig[speed];

  return (
    <span
      role="status"
      aria-label={label}
      className={clsx(
        'relative inline-block overflow-hidden rounded-full bg-current/10',
        height,
        width,
        text,
        className,
      )}
    >
      {/* Base fill — always visible, subtle */}
      <span className={clsx('absolute inset-0 rounded-full bg-current/20')} />

      {/* Shimmer sweep */}
      <motion.span
        className={clsx('absolute inset-y-0 w-1/2 bg-gradient-to-r', shimmer)}
        animate={
          reduced ? { opacity: [0.4, 1, 0.4] } : { x: ['-100%', '300%'] }
        }
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </span>
  );
}

BarLoader.displayName = 'BarLoader';
