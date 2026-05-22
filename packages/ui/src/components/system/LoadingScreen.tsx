'use client';

import { useEffect, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LoadingScreenProps {
  /** Control visibility externally — fade out when content is ready */
  visible?: boolean;
  /** Called after the exit animation completes */
  onExited?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LoadingScreen({
  visible = true,
  onExited,
}: LoadingScreenProps) {
  const [_phase, setPhase] = useState<'enter' | 'loop' | 'exit'>('enter');
  const [opacity, setOpacity] = useState(0);

  // Entrance
  useEffect(() => {
    // Fade in
    const t1 = setTimeout(() => setOpacity(1), 50);
    // Start loop phase
    const t2 = setTimeout(() => setPhase('loop'), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Exit when visible becomes false
  useEffect(() => {
    const t1 = setTimeout(() => setOpacity(1), 50);
    const t2 = setTimeout(() => setPhase('loop'), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      aria-label="Loading"
      role="status"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--color-green-base, #1A4A2E)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        opacity,
        transition: 'opacity 0.4s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Crest with shine sweep */}
      <div style={{ position: 'relative', width: '120px', height: '120px' }}>
        {/* Crest circle */}
        <div
          style={{
            width: '120px',
            height: '120px',
            border: '1.5px solid var(--color-gold-base, #C9973A)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Monogram */}
          <span
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond", serif)',
              fontSize: '4rem',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--color-gold-base, #C9973A)',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            K
          </span>

          {/* Shine sweep — uses CSS animation */}
          <style>{`
            @keyframes kcc-shine {
              0%   { transform: translateX(-200%) skewX(-20deg); opacity: 0; }
              20%  { opacity: 1; }
              100% { transform: translateX(300%) skewX(-20deg); opacity: 0; }
            }
            @keyframes kcc-pulse {
              0%, 100% { box-shadow: 0 0 0 0 rgba(201,151,58,0.0); }
              50%       { box-shadow: 0 0 0 12px rgba(201,151,58,0.18); }
            }
            @media (prefers-reduced-motion: reduce) {
              .kcc-shine-sweep { display: none !important; }
              .kcc-loader-crest { animation: none !important; }
            }
          `}</style>
          <div
            className="kcc-shine-sweep"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '40%',
              height: '100%',
              background:
                'linear-gradient(90deg, transparent, rgba(232,184,75,0.45), transparent)',
              animation: 'kcc-shine 2.8s ease-in-out infinite',
              animationDelay: '0.6s',
            }}
          />
        </div>

        {/* Outer glow pulse */}
        <div
          className="kcc-loader-crest"
          style={{
            position: 'absolute',
            inset: '-8px',
            borderRadius: '50%',
            animation: 'kcc-pulse 3s ease-in-out infinite',
          }}
        />
      </div>

      {/* School name */}
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'var(--font-body, "Source Serif 4", serif)',
            fontSize: '0.6rem',
            textTransform: 'uppercase',
            letterSpacing: '0.28em',
            color: 'rgba(201,151,58,0.6)',
            marginBottom: '6px',
          }}
        >
          C.W.W. Kannangara Central College
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body, "Source Serif 4", serif)',
            fontSize: '0.55rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'rgba(245,239,228,0.2)',
          }}
        >
          Mathugama · Est. 1873
        </p>
      </div>

      {/* Three pulsing dots */}
      <style>{`
        @keyframes kcc-dot-pulse {
          0%, 80%, 100% { transform: scaleY(1); opacity: 0.35; }
          40%            { transform: scaleY(1.6); opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .kcc-dot { animation: none !important; opacity: 0.5 !important; }
        }
      `}</style>
      <div
        style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
        aria-hidden="true"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="kcc-dot"
            style={{
              display: 'block',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: 'var(--color-gold-base, #C9973A)',
              animation: 'kcc-dot-pulse 1.4s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
