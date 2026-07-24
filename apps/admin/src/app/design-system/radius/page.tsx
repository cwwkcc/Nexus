'use client';

import { useEffect, useState } from 'react';

const RADIUS_TOKENS = ['none', 'sm', 'md', 'lg', 'full'];

export default function RadiusPage() {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const resolved: Record<string, string> = {};
    for (const token of RADIUS_TOKENS) {
      const cssVar = `--radius-${token}`;
      resolved[token] = style.getPropertyValue(cssVar).trim();
    }
    setValues(resolved);
  }, []);

  return (
    <div>
      <h2 className="font-display text-h2 mb-space-4">Border Radius Tokens</h2>
      <p className="font-body text-body text-text-muted mb-space-8 max-w-prose">
        Border radius values for consistent rounding of elements. Use these tokens with Tailwind&apos;s <code className="bg-surface-deep px-space-1 rounded">rounded-*</code> utilities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6">
        {RADIUS_TOKENS.map((token) => {
          const value = values[token] || '';
          const radiusClass = token === 'none' ? 'rounded-none' : `rounded-${token}`;
          return (
            <div key={token} className="bg-surface-elevated border border-border-light rounded-md p-space-6 flex flex-col items-center gap-space-4">
              <div className="w-size-32 h-size-32 bg-gold-base" style={{ borderRadius: value }} />
              <div className="text-center">
                <code className="font-mono text-label text-gold-base block">{token}</code>
                <code className="font-mono text-caption text-text-muted">{value || '—'}</code>
                <code className="font-mono text-caption text-text-muted block mt-space-1">{radiusClass}</code>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
