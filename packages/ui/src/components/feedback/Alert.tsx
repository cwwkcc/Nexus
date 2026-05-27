// packages/ui/src/components/feedback/Alert.tsx
import { cn } from '../../utilities/cn';
import { ReactNode } from 'react';
import { InfoIcon, SuccessIcon, WarningIcon, ErrorIcon } from '../icons';
import { Heading } from '../typography/Heading';
import { Container } from '../layout/Container';
import { HStack } from '../layout/Stack';
type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertVariantStyles {
  background: string;
  border: string;
  text: string;
  icon: ReactNode;
}

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<AlertVariant, AlertVariantStyles> = {
  info: {
    background: 'bg-semantic-info-surface',
    border: 'border-semantic-info-base',
    text: 'text-semantic-info-base',
    icon: <InfoIcon />,
  },
  success: {
    background: 'bg-semantic-success-surface',
    border: 'border-semantic-success-base',
    text: 'text-semantic-success-base',
    icon: <SuccessIcon />,
  },
  warning: {
    background: 'bg-semantic-warning-surface',
    border: 'border-semantic-warning-base',
    text: 'text-semantic-warning-base',
    icon: <WarningIcon />,
  },
  error: {
    background: 'bg-semantic-error-surface',
    border: 'border-semantic-error-base',
    text: 'text-semantic-error-base',
    icon: <ErrorIcon />,
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
      className={cn(
        'p-space-4 border-l-4 rounded-r-md',
        styles.background,
        styles.border,
        className,
      )}
    >
      <HStack>
        <span className={cn('flex-shrink-0 text-lg', styles.text)}>
          {icon || styles.icon}
        </span>
        {title && (
          <Heading
            className={cn('font-display font-semibold mb-1', styles.text)}
          >
            {title}
          </Heading>
        )}
        <div className={cn('font-body text-sm', styles.text)}>{children}</div>
      </HStack>
    </div>
  );
}
