// packages/database/prisma/seed/pages/about.ts

import { SUPPORTED_LOCALES } from '@nexus/contracts';

import type { PrismaClient } from '../../../src/generated/prisma/client.js';

// Helpers

const SCOPE = 'page:about';
const STATUS = 'published';

// ─── English About ───────────────────────────────────────────────────────────

const ABOUT_SEED_EN = {
  hero: {
    eyebrow: 'Est. 1873 · Mathugama, Sri Lanka',
    title: 'About',
    titleEm: 'KCC',
    subtitle:
      "Sri Lanka's first Central College — 153 years of shaping the minds that shaped a nation.",
  },
  stats: {
    stats: [
      {
        id: 'students',
        target: 5000,
        suffix: '+',
        label: 'Students',
        description: 'Enrolled across all grades',
      },
      {
        id: 'staff',
        target: 200,
        suffix: '+',
        label: 'Staff',
        description: 'Teaching & support',
      },
      {
        id: 'years',
        target: 153,
        label: 'Years',
        description: 'Of free education',
      },
      {
        id: 'societies',
        target: 20,
        suffix: '+',
        label: 'Societies',
        description: 'Clubs & societies',
      },
    ],
  },
  story: {
    eyebrow: 'Our Story',
    heading: 'The school that',
    headingEm: 'changed a nation.',
    paragraph:
      'In 1873, a school was founded in Mathugama that would, within a century, help reshape the entire educational landscape of Sri Lanka. C.W.W. Kannangara Central College began as a beacon of opportunity in the Southern Province — the very first Central College in the country. Our name honours Dr. C.W.W. Kannangara, the "Father of Free Education" in Sri Lanka, who fought tirelessly to ensure that no child would be denied the right to learn because of poverty. His 1944 Free Education Bill transformed this nation. Our school carries that legacy forward. Today, with over 5,000 students, more than 200 dedicated teachers, and a vibrant community of societies and extracurricular programmes, we remain what we have always been: a place where futures are built, character is forged, and excellence is not aspired to — it is expected.',
    quote:
      'Education is not a privilege of the few. It is the birthright of every child born in this country.',
    quoteAuthor: '~ Dr. C.W.W. Kannangara',
  },
  aboutKannangara: {
    eyebrow: 'Our Namesake',
    name: 'Dr. C.W.W. Kannangara',
    position: 'Minister of Education · Father of Free Education',
    portraitAlt: 'Dr. C.W.W. Kannangara portrait',
    portraitCaption: 'Dr. C.W.W. Kannangara (1884–1969)',
    portraitSrc: '/assets/images/ironman.jpg',
    paragraph:
      'Cyril Wimalasiri Wijesinghe Kannangara was born in 1884 in Randombe, Hikkaduwa, and would go on to become the most transformative figure in Sri Lankan educational history. As Minister of Education from 1931, he championed a radical idea: that birth and wealth should not determine whether a child received an education. His Central College system — of which this institution is the original, established in 1941 — created pathways to secondary education for children across the island. A defining moment came in 1903, when Kannangara led the British Empire list in Mathematics at Cambridge Senior exams, proving that rural-born students could excel at the highest level. We carry his name not merely as a label, but as a commitment.',
    quote:
      'Education is not a privilege of the few. It is the birthright of every child born in this country.',
    attribution: '~ Dr. C.W.W. Kannangara',
  },
  timeline: {
    eyebrow: '153 Years of History',
    heading: 'Milestones',
    milestones: [
      {
        id: 'founding',
        year: '1873',
        title: 'The First Central College',
        description:
          'C.W.W. Kannangara Central College is established as a vernacular school in Mathugama, serving the indigenous population of the Kalutara District.',
        era: 'early',
      },
      {
        id: 'recognition',
        year: '1901',
        title: 'Recognition & Growth',
        description:
          'The school receives formal government recognition, transitioning to a bilingual system and expanding its curriculum for the region.',
        era: 'early',
      },
      {
        id: 'movement',
        year: '1932',
        title: 'The Free Education Movement',
        description:
          'Dr. C.W.W. Kannangara begins his crusade for free education in Ceylon — a movement that would transform the entire nation.',
        era: 'mid',
      },
      {
        id: 'freeEducation',
        year: '1944',
        title: 'Free Education Bill',
        description:
          'Dr. Kannangara presents the landmark Free Education Bill on May 30, 1944, after one of the longest speeches in legislative history. It passes to thunderous applause.',
        era: 'mid',
      },
      {
        id: 'scouts',
        year: '1952',
        title: 'Scouts Founded',
        description:
          "The KCC Scout Troop is established by Hilary Silva in 1952. It goes on to produce 35+ President's Award winners, with Neyomal Kannangara as the first recipient.",
        era: 'mid',
      },
      {
        id: 'excellence',
        year: '1980s',
        title: 'Academic Excellence Era',
        description:
          'The college enters a golden era of achievement, with O/L pass rates exceeding 95% and university entrances becoming the highest in the Kalutara District.',
        era: 'modern',
      },
      {
        id: 'kits',
        year: '2010',
        title: 'KITS Established',
        description:
          'The Kannangara ICT Society is founded, launching a new chapter in technology education. KITS goes on to win Gold and Silver at the SLIIT Codefest 2024.',
        era: 'modern',
      },
      {
        id: 'nexus',
        year: '2026',
        title: 'Nexus Launches',
        description:
          "KITS launches Nexus — the school's new digital institution. Built entirely by students, for the community.",
        era: 'modern',
      },
    ],
  },
  ethos: {
    mottoEyebrow: 'Our Motto',
    motto: 'Wisdom is All Wealth',
    visionEyebrow: 'Our Vision',
    visionText:
      'To be a nationally recognised institution of academic and human excellence — producing graduates who lead with wisdom, serve with integrity, and advance Sri Lanka with every endeavour.',
    missionEyebrow: 'Our Mission',
    missionText:
      'To provide every student with a rigorous, holistic education in the tradition of Dr. Kannangara — accessible to all, demanding of each, and dedicated to the fullest development of every young person in our care.',
  },
  values: {
    valuesEyebrow: 'Core Values',
    values: [
      {
        id: 'wisdom',
        english: 'Wisdom',
        latin: 'Sapientia',
        desc: 'The pursuit of knowledge not for personal gain alone, but for the betterment of community and nation.',
      },
      {
        id: 'integrity',
        english: 'Integrity',
        latin: 'Integritas',
        desc: 'Doing what is right even when no one is watching — the foundation upon which trust and character are built.',
      },
      {
        id: 'excellence',
        english: 'Excellence',
        latin: 'Excellentia',
        desc: 'Not mere competence, but the relentless pursuit of the highest standard in everything we undertake.',
      },
      {
        id: 'service',
        english: 'Service',
        latin: 'Servitium',
        desc: 'The obligation to give back — to school, community, and nation — proportional to the privilege of education received.',
      },
    ],
  },
  crest: {
    eyebrow: 'Heraldry & Meaning',
    heading: 'The Crest Explained',
    intro:
      'Every element of the school crest was chosen deliberately. Nothing is decorative for its own sake — each symbol carries meaning rooted in Sri Lankan heritage and the values of this institution.',
    symbols: [
      {
        id: 'lamp',
        name: 'The Lamp of Knowledge',
        meaning:
          "The oil lamp — Pahana — represents the light of education driving away the darkness of ignorance. It is the school's most sacred symbol, the reason gold runs through everything we do.",
        position: 'top-right',
      },
      {
        id: 'lotus',
        name: 'The Lotus',
        meaning:
          'Rising from murky water to bloom in perfect form, the lotus symbolises the potential within every student — regardless of circumstance — to achieve purity and excellence.',
        position: 'top-left',
      },
      {
        id: 'dharmachakra',
        name: 'The Dharmachakra',
        meaning:
          'The wheel of the dharma represents truth, righteousness, and the cyclical pursuit of wisdom. It reminds us that learning is never finished.',
        position: 'bottom-left',
      },
      {
        id: 'laurel',
        name: 'The Laurel',
        meaning:
          'The laurel wreath encircling the crest signifies achievement, honour, and the recognition of excellence in academic, sporting, and cultural endeavour.',
        position: 'bottom-right',
      },
    ],
  },
  legacy: {
    spirit: {
      eyebrow: 'Spirit of Kannangara',
      heading: 'what it means to be a Kannangarian',
      paragraph:
        'The spirit of Kannangara is not about academic achievement alone. It is about carrying the torch of free education, the belief that every child deserves a chance, and the obligation to give back. Kannangarians are found in every corner of Sri Lanka and the world — doctors, engineers, teachers, entrepreneurs — but they all share one thing: the understanding that wisdom is all wealth.',
      quote: 'Once a Kannangarian, always a Kannangarian',
      attribution: '~ School Proverb',
    },
    heritage: {
      eyebrow: 'Physical Heritage',
      heading: 'The Campus Through Time',
      caption: 'Historical photographs of the campus coming soon.',
      images: [
        { src: '/assets/images/ironman.jpg', alt: 'Campus view 1' },
        { src: '/assets/images/ironman.jpg', alt: 'Campus view 2' },
        { src: '/assets/images/ironman.jpg', alt: 'Campus view 3' },
        { src: '/assets/images/ironman.jpg', alt: 'Campus view 4' },
      ],
    },
  },
  anthem: {
    eyebrow: 'Our Anthem',
    heading: 'The School Song',
    paragraph:
      "For over a century, generations of students have sung the school anthem at assemblies, prize-givings, and on the day they graduated. Its words carry the school's values — the pursuit of knowledge, the call to service, the bond of fellowship. The anthem is performed by the school choir and the Boys Brass Band at all major ceremonies. It is the sound of this institution.",
    playerTitle: 'KCC School Anthem',
    playerSubtitle: 'Performed by KCC School Choir',
    lyricsSinhala:
      'ශ්‍රීයෙන දින දින වැජඹේ මතුගම \\n මැදි මහ විදුහල් මාතා පෙම්බර \\n සිසුනට සැම දින විදුරැස පතුරන \\n ඔබෙ නම සමරමු සැමදා……….// \\n\\n කඳු මුදුනින් සිප එන සිහිලැල් \\n රන් මිණි මුතු පිරි දි෺ සුනිමල්………….//\\nකළු ගංගා රාණී සිරි දුව ගේ\\nආසිරි නිති ලබනා\\nඹබවේ පෙම්බර විදුහල් මාතා………//\\n\\nශ්‍රීයෙන දින දින ……………………………………..',
    anthemSrc: '/media/anthem.mp3',
  },
  closing: {
    eyebrow: 'Closing Statement',
    heading: 'The light continues.',
    body: 'Since 1873, every student who has passed through these gates has carried forward a belief that Dr. Kannangara gave this nation: that wisdom, not wealth, is the measure of a life well lived. One hundred and fifty-three years on, that belief is still the first thing taught here — and the last thing forgotten.',
    rule: 'Wisdom is All Wealth · Est. 1873 · Mathugama, Sri Lanka',
  },
};

