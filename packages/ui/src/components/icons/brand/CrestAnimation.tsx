'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '../../../utilities/cn';
import { SchoolLogo } from './SchoolLogo';

type CrestSize = 'sm' | 'md' | '';
export interface CrestAnimationProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  animateOnMount?: boolean;
  onComplete?: () => void;
  className?: string;
}

// ─── Size map ─────────────────────────────────────────────────────────────────

const sizeMap = {
  sm: 'w-size-24 h-size-24',
  md: 'w-size-32 h-size-32',
  lg: 'w-size-48 h-size-48',
};

const logoSizeMap: Record<'sm' | 'md' | 'lg', 'md' | 'lg' | 'xl'> = {
  sm: 'md',
  md: 'lg',
  lg: 'xl',
};

// ─── Animation variants ───────────────────────────────────────────────────────

/**
 * Outer wrapper — fades and lifts in on mount.
 */
const wrapperVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Ring that draws around the crest.
 * Uses pathLength so the SVG circle "draws" itself.
 */
const ringVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, ease: 'easeInOut', delay: 0.2 },
      opacity: { duration: 0.1, delay: 0.2 },
    },
  },
};

/**
 * Gold glow flood — fades in after ring draws.
 */
const floodVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 0.25,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay: 1.3 },
  },
};

/**
 * Continuous pulse glow — starts after flood.
 */
const pulseVariants: Variants = {
  rest: {
    boxShadow: '0 0 0px 0px rgba(201,151,58,0)',
    scale: 1,
  },
  pulse: {
    boxShadow: [
      '0 0 0px 0px rgba(201,151,58,0)',
      '0 0 18px 8px rgba(201,151,58,0.22)',
      '0 0 0px 0px rgba(201,151,58,0)',
    ],
    scale: [1, 1.025, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: 1.9,
    },
  },
};

/**
 * Shine sweep across the crest.
 */
const shineVariants: Variants = {
  hidden: { x: '-180%', opacity: 0 },
  visible: {
    x: ['−180%', '180%'],
    opacity: [0, 0.55, 0],
    transition: {
      duration: 2.4,
      ease: 'easeInOut',
      delay: 1.4,
      times: [0, 0.3, 1],
    },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function CrestAnimation({
  size = 'md',
  animateOnMount = true,
  onComplete,
  className,
}: CrestAnimationProps) {
  const reduced = useReducedMotion();

  // When reduced motion is preferred or animateOnMount is false,
  // skip straight to the resting pulse — no drawing sequence.
  const shouldAnimate = animateOnMount && !reduced;

  return (
    <motion.div
      className={cn('relative', sizeMap[size], className)}
      variants={wrapperVariants}
      initial={shouldAnimate ? 'hidden' : 'visible'}
      animate="visible"
      onAnimationComplete={() => {
        if (shouldAnimate) onComplete?.();
      }}
    >
      {/* ── Base crest logo ─────────────────────────────────────────────── */}
      <SchoolLogo variant="crest-only" className="w-full h-full" />

      {/* ── SVG draw ring ───────────────────────────────────────────────── */}
      {shouldAnimate && (
        <svg
          className="absolute top-space-0 left-space-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="var(--color-gold-base)"
            strokeWidth="1.5"
            strokeLinecap="round"
            // Start at top (rotate -90deg so draw begins at 12 o'clock)
            style={{ rotate: -90, originX: '50%', originY: '50%' }}
            variants={ringVariants}
            initial="hidden"
            animate="visible"
          />
        </svg>
      )}

      {/* ── Gold flood overlay ──────────────────────────────────────────── */}
      <motion.div
        className="absolute top-space-0 right-space-0 bottom-space-0 left-space-0 rounded-full bg-gold-base pointer-events-none"
        variants={floodVariants}
        initial="hidden"
        animate="visible"
      />

      {/* ── Continuous pulse glow ───────────────────────────────────────── */}
      <motion.div
        className="absolute top-space-0 right-space-0 bottom-space-0 left-space-0 rounded-full pointer-events-none"
        variants={pulseVariants}
        initial="rest"
        animate={reduced ? 'rest' : 'pulse'}
      />

      {/* ── Shine sweep ─────────────────────────────────────────────────── */}
      {shouldAnimate && (
        <motion.div
          className="absolute top-space-0 left-space-0 pointer-events-none"
          aria-hidden
          variants={shineVariants}
          initial="hidden"
          animate="visible"
          style={{
            width: '35%',
            height: '100%',
            background:
              'linear-gradient(90deg, transparent, rgba(232,184,75,0.45), transparent)',
            transform: 'skewX(-15deg)',
          }}
        />
      )}
    </motion.div>
  );
}
