export interface ProgressStep {
  id: string;
  label: string;
}

export type ProgressIndicatorVariant = 'steps' | 'bar';

export interface ProgressIndicatorProps {
  variant?: ProgressIndicatorVariant;
  /** Steps variant: array of step definitions */
  steps?: ProgressStep[];
  /** Steps variant: 0-based index of the active step */
  activeStep?: number;
  /** Bar variant: 0–100 */
  value?: number;
  /** Bar variant: label shown above the bar */
  label?: string;
  /** Bar variant: whether to show the percentage */
  showPercentage?: boolean;
}

export function ProgressIndicator({
  variant = 'steps',
  steps = [],
  activeStep = 0,
  value = 0,
  label,
  showPercentage = true,
}: ProgressIndicatorProps) {
  if (variant === 'bar') {
    const pct = Math.max(0, Math.min(100, value));
    return (
      <div>
        {(label || showPercentage) && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '8px',
            }}
          >
            {label && (
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                }}
              >
                {label}
              </span>
            )}
            {showPercentage && (
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-gold-base)',
                }}
              >
                {pct}%
              </span>
            )}
          </div>
        )}
        <div
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label ?? 'Progress'}
          style={{
            height: '4px',
            background: 'var(--border-light)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${pct}%`,
              background: 'var(--color-green-base)',
              borderRadius: '2px',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </div>
    );
  }

  // Steps variant
  return (
    <nav aria-label="Progress steps">
      <ol
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 0,
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {steps.map((step, idx) => {
          const isCompleted = idx < activeStep;
          const isActive = idx === activeStep;
          const isLast = idx === steps.length - 1;

          return (
            <li
              key={step.id}
              aria-current={isActive ? 'step' : undefined}
              style={{
                flex: isLast ? 'none' : 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {/* Circle */}
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                    ...(isCompleted
                      ? {
                          background: 'var(--color-green-base)',
                          color: '#fff',
                          border: '2px solid var(--color-green-base)',
                        }
                      : isActive
                        ? {
                            background: 'transparent',
                            color: 'var(--color-gold-base)',
                            border: '2px solid var(--color-gold-base)',
                          }
                        : {
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            border: '2px solid var(--border-default)',
                          }),
                  }}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>
                {/* Label */}
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.68rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    color: isCompleted
                      ? 'var(--color-green-base)'
                      : isActive
                        ? 'var(--color-gold-base)'
                        : 'var(--text-muted)',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  aria-hidden="true"
                  style={{
                    flex: 1,
                    height: '2px',
                    marginBottom: '26px', // aligns with the circle center
                    background: isCompleted
                      ? 'var(--color-green-base)'
                      : 'var(--border-light)',
                    transition: 'background 0.3s ease',
                    minWidth: '24px',
                  }}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
