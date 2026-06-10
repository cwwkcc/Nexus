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
  'space-8',
  'space-10',
  'space-12',
  'space-16',
  'space-20',
  'space-24',
  'space-32',
  'space-40',
];

export default function SpacingPage() {
  return (
    <div>
      <h2 className="font-display text-h2 mb-4">Spacing Scale</h2>
      <p className="font-body text-body text-text-muted mb-8">
        4px baseline – used for padding, margin, gap, and top/right/bottom/left
        offsets.
      </p>
      <div className="space-y-3">
        {spaceTokens.map((token) => (
          <div key={token} className="flex items-center gap-6">
            <div className="w-28 font-mono text-caption">{token}</div>
            <div
              className="flex-1 h-8 bg-gold-base"
              style={{ width: `var(--${token})`, maxWidth: '400px' }}
            />
            <div className="w-32 font-mono text-caption text-text-muted">{`var(--${token})`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
