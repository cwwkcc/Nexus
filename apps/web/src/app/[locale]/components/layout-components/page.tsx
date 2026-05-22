// apps/web/src/app/[locale]/components/layout-components/page.tsx
'use client';

import {
  Breadcrumb,
  Container,
  Divider,
  Drawer,
  Footer,
  Grid,
  GridItem,
  Hero,
  Navigation,
  QuickAccessPortal,
  VStack,
  HStack,
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

export default function LayoutComponentsPage() {
  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">Layout Components</h1>
        <p className="font-body text-body text-text-muted mb-12">
          Structural components for page layout – containers, grids, stacks,
          navigation, hero and footer.
        </p>

        <DemoSection title="Breadcrumb">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Components' }]}
          />
        </DemoSection>

        <DemoSection title="Container">
          <Container size="sm" className="bg-surface-deep p-4">
            Small Container
          </Container>
          <Container size="md" className="bg-surface-deep p-4">
            Medium Container
          </Container>
        </DemoSection>

        <DemoSection title="Divider">
          <Divider variant="horizontal" />
          <Divider variant="gold-accent" />
        </DemoSection>

        <DemoSection title="Drawer (Persistent Sidebar)">
          <Drawer persistent size="sm" className="relative h-48">
            <div className="p-4">Persistent sidebar demo</div>
          </Drawer>
        </DemoSection>

        <DemoSection title="Footer">
          <Footer className="relative" />
        </DemoSection>

        <DemoSection title="Grid">
          <Grid columns={3} gap={4}>
            <div className="bg-surface-deep p-4">1</div>
            <div className="bg-surface-deep p-4">2</div>
            <div className="bg-surface-deep p-4">3</div>
          </Grid>
        </DemoSection>

        <DemoSection title="Hero">
          <Hero
            variant="minimal"
            heading="Hero Demo"
            subheading="A simple hero"
          />
        </DemoSection>

        <DemoSection title="Navigation">
          <Navigation variant="solid" />
        </DemoSection>

        <DemoSection title="QuickAccessPortal">
          <QuickAccessPortal />
        </DemoSection>

        <DemoSection title="VStack & HStack">
          <VStack spacing={2}>
            <div className="bg-surface-deep p-2">Item 1</div>
            <div className="bg-surface-deep p-2">Item 2</div>
          </VStack>
          <HStack spacing={4}>
            <div className="bg-surface-deep p-2">A</div>
            <div className="bg-surface-deep p-2">B</div>
          </HStack>
        </DemoSection>
      </div>
    </div>
  );
}
