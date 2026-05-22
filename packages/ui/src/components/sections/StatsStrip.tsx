import { useCountUp } from '../../hooks/useCountUp';
export interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

export interface StatsStripProps {
  stats?: StatItem[];
}

const DEFAULT_STATS: StatItem[] = [
  { target: 5000, suffix: '+', label: 'Students' },
  { target: 200, suffix: '+', label: 'Staff' },
  { target: 153, suffix: '', label: 'Years' },
  { target: 200, suffix: '+', label: 'University Entrances Annually' },
];

export function StatCell({ stat }: { stat: StatItem }) {
  const { count, ref } = useCountUp(stat.target);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement | null>}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        borderRight: '1px solid rgba(255,255,255,0.1)',
        textAlign: 'center',
      }}
    >
      <span
        style={
          {
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 500,
            color: 'var(--color-gold-base)',
            lineHeight: 1,
            tabularNums: true,
          } as React.CSSProperties
        }
      >
        {count.toLocaleString()}
        {stat.suffix}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.22em',
          color: 'rgba(255,255,255,0.5)',
          marginTop: '8px',
        }}
      >
        {stat.label}
      </span>
    </div>
  );
}

export function StatsStrip({ stats = DEFAULT_STATS }: StatsStripProps) {
  return (
    <section
      style={{
        background: 'var(--color-green-base)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        className="content-width"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {stats.map((stat, i) => (
          <StatCell key={i} stat={stat} />
        ))}
      </div>
    </section>
  );
}
