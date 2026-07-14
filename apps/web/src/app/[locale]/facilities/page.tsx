import FacilitiesCTA from '../../../blocks/facilities/FacilitiesCTA';
import FacilitiesGrid from '../../../blocks/facilities/FacilitiesGrid';
import FacilitiesHero from '../../../blocks/facilities/FacilitiesHero';
import FacilitiesStats from '../../../blocks/facilities/FacilitiesStats';
import { getFacilitiesPageContent, type FacilitiesPageContent } from '../../../server/content';

interface FacilitiesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FacilitiesPage({ params }: FacilitiesPageProps) {
  const { locale } = await params;
  const content: FacilitiesPageContent = await getFacilitiesPageContent(locale as 'en' | 'si' | 'ta');

  return (
    <>
      <FacilitiesHero hero={content.hero} />
      <FacilitiesStats stats={content.stats} />
      <FacilitiesGrid grid={content.grid} />
      <FacilitiesCTA cta={content.cta} />
    </>
  );
}
