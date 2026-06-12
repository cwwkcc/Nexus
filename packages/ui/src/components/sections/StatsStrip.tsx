'use client';

import { ReactNode } from 'react';
import { cn } from '../../utilities/cn';
import { Container } from '../layout/Container';
import { Text } from '../typography/Text';
import { ToolTip } from '../overlays/ToolTip';
import {
  useCountUp,
  type UseCountUpOptions,
  easings,
} from '../../hooks/useCountUp';
import { motion, useReducedMotion } from 'framer-motion';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type StatTrendDirection = 'up' | 'down' | 'neutral';
export type StatVariant = 'default' | 'compact';

export interface StatItem {
  id?: string;
  target: number;
  /** Suffix (e.g. "+", "%") – will be passed to useCountUp */
  suffix?: string;
  /** Prefix (e.g. "$") – will be passed to useCountUp */
  prefix?: string;
  /** Number of decimal places (default 0) */
  decimals?: number;
  /** Thousands separator (default ",") */
  separator?: string;
  /** Custom formatter – overrides prefix/suffix/separator/decimals */
  formatter?: (value: number) => string;
  /** Main label below the number */
  label: string;
  /** Smaller description text (optional) */
  description?: string;
  /** Optional icon displayed above the number */
  icon?: ReactNode;
  /** Trend indicator (optional) */
  trend?: {
    direction: StatTrendDirection;
    value: string;
    label?: string;
  };
  /** Tooltip text on hover/focus */
  tooltip?: string;
  /** Custom aria-label for accessibility */
  ariaLabel?: string;
  /** Override count-up duration (ms) */
  duration?: number;
  /** Override count-up easing function */
  easing?: (t: number) => number;
  /** Delay before counting starts (ms) */
  delay?: number;
}

export interface StatsStripProps {
  stats?: StatItem[];
  variant?: StatVariant;
  /** Animate on scroll (default: true) */
  animateOnScroll?: boolean;
  /** Global duration for all stats (overridden by individual stat.duration) */
  duration?: number;
  /** Global easing (default: easeOutCubic) */
  easing?: (t: number) => number;
  className?: string;
}

// -----------------------------------------------------------------------------
// Default Data (matches existing default)
// -----------------------------------------------------------------------------

const DEFAULT_STATS: StatItem[] = [
  {
    id: 'students',
    target: 5000,
    suffix: '+',
    label: 'Students',
    description: 'Enrolled across all grades',
    tooltip: 'Total student population (Grades 1–13)',
    trend: { direction: 'up', value: '+8%', label: 'vs 2025' },
  },
  {
    id: 'staff',
    target: 200,
    suffix: '+',
    label: 'Staff',
    description: 'Teaching & support',
    tooltip: 'Dedicated educators and administrative personnel',
  },
  {
    id: 'years',
    target: 153,
    suffix: '',
    label: 'Years',
    description: 'of excellence',
    tooltip: 'Since 1873 – Sri Lanka’s first Central College',
  },
  {
    id: 'university',
    target: 200,
    suffix: '+',
    label: 'University Entrances',
    description: 'Annually (2025)',
    tooltip: 'Highest in Kalutara District',
    trend: { direction: 'up', value: '+12%', label: 'vs 2024' },
  },
];

// -----------------------------------------------------------------------------
// Helper: Trend Indicator
// -----------------------------------------------------------------------------

const TrendIndicator = ({
  direction,
  value,
  label,
}: {
  direction: StatTrendDirection;
  value: string;
  label?: string;
}) => {
  const config = {
    up: { icon: '↑', color: 'text-semantic-success-base' },
    down: { icon: '↓', color: 'text-semantic-error-base' },
    neutral: { icon: '—', color: 'text-text-muted' },
  };
  const { icon, color } = config[direction];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-space-1 px-space-2 py-space-0p5 rounded-full',
        'bg-surface-deep border border-border-light text-caption',
      )}
    >
      <span className={color} aria-hidden="true">
        {icon}
      </span>
      <span className={cn('font-semibold', color)}>{value}</span>
      {label && <span className="text-text-muted font-normal">{label}</span>}
    </span>
  );
};

