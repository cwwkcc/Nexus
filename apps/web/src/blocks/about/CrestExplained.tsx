import type { AboutCrestData } from '@nexus/contracts';
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

export function CrestExplained({ crest }: { crest: AboutCrestData }) {
  const symbols = crest.symbols as CrestSymbol[];

  return (
    <Container
      size="full"
      padding="md"
      as="section"
      className="m-space-6 md:m-space-12 lg:m-space-16"
    >
      <SectionHeader
        eyebrow={crest.eyebrow}
        title={crest.heading}
        align="center"
        withAccentRule
        variant="eyebrow-title-description"
        description={crest.intro}
        marginBottom="mb-space-12"
      />

      <Container className="lg:hidden">
        <Container
          size="full"
          padding="none"
          className="max-w-size-screen-h-50 mb-space-10"
        >
          <SchoolLogo />
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

      <div className="hidden lg:block">
        <CrestDiagram symbols={symbols} />
      </div>
    </Container>
  );
}
