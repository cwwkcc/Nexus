import { useTranslations } from 'next-intl';
import {
  Container,
  Text,
  Grid,
  GridItem,
  ImageFrame,
  SectionHeader,
  Divider,
  QuoteBlock,
} from '@nexus/ui';

export default function OurNameSake() {
  const t = useTranslations('about.aboutKannangara');

  return (
    <Container
      size="full"
      padding="lg"
      as="section"
      className=" m-space-6 md:m-space-12 lg:m-space-16"
    >
      <Grid
        columns={1}
        gap={8}
        alignItems="start"
        className="md:grid-cols-2 xl:grid-cols-3"
      >
        {/* ── Left: Portrait ───────────────────────────────────────────── */}
        <GridItem alignSelf="center">
          <ImageFrame
            src="/images/ironman.jpg"
            alt={t('portraitAlt')}
            aspectRatio="3/4"
            variant="featured"
            frameColor="gold"
            frameWidth="border-2xl"
          />
          {t('portraitCaption') && (
            <Text
              variant="caption"
              color="muted"
              className="text-center mt-space-2"
            >
              {t('portraitCaption')}
            </Text>
          )}
        </GridItem>

        {/* ── Right: Content ────────────────────────────────────────────── */}
        <GridItem className="xl:col-span-2">
          <SectionHeader
            eyebrow={t('eyebrow')}
            title={t('name')}
            description={t('position')}
            variant="eyebrow-title-description"
            withAccentRule
            headingLevel="h2"
            marginBottom="mb-space-6"
          />

          <Divider accentVariant="muted" className="mb-space-6" />

          <Text variant="body" color="muted">
            {t('paragraph')}
          </Text>

          <QuoteBlock
            variant="pull-quote"
            quote={t('quote')}
            attribution={t('attribution')}
            className="mt-space-8"
          />
        </GridItem>
      </Grid>
    </Container>
  );
}
