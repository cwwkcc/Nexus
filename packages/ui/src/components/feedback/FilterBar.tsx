export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export type FilterBarVariant = 'category-tabs' | 'year-selector';

export interface FilterBarProps {
  variant?: FilterBarVariant;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  /** Optional "All" label — shown as first tab when provided */
  allLabel?: string;
}

export function FilterBar({
  variant = 'category-tabs',
  options,
  value,
  onChange,
  allLabel,
}: FilterBarProps) {
  const allOption: FilterOption | null = allLabel
    ? { value: '', label: allLabel }
    : null;
  const allOptions = allOption ? [allOption, ...options] : options;

  if (variant === 'year-selector') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        {allOptions.map((opt) => {
          const isActive = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                padding: '6px 16px',
                border: '1px solid',
                borderColor: isActive
                  ? 'var(--color-green-base)'
                  : 'var(--border-default)',
                background: isActive
                  ? 'var(--color-green-base)'
                  : 'transparent',
                color: isActive ? '#fff' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                borderRadius: '2px',
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  }

  // Category tabs (default)
  return (
    <div
      style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-light)',
        gap: 0,
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      {allOptions.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              padding: '12px 20px',
              border: 'none',
              borderBottom: isActive
                ? '2px solid var(--color-green-base)'
                : '2px solid transparent',
              background: isActive ? 'var(--surface-default)' : 'transparent',
              color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {opt.label}
            {opt.count !== undefined && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '18px',
                  height: '18px',
                  padding: '0 5px',
                  borderRadius: '999px',
                  background: isActive
                    ? 'var(--color-green-base)'
                    : 'var(--surface-deep)',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.58rem',
                  letterSpacing: 0,
                }}
              >
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
