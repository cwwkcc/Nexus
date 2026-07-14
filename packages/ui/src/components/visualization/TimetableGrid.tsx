// packages/ui/src/components/visualization/TimetableGrid.tsx
'use client';
import type { TimetableEntryData } from '@nexus/contracts';

import { cn } from '../../utilities/cn';

export interface TimetableGridProps {
  entries: TimetableEntryData[];
  className?: string;
}

export function TimetableGrid({ entries, className }: TimetableGridProps) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-surface-deep border-b border-border-default">
            <th className="p-space-3 text-left font-body text-label uppercase tracking-wider text-text-muted">Period / Time</th>
            {days.map((day) => (
              <th key={day} className="p-space-3 text-left font-body text-label uppercase tracking-wider text-text-muted">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => (
            <tr key={entry.period} className={cn('border-b border-border-light', idx % 2 === 0 && 'bg-surface-default/50')}>
              <td className="p-space-3 font-body text-body-sm text-text-primary whitespace-nowrap">
                <div>{entry.period}</div>
                <div className="font-body text-caption text-text-muted">{entry.time}</div>
              </td>
              <td className="p-space-3 font-body text-body-sm text-text-primary">{entry.monday || '—'}</td>
              <td className="p-space-3 font-body text-body-sm text-text-primary">{entry.tuesday || '—'}</td>
              <td className="p-space-3 font-body text-body-sm text-text-primary">{entry.wednesday || '—'}</td>
              <td className="p-space-3 font-body text-body-sm text-text-primary">{entry.thursday || '—'}</td>
              <td className="p-space-3 font-body text-body-sm text-text-primary">{entry.friday || '—'}</td>
              <td className="p-space-3 font-body text-body-sm text-text-primary">{entry.saturday || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
