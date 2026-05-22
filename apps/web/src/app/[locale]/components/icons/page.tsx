// apps/web/src/app/[locale]/components/icons/page.tsx
'use client';

import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  YoutubeIcon,
} from '@nexus/ui';

function DemoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12">
      <h2 className="font-display text-h2 mb-4 border-b border-border-light pb-2">
        {title}
      </h2>
      <div className="flex flex-wrap gap-6 items-center">{children}</div>
    </div>
  );
}

export default function IconsPage() {
  return (
    <div className="min-h-screen bg-surface-base py-12">
      <div className="content-width">
        <h1 className="font-display text-h1 mb-4">Icons</h1>
        <p className="font-body text-body text-text-muted mb-12">
          Social media and brand icons.
        </p>

        <DemoSection title="Social Icons">
          <FacebookIcon />
          <GitHubIcon />
          <InstagramIcon />
          <LinkedInIcon />
          <YoutubeIcon />
        </DemoSection>
      </div>
    </div>
  );
}
