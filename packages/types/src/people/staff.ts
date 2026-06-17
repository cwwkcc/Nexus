export type StaffRole =
  | 'principal'
  | 'deputy-principal'
  | 'head-of-department'
  | 'teacher'
  | 'counsellor'
  | 'administrative';

export interface StaffMember {
  id: string;
  name: string;
  title: string;
  role: StaffRole;
  department?: string;
  tenure?: string;
  quote?: string;
  imageSrc?: string;
  imageAlt?: string;
  portfolio?: string;
  href?: string;
}

export interface PrincipalMessage {
  staffMember: StaffMember;
  message: string;
  quote?: string;
  fullMessageHref: string;
}
