// apps/web/src/data/about.ts
// Static, non‑localizable data – numbers, image paths, fallback IDs.
// All text moved to messages/en/about.json

export const stats = [
  { id: 'founded', target: 1873, suffix: '', labelKey: 'stats.founded' },
  { id: 'students', target: 5000, suffix: '+', labelKey: 'stats.students' },
  { id: 'staff', target: 200, suffix: '+', labelKey: 'stats.staff' },
  { id: 'years', target: 153, suffix: '', labelKey: 'stats.years' },
];

// For carousel or timeline, if you need image paths (still static)
export const timelineImageMap: Record<string, string> = {
  founding: '/images/history/1873.jpg',
  recognition: '/images/history/1901.jpg',
  // ... others
};

// Alumni profile images (if not in CMS)
export const alumniImages: Record<string, string> = {
  '1': '/images/alumni/dr-silva.jpg',
  '2': '/images/alumni/mr-perera.jpg',
};
