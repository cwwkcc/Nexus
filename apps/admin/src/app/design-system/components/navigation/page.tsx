'use client';

import type { SearchResultData } from '@nexus/contracts';
import {
  Accordion,
  Breadcrumb,
  FilterBar,
  LanguageSwitcher,
  MobileMenu,
  NavLink,
  Pagination,
  SearchInput,
  TableOfContents,
  Tabs,
} from '@nexus/ui';
import { useState } from 'react';

import { DemoSection } from '../_components/DemoSection';

// Mock search function for SearchInput demo
const mockSearch = async (query: string): Promise<SearchResultData[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  const results: SearchResultData[] = [
    { id: '1', label: 'About KCC', href: '/about' },
    { id: '2', label: 'Academic Streams', href: '/academics' },
    { id: '3', label: 'Admissions Process', href: '/admissions' },
    { id: '4', label: 'News: Prize Giving', href: '/news/prize-giving' },
  ];
  return results.filter((r) =>
    r.label.toLowerCase().includes(query.toLowerCase()),
  );
};

// Mock sections for TableOfContents
const tocSections = [
  { id: 'section-1', label: 'Introduction' },
  { id: 'section-2', label: 'Features' },
  { id: 'section-3', label: 'Pricing' },
  { id: 'section-4', label: 'FAQ' },
];

// Mock filter options
const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'academic', label: 'Academic' },
  { value: 'sports', label: 'Sports' },
  { value: 'events', label: 'Events' },
];

// Mock accordion items
const accordionItems = [
  {
    id: 'faq-1',
    question: 'What are the school hours?',
    answer:
      'School hours are from 7:30 AM to 1:30 PM for primary and 7:30 AM to 2:30 PM for secondary.',
  },
  {
    id: 'faq-2',
    question: 'Is there a swimming pool?',
    answer:
      'Yes, we have a 25m indoor swimming pool with public hours on weekends.',
  },
  {
    id: 'faq-3',
    question: 'How can I join KITS?',
    answer:
      'Contact the ICT teacher or join the society during the annual club recruitment drive.',
  },
];

// Mock tabs content
const tabsDemo = [
  {
    id: 'tab1',
    label: 'Description',
    content: (
      <p className="font-body text-body-sm text-text-muted">
        This is the description tab content. It shows basic information about
        the topic.
      </p>
    ),
  },
  {
    id: 'tab2',
    label: 'Specifications',
    content: (
      <p className="font-body text-body-sm text-text-muted">
        Specifications: 16GB RAM, 512GB SSD, Intel i7 processor.
      </p>
    ),
  },
  {
    id: 'tab3',
    label: 'Reviews',
    badge: 12,
    content: (
      <p className="font-body text-body-sm text-text-muted">
        ★★★★☆ (12 reviews) – Great product!
      </p>
    ),
  },
];

