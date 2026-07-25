// packages/database/prisma/seed/pages/about.ts

import { SUPPORTED_LOCALES, HERO_BLOCK, STATS_BLOCK, CREST_SYMBOLS_BLOCK, ANTHEM_BLOCK } from '@nexus/contracts';
import type { AboutHeroData, AboutStatsData, AboutStoryData, AboutKannangaraData, AboutTimelineData, AboutEthosData, AboutValuesData, AboutCrestData, AboutAlumniData, AboutLegacyData, AboutAnthemData, AboutClosingData } from '@nexus/contracts';

import type { PrismaClient } from '../../../src/generated/prisma/client.js';

// ─── Constants ────────────────────────────────────────────────────────────────

const SCOPE = 'page:about';
const STATUS = 'published';

type AboutPageSeed = {
  hero: AboutHeroData;
  stats: AboutStatsData;
  story: AboutStoryData;
  aboutKannangara: AboutKannangaraData;
  timeline: AboutTimelineData;
  ethos: AboutEthosData;
  values: AboutValuesData;
  crest: AboutCrestData;
  alumni: AboutAlumniData;
  legacy: AboutLegacyData;
  anthem: AboutAnthemData;
  closing: AboutClosingData;
};

// ─── English ──────────────────────────────────────────────────────────────────

const ABOUT_SEED_EN: AboutPageSeed = {
  hero: {
    blockType: HERO_BLOCK,
    eyebrow: 'Est. 1873 · Mathugama, Sri Lanka',
    title: 'About',
    titleEm: 'KCC',
    subtitle: "Sri Lanka's first Central College — 153 years of shaping the minds that shaped a nation.",
  },
  stats: {
    blockType: STATS_BLOCK,
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
    paragraph: 'In 1873, a school was founded in Mathugama that would, within a century, help reshape the entire educational landscape of Sri Lanka. C.W.W. Kannangara Central College began as a beacon of opportunity in the Southern Province — the very first Central College in the country. Our name honours Dr. C.W.W. Kannangara, the "Father of Free Education" in Sri Lanka, who fought tirelessly to ensure that no child would be denied the right to learn because of poverty. His 1944 Free Education Bill transformed this nation. Our school carries that legacy forward. Today, with over 5,000 students, more than 200 dedicated teachers, and a vibrant community of societies and extracurricular programmes, we remain what we have always been: a place where futures are built, character is forged, and excellence is not aspired to — it is expected.',
    quote: 'Education is not a privilege of the few. It is the birthright of every child born in this country.',
    quoteAuthor: '~ Dr. C.W.W. Kannangara',
  },
  aboutKannangara: {
    eyebrow: 'Our Namesake',
    name: 'Dr. C.W.W. Kannangara',
    position: 'Minister of Education · Father of Free Education',
    portraitAlt: 'Dr. C.W.W. Kannangara portrait',
    portraitCaption: 'Dr. C.W.W. Kannangara (1884–1969)',
    portraitSrc: '/assets/images/ironman.jpg',
    paragraph: 'Cyril Wimalasiri Wijesinghe Kannangara was born in 1884 in Randombe, Hikkaduwa, and would go on to become the most transformative figure in Sri Lankan educational history. As Minister of Education from 1931, he championed a radical idea: that birth and wealth should not determine whether a child received an education. His Central College system — of which this institution is the original, established in 1941 — created pathways to secondary education for children across the island. A defining moment came in 1903, when Kannangara led the British Empire list in Mathematics at Cambridge Senior exams, proving that rural-born students could excel at the highest level. We carry his name not merely as a label, but as a commitment.',
    quote: 'Education is not a privilege of the few. It is the birthright of every child born in this country.',
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
        description: 'C.W.W. Kannangara Central College is established as a vernacular school in Mathugama, serving the indigenous population of the Kalutara District.',
        era: 'early',
      },
      {
        id: 'recognition',
        year: '1901',
        title: 'Recognition & Growth',
        description: 'The school receives formal government recognition, transitioning to a bilingual system and expanding its curriculum for the region.',
        era: 'early',
      },
      {
        id: 'movement',
        year: '1932',
        title: 'The Free Education Movement',
        description: 'Dr. C.W.W. Kannangara begins his crusade for free education in Ceylon — a movement that would transform the entire nation.',
        era: 'mid',
      },
      {
        id: 'freeEducation',
        year: '1944',
        title: 'Free Education Bill',
        description: 'Dr. Kannangara presents the landmark Free Education Bill on May 30, 1944, after one of the longest speeches in legislative history. It passes to thunderous applause.',
        era: 'mid',
      },
      {
        id: 'scouts',
        year: '1952',
        title: 'Scouts Founded',
        description: "The KCC Scout Troop is established by Hilary Silva in 1952. It goes on to produce 35+ President's Award winners, with Neyomal Kannangara as the first recipient.",
        era: 'mid',
      },
      {
        id: 'excellence',
        year: '1980s',
        title: 'Academic Excellence Era',
        description: 'The college enters a golden era of achievement, with O/L pass rates exceeding 95% and university entrances becoming the highest in the Kalutara District.',
        era: 'modern',
      },
      {
        id: 'kits',
        year: '2010',
        title: 'KITS Established',
        description: 'The Kannangara ICT Society is founded, launching a new chapter in technology education. KITS goes on to win Gold and Silver at the SLIIT Codefest 2024.',
        era: 'modern',
      },
      {
        id: 'nexus',
        year: '2026',
        title: 'Nexus Launches',
        description: "KITS launches Nexus — the school's new digital institution. Built entirely by students, for the community.",
        era: 'modern',
      },
    ],
  },
  ethos: {
    mottoEyebrow: 'Our Motto',
    motto: 'Wisdom is All Wealth',
    visionEyebrow: 'Our Vision',
    visionText: 'To be a nationally recognised institution of academic and human excellence — producing graduates who lead with wisdom, serve with integrity, and advance Sri Lanka with every endeavour.',
    missionEyebrow: 'Our Mission',
    missionText: 'To provide every student with a rigorous, holistic education in the tradition of Dr. Kannangara — accessible to all, demanding of each, and dedicated to the fullest development of every young person in our care.',
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
    blockType: CREST_SYMBOLS_BLOCK,
    eyebrow: 'Heraldry & Meaning',
    heading: 'The Crest Explained',
    intro: 'Every element of the school crest was chosen deliberately. Nothing is decorative for its own sake — each symbol carries meaning rooted in Sri Lankan heritage and the values of this institution.',
    symbols: [
      {
        id: 'lamp',
        name: 'The Lamp of Knowledge',
        meaning: "The oil lamp — Pahana — represents the light of education driving away the darkness of ignorance. It is the school's most sacred symbol, the reason gold runs through everything we do.",
        position: 'top-right',
      },
      {
        id: 'lotus',
        name: 'The Lotus',
        meaning: 'Rising from murky water to bloom in perfect form, the lotus symbolises the potential within every student — regardless of circumstance — to achieve purity and excellence.',
        position: 'top-left',
      },
      {
        id: 'dharmachakra',
        name: 'The Dharmachakra',
        meaning: 'The wheel of the dharma represents truth, righteousness, and the cyclical pursuit of wisdom. It reminds us that learning is never finished.',
        position: 'bottom-left',
      },
      {
        id: 'laurel',
        name: 'The Laurel',
        meaning: 'The laurel wreath encircling the crest signifies achievement, honour, and the recognition of excellence in academic, sporting, and cultural endeavour.',
        position: 'bottom-right',
      },
    ],
  },
  alumni: {
    eyebrow: 'Notable Alumni',
    heading: 'The Kannangarian Legacy',
    profiles: [
      // Example profile; replace with real data.
      {
        id: 'alum-1',
        name: 'Dr. A. Silva',
        graduationYear: '1990',
        currentRole: 'Doctor',
        quote: 'KCC shaped my future.',
        portrait: {
          src: '/assets/images/ironman.jpg',
          alt: 'Dr. A. Silva',
        },
      },
    ],
  },
  legacy: {
    spirit: {
      eyebrow: 'Spirit of Kannangara',
      heading: 'what it means to be a Kannangarian',
      paragraph: 'The spirit of Kannangara is not about academic achievement alone. It is about carrying the torch of free education, the belief that every child deserves a chance, and the obligation to give back. Kannangarians are found in every corner of Sri Lanka and the world — doctors, engineers, teachers, entrepreneurs — but they all share one thing: the understanding that wisdom is all wealth.',
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
    blockType: ANTHEM_BLOCK,
    eyebrow: 'Our Anthem',
    heading: 'The School Song',
    paragraph: "For over a century, generations of students have sung the school anthem at assemblies, prize-givings, and on the day they graduated. Its words carry the school's values — the pursuit of knowledge, the call to service, the bond of fellowship. The anthem is performed by the school choir and the Boys Brass Band at all major ceremonies. It is the sound of this institution.",
    playerTitle: 'KCC School Anthem',
    playerSubtitle: 'Performed by KCC School Choir',
    lyricsSinhala: 'ශ්‍රීයෙන දින දින වැජඹේ මතුගම\nමැදි මහ විදුහල් මාතා පෙම්බර\nසිසුනට සැම දින විදුරැස පතුරන\nඔබෙ නම සමරමු සැමදා……….//\n\nකඳු මුදුනින් සිප එන සිහිලැල්\nරන් මිණි මුතු පිරි දිය සුනිමල්………….//\n\nකළු ගංගා රාණී සිරි දුව ගේ\nආසිරි නිති ලබනා\nඔබවේ පෙම්බර විදුහල් මාතා………//\n\nශ්‍රීයෙන දින දින ……………………………………..\n\nසැමදින ධර්මය යුක්තය සේවය සඳහා කැපවී\nජීවිත පුද දී ඔබෙ ගරු නාමය බබළවමු\nගිය ගිය තැන ජය ලැබ ගනිමු\n\nඔබ එලියෙන් ඥාණය ලැබ දී\nසැපත කරා පමුණනු මැනවී\n\nශ්‍රීයෙන දින දින ………………………………..\n\nශ්‍රී…………………………………………..',
    anthemSrc: '/assets/media/anthem.mp3',
  },
  closing: {
    eyebrow: 'Closing Statement',
    heading: 'The light continues.',
    body: 'Since 1873, every student who has passed through these gates has carried forward a belief that Dr. Kannangara gave this nation: that wisdom, not wealth, is the measure of a life well lived. One hundred and fifty-three years on, that belief is still the first thing taught here — and the last thing forgotten.',
    rule: 'Wisdom is All Wealth · Est. 1873 · Mathugama, Sri Lanka',
  },
};

