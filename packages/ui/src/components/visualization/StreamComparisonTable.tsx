'use client';

import { useState } from 'react';
import { clsx } from 'clsx';

export interface StreamData {
  id: string;
  name: string;
  subjects: string[];
  careerPaths: string[];
  entryRequirements: string;
  passRate: number;
}

export interface StreamComparisonTableProps {
  streams: StreamData[];
  className?: string;
}

export function StreamComparisonTable({
  streams,
  className,
}: StreamComparisonTableProps) {
  // On mobile (< 768px), show card-per-stream instead of table
  const [isMobile, setIsMobile] = useState(false);

  // Simple effect to detect mobile (in real code use useMediaQuery)
  if (typeof window !== 'undefined' && !isMobile && window.innerWidth < 768) {
    setIsMobile(true);
  }

  if (isMobile) {
    return (
      <div className="flex flex-col gap-8">
        {streams.map((stream) => (
          <div
            key={stream.id}
            className="bg-surface-elevated border border-border-light rounded-lg p-6"
          >
            <h3 className="font-display text-h3 text-gold-base mb-4">
              {stream.name}
            </h3>
            <div className="mb-4">
              <p className="font-body text-label uppercase tracking-wider text-text-muted mb-2">
                Subjects
              </p>
              <ul className="list-disc pl-5 space-y-1">
                {stream.subjects.map((s) => (
                  <li
                    key={s}
                    className="font-body text-body-sm text-text-primary"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <p className="font-body text-label uppercase tracking-wider text-text-muted mb-2">
                Career Paths
              </p>
              <ul className="list-disc pl-5 space-y-1">
                {stream.careerPaths.map((c) => (
                  <li
                    key={c}
                    className="font-body text-body-sm text-text-primary"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <p className="font-body text-label uppercase tracking-wider text-text-muted mb-2">
                Entry Requirements
              </p>
              <p className="font-body text-body-sm text-text-primary">
                {stream.entryRequirements}
              </p>
            </div>
            <div>
              <p className="font-body text-label uppercase tracking-wider text-text-muted mb-2">
                Pass Rate
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-border-light rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-base rounded-full"
                    style={{ width: `${stream.passRate}%` }}
                  />
                </div>
                <span className="font-body text-body-sm font-semibold text-gold-base">
                  {stream.passRate}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop table view
  return (
    <div className={clsx('overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-border-default">
            <th className="text-left p-4 font-body text-label uppercase tracking-wider text-text-muted">
              Stream
            </th>
            {streams.map((stream) => (
              <th
                key={stream.id}
                className="text-left p-4 font-display text-h3 text-gold-base"
              >
                {stream.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border-light">
            <td className="p-4 font-body text-label uppercase tracking-wider text-text-muted bg-surface-deep">
              Subjects
            </td>
            {streams.map((stream) => (
              <td key={stream.id} className="p-4 align-top">
                <ul className="list-disc pl-4 space-y-1">
                  {stream.subjects.map((s) => (
                    <li
                      key={s}
                      className="font-body text-body-sm text-text-primary"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
          <tr className="border-b border-border-light">
            <td className="p-4 font-body text-label uppercase tracking-wider text-text-muted bg-surface-deep">
              Career Paths
            </td>
            {streams.map((stream) => (
              <td key={stream.id} className="p-4 align-top">
                <ul className="list-disc pl-4 space-y-1">
                  {stream.careerPaths.map((c) => (
                    <li
                      key={c}
                      className="font-body text-body-sm text-text-primary"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
          <tr className="border-b border-border-light">
            <td className="p-4 font-body text-label uppercase tracking-wider text-text-muted bg-surface-deep">
              Entry Requirements
            </td>
            {streams.map((stream) => (
              <td
                key={stream.id}
                className="p-4 font-body text-body-sm text-text-primary"
              >
                {stream.entryRequirements}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-body text-label uppercase tracking-wider text-text-muted bg-surface-deep">
              Pass Rate
            </td>
            {streams.map((stream) => (
              <td key={stream.id} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-border-light rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-base rounded-full"
                      style={{ width: `${stream.passRate}%` }}
                    />
                  </div>
                  <span className="font-body text-body-sm font-semibold text-gold-base">
                    {stream.passRate}%
                  </span>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
