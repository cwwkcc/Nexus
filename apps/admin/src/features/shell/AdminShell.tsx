'use client';

import type { ReactNode } from 'react';

import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface AdminShellProps {
  children: ReactNode;
  title?: string;
}

export function AdminShell({ children, title }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-surface-base text-text-primary">
      <div className="mx-auto flex min-h-screen max-w-[1800px]">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar title={title} />
          <main className="flex-1 overflow-x-hidden p-4 md:p-6 xl:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
