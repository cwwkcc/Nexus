// components/atoms/Input.tsx
'use client';

import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { useFormField } from '../../hooks/useFormField';

type Props = {
  label: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'search' | 'url';
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  name?: string;
  autoComplete?: string;
  className?: string;
};

const inputBase =
  'w-full font-body text-body text-text-primary bg-surface-elevated ' +
  'border rounded-sm px-space-4 py-space-3 ' +
  'transition-all duration-fast ease-snap ' +
  'placeholder:text-text-muted ' +
  'disabled:bg-surface-deep disabled:text-text-muted disabled:cursor-not-allowed ' +
  'focus-visible:outline-2 focus-visible:outline-gold-base focus-visible:outline-offset-[3px]';

const inputStates = {
  default:
    'border-border-default hover:border-border-default focus-visible:border-gold-base',
  error:
    'border-error-base focus-visible:border-error-base focus-visible:outline-error-base',
};

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      helperText,
      error,
      disabled = false,
      required = false,
      placeholder,
      type = 'text',
      value,
      defaultValue,
      onChange,
      onBlur,
      name,
      autoComplete,
      className,
    },
    ref,
  ) => {
    // Stable, unique IDs — never write id="username" manually in a component library.
    // Two inputs on the same page would collide.
    const { id, errorId, helperId, hasError, describedBy } = useFormField({
      error,
      helperText,
    });

    return (
      <div className={clsx('flex flex-col gap-space-2', className)}>
        {/* Label */}
        <label
          htmlFor={id}
          className="font-body text-label text-text-primary uppercase tracking-label"
        >
          {label}
          {required && (
            <span className="ml-space-1 text-error-base" aria-hidden="true">
              *
            </span>
          )}
        </label>

        {/* Input */}
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          className={clsx(
            inputBase,
            hasError ? inputStates.error : inputStates.default,
          )}
        />

        {/* Error — takes priority over helper text */}
        {hasError && (
          <p
            id={errorId}
            className="font-body text-caption text-error-base"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper text — only shown when no error */}
        {!hasError && helperText && (
          <p id={helperId} className="font-body text-caption text-text-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
