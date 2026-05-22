import { useEffect } from 'react';
export type ToastVariant = 'success' | 'error' | 'warning';

export interface ToastProps {
  variant: ToastVariant;
  message: string;
  visible: boolean;
  onDismiss: () => void;
  /** Auto-dismiss duration in ms. Default 5000. */
  duration?: number;
}

const TOAST_STYLES: Record<
  ToastVariant,
  { bg: string; border: string; text: string; icon: string }
> = {
  success: {
    bg: 'var(--semantic-success-surface, #E6F0E8)',
    border: 'var(--semantic-success-base, #3F6B4B)',
    text: 'var(--semantic-success-base, #3F6B4B)',
    icon: '✓',
  },
  error: {
    bg: 'var(--semantic-error-surface, #F6E8E5)',
    border: 'var(--semantic-error-base, #8A3B32)',
    text: 'var(--semantic-error-base, #8A3B32)',
    icon: '✕',
  },
  warning: {
    bg: 'var(--semantic-warning-surface, #FAF1DE)',
    border: 'var(--semantic-warning-base, #B07A2B)',
    text: 'var(--semantic-warning-base, #B07A2B)',
    icon: '!',
  },
};

export function Toast({
  variant,
  message,
  visible,
  onDismiss,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [visible, duration, onDismiss]);

  const s = TOAST_STYLES[variant];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 18px',
        background: s.bg,
        border: `1px solid ${s.border}`,
        boxShadow: '0 4px 20px rgba(28,26,22,0.10)',
        minWidth: '280px',
        maxWidth: '400px',
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'transform 0.3s ease, opacity 0.3s ease',
      }}
    >
      {/* Icon */}
      <span
        aria-hidden="true"
        style={{
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          border: `1.5px solid ${s.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: s.text,
          fontSize: '0.7rem',
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {s.icon}
      </span>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: s.text,
          lineHeight: 1.4,
          flex: 1,
        }}
      >
        {message}
      </p>

      <button
        onClick={onDismiss}
        aria-label="Dismiss notification"
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: s.text,
          opacity: 0.5,
          fontSize: '0.8rem',
          padding: '2px',
          lineHeight: 1,
          transition: 'opacity 0.15s ease',
          flexShrink: 0,
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.opacity = '1')
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.opacity = '0.5')
        }
      >
        ✕
      </button>
    </div>
  );
}
