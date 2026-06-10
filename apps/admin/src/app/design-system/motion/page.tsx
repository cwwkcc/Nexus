// apps/admin/src/app/design-system/motion/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { BezierDefinition } from 'framer-motion';

// Mirror of motion.ts transitionTimingFunction values.
// framer-motion's Transition.ease must be a BezierDefinition ([n,n,n,n])
// or a named Easing — it cannot accept a CSS var() string.
const easings: { label: string; token: string; bezier: BezierDefinition }[] = [
  { label: 'snap', token: 'ease-snap', bezier: [0.25, 0, 0, 1] },
  { label: 'out', token: 'ease-out', bezier: [0, 0, 0.2, 1] },
  { label: 'in‑out', token: 'ease-in-out', bezier: [0.4, 0, 0.2, 1] },
  { label: 'ceremonial', token: 'ease-ceremonial', bezier: [0.16, 1, 0.3, 1] },
  { label: 'ember', token: 'ease-ember', bezier: [0.34, 1.56, 0.64, 1] },
];

const durations = [
  { label: 'instant', token: 'duration-instant' },
  { label: 'fast', token: 'duration-fast' },
  { label: 'standard', token: 'duration-standard' },
  { label: 'gentle', token: 'duration-gentle' },
  { label: 'slow', token: 'duration-slow' },
  { label: 'ceremonial', token: 'duration-ceremonial' },
  { label: 'epic', token: 'duration-epic' },
];

// Track geometry — keep TRAVEL small enough that ember spring overshoot
// (≈1.56× travel) stays within the TRACK_W container.
// With TRAVEL = 120, ember overshoot ≈ 187 px; box right edge ≈ 8+187+24 = 219 px < 280 px ✓
const TRACK_W = 280;
const BOX_SIZE = 24; // var(--size-6) = 24px
const LEFT_PAD = 8; // var(--space-2) = 8px
const TRAVEL = 120; // pixels the box travels to the right

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-space-16">
      <h3 className="font-display text-h3 mb-space-6 pb-space-2 border-b border-border-light">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function MotionPage() {
  // ── Easing: each curve has its own toggle state ───────────────────────────
  const [activeMap, setActiveMap] = useState<Record<string, boolean>>({});

  const toggleEasing = (token: string) =>
    setActiveMap((prev) => ({ ...prev, [token]: !prev[token] }));

  return (
    <div>
      <h2 className="font-display text-h2 mb-space-4">Motion Tokens</h2>
      <p className="font-body text-body text-text-muted mb-space-12">
        Duration, easing, and transform‑scale tokens. Easings are defined as
        bezier curves in{' '}
        <code className="font-mono text-code bg-surface-default px-space-2 py-space-1 rounded-sm">
          motion.ts
        </code>{' '}
        and consumed as CSS custom properties or passed directly to
        framer‑motion.
      </p>

      {/* ── Duration ────────────────────────────────────────────────────────── */}
      <Section title="Duration">
        <div className="flex flex-wrap gap-space-4">
          {durations.map((d) => (
            <button
              key={d.token}
              className="px-space-6 py-space-3 bg-green-base text-text-inverse rounded-md font-body text-label tracking-label"
              style={{
                transition: `background-color var(--${d.token}) var(--ease-out)`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  'var(--color-gold-base)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  'var(--color-green-base)')
              }
            >
              {d.label}
            </button>
          ))}
        </div>
        <p className="font-body text-caption text-text-muted mt-space-4">
          Hover a button to feel each duration with{' '}
          <code className="font-mono text-code bg-surface-default px-space-2 py-space-1 rounded-sm">
            ease-out
          </code>
          .
        </p>
      </Section>

      {/* ── Easing ──────────────────────────────────────────────────────────── */}
      <Section title="Easing — click to animate">
        <p className="font-body text-caption text-text-muted mb-space-6">
          Click any track to toggle the animation. Each easing is independent so
          you can compare curves side by side.
        </p>

        <div className="flex flex-col gap-space-5">
          {easings.map((e) => {
            const isActive = !!activeMap[e.token];
            return (
              <div key={e.token} className="flex items-center gap-space-6">
                {/* Label column */}
                <div
                  className="flex flex-col gap-space-1 shrink-0"
                  style={{ width: 96 }}
                >
                  <span className="font-mono text-label text-text-primary">
                    {e.label}
                  </span>
                  <span className="font-mono text-caption text-text-muted">
                    --{e.token}
                  </span>
                </div>

                {/* Sliding track */}
                <button
                  aria-label={`Animate ${e.label} easing`}
                  className="relative rounded-md border border-border-light bg-surface-elevated cursor-pointer shrink-0"
                  style={{ width: TRACK_W, height: 40 }}
                  onClick={() => toggleEasing(e.token)}
                >
                  {/* Destination marker */}
                  <div
                    className="absolute top-0 bottom-0 w-px bg-border-light"
                    style={{ left: LEFT_PAD + TRAVEL + BOX_SIZE }}
                  />

                  {/* Animated box */}
                  <motion.div
                    className="absolute bg-gold-base rounded-sm"
                    style={{
                      top: '50%',
                      marginTop: -(BOX_SIZE / 2),
                      left: LEFT_PAD,
                      width: BOX_SIZE,
                      height: BOX_SIZE,
                    }}
                    animate={isActive ? { x: TRAVEL } : { x: 0 }}
                    transition={{ duration: 0.8, ease: e.bezier }}
                  />

                  {/* Click hint */}
                  <span
                    className="absolute right-space-2 top-1/2 -translate-y-1/2 font-mono text-caption text-text-muted pointer-events-none select-none"
                    style={{ fontSize: 10 }}
                  >
                    {isActive ? '← reset' : 'click →'}
                  </span>
                </button>

                {/* Bezier values */}
                <span className="font-mono text-caption text-text-muted">
                  cubic-bezier({e.bezier.join(', ')})
                </span>
              </div>
            );
          })}
        </div>

        {/* Token → CSS var table */}
        <div className="mt-space-10 p-space-6 bg-surface-elevated border border-border-light rounded-md">
          <h4 className="font-display text-h3 mb-space-4">
            CSS Custom Properties
          </h4>
          <div className="flex flex-col gap-space-2">
            {easings.map((e) => (
              <div key={e.token} className="flex items-center gap-space-4">
                <code
                  className="font-mono text-caption text-text-primary shrink-0"
                  style={{ width: 136 }}
                >
                  --{e.token}
                </code>
                <code className="font-mono text-caption text-text-muted">
                  cubic-bezier({e.bezier.join(', ')})
                </code>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Transform scale ─────────────────────────────────────────────────── */}
      <Section title="Transform Scale">
        <div className="flex flex-wrap gap-space-8 items-center">
          <div className="flex flex-col items-center gap-space-3">
            <button className="px-space-8 py-space-4 bg-green-base text-text-inverse rounded-md font-body text-label tracking-label transition-transform duration-fast active:scale-press">
              Press me
            </button>
            <span className="font-mono text-caption text-text-muted">
              scale-press (0.98)
            </span>
          </div>
          <div className="flex flex-col items-center gap-space-3">
            <div className="w-size-32 h-size-32 bg-gold-pale border border-gold-base rounded-md flex items-center justify-center transition-transform duration-gentle hover:scale-card-hover cursor-default">
              <span className="font-body text-caption text-text-muted text-center px-space-2">
                hover
              </span>
            </div>
            <span className="font-mono text-caption text-text-muted">
              scale-card-hover (1.02)
            </span>
          </div>
        </div>
      </Section>
    </div>
  );
}
