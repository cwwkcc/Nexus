import type { AboutKannangaraData } from '@nexus/contracts';
import { Container, Text, Grid, GridItem, ImageFrame, SectionHeader, Divider, QuoteBlock } from '@nexus/ui';

export default function OurNameSake({ aboutKannangara }: { aboutKannangara: AboutKannangaraData }) {
  return (
    <Container size="full" padding="lg" as="section" className=" m-space-6 md:m-space-12 lg:m-space-16">
      <Grid columns={1} gap={8} alignItems="start" className="md:grid-cols-2 xl:grid-cols-3">
        <GridItem alignSelf="center">
          <ImageFrame src={aboutKannangara.portraitSrc ?? '/images/ironman.jpg'} alt={aboutKannangara.portraitAlt} aspectRatio="3/4" variant="featured" frameColor="gold" frameWidth="border-2xl" size="full" />
          {aboutKannangara.portraitCaption && (
            <Text variant="caption" color="muted" className="text-center mt-space-2">
              {aboutKannangara.portraitCaption}
            </Text>
          )}
        </GridItem>

        <GridItem className="xl:col-span-2">
          <SectionHeader eyebrow={aboutKannangara.eyebrow} title={aboutKannangara.name} description={aboutKannangara.position} variant="eyebrow-title-description" withAccentRule headingLevel="h2" marginBottom="mb-space-6" />

          <Divider accentVariant="muted" className="mb-space-6" />

          <Text variant="body" color="muted">
            {aboutKannangara.paragraph}
          </Text>

          {aboutKannangara.quote && <QuoteBlock variant="pull-quote" quote={aboutKannangara.quote} attribution={aboutKannangara.attribution} className="mt-space-8" />}
        </GridItem>
      </Grid>
    </Container>
  );
}
