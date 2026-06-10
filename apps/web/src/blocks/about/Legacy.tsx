//web/src/app/[locale]/components/test/page.tsx
'use client';
import { useTranslations } from 'next-intl';
import { heritageImages } from '../../data/about';
import {
  VStack,
  Text,
  Container,
  Grid,
  GridItem,
  EyebrowLabel,
  Heading,
  QuoteBlock,
  ImageFrame,
} from '@nexus/ui';

export default function Legacy() {
  const t = useTranslations('about.legacy');

  return (
    <Container
      size="full"
      padding="lg"
      as="section"
      className="glass-panel rounded-lg m-space-6 md:m-space-12 lg:m-space-16"
    >
      <Grid columns={1} gap={12} className="lg:grid-cols-2 xl:grid-cols-3">
        <GridItem>
          <VStack spacing={6}>
            <EyebrowLabel>{t('spirit.eyebrow')}</EyebrowLabel>
            <Heading level="h3">{t('spirit.heading')}</Heading>
            <Text variant="body" color="muted">
              {t('spirit.paragraph')}
            </Text>
            <QuoteBlock
              variant="pull-quote"
              quote={t('spirit.quote')}
              attribution={t('spirit.attribution')}
            />
          </VStack>
        </GridItem>
        <GridItem className="xl:col-span-2">
          <Grid>
            <EyebrowLabel>{t('heritage.eyebrow')}</EyebrowLabel>
            <Heading level="h3">{t('heritage.heading')}</Heading>

            <Grid columns={2} gap={2}>
              {heritageImages.map((img) => (
                <ImageFrame
                  key={img.src + img.year}
                  src={img.src}
                  alt={img.alt}
                  aspectRatio="1/1"
                  className="max-h-size-80 max-w-full"
                />
              ))}
            </Grid>
            <Text
              variant="caption"
              color="muted"
              className="mt-space-4 text-center"
            >
              {t('heritage.caption')}
            </Text>
          </Grid>
        </GridItem>
      </Grid>
    </Container>
  );
}
