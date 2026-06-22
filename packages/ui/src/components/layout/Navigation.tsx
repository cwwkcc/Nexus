'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import { HStack } from './Stack';
import { cn } from '../../utilities/cn';
import { NavLink } from '../navigation/NavLink';

type NavVariant = 'transparent-overlay' | 'solid';

interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

interface NavigationProps {
  variant?: NavVariant;
  links?: NavLink[]; // FIX: was `NavLink` (single object) — must be NavLink[]
  /** Hero bottom offset in px — triggers solid state transition */
  heroHeight?: number;
  locale?: string;
}

interface NavDropdownProps {
  children: NavLink[];
  isSolid: boolean; // FIX: was `string` — must be boolean to match NavItemProps
}

interface NavItemProps {
  link: NavLink;
  isSolid: boolean;
  isActive: boolean;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: 'About', href: '/about' },
  {
    label: 'Academics',
    href: '/academics',
    children: [
      { label: 'Streams', href: '/academics/streams' },
      { label: 'Results', href: '/academics/results' },
    ],
  },
  { label: 'News', href: '/news' },
  { label: 'Societies', href: '/societies' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Contact', href: '/contact' },
];

function NavDropdown({ children, isSolid }: NavDropdownProps) {
  return (
    <div
      className="absolute top-full left-0 min-w-[180px] py-2"
      style={{
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border-light)',
        boxShadow: '0 8px 24px rgba(28,26,22,0.12)',
        zIndex: 50,
      }}
    >
      {children.map((child) => (
        <NavLink
          key={child.href}
          href={child.href}
          className="px-space-5 py-space-10 font-body text-body uppercase text-text-primary hover:text-gold-base"
        >
          {child.label}
        </NavLink>
      ))}
    </div>
  );
}

function NavItem({ link, isSolid, isActive }: NavItemProps) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!link.children?.length;

  const textColor = isActive
    ? 'text-gold-base'
    : isSolid
      ? 'text-text-primary'
      : 'text-text-inverse';

  return (
    <div
      className="relative"
      onMouseEnter={() => hasChildren && setOpen(true)}
      onMouseLeave={() => hasChildren && setOpen(false)}
    >
      <HStack
        align="center"
        spacing={3}
        className={cn(
          'uppercase font-body px-space-8 hover:text-gold-base',
          textColor,
        )}
      >
        <NavLink href={link.href}>
          {link.label}
          {hasChildren && <span className="text-body">▾</span>}
          {isActive && <span className="bg-gold-base" />}
        </NavLink>
      </HStack>

      {hasChildren && open && (
        <NavDropdown children={link.children!} isSolid={isSolid} />
      )}
    </div>
  );
}

// ─── Language switcher ────────────────────────────────────────────────────────

export function LanguageSwitcher({
  locale = 'en',
  isSolid = true,
}: {
  locale?: string;
  isSolid?: boolean;
}) {
  const langs = [
    { code: 'en', label: 'EN' },
    { code: 'si', label: 'සිං' },
    { code: 'ta', label: 'தமி' },
  ];

  return (
    <div className="flex items-center gap-1">
      {langs.map((lang, i) => {
        const isActive = locale === lang.code;
        return (
          <span key={lang.code} className="flex items-center gap-1">
            {i > 0 && (
              <span
                style={{
                  color: isSolid
                    ? 'var(--border-default)'
                    : 'rgba(255,255,255,0.25)',
                  fontSize: '0.6rem',
                }}
              >
                /
              </span>
            )}
            <NavLink
              href={`/${lang.code}`}
              style={{
                fontFamily:
                  lang.code === 'si' || lang.code === 'ta'
                    ? 'var(--font-sinhala, "Noto Serif Sinhala", serif)'
                    : 'var(--font-body)',
                fontSize: '0.72rem',
                letterSpacing: lang.code === 'en' ? '0.1em' : '0',
                color: isActive
                  ? 'var(--color-gold-base)'
                  : isSolid
                    ? 'var(--text-muted)'
                    : 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                borderBottom: isActive
                  ? '1px solid var(--color-gold-base)'
                  : '1px solid transparent',
                transition: 'color 0.15s ease',
                paddingBottom: '1px',
              }}
            >
              {lang.label}
            </NavLink>
          </span>
        );
      })}
    </div>
  );
}

