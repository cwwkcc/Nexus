'use client';
import type { StatData, TrendDirectionType, StatCardVariantType } from '@nexus/contracts';

import { useCountUp } from '../../hooks/useCountUp';
import { cn } from '../../utilities/cn';

export interface StatCardProps extends Omit<StatData, 'variant'> {
  variant?: StatCardVariantType;
  className?: string;
}

function TrendIndicator({ direction, value, label }: { direction: TrendDirectionType; value?: string; label?: string }) {
  const config = {
    up: { symbol: '↑', color: 'text-semantic-success-base' },
    down: { symbol: '↓', color: 'text-semantic-error-base' },
    neutral: { symbol: '—', color: 'text-text-muted' },
  };
  const { symbol, color } = config[direction];

  return (
    <div className="inline-flex items-center gap-space-1 px-space-2 py-space-0.5 bg-surface-deep border border-border-light rounded-full">
      <span className={cn('text-sm leading-none', color)}>{symbol}</span>
      {value && <span className={cn('font-body text-caption font-semibold', color)}>{value}</span>}
      {label && <span className="font-body text-caption uppercase tracking-caption text-text-muted">{label}</span>}
    </div>
  );
}

export function StatCard({ variant = 'single', target, suffix = '', label, trend, className }: StatCardProps) {
  const { ref } = useCountUp(target);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={cn('p-space-7 bg-surface-elevated border border-border-light', 'shadow-elevation-1', className)}>
      <p className="font-body text-caption uppercase tracking-caption text-text-muted mb-space-3">{label}</p>
      <div className={cn('flex items-baseline gap-space-1', variant === 'with-trend' && trend && 'mb-space-3')}>
        <span className="font-display text-[clamp(2rem,4vw,2.8rem)] font-medium text-gold-base leading-none"></span>
        {suffix && <span className="font-display text-[clamp(1rem,2vw,1.4rem)] font-medium text-gold-base/70 leading-none">{suffix}</span>}
      </div>
      {variant === 'with-trend' && trend && <TrendIndicator direction={trend.direction} value={trend.value} label={trend.label} />}
    </div>
  );
}
