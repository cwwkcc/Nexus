// packages/ui/src/components/feedback/Alert.tsx
import { clsx } from 'clsx';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<
  AlertVariant,
  { bg: string; border: string; text: string; icon: string }
> = {
  info: {
    bg: 'bg-semantic-info-surface',
    border: 'border-semantic-info-base',
    text: 'text-semantic-info-base',
    icon: 'ℹ',
  },
  success: {
    bg: 'bg-semantic-success-surface',
    border: 'border-semantic-success-base',
    text: 'text-semantic-success-base',
    icon: '✓',
  },
  warning: {
    bg: 'bg-semantic-warning-surface',
    border: 'border-semantic-warning-base',
    text: 'text-semantic-warning-base',
    icon: '⚠',
  },
  error: {
    bg: 'bg-semantic-error-surface',
    border: 'border-semantic-error-base',
    text: 'text-semantic-error-base',
    icon: '✕',
  },
};

export function Alert({
  variant = 'info',
  title,
  children,
  icon,
  className,
}: AlertProps) {
  const styles = variantStyles[variant];

  return (
    <div
      role="alert"
      className={clsx(
        'p-4 border-l-4 rounded-r-md',
        styles.bg,
        styles.border,
        className,
      )}
    >
      <div className="flex gap-3">
        <span className={clsx('flex-shrink-0 text-lg', styles.text)}>
          {icon || styles.icon}
        </span>
        <div>
          {title && (
            <h4
              className={clsx('font-display font-semibold mb-1', styles.text)}
            >
              {title}
            </h4>
          )}
          <div className={clsx('font-body text-sm', styles.text)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
