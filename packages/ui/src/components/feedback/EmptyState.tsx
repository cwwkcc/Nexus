export interface EmptyStateProps {
  heading: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ heading, description, action }: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 24px',
        textAlign: 'center',
      }}
    >
      {/* Crest motif at low opacity */}
      <div
        aria-hidden="true"
        style={{
          width: '56px',
          height: '56px',
          border: '1px solid var(--border-light)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          opacity: 0.35,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontStyle: 'italic',
            color: 'var(--color-gold-base)',
          }}
        >
          K
        </span>
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.35rem',
          fontWeight: 500,
          color: 'var(--text-primary)',
          lineHeight: 1.3,
          marginBottom: '10px',
        }}
      >
        {heading}
      </h3>

      {description && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            maxWidth: '360px',
            marginBottom: action ? '24px' : 0,
          }}
        >
          {description}
        </p>
      )}

      {action && (
        <button
          onClick={action.onClick}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            padding: '10px 24px',
            border: '1px solid var(--color-gold-base)',
            background: 'transparent',
            color: 'var(--color-gold-base)',
            cursor: 'pointer',
            transition: 'background 0.15s ease, color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              'var(--color-gold-base)';
            (e.currentTarget as HTMLElement).style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.color =
              'var(--color-gold-base)';
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
