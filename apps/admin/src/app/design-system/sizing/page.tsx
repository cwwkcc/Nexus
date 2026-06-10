// apps/admin/src/app/design-system/sizing/page.tsx
'use client';

const sizingTokens = [
  'size-4',
  'size-6',
  'size-8',
  'size-10',
  'size-11',
  'size-12',
  'size-16',
  'size-20',
  'size-24',
  'size-32',
  'size-40',
  'size-48',
  'size-64',
  'size-80',
];

export default function SizingPage() {
  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Sizing Tokens</h1>
        <p className="font-body text-body text-text-muted mb-space-12">
          Width, height, min‑/max‑width, min‑/max‑height tokens (4px scale).
        </p>

        <div className="flex flex-wrap gap-space-8 items-end">
          {sizingTokens.map((token) => (
            <div key={token} className="flex flex-col items-center gap-space-2">
              <div
                className={`bg-gold-pale border border-gold-base rounded-sm`}
                style={{ width: `var(--${token})`, height: `var(--${token})` }}
              />
              <span className="font-mono text-caption text-text-muted">
                {token}
              </span>
              <span className="font-mono text-caption text-text-muted">
                {`var(--${token})`}
              </span>
            </div>
          ))}
        </div>

        <h2 className="font-display text-h2 mt-space-16 mb-space-6">
          Width Only
        </h2>
        <div className="flex flex-col gap-space-4">
          {sizingTokens.slice(0, 8).map((token) => (
            <div key={token} className="flex items-center gap-space-4">
              <span className="w-size-32 font-mono text-caption">{token}</span>
              <div
                className="h-size-8 bg-gold-base rounded-sm"
                style={{ width: `var(--${token})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
