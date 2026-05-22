import { useEffect, useRef, useState, useId } from 'react';
export type DropdownMenuVariant = 'navigation' | 'filter';

export interface DropdownMenuItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface DropdownMenuProps {
  variant?: DropdownMenuVariant;
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: 'left' | 'right';
  className?: string;
}

export function DropdownMenu({
  variant = 'navigation',
  trigger,
  items,
  align = 'left',
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: variant === 'filter' ? '8px 14px' : 0,
          ...(variant === 'filter' && {
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-default)',
            background: 'var(--surface-elevated)',
          }),
        }}
      >
        {trigger}
        <span
          aria-hidden="true"
          style={{
            fontSize: '0.6rem',
            color: 'var(--color-gold-base)',
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.2s ease',
            lineHeight: 1,
          }}
        >
          ▾
        </span>
      </button>

      {open && (
        <ul
          id={id}
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            ...(align === 'right' ? { right: 0 } : { left: 0 }),
            zIndex: 40,
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
            boxShadow: '0 8px 32px rgba(28,26,22,0.12)',
            listStyle: 'none',
            padding: '4px 0',
            margin: 0,
            minWidth: '180px',
          }}
        >
          {items.map((item) => (
            <li key={item.id} role="none">
              {item.href ? (
                <a
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'block',
                    padding: '10px 18px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'background 0.12s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      'var(--surface-deep)';
                    (e.currentTarget as HTMLElement).style.color =
                      'var(--color-gold-base)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      'transparent';
                    (e.currentTarget as HTMLElement).style.color =
                      'var(--text-primary)';
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  role="menuitem"
                  onClick={() => {
                    item.onClick?.();
                    setOpen(false);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    display: 'block',
                    padding: '10px 18px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.12s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      'var(--surface-deep)';
                    (e.currentTarget as HTMLElement).style.color =
                      'var(--color-gold-base)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      'transparent';
                    (e.currentTarget as HTMLElement).style.color =
                      'var(--text-primary)';
                  }}
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
