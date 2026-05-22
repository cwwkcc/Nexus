import Image from 'next/image';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

export type StaffCardVariant = 'principal' | 'grid' | 'compact';

export interface StaffCardProps {
  variant?: StaffCardVariant;
  name: string;
  title: string;
  /** e.g. "Principal since 2019" */
  tenure?: string;
  /** Pull quote — required for principal variant */
  quote?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Optional portfolio/subject area */
  portfolio?: string;
  href?: string;
}

// ─── Principal (large) ────────────────────────────────────────────────────────

function StaffCardPrincipal({
  name,
  title,
  tenure,
  quote,
  imageSrc,
  imageAlt,
  href,
}: StaffCardProps) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-12 gap-0"
      style={{
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border-light)',
        overflow: 'hidden',
      }}
    >
      {/* Portrait */}
      <div
        className="md:col-span-4"
        style={{
          position: 'relative',
          minHeight: '420px',
          background: 'var(--color-green-base)',
        }}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? name}
            fill
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(160deg, var(--color-green-base) 0%, #0d2e1a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '7rem',
                fontStyle: 'italic',
                color: 'rgba(201,151,58,0.25)',
                fontWeight: 300,
                userSelect: 'none',
              }}
            >
              {name.charAt(0)}
            </span>
          </div>
        )}
        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background:
              'linear-gradient(to top, rgba(28,26,22,0.55), transparent)',
          }}
        />
      </div>

      {/* Content */}
      <div
        className="md:col-span-8"
        style={{
          padding: '44px 52px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: 'var(--color-gold-base)',
              marginBottom: '10px',
            }}
          >
            {title}
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: '6px',
            }}
          >
            {name}
          </h2>
          {tenure && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
              }}
            >
              {tenure}
            </p>
          )}
        </div>

        {/* Decorative rule */}
        <div
          style={{
            width: '36px',
            height: '2px',
            background: 'var(--color-gold-base)',
          }}
        />

        {/* Pull quote */}
        {quote && (
          <blockquote
            style={{
              margin: 0,
              paddingLeft: '20px',
              borderLeft: '3px solid var(--color-gold-base)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                fontStyle: 'italic',
                color: 'var(--text-primary)',
                lineHeight: 1.5,
              }}
            >
              &ldquo;{quote}&rdquo;
            </p>
          </blockquote>
        )}

        {href && (
          <Link
            href={href}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--color-gold-base)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '4px',
            }}
          >
            Read Full Message →
          </Link>
        )}
      </div>
    </div>
  );
}

// ─── Grid variant ─────────────────────────────────────────────────────────────

function StaffCardGrid({
  name,
  title,
  tenure,
  portfolio,
  imageSrc,
  imageAlt,
}: StaffCardProps) {
  return (
    <div
      style={{
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border-light)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Photo */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3/4',
          background: 'var(--color-green-base)',
          overflow: 'hidden',
        }}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? name}
            fill
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(160deg, var(--color-green-base) 0%, #0d2e1a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '4rem',
                fontStyle: 'italic',
                color: 'rgba(201,151,58,0.3)',
                fontWeight: 300,
              }}
            >
              {name.charAt(0)}
            </span>
          </div>
        )}
        {/* Gradient */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            background:
              'linear-gradient(to top, rgba(28,26,22,0.4), transparent)',
          }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: '16px 18px 20px' }}>
        <h4
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            marginBottom: '4px',
          }}
        >
          {name}
        </h4>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-gold-base)',
            marginBottom: '4px',
          }}
        >
          {title}
        </p>
        {portfolio && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
            }}
          >
            {portfolio}
          </p>
        )}
        {tenure && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              marginTop: '6px',
              opacity: 0.7,
            }}
          >
            {tenure}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Compact variant ──────────────────────────────────────────────────────────

function StaffCardCompact({ name, title, imageSrc, imageAlt }: StaffCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px 16px',
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border-light)',
      }}
    >
      {/* Photo circle */}
      <div
        style={{
          position: 'relative',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          overflow: 'hidden',
          background: 'var(--color-green-base)',
          flexShrink: 0,
          border: '2px solid var(--border-light)',
        }}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? name}
            fill
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontStyle: 'italic',
                color: 'rgba(201,151,58,0.5)',
              }}
            >
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Text */}
      <div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            marginBottom: '3px',
          }}
        >
          {name}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-gold-base)',
          }}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function StaffCard({ variant = 'grid', ...props }: StaffCardProps) {
  if (variant === 'principal')
    return <StaffCardPrincipal {...props} variant={variant} />;
  if (variant === 'compact')
    return <StaffCardCompact {...props} variant={variant} />;
  return <StaffCardGrid {...props} variant={variant} />;
}
