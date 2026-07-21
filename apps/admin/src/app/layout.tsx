// apps/admin/src/app/layout.tsx

// Root layout for the admin panel.
// Nav links updated to reflect the new /content routing structure.

import './global.css';
import { adminFontVariables } from '@nexus/config/fonts';
import { cn, BackToTopButton } from '@nexus/ui';

export const metadata = {
  title: 'Nexus Admin',
  description: 'Admin panel for Nexus',
};

// const navLinks = [
//   { href: '/', label: 'Dashboard' },
//   { href: '/content', label: 'Content' },
//   // Future nav items:
//   // { href: '/settings', label: 'Site Settings' },
//   // { href: '/global', label: 'Global Content' },
// ];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn('min-w-size-64 bg-slate-950 text-slate-100', adminFontVariables.join(' '))}>
        {children}

        <BackToTopButton />
      </body>
    </html>
  );
}
