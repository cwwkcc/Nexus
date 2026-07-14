'use client';

// Glass tokens live in tokens.css as CSS custom properties.
// They are not in the Tailwind theme (the preset comment says so explicitly),
// so we consume them via style={{ }} with var() references.
//
// To show glass properly the demo background must be visible behind the panel.
// We render each swatch over a green-to-gold gradient backdrop.

const glassSurfaces = [
  {
    name: 'glass-surface-light',
    cssVar: '--glass-surface-light',
    value: 'rgba(255,255,255,0.3)',
    label: 'Light',
  },
  {
    name: 'glass-surface-medium',
    cssVar: '--glass-surface-medium',
    value: 'rgba(255,255,255,0.2)',
    label: 'Medium',
  },
];

const allTokens = [
  { name: 'glass-surface-light', value: 'rgba(255,255,255,0.3)' },
  { name: 'glass-surface-medium', value: 'rgba(255,255,255,0.2)' },
  { name: 'glass-backdrop-blur', value: 'blur(12px)' },
  { name: 'glass-border', value: '1px solid rgba(255,255,255,0.2)' },
  { name: 'glass-shadow', value: '0 8px 32px rgba(0,0,0,0.1)' },
];

export default function GlassPage() {
  return (
    <div>
      <h2 className="font-display text-h2 mb-space-4">Glass Tokens</h2>
      <p className="font-body text-body text-text-muted mb-space-4">
        Translucent surface tokens for the "forest mist" aesthetic. These are CSS custom properties in <code className="font-mono text-code bg-surface-default px-space-2 py-space-1 rounded-sm">tokens.css</code> — use them with <code className="font-mono text-code bg-surface-default px-space-2 py-space-1 rounded-sm">style={'{{ backgroundColor: "var(--glass-surface-light)" }}'}</code>, or add a utility class in <code className="font-mono text-code bg-surface-default px-space-2 py-space-1 rounded-sm">global.css</code>.
      </p>

      {/* Live demo – glass panels over a textured backdrop */}
      <div className="mb-space-16">
        <h3 className="font-display text-h3 mb-space-6 pb-space-2 border-b border-border-light">Surfaces</h3>
        <div className="flex flex-wrap gap-space-8">
          {glassSurfaces.map((s) => (
            <div key={s.name} className="flex flex-col gap-space-3">
              {/* Backdrop */}
              <div
                className="relative w-size-64 h-size-40 rounded-md overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, var(--color-green-base) 0%, var(--color-gold-base) 100%)',
                }}
              >
                {/* Decorative circles so transparency reads clearly */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 80,
                    height: 80,
                    top: -20,
                    right: -20,
                    backgroundColor: 'var(--color-gold-light)',
                    opacity: 0.6,
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 60,
                    height: 60,
                    bottom: -10,
                    left: 20,
                    backgroundColor: 'var(--color-surface-base)',
                    opacity: 0.4,
                  }}
                />
                {/* Glass panel */}
                <div
                  className="absolute inset-space-4 rounded-md flex flex-col items-center justify-center"
                  style={{
                    inset: 'var(--space-4)',
                    backgroundColor: `var(${s.cssVar})`,
                    backdropFilter: 'var(--glass-backdrop-blur)',
                    WebkitBackdropFilter: 'var(--glass-backdrop-blur)',
                    border: 'var(--glass-border)',
                    boxShadow: 'var(--glass-shadow)',
                  }}
                >
                  <span className="font-body text-label tracking-label text-text-inverse">{s.label}</span>
                  <span className="font-mono text-caption text-text-inverse" style={{ opacity: 0.8 }}>
                    {s.value}
                  </span>
                </div>
              </div>
              <span className="font-mono text-caption text-text-muted">--{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Token reference table */}
      <div>
        <h3 className="font-display text-h3 mb-space-6 pb-space-2 border-b border-border-light">Token Reference</h3>
        <div className="flex flex-col gap-space-3">
          {allTokens.map(({ name, value }) => (
            <div key={name} className="flex items-start gap-space-4 p-space-4 bg-surface-elevated border border-border-light rounded-md">
              <span className="w-size-68 shrink-0 font-mono text-label text-text-primary">--{name}</span>
              <span className="font-mono text-caption text-text-muted break-all">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
