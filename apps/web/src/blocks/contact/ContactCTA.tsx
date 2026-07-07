import type { ContactCtaData } from '@nexus/contracts';
import { ButtonLink } from '@nexus/ui';

export default function ContactCTA({ data }: { data: ContactCtaData }) {
  return (
    <section className="py-space-24 bg-green-base text-center text-inverse overflow-hidden">
      <div className="container mx-auto px-space-4 max-w-3xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-base">
            {data.eyebrow}
          </p>
          <h2 className="mt-space-4 text-4xl font-display font-bold md:text-5xl">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="mt-space-4 text-lg font-light leading-relaxed text-white/90">
              {data.subtitle}
            </p>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-space-4 sm:flex-row sm:justify-center">
          <ButtonLink
            href={data.buttonHref}
            variant="primary"
            size="lg"
            className="bg-gold-base text-green-base hover:bg-gold-hover"
          >
            {data.buttonLabel}
          </ButtonLink>
          {data.secondaryButtonLabel && data.secondaryButtonHref && (
            <ButtonLink
              href={data.secondaryButtonHref}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-base"
            >
              {data.secondaryButtonLabel}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
