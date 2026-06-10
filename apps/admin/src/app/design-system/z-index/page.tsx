'use client';

// z-index tokens from zIndex.ts — keys: base, raised, dropdown, sticky, overlay, modal, toast, loading
const zTokens = [
  {
    name: 'z-base',
    value: 0,
    role: 'Default document flow',
    color: 'var(--color-surface-default)',
  },
  {
    name: 'z-raised',
    value: 10,
    role: 'Raised cards, sticky images',
    color: 'var(--color-surface-deep)',
  },
  {
    name: 'z-dropdown',
    value: 100,
    role: 'Dropdowns, select menus',
    color: 'var(--color-gold-pale)',
  },
  {
    name: 'z-sticky',
    value: 200,
    role: 'Sticky nav, floating headers',
    color: 'var(--color-gold-light)',
  },
  {
    name: 'z-overlay',
    value: 300,
    role: 'Backdrop overlays',
    color: 'var(--color-gold-base)',
  },
  {
    name: 'z-modal',
    value: 400,
    role: 'Modal dialogs',
    color: 'var(--color-green-light)',
  },
  {
    name: 'z-toast',
    value: 500,
    role: 'Toast notifications',
    color: 'var(--color-green-base)',
  },
  {
    name: 'z-loading',
    value: 900,
    role: 'Full-screen loading states',
    color: 'var(--color-surface-inverse)',
  },
];

export default function ZIndexPage() {
  return (
    <div>
      <h2 className="font-display text-h2 mb-space-4">Z‑Index Tokens</h2>
      <p className="font-body text-body text-text-muted mb-space-12">
        Eight stacking tiers. The demo below shows them as a layered stack —
        higher tiers sit visually in front.
      </p>

      {/* Stacked fan visualization */}
      <div className="mb-space-16">
        <h3 className="font-display text-h3 mb-space-6 pb-space-2 border-b border-border-light">
          Stacking order
        </h3>
        <div
          className="relative rounded-md bg-surface-deep overflow-visible"
          style={{ height: 340 }}
        >
          {zTokens.map((t, i) => {
            const CARD_H = 52;
            const VISIBLE = 40; // how many px of each card peek below the next
            const bottom = i * VISIBLE;
            return (
              <div
                key={t.name}
                className="absolute left-space-6 right-space-6 rounded-md border border-border-light flex items-center justify-between px-space-5"
                style={{
                  bottom,
                  height: CARD_H,
                  backgroundColor: t.color,
                  zIndex: t.value + 1, // +1 so z-base (0) still stacks in this relative context
                  boxShadow: '0 -2px 8px rgba(28,26,22,0.10)',
                }}
              >
                <div className="flex items-center gap-space-4">
                  <span className="font-mono text-label text-text-primary">
                    {t.name}
                  </span>
                  <span className="font-body text-body-sm text-text-muted">
                    {t.role}
                  </span>
                </div>
                <span className="font-mono text-label text-text-muted">
                  {t.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Token reference table */}
      <div>
        <h3 className="font-display text-h3 mb-space-6 pb-space-2 border-b border-border-light">
          Token Reference
        </h3>
        <div className="flex flex-col gap-space-3">
          {zTokens.map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-space-4 p-space-4 bg-surface-elevated border border-border-light rounded-md"
            >
              <span className="w-size-32 shrink-0 font-mono text-label text-text-primary">
                {t.name}
              </span>
              <span className="w-size-16 shrink-0 font-mono text-caption text-text-muted text-right">
                {t.value}
              </span>
              <span className="font-body text-body-sm text-text-muted">
                {t.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