export default function NavigationComponentsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('all');
  const [, setActiveTab] = useState('tab1');

  const mobileNavItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    {
      label: 'Academics',
      children: [
        { label: 'Science', href: '/academics/science' },
        { label: 'Commerce', href: '/academics/commerce' },
        { label: 'Arts', href: '/academics/arts' },
      ],
    },
    { label: 'Admissions', href: '/admissions' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-surface-base py-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">
          Navigation Components
        </h1>
        <p className="font-body text-body text-text-muted mb-space-12">
          All components used for navigating the site – menus, breadcrumbs,
          pagination, search, tabs, accordions, and more.
        </p>

        {/* Accordion */}
        <DemoSection title="Accordion">
          <Accordion items={accordionItems} />
          <Accordion
            items={accordionItems}
            allowMultiple
            className="mt-space-8"
          />
          <p className="font-body text-caption text-text-muted mt-space-2">
            The second accordion allows multiple open panels.
          </p>
        </DemoSection>

        {/* Breadcrumb */}
        <DemoSection title="Breadcrumb">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Components', href: '/design-system/components' },
              { label: 'Navigation' },
            ]}
          />
          <div className="bg-green-base p-space-4 rounded-md">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Academics', href: '/academics' },
                { label: 'Science Stream' },
              ]}
              onDark
            />
          </div>
        </DemoSection>

        {/* FilterBar */}
        <DemoSection title="FilterBar">
          <FilterBar
            options={filterOptions}
            value={activeFilter}
            onChange={setActiveFilter}
            allLabel="All"
          />
          <div className="mt-space-4 p-space-4 bg-surface-elevated rounded-md">
            <p className="font-body text-body-sm text-text-muted">
              Active filter:{' '}
              <span className="text-gold-base">{activeFilter || 'all'}</span>
            </p>
          </div>
          <div className="mt-space-8">
            <h3 className="font-display text-h4 mb-space-3">
              Year selector variant
            </h3>
            <FilterBar
              variant="year-selector"
              options={[
                { value: '2026', label: '2026' },
                { value: '2025', label: '2025' },
                { value: '2024', label: '2024' },
              ]}
              value="2026"
              onChange={() => { /* no-op */ }}
            />
          </div>
        </DemoSection>

        {/* LanguageSwitcher */}
        <DemoSection title="LanguageSwitcher">
          <div className="flex flex-col gap-space-6">
            <LanguageSwitcher locale="en" />
            <LanguageSwitcher locale="si" onDark />
            <div className="bg-green-base p-space-4 rounded-md inline-block">
              <LanguageSwitcher locale="ta" onDark />
            </div>
            <p className="font-body text-caption text-text-muted">
              Note: The switcher uses Next.js navigation; in this demo it's
              purely visual.
            </p>
          </div>
        </DemoSection>

        {/* MobileMenu (toggle button + drawer) */}
        <DemoSection title="MobileMenu">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="px-space-4 py-space-2 bg-green-base text-text-inverse rounded-md font-body text-label"
          >
            Open Mobile Menu
          </button>
          <MobileMenu
            items={mobileNavItems}
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            currentPath="/about"
          />
          <p className="font-body text-caption text-text-muted mt-space-2">
            Click the button to open the mobile drawer. It includes nested
            submenus and a close button.
          </p>
        </DemoSection>

        {/* NavLink */}
        <DemoSection title="NavLink">
          <div className="flex flex-wrap gap-space-6 items-center">
            <NavLink href="/about">Internal Link</NavLink>
            <NavLink href="https://example.com" external>
              External Link
            </NavLink>
            <NavLink href="/" active>
              Active Link
            </NavLink>
            <NavLink
              href="/"
              onDark
              className="bg-green-base p-space-2 rounded-sm"
            >
              On dark background
            </NavLink>
          </div>
          <p className="font-body text-caption text-text-muted mt-space-2">
            NavLink automatically detects active state via `usePathname`. The
            "Active Link" is manually forced.
          </p>
        </DemoSection>

        {/* Pagination */}
        <DemoSection title="Pagination">
          <Pagination
            totalPages={10}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
          <p className="font-body text-caption text-text-muted mt-space-2">
            Current page: {currentPage}
          </p>
          <div className="mt-space-6">
            <h3 className="font-display text-h4 mb-space-3">
              Compact pagination (siblingCount=0)
            </h3>
            <Pagination
              totalPages={5}
              currentPage={2}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onPageChange={() => {}}
              siblingCount={0}
            />
          </div>
        </DemoSection>

        {/* SearchInput */}
        <DemoSection title="SearchInput">
          <SearchInput
            scopeLabel="Search news and announcements"
            placeholder="e.g., 'prize giving'"
            onSearch={mockSearch}
            onResultClick={(result) => alert(`Navigating to ${result.href}`)}
          />
        </DemoSection>

        {/* TableOfContents */}
        <DemoSection title="TableOfContents">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-6">
            <div className="md:col-span-1">
              <TableOfContents sections={tocSections} activeId="section-2" />
            </div>
            <div className="md:col-span-3 space-y-space-12">
              {tocSections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="h-64 bg-surface-elevated rounded-md p-space-4"
                >
                  <h3 className="font-display text-h3">{section.label}</h3>
                  <p className="font-body text-body-sm text-text-muted">
                    Scroll to see the active section highlight. (Active ID is
                    fixed to "section-2" for demo.)
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="font-body text-caption text-text-muted mt-space-2">
            In a real implementation, `activeId` would be tracked via
            `useActiveSection` hook.
          </p>
        </DemoSection>

        {/* Tabs */}
        <DemoSection title="Tabs">
          <Tabs
            tabs={tabsDemo}
            defaultTabId="tab1"
            onChange={(id) => setActiveTab(id)}
            variant="line"
          />
          <div className="mt-space-8">
            <h3 className="font-display text-h4 mb-space-3">Pills variant</h3>
            <Tabs
              tabs={[
                { id: 'a', label: 'Option A', content: <div>Content A</div> },
                { id: 'b', label: 'Option B', content: <div>Content B</div> },
              ]}
              variant="pills"
            />
          </div>
        </DemoSection>
      </div>
    </div>
  );
}
