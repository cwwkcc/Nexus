'use client';

import { useCountUp } from '../../hooks/useCountUp';

export type StatCardVariant = 'single' | 'with-trend';
export type TrendDirection = 'up' | 'down' | 'neutral';

export interface StatCardProps {
  variant?: StatCardVariant;
  value: number;
  suffix?: string;
  label: string;
  trend?: TrendDirection;
  trendValue?: string;
  trendLabel?: string;
  className?: string;
}

function TrendIndicator({
  direction,
  value,
  label,
}: {
  direction: TrendDirection;
  value?: string;
  label?: string;
}) {
  const config: Record<TrendDirection, { symbol: string; color: string }> = {
    up: { symbol: '↑', color: 'var(--semantic-success-base)' },
    down: { symbol: '↓', color: 'var(--semantic-error-base)' },
    neutral: { symbol: '—', color: 'var(--text-muted)' },
  };
  const { symbol, color } = config[direction];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '3px 8px',
        background: 'var(--surface-deep)',
        border: '1px solid var(--border-light)',
        borderRadius: '999px',
      }}
    >
      <span style={{ fontSize: '0.7rem', color, lineHeight: 1 }}>{symbol}</span>
      {value && (
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            color,
            fontWeight: 600,
          }}
        >
          {value}
        </span>
      )}
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

export function StatCard({
  variant = 'single',
  value,
  suffix = '',
  label,
  trend,
  trendValue,
  trendLabel,
  className,
}: StatCardProps) {
  const { ref, count } = useCountUp(value);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        padding: '28px 24px',
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border-light)',
        boxShadow: '0 2px 8px rgba(28,26,22,0.04)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'var(--text-muted)',
          marginBottom: '12px',
        }}
      >
        {label}
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '4px',
          marginBottom: variant === 'with-trend' && trend ? '12px' : 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 500,
            color: 'var(--color-gold-base)',
            lineHeight: 1,
          }}
        >
          {count.toLocaleString()}
        </span>
        {suffix && (
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              fontWeight: 500,
              color: 'var(--color-gold-base)',
              opacity: 0.7,
              lineHeight: 1,
            }}
          >
            {suffix}
          </span>
        )}
      </div>

      {variant === 'with-trend' && trend && (
        <TrendIndicator
          direction={trend}
          value={trendValue}
          label={trendLabel}
        />
      )}
    </div>
  );
}
