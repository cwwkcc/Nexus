import type { ContactInfoData } from '@nexus/contracts';
import { MapEmbed } from '@nexus/ui';

export default function ContactInfoSection({
  data,
}: {
  data: ContactInfoData;
}) {
  const {
    address,
    phone,
    email,
    officeHours,
    admissionsPhone,
    admissionsEmail,
    mapEmbedUrl,
  } = data;

  return (
    <section className="py-space-16 md:py-space-24">
      <div className="container mx-auto px-space-4">
        <div className="grid gap-space-10 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div>
            <div className="mb-space-10 text-center lg:text-left">
              <p className="mb-space-4 text-sm font-semibold uppercase tracking-wider text-green-base">
                Contact Details
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-text-primary font-display">
                Get the information you need
              </h2>
            </div>

            <div className="grid gap-space-8 sm:grid-cols-2">
              <div className="rounded-xl bg-surface-elevated border border-border-light p-8 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold text-text-primary">
                  School Address
                </h3>
                <address className="not-italic space-y-2 text-sm text-text-muted font-body">
                  <p>{address.street}</p>
                  <p>
                    {address.city}
                    {address.postalCode ? `, ${address.postalCode}` : ''}
                  </p>
                  {address.country && <p>{address.country}</p>}
                </address>
              </div>

              <div className="rounded-xl bg-surface-elevated border border-border-light p-8 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold text-text-primary">
                  General Enquiries
                </h3>
                <div className="space-y-3 text-sm font-body text-text-muted">
                  <p>
                    <span className="font-medium text-text-primary">
                      Phone:
                    </span>{' '}
                    <a
                      href={`tel:${phone}`}
                      className="text-text-primary hover:text-green-base transition-colors"
                    >
                      {phone}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium text-text-primary">
                      Email:
                    </span>{' '}
                    <a
                      href={`mailto:${email}`}
                      className="text-text-primary hover:text-green-base transition-colors"
                    >
                      {email}
                    </a>
                  </p>
                  {officeHours && (
                    <p>
                      <span className="font-medium text-text-primary">
                        Office hours:
                      </span>{' '}
                      {officeHours}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {(admissionsPhone || admissionsEmail) && (
              <div className="mt-space-10 rounded-3xl bg-surface-elevated border border-border-light p-8 shadow-sm">
                <h3 className="mb-4 text-xl font-semibold text-text-primary">
                  Admissions
                </h3>
                <div className="space-y-3 text-sm font-body text-text-muted">
                  {admissionsPhone && (
                    <p>
                      <span className="font-medium text-text-primary">
                        Phone:
                      </span>{' '}
                      <a
                        href={`tel:${admissionsPhone}`}
                        className="text-text-primary hover:text-green-base transition-colors"
                      >
                        {admissionsPhone}
                      </a>
                    </p>
                  )}
                  {admissionsEmail && (
                    <p>
                      <span className="font-medium text-text-primary">
                        Email:
                      </span>{' '}
                      <a
                        href={`mailto:${admissionsEmail}`}
                        className="text-text-primary hover:text-green-base transition-colors"
                      >
                        {admissionsEmail}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {mapEmbedUrl ? (
            <div className="rounded-3xl overflow-hidden border border-border-light shadow-sm">
              <MapEmbed
                src={mapEmbedUrl}
                title="School location map"
                className="h-full"
                nearbyNote="Open in a new window for directions"
              />
            </div>
          ) : (
            <div className="rounded-3xl bg-surface-deep border border-border-light p-8 text-center text-sm text-text-muted">
              Map information is not available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
