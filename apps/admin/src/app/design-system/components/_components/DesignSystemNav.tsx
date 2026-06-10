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

export function DesignSystemNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Design system sections"
      className="flex flex-wrap gap-space-6 border-b border-border-light mb-space-10"
    >
      {navItems.map(({ href, label, exact }) => {
        const isActive = exact ? pathname === href : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={[
              'font-body text-label uppercase tracking-label pb-space-3',
              'border-b-2 transition-all duration-fast ease-out',
              isActive
                ? 'text-gold-base border-gold-base'
                : 'border-transparent text-text-muted hover:text-gold-base hover:border-gold-base/40',
            ].join(' ')}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
