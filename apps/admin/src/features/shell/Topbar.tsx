'use client';

import { Avatar, Button } from '@nexus/ui';
import { signOut, useSession } from 'next-auth/react';

import { Breadcrumb } from './Breadcrumb';

interface TopbarProps {
  title?: string;
}

export function Topbar({ title }: TopbarProps) {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="border-b border-border-default bg-surface-default/80 backdrop-blur supports-[backdrop-filter]:bg-surface-default/60">
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
        <div className="min-w-0">
          <Breadcrumb />
          {title && <h1 className="mt-2 text-2xl font-semibold tracking-tight text-text-heading">{title}</h1>}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 rounded-full border border-border-default bg-surface-base px-3 py-1.5 text-sm text-text-muted md:flex">
            <Avatar name={user?.name ?? user?.email ?? 'Admin'} size="sm" variant="gold" />
            <div className="leading-tight">
              <div className="font-medium text-text-primary">{user?.name ?? user?.email ?? 'Admin user'}</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-text-subtle">{user?.role ?? 'viewer'}</div>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              void signOut({ callbackUrl: '/login' });
            }}
          >
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}
