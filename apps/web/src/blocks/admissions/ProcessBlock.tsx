// Admissions process steps block (F-136).
// Wraps ProcessSteps visualization component. Content from PageContent.

import type { AdmissionsProcessData } from '@nexus/contracts';
import { ProcessSteps } from '@nexus/ui';

export interface ProcessBlockProps {
  data: AdmissionsProcessData;
  className?: string;
}

export function ProcessBlock({ data, className }: ProcessBlockProps) {
  return <ProcessSteps steps={data.steps} className={className} />;
}
