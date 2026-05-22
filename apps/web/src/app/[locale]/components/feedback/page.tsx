// apps/web/src/app/[locale]/components/feedback/page.tsx
'use client';

import { useState } from 'react';
import {
  Accordion,
  Alert,
  Calendar,
  DropdownMenu,
  EmptyState,
  ErrorState,
  FilterBar,
  LoadingSkeleton,
  MobileMenu,
  Modal,
  Pagination,
  SearchInput,
  ShareSheet,
  TableOfContents,
  Toast,
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

export default function FeedbackPage() {
  const [toastVisible, setToastVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [calendarEvents] = useState([
    {
      id: '1',
      title: 'Sports Day',
      date: '2026-06-10',
      status: 'upcoming' as const,
    },
  ]);

  const handleSearch = async (q: string) => {
    return [{ id: '1', label: `Result for "${q}"`, href: '/search' }];
  };

  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">Feedback & Navigation</h1>
        <p className="font-body text-body text-text-muted mb-12">
          Modals, toasts, accordions, filters, and user feedback components.
        </p>

        <DemoSection title="Accordion">
          <Accordion
            items={[
              {
                id: '1',
                question: 'What is KCC?',
                answer: 'A leading central college in Sri Lanka.',
              },
              {
                id: '2',
                question: 'How to apply?',
                answer: 'Visit the admissions page.',
              },
            ]}
          />
        </DemoSection>

        <DemoSection title="Alert">
          <Alert variant="info" title="Information">
            This is an info alert.
          </Alert>
          <Alert variant="success">Success! Your action was completed.</Alert>
          <Alert variant="warning">Warning: Please check your input.</Alert>
          <Alert variant="error">Error: Something went wrong.</Alert>
        </DemoSection>

        <DemoSection title="Calendar (List View)">
          <Calendar variant="list-view" events={calendarEvents} />
        </DemoSection>

        <DemoSection title="DropdownMenu">
          <DropdownMenu
            trigger={<span>Options ▾</span>}
            items={[
              { id: '1', label: 'Edit', onClick: () => alert('Edit') },
              { id: '2', label: 'Delete', onClick: () => alert('Delete') },
            ]}
          />
        </DemoSection>

        <DemoSection title="EmptyState">
          <EmptyState
            heading="No results"
            description="Try adjusting your filters."
          />
        </DemoSection>

        <DemoSection title="ErrorState">
          <ErrorState
            variant="inline"
            message="Failed to load data."
            onRetry={() => alert('Retry')}
          />
        </DemoSection>

        <DemoSection title="FilterBar">
          <FilterBar
            variant="category-tabs"
            allLabel="All"
            value={filterValue}
            onChange={setFilterValue}
            options={[
              { value: 'news', label: 'News', count: 12 },
              { value: 'events', label: 'Events', count: 5 },
            ]}
          />
        </DemoSection>

        <DemoSection title="LoadingSkeleton">
          <LoadingSkeleton variant="card" count={2} />
        </DemoSection>

        <DemoSection title="MobileMenu (Trigger)">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="px-4 py-2 bg-green-base text-white rounded"
          >
            Open Mobile Menu
          </button>
          <MobileMenu
            items={[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              {
                label: 'Academics',
                href: '/academics',
                children: [{ label: 'Science', href: '/science' }],
              },
            ]}
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          />
        </DemoSection>

        <DemoSection title="Modal">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-green-base text-white rounded"
          >
            Open Modal
          </button>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            variant="information"
            title="Modal Title"
            description="This is a modal dialog."
          />
        </DemoSection>

        <DemoSection title="Pagination">
          <Pagination
            totalPages={10}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </DemoSection>

        <DemoSection title="SearchInput">
          <SearchInput scopeLabel="Search news" onSearch={handleSearch} />
        </DemoSection>

        <DemoSection title="ShareSheet">
          <button
            onClick={() => setShareOpen(true)}
            className="px-4 py-2 bg-green-base text-white rounded"
          >
            Open Share
          </button>
          <ShareSheet
            isOpen={shareOpen}
            onClose={() => setShareOpen(false)}
            title="Share this page"
            url="https://cwwkcc.lk"
          />
        </DemoSection>

        <DemoSection title="TableOfContents">
          <TableOfContents
            sections={[
              { id: 'sec1', label: 'Introduction' },
              { id: 'sec2', label: 'Details' },
            ]}
          />
        </DemoSection>

        <DemoSection title="Toast">
          <button
            onClick={() => setToastVisible(true)}
            className="px-4 py-2 bg-green-base text-white rounded"
          >
            Show Toast
          </button>
          <Toast
            variant="success"
            message="Action completed!"
            visible={toastVisible}
            onDismiss={() => setToastVisible(false)}
          />
        </DemoSection>
      </div>
    </div>
  );
}
