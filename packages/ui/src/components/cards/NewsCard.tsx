import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '../atoms/Badge';

// ─── Types ────────────────────────────────────────────────────────────────────

export type NewsCardVariant = 'featured' | 'standard' | 'compact';

export interface NewsCardProps {
  variant?: NewsCardVariant;
  title: string;
  excerpt?: string;
  category: string;
  date: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  readTime?: string;
  className?: string;
}

// ─── Featured variant ─────────────────────────────────────────────────────────

function NewsCardFeatured({
  title,
  excerpt,
  category,
  date,
  href,
  imageSrc,
  imageAlt,
}: NewsCardProps) {
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none', display: 'block' }}
      className="group"
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-light)',
          boxShadow: '0 2px 12px rgba(28,26,22,0.06)',
          transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            '0 8px 32px rgba(28,26,22,0.12)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            '0 2px 12px rgba(28,26,22,0.06)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        }}
      >
        {/* Image */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/7',
            overflow: 'hidden',
            background: 'var(--color-green-base)',
          }}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              fill
              style={{
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
              className="group-hover:scale-[1.03]"
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(135deg, var(--color-green-base) 0%, #0d2e1a 100%)',
              }}
            />
          )}
          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(28,26,22,0) 30%, rgba(28,26,22,0.72) 100%)',
            }}
          />

          {/* Category badge on image */}
          <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
            <Badge variant="category" label={category} />
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '28px 32px 32px' }}>
          <div
            className="flex items-center gap-4 mb-4"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--text-muted)',
            }}
          >
            <span>{date}</span>
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: '12px',
              transition: 'color 0.2s ease',
            }}
            className="group-hover:text-[var(--color-gold-active)]"
          >
            {title}
          </h3>
          {excerpt && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.75,
                marginBottom: '20px',
              }}
            >
              {excerpt}
            </p>
          )}
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--color-gold-base)',
            }}
          >
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Standard variant ─────────────────────────────────────────────────────────

function NewsCardStandard({
  title,
  excerpt,
  category,
  date,
  href,
  imageSrc,
  imageAlt,
}: NewsCardProps) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      className="group"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-light)',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(28,26,22,0.04)',
          transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            '0 6px 24px rgba(28,26,22,0.10)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            '0 2px 8px rgba(28,26,22,0.04)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        }}
      >
        {/* Cover image */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            overflow: 'hidden',
            background: 'var(--color-green-base)',
            flexShrink: 0,
          }}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              fill
              style={{ objectFit: 'cover', transition: 'transform 0.45s ease' }}
              className="group-hover:scale-[1.04]"
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(135deg, var(--color-green-base) 0%, #0d2e1a 100%)',
              }}
            />
          )}

          {/* Category badge */}
          <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
            <Badge variant="category" label={category} />
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            padding: '20px 22px 24px',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--text-muted)',
              marginBottom: '10px',
            }}
          >
            {date}
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.25,
              marginBottom: '10px',
              transition: 'color 0.2s ease',
              flex: 'none',
            }}
          >
            {title}
          </h3>
          {excerpt && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                flex: 1,
                marginBottom: '16px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {excerpt}
            </p>
          )}
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--color-gold-base)',
              marginTop: 'auto',
            }}
          >
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Compact variant ──────────────────────────────────────────────────────────

function NewsCardCompact({
  title,
  category,
  date,
  href,
  imageSrc,
  imageAlt,
}: NewsCardProps) {
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none', display: 'block' }}
      className="group"
    >
      <div
        className="flex gap-4"
        style={{
          padding: '14px 0',
          borderBottom: '1px solid var(--border-light)',
          transition: 'opacity 0.2s ease',
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.opacity = '0.8')
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.opacity = '1')
        }
      >
        {/* Thumbnail */}
        <div
          style={{
            position: 'relative',
            width: '72px',
            height: '56px',
            flexShrink: 0,
            overflow: 'hidden',
            background: 'var(--color-green-base)',
          }}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              fill
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(135deg, var(--color-green-base), #0d2e1a)',
              }}
            />
          )}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            className="flex items-center gap-3 mb-2"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.62rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--text-muted)',
            }}
          >
            <span style={{ color: 'var(--color-gold-base)' }}>{category}</span>
            <span>·</span>
            <span>{date}</span>
          </div>
          <h4
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.35,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              transition: 'color 0.2s ease',
            }}
          >
            {title}
          </h4>
        </div>
      </div>
    </Link>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function NewsCard({ variant = 'standard', ...props }: NewsCardProps) {
  if (variant === 'featured')
    return <NewsCardFeatured {...props} variant={variant} />;
  if (variant === 'compact')
    return <NewsCardCompact {...props} variant={variant} />;
  return <NewsCardStandard {...props} variant={variant} />;
}
