'use client';

import Link from 'next/link';

const categories = [
  { slug: 'atoms', name: 'Atoms', count: 9 }, // Avatar, Badge, Button, ButtonLink, InlineHelpText, ResultsGradeBadge, Tag, BeatLoader, ScaleLoader
  { slug: 'cards', name: 'Cards', count: 12 },
  { slug: 'effects', name: 'Effects', count: 1 },
  { slug: 'notifications', name: 'Notifications', count: 3 }, // Alert, Modal, Toast
  { slug: 'forms', name: 'Forms', count: 17 },
  { slug: 'icons', name: 'Icons', count: 29 }, // Icon + 3 brand + 25 social icon variants
  { slug: 'layout', name: 'Layout', count: 9 },
  { slug: 'media', name: 'Media', count: 7 },
  { slug: 'navigation', name: 'Navigation', count: 10 }, // Accordion, Breadcrumb, FilterBar, LanguageSwitcher, MobileMenu, NavLink, Pagination, SearchInput, TableOfContents, Tabs
  { slug: 'overlays', name: 'Overlays', count: 4 }, // Drawer, DropDownMenu, ShareSheet, ToolTip
  { slug: 'page-states', name: 'Page States', count: 7 }, // AnnouncementBanner, CookieConsentBanner, EmptyState, ErrorState, LoadingScreen, LoadingSkeleton, NotFoundPage, OfflineBanner
  { slug: 'sections', name: 'Sections', count: 9 },
  { slug: 'typography', name: 'Typography', count: 7 }, // EyebrowLabel, Heading, InlineLink, QuoteBlock, RichTextRenderer, SectionHeader, Text
  { slug: 'utilities', name: 'Utilities', count: 3 }, // BackToTopButton, CountdownTimer, ScrollProgressBar
  { slug: 'visualization', name: 'Data Visualization', count: 8 },
];

export default function ComponentsIndexPage() {
  return (
    <div>
      <h2 className="font-display text-h2 mb-space-2">Components</h2>
      <p className="font-body text-body text-text-muted mb-space-8 max-w-prose">All interactive building blocks. Each category groups components by role — pick a category to browse variants, props, and usage.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-4">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/design-system/components/${cat.slug}`} className="group block p-space-5 bg-surface-elevated border border-border-light rounded-md hover:border-gold-base transition-all duration-fast">
            <h3 className="font-display text-h3 mb-space-1 group-hover:text-gold-base transition-colors duration-fast">{cat.name}</h3>
            <p className="font-body text-body-sm text-text-muted">
              {cat.count} component{cat.count !== 1 ? 's' : ''}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
