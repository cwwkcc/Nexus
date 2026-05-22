export interface FormValidationSummaryProps {
  /** Pass `null` or `undefined` when there are no errors — component renders nothing. */
  errors?: string[] | null;
  /** Pass a success message to show the success state. */
  successMessage?: string | null;
}

export function FormValidationSummary({
  errors,
  successMessage,
}: FormValidationSummaryProps) {
  if (successMessage) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          padding: '16px 20px',
          background: 'var(--semantic-success-surface)',
          border: '1px solid var(--semantic-success-base)',
          borderLeft: '3px solid var(--semantic-success-base)',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            fontSize: '1rem',
            lineHeight: 1,
            marginTop: '1px',
            color: 'var(--semantic-success-base)',
            flexShrink: 0,
          }}
        >
          ✓
        </span>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--semantic-success-base)',
            lineHeight: 1.5,
          }}
        >
          {successMessage}
        </p>
      </div>
    );
  }

  if (!errors || errors.length === 0) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        padding: '16px 20px',
        background: 'var(--semantic-error-surface)',
        border: '1px solid var(--semantic-error-base)',
        borderLeft: '3px solid var(--semantic-error-base)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--semantic-error-base)',
          marginBottom: '10px',
        }}
      >
        Please fix {errors.length} {errors.length === 1 ? 'error' : 'errors'}{' '}
        before continuing
      </p>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {errors.map((error, idx) => (
          <li
            key={idx}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--semantic-error-base)',
              lineHeight: 1.5,
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
            }}
          >
            <span
              aria-hidden="true"
              style={{ flexShrink: 0, fontSize: '0.6rem' }}
            >
              ●
            </span>
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
}
