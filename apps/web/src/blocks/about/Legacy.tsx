import type { AboutLegacyData } from '@nexus/contracts';
import { VStack, Text, Container, Grid, GridItem, EyebrowLabel, Heading, QuoteBlock, ImageFrame } from '@nexus/ui';

export default function Legacy({ legacy }: { legacy: AboutLegacyData }) {
  return (
    <Container size="full" padding="lg" as="section" className=" m-space-6 md:m-space-12 lg:m-space-16">
      <Grid columns={1} gap={12} className="lg:grid-cols-2 xl:grid-cols-3">
        <GridItem>
          <VStack spacing={6}>
            <EyebrowLabel className="mb-space-2">{legacy.spirit.eyebrow}</EyebrowLabel>
            <Heading level="h3">{legacy.spirit.heading}</Heading>
            <Text variant="body" color="muted">
              {legacy.spirit.paragraph}
            </Text>
            <QuoteBlock variant="pull-quote" quote={legacy.spirit.quote} attribution={legacy.spirit.attribution} />
          </VStack>
        </GridItem>
        <GridItem className="xl:col-span-2">
          <Grid columns={1}>
            <EyebrowLabel className="mb-space-4">{legacy.heritage.eyebrow}</EyebrowLabel>
            <Heading level="h3" className="mb-space-4">
              {legacy.heritage.heading}
            </Heading>
            <Grid columns={2} gap={2}>
              {legacy.heritage.images.map((img, idx) => (
                <ImageFrame key={idx} src={img.src} alt={img.alt} aspectRatio="news" className="max-h-size-80 max-w-full" />
              ))}
            </Grid>
            <Text variant="caption" color="muted" className="mt-space-4 text-center">
              {legacy.heritage.caption}
            </Text>
          </Grid>
        </GridItem>
      </Grid>
    </Container>
  );
}
