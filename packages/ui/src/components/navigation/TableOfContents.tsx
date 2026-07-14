import type { TocSectionData } from '@nexus/contracts';

export interface TableOfContentsProps {
  sections: TocSectionData[];
  /** ID of the currently visible section (passed in from parent's scroll observer) */
  activeId?: string;
  className?: string;
}

export function TableOfContents({ sections, activeId, className }: TableOfContentsProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav aria-label="Table of contents" className={className} style={{ position: 'sticky', top: '100px' }}>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'var(--text-muted)',
          marginBottom: '14px',
        }}
      >
        On this page
      </p>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <button
                onClick={() => scrollTo(section.id)}
                aria-current={isActive ? 'location' : undefined}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  borderLeft: `2px solid ${isActive ? 'var(--color-gold-base)' : 'var(--border-light)'}`,
                  padding: '6px 0 6px 14px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  color: isActive ? 'var(--color-gold-base)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'block',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                }}
              >
                {section.label}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
