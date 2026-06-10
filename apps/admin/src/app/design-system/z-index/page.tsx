// apps/admin/src/app/design-system/z-index/page.tsx
'use client';

const zTokens = [
  { name: 'z-base', value: 0 },
  { name: 'z-raised', value: 10 },
  { name: 'z-dropdown', value: 100 },
  { name: 'z-sticky', value: 200 },
  { name: 'z-overlay', value: 300 },
  { name: 'z-modal', value: 400 },
  { name: 'z-toast', value: 500 },
  { name: 'z-loading', value: 900 },
];

export default function ZIndexPage() {
  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Z‑Index Tokens</h1>
        <p className="font-body text-body text-text-muted mb-space-12">
          Consistent stacking order for overlays, modals, tooltips, etc.
        </p>

        <div className="relative h-80 bg-surface-deep rounded-md overflow-hidden">
          {zTokens.map((token, idx) => (
            <div
              key={token.name}
              className="absolute p-space-4 bg-surface-elevated border border-border-light rounded-md shadow-elevation-2"
              style={{
                zIndex: `var(--${token.name})`,
                top: `${idx * 28}px`,
                left: `${idx * 28}px`,
                right: 'auto',
                bottom: 'auto',
              }}
            >
              <span className="font-mono text-label">{token.name}</span>
              <span className="font-mono text-caption text-text-muted ml-space-2">
                ({token.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
