// apps/admin/src/app/design-system/opacity/page.tsx
'use client';

const opacityTokens = [
  'opacity-0',
  'opacity-10',
  'opacity-20',
  'opacity-30',
  'opacity-40',
  'opacity-50',
  'opacity-60',
  'opacity-70',
  'opacity-80',
  'opacity-90',
  'opacity-100',
];

export default function OpacityPage() {
  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Opacity Tokens</h1>
        <p className="font-body text-body text-text-muted mb-space-12">
          Opacity scale for overlays, disabled states, and fading effects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6">
          {opacityTokens.map((token) => (
            <div
              key={token}
              className="flex items-center gap-space-4 p-space-4 border border-border-light rounded-md"
            >
              <div
                className="w-16 h-16 bg-gold-base rounded-sm"
                style={{ opacity: `var(--${token})` }}
              />
              <div>
                <div className="font-mono text-label">{token}</div>
                <div className="font-mono text-caption text-text-muted">{`var(--${token})`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
