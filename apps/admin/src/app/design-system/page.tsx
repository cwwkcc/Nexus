import Link from 'next/link';

export default function DesignSystemOverview() {
  return (
    <div>
      <h2 className="font-display text-h2 mb-space-4">Foundations</h2>
      <p className="font-body text-body text-text-muted mb-space-6">
        Every visual decision flows from our design tokens. These tokens are the
        single source of truth – used in both the public website and the admin
        panel.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
        <div className="p-space-6 border border-border-light rounded-md bg-surface-elevated">
          <h3 className="font-display text-h3 mb-space-2">Components</h3>
          <p className="font-body text-body-sm text-text-muted mb-space-4">
            Buttons, cards, forms, layouts – all interactive building blocks.
          </p>
          <Link
            href="/design-system/components"
            className="font-body text-label uppercase tracking-label text-gold-base hover:text-gold-hover transition-colors duration-fast"
          >
            Browse →
          </Link>
        </div>

        <div className="p-space-6 border border-border-light rounded-md bg-surface-elevated">
          <h3 className="font-display text-h3 mb-space-2">Colors</h3>
          <p className="font-body text-body-sm text-text-muted mb-space-4">
            Forest green, gold, semantic states, surfaces, and overlays.
          </p>
          <Link
            href="/design-system/colors"
            className="font-body text-label uppercase tracking-label text-gold-base hover:text-gold-hover transition-colors duration-fast"
          >
            Explore →
          </Link>
        </div>

        <div className="p-space-6 border border-border-light rounded-md bg-surface-elevated">
          <h3 className="font-display text-h3 mb-space-2">Typography</h3>
          <p className="font-body text-body-sm text-text-muted mb-space-4">
            Cormorant Garamond, Inter, and the full type scale.
          </p>
          <Link
            href="/design-system/typography"
            className="font-body text-label uppercase tracking-label text-gold-base hover:text-gold-hover transition-colors duration-fast"
          >
            Explore →
          </Link>
        </div>

        <div className="p-space-6 border border-border-light rounded-md bg-surface-elevated">
          <h3 className="font-display text-h3 mb-space-2">
            Spacing &amp; Shadows
          </h3>
          <p className="font-body text-body-sm text-text-muted mb-space-4">
            4px baseline, elevation tokens, and layout grids.
          </p>
          <Link
            href="/design-system/spacing"
            className="font-body text-label uppercase tracking-label text-gold-base hover:text-gold-hover transition-colors duration-fast"
          >
            See scale →
          </Link>
        </div>
      </div>
    </div>
  );
}
