import { VStack, Container, EyebrowLabel, QuoteBlock } from '@nexus/ui';
import { useTranslations } from 'next-intl';
export default function Ethos() {
  const t = useTranslations('about.ethos');
  return (
    <Container
      size="full"
      padding="md"
      as="section"
      className=" m-space-6 md:m-space-12 lg:m-space-16"
    >
      <VStack spacing={6}>
        <VStack spacing={4}>
          <EyebrowLabel>{t('visionEyebrow')}</EyebrowLabel>
          <QuoteBlock variant="pull-quote" quote={t('visionText')} />
        </VStack>

        <VStack spacing={4}>
          <EyebrowLabel>{t('missionEyebrow')}</EyebrowLabel>
          <QuoteBlock variant="pull-quote" quote={t('missionText')} />
        </VStack>
        <VStack spacing={4}>
          <EyebrowLabel>Our Motto</EyebrowLabel>
          <div className="text-center">
            <QuoteBlock variant="pull-quote" quote={t('motto')} />
          </div>
        </VStack>
      </VStack>
    </Container>
  );
}
