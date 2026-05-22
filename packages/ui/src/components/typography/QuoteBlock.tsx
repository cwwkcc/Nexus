// ════════════════════════════════════════════════════════════
// QUOTE BLOCK
// ════════════════════════════════════════════════════════════

export type QuoteBlockVariant = 'pull-quote' | 'ceremonial';

export interface QuoteBlockProps {
  variant?: QuoteBlockVariant;
  quote: string;
  attribution?: string;
  className?: string;
}

export function QuoteBlock({
  variant = 'pull-quote',
  quote,
  attribution,
  className,
}: QuoteBlockProps) {
  if (variant === 'ceremonial') {
    return (
      <div style={{ textAlign: 'center', padding: '40px 24px' }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
            fontStyle: 'italic',
            color: 'var(--color-gold-base)',
            lineHeight: 1.4,
            letterSpacing: '0.02em',
            maxWidth: '680px',
            margin: '0 auto',
          }}
        >
          &ldquo;{quote}&rdquo;
        </p>
        {attribution && (
          <>
            <div
              style={{
                width: '32px',
                height: '1px',
                background: 'var(--color-gold-base)',
                margin: '20px auto',
              }}
            />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--text-muted)',
              }}
            >
              {attribution}
            </p>
          </>
        )}
      </div>
    );
  }

  // Pull quote (default)
  return (
    <blockquote
      style={{
        margin: 0,
        padding: '4px 0 4px 24px',
        borderLeft: '3px solid var(--color-gold-base)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.1rem, 2vw, 1.45rem)',
          fontStyle: 'italic',
          color: 'var(--text-muted)',
          lineHeight: 1.55,
          letterSpacing: '0.01em',
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      {attribution && (
        <cite
          style={{
            display: 'block',
            marginTop: '12px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--color-gold-base)',
            fontStyle: 'normal',
          }}
        >
          {attribution}
        </cite>
      )}
    </blockquote>
  );
}
