'use client';

import { forwardRef } from 'react';
import { cn } from '../../utilities/cn';
import { useFormField } from '../../hooks/useFormField';

type Option = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  options: Option[];
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  name?: string;
  className?: string;
};

const selectBase =
  'w-full font-body text-body text-text-primary bg-surface-elevated ' +
  'border rounded-sm px-space-4 py-space-3 ' +
  'transition-all duration-fast ease-snap ' +
  'appearance-none cursor-pointer ' +
  'disabled:bg-surface-deep disabled:text-text-muted disabled:cursor-not-allowed ' +
  'focus-visible:outline-2 focus-visible:outline-gold-base focus-visible:outline-offset-[3px]';

export const Select = forwardRef<HTMLSelectElement, Props>(
  (
    {
      label,
      options,
      helperText,
      error,
      disabled = false,
      required = false,
      placeholder,
      value,
      defaultValue,
      onChange,
      onBlur,
      name,
      className,
    },
    ref,
  ) => {
    const { id, errorId, helperId, hasError, describedBy } = useFormField({
      error,
      helperText,
    });

    return (
      <div className={cn('flex flex-col gap-space-2', className)}>
        <label
          htmlFor={id}
          className="font-body text-label text-text-primary uppercase tracking-label"
        >
          {label}
          {required && (
            <span
              className="ml-space-1 text-semantic-error-base"
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={id}
            name={name}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            required={required}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            className={cn(
              selectBase,
              hasError
                ? 'border-semantic-error-base focus-visible:border-semantic-error-base focus-visible:outline-semantic-error-base'
                : 'border-border-default hover:border-border-default focus-visible:border-gold-base',
            )}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-space-4 flex items-center">
            <svg
              className="w-4 h-4 text-text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                d="M6 9l6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {hasError && (
          <p
            id={errorId}
            className="font-body text-caption text-semantic-error-base"
            role="alert"
          >
            {error}
          </p>
        )}
        {!hasError && helperText && (
          <p id={helperId} className="font-body text-caption text-text-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
