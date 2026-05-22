'use client';

import { useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type HeroVariant = 'homepage' | 'subpage' | 'minimal';

export interface HeroProps {
  variant?: HeroVariant;
  /** Primary heading */
  heading: string;
  /** Optional subheading or subtitle */
  subheading?: string;
  /** Eyebrow label above the heading */
  eyebrow?: string;
  /** Background image src */
  imageSrc?: string;
  imageAlt?: string;
  /** Breadcrumb items for subpage/minimal variants */
  breadcrumb?: { label: string; href?: string }[];
  /** Show animated scroll indicator (homepage only) */
  showScrollIndicator?: boolean;
  /** Optional children (e.g. a CTA button) */
  children?: React.ReactNode;
  className?: string;
}

// ─── Scroll Indicator (homepage bottom chevron) ───────────────────────────────

function ScrollIndicator() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        cursor: 'default',
      }}
    >
      <style>{`
        @keyframes kcc-scroll-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.6; }
          50%       { transform: translateX(-50%) translateY(8px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .kcc-scroll-indicator { animation: none !important; opacity: 0.5 !important; }
        }
      `}</style>
      <div
        style={{
          width: '1px',
          height: '32px',
          background: 'rgba(201,151,58,0.45)',
        }}
      />
      <svg
        className="kcc-scroll-indicator"
        width="14"
        height="8"
        viewBox="0 0 14 8"
        fill="none"
        style={{
          position: 'absolute',
          bottom: '-40px',
          left: '50%',
          animation: 'kcc-scroll-bounce 2s ease-in-out infinite',
          opacity: 0.6,
        }}
      >
        <path
          d="M1 1L7 7L13 1"
          stroke="var(--color-gold-base)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ─── Breadcrumb strip ─────────────────────────────────────────────────────────

function HeroBreadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: '20px' }}>
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          flexWrap: 'wrap',
        }}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li
              key={idx}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.68rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'rgba(245,239,228,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      'var(--color-gold-base)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      'rgba(245,239,228,0.6)')
                  }
                >
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.68rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: isLast
                      ? 'var(--color-gold-base)'
                      : 'rgba(245,239,228,0.6)',
                  }}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span
                  aria-hidden="true"
                  style={{
                    color: 'rgba(245,239,228,0.3)',
                    fontSize: '0.6rem',
                    letterSpacing: 0,
                  }}
                >
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ─── Main Hero component ───────────────────────────────────────────────────────

export function Hero({
  variant = 'homepage',
  heading,
  subheading,
  eyebrow,
  imageSrc,
  imageAlt,
  breadcrumb,
  showScrollIndicator = true,
  children,
  className,
}: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const heightMap: Record<HeroVariant, string> = {
    homepage: '100vh',
    subpage: '65vh',
    minimal: '36vh',
  };

  const minHeightMap: Record<HeroVariant, string> = {
    homepage: '640px',
    subpage: '380px',
    minimal: '220px',
  };

  const overlayMap: Record<HeroVariant, string> = {
    homepage:
      'linear-gradient(to bottom, rgba(28,26,22,0.55) 0%, rgba(26,74,46,0.72) 50%, rgba(28,26,22,0.82) 100%)',
    subpage:
      'linear-gradient(to bottom, rgba(28,26,22,0.5) 0%, rgba(26,74,46,0.78) 100%)',
    minimal: 'rgba(26,74,46,0.88)',
  };

  const paddingMap: Record<HeroVariant, string> = {
    homepage: '0 24px',
    subpage: '0 24px',
    minimal: '0 24px',
  };

  const headingSize: Record<HeroVariant, string> = {
    homepage: 'clamp(2.8rem, 6vw, 5.5rem)',
    subpage: 'clamp(2rem, 4vw, 3.5rem)',
    minimal: 'clamp(1.6rem, 3vw, 2.5rem)',
  };

  return (
    <section
      ref={heroRef}
      className={className}
      style={{
        position: 'relative',
        height: heightMap[variant],
        minHeight: minHeightMap[variant],
        background: 'var(--color-green-base)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes kcc-hero-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kcc-hero-content > * { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* Background image */}
      {imageSrc && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            // Ken Burns on homepage
            ...(variant === 'homepage' && mounted
              ? {
                  animation: 'kcc-ken-burns 20s ease-in-out infinite alternate',
                }
              : {}),
          }}
        />
      )}

      {/* Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: overlayMap[variant],
        }}
      />

      {/* Content */}
      <div
        className="kcc-hero-content"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1160px',
          margin: '0 auto',
          padding: paddingMap[variant],
          ...(variant === 'homepage'
            ? { textAlign: 'center' }
            : { textAlign: 'left' }),
        }}
      >
        {/* Breadcrumb — subpage/minimal */}
        {breadcrumb && breadcrumb.length > 0 && (
          <div
            style={{
              opacity: mounted ? 1 : 0,
              animation: mounted
                ? 'kcc-hero-fade-up 0.6s var(--ease-out, cubic-bezier(0,0,0.2,1)) both'
                : 'none',
              animationDelay: '0ms',
            }}
          >
            <HeroBreadcrumb items={breadcrumb} />
          </div>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: 'var(--color-gold-base)',
              marginBottom: '16px',
              opacity: mounted ? 1 : 0,
              animation: mounted
                ? 'kcc-hero-fade-up 0.6s var(--ease-out, cubic-bezier(0,0,0.2,1)) both'
                : 'none',
              animationDelay: '60ms',
            }}
          >
            {eyebrow}
          </p>
        )}

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: headingSize[variant],
            fontWeight: 500,
            color: 'var(--text-inverse)',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            marginBottom: subheading ? '20px' : children ? '32px' : 0,
            opacity: mounted ? 1 : 0,
            animation: mounted
              ? 'kcc-hero-fade-up 0.7s var(--ease-out, cubic-bezier(0,0,0.2,1)) both'
              : 'none',
            animationDelay: '120ms',
          }}
        >
          {heading}
        </h1>

        {/* Subheading */}
        {subheading && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              fontWeight: 300,
              color: 'rgba(245,239,228,0.75)',
              lineHeight: 1.6,
              maxWidth: variant === 'homepage' ? '540px' : '680px',
              margin: variant === 'homepage' ? '0 auto' : undefined,
              marginBottom: children ? '32px' : 0,
              opacity: mounted ? 1 : 0,
              animation: mounted
                ? 'kcc-hero-fade-up 0.7s var(--ease-out, cubic-bezier(0,0,0.2,1)) both'
                : 'none',
              animationDelay: '200ms',
            }}
          >
            {subheading}
          </p>
        )}

        {/* Children slot */}
        {children && (
          <div
            style={{
              opacity: mounted ? 1 : 0,
              animation: mounted
                ? 'kcc-hero-fade-up 0.7s var(--ease-out, cubic-bezier(0,0,0.2,1)) both'
                : 'none',
              animationDelay: '280ms',
            }}
          >
            {children}
          </div>
        )}
      </div>

      {/* Scroll indicator — homepage only */}
      {variant === 'homepage' && showScrollIndicator && <ScrollIndicator />}

      <style>{`
        @keyframes kcc-ken-burns {
          from { transform: scale(1); }
          to   { transform: scale(1.06); }
        }
      `}</style>
    </section>
  );
}
