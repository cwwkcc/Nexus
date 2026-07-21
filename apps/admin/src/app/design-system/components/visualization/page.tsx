'use client';

import { ComparisonBar, DataTable, ProgressArc, ResultsDisplay, StreamComparisonTable, StudentJourneyFlow, TimetableGrid } from '@nexus/ui';

import { DemoSection } from '../_components/DemoSection';

export default function VisualizationPage() {
  const sampleColumns = [
    { key: 'name' as const, header: 'Name', sortable: true },
    { key: 'grade' as const, header: 'Grade', sortable: true },
    { key: 'attendance' as const, header: 'Attendance (%)' },
  ];
  const sampleData = [
    { name: 'Kusal Perera', grade: 'A', attendance: 95 },
    { name: 'Nimal Silva', grade: 'B', attendance: 82 },
    { name: 'Amali Fernando', grade: 'A', attendance: 98 },
  ];

  const sampleStreams = [
    {
      stream1: 'Physical Science',
      stream2: 'Biological Science',
      subjectOverlap: ['Chemistry', 'Physics'],
      subjectDifferences: [
        { subject: 'Combined Mathematics', inStream1: true, inStream2: false },
        { subject: 'Biology', inStream1: false, inStream2: true },
      ],
      recommendedFor: 'Students deciding between engineering and medicine-oriented pathways',
    },
    {
      stream1: 'Commerce',
      stream2: 'Arts',
      subjectOverlap: ['Economics'],
      subjectDifferences: [
        { subject: 'Accounting', inStream1: true, inStream2: false },
        { subject: 'Political Science', inStream1: false, inStream2: true },
      ],
      recommendedFor: 'Students weighing business-focused careers against humanities pathways',
    },
  ];

  const sampleSubjects = [
    { name: 'Mathematics', grade: 'A' },
    { name: 'Physics', grade: 'A' },
    { name: 'Chemistry', grade: 'B' },
  ];

  const sampleJourneyNodes = [
    { id: 'grade10', label: 'Grade 10', position: { x: 100, y: 100 } },
    { id: 'grade11', label: 'Grade 11', position: { x: 300, y: 100 } },
    { id: 'al', label: 'A/L', position: { x: 500, y: 100 } },
  ];
  const sampleEdges = [
    { from: 'grade10', to: 'grade11' },
    { from: 'grade11', to: 'al' },
  ];

  const sampleTimetable = [
    {
      period: '1',
      time: '8:00-9:00',
      monday: 'Math',
      tuesday: 'Science',
      wednesday: 'English',
      thursday: 'History',
      friday: 'ICT',
    },
    {
      period: '2',
      time: '9:00-10:00',
      monday: 'Science',
      tuesday: 'Math',
      wednesday: 'ICT',
      thursday: 'English',
      friday: 'Science',
    },
  ];

  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Data Visualization</h1>
        <p className="font-body text-body text-text-muted mb-space-12">Charts, tables, comparison bars, progress arcs, and flow diagrams.</p>

        <DemoSection title="ComparisonBar">
          <ComparisonBar label="Pass Rate" value={85} targetValue={90} />
          <ComparisonBar label="Attendance" value={72} size="lg" className="w-64" />
        </DemoSection>

        <DemoSection title="ProgressArc">
          <ProgressArc value={75} size={100} variant="green" label="Completion" />
          <ProgressArc value={45} size={100} variant="gold" showPercentage />
        </DemoSection>

        <DemoSection title="DataTable">
          <DataTable columns={sampleColumns} data={sampleData} />
        </DemoSection>

        <DemoSection title="ResultsDisplay">
          <ResultsDisplay studentName="Kusal Perera" indexNumber="12345" examType="OL" year={2025} subjects={sampleSubjects} pdfUrl="/results/sample.pdf" />
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
