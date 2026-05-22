import { useRef, useState } from 'react';
export interface Achievement {
  id: string;
  text: string;
  year?: string;
  category?: string;
}

export interface AchievementTickerProps {
  achievements: Achievement[];
  /** Link to full archive */
  archiveHref?: string;
}

export function AchievementTicker({
  achievements,
  archiveHref,
}: AchievementTickerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Duplicate list for seamless loop
  const doubled = [...achievements, ...achievements];

  // Duration formula: contentWidth / 50px/s — approximated via item count
  const duration = achievements.length * 6; // ~6s per item gives ~50px/s feel

  return (
    <section
      style={{
        background: 'var(--surface-base)',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
        overflow: 'hidden',
        padding: '18px 0',
        position: 'relative',
      }}
    >
      <style>{`
        @keyframes kcc-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kcc-ticker-track { animation: none !important; }
        }
      `}</style>

      {/* Edge fades */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '80px',
          background:
            'linear-gradient(to right, var(--surface-base), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '80px',
          background:
            'linear-gradient(to left, var(--surface-base), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div
        ref={trackRef}
        className="kcc-ticker-track"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          animation: `kcc-ticker ${duration}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          width: 'max-content',
          transition: 'opacity 0.2s ease',
          opacity: paused ? 0.75 : 1,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item.id}-${i}`}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {/* Separator */}
            <span
              aria-hidden="true"
              style={{
                width: '1px',
                height: '16px',
                background: 'var(--color-gold-base)',
                opacity: 0.4,
                margin: '0 28px',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              {item.text}
              {item.year && (
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.62rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--color-gold-base)',
                    marginLeft: '8px',
                    opacity: 0.8,
                  }}
                >
                  {item.year}
                </span>
              )}
            </span>
          </span>
        ))}
      </div>

      {/* Archive link */}
      {archiveHref && (
        <a
          href={archiveHref}
          style={{
            position: 'absolute',
            right: '90px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 3,
            fontFamily: 'var(--font-body)',
            fontSize: '0.62rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--color-gold-base)',
            textDecoration: 'none',
            background: 'var(--surface-base)',
            padding: '4px 8px',
          }}
        >
          All →
        </a>
      )}
    </section>
  );
}
