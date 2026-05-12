// components/atoms/FormErrorMessage.tsx
import { clsx } from 'clsx';

type Props = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

export function FormErrorMessage({ id, children, className }: Props) {
  return (
    <p
      id={id}
      role="alert"
      className={clsx('font-body text-caption text-error-base', className)}
    >
      {children}
    </p>
  );
}

FormErrorMessage.displayName = 'FormErrorMessage';