// ─── Sinhala About ───────────────────────────────────────────────────────────

const ABOUT_SEED_SI = {
  hero: {
    eyebrow: 'ස්ථාපිතය 1873 · මතුගම, ශ්‍රී ලංකාව',
    title: 'අප',
    titleEm: 'ගැන',
    subtitle:
      'ශ්‍රී ලංකාවේ ප්‍රථම මධ්‍ය මහා විද්‍යාලය — ජාතිය හැඩගැස්වූ බුද්ධිමතුන් බිහිකළ වසර 153ක අභිමානය.',
  },
  stats: {
    stats: [
      {
        id: 'students',
        target: 5000,
        suffix: '+',
        label: 'Students',
        description: 'Enrolled across all grades',
      },
      {
        id: 'staff',
        target: 200,
        suffix: '+',
        label: 'Staff',
        description: 'Teaching & support',
      },
      {
        id: 'years',
        target: 153,
        label: 'Years',
        description: 'Of free education',
      },
      {
        id: 'societies',
        target: 20,
        suffix: '+',
        label: 'Societies',
        description: 'Clubs & societies',
      },
    ],
  },
  story: {
    eyebrow: 'අපේ කතාව',
    heading: 'ජාතියක් වෙනස් කළ',
    headingEm: 'පාසල.',
    paragraph:
      '1873 දී මතුගම ආරම්භ කරන ලද මෙම පාසල, සියවසක් ඇතුළත ශ්‍රී ලංකාවේ සමස්ත අධ්‍යාපන ක්ෂේත්‍රයම ප්‍රතිනිර්මාණය කිරීමට දායක විය. සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර මධ්‍ය මහා විද්‍යාලය දකුණු පළාතේ අවස්ථා පුළුල් කරන ආලෝකයක් ලෙස ආරම්භ වූ අතර, එය මෙරට ප්‍රථම මධ්‍ය මහා විද්‍යාලයයි. අපගේ නාමයෙන් ගෞරවයට පාත්‍ර වන්නේ, දරිද්‍රතාවය හේතුවෙන් කිසිදු දරුවෙකුට අධ්‍යාපනය ලැබීමේ අයිතිය අහිමි නොවිය යුතු බවට වෙහෙස නොබලා සටන් කළ, ශ්‍රී ලංකාවේ "නිදහස් අධ්‍යාපනයේ පියා" වන ආචාර්ය සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර මැතිතුමාටයි.',
    quote:
      'අධ්‍යාපනය යනු සුළු පිරිසකගේ වරප්‍රසාදයක් නොවේ. එය මේ රටේ උපන් සෑම දරුවෙකුගේම උපන් අයිතියයි.',
    quoteAuthor: '~ ආචාර්ය සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර',
  },
};

