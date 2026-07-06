import type { FacilitiesCtaData } from '@nexus/contracts';
import { ButtonLink } from '@nexus/ui';

export default function FacilitiesCTA({ cta }: { cta: FacilitiesCtaData }) {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        {cta.eyebrow && (
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            {cta.eyebrow}
          </p>
        )}
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          {cta.title}
        </h2>
        {cta.subtitle && (
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            {cta.subtitle}
          </p>
        )}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <ButtonLink href={cta.buttonHref} size="lg">
            {cta.buttonLabel}
          </ButtonLink>
          {cta.secondaryButtonLabel && cta.secondaryButtonHref && (
            <ButtonLink
              href={cta.secondaryButtonHref}
              variant="outline"
              size="lg"
            >
              {cta.secondaryButtonLabel}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
