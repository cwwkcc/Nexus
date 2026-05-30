'use client';
import { useTranslations } from 'next-intl';
import {
  Container,
  SectionHeader,
  AlumniLegacyBlock,
  type AlumniProfile,
} from '@nexus/ui';

export default function AlumniLegacy() {
  const t = useTranslations('about.alumni');

  const profiles = t.raw('profiles')
    ? Object.values(t.raw('profiles') as Record<string, AlumniProfile>)
    : [];

  return (
    <Container
      size="lg"
      padding="md"
      as="section"
      className="bg-surface-base rounded-md m-space-6 md:m-space-12 lg:m-space-16"
    >
      <SectionHeader
        eyebrow={t('eyebrow')}
        title={t('heading')}
        align="center"
        withAccentRule
        className="mb-space-12"
      />
      <AlumniLegacyBlock alumni={profiles} />{' '}
    </Container>
  );
}
