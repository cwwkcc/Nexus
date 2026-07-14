// apps/web/src/app/[locale]/components/layout-components/page.tsx
'use client';

import { Breadcrumb, Container, Divider, Drawer, Grid, GridItem, Hero, Navigation, VStack, HStack } from '@nexus/ui';

import { DemoSection } from '../_components/DemoSection';

export default function LayoutComponentsPage() {
  return (
    <div className="min-h-screen bg-surface-base py-space-space-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-space-4">Layout Components</h1>
        <p className="font-body text-body text-text-muted mb-space-12">Structural components for page layout – containers, grids, stacks, navigation, hero and footer.</p>

        <DemoSection title="Breadcrumb">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Components' }]} />
        </DemoSection>

        {/* Container */}
        <DemoSection title="Container – All Options">
          <div className="space-y-8 w-size-full">
            {/* Size variants */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 text-gold-base">Container Size (max-width)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">size="sm" (max-width: 680px)</div>
                  <Container size="sm" className="bg-surface-deep p-space-4 rounded-lg">
                    <div className="bg-surface-default p-space-2 text-center text-text-muted text-sm">Content inside small container</div>
                  </Container>
                </div>
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">size="md" (max-width: 960px)</div>
                  <Container size="md" className="bg-surface-deep p-space-4 rounded-lg">
                    <div className="bg-surface-default p-space-2 text-center text-text-muted text-sm">Content inside medium container (default)</div>
                  </Container>
                </div>
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">size="lg" (max-width: 1200px)</div>
                  <Container size="lg" className="bg-surface-deep p-space-4 rounded-lg">
                    <div className="bg-surface-default p-space-2 text-center text-text-muted text-sm">Content inside large container</div>
                  </Container>
                </div>
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">size="full" (max-width: none)</div>
                  <Container size="full" className="bg-surface-deep p-space-4 rounded-lg">
                    <div className="bg-surface-default p-space-2 text-center text-text-muted text-sm">Full width (no max-width constraint)</div>
                  </Container>
                </div>
              </div>
            </div>

            {/* Padding variants */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 text-gold-base mt-space-8">Container Padding (horizontal)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">padding="none"</div>
                  <Container padding="none" className="bg-surface-deep rounded-lg overflow-hidden">
                    <div className="bg-surface-default p-space-4 text-center text-text-muted text-sm border border-border-light">No horizontal padding – content touches edges</div>
                  </Container>
                </div>
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">padding="sm" (16px mobile → 24px tablet+)</div>
                  <Container padding="sm" className="bg-surface-deep rounded-lg">
                    <div className="bg-surface-default p-space-4 text-center text-text-muted text-sm border border-border-light">Small padding (px-space-4 sm:px-space-6)</div>
                  </Container>
                </div>
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">padding="md" (default: 24px → 32px → 40px)</div>
                  <Container padding="md" className="bg-surface-deep rounded-lg">
                    <div className="bg-surface-default p-space-4 text-center text-text-muted text-sm border border-border-light">Medium padding – default for most pages</div>
                  </Container>
                </div>
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">padding="lg" (32px → 48px → 64px)</div>
                  <Container padding="lg" className="bg-surface-deep rounded-lg">
                    <div className="bg-surface-default p-space-4 text-center text-text-muted text-sm border border-border-light">Large padding – more breathing room</div>
                  </Container>
                </div>
              </div>
            </div>

            {/* Semantic 'as' prop */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 text-gold-base mt-space-8">Semantic HTML with `as`</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">as="section"</div>
                  <Container as="section" className="bg-surface-deep p-space-4 rounded-lg">
                    <div className="bg-surface-default p-space-2 text-center text-text-muted text-sm">Rendered as &lt;section&gt;</div>
                  </Container>
                </div>
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">as="article"</div>
                  <Container as="article" className="bg-surface-deep p-space-4 rounded-lg">
                    <div className="bg-surface-default p-space-2 text-center text-text-muted text-sm">Rendered as &lt;article&gt;</div>
                  </Container>
                </div>
              </div>
            </div>

            {/* Custom className */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 text-gold-base mt-space-8">Custom Styling via className</h3>
              <div>
                <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">Adding background, border, shadow</div>
                <Container size="md" padding="md" className="bg-gold-pale border border-gold-base rounded-lg shadow-elevation-2">
                  <div className="p-space-4 text-center text-text-primary">Custom background, border, and shadow applied to the Container itself.</div>
                </Container>
              </div>
            </div>

            {/* Combined example: what you'd actually use in a page */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 text-gold-base mt-space-8">Real‑world usage (page layout)</h3>
              <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">Typical page section with `size="lg"` and `padding="md"`</div>
              <Container size="lg" padding="md" as="section" className="bg-surface-default rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
                  <div className="bg-surface-elevated p-space-4 rounded-md">
                    <h4 className="font-display text-h4 mb-space-2">Column 1</h4>
                    <p className="font-body text-body-sm text-text-muted">Content inside the container automatically respects max‑width and responsive padding.</p>
                  </div>
                  <div className="bg-surface-elevated p-space-4 rounded-md">
                    <h4 className="font-display text-h4 mb-space-2">Column 2</h4>
                    <p className="font-body text-body-sm text-text-muted">The container centres itself horizontally and provides consistent gutters.</p>
                  </div>
                </div>
              </Container>
            </div>

            {/* Reference note */}
            <div className="text-center mt-space-8 p-space-4 bg-surface-default/30 rounded-lg border border-border-light">
              <p className="font-body text-caption text-text-muted">
                Container is the foundation of page layout – every page section should be wrapped in a <code className="bg-surface-deep px-space-1 py-space-0p5 rounded-sm">Container</code> to enforce max‑width and consistent padding.
              </p>
            </div>
          </div>
        </DemoSection>

        {/* Divider */}
        <DemoSection title="Divider – All Options">
          <div className="space-y-8 w-size-full">
            {/* Horizontal dividers */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 text-gold-base">Horizontal Dividers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">accentVariant="muted" (default)</div>
                  <div className="bg-surface-elevated p-space-4 rounded-lg border border-border-light">
                    <p className="font-body text-body-sm text-text-muted">Above content</p>
                    <Divider axis="horizontal" accentVariant="muted" />
                    <p className="font-body text-body-sm text-text-muted">Below content</p>
                  </div>
                </div>

                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">accentVariant="gold-accent" (full‑width gold)</div>
                  <div className="bg-surface-elevated p-space-4 rounded-lg border border-border-light">
                    <p className="font-body text-body-sm text-text-muted">Above content</p>
                    <Divider axis="horizontal" accentVariant="gold-accent" />
                    <p className="font-body text-body-sm text-text-muted">Below content</p>
                  </div>
                </div>

                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">accentVariant="gold-accent-short" (80px centred)</div>
                  <div className="bg-surface-elevated p-space-4 rounded-lg border border-border-light">
                    <p className="font-body text-body-sm text-text-muted">Section header</p>
                    <Divider axis="horizontal" accentVariant="gold-accent-narrow" />
                    <p className="font-body text-body-sm text-text-muted">Section content</p>
                  </div>
                </div>

                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">Custom spacing (mx-space-4)</div>
                  <div className="bg-surface-elevated p-space-4 rounded-lg border border-border-light">
                    <p className="font-body text-body-sm text-text-muted">Tight spacing above</p>
                    <Divider className="mx-space-4" />
                    <p className="font-body text-body-sm text-text-muted">Tight spacing below</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical dividers */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 text-gold-base mt-space-8">Vertical Dividers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">axis="vertical" – muted</div>
                  <div className="flex h-size-24 items-stretch bg-surface-elevated rounded-lg border border-border-light overflow-hidden">
                    <div className="flex-1 flex items-center justify-center">Left</div>
                    <Divider axis="vertical" accentVariant="muted" />
                    <div className="flex-1 flex items-center justify-center">Right</div>
                  </div>
                </div>

                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">axis="vertical" – gold-accent</div>
                  <div className="flex h-size-24 items-stretch bg-surface-elevated rounded-lg border border-border-light overflow-hidden">
                    <div className="flex-1 flex items-center justify-center">Menu</div>
                    <Divider axis="vertical" accentVariant="gold-accent" />
                    <div className="flex-1 flex items-center justify-center">Content</div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">Vertical divider in a toolbar (requires parent height)</div>
                  <div className="flex justify-center h-size-12 items-center bg-surface-elevated rounded-lg border border-border-light px-space-4 gap-space-4 mx-size-4">
                    <Divider axis="vertical" accentVariant="muted" />
                    <button className="font-body text-label">Edit</button>
                    <Divider axis="vertical" accentVariant="muted" />
                    <button className="font-body text-label">View</button>
                    <Divider axis="vertical" accentVariant="muted" />
                    <button className="font-body text-label">Delete</button>
                    <Divider axis="vertical" accentVariant="muted" />
                    <button className="font-body text-label">Archive</button>
                    <Divider axis="vertical" accentVariant="muted" />
                  </div>
                  <p className="font-body text-caption text-text-muted mt-space-2">
                    Note: Parent must have an explicit height (e.g., <code className="bg-surface-deep px-space-1 rounded-sm">h-size-12</code> or <code className="bg-surface-deep px-space-1 rounded-sm">h-size-full</code>
                    ).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Drawer (Persistent Sidebar)">
          <Drawer persistent size="sm" className="relative h-size-48">
            <div className="p-space-4">Persistent sidebar demo</div>
          </Drawer>
        </DemoSection>

        {/* Grid */}
        <DemoSection title="Grid – All Options">
          <div className="space-y-12 w-size-full">
            {/* Column variants */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 text-gold-base">Grid Columns (responsive)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6">
                {([1, 2, 3, 4, 6, 12] as const).map((cols) => (
                  <div key={cols}>
                    <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">columns={cols}</div>
                    <Grid columns={cols} gap={4} className="bg-surface-deep p-space-4 rounded-lg">
                      {Array.from({ length: cols }).map((_, i) => (
                        <div key={i} className="bg-surface-default p-space-3 text-center text-text-muted text-sm rounded">
                          Item {i + 1}
                        </div>
                      ))}
                    </Grid>
                  </div>
                ))}
              </div>
              <p className="font-body text-caption text-text-muted mt-space-4">Note: Columns adapt responsively – e.g., `3` becomes 1 column on mobile, 2 on tablet, 3 on desktop.</p>
            </div>

            {/* Gap variants */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 text-gold-base mt-space-8">Grid Gap (spacing tokens)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-6">
                {([0, 2, 4, 6, 8, 12] as const).map((gap) => (
                  <div key={gap}>
                    <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">gap={gap}</div>
                    <Grid columns={3} gap={gap} className="bg-surface-deep p-space-4 rounded-lg">
                      <div className="bg-surface-default p-space-2 text-center text-xs rounded">A</div>
                      <div className="bg-surface-default p-space-2 text-center text-xs rounded">B</div>
                      <div className="bg-surface-default p-space-2 text-center text-xs rounded">C</div>
                    </Grid>
                  </div>
                ))}
              </div>
            </div>

            {/* GridItem colSpan */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 text-gold-base mt-space-8">GridItem colSpan (12‑column grid)</h3>
              <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">columns=12 with different colSpan values</div>
              <Grid columns={12} gap={4} className="bg-surface-deep p-space-4 rounded-lg">
                <GridItem colSpan={3}>
                  <div className="bg-surface-default p-space-3 text-center text-text-muted text-sm rounded">colSpan=3</div>
                </GridItem>
                <GridItem colSpan={6}>
                  <div className="bg-surface-default p-space-3 text-center text-text-muted text-sm rounded">colSpan=6</div>
                </GridItem>
                <GridItem colSpan={3}>
                  <div className="bg-surface-default p-space-3 text-center text-text-muted text-sm rounded">colSpan=3</div>
                </GridItem>
                <GridItem colSpan={4}>
                  <div className="bg-surface-default p-space-3 text-center text-text-muted text-sm rounded">colSpan=4</div>
                </GridItem>
                <GridItem colSpan={8}>
                  <div className="bg-surface-default p-space-3 text-center text-text-muted text-sm rounded">colSpan=8</div>
                </GridItem>
              </Grid>
              <p className="font-body text-caption text-text-muted mt-space-2">On mobile, colSpan caps at 6 (full width in 6‑column grid). On desktop, full 12‑column grid applies.</p>
            </div>

            {/* Semantic 'as' prop */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 text-gold-base mt-space-8">Semantic HTML with `as`</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">as="ul"</div>
                  <Grid as="ul" columns={2} gap={4} className="bg-surface-deep p-space-4 rounded-lg list-none">
                    <li className="bg-surface-default p-space-2 text-center rounded">List item 1</li>
                    <li className="bg-surface-default p-space-2 text-center rounded">List item 2</li>
                  </Grid>
                </div>
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">as="div" (default)</div>
                  <Grid columns={2} gap={4} className="bg-surface-deep p-space-4 rounded-lg">
                    <div className="bg-surface-default p-space-2 text-center rounded">Div child 1</div>
                    <div className="bg-surface-default p-space-2 text-center rounded">Div child 2</div>
                  </Grid>
                </div>
              </div>
            </div>

            {/* Custom styling */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 text-gold-base mt-space-8">Custom Styling via className</h3>
              <div>
                <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">Custom background, border, shadow on Grid itself</div>
                <Grid columns={3} gap={6} className="bg-gold-pale border border-gold-base rounded-lg shadow-elevation-2 p-space-6">
                  <div className="bg-surface-default p-space-3 text-center rounded">Styled grid item 1</div>
                  <div className="bg-surface-default p-space-3 text-center rounded">Styled grid item 2</div>
                  <div className="bg-surface-default p-space-3 text-center rounded">Styled grid item 3</div>
                </Grid>
              </div>
            </div>

            {/* Real‑world usage example */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 text-gold-base mt-space-8">Real‑world usage: News card grid</h3>
              <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">3‑column responsive card grid</div>
              <Grid columns={3} gap={6}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <GridItem key={i} colSpan={1}>
                    <div className="bg-surface-elevated border border-border-light rounded-md p-space-4 h-full">
                      <div className="h-32 bg-surface-deep rounded-md mb-space-3" />
                      <h4 className="font-display text-h4 mb-space-2">Card {i}</h4>
                      <p className="font-body text-body-sm text-text-muted">This card would contain actual content like news, events, or society previews.</p>
                    </div>
                  </GridItem>
                ))}
              </Grid>
              <p className="font-body text-caption text-text-muted mt-space-4">The grid automatically stacks on mobile (1 column), becomes 2 columns on tablet, and 3 columns on desktop.</p>
            </div>

            {/* Reference note */}
            <div className="text-center mt-space-8 p-space-4 bg-surface-default/30 rounded-lg border border-border-light">
              <p className="font-body text-caption text-text-muted">
                Grid is the foundation for all card grids, form layouts, and multi‑column content. Use <code className="bg-surface-deep px-space-1 py-space-0p5 rounded-sm">Grid</code> with <code className="bg-surface-deep px-space-1 py-space-0p5 rounded-sm">GridItem</code> for responsive, token‑based layouts.
              </p>
            </div>
          </div>
        </DemoSection>

        <DemoSection title="Hero">
          <Hero variant="minimal" heading="Hero Demo" subheading="A simple hero" />
        </DemoSection>

        <DemoSection title="Navigation">
          <Navigation variant="solid" />
        </DemoSection>

        <DemoSection title="QuickAccessPortal">
          <p className="font-body text-body-sm text-text-muted">Quick access portal demo coming soon.</p>
        </DemoSection>

        <DemoSection title="VStack & HStack – All Options">
          <div className="space-y-8 w-size-full">
            {/* ========== VStack ========== */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 text-gold-base">VStack (Vertical Stack)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
                {/* spacing variants */}
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">spacing=2 (8px)</div>
                  <VStack spacing={2} className="bg-surface-default p-space-4 rounded-lg">
                    <div className="bg-surface-deep p-space-2 text-center">Item 1</div>
                    <div className="bg-surface-deep p-space-2 text-center">Item 2</div>
                    <div className="bg-surface-deep p-space-2 text-center">Item 3</div>
                  </VStack>
                </div>

                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">spacing=6 (24px)</div>
                  <VStack spacing={6} className="bg-surface-default p-space-4 rounded-lg">
                    <div className="bg-surface-deep p-space-2 text-center">Item 1</div>
                    <div className="bg-surface-deep p-space-2 text-center">Item 2</div>
                    <div className="bg-surface-deep p-space-2 text-center">Item 3</div>
                  </VStack>
                </div>

                {/* align variants */}
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">align="start" (default)</div>
                  <VStack align="start" className="bg-surface-default p-space-4 rounded-lg">
                    <div className="bg-surface-deep p-space-2 w-size-32">Width 32</div>
                    <div className="bg-surface-deep p-space-2 w-size-48">Width 48</div>
                    <div className="bg-surface-deep p-space-2 w-size-24">Width 24</div>
                  </VStack>
                </div>

                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">align="center"</div>
                  <VStack align="center" className="bg-surface-default p-space-4 rounded-lg">
                    <div className="bg-surface-deep p-space-2 w-size-32">Width 32</div>
                    <div className="bg-surface-deep p-space-2 w-size-48">Width 48</div>
                    <div className="bg-surface-deep p-space-2 w-size-24">Width 24</div>
                  </VStack>
                </div>

                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">align="end"</div>
                  <VStack align="end" className="bg-surface-default p-space-4 rounded-lg">
                    <div className="bg-surface-deep p-space-2 w-size-32">Width 32</div>
                    <div className="bg-surface-deep p-space-2 w-size-48">Width 48</div>
                    <div className="bg-surface-deep p-space-2 w-size-24">Width 24</div>
                  </VStack>
                </div>

                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">align="stretch" (default)</div>
                  <VStack align="stretch" className="bg-surface-default p-space-4 rounded-lg">
                    <div className="bg-surface-deep p-space-2">Full width</div>
                    <div className="bg-surface-deep p-space-2">Full width</div>
                  </VStack>
                </div>

                {/* as prop */}
                <div className="md:col-span-2">
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">as="nav" (semantic element)</div>
                  <VStack as="nav" spacing={2} className="bg-surface-default p-space-4 rounded-lg">
                    <a href="#" className="bg-surface-deep p-space-2 hover:bg-gold-pale">
                      Navigation Link 1
                    </a>
                    <a href="#" className="bg-surface-deep p-space-2 hover:bg-gold-pale">
                      Navigation Link 2
                    </a>
                    <a href="#" className="bg-surface-deep p-space-2 hover:bg-gold-pale">
                      Navigation Link 3
                    </a>
                  </VStack>
                </div>
              </div>
            </div>

            {/* ========== HStack ========== */}
            <div>
              <h3 className="font-display text-h3 mb-space-4 text-gold-base mt-space-8">HStack (Horizontal Stack)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-6">
                {/* spacing variants */}
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">spacing=2 (8px)</div>
                  <HStack spacing={2} className="bg-surface-default p-space-4 rounded-lg">
                    <div className="bg-surface-deep p-space-2">A</div>
                    <div className="bg-surface-deep p-space-2">B</div>
                    <div className="bg-surface-deep p-space-2">C</div>
                  </HStack>
                </div>

                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">spacing=8 (32px)</div>
                  <HStack spacing={8} className="bg-surface-default p-space-4 rounded-lg">
                    <div className="bg-surface-deep p-space-2">A</div>
                    <div className="bg-surface-deep p-space-2">B</div>
                    <div className="bg-surface-deep p-space-2">C</div>
                  </HStack>
                </div>

                {/* align variants */}
                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">align="start" (default)</div>
                  <HStack align="start" className="bg-surface-default p-space-4 rounded-lg h-size-24">
                    <div className="bg-surface-deep p-space-2 h-size-8">Short</div>
                    <div className="bg-surface-deep p-space-2 h-size-12">Medium</div>
                    <div className="bg-surface-deep p-space-2 h-size-16">Tall</div>
                  </HStack>
                </div>

                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">align="center"</div>
                  <HStack align="center" className="bg-surface-default p-space-4 rounded-lg h-size-24">
                    <div className="bg-surface-deep p-space-2 h-size-8">Short</div>
                    <div className="bg-surface-deep p-space-2 h-size-12">Medium</div>
                    <div className="bg-surface-deep p-space-2 h-size-16">Tall</div>
                  </HStack>
                </div>

                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">align="end"</div>
                  <HStack align="end" className="bg-surface-default p-space-4 rounded-lg h-size-24">
                    <div className="bg-surface-deep p-space-2 h-size-8">Short</div>
                    <div className="bg-surface-deep p-space-2 h-size-12">Medium</div>
                    <div className="bg-surface-deep p-space-2 h-size-16">Tall</div>
                  </HStack>
                </div>

                <div>
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">align="stretch"</div>
                  <HStack align="stretch" className="bg-surface-default p-space-4 rounded-lg h-size-24">
                    <div className="bg-surface-deep p-space-2">Fills height</div>
                    <div className="bg-surface-deep p-space-2">Fills height</div>
                  </HStack>
                </div>

                {/* justify variants */}
                <div className="md:col-span-2">
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">justify="start" (default)</div>
                  <HStack justify="start" className="bg-surface-default p-space-4 rounded-lg w-size-full">
                    <div className="bg-surface-deep p-space-2">Item 1</div>
                    <div className="bg-surface-deep p-space-2">Item 2</div>
                    <div className="bg-surface-deep p-space-2">Item 3</div>
                  </HStack>
                </div>

                <div className="md:col-span-2">
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">justify="center"</div>
                  <HStack justify="center" className="bg-surface-default p-space-4 rounded-lg w-size-full">
                    <div className="bg-surface-deep p-space-2">Item 1</div>
                    <div className="bg-surface-deep p-space-2">Item 2</div>
                    <div className="bg-surface-deep p-space-2">Item 3</div>
                  </HStack>
                </div>

                <div className="md:col-span-2">
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">justify="end"</div>
                  <HStack justify="end" className="bg-surface-default p-space-4 rounded-lg w-size-full">
                    <div className="bg-surface-deep p-space-2">Item 1</div>
                    <div className="bg-surface-deep p-space-2">Item 2</div>
                    <div className="bg-surface-deep p-space-2">Item 3</div>
                  </HStack>
                </div>

                <div className="md:col-span-2">
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">justify="between" (space-between)</div>
                  <HStack justify="between" className="bg-surface-default p-space-4 rounded-lg w-size-full">
                    <div className="bg-surface-deep p-space-2">First</div>
                    <div className="bg-surface-deep p-space-2">Middle</div>
                    <div className="bg-surface-deep p-space-2">Last</div>
                  </HStack>
                </div>

                <div className="md:col-span-2">
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">justify="around" (space-around)</div>
                  <HStack justify="around" className="bg-surface-default p-space-4 rounded-lg w-size-full">
                    <div className="bg-surface-deep p-space-2">1</div>
                    <div className="bg-surface-deep p-space-2">2</div>
                    <div className="bg-surface-deep p-space-2">3</div>
                  </HStack>
                </div>

                {/* wrap prop */}
                <div className="md:col-span-2">
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">wrap=true (flex-wrap) – resize window to see wrapping</div>
                  <HStack wrap spacing={2} className="bg-surface-default p-space-4 rounded-lg">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div key={i} className="bg-surface-deep px-space-3 py-space-1 rounded-full text-sm">
                        Chip {i + 1}
                      </div>
                    ))}
                  </HStack>
                </div>

                {/* as prop */}
                <div className="md:col-span-2">
                  <div className="font-body text-label mb-space-2 pl-space-3 border-l-2 border-gold-base bg-surface-default/50 py-space-1">as="ul" (semantic list)</div>
                  <HStack as="ul" spacing={4} justify="center" className="bg-surface-default p-space-4 rounded-lg">
                    <li className="bg-surface-deep p-space-2">List item 1</li>
                    <li className="bg-surface-deep p-space-2">List item 2</li>
                    <li className="bg-surface-deep p-space-2">List item 3</li>
                  </HStack>
                </div>
              </div>
            </div>
          </div>
        </DemoSection>
      </div>
    </div>
  );
}