// ─── Mobile menu ──────────────────────────────────────────────────────────────

function MobileMenu({
  open,
  links,
  onClose,
  locale,
}: {
  open: boolean;
  links: NavLink[];
  onClose: () => void;
  locale: string;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(28,26,22,0.78)',
          zIndex: 60,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(320px, 88vw)',
          background: 'var(--surface-inverse)',
          zIndex: 70,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32, 0, 0.67, 0)',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
        }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-10">
          <LanguageSwitcher locale={locale} isSolid={false} />
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.7)',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.1rem',
            }}
          >
            ✕
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1 flex-1">
          {links.map((link) => (
            <div key={link.href}>
              <NavLink
                href={link.href}
                onClick={onClose}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 5vw, 1.75rem)',
                  fontWeight: 400,
                  color: 'var(--text-inverse)',
                  textDecoration: 'none',
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                  (e.currentTarget as HTMLElement).style.color =
                    'var(--color-gold-base)';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                  (e.currentTarget as HTMLElement).style.color =
                    'var(--text-inverse)';
                }}
              >
                {link.label}
              </NavLink>
              {link.children?.map((child) => (
                <NavLink
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    padding: '6px 0 6px 16px',
                    transition: 'color 0.15s ease',
                  }}
                >
                  — {child.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.2)',
            marginTop: '24px',
          }}
        >
          C.W.W. Kannangara Central College
        </p>
      </div>
    </>
  );
}

// ─── Main Navigation ──────────────────────────────────────────────────────────

export function Navigation({
  variant = 'solid',
  links = DEFAULT_LINKS,
  heroHeight,
  locale = 'en',
}: NavigationProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isOverlay = variant === 'transparent-overlay';
  const isSolid = !isOverlay || scrolled;

  useEffect(() => {
    if (!isOverlay) return;
    const threshold = heroHeight ?? window.innerHeight * 0.7;

    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isOverlay, heroHeight]);

  const bgStyle = isSolid
    ? {
        background: 'var(--surface-base)',
        borderBottom: '1px solid var(--border-light)',
        boxShadow: scrolled ? '0 2px 16px rgba(28,26,22,0.06)' : 'none',
      }
    : {
        background: 'transparent',
        borderBottom: '1px solid transparent',
      };

  return (
    <>
      <header
        style={{
          position: isOverlay ? 'fixed' : 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          transition:
            'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
          ...bgStyle,
        }}
      >
        <div
          className="content-width"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '68px',
            gap: '40px',
          }}
        >
          {/* Logo */}
          <NavLink
            href="/"
            style={{ textDecoration: 'none', flexShrink: 0 }}
            aria-label="C.W.W. Kannangara Central College — Home"
          >
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--color-gold-base)',
                  color: 'var(--color-gold-base)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  fontStyle: 'italic',
                }}
              >
                K
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.62rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: 'var(--color-gold-base)',
                    lineHeight: 1,
                    marginBottom: '2px',
                  }}
                >
                  KCC
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.58rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: isSolid
                      ? 'var(--text-muted)'
                      : 'rgba(255,255,255,0.5)',
                    lineHeight: 1,
                  }}
                >
                  Mathugama
                </p>
              </div>
            </div>
          </NavLink>

          {/* Desktop nav links */}
          <nav
            className="hidden md:flex items-center gap-7 flex-1"
            aria-label="Main navigation"
          >
            {links.map((link) => (
              <NavItem
                key={link.href}
                link={link}
                isSolid={isSolid}
                isActive={
                  pathname === link.href || pathname.startsWith(link.href + '/')
                }
              />
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-6 ml-auto">
            <LanguageSwitcher locale={locale} isSolid={isSolid} />
            <NavLink
              href="/admissions"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                padding: '8px 20px',
                background: 'var(--color-gold-base)',
                color: '#fff',
                textDecoration: 'none',
                transition: 'background 0.2s ease',
                flexShrink: 0,
              }}
            >
              Apply
            </NavLink>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: isSolid
                    ? 'var(--text-primary)'
                    : 'rgba(255,255,255,0.85)',
                }}
              />
            ))}
          </button>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        links={links}
        onClose={() => setMobileOpen(false)}
        locale={locale}
      />
    </>
  );
}
