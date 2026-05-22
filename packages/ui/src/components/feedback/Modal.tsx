import { useEffect } from 'react';
export type ModalVariant = 'confirmation' | 'information';

export interface ModalProps {
  variant?: ModalVariant;
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  /** Confirmation variant: primary action label */
  confirmLabel?: string;
  /** Confirmation variant: primary action callback */
  onConfirm?: () => void;
  /** Whether the primary action is destructive */
  destructive?: boolean;
  children?: React.ReactNode;
}

export function Modal({
  variant = 'information',
  open,
  onClose,
  title,
  description,
  confirmLabel = 'Confirm',
  onConfirm,
  destructive = false,
  children,
}: ModalProps) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(28,26,22,0.56)',
          zIndex: 80,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          zIndex: 90,
          transform: open
            ? 'translate(-50%, -50%) scale(1)'
            : 'translate(-50%, -48%) scale(0.97)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition:
            'transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease',
          width: 'min(520px, calc(100vw - 32px))',
          background: 'var(--surface-elevated)',
          boxShadow: '0 16px 60px rgba(28,26,22,0.18)',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            height: '3px',
            background: destructive
              ? 'var(--semantic-error-base, #8A3B32)'
              : 'var(--color-gold-base)',
          }}
        />

        <div style={{ padding: '32px 36px 36px' }}>
          <h2
            id="modal-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: '12px',
            }}
          >
            {title}
          </h2>

          {description && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                marginBottom: children ? '20px' : '28px',
              }}
            >
              {description}
            </p>
          )}

          {children && <div style={{ marginBottom: '28px' }}>{children}</div>}

          {/* Actions */}
          <div
            style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}
          >
            <button
              onClick={onClose}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                padding: '10px 24px',
                border: '1px solid var(--border-default)',
                background: 'transparent',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'border-color 0.15s ease, color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  'var(--text-muted)';
                (e.currentTarget as HTMLElement).style.color =
                  'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  'var(--border-default)';
                (e.currentTarget as HTMLElement).style.color =
                  'var(--text-muted)';
              }}
            >
              {variant === 'information' ? 'Close' : 'Cancel'}
            </button>

            {variant === 'confirmation' && (
              <button
                onClick={() => {
                  onConfirm?.();
                  onClose();
                }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  padding: '10px 24px',
                  border: 'none',
                  background: destructive
                    ? 'var(--semantic-error-base, #8A3B32)'
                    : 'var(--color-green-base)',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.opacity = '0.85')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.opacity = '1')
                }
              >
                {confirmLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
