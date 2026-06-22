//web/src/app/[locale]/components/test/page.tsx
'use client';
import {
  Container,
  Heading,
  Text,
  Grid,
  SectionHeader,
  VStack,
  GridItem,
  CrestDiagram,
  type CrestSymbol,
  SchoolLogo,
} from '@nexus/ui';
import { useTranslations } from 'next-intl';

export function CrestExplained() {
  const t = useTranslations('about.crest');

  const symbols = t.raw('symbols')
    ? Object.values(t.raw('symbols') as Record<string, CrestSymbol>)
    : [];

  return (
    <Container
      size="full"
      padding="md"
      as="section"
      className="m-space-6 md:m-space-12 lg:m-space-16"
    >
      <SectionHeader
        eyebrow={t('eyebrow')}
        title={t('heading')}
        align="center"
        withAccentRule
        variant="eyebrow-title-description"
        description={t('intro')}
        marginBottom="mb-space-12"
      />

      {/* ── Mobile: crest + 2×2 symbol grid ──────────────────────────── */}
      <Container className="lg:hidden">
        <Container
          size="full"
          padding="none"
          className="max-w-size-screen-h-50 mb-space-10"
        >
          <SchoolLogo></SchoolLogo>
        </Container>
        <Grid columns={1} gap={6} className="xs:grid-cols-2">
          {symbols.map((symbol) => (
            <GridItem key={symbol.id}>
              <VStack spacing={2}>
                <Heading level="h4" color="gold">
                  {symbol.name}
                </Heading>
                <Text variant="body-sm" color="muted">
                  {symbol.meaning}
                </Text>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      </Container>

      {/* ── Desktop: annotated hotspot diagram ────────────────────────── */}
      <div className="hidden lg:block">
        <CrestDiagram symbols={symbols} />
      </div>
    </Container>
  );
}
