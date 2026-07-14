# Nexus — Accessibility Policy

**WCAG 2.1 Level AA compliance**

---

## Purpose

Nexus is committed to providing an accessible digital experience for all users, regardless of ability or device. This policy defines our accessibility standards and commitments.

---

## Commitment

Nexus is designed and developed to meet **WCAG 2.1 Level AA** standards. This ensures that:

- People with visual impairments can access content via screen readers
- People with motor impairments can navigate without a mouse
- People with cognitive impairments can understand and use the site
- People with hearing impairments can access video and audio content

---

## Accessibility Standards

### WCAG 2.1 Level AA Requirements

| Category           | Requirement                            | Implementation                                  |
| ------------------ | -------------------------------------- | ----------------------------------------------- |
| **Perceivable**    | Text alternatives for non-text content | Alt text for all images                         |
| **Perceivable**    | Captions for audio/video               | Captions for videos                             |
| **Perceivable**    | Colour contrast                        | 4.5:1 for normal text, 3:1 for large text       |
| **Perceivable**    | Text resizing                          | All text is resizable (no fixed sizes)          |
| **Operable**       | Keyboard navigation                    | All interactive elements keyboard-accessible    |
| **Operable**       | Focus indicators                       | Visible focus rings on all interactive elements |
| **Operable**       | Enough time                            | No time limits on content                       |
| **Operable**       | Seizures                               | No flashing content                             |
| **Understandable** | Readable                               | Clear, simple language                          |
| **Understandable** | Predictable                            | Consistent navigation and behaviour             |
| **Understandable** | Input assistance                       | Form labels and error messages                  |
| **Robust**         | Compatibility                          | Works with assistive technologies               |

---

## Implementation

### Design System

The design system incorporates accessibility:

| Element           | Standard                                         |
| ----------------- | ------------------------------------------------ |
| **Colours**       | Contrast ratios meet WCAG AA                     |
| **Focus Ring**    | Gold 2px offset ring on all interactive elements |
| **Typography**    | Clear fonts, sufficient sizing, spacing          |
| **Motion**        | Reduced motion for users with motion sensitivity |
| **Touch Targets** | Minimum 44×44px for all interactive elements     |

### Components

All components include accessibility:

| Component  | Accessibility Feature                       |
| ---------- | ------------------------------------------- |
| Buttons    | Keyboard activation, focus ring, aria-label |
| Forms      | Labels, error messages, ARIA describedby    |
| Modals     | Focus trap, Escape to close, aria-modal     |
| Images     | Alt text on all images                      |
| Links      | Descriptive text, external link indicator   |
| Navigation | Keyboard navigation, aria-current           |

### Content

All content must be accessible:

| Content Type | Requirement                   |
| ------------ | ----------------------------- |
| Images       | Alt text for all images       |
| Videos       | Captions for all videos       |
| Audio        | Transcripts for all audio     |
| Documents    | Accessible PDFs               |
| Links        | Descriptive text              |
| Headings     | Proper hierarchy (h1, h2, h3) |

---

## Testing and Monitoring

### Automated Testing

- **Lighthouse:** Accessibility score ≥ 90
- **Axe:** No accessibility violations
- **WAVE:** No accessibility violations

### Manual Testing

| Test                  | Performed By | Frequency          |
| --------------------- | ------------ | ------------------ |
| Keyboard navigation   | KITS Lead    | Each release       |
| Screen reader testing | KITS Lead    | Each major release |
| Colour contrast       | KITS Lead    | Each release       |
| Focus indicators      | KITS Lead    | Each release       |

### Monitoring

- Accessibility is tested in CI/CD pipeline
- Lighthouse CI fails on accessibility violations
- Manual testing before each release

---

## Accessibility Features

### For Visual Impairments

- **Screen reader support:** Semantic HTML, ARIA attributes
- **Colour contrast:** Meets WCAG AA
- **Text resizing:** All text resizes up to 200%
- **Zoom support:** Site remains usable at 200% zoom

### For Motor Impairments

- **Keyboard navigation:** All functions available via keyboard
- **Skip to content:** Skip navigation links
- **Large touch targets:** Minimum 44×44px

### For Cognitive Impairments

- **Clear language:** Simple, consistent language
- **Predictable navigation:** Consistent layout and behaviour
- **Error messages:** Clear error messages with guidance

### For Hearing Impairments

- **Captions:** All videos have captions
- **Transcripts:** All audio has transcripts

---

## Reporting Issues

If you experience accessibility issues with Nexus, please report them:

| Method        | Contact                       |
| ------------- | ----------------------------- |
| **Email**     | accessibility@cwwkcc.lk       |
| **Phone**     | [School phone number]         |
| **In person** | Staff Advisor, ICT Department |

### What to Include

- The page where the issue occurred
- The issue you experienced
- The device and browser you were using
- Any assistive technology you were using
- Your contact information (optional)

---

## Review and Updates

| Review               | Frequency | Responsible   |
| -------------------- | --------- | ------------- |
| Policy review        | Annually  | Staff Advisor |
| Accessibility audit  | Annually  | KITS Lead     |
| User feedback review | Quarterly | Staff Advisor |

---

## Compliance

Nexus is committed to meeting:

- **WCAG 2.1 Level AA** (minimum)
- **Sri Lanka Web Accessibility Standard** (if applicable)
- **GDPR** (data privacy and accessibility)

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

---

# governance/Editorial-Style-Guide.md
