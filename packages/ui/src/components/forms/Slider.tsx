// packages/ui/src/components/forms/Slider.tsx
'use client';

import { useRef, useState } from 'react';
import { clsx } from 'clsx';

export interface SliderProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  showValue?: boolean;
  showMarks?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 50,
  onChange,
  showValue = true,
  showMarks = false,
  disabled = false,
  className,
}: SliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value !== undefined ? value : internalValue;
  const percentage = ((currentValue - min) / (max - min)) * 100;
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleChange = (newValue: number) => {
    const clamped = Math.min(max, Math.max(min, newValue));
    if (value === undefined) setInternalValue(clamped);
    onChange?.(clamped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    let delta = 0;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') delta = step;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') delta = -step;
    if (e.key === 'Home') delta = min - currentValue;
    if (e.key === 'End') delta = max - currentValue;
    if (delta !== 0) {
      e.preventDefault();
      handleChange(currentValue + delta);
    }
  };

  return (
    <div className={clsx('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <label className="font-body text-label uppercase tracking-wide text-text-primary">
              {label}
            </label>
          )}
          {showValue && (
            <span className="font-body text-label text-gold-base">
              {currentValue}
              {max === 100 ? '%' : ''}
            </span>
          )}
        </div>
      )}

      <div
        ref={sliderRef}
        className={clsx(
          'relative w-full h-2 rounded-full bg-surface-deep cursor-pointer',
          disabled && 'opacity-40 cursor-not-allowed',
        )}
        onClick={(e) => {
          if (disabled) return;
          const rect = sliderRef.current?.getBoundingClientRect();
          if (rect) {
            const clickX = e.clientX - rect.left;
            const newValue = min + (clickX / rect.width) * (max - min);
            handleChange(Math.round(newValue / step) * step);
          }
        }}
      >
        <div
          className="absolute left-0 top-0 h-full bg-green-base rounded-full pointer-events-none"
          style={{ width: `${percentage}%` }}
        />
        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-disabled={disabled}
          onKeyDown={handleKeyDown}
          className={clsx(
            'absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-elevation-2 cursor-pointer',
            'focus-visible:outline-2 focus-visible:outline-gold-base focus-visible:outline-offset-2',
            disabled && 'cursor-not-allowed',
          )}
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>

      {showMarks && (
        <div className="flex justify-between mt-2 px-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="font-body text-caption text-text-muted">
              {min + (i * (max - min)) / 4}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