// ─── Sinhala ──────────────────────────────────────────────────────────────────

const ABOUT_SEED_SI: AboutPageSeed = {
  hero: {
    blockType: HERO_BLOCK,
    eyebrow: 'ස්ථාපිතය 1873 · මතුගම, ශ්‍රී ලංකාව',
    title: 'අප',
    titleEm: 'ගැන',
    subtitle: 'ශ්‍රී ලංකාවේ ප්‍රථම මධ්‍ය මහා විද්‍යාලය — ජාතිය හැඩගැස්වූ බුද්ධිමතුන් බිහිකළ වසර 153ක අභිමානය.',
  },
  stats: {
    blockType: STATS_BLOCK,
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
    paragraph: '1873 දී මතුගම ආරම්භ කරන ලද මෙම පාසල, සියවසක් ඇතුළත ශ්‍රී ලංකාවේ සමස්ත අධ්‍යාපන ක්ෂේත්‍රයම ප්‍රතිනිර්මාණය කිරීමට දායක විය. සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර මධ්‍ය මහා විද්‍යාලය දකුණු පළාතේ අවස්ථා පුළුල් කරන ආලෝකයක් ලෙස ආරම්භ වූ අතර, එය මෙරට ප්‍රථම මධ්‍ය මහා විද්‍යාලයයි. අපගේ නාමයෙන් ගෞරවයට පාත්‍ර වන්නේ, දරිද්‍රතාවය හේතුවෙන් කිසිදු දරුවෙකුට අධ්‍යාපනය ලැබීමේ අයිතිය අහිමි නොවිය යුතු බවට වෙහෙස නොබලා සටන් කළ, ශ්‍රී ලංකාවේ "නිදහස් අධ්‍යාපනයේ පියා" වන ආචාර්ය සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර මැතිතුමාටයි.',
    quote: 'අධ්‍යාපනය යනු සුළු පිරිසකගේ වරප්‍රසාදයක් නොවේ. එය මේ රටේ උපන් සෑම දරුවෙකුගේම උපන් අයිතියයි.',
    quoteAuthor: '~ ආචාර්ය සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර',
  },
  aboutKannangara: {
    eyebrow: 'අපගේ නාමයේ ආරම්භකයා',
    name: 'ආචාර්ය සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර',
    position: 'අධ්‍යාපන ඇමති · නිදහස් අධ්‍යාපනයේ පියා',
    portraitAlt: 'ආචාර්ය කන්නන්ගර ප්‍රතිමාව',
    portraitCaption: 'ආචාර්ය සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර (1884–1969)',
    portraitSrc: '/assets/images/ironman.jpg',
    paragraph: 'සයිරිල් විමලසිරි විජේසිංහ කන්නන්ගර 1884 දී හික්කඩුව රන්දොඹේ උපත ලැබූ අතර ශ්‍රී ලංකා අධ්‍යාපන ඉතිහාසයේ වඩාත්ම පරිවර්තනීය චරිතය බවට පත්විය. 1931 සිට අධ්‍යාපන ඇමති ලෙස, උපත හා ධනය දරුවෙකුට අධ්‍යාපනය ලැබිය යුතුද යන්න තීරණය නොකළ යුතු යන රැඩිකල් අදහසක් ඔහු ඉදිරිපත් කළේය. ඔහුගේ මධ්‍ය මහා විද්‍යාල ක්‍රමය — මෙම ආයතනය 1941 දී ආරම්භ කරන ලද මුල්ම එක — දිවයින පුරා සිටින දරුවන්ට ද්විතීයික අධ්‍යාපනය සඳහා මාර්ග නිර්මාණය කළේය. 1903 දී කේම්බ්‍රිජ් ජ්‍යෙෂ්ඨ විභාගවලදී කන්නන්ගර ගණිතයෙන් බ්‍රිතාන්‍ය අධිරාජ්‍ය ලැයිස්තුව මෙහෙයවූ අතර ග්‍රාමීය උපන් සිසුන්ට ඉහළම මට්ටමින් විශිෂ්ට විය හැකි බව ඔප්පු කළේය. අපි ඔහුගේ නම හුදු ලේබලයක් ලෙස නොව කැපවීමක් ලෙස දරන්නෙමු.',
    quote: 'අධ්‍යාපනය යනු සුළු පිරිසකගේ වරප්‍රසාදයක් නොවේ. එය මේ රටේ උපන් සෑම දරුවෙකුගේම උපන් අයිතියයි.',
    attribution: '~ ආචාර්ය සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර',
  },
  timeline: {
    eyebrow: 'වසර 153ක ඉතිහාසය',
    heading: 'සන්ධිස්ථාන',
    milestones: [
      {
        id: 'founding',
        year: '1873',
        title: 'ප්‍රථම මධ්‍ය මහා විද්‍යාලය',
        description: 'කන්නන්ගර මධ්‍ය මහා විද්‍යාලය කළුතර දිස්ත්‍රික්කයේ ආදිවාසී ජනතාවට සේවය කරමින් මතුගම ප්‍රාථමික පාසලක් ලෙස ආරම්භ කරන ලදී.',
        era: 'early',
      },
      {
        id: 'recognition',
        year: '1901',
        title: 'පිළිගැනීම හා වර්ධනය',
        description: 'පාසලට විධිමත් රජයේ පිළිගැනීමක් ලැබෙන අතර, භාෂා දෙකක පද්ධතියකට මාරු වී කලාපය සඳහා එහි විෂය මාලාව පුළුල් කරයි.',
        era: 'early',
      },
      {
        id: 'movement',
        year: '1932',
        title: 'නිදහස් අධ්‍යාපන ව්‍යාපාරය',
        description: 'ආචාර්ය කන්නන්ගර ලංකාවේ නිදහස් අධ්‍යාපනය සඳහා වූ ඔහුගේ ව්‍යාපාරය ආරම්භ කරයි — එය මුළු ජාතියම පරිවර්තනය කරන ව්‍යාපාරයකි.',
        era: 'mid',
      },
      {
        id: 'freeEducation',
        year: '1944',
        title: 'නිදහස් අධ්‍යාපන පනත',
        description: 'ආචාර්ය කන්නන්ගර 1944 මැයි 30 වන දින සුවිශේෂී නිදහස් අධ්‍යාපන පනත ඉදිරිපත් කරයි, එය ව්‍යවස්ථාදායක ඉතිහාසයේ දීර්ඝතම කතාවකින් පසුව ගිගුරුම් සහිත අත්පොළසන් නාදයට පත් වේ.',
        era: 'mid',
      },
      {
        id: 'scouts',
        year: '1952',
        title: 'බාලදක්ෂ සංගමය ආරම්භ විය',
        description: 'හිලරි සිල්වා විසින් 1952 දී කේ.සී.සී. බාලදක්ෂ බලකාය ආරම්භ කරන ලදී. එය ජනාධිපති සම්මානලාභීන් 35+ ක් බිහි කරයි, නෙයෝමල් කන්නන්ගර ප්‍රථම ලාභියා වේ.',
        era: 'mid',
      },
      {
        id: 'excellence',
        year: '1980s',
        title: 'ශාස්ත්‍රීය විශිෂ්ටත්ව යුගය',
        description: 'විද්‍යාලය ජයග්‍රහණවල රන් යුගයකට පිවිසෙයි, සාමාන්‍ය පෙළ සමත්වීමේ අනුපාතය 95% ඉක්මවන අතර විශ්වවිද්‍යාල ප්‍රවේශය කළුතර දිස්ත්‍රික්කයේ ඉහළම අගය බවට පත්වේ.',
        era: 'modern',
      },
      {
        id: 'kits',
        year: '2010',
        title: 'KITS ආරම්භ විය',
        description: 'කන්නන්ගර තොරතුරු හා සන්නිවේදන තාක්ෂණ සමාජය ආරම්භ කරන අතර තාක්ෂණ අධ්‍යාපනයේ නව පරිච්ඡේදයක් ආරම්භ කරයි. KITS SLIIT Codefest 2024 හි රන් හා රිදී දිනා ගනී.',
        era: 'modern',
      },
      {
        id: 'nexus',
        year: '2026',
        title: 'Nexus දියත් කිරීම',
        description: 'KITS විසින් පාසලේ නව ඩිජිටල් ආයතනය වන Nexus දියත් කරයි. සිසුන් විසින් ප්‍රජාව සඳහා සම්පූර්ණයෙන්ම ගොඩනගා ඇත.',
        era: 'modern',
      },
    ],
  },
  ethos: {
    mottoEyebrow: 'අපගේ ආදර්ශ පාඨය',
    motto: 'සුඛෝ පඤ්ඤාය පඨිලාභෝ',
    visionEyebrow: 'අපගේ දැක්ම',
    visionText: 'ජාතික වශයෙන් පිළිගත් ශාස්ත්‍රීය හා මානව විශිෂ්ටත්වයේ ආයතනයක් වීම — ප්‍රඥාවෙන් මෙහෙයවන, අඛණ්ඩතාවයෙන් සේවය කරන, සහ එක් එක් උත්සාහයෙන් ශ්‍රී ලංකාව ඉදිරියට ගෙන යන උපාධිධාරීන් බිහි කිරීම.',
    missionEyebrow: 'අපගේ මෙහෙවර',
    missionText: 'ආචාර්ය කන්නන්ගරගේ සම්ප්‍රදාය තුළ සෑම සිසුවෙකුටම දැඩි, පරිපූර්ණ අධ්‍යාපනයක් ලබා දීම — සියල්ලන්ටම ප්‍රවේශ විය හැකි, එක් එක් අයගෙන් ඉල්ලා සිටින, සහ අපගේ රැකවරණයේ සිටින සෑම තරුණයෙකුගේම සම්පූර්ණ සංවර්ධනය සඳහා කැපවී සිටීම.',
  },
  values: {
    valuesEyebrow: 'හර මූලධර්ම',
    values: [
      {
        id: 'wisdom',
        english: 'ප්‍රඥාව',
        latin: 'Sapientia',
        desc: 'තනි පුද්ගල ලාභය සඳහා පමණක් නොව, ප්‍රජාවගේ සහ ජාතියේ යහපත සඳහා දැනුම සෙවීම.',
      },
      {
        id: 'integrity',
        english: 'අඛණ්ඩතාව',
        latin: 'Integritas',
        desc: 'කිසිවෙකු නොබලන විට පවා නිවැරදි දේ කිරීම — විශ්වාසය හා චරිතය ගොඩනඟන පදනම.',
      },
      {
        id: 'excellence',
        english: 'විශිෂ්ටත්වය',
        latin: 'Excellentia',
        desc: 'හුදු දක්ෂතාවය නොව, අප සිදු කරන සෑම දෙයකම ඉහළම ප්‍රමිතිය සඳහා නිරන්තර උත්සාහය.',
      },
      {
        id: 'service',
        english: 'සේවය',
        latin: 'Servitium',
        desc: 'ලැබුණු අධ්‍යාපනයේ වරප්‍රසාදයට සමානුපාතිකව පාසලට, ප්‍රජාවට සහ ජාතියට ආපසු ලබා දීමේ බැඳීම.',
      },
    ],
  },
  crest: {
    blockType: CREST_SYMBOLS_BLOCK,
    eyebrow: 'හෙරල්ඩ්‍රි සහ අර්ථය',
    heading: 'ලාංඡනය විස්තර කර ඇත',
    intro: 'පාසල් ලාංඡනයේ සෑම අංගයක්ම හිතාමතා තෝරාගෙන ඇත. කිසිවක් තමන්ගේම අර්ථය සඳහා විසිතුරු නොවේ — සෑම සංකේතයක්ම ශ්‍රී ලංකා උරුමයට හා මෙම ආයතනයේ වටිනාකම්වලට මුල් බැස ඇති අර්ථයක් දරයි.',
    symbols: [
      {
        id: 'lamp',
        name: 'දැනුමේ පහන',
        meaning: 'තෙල් පහන — පහන — අධ්‍යාපනයේ ආලෝකය නොදැනුම්කමේ අන්ධකාරය පලවා හරින බව නියෝජනය කරයි. එය පාසලේ වඩාත්ම පූජනීය සංකේතය වන අතර, අප කරන සෑම දෙයකම රනින් ගලා යාමට හේතුවයි.',
        position: 'top-right',
      },
      {
        id: 'lotus',
        name: 'නෙළුම් මල',
        meaning: 'කැළඹිලි සහිත ජලයෙන් නැඟී පරිපූර්ණ ස්වරූපයෙන් පිපෙන නෙළුම් මල, සෑම සිසුවෙකු තුළම ඇති හැකියාව සංකේතවත් කරයි — තත්වයන් නොසලකා — පාරිශුද්ධත්වය හා විශිෂ්ටත්වය සාක්ෂාත් කර ගැනීමට.',
        position: 'top-left',
      },
      {
        id: 'dharmachakra',
        name: 'ධර්ම චක්‍රය',
        meaning: 'ධර්මයේ රෝදය සත්‍යය, ධර්මිෂ්ඨකම සහ ප්‍රඥාවේ චක්‍රීය ගවේෂණය නියෝජනය කරයි. ඉගෙනීම කිසිදා අවසන් නොවන බව එය අපට මතක් කරයි.',
        position: 'bottom-left',
      },
      {
        id: 'laurel',
        name: 'ඩැෆ්නි මල් වඩම',
        meaning: 'ලාංඡනය වට කර ඇති ඩැෆ්නි මල් වඩම, ශාස්ත්‍රීය, ක්‍රීඩා සහ සංස්කෘතික උත්සාහයන්හි විශිෂ්ටත්වය හඳුනා ගැනීමේ ජයග්‍රහණය, ගෞරවය සහ පිළිගැනීම සංකේතවත් කරයි.',
        position: 'bottom-right',
      },
    ],
  },
  alumni: {
    eyebrow: 'කීර්තිමත් ආදි ශිෂ්‍යයන්',
    heading: 'කන්නන්ගරියන් උරුමය',
    profiles: [
      {
        id: 'alum-1',
        name: 'ආචාර්ය ඒ. සිල්වා',
        graduationYear: '1990',
        currentRole: 'වෛද්‍යවරයා',
        quote: 'කේ.සී.සී. මගේ අනාගතය හැඩගස්වා ගත්තා.',
        portrait: {
          src: '/assets/images/ironman.jpg',
          alt: 'ආචාර්ය ඒ. සිල්වා',
        },
      },
    ],
  },
  legacy: {
    spirit: {
      eyebrow: 'කන්නන්ගරගේ ආත්මය',
      heading: 'කන්නන්ගරියෙකු වීම යන්නෙන් අදහස් කරන්නේ කුමක්ද',
      paragraph: 'කන්නන්ගරගේ ආත්මය යනු ශාස්ත්‍රීය ජයග්‍රහණ පමණක් නොවේ. එය නිදහස් අධ්‍යාපනයේ පන්දම රැගෙන යාම, සෑම දරුවෙකුටම අවස්ථාවක් ලැබිය යුතු බවට ඇති විශ්වාසය සහ ආපසු ලබා දීමේ බැඳීමයි. කන්නන්ගරියන් ශ්‍රී ලංකාවේ සහ ලෝකයේ සෑම අස්සක් මුල්ලක් නෑරම දක්නට ලැබේ — වෛද්‍යවරුන්, ඉංජිනේරුවන්, ගුරුවරුන්, ව්‍යවසායකයින් — ඔවුන් සියල්ලෝම එක් දෙයක් බෙදා ගනී: ප්‍රඥාව සියලු ධනය බව අවබෝධ කර ගැනීම.',
      quote: 'වරක් කන්නන්ගරියෙක්, සැමවිටම කන්නන්ගරියෙක්',
      attribution: '~ පාසල් ආදර්ශ පාඨය',
    },
    heritage: {
      eyebrow: 'භෞතික උරුමය',
      heading: 'කාලය හරහා විද්‍යාලය',
      caption: 'ඉතිහාස ඡායාරූප ඉක්මනින් එක් කෙරේ.',
      images: [
        { src: '/assets/images/ironman.jpg', alt: 'විද්‍යාල දර්ශනය 1' },
        { src: '/assets/images/ironman.jpg', alt: 'විද්‍යාල දර්ශනය 2' },
        { src: '/assets/images/ironman.jpg', alt: 'විද්‍යාල දර්ශනය 3' },
        { src: '/assets/images/ironman.jpg', alt: 'විද්‍යාල දර්ශනය 4' },
      ],
    },
  },
  anthem: {
    blockType: ANTHEM_BLOCK,
    eyebrow: 'අපගේ ජාතික ගීය',
    heading: 'පාසල් ගීතය',
    paragraph: 'සියවසකට වැඩි කාලයක් තිස්සේ, සිසුන් පරම්පරා පාසල් ගීතය රැස්වීම්, ත්‍යාග ප්‍රදානෝත්සව සහ ඔවුන් උපාධිය ලැබූ දිනයේ ගායනා කර ඇත. එහි වචන පාසලේ වටිනාකම් දරයි — දැනුම සෙවීම, සේවයට කැඳවීම, සහෝදරත්වයේ බැඳීම. පාසල් ගායන කණ්ඩායම සහ බෝයිස් බ්‍රාස් බෑන්ඩ් විසින් සියලුම ප්‍රධාන උත්සවවලදී ගීතය ඉදිරිපත් කරයි. එය මෙම ආයතනයේ ශබ්දයයි.',
    playerTitle: 'කේ.සී.සී. පාසල් ගීතය',
    playerSubtitle: 'කේ.සී.සී. පාසල් ගායන කණ්ඩායම විසින් ඉදිරිපත් කරන ලදී',
    lyricsSinhala: 'ශ්‍රීයෙන දින දින වැජඹේ මතුගම\nමැදි මහ විදුහල් මාතා පෙම්බර\nසිසුනට සැම දින විදුරැස පතුරන\nඔබෙ නම සමරමු සැමදා……….//\n\nකඳු මුදුනින් සිප එන සිහිලැල්\nරන් මිණි මුතු පිරි දිය සුනිමල්………….//\n\nකළු ගංගා රාණී සිරි දුව ගේ\nආසිරි නිති ලබනා\nඔබවේ පෙම්බර විදුහල් මාතා………//\n\nශ්‍රීයෙන දින දින ……………………………………..\n\nසැමදින ධර්මය යුක්තය සේවය සඳහා කැපවී\nජීවිත පුද දී ඔබෙ ගරු නාමය බබළවමු\nගිය ගිය තැන ජය ලැබ ගනිමු\n\nඔබ එලියෙන් ඥාණය ලැබ දී\nසැපත කරා පමුණනු මැනවී\n\nශ්‍රීයෙන දින දින ………………………………..\n\nශ්‍රී…………………………………………..',
    anthemSrc: '/assets/media/anthem.mp3',
  },
  closing: {
    eyebrow: 'අවසන් ප්‍රකාශය',
    heading: 'ආලෝකය දිගටම පවතී.',
    body: '1873 සිට, මෙම දොරටු හරහා ගිය සෑම සිසුවෙකුම ආචාර්ය කන්නන්ගර මෙම ජාතියට ලබා දුන් විශ්වාසයක් ඉදිරියට ගෙන ගියේය: ධනය නොව ප්‍රඥාව මනාව ජීවත් වූ ජීවිතයක මිනුම බව. වසර එකසිය පනස් තුනක් ගත වූ පසුවත්, එම විශ්වාසය තවමත් මෙහි උගන්වන පළමු දෙය වන අතර අමතක වන අවසාන දෙයයි.',
    rule: 'සුඛෝ පඤ්ඤාය පඨිලාභෝ · Est. 1873 · මතුගම, ශ්‍රී ලංකාව',
  },
};

