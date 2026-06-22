import {
  VStack,
  Text,
  Container,
  Grid,
  GridItem,
  EyebrowLabel,
  Heading,
} from '@nexus/ui';
import { useTranslations } from 'next-intl';

interface Value {
  english: string;
  latin: string;
  desc: string;
}
export default function Values() {
  const t = useTranslations('about.values');
  const values = t.raw('values')
    ? Object.values(t.raw('values') as Record<string, Value>)
    : [];

  return (
    <Container
      size="full"
      padding="lg"
      as="section"
      className=" m-space-6 md:m-space-12 lg:m-space-16"
    >
      <EyebrowLabel>{t('valuesEyebrow')}</EyebrowLabel>
      <Grid
        columns={1}
        gap={8}
        className="mt-space-10 md:grid-cols-2 lg:grid-cols-4"
      >
        {values.map((value) => (
          <GridItem key={value.english}>
            <VStack spacing={3} align="center" className="text-center">
              <Heading level="h3">{value.english}</Heading>
              <Text variant="caption" color="gold">
                {value.latin}
              </Text>
              <Text variant="body" color="muted">
                {value.desc}
              </Text>
            </VStack>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}
