import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '../atoms/Badge';
export type AchievementCardVariant = 'ticker-item' | 'archive-post';

export interface AchievementCardProps {
  variant?: AchievementCardVariant;
  title: string;
  year: string;
  category?: string;
  context?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  className?: string;
}

export function AchievementCard({
  variant = 'archive-post',
  title,
  year,
  category,
  context,
  imageSrc,
  imageAlt,
  href,
  className,
}: AchievementCardProps) {
  if (variant === 'ticker-item') {
    return (
      <div
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 20px',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-light)',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--text-primary)',
          }}
        >
          {title}
        </span>
        {category && <Badge variant="category" label={category} />}
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--color-gold-base)',
          }}
        >
          {year}
        </span>
      </div>
    );
  }

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
        {imageSrc && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              overflow: 'hidden',
              background: 'var(--color-green-base)',
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              fill
              style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
              className="group-hover:scale-[1.04]"
            />
          </div>
        )}
        <div style={{ padding: '24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.68rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--color-gold-base)',
              }}
            >
              {year}
            </span>
            {category && <Badge variant="category" label={category} />}
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: context ? '10px' : 0,
              transition: 'color 0.2s ease',
            }}
            className="group-hover:text-[var(--color-gold-active)]"
          >
            {title}
          </h3>
          {context && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
              }}
            >
              {context}
            </p>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