// -----------------------------------------------------------------------------
// Individual Stat Card (uses advanced useCountUp)
// -----------------------------------------------------------------------------

const StatCard = ({
  stat,
  variant,
  globalDuration,
  globalEasing,
}: {
  stat: StatItem;
  variant: StatVariant;
  globalDuration?: number;
  globalEasing?: (t: number) => number;
}) => {
  const prefersReduced = useReducedMotion();

  // Prepare count-up options
  const countUpOptions: UseCountUpOptions = {
    duration: stat.duration ?? globalDuration ?? 1800,
    easing: stat.easing ?? globalEasing ?? easings.easeOutCubic,
    threshold: 0.3,
    startOnVisible: true,
    delay: stat.delay ?? 0,
    prefix: stat.prefix ?? '',
    suffix: stat.suffix ?? '',
    decimals: stat.decimals ?? 0,
    separator: stat.separator ?? ',',
    formatter: stat.formatter,
  };

  const { formattedCount, ref: countUpRef } = useCountUp(
    stat.target,
    countUpOptions,
  );
  const isCompact = variant === 'compact';

  const content = (
    <motion.div
      ref={countUpRef as React.RefObject<HTMLDivElement>}
      className={cn(
        'relative group flex flex-col items-center text-center',
        'bg-surface-elevated border border-border-light rounded-lg',
        'transition-all duration-gentle ease-out',
        'hover:shadow-elevation-3 hover:-translate-y-1',
        isCompact ? 'p-space-5' : 'p-space-7',
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Optional Icon */}
      {stat.icon && (
        <div className="mb-space-3 text-gold-base group-hover:scale-110 transition-transform duration-fast">
          {stat.icon}
        </div>
      )}

      {/* Number with suffix (using formattedCount) */}
      <div className="flex items-baseline gap-space-1 flex-wrap justify-center">
        <span
          className={cn(
            'font-display font-medium text-gold-base leading-none',
            isCompact ? 'text-h3' : 'text-[clamp(2rem,4vw,2.8rem)]',
          )}
        >
          {formattedCount}
        </span>
      </div>

      {/* Label */}
      <Text
        variant="label"
        className={cn('mt-space-3', isCompact && 'text-label-sm')}
      >
        {stat.label}
      </Text>

      {/* Optional description */}
      {stat.description && (
        <Text
          variant="caption"
          color="muted"
          className={cn('mt-space-1', isCompact && 'hidden md:block')}
        >
          {stat.description}
        </Text>
      )}

      {/* Optional trend indicator */}
      {stat.trend && (
        <div className="mt-space-3">
          <TrendIndicator {...stat.trend} />
        </div>
      )}
    </motion.div>
  );

  // Wrap with tooltip if needed
  if (stat.tooltip) {
    return (
      <ToolTip content={stat.tooltip} position="top">
        {content}
      </ToolTip>
    );
  }

  return content;
};

// -----------------------------------------------------------------------------
// Main StatsStrip Component
// -----------------------------------------------------------------------------

export function StatsStrip({
  stats = DEFAULT_STATS,
  variant = 'default',
  animateOnScroll = true, // kept for consistency but hook handles it
  duration,
  easing,
  className,
}: StatsStripProps) {
  return (
    <Container as="section" className={cn('w-full', className)}>
      <div
        className={cn(
          'grid gap-space-6',
          'grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:justify-between',
        )}
      >
        {stats.map((stat, index) => {
          const isLast = index === stats.length - 1;
          return (
            <div key={stat.id ?? index} className="flex-1 min-w-0">
              <StatCard
                stat={stat}
                variant={variant}
                globalDuration={duration}
                globalEasing={easing}
              />
              {/* Vertical divider only appears between cards on large screens */}
              {!isLast && (
                <div className="hidden lg:block mx-space-4 self-stretch">
                  <div
                    className="h-full w-px bg-border-light"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
}
