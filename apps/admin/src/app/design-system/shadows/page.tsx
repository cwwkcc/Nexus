const shadowTokens = [
  'elevation-0',
  'elevation-1',
  'elevation-2',
  'elevation-3',
  'elevation-4',
  'elevation-5',
];

export default function ShadowsPage() {
  return (
    <div>
      <h2 className="font-display text-h2 mb-4">Shadows</h2>
      <p className="font-body text-body text-text-muted mb-8">
        Elevation tokens for cards, modals, dropdowns, and glass panels.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shadowTokens.map((token) => (
          <div
            key={token}
            className="p-6 bg-surface-elevated rounded-md text-center"
            style={{ boxShadow: `var(--shadow-${token})` }}
          >
            <div className="font-mono text-caption font-medium mb-2">
              {token}
            </div>
            <div className="font-mono text-caption text-text-muted break-all">{`var(--shadow-${token})`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
