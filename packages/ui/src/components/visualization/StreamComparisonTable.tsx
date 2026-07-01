// packages/ui/src/components/visualization/StreamComparisonTable.tsx
'use client';

import type { StreamComparisonData } from '@nexus/contracts';
import { useEffect, useState } from 'react';

import { cn } from '../../utilities/cn';

export interface StreamComparisonTableProps {
  streams: StreamComparisonData[];
  className?: string;
}

export function StreamComparisonTable({
  streams,
  className,
}: StreamComparisonTableProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col gap-space-8">
        {streams.map((stream) => (
          <div
            key={stream.id}
            className="bg-surface-elevated border border-border-light rounded-lg p-space-6"
          >
            <h3 className="font-display text-h3 text-gold-base mb-space-4">
              {stream.name}
            </h3>
            <div className="mb-space-4">
              <p className="font-body text-label uppercase tracking-wider text-text-muted mb-space-2">
                Subjects
              </p>
              <ul className="list-disc pl-space-5 space-y-space-1">
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
            <div className="mb-space-4">
              <p className="font-body text-label uppercase tracking-wider text-text-muted mb-space-2">
                Career Paths
              </p>
              <ul className="list-disc pl-space-5 space-y-space-1">
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
            <div className="mb-space-4">
              <p className="font-body text-label uppercase tracking-wider text-text-muted mb-space-2">
                Entry Requirements
              </p>
              <p className="font-body text-body-sm text-text-primary">
                {stream.entryRequirements}
              </p>
            </div>
            <div>
              <p className="font-body text-label uppercase tracking-wider text-text-muted mb-space-2">
                Pass Rate
              </p>
              <div className="flex items-center gap-space-3">
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

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-border-default">
            <th className="text-left p-space-4 font-body text-label uppercase tracking-wider text-text-muted">
              Stream
            </th>
            {streams.map((stream) => (
              <th
                key={stream.id}
                className="text-left p-space-4 font-display text-h3 text-gold-base"
              >
                {stream.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border-light">
            <td className="p-space-4 font-body text-label uppercase tracking-wider text-text-muted bg-surface-deep">
              Subjects
            </td>
            {streams.map((stream) => (
              <td key={stream.id} className="p-space-4 align-top">
                <ul className="list-disc pl-space-4 space-y-space-1">
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
            <td className="p-space-4 font-body text-label uppercase tracking-wider text-text-muted bg-surface-deep">
              Career Paths
            </td>
            {streams.map((stream) => (
              <td key={stream.id} className="p-space-4 align-top">
                <ul className="list-disc pl-space-4 space-y-space-1">
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
            <td className="p-space-4 font-body text-label uppercase tracking-wider text-text-muted bg-surface-deep">
              Entry Requirements
            </td>
            {streams.map((stream) => (
              <td
                key={stream.id}
                className="p-space-4 font-body text-body-sm text-text-primary"
              >
                {stream.entryRequirements}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-space-4 font-body text-label uppercase tracking-wider text-text-muted bg-surface-deep">
              Pass Rate
            </td>
            {streams.map((stream) => (
              <td key={stream.id} className="p-space-4">
                <div className="flex items-center gap-space-3">
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
