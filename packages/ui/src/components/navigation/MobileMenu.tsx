'use client';

import { useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MobileNavItem {
  label: string;
  href?: string;
  children?: MobileNavItem[];
}

export interface MobileMenuProps {
  items: MobileNavItem[];
  isOpen: boolean;
  onClose: () => void;
  /** Active pathname for highlighting */
  currentPath?: string;
}

// ─── Sub-level panel ──────────────────────────────────────────────────────────

interface SubPanelProps {
  item: MobileNavItem;
  onBack: () => void;
  onClose: () => void;
  currentPath?: string;
}

function SubPanel({ item, onBack, onClose, currentPath }: SubPanelProps) {
  return (
    <div
      role="dialog"
      aria-label={item.label}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--color-green-base)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'kcc-submenu-slide-in 0.22s var(--ease-out, cubic-bezier(0,0,0.2,1)) both',
      }}
    >
      {/* Sub-panel header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          gap: '12px',
        }}
      >
        <button
          onClick={onBack}
          aria-label="Back"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(245,239,228,0.6)',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            transition: 'color 0.15s ease',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-gold-base)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(245,239,228,0.6)')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 500,
            color: 'var(--text-inverse)',
            marginLeft: '4px',
          }}
        >
          {item.label}
        </span>
      </div>

      {/* Sub-links */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {item.children?.map((child, idx) => {
            const isActive = currentPath === child.href;
            return (
              <li key={idx}>
                <a
                  href={child.href ?? '#'}
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 24px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: isActive ? 'var(--color-gold-base)' : 'rgba(245,239,228,0.85)',
                    textDecoration: 'none',
                    borderLeft: isActive ? '2px solid var(--color-gold-base)' : '2px solid transparent',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (!isActive) el.style.color = 'var(--text-inverse)';
                    if (!isActive) el.style.borderLeftColor = 'rgba(201,151,58,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (!isActive) el.style.color = 'rgba(245,239,228,0.85)';
                    if (!isActive) el.style.borderLeftColor = 'transparent';
                  }}
                >
                  {child.label}
                  {child.children && child.children.length > 0 && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

// ─── Main MobileMenu ───────────────────────────────────────────────────────────

export function MobileMenu({ items, isOpen, onClose, currentPath }: MobileMenuProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<MobileNavItem | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Trap focus and handle Escape
  useEffect(() => {
    if (!isOpen) {
      setActiveSubmenu(null);
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeSubmenu) setActiveSubmenu(null);
        else onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, activeSubmenu, onClose]);

  return (
    <>
      <style>{`
        @keyframes kcc-drawer-slide-in {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        @keyframes kcc-drawer-slide-out {
          from { transform: translateX(0); }
          to   { transform: translateX(100%); }
        }
        @keyframes kcc-submenu-slide-in {
          from { transform: translateX(32px); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .kcc-mobile-drawer, .kcc-submenu { animation: none !important; }
        }
      `}</style>

      {/* Backdrop */}
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(28,26,22,0.6)',
            zIndex: 199,
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        className="kcc-mobile-drawer"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(320px, 90vw)',
          background: 'var(--color-green-base)',
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          animation: isOpen ? 'kcc-drawer-slide-in 0.28s var(--ease-out, cubic-bezier(0,0,0.2,1)) both' : undefined,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 500,
              color: 'var(--color-gold-base)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Menu
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
              cursor: 'pointer',
              color: 'rgba(245,239,228,0.7)',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'rgba(255,255,255,0.08)';
              el.style.color = 'var(--text-inverse)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'none';
              el.style.color = 'rgba(245,239,228,0.7)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {/* Root list */}
          <ul style={{ listStyle: 'none', padding: '12px 0', margin: 0 }}>
            {items.map((item, idx) => {
              const hasChildren = item.children && item.children.length > 0;
              const isActive = !hasChildren && currentPath === item.href;
              return (
                <li key={idx}>
                  {hasChildren ? (
                    <button
                      onClick={() => setActiveSubmenu(item)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '16px 24px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.2rem',
                        fontWeight: 500,
                        color: 'var(--text-inverse)',
                        textAlign: 'left',
                        borderLeft: '2px solid transparent',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.color = 'var(--color-gold-base)';
                        el.style.borderLeftColor = 'var(--color-gold-base)';
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.color = 'var(--text-inverse)';
                        el.style.borderLeftColor = 'transparent';
                      }}
                    >
                      {item.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  ) : (
                    <a
                      href={item.href ?? '#'}
                      onClick={onClose}
                      style={{
                        display: 'block',
                        padding: '16px 24px',
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.2rem',
                        fontWeight: 500,
                        color: isActive ? 'var(--color-gold-base)' : 'var(--text-inverse)',
                        textDecoration: 'none',
                        borderLeft: isActive ? '2px solid var(--color-gold-base)' : '2px solid transparent',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        if (!isActive) el.style.color = 'var(--color-gold-base)';
                        if (!isActive) el.style.borderLeftColor = 'rgba(201,151,58,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        if (!isActive) el.style.color = 'var(--text-inverse)';
                        if (!isActive) el.style.borderLeftColor = 'transparent';
                      }}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Submenu overlay */}
          {activeSubmenu && <SubPanel item={activeSubmenu} onBack={() => setActiveSubmenu(null)} onClose={onClose} currentPath={currentPath} />}
        </nav>

        {/* Footer strip */}
        <div
          style={{
            padding: '20px 24px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            flexShrink: 0,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(245,239,228,0.3)',
              textAlign: 'center',
            }}
          >
            C.W.W. Kannangara Central College
          </p>
        </div>
      </div>
    </>
  );
}
