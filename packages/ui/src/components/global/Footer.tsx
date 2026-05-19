import Link from 'next/link';
import { SchoolLogo } from '../logos/SchoolLogo';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { GitHubIcon } from '../icons/GitHubIcon';
import { InstagramIcon } from '../icons/InstagramIcon';
import { FacebookIcon } from '../icons/FacebookIcon';
import { YouTubeIcon } from '../icons/YoutubeIcon';

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface FooterProps {
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'The School',
    links: [
      { label: 'About KCC', href: '/about' },
      { label: 'Our History', href: '/about#history' },
      { label: 'Administration', href: '/administration' },
      { label: 'Staff', href: '/staff' },
      { label: 'Facilities', href: '/facilities' },
    ],
  },
  {
    heading: 'Academics',
    links: [
      { label: 'Academic Streams', href: '/academics/streams' },
      { label: 'Results Portal', href: '/academics/results' },
      { label: 'Examination Calendar', href: '/academics/calendar' },
      { label: 'Achievements', href: '/academics/achievements' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'Societies', href: '/societies' },
      { label: 'Sports', href: '/extracurriculars/sports' },
      { label: 'Performing Arts', href: '/extracurriculars/arts' },
      { label: 'Scouts', href: '/extracurriculars/scouts' },
      { label: 'KITS', href: '/societies/kits' },
    ],
  },
  {
    heading: 'Admissions',
    links: [
      { label: 'How to Apply', href: '/admissions' },
      { label: 'Key Dates', href: '/admissions#dates' },
      { label: 'Requirements', href: '/admissions#requirements' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/cwwkcc',
    icon: <FacebookIcon />,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@cwwkcc',
    icon: <YouTubeIcon />,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/cwwkcc',
    icon: <InstagramIcon />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/cwwkcc',
    icon: <GitHubIcon />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/school/cwwkcc',
    icon: <LinkedInIcon />,
  },
];

export function Footer({
  columns = FOOTER_COLUMNS,
  socialLinks = SOCIAL_LINKS,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-base relative overflow-hidden">
      {/* Footer Content */}
      <div className="content-width py-14 grid grid-cols-4">
        {/* Brand Data*/}
        <div className="col-span-2 flex flex-col items-center">
          {/* Crest Image*/}
          <SchoolLogo variant="crest-only" size="lg" className="mb-4" />

          {/* School Name */}
          <p className="text-body font-display uppercase text-gold-base mb-2">
            C.W.W. Kannangara Central College
          </p>

          {/* Motto */}
          <p className="mb-5 font-body text-body-sm text-text-inverse italic">
            "Wisdom is All Wealth"
          </p>
        </div>
        {/* Contact info */}
        <div className="col-span-2 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2">
            {[
              { label: 'Mathugama' },
              { label: 'Kalutara District' },
              { label: 'Western Province' },
              { label: 'Sri Lanka' },
              {
                label: '+94 123 456 789',
                isLink: true,
                href: 'tel:+94123456789',
              },
              {
                label: 'info@cwwkcc.lk',
                isLink: true,
                href: 'mailto:info@cwwkcc.lk',
              },
            ].map((item, i) => (
              <p
                key={i}
                className="text-label font-body text-text-inverse text-center"
              >
                {item.isLink ? (
                  <a
                    href={item.href}
                    className="hover:text-gold-base transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  item.label
                )}
              </p>
            ))}

            {/* Social Links */}
            <div className="flex flex-row gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-inverse hover:text-gold-base transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Nav columns */}
        <div className="col-span-full">
          <div className="grid grid-cols-4 justify-items-center">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="mb-5 font-body text-label uppercase text-gold-base">
                  {col.heading}
                </p>
                <div className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-body text-label-sm text-text-inverse hover:text-gold-base transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-text-muted">
        <p className="font-body text-label text-text-inverse uppercase">
          <Link
            href="/privacy-policy"
            className="font-body uppercase text-text-inverse text-label transition-colors hover:text-gold-base"
          >
            Privacy Policy |
          </Link>
          Built by{' '}
          <Link
            href="/societies/kits"
            className="text-gold-base hover:text-gold-light transition-colors"
          >
            KITS |
          </Link>{' '}
        </p>
        {/* Copyright */}
        <p className="font-body text-label text-text-inverse uppercase">
          &copy; {currentYear} C.W.W. Kannangara Central College.
        </p>
      </div>
    </footer>
  );
}
