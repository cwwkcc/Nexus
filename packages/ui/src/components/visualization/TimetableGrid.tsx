'use client';

import { clsx } from 'clsx';

export interface TimetableEntry {
  period: string;
  time: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
}

export interface TimetableGridProps {
  entries: TimetableEntry[];
  className?: string;
}

export function TimetableGrid({ entries, className }: TimetableGridProps) {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <div className={clsx('overflow-x-auto', className)}>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-surface-deep border-b border-border-default">
            <th className="p-3 text-left font-body text-label uppercase tracking-wider text-text-muted">
              Period / Time
            </th>
            {days.map((day) => (
              <th
                key={day}
                className="p-3 text-left font-body text-label uppercase tracking-wider text-text-muted"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => (
            <tr
              key={entry.period}
              className={clsx(
                'border-b border-border-light',
                idx % 2 === 0 && 'bg-surface-default/50',
              )}
            >
              <td className="p-3 font-body text-body-sm text-text-primary whitespace-nowrap">
                <div>{entry.period}</div>
                <div className="text-caption text-text-muted">{entry.time}</div>
              </td>
              <td className="p-3 font-body text-body-sm text-text-primary">
                {entry.monday || '—'}
              </td>
              <td className="p-3 font-body text-body-sm text-text-primary">
                {entry.tuesday || '—'}
              </td>
              <td className="p-3 font-body text-body-sm text-text-primary">
                {entry.wednesday || '—'}
              </td>
              <td className="p-3 font-body text-body-sm text-text-primary">
                {entry.thursday || '—'}
              </td>
              <td className="p-3 font-body text-body-sm text-text-primary">
                {entry.friday || '—'}
              </td>
              <td className="p-3 font-body text-body-sm text-text-primary">
                {entry.saturday || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
