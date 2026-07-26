# Nexus — Data Privacy Policy

**Protecting student and staff information**

---

## Purpose

Nexus is committed to protecting the privacy of students, staff, and all members of the school community. This policy defines how data is collected, stored, and used.

---

## Scope

This policy covers all data stored on the Nexus platform:

- **Student data:** Achievements (with consent), photos
- **Staff data:** Profiles, photos, contact information
- **Alumni data:** Profiles, photos, achievements
- **Website analytics:** Page views, search queries

---

## Data Principles

### 1. Purpose Limitation

Data is collected only for specific, legitimate purposes:

- Achievement database, gallery photos (student data)
- Staff listings (staff data)
- Alumni directory (alumni data)
- Website analytics (site improvement)

### 2. Data Minimisation

Only the minimum data necessary is collected:

- Staff profiles: Name, title, department, photo (no personal details)
- Alumni: Name, year, profession, quote (no contact information)

### 3. Storage Limitation

Data is stored for a limited time:

- Achievement records: Ongoing, until removal requested
- Staff profiles: Until staff member leaves
- Alumni profiles: Until alumni requests removal
- Analytics: Aggregated data only (no personal data)

### 4. Security

Data is protected by appropriate security measures:

- Encryption at rest and in transit
- Access controls (role-based)
- Audit logging
- Regular security reviews

---

## Data Collection

### Student Data

| Data Type       | Collected         | Purpose                                                                        | Retention              |
| --------------- | ----------------- | ------------------------------------------------------------------------------ | ---------------------- |
| Photos          | ✅                | Gallery, events                                                                | Ongoing (with consent) |
| Achievements    | ✅                | Achievement database                                                           | Ongoing                |
| Names           | ✅ (with consent) | Achievement database only — never for exam performance, which is not collected | Ongoing                |
| Contact details | ❌                | Not collected                                                                  | N/A                    |

### Staff Data

| Data Type       | Collected | Purpose        | Retention          |
| --------------- | --------- | -------------- | ------------------ |
| Name            | ✅        | Staff profiles | Until staff leaves |
| Title           | ✅        | Staff profiles | Until staff leaves |
| Department      | ✅        | Staff profiles | Until staff leaves |
| Photo           | ✅        | Staff profiles | Until staff leaves |
| Contact details | ❌        | Not published  | N/A                |

### Alumni Data

| Data Type       | Collected | Purpose          | Retention |
| --------------- | --------- | ---------------- | --------- |
| Name            | ✅        | Alumni directory | Ongoing   |
| Graduation year | ✅        | Alumni directory | Ongoing   |
| Profession      | ✅        | Alumni directory | Ongoing   |
| Quote           | ✅        | Alumni directory | Ongoing   |
| Contact details | ❌        | Not published    | N/A       |

---

## Data Storage

### Database

- All data stored in PostgreSQL
- Encrypted at rest
- Encrypted in transit (TLS)
- Access controlled by roles
- Audit logged

### Media Storage

- All images stored in Cloudflare R2
- Encrypted at rest
- Publicly accessible via CDN (but no personal data)

### Backups

- Encrypted backups
- Stored separately from production
- Retained for 30 days

---

## Data Access

### Who Can Access Data

| Role           | Student Data | Staff Data  | Alumni Data | Analytics |
| -------------- | ------------ | ----------- | ----------- | --------- |
| Principal      | View only    | View only   | View only   | View only |
| Staff Advisor  | Full access  | Full access | Full access | View only |
| KITS Lead      | Full access  | Full access | Full access | View only |
| KITS Member    | Edit only    | No access   | Edit only   | No access |
| Editorial Team | No access    | No access   | No access   | No access |

### Access Control

- Role-based access control in admin panel
- Audit log of all access and changes
- Minimum access principle

---

## Data Sharing

### Data Not Shared

- Student data is never shared with third parties
- Staff data is never shared with third parties
- Alumni data is never shared with third parties

### Data Published

- Student achievements are published via the Achievement Database (with consent)
- Staff profiles are published on the public website
- Alumni profiles are published on the public website

### Consent

- Photo consent required for student photos
- Photo consent required for staff photos
- Alumni consent required for alumni profiles

---

## User Rights

### Students

- Right to request removal of photos (with consent)
- Right to request privacy of achievement data

### Staff

- Right to access their profile
- Right to request changes to their profile
- Right to request removal of their profile

### Alumni

- Right to access their profile
- Right to request changes to their profile
- Right to request removal of their profile

---

## Data Breach Response

### Detection

- UptimeRobot alerts
- Audit log review
- User reports
- Staff reports

### Response

1. **Containment:** Stop the breach
2. **Investigation:** Determine the cause
3. **Notification:** Notify affected parties
4. **Remediation:** Fix the breach

### Notification

- Affected users: Within 72 hours
- Principal: Immediately
- Staff Advisor: Immediately

---

## Compliance

Nexus complies with:

- **Sri Lanka Data Protection Act** (when enacted)
- **GDPR** (for data of EU citizens)
- **School Privacy Policy** (school-specific requirements)

---

## Policy Review

| Review         | Frequency | Responsible   |
| -------------- | --------- | ------------- |
| Policy review  | Annually  | Staff Advisor |
| Security audit | Quarterly | KITS Lead     |
| Privacy audit  | Annually  | Staff Advisor |

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

---
