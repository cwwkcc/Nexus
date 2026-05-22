// apps/web/src/app/[locale]/components/visualization/page.tsx
'use client';

import {
  ComparisonBar,
  DataTable,
  ProcessSteps,
  ProgressArc,
  ResultsDisplay,
  StreamComparisonTable,
  StudentJourneyFlow,
  TimetableGrid,
} from '@nexus/ui';

function DemoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12">
      <h2 className="font-display text-h2 mb-4 border-b border-border-light pb-2">
        {title}
      </h2>
      <div className="flex flex-wrap gap-6 items-start">{children}</div>
    </div>
  );
}

export default function VisualizationPage() {
  const sampleColumns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'grade', header: 'Grade' },
  ];
  const sampleData = [{ name: 'John Doe', grade: 'A' }];

  const sampleSteps = [
    { id: '1', number: 1, title: 'Step 1', description: 'First step' },
    { id: '2', number: 2, title: 'Step 2', description: 'Second step' },
  ];

  const sampleSubjects = [
    { name: 'Mathematics', grade: 'A' },
    { name: 'Science', grade: 'B' },
  ];

  const sampleStreams = [
    {
      id: 'science',
      name: 'Science',
      subjects: ['Physics', 'Chemistry'],
      careerPaths: ['Doctor', 'Engineer'],
      entryRequirements: 'High marks',
      passRate: 98,
    },
  ];

  const sampleJourneyNodes = [
    { id: '1', label: 'Grade 10', position: { x: 100, y: 100 } },
    { id: '2', label: 'Grade 11', position: { x: 300, y: 100 } },
  ];
  const sampleEdges = [{ from: '1', to: '2' }];

  const sampleTimetable = [
    { period: '1', time: '8:00-9:00', monday: 'Math', tuesday: 'Science' },
  ];

  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">Data Visualization</h1>
        <p className="font-body text-body text-text-muted mb-12">
          Charts, tables, timetables, results displays and flow diagrams.
        </p>

        <DemoSection title="ComparisonBar">
          <ComparisonBar label="Pass Rate" value={85} targetValue={90} />
        </DemoSection>

        <DemoSection title="DataTable">
          <DataTable columns={sampleColumns} data={sampleData} />
        </DemoSection>

        <DemoSection title="ProcessSteps">
          <ProcessSteps steps={sampleSteps} />
        </DemoSection>

        <DemoSection title="ProgressArc">
          <ProgressArc value={75} size={100} />
        </DemoSection>

        <DemoSection title="ResultsDisplay">
          <ResultsDisplay
            studentName="Kusal Perera"
            indexNumber="12345"
            examType="OL"
            year={2025}
            subjects={sampleSubjects}
          />
        </DemoSection>

        <DemoSection title="StreamComparisonTable">
          <StreamComparisonTable streams={sampleStreams} />
        </DemoSection>

        <DemoSection title="StudentJourneyFlow">
          <StudentJourneyFlow nodes={sampleJourneyNodes} edges={sampleEdges} />
        </DemoSection>

        <DemoSection title="TimetableGrid">
          <TimetableGrid entries={sampleTimetable} />
        </DemoSection>
      </div>
    </div>
  );
}
