import type { AboutAlumniData } from '@nexus/contracts';
import { Container, SectionHeader, ProfileCarousel } from '@nexus/ui';

export default function AlumniLegacy({ alumni }: { alumni: AboutAlumniData }) {
  return (
    <Container size="lg" padding="md" as="section">
      <SectionHeader eyebrow={alumni.eyebrow} title={alumni.heading} align="center" withAccentRule className="mb-space-2" />
      <ProfileCarousel profiles={alumni.profiles ?? []} />
    </Container>
  );
}
