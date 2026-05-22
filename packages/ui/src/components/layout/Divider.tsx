import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
export type DividerVariant = 'horizontal' | 'gold-accent';

export interface DividerProps {
  variant?: DividerVariant;
  className?: string;
}

export function Divider({ variant = 'horizontal', className }: DividerProps) {
  if (variant === 'gold-accent') {
    return (
      <hr
        className={twMerge(
          clsx('border-gold-base flex justify-center mx-48', className),
        )}
      />
    );
  } else {
    return <hr className={twMerge(clsx('flex justify-center ', className))} />;
  }
}
