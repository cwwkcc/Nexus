export type ErrorStateVariant = 'inline' | 'section';

export interface ErrorStateProps {
  variant?: ErrorStateVariant;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  variant = 'inline',
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorStateProps) {
  const isSection = variant === 'section';

  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isSection ? 'center' : 'flex-start',
        justifyContent: 'center',
        padding: isSection ? '64px 24px' : '20px 24px',
        textAlign: isSection ? 'center' : 'left',
        background: 'var(--semantic-error-surface, #F6E8E5)',
        border: '1px solid var(--semantic-error-base, #8A3B32)',
        gap: '12px',
      }}
    >
      {isSection && (
        <div
          aria-hidden="true"
          style={{
            width: '40px',
            height: '40px',
            border: '1px solid var(--semantic-error-base, #8A3B32)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--semantic-error-base, #8A3B32)',
            fontSize: '1.1rem',
            opacity: 0.7,
          }}
        >
          !
        </div>
      )}

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.88rem',
          color: 'var(--semantic-error-base, #8A3B32)',
          lineHeight: 1.6,
        }}
      >
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            padding: '8px 18px',
            border: '1px solid var(--semantic-error-base, #8A3B32)',
            background: 'transparent',
            color: 'var(--semantic-error-base, #8A3B32)',
            cursor: 'pointer',
            transition: 'background 0.15s ease, color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              'var(--semantic-error-base, #8A3B32)';
            (e.currentTarget as HTMLElement).style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.color =
              'var(--semantic-error-base, #8A3B32)';
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
