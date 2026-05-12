// components/atoms/FormFieldGroup.tsx
import { clsx } from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function FormFieldGroup({ children, className }: Props) {
  return (
    <div className={clsx('flex flex-col gap-space-6', className)}>
      {children}
    </div>
  );
}

FormFieldGroup.displayName = 'FormFieldGroup';