// ─── Tamil ──────────────────────────────────────────────────────────────────

const ABOUT_SEED_TA: AboutPageSeed = {
  hero: {
    blockType: HERO_BLOCK,
    eyebrow: 'நிறுவப்பட்டது 1873 · மத்துகம, இலங்கை',
    title: 'எங்களை',
    titleEm: 'பற்றி',
    subtitle: 'இலங்கையின் முதலாவது மத்திய மகா வித்தியாலயம் — தேசத்தை உருவாக்கிய அறிஞர்களை உருவாக்கிய 153 வருட அசைக்க முடியாத பெருமை.',
  },
  stats: {
    blockType: STATS_BLOCK,
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
    paragraph: '1873 இல் மத்துகமவில் ஆரம்பிக்கப்பட்ட இப்பாடசாலை, ஒரு நூற்றாண்டுக்குள் இலங்கையின் முழுமையான கல்விப் பரப்பையே மாற்றியமைக்க உதவியது. சி.டபிள்யு.டபிள்யு. கண்ணங்கர மத்திய மகா வித்தியாலயம் தென் மாகாணத்தில் ஒரு வாய்ப்பின் கலங்கரை விளக்கமாக - நாட்டின் முதலாவது மத்திய மகா வித்தியாலயமாக ஆரம்பிக்கப்பட்டது. எமது பெயர் இலங்கையின் "கட்டற்ற கல்வியின் தந்தை" கலாநிதி சி.டபிள்யு.டபிள்யு. கண்ணங்கரை கௌரவிக்கிறது. அவர் வறுமையின் காரணமாக எந்தக் குழந்தையும் கற்கும் உரிமையை இழக்கக்கூடாது என்று அயராது போராடினார். அவரது 1944 ஆம் ஆண்டு கட்டற்ற கல்விச் சட்டம் இந்த நாட்டை மாற்றியது. எமது பாடசாலை அந்த மரபை முன்னெடுத்துச் செல்கிறது. இன்று, 5,000 க்கும் மேற்பட்ட மாணவர்கள், 200 க்கும் மேற்பட்ட அர்ப்பணிப்புள்ள ஆசிரியர்கள், மற்றும் சமூகங்கள் மற்றும் பாடநெறி சார்ந்த நடவடிக்கைகளின் துடிப்பான சமூகத்துடன், நாங்கள் எப்போதும் இருந்ததைப் போலவே இருக்கிறோம்: எதிர்காலங்கள் கட்டமைக்கப்படும், பண்புகள் உருவாக்கப்படும், மற்றும் சிறப்பு முயற்சிக்கப்படாமல் எதிர்பார்க்கப்படுகிறது.',
    quote: 'கல்வி என்பது ஒரு சிலரின் சலுகையல்ல. இது இந்த நாட்டில் பிறந்த ஒவ்வொரு குழந்தையின் பிறப்புரிமையாகும்.',
    quoteAuthor: '~ கலாநிதி சி.டபிள்யு.டபிள்யு. கண்ணங்கர',
  },
  aboutKannangara: {
    eyebrow: 'எமது பெயரின் காரணம்',
    name: 'கலாநிதி சி.டபிள்யு.டபிள்யு. கண்ணங்கர',
    position: 'கல்வி அமைச்சர் · கட்டற்ற கல்வியின் தந்தை',
    portraitAlt: 'கலாநிதி கண்ணங்கர உருவப்படம்',
    portraitCaption: 'கலாநிதி சி.டபிள்யு.டபிள்யு. கண்ணங்கர (1884–1969)',
    portraitSrc: '/assets/images/ironman.jpg',
    paragraph: 'சைரில் விமலசிறி விஜேசிங்க கண்ணங்கர 1884 இல் ரண்டன்பே, ஹிக்கடுவவில் பிறந்தார், இலங்கை கல்வி வரலாற்றில் மிகவும் மாற்றத்தை ஏற்படுத்திய நபரானார். 1931 முதல் கல்வி அமைச்சராக, பிறப்பும் செல்வமும் ஒரு குழந்தைக்கு கல்வி கிடைக்குமா என்பதை தீர்மானிக்கக்கூடாது என்ற தீவிரமான கருத்தை அவர் முன்வைத்தார். அவரது மத்திய மகா வித்தியாலய முறை — இந்த நிறுவனம் 1941 இல் நிறுவப்பட்ட முதல் ஒன்று — தீவு முழுவதும் உள்ள குழந்தைகளுக்கு உயர்நிலை கல்விக்கான பாதைகளை உருவாக்கியது. 1903 இல் கேம்பிரிட்ஜ் மூத்த தேர்வுகளில் கணிதத்தில் பிரிட்டிஷ் பேரரசு பட்டியலை கண்ணங்கர் வழிநடத்தினார், கிராமப்புற பிறந்த மாணவர்கள் உயர்ந்த மட்டத்தில் சிறந்து விளங்க முடியும் என்பதை நிரூபித்தார். நாங்கள் அவரது பெயரை ஒரு முத்திரையாக மட்டுமல்ல, ஒரு உறுதிமொழியாகவும் கொண்டுள்ளோம்.',
    quote: 'கல்வி என்பது ஒரு சிலரின் சலுகையல்ல. இது இந்த நாட்டில் பிறந்த ஒவ்வொரு குழந்தையின் பிறப்புரிமையாகும்.',
    attribution: '~ கலாநிதி சி.டபிள்யு.டபிள்யு. கண்ணங்கர',
  },
  timeline: {
    eyebrow: '153 வருட வரலாறு',
    heading: 'மைல்கற்கள்',
    milestones: [
      {
        id: 'founding',
        year: '1873',
        title: 'முதல் மத்திய மகா வித்தியாலயம்',
        description: 'சி.டபிள்யு.டபிள்யு. கண்ணங்கர மத்திய மகா வித்தியாலயம் மத்துகமவில் ஒரு பிரதேசப் பாடசாலையாக நிறுவப்பட்டு, களுத்துறை மாவட்டத்தின் உள்ளூர் மக்களுக்கு சேவை செய்கிறது.',
        era: 'early',
      },
      {
        id: 'recognition',
        year: '1901',
        title: 'அங்கீகாரம் மற்றும் வளர்ச்சி',
        description: 'பாடசாலைக்கு அரசாங்க அங்கீகாரம் கிடைக்கிறது, இரண்டு மொழி முறைக்கு மாறி, பிராந்தியத்திற்கான பாடத்திட்டத்தை விரிவுபடுத்துகிறது.',
        era: 'early',
      },
      {
        id: 'movement',
        year: '1932',
        title: 'கட்டற்ற கல்வி இயக்கம்',
        description: 'கலாநிதி கண்ணங்கர் இலங்கையில் கட்டற்ற கல்விக்கான தனது இயக்கத்தைத் தொடங்குகிறார் — இது ஒரு முழு தேசத்தையும் மாற்றும் இயக்கமாகும்.',
        era: 'mid',
      },
      {
        id: 'freeEducation',
        year: '1944',
        title: 'கட்டற்ற கல்விச் சட்டம்',
        description: 'கலாநிதி கண்ணங்கர் மே 30, 1944 அன்று முக்கிய கட்டற்ற கல்விச் சட்டத்தை முன்வைக்கிறார், இது சட்டவாக்க வரலாற்றில் நீண்ட உரைகளில் ஒன்றிற்குப் பிறகு இடியுடன் கூடிய கைதட்டலுடன் நிறைவேற்றப்படுகிறது.',
        era: 'mid',
      },
      {
        id: 'scouts',
        year: '1952',
        title: 'ஸ்கவுட் குழு நிறுவப்பட்டது',
        description: 'ஹிலாரி சில்வா 1952 இல் கே.சி.சி. ஸ்கவுட் படையை நிறுவுகிறார். இது 35+ ஜனாதிபதி விருது பெற்றவர்களை உருவாக்குகிறது, இதில் நேயோமல் கண்ணங்கர் முதல் பெறுநர் ஆவார்.',
        era: 'mid',
      },
      {
        id: 'excellence',
        year: '1980s',
        title: 'கல்வி சிறப்பு சகாப்தம்',
        description: 'கல்லூரி சாதனைகளின் பொற்காலத்தில் நுழைகிறது, சாதாரண தரப்பில் தேர்ச்சி விகிதம் 95% ஐத் தாண்டுகிறது மற்றும் பல்கலைக்கழக நுழைவு களுத்துறை மாவட்டத்தில் மிக உயர்ந்ததாகிறது.',
        era: 'modern',
      },
      {
        id: 'kits',
        year: '2010',
        title: 'KITS நிறுவப்பட்டது',
        description: 'கண்ணங்கர தகவல் தொழில்நுட்ப சங்கம் நிறுவப்பட்டு, தொழில்நுட்பக் கல்வியில் ஒரு புதிய அத்தியாயத்தைத் தொடங்குகிறது. KITS SLIIT Codefest 2024 இல் தங்கம் மற்றும் வெள்ளி வென்றது.',
        era: 'modern',
      },
      {
        id: 'nexus',
        year: '2026',
        title: 'Nexus தொடக்கம்',
        description: 'KITS பள்ளியின் புதிய டிஜிட்டல் நிறுவனமான Nexus ஐ தொடங்குகிறது. மாணவர்களால், சமூகத்திற்காக முழுமையாக உருவாக்கப்பட்டது.',
        era: 'modern',
      },
    ],
  },
  ethos: {
    mottoEyebrow: 'எமது குறிக்கோள்',
    motto: 'Wisdom is All Wealth',
    visionEyebrow: 'எமது பார்வை',
    visionText: 'தேசிய அளவில் அங்கீகரிக்கப்பட்ட கல்வி மற்றும் மனித சிறப்பின் நிறுவனமாக இருத்தல் — ஞானத்துடன் வழிநடத்தும், ஒருமைப்பாட்டுடன் சேவை செய்யும், மற்றும் ஒவ்வொரு முயற்சியிலும் இலங்கையை முன்னேற்றும் பட்டதாரிகளை உருவாக்குதல்.',
    missionEyebrow: 'எமது பணி',
    missionText: 'கலாநிதி கண்ணங்கரின் பாரம்பரியத்தில் ஒவ்வொரு மாணவருக்கும் கண்டிப்பான, முழுமையான கல்வியை வழங்குதல் — அனைவருக்கும் அணுகக்கூடிய, ஒவ்வொருவரிடமும் கோரும், மற்றும் எங்கள் பராமரிப்பில் உள்ள ஒவ்வொரு இளம் நபரின் முழு வளர்ச்சிக்கும் அர்ப்பணித்தல்.',
  },
  values: {
    valuesEyebrow: 'அடிப்படை மதிப்புகள்',
    values: [
      {
        id: 'wisdom',
        english: 'ஞானம்',
        latin: 'Sapientia',
        desc: 'தனிப்பட்ட ஆதாயத்திற்காக மட்டுமல்ல, சமூகம் மற்றும் தேசத்தின் மேம்பாட்டிற்காக அறிவைத் தேடுதல்.',
      },
      {
        id: 'integrity',
        english: 'ஒருமைப்பாடு',
        latin: 'Integritas',
        desc: 'யாரும் பார்க்காத போதும் சரியானதைச் செய்தல் — நம்பிக்கையும் பண்பும் கட்டமைக்கப்படும் அடித்தளம்.',
      },
      {
        id: 'excellence',
        english: 'சிறப்பு',
        latin: 'Excellentia',
        desc: 'வெறும் திறமை அல்ல, நாம் மேற்கொள்ளும் ஒவ்வொரு காரியத்திலும் உயர்ந்த தரத்தை நோக்கிய இடைவிடாத முயற்சி.',
      },
      {
        id: 'service',
        english: 'சேவை',
        latin: 'Servitium',
        desc: 'பெறப்பட்ட கல்வியின் சலுகைக்கு விகிதாசாரமாக பள்ளி, சமூகம் மற்றும் தேசத்திற்கு திருப்பி வழங்கும் கடமை.',
      },
    ],
  },
  crest: {
    blockType: CREST_SYMBOLS_BLOCK,
    eyebrow: 'பூதுவர் மற்றும் பொருள்',
    heading: 'பூதுவர் விளக்கப்பட்டது',
    intro: 'பள்ளி பூதுவரின் ஒவ்வொரு உறுப்பும் வேண்டுமென்றே தேர்ந்தெடுக்கப்பட்டது. எதுவும் அதன் சொந்த நலனுக்காக அலங்காரமானது அல்ல — ஒவ்வொரு சின்னமும் இலங்கை பாரம்பரியத்தில் மற்றும் இந்த நிறுவனத்தின் மதிப்புகளில் வேரூன்றிய பொருளைக் கொண்டுள்ளது.',
    symbols: [
      {
        id: 'lamp',
        name: 'அறிவு விளக்கு',
        meaning: 'எண்ணெய் விளக்கு — பஹனா — கல்வியின் ஒளி அறியாமையின் இருளை விரட்டுவதைக் குறிக்கிறது. இது பள்ளியின் மிகவும் புனிதமான சின்னம், நாம் செய்யும் அனைத்திலும் தங்கம் பாய காரணம்.',
        position: 'top-right',
      },
      {
        id: 'lotus',
        name: 'தாமரை',
        meaning: 'கலங்கிய நீரில் இருந்து எழுந்து சரியான வடிவத்தில் மலரும் தாமரை, ஒவ்வொரு மாணவருக்கும் உள்ள ஆற்றலைக் குறிக்கிறது — சூழ்நிலைகளைப் பொருட்படுத்தாமல் — தூய்மையையும் சிறப்பையும் அடைய.',
        position: 'top-left',
      },
      {
        id: 'dharmachakra',
        name: 'தர்மசக்ரம்',
        meaning: 'தர்மத்தின் சக்கரம் உண்மை, நேர்மை, மற்றும் ஞானத்தின் சுழற்சித் தேடலைக் குறிக்கிறது. கற்றல் ஒருபோதும் முடிவடையாது என்பதை இது நமக்கு நினைவூட்டுகிறது.',
        position: 'bottom-left',
      },
      {
        id: 'laurel',
        name: 'வெற்றி வளைவு',
        meaning: 'பூதுவரை சுற்றியுள்ள வெற்றி வளைவு, கல்வி, விளையாட்டு மற்றும் கலாச்சார முயற்சிகளில் சிறப்பை அங்கீகரிப்பதில் சாதனை, கௌரவம் மற்றும் அங்கீகாரத்தைக் குறிக்கிறது.',
        position: 'bottom-right',
      },
    ],
  },
  alumni: {
    eyebrow: 'குறிப்பிடத்தக்க முன்னாள் மாணவர்கள்',
    heading: 'கண்ணங்கரியன் மரபு',
    profiles: [
      {
        id: 'alum-1',
        name: 'டாக்டர் ஏ. சில்வா',
        graduationYear: '1990',
        currentRole: 'மருத்துவர்',
        quote: 'KCC என் எதிர்காலத்தை வடிவமைத்தது.',
        portrait: {
          src: '/assets/images/ironman.jpg',
          alt: 'டாக்டர் ஏ. சில்வா',
        },
      },
    ],
  },
  legacy: {
    spirit: {
      eyebrow: 'கண்ணங்கரின் ஆவி',
      heading: 'ஒரு கண்ணங்கரியன் என்றால் என்ன',
      paragraph: 'கண்ணங்கரின் ஆவி கல்வி சாதனை மட்டுமல்ல. இது கட்டற்ற கல்வியின் விளக்கைச் சுமந்து, ஒவ்வொரு குழந்தைக்கும் ஒரு வாய்ப்பு கிடைக்க வேண்டும் என்ற நம்பிக்கை, மற்றும் திருப்பி வழங்குவதற்கான கடமை. கண்ணங்கரியர்கள் இலங்கை மற்றும் உலகின் ஒவ்வொரு மூலையிலும் காணப்படுகிறார்கள் — மருத்துவர்கள், பொறியாளர்கள், ஆசிரியர்கள், தொழில்முனைவோர் — ஆனால் அவர்கள் அனைவரும் ஒரு விஷயத்தைப் பகிர்ந்து கொள்கிறார்கள்: ஞானமே அனைத்து செல்வமும் என்பதை புரிந்துகொள்வது.',
      quote: 'ஒரு முறை கண்ணங்கரியன், எப்போதும் கண்ணங்கரியன்',
      attribution: '~ பள்ளி பழமொழி',
    },
    heritage: {
      eyebrow: 'உடல் பாரம்பரியம்',
      heading: 'காலத்தின் வழியாக வளாகம்',
      caption: 'வரலாற்று புகைப்படங்கள் விரைவில் சேர்க்கப்படும்.',
      images: [
        { src: '/assets/images/ironman.jpg', alt: 'வளாக காட்சி 1' },
        { src: '/assets/images/ironman.jpg', alt: 'வளாக காட்சி 2' },
        { src: '/assets/images/ironman.jpg', alt: 'வளாக காட்சி 3' },
        { src: '/assets/images/ironman.jpg', alt: 'வளாக காட்சி 4' },
      ],
    },
  },
  anthem: {
    blockType: ANTHEM_BLOCK,
    eyebrow: 'எமது பாடல்',
    heading: 'பள்ளி பாடல்',
    paragraph: 'ஒரு நூற்றாண்டுக்கும் மேலாக, மாணவர் தலைமுறைகள் பள்ளி பாடலை கூட்டங்கள், பரிசு வழங்கும் விழாக்கள், மற்றும் அவர்கள் பட்டம் பெற்ற நாளில் பாடியுள்ளனர். அதன் வார்த்தைகள் பள்ளியின் மதிப்புகளைக் கொண்டுள்ளன — அறிவைத் தேடுதல், சேவைக்கான அழைப்பு, உறவின் பிணைப்பு. பள்ளி பாடகர் குழு மற்றும் பாய்ஸ் பிராஸ் பேண்ட் அனைத்து முக்கிய விழாக்களிலும் இந்த பாடலை இசைக்கின்றன. இது இந்த நிறுவனத்தின் ஒலி.',
    playerTitle: 'KCC பள்ளி பாடல்',
    playerSubtitle: 'KCC பள்ளி பாடகர் குழு இசைத்தது',
    lyricsSinhala: 'ශ්‍රීයෙන දින දින වැජඹේ මතුගම\nමැදි මහ විදුහල් මාතා පෙම්බර\nසිසුනට සැම දින විදුරැස පතුරන\nඔබෙ නම සමරමු සැමදා……….//\n\nකඳු මුදුනින් සිප එන සිහිලැල්\nරන් මිණි මුතු පිරි දිය සුනිමල්………….//\n\nකළු ගංගා රාණී සිරි දුව ගේ\nආසිරි නිති ලබනා\nඔබවේ පෙම්බර විදුහල් මාතා………//\n\nශ්‍රීයෙන දින දින ……………………………………..\n\nසැමදින ධර්මය යුක්තය සේවය සඳහා කැපවී\nජීවිත පුද දී ඔබෙ ගරු නාමය බබළවමු\nගිය ගිය තැන ජය ලැබ ගනිමු\n\nඔබ එලියෙන් ඥාණය ලැබ දී\nසැපත කරා පමුණනු මැනවී\n\nශ්‍රීයෙන දින දින ………………………………..\n\nශ්‍රී…………………………………………..',
    anthemSrc: '/assets/media/anthem.mp3',
  },
  closing: {
    eyebrow: 'இறுதி அறிக்கை',
    heading: 'ஒளி தொடர்கிறது.',
    body: '1873 முதல், இந்த வாயில்கள் வழியாக சென்ற ஒவ்வொரு மாணவரும் கலாநிதி கண்ணங்கர் இந்த தேசத்திற்கு கொடுத்த ஒரு நம்பிக்கையை முன்னெடுத்து சென்றுள்ளனர்: செல்வம் அல்ல, ஞானமே நல்ல வாழ்க்கையின் அளவுகோல். ஒரு நூற்று ஐம்பத்து மூன்று ஆண்டுகள் கடந்த பின்னரும், அந்த நம்பிக்கை இங்கு கற்பிக்கப்படும் முதல் விஷயமாகவும், மறக்கப்படும் கடைசி விஷயமாகவும் உள்ளது.',
    rule: 'ஞானமே அனைத்து செல்வம் · Est. 1873 · மத்துகம, இலங்கை',
  },
};

