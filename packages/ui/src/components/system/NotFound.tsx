'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

// ─── Inline SVG crest placeholder ────────────────────────────────────────────
// Replace with <SchoolLogo /> or the actual SVG once the crest component is ready.
function CrestMark({ size = 64 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle
        cx="32"
        cy="32"
        r="30"
        stroke="var(--color-gold-base)"
        strokeWidth="1"
        opacity="0.4"
      />
      {/* Lamp flame (simplified) */}
      <path
        d="M32 14 C28 18, 26 23, 32 26 C38 23, 36 18, 32 14Z"
        fill="var(--color-gold-base)"
        opacity="0.7"
      />
      {/* Lamp base */}
      <rect
        x="29"
        y="25"
        width="6"
        height="10"
        rx="1"
        fill="var(--color-gold-base)"
        opacity="0.5"
      />
      {/* Lotus petals */}
      <ellipse
        cx="22"
        cy="40"
        rx="5"
        ry="3"
        fill="var(--color-gold-base)"
        opacity="0.35"
        transform="rotate(-20 22 40)"
      />
      <ellipse
        cx="32"
        cy="42"
        rx="5"
        ry="3"
        fill="var(--color-gold-base)"
        opacity="0.45"
      />
      <ellipse
        cx="42"
        cy="40"
        rx="5"
        ry="3"
        fill="var(--color-gold-base)"
        opacity="0.35"
        transform="rotate(20 42 40)"
      />
      {/* Dharmachakra circle */}
      <circle
        cx="32"
        cy="50"
        r="4"
        stroke="var(--color-gold-base)"
        strokeWidth="0.8"
        opacity="0.4"
        fill="none"
      />
      {/* Laurel lines */}
      <path
        d="M12 32 C14 28, 16 30, 18 27"
        stroke="var(--color-gold-base)"
        strokeWidth="0.8"
        opacity="0.3"
        fill="none"
      />
      <path
        d="M52 32 C50 28, 48 30, 46 27"
        stroke="var(--color-gold-base)"
        strokeWidth="0.8"
        opacity="0.3"
        fill="none"
      />
    </svg>
  );
}

// ─── Animated digit ───────────────────────────────────────────────────────────
function GlitchDigit({ char, delay = 0 }: { char: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const CHARS = '0123456789';
    let frame = 0;
    const TOTAL = 12;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (frame >= TOTAL) {
          el.textContent = char;
          clearInterval(interval);
          return;
        }
        el.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
        frame++;
      }, 60);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [char, delay]);

  return (
    <span
      ref={ref}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(5rem, 15vw, 10rem)',
        fontWeight: 400,
        color: 'var(--color-gold-base)',
        lineHeight: 1,
        display: 'inline-block',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {char}
    </span>
  );
}

// ─── Quick links ──────────────────────────────────────────────────────────────
const QUICK_LINKS = [
  { href: '/', label: 'Homepage' },
  { href: '/news', label: 'News' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About KCC' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/contact', label: 'Contact' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export function NotFoundPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--color-green-base)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Background texture ───────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 20% 80%, rgba(183,145,58,0.08) 0%, transparent 50%),' +
            'radial-gradient(circle at 80% 20%, rgba(183,145,58,0.06) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Crest watermark ──────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.04,
          pointerEvents: 'none',
        }}
      >
        <CrestMark size={400} />
      </div>

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '560px',
        }}
      >
        {/* Crest */}
        <div
          style={{
            marginBottom: '32px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CrestMark size={56} />
        </div>

        {/* 404 digits */}
        <div
          aria-label="404"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            marginBottom: '8px',
          }}
        >
          <GlitchDigit char="4" delay={0} />
          <GlitchDigit char="0" delay={120} />
          <GlitchDigit char="4" delay={240} />
        </div>

        {/* Eyebrow */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.45)',
            marginBottom: '20px',
          }}
        >
          Page not found
        </p>

        {/* Message */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#fff',
            lineHeight: 1.25,
            marginBottom: '16px',
          }}
        >
          This page has left the building.
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.75,
            marginBottom: '40px',
          }}
        >
          The page you&apos;re looking for may have been moved, renamed, or
          removed. Try one of the links below, or head back to the homepage.
        </p>

        {/* Primary CTA */}
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'var(--color-green-base)',
            background: 'var(--color-gold-base)',
            padding: '14px 32px',
            textDecoration: 'none',
            border: '1px solid var(--color-gold-base)',
            transition: 'background 0.2s ease, color 0.2s ease',
            marginBottom: '48px',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.color =
              'var(--color-gold-base)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              'var(--color-gold-base)';
            (e.currentTarget as HTMLElement).style.color =
              'var(--color-green-base)';
          }}
        >
          ← Return to homepage
        </Link>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            width: '40px',
            height: '1px',
            background: 'rgba(255,255,255,0.15)',
            margin: '0 auto 32px',
          }}
        />

        {/* Quick links */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: '16px',
          }}
        >
          Or jump to
        </p>

        <nav aria-label="Quick navigation links">
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    padding: '6px 14px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    transition: 'color 0.15s ease, border-color 0.15s ease',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      'var(--color-gold-base)';
                    (e.currentTarget as HTMLElement).style.borderColor =
                      'rgba(183,145,58,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      'rgba(255,255,255,0.55)';
                    (e.currentTarget as HTMLElement).style.borderColor =
                      'rgba(255,255,255,0.12)';
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer line */}
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.2)',
            marginTop: '60px',
          }}
        >
          C.W.W. Kannangara Central College, Mathugama — Est. 1873
        </p>
      </div>
    </main>
  );
}
