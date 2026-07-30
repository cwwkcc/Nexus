import { ButtonLink, VStack } from '@nexus/ui';
export default function HomePage() {
  // throw new Error('Testing error page');
  return (
    <main className="h-size-screen-h-100">
      <h1>Welcome to Nexus</h1>
      <VStack className="m-space-10">
        <ButtonLink href="./about">About</ButtonLink>

        {/* <ButtonLink href="./contact">Contact</ButtonLink>

        <ButtonLink href="./academics">Academics</ButtonLink>

        <ButtonLink href="./administration">Administration</ButtonLink>


        <ButtonLink href="./facilites">Facilities</ButtonLink> */}
      </VStack>
    </main>
  );
}
