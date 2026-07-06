import type { AcademicsContactsData } from '@nexus/contracts';

export default function DepartmentContacts({ data }: { data: AcademicsContactsData }) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          {data.eyebrow && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-green-base">
              {data.eyebrow}
            </p>
          )}
          {data.heading && (
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-text-primary font-display">
              {data.heading}
            </h2>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.contacts.map((contact) => (
            <div key={contact.id} className="bg-surface-elevated border border-border-light p-8 flex flex-col items-start gap-4">
              <div>
                <h3 className="text-xl font-display text-gold-base mb-1">{contact.department}</h3>
                <p className="text-sm font-body uppercase tracking-wider text-text-muted">Head: {contact.headOfDepartment}</p>
              </div>
              <div className="space-y-2 text-sm w-full font-body mt-2">
                <p className="flex justify-between items-center border-b border-border-light pb-2">
                  <span className="text-text-muted">Email</span>
                  <a href={`mailto:${contact.email}`} className="text-text-primary hover:text-green-base transition-colors font-medium">{contact.email}</a>
                </p>
                {contact.phone && (
                  <p className="flex justify-between items-center pt-2">
                    <span className="text-text-muted">Phone</span>
                    <a href={`tel:${contact.phone}`} className="text-text-primary hover:text-green-base transition-colors font-medium">{contact.phone}</a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
