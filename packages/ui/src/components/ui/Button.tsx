'use client';

import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md';

type Props = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

const base =
  'inline-flex items-center justify-center gap-2 font-body text-label uppercase tracking-[0.15em] rounded-sm border transition-all duration-fast ease-snap select-none';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-green-base text-text-inverse border-transparent hover:bg-green-light active:bg-gold-active',
  secondary:
    'bg-surface-base text-text-primary border-green-base hover:border-gold-hover hover:text-gold-hover active:border-gold-active active:text-gold-active',
  ghost:
    'bg-transparent text-gold-base border-gold-base hover:border-gold-hover hover:text-gold-hover active:border-gold-active active:text-gold-active',
};

const sizes: Record<ButtonSize, string> = {
  md: 'px-space-4 py-space-3',
  sm: 'px-space-3 py-space-2',
};

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
);

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
      className = '',
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
        className={[
          base,
          variants[variant],
          sizes[size],
          isDisabled
            ? 'opacity-40 cursor-not-allowed pointer-events-none'
            : 'cursor-pointer',
          className,
        ].join(' ')}
      >
        {loading ? (
          <>
            <Spinner />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
