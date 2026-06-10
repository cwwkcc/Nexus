//web/src/app/[locale]/components/test/page.tsx
'use client';
import { useTranslations } from 'next-intl';
import { Container, Heading, Text, EyebrowLabel } from '@nexus/ui';

export default function TimeLine() {
  const t = useTranslations('about.closing');
  return (
    <>
      <Container
        size="full"
        padding="lg"
        as="section"
        className="glass-panel rounded-lg m-space-6 md:m-space-12 lg:m-space-16"
      >
        <EyebrowLabel>Closing Statement</EyebrowLabel>
        <Heading level="h2" color="gold" className="my-space-4">
          {t('heading')}
        </Heading>
        <Text variant="body" color="primary">
          {t('body')}
        </Text>
        <Text variant="caption" color="muted" className="mt-space-2">
          {t('rule')}
        </Text>
      </Container>
    </>
  );
}
