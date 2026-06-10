export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-base">
      <div className="max-w-content mx-auto px-6 py-8">
        <h1 className="font-display text-h1 mb-2">Design System</h1>
        <p className="font-body text-body text-text-muted mb-8">
          Visual foundations and component library – sourced directly from
          design tokens.
        </p>

        {/* Navigation tabs */}
        <div className="flex flex-wrap gap-6 border-b border-border-light mb-10">
          <a
            href="/design-system"
            className="font-body text-label uppercase tracking-label pb-3 border-b-2 border-transparent hover:text-gold-base hover:border-gold-base/40 transition-all"
          >
            Overview
          </a>
          <a
            href="/design-system/components"
            className="font-body text-label uppercase tracking-label pb-3 border-b-2 border-transparent hover:text-gold-base hover:border-gold-base/40 transition-all"
          >
            Components
          </a>
          <a
            href="/design-system/colors"
            className="font-body text-label uppercase tracking-label pb-3 border-b-2 border-transparent hover:text-gold-base hover:border-gold-base/40 transition-all"
          >
            Colors
          </a>
          <a
            href="/design-system/typography"
            className="font-body text-label uppercase tracking-label pb-3 border-b-2 border-transparent hover:text-gold-base hover:border-gold-base/40 transition-all"
          >
            Typography
          </a>
          <a
            href="/design-system/spacing"
            className="font-body text-label uppercase tracking-label pb-3 border-b-2 border-transparent hover:text-gold-base hover:border-gold-base/40 transition-all"
          >
            Spacing
          </a>
          <a
            href="/design-system/shadows"
            className="font-body text-label uppercase tracking-label pb-3 border-b-2 border-transparent hover:text-gold-base hover:border-gold-base/40 transition-all"
          >
            Shadows
          </a>
        </div>

        {children}
      </div>
    </div>
  );
}
