'use client';

import { forwardRef, ElementType } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BeatLoader } from './Spinners/BeatLoader';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'destructive'
  | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

type PolymorphicProps<T extends ElementType> = {
  as?: T;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

const base =
  'relative inline-flex items-center justify-center gap-space-2 font-body text-label ' +
  'uppercase tracking-label rounded-sm border whitespace-nowrap select-none ' +
  'transition-colors transition-transform duration-fast ease-snap motion-reduce:transition-none ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-base focus-visible:ring-offset-2 ' +
  'active:scale-[0.98] motion-reduce:active:scale-100';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-green-base text-text-inverse border-transparent hover:bg-green-hover active:bg-gold-active',
  secondary:
    'bg-surface-base text-text-primary border-green-base hover:border-gold-hover hover:text-gold-hover active:border-gold-active active:text-gold-active',
  ghost:
    'bg-transparent text-gold-base border-transparent hover:border-gold-hover hover:text-gold-hover active:border-gold-active active:text-gold-active',
  outline:
    'bg-transparent text-gold-base border-gold-base hover:border-gold-hover hover:text-gold-hover active:border-gold-active active:text-gold-active',
  destructive:
    'bg-semantic-error-base text-text-inverse border-transparent hover:bg-semantic-error-base/80 active:bg-semantic-error-base/60',
  link: 'bg-transparent text-gold-base border-transparent normal-case tracking-normal underline-offset-4 hover:underline active:text-gold-active',
};

const sizes: Record<ButtonSize, string> = {
  lg: 'px-space-5 py-space-4',
  md: 'px-space-4 py-space-3',
  sm: 'px-space-3 py-space-2',
  icon: 'w-10 h-10 p-0',
};

const loaderSize: Record<ButtonSize, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
  icon: 'sm',
};

export const Button = forwardRef<HTMLElement, PolymorphicProps<ElementType>>(
  <T extends ElementType = 'button'>(
    {
      as,
      variant = 'primary',
      size = 'md',
      type = 'button',
      loading = false,
      loadingText,
      disabled = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      className,
      onClick,
      ...rest
    }: PolymorphicProps<T>,
    ref: React.ForwardedRef<HTMLElement>,
  ) => {
    const Component = as || 'button';
    const isDisabled = disabled || loading;

    if (
      process.env.NODE_ENV !== 'production' &&
      size === 'icon' &&
      !rest['aria-label']
    ) {
      console.warn(
        '[Button] size="icon" requires an aria-label for accessibility.\n' +
          'Example: <Button size="icon" aria-label="Close menu">',
      );
    }

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e as any);
    };

    return (
      <Component
        ref={ref as any}
        type={Component === 'button' ? type : undefined}
        disabled={Component === 'button' ? isDisabled : undefined}
        aria-busy={loading}
        data-variant={variant}
        data-size={size}
        data-loading={loading ? '' : undefined}
        data-disabled={isDisabled ? '' : undefined}
        data-full-width={fullWidth ? '' : undefined}
        data-icon-only={size === 'icon' ? '' : undefined}
        onClick={handleClick}
        className={twMerge(
          clsx(
            base,
            variants[variant],
            sizes[size],
            fullWidth && 'w-full',
            isDisabled && 'opacity-40 cursor-not-allowed',
            !isDisabled && 'cursor-pointer',
            className,
          ),
        )}
        {...(rest as any)}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center gap-space-2 pointer-events-none">
            <BeatLoader size={loaderSize[size]} />
            {loadingText && (
              <span className="text-label font-body">{loadingText}</span>
            )}
          </span>
        )}

        {loading && (
          <span className="sr-only" aria-live="polite">
            {loadingText ?? 'Loading'}
          </span>
        )}

        <span
          className={clsx(
            'inline-flex items-center gap-space-2',
            loading && 'opacity-0',
          )}
        >
          {leftIcon && (
            <span className="shrink-0 [&>svg]:size-[1em]">{leftIcon}</span>
          )}
          {children}
          {rightIcon && (
            <span className="shrink-0 [&>svg]:size-[1em]">{rightIcon}</span>
          )}
        </span>
      </Component>
    );
  },
);

Button.displayName = 'Button';
