'use client';

import { cn } from '@nexus/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/content', label: 'Content' },
  { href: '/news', label: 'News' },
  { href: '/users', label: 'User Management', adminOnly: true },
  { href: '/settings', label: 'Settings', adminOnly: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role ?? 'viewer';

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-800 bg-slate-950/80 lg:flex lg:flex-col">
      <div className="border-b border-slate-800 px-6 py-5">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Nexus Admin</div>
        <div className="mt-2 text-xl font-semibold text-white">Operations</div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {navItems
          .filter((item) => !item.adminOnly || role === 'admin')
          .map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link key={item.href} href={item.href} className={cn('flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition', isActive ? 'bg-slate-800 text-white shadow-sm shadow-slate-950/30' : 'text-slate-300 hover:bg-slate-900 hover:text-white')}>
                <span>{item.label}</span>
              </Link>
            );
          })}
      </nav>

      <div className="border-t border-slate-800 px-5 py-4 text-xs text-slate-400">
        <div className="font-medium uppercase tracking-[0.18em] text-slate-500">Access</div>
        <div className="mt-2 capitalize">{role}</div>
      </div>
    </aside>
  );
}
