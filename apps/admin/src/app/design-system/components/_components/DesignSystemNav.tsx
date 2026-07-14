'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/design-system', label: 'Overview', exact: true },
  { href: '/design-system/components', label: 'Components' },
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
  { href: '/design-system/z-index', label: 'Z-Index' },
];

const componentCategories = [
  { href: '/design-system/components', label: 'All', exact: true },
  { href: '/design-system/components/atoms', label: 'Atoms' },
  { href: '/design-system/components/cards', label: 'Cards' },
  { href: '/design-system/components/effects', label: 'Effects' },
  { href: '/design-system/components/feedback', label: 'Feedback' },
  { href: '/design-system/components/forms', label: 'Forms' },
  { href: '/design-system/components/global', label: 'Global' },
  { href: '/design-system/components/icons', label: 'Icons' },
  { href: '/design-system/components/layout-components', label: 'Layout' },
  { href: '/design-system/components/media', label: 'Media' },
  { href: '/design-system/components/navigation', label: 'Navigation' },
  { href: '/design-system/components/overlays', label: 'Overlays' },
  { href: '/design-system/components/sections', label: 'Sections' },
  { href: '/design-system/components/system', label: 'System' },
  { href: '/design-system/components/typography', label: 'Typography' },
  { href: '/design-system/components/utilities', label: 'Utilities' },
  { href: '/design-system/components/visualization', label: 'Visualization' },
];

export function DesignSystemNav() {
  const pathname = usePathname();
  const isInComponents = pathname.startsWith('/design-system/components');

  return (
    <div>
      {/* Main navigation */}
      <nav aria-label="Design system sections" className="flex flex-wrap gap-space-6 border-b border-border-light mb-space-6">
        {navItems.map(({ href, label, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);

          return (
            <Link key={href} href={href} aria-current={isActive ? 'page' : undefined} className={['font-body text-label uppercase tracking-label pb-space-3', 'border-b-2 transition-all duration-fast ease-out', isActive ? 'text-gold-base border-gold-base' : 'border-transparent text-text-muted hover:text-gold-base hover:border-gold-base/40'].join(' ')}>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Sub-navigation for Components section */}
      {isInComponents && (
        <nav aria-label="Component categories" className="flex flex-wrap gap-space-4 border-b border-border-light mb-space-8 pb-space-2">
          {componentCategories.map(({ href, label, exact }) => {
            const isActive = exact ? pathname === href : pathname.startsWith(href);

            return (
              <Link key={href} href={href} aria-current={isActive ? 'page' : undefined} className={['font-body text-caption uppercase tracking-caption pb-space-2', 'border-b-2 transition-all duration-fast ease-out', isActive ? 'text-gold-base border-gold-base' : 'border-transparent text-text-muted hover:text-gold-base hover:border-gold-base/40'].join(' ')}>
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