// ─── Tamil About ───────────────────────────────────────────────────────────

const ABOUT_SEED_TA = {
  hero: {
    eyebrow: 'நிறுவப்பட்டது 1873 · மத்துகம, இலங்கை',
    title: 'எங்களை',
    titleEm: 'பற்றி',
    subtitle:
      'இலங்கையின் முதலாவது மத்திய மகா வித்தியாலயம் — தேசத்தை உருவாக்கிய அறிஞர்களை உருவாக்கிய 153 வருட அசைக்க முடியாத பெருமை.',
  },
  stats: {
    stats: [
      {
        id: 'students',
        target: 5000,
        suffix: '+',
        label: 'Students',
        description: 'Enrolled across all grades',
      },
      {
        id: 'staff',
        target: 200,
        suffix: '+',
        label: 'Staff',
        description: 'Teaching & support',
      },
      {
        id: 'years',
        target: 153,
        label: 'Years',
        description: 'Of free education',
      },
      {
        id: 'societies',
        target: 20,
        suffix: '+',
        label: 'Societies',
        description: 'Clubs & societies',
      },
    ],
  },
  story: {
    eyebrow: 'எமது வரலாறு',
    heading: 'ஒரு தேசத்தை',
    headingEm: 'மாற்றிய பாடசாலை.',
    paragraph:
      '1873 இல் மத்துகமவில் ஆரம்பிக்கப்பட்ட இப்பாடசாலை, ஒரு நூற்றாண்டுக்குள் இலங்கையின் முழுமையான கல்விப் பரப்பையே மாற்றியமைக்க உதவியது. சி.டபிள்யு.டபிள்யு. கண்ணங்கர மத்திய மகா வித்தியாலயம் தென் மாகாணத்தில் ஒரு வாய்ப்பின் கலங்கரை விளக்கமாக - நாட்டின் முதலாவது மத்திய மகா வித்தியாலயமாக ஆரம்பிக்கப்பட்டது.',
    quote:
      'கல்வி என்பது ஒரு சிலரின் சலுகையல்ல. இது இந்த நாட்டில் பிறந்த ஒவ்வொரு குழந்தையின் பிறப்புரிமையாகும்.',
    quoteAuthor: '~ கலாநிதி சி.டபிள்யு.டபிள்யு. கண்ணங்கர',
  },
};

