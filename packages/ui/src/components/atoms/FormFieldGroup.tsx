// components/atoms/FormFieldGroup.tsx
import { type ReactNode } from 'react';
import { clsx } from 'clsx';

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  children: ReactNode;
  /**
   * Render as a `fieldset` for grouped controls (radio groups, checkbox lists).
   * When `as="fieldset"`, pass a `legend` to label the group — required for accessibility.
   * Defaults to `div`.
   */
  as?: 'div' | 'fieldset';
  /** Rendered as a `<legend>` when `as="fieldset"`. Ignored otherwise. */
  legend?: ReactNode;
  className?: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

export function FormFieldGroup({
  children,
  as: Tag = 'div',
  legend,
  className,
}: Props) {
  return (
    <Tag className={clsx('flex flex-col gap-space-6', className)}>
      {Tag === 'fieldset' && legend && (
        <legend className="font-body text-eyebrow uppercase tracking-eyebrow text-gold-base select-none">
          {legend}
        </legend>
      )}
      {children}
    </Tag>
  );
}

FormFieldGroup.displayName = 'FormFieldGroup';