// ─── Seed Function ────────────────────────────────────────────────────────────

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
  alumni: { sectionKey: 'about.alumni', contentType: 'alumni' },
  legacy: { sectionKey: 'about.legacy', contentType: 'legacy' },
  anthem: { sectionKey: 'about.anthem', contentType: 'anthem' },
  closing: { sectionKey: 'about.closing', contentType: 'closing' },
};

const ABOUT_SEED = {
  en: ABOUT_SEED_EN,
  si: ABOUT_SEED_SI,
  ta: ABOUT_SEED_TA,
};

export async function seedAbout(db: PrismaClient): Promise<void> {
  for (const locale of SUPPORTED_LOCALES) {
    const localeData = ABOUT_SEED[locale];
    if (!localeData) continue;

    for (const [sectionName, sectionData] of Object.entries(localeData)) {
      const config = SECTION_CONFIG[sectionName as keyof typeof SECTION_CONFIG];
      if (!config) continue;

      await db.contentEntry.upsert({
        where: {
          scope_sectionKey_locale: {
            scope: SCOPE,
            sectionKey: config.sectionKey,
            locale,
          },
        },
        update: {
          data: sectionData as object,
          contentType: config.contentType,
          status: STATUS,
        },
        create: {
          scope: SCOPE,
          sectionKey: config.sectionKey,
          contentType: config.contentType,
          locale,
          status: STATUS,
          data: sectionData as object,
          version: 1,
        },
      });
    }
  }
}
