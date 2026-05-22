// packages/ui/src/components/forms/RequirementsChecklist.tsx
'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { Checkbox } from './Checkbox';

export interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
}

export interface RequirementsChecklistProps {
  title: string;
  items: ChecklistItem[];
  onComplete?: (completedIds: string[]) => void;
  className?: string;
}

export function RequirementsChecklist({
  title,
  items,
  onComplete,
  className,
}: RequirementsChecklistProps) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newCompleted = new Set(completed);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompleted(newCompleted);
    onComplete?.(Array.from(newCompleted));
  };

  const allRequiredComplete = items
    .filter((item) => item.required)
    .every((item) => completed.has(item.id));

  return (
    <div
      className={clsx(
        'bg-surface-elevated border border-border-light rounded-lg p-6',
        className,
      )}
    >
      <div className="mb-4 pb-4 border-b border-border-light">
        <h3 className="font-display text-h3 mb-2">{title}</h3>
        <p className="font-body text-body-sm text-text-muted">
          {allRequiredComplete
            ? '✓ All required items completed'
            : `${items.filter((i) => i.required).filter((i) => completed.has(i.id)).length}/${items.filter((i) => i.required).length} required items completed`}
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <Checkbox
              label={item.label}
              description={item.description}
              checked={completed.has(item.id)}
              onChange={() => toggleItem(item.id)}
            />
            {item.required && (
              <span className="text-xs text-error-base shrink-0">
                *Required
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Print button for PDF export */}
      <button
        onClick={() => window.print()}
        className="mt-6 w-full py-2 text-center font-body text-caption uppercase tracking-wide text-gold-base border border-gold-base rounded-sm hover:bg-gold-base hover:text-green-base transition-colors"
      >
        Print Checklist
      </button>
    </div>
  );
}
