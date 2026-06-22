//web/src/app/[locale]/components/test/page.tsx
'use client';
import {
  Container,
  Text,
  SectionHeader,
} from '@nexus/ui';
import { useTranslations } from 'next-intl';

export default function TimeLine() {
  const t = useTranslations('about.closing');
  return (
    <>
      <Container
        size="full"
        padding="lg"
        as="section"
        className="m-space-6 md:m-space-12 lg:m-space-16"
      >
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('heading')}
          align="center"
          withAccentRule
          className="mb-space-12"
        />
        <Text variant="body" color="primary" align="center">
          {t('body')}
        </Text>
        <Text
          variant="caption"
          color="muted"
          className="mt-space-2"
          align="center"
        >
          {t('rule')}
        </Text>
      </Container>
    </>
  );
}
