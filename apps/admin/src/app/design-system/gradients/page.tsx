// @ts-nocheck
// apps/admin/src/app/design-system/gradients/page.tsx
'use client';

import { useEffect, useState } from 'react';

const GRADIENT_TOKENS = ['gradient-gold-subtle', 'gradient-hero-deep', 'gradient-overlay-fade', 'gradient-radial-gold', 'gradient-radial-canopy'];

export default function GradientsPage() {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const resolved: Record<string, string> = {};
    for (const token of GRADIENT_TOKENS) {
      const cssVar = `--bg-${token}`;
      resolved[token] = style.getPropertyValue(cssVar).trim();
    }
    setValues(resolved);
  }, []);

  return (
    <div>
      <h2 className="font-display text-h2 mb-space-4">Gradient Tokens</h2>
      <p className="font-body text-body text-text-muted mb-space-8 max-w-prose">
        Predefined gradient backgrounds used across the platform for hero sections, overlays, and decorative effects. These are available as CSS custom properties prefixed with <code className="bg-surface-deep px-space-1 rounded">--bg-</code>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6">
        {GRADIENT_TOKENS.map((token) => {
          const value = values[token] || '';
          return (
            <div key={token} className="bg-surface-elevated border border-border-light rounded-md overflow-hidden">
              <div className="w-full h-size-48" style={{ background: value }} />
              <div className="p-space-4">
                <code className="font-mono text-label text-gold-base block">{token}</code>
                <code className="font-mono text-caption text-text-muted break-all">{value || '—'}</code>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
