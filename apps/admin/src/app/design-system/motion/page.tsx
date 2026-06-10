// apps/admin/src/app/design-system/motion/page.tsx
'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function DemoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-space-16">
      <h2 className="font-display text-h2 mb-space-6 pb-space-2 border-b border-border-light">
        {title}
      </h2>
      <div className="flex flex-wrap gap-space-8 items-center">{children}</div>
    </div>
  );
}

export default function MotionPage() {
  const [isAnimating, setIsAnimating] = useState(false);
  const prefersReduced = useReducedMotion();

  const durations = [
    { label: 'instant', value: 'duration-instant' },
    { label: 'fast', value: 'duration-fast' },
    { label: 'standard', value: 'duration-standard' },
    { label: 'gentle', value: 'duration-gentle' },
    { label: 'slow', value: 'duration-slow' },
    { label: 'ceremonial', value: 'duration-ceremonial' },
    { label: 'epic', value: 'duration-epic' },
  ];

  const easings = [
    { label: 'snap', value: 'ease-snap' },
    { label: 'out', value: 'ease-out' },
    { label: 'in-out', value: 'ease-in-out' },
    { label: 'ceremonial', value: 'ease-ceremonial' },
    { label: 'ember', value: 'ease-ember' },
  ];

  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Motion Tokens</h1>
        <p className="font-body text-body text-text-muted mb-space-12">
          Duration, easing, and transform‑scale tokens.
        </p>

        <DemoSection title="Duration">
          {durations.map((d) => (
            <button
              key={d.value}
              className="px-space-6 py-space-3 bg-green-base text-text-inverse rounded-md"
              style={{
                transition: `background-color var(--${d.value}) var(--ease-out)`,
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
        </DemoSection>

        <DemoSection title="Easing (click to animate)">
          <div className="flex gap-space-8 flex-wrap">
            {easings.map((e) => {
              const transition = { duration: 0.6, ease: `var(--${e.value})` };
              return (
                <motion.div
                  key={e.value}
                  className="w-24 h-24 bg-gold-base rounded-md cursor-pointer"
                  animate={
                    isAnimating ? { x: 100, rotate: 360 } : { x: 0, rotate: 0 }
                  }
                  transition={transition}
                  onClick={() => setIsAnimating((prev) => !prev)}
                >
                  <div className="w-full h-full flex items-center justify-center text-text-inverse text-caption">
                    {e.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </DemoSection>

        <DemoSection title="Transform Scale Tokens">
          <button className="px-space-6 py-space-3 bg-green-base text-text-inverse rounded-md transition-all duration-fast active:scale-press">
            scale-press (active)
          </button>
          <div className="group w-32 h-32 bg-gold-pale border border-gold-base rounded-md flex items-center justify-center transition-all duration-gentle group-hover:scale-card-hover">
            scale-card-hover
          </div>
        </DemoSection>
      </div>
    </div>
  );
}
