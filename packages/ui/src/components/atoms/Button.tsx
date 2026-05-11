// components/atoms/Button.tsx
'use client';

import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Spinner } from './Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type Props = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

const base =
  'inline-flex items-center justify-center gap-space-2 font-body text-label uppercase tracking-label rounded-sm border transition-all duration-fast ease-snap select-none ' +
  'focus-visible:outline-2 focus-visible:outline-gold-base focus-visible:outline-offset-[3px]';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-green-base text-text-inverse border-transparent hover:bg-green-hover active:bg-gold-active',
  secondary:
    'bg-surface-base text-text-primary border-green-base hover:border-gold-hover hover:text-gold-hover active:border-gold-active active:text-gold-active',
  ghost:
    'bg-transparent text-gold-base border-gold-base hover:border-gold-hover hover:text-gold-hover active:border-gold-active active:text-gold-active',
};

const sizes: Record<ButtonSize, string> = {
  lg: 'px-space-5 py-space-4',
  md: 'px-space-4 py-space-3',
  sm: 'px-space-3 py-space-2',
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      children,
      onClick,
      type = 'button',
      className,
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        aria-busy={loading}
        className={clsx(
          base,
          variants[variant],
          sizes[size],
          isDisabled && 'opacity-40 cursor-not-allowed pointer-events-none',
          !isDisabled && 'cursor-pointer',
          className,
        )}
      >
        {loading && <Spinner />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
