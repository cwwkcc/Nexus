//web/src/app/[locale]/components/test/page.tsx
'use client';
import { useTranslations } from 'next-intl';
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
      className="bg-surface-base rounded-lg m-space-6 md:m-space-12 lg:m-space-16"
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
      <div className="md:hidden">
        <div className="flex justify-center mb-space-10">
          <SchoolLogo size="xl"></SchoolLogo>
        </div>
        <Grid columns={2} gap={6}>
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
      </div>

      {/* ── Desktop: annotated hotspot diagram ────────────────────────── */}

      <CrestDiagram symbols={symbols} />
    </Container>
  );
}
