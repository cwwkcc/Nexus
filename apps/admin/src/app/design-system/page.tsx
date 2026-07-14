import Link from 'next/link';

const foundations = [
  {
    href: '/design-system/colors',
    label: 'Colors',
    description: 'Forest green, gold, semantic states, surfaces, overlays.',
  },
  {
    href: '/design-system/typography',
    label: 'Typography',
    description: 'Cormorant Garamond, Inter, Sinhala fonts, and the full type scale.',
  },
  {
    href: '/design-system/spacing',
    label: 'Spacing',
    description: '4px baseline scale – padding, margin, gap, and offsets.',
  },
  {
    href: '/design-system/shadows',
    label: 'Shadows',
    description: 'Seven elevation steps from flat to floating.',
  },
  {
    href: '/design-system/sizing',
    label: 'Sizing',
    description: 'Width and height tokens – component, block, layout, and viewport scales.',
  },
  {
    href: '/design-system/motion',
    label: 'Motion',
    description: 'Duration and easing tokens including ceremonial and ember curves.',
  },
  {
    href: '/design-system/glass',
    label: 'Glass',
    description: 'Translucent surface tokens for the forest-mist aesthetic.',
  },
  {
    href: '/design-system/opacity',
    label: 'Opacity',
    description: 'Opacity scale for overlays, disabled states, and fades.',
  },
  {
    href: '/design-system/blur',
    label: 'Blur',
    description: 'Blur values for glows, loading states, and image effects.',
  },
  {
    href: '/design-system/focus',
    label: 'Focus',
    description: 'Gold focus ring – color, width, and offset tokens.',
  },
  {
    href: '/design-system/aspect-ratio',
    label: 'Aspect Ratio',
    description: 'Hero 16:9, portrait 3:4, square 1:1.',
  },
  {
    href: '/design-system/z-index',
    label: 'Z‑Index',
    description: 'Stacking tiers from base to loading overlay.',
  },
];

export default function DesignSystemOverview() {
  return (
    <div>
      <p className="font-body text-body text-text-muted mb-space-8 max-w-prose">Every visual decision in Nexus flows from design tokens — the single source of truth shared across the public site and the admin panel.</p>

      {/* Components CTA */}
      <div className="mb-space-10 p-space-6 border border-gold-base rounded-md bg-surface-elevated flex items-center justify-between gap-space-6">
        <div>
          <h3 className="font-display text-h3 mb-space-1">Components</h3>
          <p className="font-body text-body-sm text-text-muted">Buttons, cards, forms, layouts — all interactive building blocks built on these tokens.</p>
        </div>
        <Link href="/design-system/components" className="shrink-0 font-body text-label tracking-label text-gold-base hover:text-gold-hover transition-colors duration-fast">
          Browse →
        </Link>
      </div>

      {/* Foundations grid */}
      <h3 className="font-display text-h3 mb-space-6 border-b border-border-light pb-space-2">Foundations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-4">
        {foundations.map((f) => (
          <Link key={f.href} href={f.href} className="group block p-space-5 border border-border-light rounded-md bg-surface-elevated hover:border-gold-base transition-all duration-fast">
            <h4 className="font-display text-h4 mb-space-1 group-hover:text-gold-base transition-colors duration-fast">{f.label}</h4>
            <p className="font-body text-body-sm text-text-muted">{f.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
