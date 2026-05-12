// components/atoms/Checkbox.tsx
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
  value?: string;
  className?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      checked,
      defaultChecked,
      disabled = false,
      onChange,
      name,
      value,
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
        <input
          ref={ref}
          id={id}
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={onChange}
          className={clsx(
            'appearance-none w-4 h-4 rounded-sm border border-border-default bg-surface-elevated shrink-0',
            'transition-all duration-fast ease-snap',
            'checked:bg-green-base checked:border-green-base',
            'focus-visible:outline-2 focus-visible:outline-gold-base focus-visible:outline-offset-[3px]',
            // The checkmark — injected via background-image in your global CSS
            // or use a peer pattern below
            'checked:bg-[url(/icons/check.svg)] checked:bg-center checked:bg-no-repeat',
          )}
        />
        <span className="font-body text-body text-text-primary">{label}</span>
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
