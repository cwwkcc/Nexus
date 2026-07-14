import AdministrationContact from '../../../blocks/administration/AdministrationContact';
import AdministrationHero from '../../../blocks/administration/AdministrationHero';
import AdvisoryBoardSection from '../../../blocks/administration/AdvisoryBoardSection';
import PrincipalSection from '../../../blocks/administration/PrincipalSection';
import StaffGridSection from '../../../blocks/administration/StaffGridSection';
import { getAdministrationPageContent, type AdministrationPageContent } from '../../../server/content';

interface AdministrationPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AdministrationPage({ params }: AdministrationPageProps) {
  const { locale } = await params;
  const content: AdministrationPageContent = await getAdministrationPageContent(locale as 'en' | 'si' | 'ta');

  return (
    <>
      <AdministrationHero data={content.hero} />
      <PrincipalSection data={content.principal} />
      <StaffGridSection data={content.vicePrincipals} />
      <StaffGridSection data={content.headsOfDepartment} />
      <AdvisoryBoardSection data={content.advisoryBoard} />
      <AdministrationContact data={content.contact} />
    </>
  );
}
