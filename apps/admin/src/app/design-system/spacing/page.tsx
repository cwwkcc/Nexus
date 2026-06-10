'use client';

import { useEffect, useState } from 'react';

const spaceTokens = [
  'space-0',
  'space-0p5',
  'space-1',
  'space-1p5',
  'space-2',
  'space-2p5',
  'space-3',
  'space-4',
  'space-5',
  'space-6',
  'space-7',
  'space-8',
  'space-9',
  'space-10',
  'space-11',
  'space-12',
  'space-13',
  'space-14',
  'space-15',
  'space-16',
  'space-17',
  'space-18',
  'space-19',
  'space-20',
  'space-21',
  'space-22',
  'space-23',
  'space-24',
  'space-25',
  'space-26',
  'space-27',
  'space-28',
  'space-29',
  'space-30',
  'space-31',
  'space-32',
  'space-33',
  'space-34',
  'space-35',
  'space-36',
  'space-37',
  'space-38',
  'space-39',
  'space-40',
];

export default function SpacingPage() {
  const [resolvedValues, setResolvedValues] = useState<Record<string, string>>(
    {},
  );

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const values: Record<string, string> = {};
    for (const token of spaceTokens) {
      values[token] = style.getPropertyValue(`--${token}`).trim();
    }
    setResolvedValues(values);
  }, []);

  return (
    <div>
      <h2 className="font-display text-h2 mb-space-4">Spacing Scale</h2>
      <p className="font-body text-body text-text-muted mb-space-8">
        4px baseline – used for padding, margin, gap, and offsets.
      </p>

      <div className="space-y-space-3">
        {spaceTokens.map((token) => (
          <div key={token} className="flex items-center gap-space-4">
            <div className="w-size-32 shrink-0 font-mono text-caption text-text-primary">
              {token}
            </div>
            <div className="relative flex-1 h-size-8 bg-surface-default rounded-sm overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gold-base"
                style={{ width: `var(--${token})` }}
              />
            </div>
            <div className="w-size-32 shrink-0 font-mono text-caption text-text-muted text-right">
              {resolvedValues[token] ?? `var(--${token})`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
