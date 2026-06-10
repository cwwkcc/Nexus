export default function DesignSystemOverview() {
  return (
    <div>
      <h2 className="font-display text-h2 mb-4">Foundations</h2>
      <p className="font-body text-body text-text-muted mb-6">
        Every visual decision flows from our design tokens. These tokens are the
        single source of truth – used in both the public website and the admin
        panel.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-border-light rounded-md bg-surface-elevated">
          <h3 className="font-display text-h3 mb-2">Components</h3>
          <p className="font-body text-body-sm text-text-muted mb-4">
            Buttons, cards, forms, layouts – all interactive building blocks.
          </p>
          <a
            href="/design-system/components"
            className="font-body text-label uppercase tracking-label text-gold-base"
          >
            Browse →
          </a>
        </div>
        <div className="p-6 border border-border-light rounded-md bg-surface-elevated">
          <h3 className="font-display text-h3 mb-2">Colors</h3>
          <p className="font-body text-body-sm text-text-muted mb-4">
            Forest green, gold, semantic states, surfaces, and overlays.
          </p>
          <a
            href="/design-system/colors"
            className="font-body text-label uppercase tracking-label text-gold-base"
          >
            Explore →
          </a>
        </div>
        <div className="p-6 border border-border-light rounded-md bg-surface-elevated">
          <h3 className="font-display text-h3 mb-2">Typography</h3>
          <p className="font-body text-body-sm text-text-muted mb-4">
            Cormorant Garamond, Inter, and the full type scale.
          </p>
          <a
            href="/design-system/typography"
            className="font-body text-label uppercase tracking-label text-gold-base"
          >
            Explore →
          </a>
        </div>
        <div className="p-6 border border-border-light rounded-md bg-surface-elevated">
          <h3 className="font-display text-h3 mb-2">Spacing & Shadows</h3>
          <p className="font-body text-body-sm text-text-muted mb-4">
            4px baseline, elevation tokens, and layout grids.
          </p>
          <a
            href="/design-system/spacing"
            className="font-body text-label uppercase tracking-label text-gold-base"
          >
            See scale →
          </a>
        </div>
      </div>
    </div>
  );
}
