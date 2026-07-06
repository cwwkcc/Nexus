import type { AdministrationContactData } from '@nexus/contracts';
import { ButtonLink } from '@nexus/ui';

export default function AdministrationContact({ data }: { data: AdministrationContactData }) {
  return (
    <section className="py-24 bg-green-base relative overflow-hidden text-center">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]" />
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <h2 className="text-4xl font-display md:text-5xl mb-6 text-gold-base">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-xl font-body mb-10 text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        )}
        <div className="flex justify-center gap-4 flex-wrap">
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
              className="text-white border-white hover:bg-white hover:text-green-base"
            >
              {data.secondaryButtonLabel}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
