import AcademicsCTA from '../../../blocks/academics/AcademicsCTA';
import AcademicsHero from '../../../blocks/academics/AcademicsHero';
import DepartmentContacts from '../../../blocks/academics/DepartmentContacts';
import StreamCards from '../../../blocks/academics/StreamCards';
import StreamComparison from '../../../blocks/academics/StreamComparison';
import {
  getAcademicsPageContent,
  type AcademicsPageContent,
} from '../../../server/content';

interface AcademicsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AcademicsPage({ params }: AcademicsPageProps) {
  const { locale } = await params;
  const content: AcademicsPageContent = await getAcademicsPageContent(
    locale as 'en' | 'si' | 'ta',
  );

  return (
    <>
      <AcademicsHero data={content.hero} />
      <StreamCards data={content.streams} />
      <StreamComparison data={content.comparison} />
      <DepartmentContacts data={content.contacts} />
      <AcademicsCTA data={content.cta} />
    </>
  );
}
