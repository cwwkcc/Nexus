// components/atoms/FormErrorMessage.tsx
import { type ReactNode } from 'react';
import { clsx } from 'clsx';

// ─── Types ────────────────────────────────────────────────────────────────────

type Variant = 'error' | 'warning' | 'success';

type Props = {
  id?: string;
  /**
   * Controls colour and announcement behaviour.
   * - `error` (default) — assertive alert; interrupts screen readers immediately. Best for post-submit errors.
   * - `warning` — polite live region; waits for a pause. Better for live typing feedback.
   * - `success` — polite live region; used for confirmation messages.
   */
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

// ─── Style maps ───────────────────────────────────────────────────────────────

const variantStyles: Record<Variant, string> = {
  error: 'text-error-base',
  warning: 'text-warning-base',
  success: 'text-success-base',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function FormErrorMessage({
  id,
  variant = 'error',
  children,
  className,
}: Props) {
  // `error` interrupts immediately (assertive); warning/success wait politely.
  const isAssertive = variant === 'error';

  return (
    <p
      id={id}
      role={isAssertive ? 'alert' : undefined}
      aria-live={isAssertive ? undefined : 'polite'}
      className={clsx(
        'font-body text-caption',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </p>
  );
}

FormErrorMessage.displayName = 'FormErrorMessage';
