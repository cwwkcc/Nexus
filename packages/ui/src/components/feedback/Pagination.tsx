export interface PaginationProps {
  /** Total number of pages */
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  /** Max page buttons shown at once (default 7) */
  siblingCount?: number;
  className?: string;
}

function getPageRange(
  current: number,
  total: number,
  siblings: number,
): (number | '…')[] {
  const totalButtons = siblings * 2 + 5; // siblings + current + first + last + 2 ellipsis
  if (total <= totalButtons)
    return Array.from({ length: total }, (_, i) => i + 1);

  const leftSibling = Math.max(current - siblings, 1);
  const rightSibling = Math.min(current + siblings, total);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;

  const pages: (number | '…')[] = [1];
  if (showLeftDots) pages.push('…');
  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== total) pages.push(i);
  }
  if (showRightDots) pages.push('…');
  pages.push(total);
  return pages;
}

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageRange(currentPage, totalPages, siblingCount);

  const btnBase: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: '0.78rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    minWidth: '36px',
    height: '36px',
    padding: '0 8px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border-default)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    lineHeight: 1,
    background: 'transparent',
  };

  return (
    <nav aria-label="Pagination" className={className}>
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {/* Prev */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            style={{
              ...btnBase,
              color:
                currentPage === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
              opacity: currentPage === 1 ? 0.4 : 1,
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              background: 'var(--surface-elevated)',
            }}
          >
            ←
          </button>
        </li>

        {/* Page buttons */}
        {pages.map((page, idx) =>
          page === '…' ? (
            <li key={`dots-${idx}`} aria-hidden="true">
              <span
                style={{
                  ...btnBase,
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'default',
                }}
              >
                …
              </span>
            </li>
          ) : (
            <li key={page}>
              <button
                onClick={() => onPageChange(page as number)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
                style={{
                  ...btnBase,
                  background:
                    currentPage === page
                      ? 'var(--color-green-base)'
                      : 'var(--surface-elevated)',
                  color: currentPage === page ? '#fff' : 'var(--text-primary)',
                  borderColor:
                    currentPage === page
                      ? 'var(--color-green-base)'
                      : 'var(--border-default)',
                }}
              >
                {page}
              </button>
            </li>
          ),
        )}

        {/* Next */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            style={{
              ...btnBase,
              color:
                currentPage === totalPages
                  ? 'var(--text-muted)'
                  : 'var(--text-primary)',
              opacity: currentPage === totalPages ? 0.4 : 1,
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              background: 'var(--surface-elevated)',
            }}
          >
            →
          </button>
        </li>
      </ol>
    </nav>
  );
}
