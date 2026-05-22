import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '../atoms/Badge';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SocietyCardVariant = 'hub-grid' | 'featured';

export interface SocietyCardProps {
  variant?: SocietyCardVariant;
  name: string;
  tagline: string;
  category: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Whether this is KITS — uses gold accent border treatment */
  isFeatured?: boolean;
  memberCount?: number;
  founded?: string;
}

// ─── Hub grid variant ─────────────────────────────────────────────────────────

function SocietyCardHub({
  name,
  tagline,
  category,
  href,
  imageSrc,
  imageAlt,
  memberCount,
  founded,
}: SocietyCardProps) {
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
      className="group"
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
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
        {/* Image */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4/3',
            overflow: 'hidden',
            background: 'var(--color-green-base)',
            flexShrink: 0,
          }}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? name}
              fill
              style={{ objectFit: 'cover', transition: 'transform 0.45s ease' }}
              className="group-hover:scale-[1.05]"
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(135deg, var(--color-green-base) 0%, #0d2e1a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3rem',
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
              height: '60%',
              background:
                'linear-gradient(to top, rgba(28,26,22,0.5), transparent)',
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            padding: '18px 20px 22px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className="mb-3">
            <Badge variant="category" label={category} />
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.15rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: '8px',
              transition: 'color 0.2s ease',
            }}
            className="group-hover:text-[var(--color-gold-active,#B7852F)]"
          >
            {name}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              flex: 1,
            }}
          >
            {tagline}
          </p>

          {/* Meta */}
          {(memberCount !== undefined || founded) && (
            <div
              className="flex items-center gap-4 mt-4 pt-4"
              style={{ borderTop: '1px solid var(--border-light)' }}
            >
              {memberCount !== undefined && (
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--text-muted)',
                  }}
                >
                  {memberCount} members
                </span>
              )}
              {founded && (
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--text-muted)',
                  }}
                >
                  Est. {founded}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Featured (KITS) variant ──────────────────────────────────────────────────

function SocietyCardFeatured({
  name,
  tagline,
  category,
  href,
  imageSrc,
  imageAlt,
  memberCount,
  founded,
}: SocietyCardProps) {
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none', display: 'block' }}
      className="group"
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{
          background: 'var(--surface-elevated)',
          border: '2px solid var(--color-gold-base)',
          overflow: 'hidden',
          boxShadow:
            '0 4px 20px rgba(201,151,58,0.12), 0 2px 8px rgba(28,26,22,0.06)',
          transition: 'box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            '0 8px 40px rgba(201,151,58,0.2), 0 4px 16px rgba(28,26,22,0.10)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            '0 4px 20px rgba(201,151,58,0.12), 0 2px 8px rgba(28,26,22,0.06)';
        }}
      >
        {/* Image */}
        <div
          style={{
            position: 'relative',
            minHeight: '280px',
            overflow: 'hidden',
            background: 'var(--color-green-base)',
          }}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? name}
              fill
              style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
              className="group-hover:scale-[1.04]"
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(135deg, var(--color-green-base) 0%, #0d2e1a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '6rem',
                  fontStyle: 'italic',
                  color: 'rgba(201,151,58,0.3)',
                  fontWeight: 300,
                }}
              >
                {name.charAt(0)}
              </span>
            </div>
          )}
          {/* Gold corner accent */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'var(--color-gold-base)',
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            padding: '36px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Gold eyebrow */}
          <p
            className="mb-3"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: 'var(--color-gold-base)',
            }}
          >
            {category} — Featured
          </p>

          <h3
            className="mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
            }}
          >
            {name}
          </h3>
          <p
            className="mb-6"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.75,
            }}
          >
            {tagline}
          </p>

          {/* Meta row */}
          {(memberCount !== undefined || founded) && (
            <div
              className="flex items-center gap-6 mb-6 pb-6"
              style={{ borderBottom: '1px solid var(--border-light)' }}
            >
              {memberCount !== undefined && (
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 500,
                      color: 'var(--color-gold-base)',
                      lineHeight: 1,
                    }}
                  >
                    {memberCount}+
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.62rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: 'var(--text-muted)',
                    }}
                  >
                    Members
                  </p>
                </div>
              )}
              {founded && (
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 500,
                      color: 'var(--color-gold-base)',
                      lineHeight: 1,
                    }}
                  >
                    {founded}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.62rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: 'var(--text-muted)',
                    }}
                  >
                    Founded
                  </p>
                </div>
              )}
            </div>
          )}

          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--color-gold-base)',
            }}
          >
            Learn more →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function SocietyCard({
  variant = 'hub-grid',
  ...props
}: SocietyCardProps) {
  if (variant === 'featured')
    return <SocietyCardFeatured {...props} variant={variant} />;
  return <SocietyCardHub {...props} variant={variant} />;
}
