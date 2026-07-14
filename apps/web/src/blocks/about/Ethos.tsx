import type { AboutEthosData } from '@nexus/contracts';
import { VStack, Container, EyebrowLabel, QuoteBlock } from '@nexus/ui';

export default function Ethos({ ethos }: { ethos: AboutEthosData }) {
  return (
    <Container size="full" padding="md" as="section" className=" m-space-6 md:m-space-12 lg:m-space-16">
      <VStack spacing={6}>
        <VStack spacing={4}>
          <EyebrowLabel>{ethos.visionEyebrow}</EyebrowLabel>
          <QuoteBlock variant="pull-quote" quote={ethos.visionText} />
        </VStack>

        <VStack spacing={4}>
          <EyebrowLabel>{ethos.missionEyebrow}</EyebrowLabel>
          <QuoteBlock variant="pull-quote" quote={ethos.missionText} />
        </VStack>
        <VStack spacing={4}>
          <EyebrowLabel>Our Motto</EyebrowLabel>
          <div className="text-center">
            <QuoteBlock variant="pull-quote" quote={ethos.motto} />
          </div>
        </VStack>
      </VStack>
    </Container>
  );
}
