// @ts-nocheck
'use client';

// --blur-* tokens are raw pixel lengths (e.g. "4px").
// The CSS filter property requires a function: blur(4px), not a bare "4px".
// So we use:  filter: `blur(var(--${token}))` — NOT filter: `var(--${token})`.

const blurTokens = [
  { token: 'blur-xs', label: 'xs', value: '2px' },
  { token: 'blur-sm', label: 'sm', value: '4px' },
  { token: 'blur-md', label: 'md', value: '8px' },
  { token: 'blur-lg', label: 'lg', value: '16px' },
];

export default function BlurPage() {
  return (
    <div>
      <h2 className="font-display text-h2 mb-space-4">Blur Tokens</h2>
      <p className="font-body text-body text-text-muted mb-space-4">
        Four blur steps for decorative glows, loading states, and image effects. Glass panels also pull from this scale — see the <a href="/design-system/glass" className="text-gold-base underline underline-offset-2">
          Glass
        </a> page, which uses <code className="font-mono text-code bg-surface-default px-space-2 py-space-1 rounded-sm">--blur-lg</code> via <code className="font-mono text-code bg-surface-default px-space-2 py-space-1 rounded-sm">backdropFilter</code>. (There's no separate glass-specific blur token.)
      </p>
      <p className="font-body text-body-sm text-text-muted mb-space-12">
        Note: token values are raw lengths (e.g. <code className="font-mono text-code bg-surface-default px-space-2 py-space-1 rounded-sm">4px</code>
        ), so consume them as <code className="font-mono text-code bg-surface-default px-space-2 py-space-1 rounded-sm">{'filter: blur(var(--blur-sm))'}</code>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-6 mb-space-16">
        {blurTokens.map(({ token, label, value }) => (
          <div key={token} className="flex flex-col items-center gap-space-3">
            {/* Visible subject: a sharp geometric swatch */}
            <div className="relative w-size-40 h-size-40 rounded-md overflow-hidden">
              {/* Unblurred base */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, var(--color-green-base) 50%, var(--color-gold-base) 50%)',
                }}
              />
              {/* Blurred overlay of the same content so we see the effect */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, var(--color-green-base) 50%, var(--color-gold-base) 50%)',
                  filter: `blur(var(--${token}))`,
                  transform: 'scale(1.1)', // prevent edge artefacts
                }}
              />
            </div>
            <span className="font-mono text-label text-text-primary">{token}</span>
            <span className="font-mono text-caption text-text-muted">{value}</span>
          </div>
        ))}
      </div>

      {/* Second demo: blur as a decorative glow effect */}
      <div>
        <h3 className="font-display text-h3 mb-space-6 pb-space-2 border-b border-border-light">Decorative glow usage</h3>
        <div className="flex flex-wrap gap-space-10 items-center">
          {blurTokens.map(({ token, label }) => (
            <div key={token} className="relative flex items-center justify-center w-size-24 h-size-24">
              {/* Glow layer */}
              <div className="absolute inset-0 rounded-full bg-gold-base" style={{ filter: `blur(var(--${token}))`, opacity: 0.6 }} />
              {/* Icon on top */}
              <div className="relative w-size-12 h-size-12 rounded-full bg-gold-base" />
              <span className="absolute font-mono text-caption text-text-muted" style={{ bottom: -20 }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
