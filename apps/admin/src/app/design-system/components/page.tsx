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

export default function ComponentsIndexPage() {
  return (
    <div>
      <h2 className="font-display text-h2 mb-space-2">Components</h2>
      <p className="font-body text-body text-text-muted mb-space-8 max-w-prose">
        All interactive building blocks. Each category groups components by role
        — pick a category to browse variants, props, and usage.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/design-system/components/${cat.slug}`}
            className="group block p-space-5 bg-surface-elevated border border-border-light rounded-md hover:border-gold-base transition-all duration-fast"
          >
            <h3 className="font-display text-h3 mb-space-1 group-hover:text-gold-base transition-colors duration-fast">
              {cat.name}
            </h3>
            <p className="font-body text-body-sm text-text-muted">
              {cat.count} component{cat.count !== 1 ? 's' : ''}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
