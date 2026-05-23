// apps/web/src/app/[locale]/components/page.tsx
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
];

export default function ComponentsIndexPage() {
  return (
    <div className="min-h-screen bg-surface-base py-space-24">
      <div className="content-width overflow-hidden m-space-16">
        <h1 className="font-display text-h1 mb-space-32">
          Nexus Component Library
        </h1>
        <p className="font-body text-body text-text-muted mb-space-12 max-w-2xl">
          All 117+ components organised by category. Each page demonstrates
          every component in that category with live examples and code snippets.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/components/${cat.slug}`}
              className="group block p-space-6 bg-surface-elevated border border-border-light rounded-md hover:border-gold-base transition-all"
            >
              <h2 className="font-display text-h3 mb-space-2 group-hover:text-gold-base transition-colors">
                {cat.name}
              </h2>
              <p className="font-body text-caption uppercase tracking-wide text-text-muted">
                {cat.count} component{cat.count !== 1 ? 's' : ''}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
