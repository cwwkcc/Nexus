// apps/admin/src/app/design-system/components/page.tsx
'use client';

import Link from 'next/link';

const categories = [
  { slug: 'accessibility', name: 'Accessibility', count: 1 },
  { slug: 'atoms', name: 'Atoms', count: 15 },
  { slug: 'cards', name: 'Cards', count: 12 },
  { slug: 'effects', name: 'Effects', count: 1 },
  { slug: 'feedback', name: 'Feedback', count: 14 },
  { slug: 'forms', name: 'Forms', count: 16 },
  { slug: 'global', name: 'Global', count: 7 },
  { slug: 'icons', name: 'Icons', count: 5 },
  { slug: 'layout-components', name: 'Layout', count: 11 },
  { slug: 'logos', name: 'Logos', count: 1 },
  { slug: 'media', name: 'Media', count: 5 },
  { slug: 'navigation', name: 'Navigation', count: 1 },
  { slug: 'sections', name: 'Sections', count: 9 },
  { slug: 'system', name: 'System', count: 4 },
  { slug: 'typography', name: 'Typography', count: 5 },
  { slug: 'utilities', name: 'Utilities', count: 2 },
  { slug: 'visualization', name: 'Data Visualization', count: 8 },
  { slug: 'test', name: 'Test', count: 1 },
];

const foundationLinks = [
  { href: '/design-system/colors', label: 'Colors' },
  { href: '/design-system/typography', label: 'Typography' },
  { href: '/design-system/spacing', label: 'Spacing' },
  { href: '/design-system/shadows', label: 'Shadows' },
  { href: '/design-system/glass', label: 'Glass' },
  { href: '/design-system/sizing', label: 'Sizing' },
  { href: '/design-system/motion', label: 'Motion' },
  { href: '/design-system/opacity', label: 'Opacity' },
  { href: '/design-system/focus', label: 'Focus' },
  { href: '/design-system/blur', label: 'Blur' },
  { href: '/design-system/aspect-ratio', label: 'Aspect Ratio' },
  { href: '/design-system/z-index', label: 'Z‑Index' },
];

export default function ComponentsIndexPage() {
  return (
    <div className="min-h-screen bg-surface-base py-space-24">
      <div className="content-width overflow-hidden m-space-16">
        <h1 className="font-display text-h1 mb-space-32">
          Nexus Design System
        </h1>
        <p className="font-body text-body text-text-muted mb-space-12 max-w-2xl">
          All foundations and components in one place.
        </p>

        {/* Foundations Section */}
        <section className="mb-space-20">
          <h2 className="font-display text-h2 mb-space-6 border-b border-border-light pb-space-2">
            Foundations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6">
            {foundationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group block p-space-6 bg-surface-elevated border border-border-light rounded-md hover:border-gold-base transition-all"
              >
                <h3 className="font-display text-h3 mb-space-2 group-hover:text-gold-base transition-colors">
                  {link.label}
                </h3>
                <p className="font-body text-caption uppercase tracking-wide text-text-muted">
                  Design tokens & usage
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Components Section */}
        <section>
          <h2 className="font-display text-h2 mb-space-6 border-b border-border-light pb-space-2">
            Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/components/${cat.slug}`}
                className="group block p-space-6 bg-surface-elevated border border-border-light rounded-md hover:border-gold-base transition-all"
              >
                <h3 className="font-display text-h3 mb-space-2 group-hover:text-gold-base transition-colors">
                  {cat.name}
                </h3>
                <p className="font-body text-caption uppercase tracking-wide text-text-muted">
                  {cat.count} component{cat.count !== 1 ? 's' : ''}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
