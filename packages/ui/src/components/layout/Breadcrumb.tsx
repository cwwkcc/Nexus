import Link from 'next/link';

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Light variant for use on dark hero backgrounds */
  onDark?: boolean;
}

export function Breadcrumb({ items, onDark = false }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '6px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li
              key={i}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {i > 0 && (
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6rem',
                    color: onDark
                      ? 'rgba(255,255,255,0.3)'
                      : 'var(--text-muted)',
                  }}
                >
                  ›
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.68rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: isLast
                      ? onDark
                        ? 'rgba(255,255,255,0.85)'
                        : 'var(--text-primary)'
                      : onDark
                        ? 'rgba(255,255,255,0.45)'
                        : 'var(--text-muted)',
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.68rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: onDark
                      ? 'rgba(255,255,255,0.45)'
                      : 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = onDark
                      ? 'rgba(255,255,255,0.85)'
                      : 'var(--color-gold-base)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = onDark
                      ? 'rgba(255,255,255,0.45)'
                      : 'var(--text-muted)')
                  }
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
