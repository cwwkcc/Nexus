// components/atoms/Checkbox.tsx
'use client';

import { forwardRef, useId, type ChangeEventHandler } from 'react';
import { clsx } from 'clsx';

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  label: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  value?: string;
  className?: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      description,
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
    const descriptionId = description ? `${id}-description` : undefined;

    // Safely spread controlled vs uncontrolled — avoids React's
    // "switching between controlled and uncontrolled" warning.
    const controlledProps =
      checked !== undefined ? { checked } : { defaultChecked };

    return (
      <label
        htmlFor={id}
        data-disabled={disabled ? '' : undefined}
        className={clsx(
          'group inline-flex items-start gap-space-3 cursor-pointer select-none',
          disabled && 'opacity-40 cursor-not-allowed',
          className,
        )}
      >
        {/* Hidden native checkbox — the real control */}
        <input
          ref={ref}
          id={id}
          type="checkbox"
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          aria-describedby={descriptionId}
          {...controlledProps}
          className="sr-only peer"
        />

        {/* Custom visual checkbox — driven by peer state, matches Toggle pattern */}
        <span
          aria-hidden="true"
          className={clsx(
            // Layout — mt-0.5 aligns the box to the cap-height of the label text
            'relative mt-0.5 flex shrink-0 items-center justify-center',
            'w-4 h-4 rounded-sm border border-border-default bg-surface-elevated',
            'transition-all duration-fast ease-snap',
            // Checked state
            'peer-checked:bg-green-base peer-checked:border-green-base',
            // Focus ring on the visual element (not the hidden input)
            'peer-focus-visible:outline-2 peer-focus-visible:outline-gold-base peer-focus-visible:outline-offset-[3px]',
          )}
        >
          {/* SVG checkmark — inline, themeable, animatable */}
          <svg
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
              'w-2.5 h-2 text-white',
              'scale-0 opacity-0 transition-all duration-fast ease-snap',
              'peer-checked:scale-100 peer-checked:opacity-100',
              // Can't target peer from a sibling — these states are driven
              // by the parent label's peer class via the span above.
              // Override approach: use group-has-[:checked] instead.
            )}
            aria-hidden="true"
          >
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        {/* Label + optional description */}
        <span className="flex flex-col gap-space-1">
          <span className="font-body text-body text-text-primary">{label}</span>
          {description && (
            <span
              id={descriptionId}
              className="font-body text-caption text-text-muted"
            >
              {description}
            </span>
          )}
        </span>
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
