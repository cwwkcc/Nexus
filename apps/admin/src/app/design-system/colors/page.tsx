'use client';

import { useEffect, useState } from 'react';

function useAllCssVars(tokens: string[]): Record<string, string> {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const resolved: Record<string, string> = {};
    for (const token of tokens) {
      resolved[token] = style.getPropertyValue(`--color-${token}`).trim();
    }
    setValues(resolved);
  }, []);

  return values;
}

const colorGroups = [
  {
    name: 'Green',
    tokens: ['green-base', 'green-light', 'green-hover'],
  },
  {
    name: 'Gold',
    tokens: [
      'gold-base',
      'gold-light',
      'gold-pale',
      'gold-hover',
      'gold-active',
      'gold-glow',
    ],
  },
  {
    name: 'Surfaces',
    tokens: [
      'surface-elevated',
      'surface-base',
      'surface-default',
      'surface-deep',
      'surface-hover',
      'surface-active',
      'surface-disabled',
      'surface-inverse',
    ],
  },
  {
    name: 'Text',
    tokens: ['text-primary', 'text-muted', 'text-inverse'],
  },
  {
    name: 'Border',
    tokens: ['border-default', 'border-light'],
  },
  {
    name: 'Semantic',
    tokens: [
      'semantic-success-base',
      'semantic-success-surface',
      'semantic-error-base',
      'semantic-error-surface',
      'semantic-warning-base',
      'semantic-warning-surface',
      'semantic-info-base',
      'semantic-info-surface',
    ],
  },
  {
    name: 'Overlays',
    tokens: ['overlay-light', 'overlay-medium', 'overlay-heavy'],
  },
];

export default function ColorsPage() {
  const allTokens = colorGroups.flatMap((g) => g.tokens);
  const cssValues = useAllCssVars(allTokens);

  return (
    <div>
      <h2 className="font-display text-h2 mb-space-4">Colors</h2>
      <p className="font-body text-body text-text-muted mb-space-8">
        All colors are referenced via tokens – no raw hex values in components.
      </p>

      {colorGroups.map((group) => (
        <div key={group.name} className="mb-space-10">
          <h3 className="font-display text-h3 mb-space-4">{group.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-4">
            {group.tokens.map((token) => (
              <div
                key={token}
                className="border border-border-light rounded-md overflow-hidden"
              >
                <div
                  className="h-size-24 w-full"
                  style={{ backgroundColor: `var(--color-${token})` }}
                />
                <div className="p-space-3 bg-surface-elevated">
                  <div className="font-mono text-caption font-medium">
                    {token}
                  </div>
                  <div className="font-mono text-caption text-text-muted">
                    {cssValues[token] ?? ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