// Helpers

const ABOUT_SEED = {
  en: ABOUT_SEED_EN,
  si: ABOUT_SEED_SI,
  ta: ABOUT_SEED_TA,
};

// Seed function

const SECTION_CONFIG = {
  hero: { sectionKey: 'about.hero', contentType: 'hero' },
  stats: { sectionKey: 'about.stats', contentType: 'stats' },
  story: { sectionKey: 'about.story', contentType: 'richText' },
  aboutKannangara: {
    sectionKey: 'about.aboutKannangara',
    contentType: 'profile',
  },
  timeline: { sectionKey: 'about.timeline', contentType: 'timeline' },
  ethos: { sectionKey: 'about.ethos', contentType: 'ethos' },
  values: { sectionKey: 'about.values', contentType: 'values' },
  crest: { sectionKey: 'about.crest', contentType: 'crest' },
  legacy: { sectionKey: 'about.legacy', contentType: 'legacy' },
  anthem: { sectionKey: 'about.anthem', contentType: 'anthem' },
  closing: { sectionKey: 'about.closing', contentType: 'closing' },
};

export async function seedAbout(db: PrismaClient): Promise<void> {
  for (const locale of SUPPORTED_LOCALES) {
    const localeData = ABOUT_SEED[locale];
    if (!localeData) continue;

    for (const [sectionName, sectionData] of Object.entries(localeData)) {
      const config = SECTION_CONFIG[sectionName as keyof typeof SECTION_CONFIG];
      if (!config) continue;

      const payload = {
        scope: SCOPE,
        sectionKey: config.sectionKey,
        locale,
        status: STATUS,
        data: sectionData as object,
        contentType: config.contentType,
        version: 1,
      };

      await db.contentEntry.upsert({
        where: {
          scope_sectionKey_locale: {
            scope: payload.scope,
            sectionKey: payload.sectionKey,
            locale: payload.locale,
          },
        },
        update: {
          data: payload.data,
          contentType: payload.contentType,
          status: payload.status,
        },
        create: payload,
      });
    }
  }
}
