import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '../atoms/Badge';
export type ExtracurricularVariant = 'sport' | 'performing-arts' | 'leadership';

export interface ExtracurricularCardProps {
  variant?: ExtracurricularVariant;
  name: string;
  description: string;
  recentAchievements?: string[];
  teacherInCharge?: string;
  studentQuote?: string;
  season?: string;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

const EXTRACURRICULAR_ACCENT: Record<ExtracurricularVariant, string> = {
  sport: 'var(--color-green-base)',
  'performing-arts': 'var(--color-gold-base)',
  leadership: 'var(--color-green-base)',
};

export function ExtracurricularCard({
  variant = 'sport',
  name,
  description,
  recentAchievements,
  teacherInCharge,
  studentQuote,
  season,
  href,
  imageSrc,
  imageAlt,
  className,
}: ExtracurricularCardProps) {
  const accent = EXTRACURRICULAR_ACCENT[variant];
  const Wrapper = href ? Link : 'div';
  const wrapperProps = href
    ? {
        href,
        style: { textDecoration: 'none', display: 'block' },
        className: 'group',
      }
    : { className: 'group' };

  return (
    // @ts-expect-error polymorphic wrapper
    <Wrapper {...wrapperProps}>
      <div
        className={className}
        style={{
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-light)',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(28,26,22,0.04)',
          transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            '0 8px 32px rgba(28,26,22,0.10)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            '0 2px 8px rgba(28,26,22,0.04)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        }}
      >
        {/* Image */}
        {imageSrc && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: variant === 'performing-arts' ? '4/3' : '16/9',
              overflow: 'hidden',
              background: 'var(--color-green-base)',
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt ?? name}
              fill
              style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
              className="group-hover:scale-[1.04]"
            />
            {season && (
              <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                <Badge variant="category" label={season} />
              </div>
            )}
          </div>
        )}

        {/* Top accent strip */}
        <div style={{ height: '3px', background: accent }} />

        <div
          style={{
            padding: variant === 'performing-arts' ? '28px 24px' : '22px 20px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '8px',
              transition: 'color 0.2s ease',
            }}
            className="group-hover:text-[var(--color-gold-active)]"
          >
            {name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              marginBottom: recentAchievements?.length ? '16px' : 0,
            }}
          >
            {description}
          </p>

          {/* Achievements */}
          {recentAchievements && recentAchievements.length > 0 && (
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              {recentAchievements.map((ach) => (
                <li
                  key={ach}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'baseline',
                  }}
                >
                  <span
                    style={{
                      color: accent,
                      fontSize: '0.55rem',
                      flexShrink: 0,
                    }}
                  >
                    ●
                  </span>
                  {ach}
                </li>
              ))}
            </ul>
          )}

          {/* Student quote (performing arts) */}
          {variant === 'performing-arts' && studentQuote && (
            <blockquote
              style={{
                margin: '0 0 16px',
                paddingLeft: '14px',
                borderLeft: '2px solid var(--color-gold-base)',
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '0.95rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}
            >
              "{studentQuote}"
            </blockquote>
          )}

          {teacherInCharge && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.68rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
              }}
            >
              Teacher in charge — {teacherInCharge}
            </p>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
