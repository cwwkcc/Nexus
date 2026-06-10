// apps/admin/src/app/design-system/blur/page.tsx
'use client';

const blurTokens = ['blur-xs', 'blur-sm', 'blur-md', 'blur-lg'];

export default function BlurPage() {
  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Blur Tokens</h1>
        <p className="font-body text-body text-text-muted mb-space-12">
          Used for decorative glows, loading states, and image effects –{' '}
          <strong>never</strong> for glass panels.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-6">
          {blurTokens.map((token) => (
            <div key={token} className="flex flex-col items-center gap-space-3">
              <div className="relative w-40 h-40 overflow-hidden rounded-md">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(/images/white.jpg)',
                    filter: `var(--${token})`,
                  }}
                />
              </div>
              <span className="font-mono text-label">{token}</span>
              <span className="font-mono text-caption text-text-muted">{`var(--${token})`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
