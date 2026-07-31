// Admissions requirements block (F-136). Content from PageContent.
// Renders eligibility requirements grouped by grade level, with expandable
// document checklists. Designed to pair with ProcessBlock on the Admissions page.

import type { EligibilityData, RequirementData } from '@nexus/contracts';
import { Container, Heading, Text, SectionHeader, VStack, Badge, Divider } from '@nexus/ui';

/** Human-readable labels for each grade level intake. */
const GRADE_LEVEL_LABELS: Record<EligibilityData['gradeLevel'], string> = {
  'grade-6': 'Grade 6 Intake',
  'grade-10': 'Grade 10 Intake',
  'grade-12': 'Grade 12 / A-Level Intake',
  other: 'Other Intakes',
};

export interface RequirementsBlockProps {
  /** Eligibility data grouped by grade level. */
  eligibility: EligibilityData[];
  /** Section eyebrow text (e.g. "What You Need"). */
  eyebrow?: string;
  /** Section heading (e.g. "Eligibility & Requirements"). */
  heading?: string;
  /** Optional description below the heading. */
  description?: string;
  className?: string;
}

function RequirementItem({ requirement }: { requirement: RequirementData }) {
  return (
    <div className="bg-surface-elevated border border-border-light rounded-lg p-6 shadow-elevation-1">
      <Heading level="h4" className="mb-space-2">
        {requirement.title}
      </Heading>
      <Text variant="body-sm" color="muted" className="mb-space-4">
        {requirement.description}
      </Text>

      {requirement.documents && requirement.documents.length > 0 && (
        <div className="mt-space-4 pt-space-4 border-t border-border-light">
          <Text variant="caption" color="muted" className="uppercase tracking-wider mb-space-2 block">
            Required Documents
          </Text>
          <ul className="list-none p-0 m-0 space-y-space-2">
            {requirement.documents.map((doc) => (
              <li key={doc} className="flex items-center gap-space-2">
                <span className="text-green-base text-sm" aria-hidden="true">
                  ✓
                </span>
                <Text variant="body-sm">{doc}</Text>
              </li>
            ))}
          </ul>
        </div>
      )}

      {requirement.notes && (
        <Text variant="body-sm" color="muted" className="mt-space-3 italic">
          {requirement.notes}
        </Text>
      )}
    </div>
  );
}

function EligibilitySection({ data }: { data: EligibilityData }) {
  const label = GRADE_LEVEL_LABELS[data.gradeLevel];

  return (
    <VStack spacing={6}>
      <div className="flex items-center gap-space-4">
        <Heading level="h3">{label}</Heading>
        {data.cutoffMark != null && <Badge variant="accent">Cutoff: {data.cutoffMark}%</Badge>}
      </div>

      <div className="grid gap-space-6 md:grid-cols-2">
        {data.requirements.map((req) => (
          <RequirementItem key={req.id} requirement={req} />
        ))}
      </div>
    </VStack>
  );
}

export function RequirementsBlock({ eligibility, eyebrow = 'What You Need', heading = 'Eligibility & Requirements', description, className }: RequirementsBlockProps) {
  if (eligibility.length === 0) return null;

  return (
    <Container size="full" padding="md" as="section" className={className}>
      <SectionHeader eyebrow={eyebrow} title={heading} align="center" withAccentRule variant="eyebrow-title-description" description={description} marginBottom="mb-space-12" />

      <VStack spacing={12}>
        {eligibility.map((elig, idx) => (
          <div key={elig.gradeLevel}>
            <EligibilitySection data={elig} />
            {idx < eligibility.length - 1 && <Divider className="mt-space-12" />}
          </div>
        ))}
      </VStack>
    </Container>
  );
}
