import { VStack, Text, QuoteBlock, SectionHeader, Container } from '@nexus/ui';
import { useTranslations } from 'next-intl';

export default function OurStory() {
  const t = useTranslations('about.story');
  return (
    <Container
      size="full"
      padding="md"
      as="section"
      className="m-space-6 md:m-space-12 lg:m-space-16"
    >
      <VStack spacing={6}>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('heading')}
          titleEm={t('headingEm')}
          withAccentRule
          headingLevel="h2"
          marginBottom="mb-space-6"
        />
        <Text variant="body" color="muted">
          {t('paragraph')}
        </Text>
        <QuoteBlock
          variant="pull-quote"
          quote={t('quote')}
          attribution={t('quoteAuthor')}
        />
      </VStack>
    </Container>
  );
}
