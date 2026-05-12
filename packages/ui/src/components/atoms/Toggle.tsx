// components/atoms/Toggle.tsx
'use client';

import { forwardRef, useId } from 'react';
import { clsx } from 'clsx';

type Props = {
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  className?: string;
};

export const Toggle = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      checked,
      defaultChecked,
      disabled = false,
      onChange,
      name,
      className,
    },
    ref,
  ) => {
    const id = useId();

    return (
      <label
        htmlFor={id}
        className={clsx(
          'inline-flex items-center gap-space-3 cursor-pointer select-none',
          disabled && 'opacity-40 cursor-not-allowed',
          className,
        )}
      >
        {/* Hidden native checkbox — the real control */}
        <input
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={onChange}
          className="sr-only peer"
        />

        {/* Visual track + thumb — driven entirely by peer state */}
        <div
          className={clsx(
            'relative w-10 h-6 rounded-full border border-border-default',
            'bg-surface-deep transition-all duration-fast ease-snap',
            'peer-checked:bg-green-base peer-checked:border-green-base',
            'peer-focus-visible:outline-2 peer-focus-visible:outline-gold-base peer-focus-visible:outline-offset-[3px]',
          )}
        >
          {/* Thumb */}
          <div
            className={clsx(
              'absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm',
              'transition-transform duration-fast ease-snap',
              'peer-checked:translate-x-4',
            )}
          />
        </div>

        <span className="font-body text-body text-text-primary">{label}</span>
      </label>
    );
  },
);

Toggle.displayName = 'Toggle';
