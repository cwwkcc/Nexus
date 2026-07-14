'use client';

import { useEffect, useState } from 'react';

const shadowTokens = ['elevation-0', 'elevation-1', 'elevation-2', 'elevation-3', 'elevation-4', 'elevation-5', 'elevation-6'];

function useResolvedShadows(tokens: string[]): Record<string, string> {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const resolved: Record<string, string> = {};
    for (const token of tokens) {
      resolved[token] = style.getPropertyValue(`--shadow-${token}`).trim();
    }
    setValues(resolved);
  }, []);

  return values;
}

export default function ShadowsPage() {
  const resolvedValues = useResolvedShadows(shadowTokens);

  return (
    <div>
      <h2 className="font-display text-h2 mb-space-4">Shadows</h2>
      <p className="font-body text-body text-text-muted mb-space-8">Elevation tokens for cards, modals, dropdowns, and glass panels.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6">
        {shadowTokens.map((token) => (
          <div key={token} className="p-space-6 bg-surface-elevated rounded-md text-center" style={{ boxShadow: `var(--shadow-${token})` }}>
            <div className="font-mono text-label font-medium mb-space-2">{token}</div>
            <div className="font-mono text-caption text-text-muted break-all">{resolvedValues[token] ?? `var(--shadow-${token})`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
