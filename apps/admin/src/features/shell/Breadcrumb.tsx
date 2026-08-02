'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const labels: Record<string, string> = {
  dashboard: 'Dashboard',
  content: 'Content',
  news: 'News',
  users: 'User Management',
  settings: 'Settings',
};

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const crumbs = segments.reduce<Array<{ href: string; label: string }>>((acc, segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    const label = labels[segment] ?? segment.replace(/-/g, ' ');

    if (index === 0 && segment === 'content') {
      acc.push({ href, label: 'Content' });
      return acc;
    }

    acc.push({ href, label: label.charAt(0).toUpperCase() + label.slice(1) });
    return acc;
  }, []);

  if (crumbs.length === 0) {
    return <div className="text-xs uppercase tracking-[0.18em] text-text-subtle">Admin</div>;
  }

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-text-subtle">
      <Link href="/" className="transition hover:text-text-primary">
        Home
      </Link>
      {crumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center gap-2">
          <span>/</span>
          {index === crumbs.length - 1 ? (
            <span className="text-text-primary">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="transition hover:text-text-primary">
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
