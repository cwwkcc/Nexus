'use client';

function getCssVar(varName: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}

const colorGroups = [
  {
    name: 'Primary',
    tokens: ['green-base', 'gold-base', 'gold-light', 'gold-pale'],
  },
  {
    name: 'Surfaces',
    tokens: [
      'surface-base',
      'surface-default',
      'surface-deep',
      'surface-elevated',
      'surface-inverse',
    ],
  },
  {
    name: 'Text',
    tokens: ['text-primary', 'text-muted', 'text-inverse'],
  },
  {
    name: 'Semantic',
    tokens: [
      'semantic-success-base',
      'semantic-error-base',
      'semantic-warning-base',
      'semantic-info-base',
    ],
  },
  {
    name: 'Overlays',
    tokens: ['overlay-light', 'overlay-medium', 'overlay-heavy'],
  },
];

export default function ColorsPage() {
  return (
    <div>
      <h2 className="font-display text-h2 mb-4">Colors</h2>
      <p className="font-body text-body text-text-muted mb-8">
        All colors are referenced via tokens – no raw hex values in components.
      </p>
      {colorGroups.map((group) => (
        <div key={group.name} className="mb-10">
          <h3 className="font-display text-h3 mb-4">{group.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {group.tokens.map((token) => (
              <div
                key={token}
                className="border border-border-light rounded-md overflow-hidden"
              >
                <div
                  className="h-24 w-full"
                  style={{ backgroundColor: `var(--color-${token})` }}
                />
                <div className="p-3 bg-surface-elevated">
                  <div className="font-mono text-caption font-medium">
                    {token}
                  </div>
                  <div className="font-mono text-caption text-text-muted">
                    {getCssVar(`--color-${token}`)}
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
