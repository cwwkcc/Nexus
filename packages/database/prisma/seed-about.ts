/**
 * packages/database/prisma/seed-about.ts
 *
 * Seeds ALL About page ContentEntry rows for en / si / ta in one pass.
 * Covers every key registered in aboutRegistry:
 *   about.hero · about.stats · about.story · about.aboutKannangara
 *   about.timeline · about.ethos · about.values · about.crest
 *   about.legacy · about.anthem · about.closing
 *
 * about.stats is new — it didn't exist in the registry until AboutStatsStrip
 * was migrated off next-intl onto ContentEntry. Only its `en` copy is
 * authored here; si/ta fall back to English (F-074) until translated via
 * the admin panel, same as everything else prior to first admin edit.
 *
 * Usage (standalone):
 *   pnpm --filter @nexus/db exec tsx prisma/seed-about.ts
 *
 * Or call seedAbout() from prisma/seed.ts:
 *   import { seedAbout } from './seed-about';
 *   await seedAbout(prisma);
 */

import { PrismaClient } from '../src/generated/prisma/client.js';
import 'dotenv/config';
import { db } from '../src/lib/db.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const SCOPE = 'page:about';
const STATUS = 'published';
const CONTENT_TYPE = 'richText'; // matches the section renderer convention

type Locale = 'en' | 'si' | 'ta';

interface SectionSeed {
  sectionKey: string;
  contentType?: string;
  /** Partial: sections without translated copy yet just omit si/ta and fall
   *  back to English via getByScope (F-074). */
  data: Partial<Record<Locale, unknown>>;
}

const sections: SectionSeed[] = [
  // ── about.hero ────────────────────────────────────────────────────────────
  {
    sectionKey: 'about.hero',
    contentType: 'hero',
    data: {
      en: {
        eyebrow: 'Est. 1873 · Mathugama, Sri Lanka',
        title: 'About',
        titleEm: 'KCC',
        subtitle:
          "Sri Lanka's first Central College — 153 years of shaping the minds that shaped a nation.",
      },
      si: {
        eyebrow: 'ස්ථාපිතය 1873 · මතුගම, ශ්‍රී ලංකාව',
        title: 'අප',
        titleEm: 'ගැන',
        subtitle:
          'ශ්‍රී ලංකාවේ ප්‍රථම මධ්‍ය මහා විද්‍යාලය — ජාතිය හැඩගැස්වූ බුද්ධිමතුන් බිහිකළ වසර 153ක අභිමානය.',
      },
      ta: {
        eyebrow: 'நிறுவப்பட்டது 1873 · மத்துகம, இலங்கை',
        title: 'எங்களை',
        titleEm: 'பற்றி',
        subtitle:
          'இலங்கையின் முதலாவது மத்திய மகா வித்தியாலயம் — தேசத்தை உருவாக்கிய அறிஞர்களை உருவாக்கிய 153 வருட அசைக்க முடியாத பெருமை.',
      },
    },
  },

  // ── about.stats ───────────────────────────────────────────────────────────
  {
    sectionKey: 'about.stats',
    contentType: 'stats',
    data: {
      en: {
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
    },
  },

  // ── about.story ───────────────────────────────────────────────────────────
  {
    sectionKey: 'about.story',
    contentType: 'richText',
    data: {
      en: {
        eyebrow: 'Our Story',
        heading: 'The school that',
        headingEm: 'changed a nation.',
        paragraph:
          'In 1873, a school was founded in Mathugama that would, within a century, help reshape the entire educational landscape of Sri Lanka. C.W.W. Kannangara Central College began as a beacon of opportunity in the Southern Province — the very first Central College in the country. Our name honours Dr. C.W.W. Kannangara, the "Father of Free Education" in Sri Lanka, who fought tirelessly to ensure that no child would be denied the right to learn because of poverty. His 1944 Free Education Bill transformed this nation. Our school carries that legacy forward. Today, with over 5,000 students, more than 200 dedicated teachers, and a vibrant community of societies and extracurricular programmes, we remain what we have always been: a place where futures are built, character is forged, and excellence is not aspired to — it is expected.',
        quote:
          'Education is not a privilege of the few. It is the birthright of every child born in this country.',
        quoteAuthor: '~ Dr. C.W.W. Kannangara',
      },
      si: {
        eyebrow: 'අපේ කතාව',
        heading: 'ජාතියක් වෙනස් කළ',
        headingEm: 'පාසල.',
        paragraph:
          '1873 දී මතුගම ආරම්භ කරන ලද මෙම පාසල, සියවසක් ඇතුළත ශ්‍රී ලංකාවේ සමස්ත අධ්‍යාපන ක්ෂේත්‍රයම ප්‍රතිනිර්මාණය කිරීමට දායක විය. සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර මධ්‍ය මහා විද්‍යාලය දකුණු පළාතේ අවස්ථා පුළුල් කරන ආලෝකයක් ලෙස ආරම්භ වූ අතර, එය මෙරට ප්‍රථම මධ්‍ය මහා විද්‍යාලයයි. අපගේ නාමයෙන් ගෞරවයට පාත්‍ර වන්නේ, දරිද්‍රතාවය හේතුවෙන් කිසිදු දරුවෙකුට අධ්‍යාපනය ලැබීමේ අයිතිය අහිමි නොවිය යුතු බවට වෙහෙස නොබලා සටන් කළ, ශ්‍රී ලංකාවේ "නිදහස් අධ්‍යාපනයේ පියා" වන ආචාර්ය සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර මැතිතුමාටයි.',
        quote:
          'අධ්‍යාපනය යනු සුළු පිරිසකගේ වරප්‍රසාදයක් නොවේ. එය මේ රටේ උපන් සෑම දරුවෙකුගේම උපන් අයිතියයි.',
        quoteAuthor: '~ ආචාර්ය සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර',
      },
      ta: {
        eyebrow: 'எமது வரலாறு',
        heading: 'ஒரு தேசத்தை',
        headingEm: 'மாற்றிய பாடசாலை.',
        paragraph:
          '1873 இல் மத்துகமவில் ஆரம்பிக்கப்பட்ட இப்பாடசாலை, ஒரு நூற்றாண்டுக்குள் இலங்கையின் முழுமையான கல்விப் பரப்பையே மாற்றியமைக்க உதவியது. சி.டபிள்யு.டபிள்யு. கண்ணங்கர மத்திய மகா வித்தியாலயம் தென் மாகாணத்தில் ஒரு வாய்ப்பின் கலங்கரை விளக்கமாக - நாட்டின் முதலாவது மத்திய மகா வித்தியாலயமாக ஆரம்பிக்கப்பட்டது.',
        quote:
          'கல்வி என்பது ஒரு சிலரின் சலுகையல்ல. இது இந்த நாட்டில் பிறந்த ஒவ்வொரு குழந்தையின் பிறப்புரிமையாகும்.',
        quoteAuthor: '~ கலாநிதி சி.டபிள்யு.டபிள்யு. கண்ணங்கர',
      },
    },
  },

  // ── about.aboutKannangara ─────────────────────────────────────────────────
  {
    sectionKey: 'about.aboutKannangara',
    contentType: 'profile',
    data: {
      en: {
        eyebrow: 'Our Namesake',
        name: 'Dr. C.W.W. Kannangara',
        position: 'Minister of Education · Father of Free Education',
        portraitAlt: 'Dr. C.W.W. Kannangara portrait',
        portraitCaption: 'Dr. C.W.W. Kannangara (1884–1969)',
        portraitSrc: null,
        paragraph:
          'Cyril Wimalasiri Wijesinghe Kannangara was born in 1884 in Randombe, Hikkaduwa, and would go on to become the most transformative figure in Sri Lankan educational history. As Minister of Education from 1931, he championed a radical idea: that birth and wealth should not determine whether a child received an education. His Central College system — of which this institution is the original, established in 1941 — created pathways to secondary education for children across the island. A defining moment came in 1903, when Kannangara led the British Empire list in Mathematics at Cambridge Senior exams, proving that rural-born students could excel at the highest level. We carry his name not merely as a label, but as a commitment.',
        quote:
          'Education is not a privilege of the few. It is the birthright of every child born in this country.',
        attribution: '~ Dr. C.W.W. Kannangara',
      },
      si: {
        eyebrow: 'අපගේ නාමධාරියා',
        name: 'ආචාර්ය සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර',
        position: 'අධ්‍යාපන අමාත්‍ය · නිදහස් අධ්‍යාපනයේ පියා',
        portraitAlt: 'ආචාර්ය සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර මැතිතුමාගේ ඡායාරූපය',
        portraitCaption: 'ආචාර්ය සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර (1884–1969)',
        portraitSrc: null,
        paragraph:
          'සිරිල් විමලසිරි විජේසිංහ කන්නන්ගර මැතිතුමා 1884 දී හික්කඩුවේ රන්දොඹේදී උපත ලැබූ අතර, ශ්‍රී ලංකා අධ්‍යාපන ඉතිහාසයේ වඩාත්ම පරිවර්තනීය චරිතය බවට පත්විය. 1931 සිට අධ්‍යාපන අමාත්‍යවරයා ලෙස, ඔහු විප්ලවීය අදහසක් වෙනුවෙන් පෙනී සිටියේය: එනම්, දරුවෙකුට අධ්‍යාපනයක් ලැබෙනවාද නැද්ද යන්න ඔහුගේ උපත සහ ධනය මත තීරණය නොවිය යුතු බවයි.',
        quote:
          'අධ්‍යාපනය යනු සුළු පිරිසකගේ වරප්‍රසාදයක් නොවේ. එය මේ රටේ උපන් සෑම දරුවෙකුගේම උපන් අයිතියයි.',
        attribution: '~ ආචාර්ය සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර',
      },
      ta: {
        eyebrow: 'எமது பெயருக்குரியவர்',
        name: 'கலாநிதி சி.டபிள்யு.டபிள்யு. கண்ணங்கர',
        position: 'கல்வி அமைச்சர் · இலவசக் கல்வியின் தந்தை',
        portraitAlt: 'கலாநிதி சி.டபிள்யு.டபிள்யு. கண்ணங்கர உருவப்படம்',
        portraitCaption: 'கலாநிதி சி.டபிள்யு.டபிள்யு. கண்ணங்கர (1884–1969)',
        portraitSrc: null,
        paragraph:
          'சிரில் விமலசிறி விஜேசிங்க கண்ணங்கர அவர்கள் 1884 இல் ஹிக்கடுவை, ரந்தொம்பேயில் பிறந்தார். இவர் இலங்கை கல்வி வரலாற்றில் மிகவும் மாற்றத்தை ஏற்படுத்திய நபராக மாறினார். 1931 முதல் கல்வி அமைச்சராகப் பணியாற்றிய அவர், ஒரு குழந்தையின் பிறப்போ அல்லது செல்வமோ அவனுக்குக் கல்வி கிடைக்குமா என்பதைத் தீர்மானிக்கக்கூடாது என்ற புரட்சிகரமான கருத்தை முன்வைத்தார்.',
        quote:
          'கல்வி என்பது ஒரு சிலரின் சலுகையல்ல. இது இந்த நாட்டில் பிறந்த ஒவ்வொரு குழந்தையின் பிறப்புரிமையாகும்.',
        attribution: '~ கலாநிதி சி.டபிள்யு.டபிள்யு. கண்ணங்கர',
      },
    },
  },

  // ── about.timeline ────────────────────────────────────────────────────────
  {
    sectionKey: 'about.timeline',
    contentType: 'timeline',
    data: {
      en: {
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
      si: {
        eyebrow: 'වසර 153 ක ඉතිහාසය',
        heading: 'සන්ධිස්ථාන',
        milestones: [
          {
            id: 'founding',
            year: '1873',
            title: 'ප්‍රථම මධ්‍ය මහා විද්‍යාලය',
            description:
              'කළුතර දිස්ත්‍රික්කයේ ස්වදේශික ජනතාවට සේවය කරමින් සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර මධ්‍ය මහා විද්‍යාලය මතුගම දේශීය භාෂා පාසලක් ලෙස පිහිටුවන ලදී.',
            era: 'early',
          },
          {
            id: 'recognition',
            year: '1901',
            title: 'පිළිගැනීම සහ වර්ධනය',
            description:
              'පාසලට විධිමත් රජයේ පිළිගැනීමක් ලැබෙන අතර, ද්විභාෂා පද්ධතියකට මාරුවෙමින් කලාපය සඳහා එහි විෂය මාලාව පුළුල් කරයි.',
            era: 'early',
          },
          {
            id: 'movement',
            year: '1932',
            title: 'නිදහස් අධ්‍යාපන ව්‍යාපාරය',
            description:
              'ආචාර්ය සී.ඩබ්ලිව්.ඩබ්ලිව්. කන්නන්ගර ලංකාවේ නිදහස් අධ්‍යාපනය සඳහා වූ සිය සටන ආරම්භ කරයි — මෙය සමස්ත ජාතියම පරිවර්තනය කරන ව්‍යාපාරයක් විය.',
            era: 'mid',
          },
          {
            id: 'freeEducation',
            year: '1944',
            title: 'නිදහස් අධ්‍යාපන පනත',
            description:
              'ආචාර්ය කන්නන්ගරයන් විසින් 1944 මැයි 30 වන දින ව්‍යවස්ථාදායක ඉතිහාසයේ දීර්ඝතම කථා වලින් එකකට පසු ඓතිහාසික නිදහස් අධ්‍යාපන පනත ඉදිරිපත් කරන ලදී.',
            era: 'mid',
          },
          {
            id: 'scouts',
            year: '1952',
            title: 'බාලදක්ෂ කණ්ඩායම ආරම්භ කිරීම',
            description:
              '1952 දී හිලරි සිල්වා මහතා විසින් කන්නන්ගර විද්‍යාලීය බාලදක්ෂ කණ්ඩායම ආරම්භ කරන ලදී.',
            era: 'mid',
          },
          {
            id: 'excellence',
            year: '1980s',
            title: 'අධ්‍යාපනික විශිෂ්ටත්වයේ යුගය',
            description:
              'විද්‍යාලය ජයග්‍රහණයේ ස්වර්ණමය යුගයකට එළඹෙයි. සාමාන්‍ය පෙළ සමත් වීමේ ප්‍රතිශතය 95% ඉක්මවයි.',
            era: 'modern',
          },
          {
            id: 'kits',
            year: '2010',
            title: 'KITS පිහිටුවීම',
            description:
              'තාක්ෂණික අධ්‍යාපනයේ නව පරිච්ඡේදයක් අරඹමින් කන්නන්ගර තොරතුරු තාක්ෂණ සංගමය (KITS) ආරම්භ කරන ලදී.',
            era: 'modern',
          },
          {
            id: 'nexus',
            year: '2026',
            title: 'Nexus දියත් කිරීම',
            description:
              'KITS විසින් විද්‍යාලයේ නව ඩිජිටල් වේදිකාව වන Nexus දියත් කරයි.',
            era: 'modern',
          },
        ],
      },
      ta: {
        eyebrow: '153 வருட வரலாறு',
        heading: 'மைல்கற்கள்',
        milestones: [
          {
            id: 'founding',
            year: '1873',
            title: 'முதலாவது மத்திய மகா வித்தியாலயம்',
            description:
              'சி.டபிள்யு.டபிள்யு. கண்ணங்கர மத்திய மகா வித்தியாலயம் களுத்துறை மாவட்டத்தின் உள்ளூர் மக்களுக்குச் சேவை செய்யும் ஒரு சுதேசிய மொழிப் பாடசாலையாக மத்துகமவில் நிறுவப்பட்டது.',
            era: 'early',
          },
          {
            id: 'recognition',
            year: '1901',
            title: 'அங்கீகாரம் மற்றும் வளர்ச்சி',
            description:
              'இப்பாடசாலை முறையான அரச அங்கீகாரத்தைப் பெற்று, இருமொழி முறைக்கு மாறுகிறது.',
            era: 'early',
          },
          {
            id: 'movement',
            year: '1932',
            title: 'இலவசக் கல்வி இயக்கம்',
            description:
              'கலாநிதி சி.டபிள்யு.டபிள்யு. கண்ணங்கர இலங்கையில் இலவசக் கல்விக்கான தனது போராட்டத்தை ஆரம்பிக்கிறார்.',
            era: 'mid',
          },
          {
            id: 'freeEducation',
            year: '1944',
            title: 'இலவசக் கல்விச் சட்டம்',
            description:
              'கலாநிதி கண்ணங்கர அவர்கள் 1944 மே 30 ஆம் திகதி வரலாற்றுச் சிறப்புமிக்க இலவசக் கல்வி மசோதாவை முன்வைக்கிறார்.',
            era: 'mid',
          },
          {
            id: 'scouts',
            year: '1952',
            title: 'சாரணர் இயக்கம் ஆரம்பம்',
            description:
              'கண்ணங்கர சாரணர் குழு 1952 இல் ஹிலாரி சில்வாவினால் நிறுவப்பட்டது.',
            era: 'mid',
          },
          {
            id: 'excellence',
            year: '1980s',
            title: 'கல்விச் சிறப்பின் சகாப்தம்',
            description:
              'சாதாரண தர சித்தி வீதம் 95% ஐத் தாண்டி, களுத்துறை மாவட்டத்தில் அதிகளவான பல்கலைக்கழக நுழைவைக் கொண்ட பாடசாலையாக மாறுகிறது.',
            era: 'modern',
          },
          {
            id: 'kits',
            year: '2010',
            title: 'KITS தாபிக்கப்பட்டது',
            description:
              'தொழில்நுட்பக் கல்வியில் ஒரு புதிய அத்தியாயத்தை ஆரம்பித்து, கண்ணங்கர தகவல் தொழில்நுட்ப சங்கம் (KITS) நிறுவப்பட்டது.',
            era: 'modern',
          },
          {
            id: 'nexus',
            year: '2026',
            title: 'Nexus அறிமுகம்',
            description:
              'KITS ஆனது பாடசாலையின் புதிய டிஜிட்டல் தளமான Nexus ஐ அறிமுகப்படுத்துகிறது.',
            era: 'modern',
          },
        ],
      },
    },
  },

  // ── about.ethos ───────────────────────────────────────────────────────────
  {
    sectionKey: 'about.ethos',
    contentType: 'ethos',
    data: {
      en: {
        mottoEyebrow: 'Our Motto',
        motto: 'Wisdom is All Wealth',
        visionEyebrow: 'Our Vision',
        visionText:
          'To be a nationally recognised institution of academic and human excellence — producing graduates who lead with wisdom, serve with integrity, and advance Sri Lanka with every endeavour.',
        missionEyebrow: 'Our Mission',
        missionText:
          'To provide every student with a rigorous, holistic education in the tradition of Dr. Kannangara — accessible to all, demanding of each, and dedicated to the fullest development of every young person in our care.',
      },
      si: {
        mottoEyebrow: 'අපගේ ආදර්ශ පාඨය',
        motto: 'ප්‍රඥාවම ධනය වේ',
        visionEyebrow: 'අපගේ දැක්ම',
        visionText:
          'ප්‍රඥාවෙන් පෙරමුණ ගන්නා, අවංකත්වයෙන් සේවය කරන සහ සෑම උත්සාහයකින්ම ශ්‍රී ලංකාව ඉදිරියට ගෙන යන විශිෂ්ටයින් බිහිකරන — අධ්‍යාපනික හා මානව විශිෂ්ටත්වයෙන් ජාතික මට්ටමින් පිළිගත් ආයතනයක් වීම.',
        missionEyebrow: 'අපගේ මෙහෙවර',
        missionText:
          'ආචාර්ය කන්නන්ගරයන්ගේ සම්ප්‍රදායට අනුකූලව සෑම සිසුවෙකුටම දැඩි, පූර්ණ අධ්‍යාපනයක් ලබා දීම — එය සැමට ප්‍රවේශ විය හැකි, සෑම කෙනෙකුගෙන්ම ඉහළම දේ අපේක්ෂා කරන.',
      },
      ta: {
        mottoEyebrow: 'எமது மகுடவாக்கியம்',
        motto: 'அறிவே அனைத்தினும் வளம்',
        visionEyebrow: 'எமது தூரநோக்கு',
        visionText:
          'அறிவுடன் வழிநடத்தும், நேர்மையுடன் சேவையாற்றும் மற்றும் ஒவ்வொரு முயற்சியிலும் இலங்கையை முன்னோக்கிக் கொண்டு செல்லும் பட்டதாரிகளை உருவாக்கும் — தேசிய ரீதியில் அங்கீகரிக்கப்பட்ட கல்வி மற்றும் மனிதச் சிறப்பைக் கொண்ட ஒரு நிறுவனமாகத் திகழ்தல்.',
        missionEyebrow: 'எமது பணி',
        missionText:
          'கலாநிதி கண்ணங்கரவின் மரபிற்கிணங்க ஒவ்வொரு மாணவருக்கும் முறையான, முழுமையான கல்வியை வழங்குதல் — இது அனைவருக்கும் கிடைக்கக்கூடிய, ஒவ்வொருவரிடமிருந்தும் அதியுயர்ந்ததை எதிர்பார்க்கின்ற.',
      },
    },
  },

  // ── about.values ──────────────────────────────────────────────────────────
  {
    sectionKey: 'about.values',
    contentType: 'values',
    data: {
      en: {
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
      si: {
        valuesEyebrow: 'මූලික සාරධර්ම',
        values: [
          {
            id: 'wisdom',
            english: 'ප්‍රඥාව',
            latin: 'Sapientia',
            desc: 'පෞද්ගලික ලාභය සඳහා පමණක් නොව, ප්‍රජාව සහ ජාතියේ යහපත උදෙසා දැනුම හඹා යාම.',
          },
          {
            id: 'integrity',
            english: 'අවංකත්වය',
            latin: 'Integritas',
            desc: 'කිසිවෙකු බලා නොසිටින විට පවා නිවැරදි දේ කිරීම — එය විශ්වාසය සහ චරිතය ගොඩනඟන පදනමයි.',
          },
          {
            id: 'excellence',
            english: 'විශිෂ්ටත්වය',
            latin: 'Excellentia',
            desc: 'හුදු නිපුණත්වය පමණක් නොව, අප භාරගන්නා සෑම කාර්යයකදීම ඉහළම ප්‍රමිතිය කරා නොපසුබටව ගමන් කිරීම.',
          },
          {
            id: 'service',
            english: 'සේවය',
            latin: 'Servitium',
            desc: 'තමන් ලැබූ අධ්‍යාපනයේ වරප්‍රසාදයට සමානුපාතිකව — පාසලට, ප්‍රජාවට සහ ජාතියට පෙරළා සේවය කිරීමේ යුතුකම.',
          },
        ],
      },
      ta: {
        valuesEyebrow: 'முக்கிய விழுமியங்கள்',
        values: [
          {
            id: 'wisdom',
            english: 'அறிவு',
            latin: 'Sapientia',
            desc: 'தனிப்பட்ட இலாபத்திற்காக மட்டுமல்லாமல், சமூகம் மற்றும் தேசத்தின் நன்மைக்காக அறிவைத் தேடுதல்.',
          },
          {
            id: 'integrity',
            english: 'நேர்மை',
            latin: 'Integritas',
            desc: 'யாரும் பார்க்காத போதும் சரியானதைச் செய்தல் — இதுவே நம்பிக்கையும் நற்பண்பும் கட்டியெழுப்பப்படும் அடித்தளமாகும்.',
          },
          {
            id: 'excellence',
            english: 'சிறப்பு',
            latin: 'Excellentia',
            desc: 'வெறும் திறமை மட்டுமல்ல, நாம் மேற்கொள்ளும் ஒவ்வொரு செயலிலும் அதியுயர்ந்த தரத்தை நோக்கிய அயராத பயணம்.',
          },
          {
            id: 'service',
            english: 'சேவை',
            latin: 'Servitium',
            desc: 'பெற்றுக்கொண்ட கல்வியின் சிறப்புரிமைக்கு ஏற்ப — பாடசாலை, சமூகம் மற்றும் தேசத்திற்குத் திரும்பக் கொடுக்கும் கடமை.',
          },
        ],
      },
    },
  },

  // ── about.crest ───────────────────────────────────────────────────────────
  {
    sectionKey: 'about.crest',
    contentType: 'crest',
    data: {
      en: {
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
      si: {
        eyebrow: 'ලාංඡනය සහ අරුත',
        heading: 'ලාංඡනයේ විස්තරය',
        intro:
          'පාසල් ලාංඡනයේ සෑම අංගයක්ම ඉතා සැලකිල්ලෙන් තෝරාගෙන ඇත. කිසිවක් හුදු අලංකාරය සඳහා යොදා නොමැත. සෑම සංකේතයක්ම ශ්‍රී ලාංකේය උරුමය සහ මෙම ආයතනයේ වටිනාකම් මත පදනම් වූ ගැඹුරු අරුතක් දරයි.',
        symbols: [
          {
            id: 'lamp',
            name: 'දැනුමේ පහන',
            meaning:
              'තෙල් පහන මඟින් අවිද්‍යාවේ අන්ධකාරය දුරු කරන අධ්‍යාපනයේ ආලෝකය නිරූපණය කෙරේ.',
            position: 'top-right',
          },
          {
            id: 'lotus',
            name: 'නෙළුම් මල',
            meaning:
              'මඩ සහිත ජලයෙන් මතු වී පරිපූර්ණ ස්වරූපයෙන් පිපෙන නෙළුම් මලෙන්, සෑම සිසුවෙකු තුළම ඇති හැකියාව සංකේතවත් කරයි.',
            position: 'top-left',
          },
          {
            id: 'dharmachakra',
            name: 'ධර්ම චක්‍රය',
            meaning:
              'ධර්ම චක්‍රය මඟින් සත්‍යය, ධාර්මික බව සහ ප්‍රඥාව හඹා යාමේ චක්‍රීය ස්වභාවය නිරූපණය වේ.',
            position: 'bottom-left',
          },
          {
            id: 'laurel',
            name: 'ලෝරල් මල්මාලය',
            meaning:
              'ලාංඡනය වටා ඇති ලෝරල් මල්මාලය මඟින් ජයග්‍රහණය, ගෞරවය සහ විශිෂ්ටත්වය ඇගයීම සංකේතවත් කරයි.',
            position: 'bottom-right',
          },
        ],
      },
      ta: {
        eyebrow: 'சின்னம் மற்றும் விளக்கம்',
        heading: 'பாடசாலைச் சின்னத்தின் விளக்கம்',
        intro:
          'பாடசாலைச் சின்னத்தின் ஒவ்வொரு கூறுகளும் மிகவும் கவனமாகத் தேர்ந்தெடுக்கப்பட்டுள்ளன. எதுவும் வெறுமனே அலங்காரத்திற்காகச் சேர்க்கப்படவில்லை.',
        symbols: [
          {
            id: 'lamp',
            name: 'அறிவுத் தீபம்',
            meaning:
              'எண்ணெய் விளக்கு — அறியாமையின் இருளை அகற்றும் கல்வியின் ஒளியைக் குறிக்கிறது.',
            position: 'top-right',
          },
          {
            id: 'lotus',
            name: 'தாமரை',
            meaning:
              'சேற்று நீரிலிருந்து மேலெழுந்து பூரண வடிவத்தில் மலரும் தாமரையானது, ஒவ்வொரு மாணவருக்குள்ளும் இருக்கும் ஆற்றலைக் குறிக்கிறது.',
            position: 'top-left',
          },
          {
            id: 'dharmachakra',
            name: 'தர்மச்சக்கரம்',
            meaning:
              'தர்மச்சக்கரம் உண்மை, நேர்மை மற்றும் அறிவைத் தேடும் சுழற்சியைக் குறிக்கிறது.',
            position: 'bottom-left',
          },
          {
            id: 'laurel',
            name: 'லாரல் மாலை',
            meaning:
              'சின்னத்தைச் சுற்றியுள்ள லாரல் வளையம் சாதனை, கௌரவம் மற்றும் சிறப்பை அங்கீகரிப்பதைக் குறிக்கிறது.',
            position: 'bottom-right',
          },
        ],
      },
    },
  },

  // ── about.legacy ──────────────────────────────────────────────────────────
  {
    sectionKey: 'about.legacy',
    contentType: 'legacy',
    data: {
      en: {
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
          // FIX: schema requires `images` — was missing entirely, which is
          // exactly what crashed Legacy.tsx's `.map()`. Explicit [] here,
          // on top of the schema's own .default([]).
          images: [],
        },
      },
      si: {
        spirit: {
          eyebrow: 'කන්නන්ගර ජීවය',
          heading: 'කන්නන්ගරියෙකු වීම යනු කුමක්ද',
          paragraph:
            'කන්නන්ගර ජීවය යනු හුදු අධ්‍යාපනික ජයග්‍රහණ පමණක් නොවේ. එය නිදහස් අධ්‍යාපනයේ පහන ඉදිරියට ගෙන යාම, සෑම දරුවෙකුටම අවස්ථාවක් හිමිවිය යුතු බවට ඇති විශ්වාසය සහ පෙරළා සේවය කිරීමේ යුතුකමයි.',
          quote: 'එක්වරක් කන්නන්ගරියෙකු නම්, සදාකාලිකවම කන්නන්ගරියෙකි',
          attribution: '~ විද්‍යාලයීය කියමනකි',
        },
        heritage: {
          eyebrow: 'භෞතික උරුමය',
          heading: 'කාලය හරහා පාසල් භූමිය',
          caption: 'ඉතිහාස ඡායාරූප ඉදිරියේදී එකතු කෙරේ.',
          images: [],
        },
      },
      ta: {
        spirit: {
          eyebrow: 'கண்ணங்கர உணர்வு',
          heading: 'கண்ணங்கர மாணவனாக இருப்பதன் அர்த்தம்',
          paragraph:
            'கண்ணங்கர உணர்வு என்பது கல்விச் சாதனைகளைப் பற்றியது மட்டுமல்ல. இது இலவசக் கல்வியின் தீபத்தை முன்னெடுத்துச் செல்வது, ஒவ்வொரு குழந்தைக்கும் ஒரு வாய்ப்பு கிடைக்க வேண்டும் என்ற நம்பிக்கை மற்றும் திரும்பக் கொடுக்கும் கடமை பற்றியதாகும்.',
          quote:
            'ஒருமுறை கண்ணங்கர மாணவன் என்றால், எப்போதுமே கண்ணங்கர மாணவன்தான்',
          attribution: '~ பாடசாலைப் பழமொழி',
        },
        heritage: {
          eyebrow: 'பௌதீக மரபு',
          heading: 'காலத்தினூடாக பாடசாலை வளாகம்',
          caption: 'வரலாற்று புகைப்படங்கள் விரைவில் சேர்க்கப்படும்.',
          images: [],
        },
      },
    },
  },

  // ── about.anthem ──────────────────────────────────────────────────────────
  {
    sectionKey: 'about.anthem',
    contentType: 'anthem',
    data: {
      en: {
        eyebrow: 'Our Anthem',
        heading: 'The School Song',
        paragraph:
          "For over a century, generations of students have sung the school anthem at assemblies, prize-givings, and on the day they graduated. Its words carry the school's values — the pursuit of knowledge, the call to service, the bond of fellowship. The anthem is performed by the school choir and the Boys Brass Band at all major ceremonies. It is the sound of this institution.",
        playerTitle: 'KCC School Anthem',
        playerSubtitle: 'Performed by KCC School Choir',
        lyricsSinhala:
          'ශ්‍රීයෙන දින දින වැජඹේ මතුගම \\n මැදි මහ විදුහල් මාතා පෙම්බර \\n සිසුනට සැම දින විදුරැස පතුරන \\n ඔබෙ නම සමරමු සැමදා……….// \\n\\n කඳු මුදුනින් සිප එන සිහිලැල් \\n රන් මිණි මුතු පිරි දිය සුනිමල්………….//\\nකළු ගංගා රාණී සිරි දුව ගේ\\nආසිරි නිති ලබනා\\nඹබවේ පෙම්බර විදුහල් මාතා………//\\n\\nශ්‍රීයෙන දින දින ……………………………………..',
        anthemSrc: '/media/anthem.mp3',
      },
      si: {
        eyebrow: 'අපේ ගීය',
        heading: 'විද්‍යාලයීය ගීතය',
        paragraph:
          'සියවසකට අධික කාලයක් පුරා, පරම්පරා ගණනාවක සිසුන් රැස්වීම්වලදී, ත්‍යාග ප්‍රදානෝත්සවවලදී සහ ඔවුන් පාසලෙන් සමුගන්නා දිනයේදී පාසල් ගීතය ගායනා කර ඇත.',
        playerTitle: 'කන්නන්ගර මධ්‍ය මහා විද්‍යාලයීය ගීතය',
        playerSubtitle: 'ගායනය: කන්නන්ගර මධ්‍ය මහා විද්‍යාලයීය ගායනා කණ්ඩායම',
        lyricsSinhala:
          'ශ්‍රීයෙන දින දින වැජඹේ මතුගම \\n මැදි මහ විදුහල් මාතා පෙම්බර \\n සිසුනට සැම දින විදුරැස පතුරන \\n ඔබෙ නම සමරමු සැමදා……….// \\n\\n කඳු මුදුනින් සිප එන සිහිලැල් \\n රන් මිණි මුතු පිරි දිය සුනිමල්………….//\\nකළු ගංගා රාණී සිරි දුව ගේ\\nආසිරි නිති ලබනා\\nඹබවේ පෙම්බර විදුහල් මාතා………//\\n\\nශ්‍රීයෙන දින දින ……………………………………..',
        anthemSrc: '/media/anthem.mp3',
      },
      ta: {
        eyebrow: 'எமது கீதம்',
        heading: 'பாடசாலைக் கீதம்',
        paragraph:
          'ஒரு நூற்றாண்டுக்கும் மேலாக, பல தலைமுறை மாணவர்கள் கூட்டங்களிலும், பரிசளிப்பு விழாக்களிலும், அவர்கள் பாடசாலையை விட்டு விலகும் நாளிலும் பாடசாலைக் கீதத்தைப் பாடியுள்ளனர்.',
        playerTitle: 'கண்ணங்கர மத்திய மகா வித்தியாலய கீதம்',
        playerSubtitle: 'பாடியவர்கள்: பாடசாலைப் பாடகர் குழு',
        lyricsSinhala:
          'ශ්‍රීයෙන දින දින වැජඹේ මතුගම \\n මැදි මහ විදුහල් මාතා පෙම්බර \\n සිසුනට සැම දින විදුරැස පතුරන \\n ඔබෙ නම සමරමු සැමදා……….// \\n\\n කඳු මුදුනින් සිප එන සිහිලැල් \\n රන් මිණි මුතු පිරි දිය සුනිමල්………….//\\nකළු ගංගා රාණී සිරි දුව ගේ\\nආසිරි නිති ලබනා\\nඹබවේ පෙම්බර විදුහල් මාතා………//\\n\\nශ්‍රීයෙන දින දින ……………………………………..',
        anthemSrc: '/media/anthem.mp3',
      },
    },
  },

  // ── about.closing ─────────────────────────────────────────────────────────
  {
    sectionKey: 'about.closing',
    contentType: 'closing',
    data: {
      en: {
        eyebrow: 'Closing Statement',
        heading: 'The light continues.',
        body: 'Since 1873, every student who has passed through these gates has carried forward a belief that Dr. Kannangara gave this nation: that wisdom, not wealth, is the measure of a life well lived. One hundred and fifty-three years on, that belief is still the first thing taught here — and the last thing forgotten.',
        rule: 'Wisdom is All Wealth · Est. 1873 · Mathugama, Sri Lanka',
      },
      si: {
        eyebrow: 'අවසන් ප්‍රකාශය',
        heading: 'ආලෝකය අඛණ්ඩව දිදුලයි.',
        body: '1873 සිට, මෙම දොරටු තුළින් ගිය සෑම සිසුවෙකුම ආචාර්ය කන්නන්ගරයන් මෙම ජාතියට ලබා දුන් විශ්වාසයක් ඉදිරියට ගෙන ගොස් ඇත: එනම්, මනාව ගත කළ ජීවිතයක මිනුම ධනය නොව ප්‍රඥාව බවයි.',
        rule: 'ප්‍රඥාවම ධනය වේ · ස්ථාපිතය 1873 · මතුගම, ශ්‍රී ලංකාව',
      },
      ta: {
        eyebrow: 'நிறைவுரை',
        heading: 'ஒளி தொடர்ந்து ஒளிர்கிறது.',
        body: '1873 ஆம் ஆண்டு முதல், இந்த வாயில்களினூடாகச் சென்ற ஒவ்வொரு மாணவரும் கலாநிதி கண்ணங்கர இந்த தேசத்திற்கு வழங்கிய ஒரு நம்பிக்கையை முன்னெடுத்துச் சென்றுள்ளனர்: அதாவது, சிறப்பாக வாழும் ஒரு வாழ்க்கையின் அளவுகோல் செல்வம் அல்ல, அறிவு என்பதேயாகும்.',
        rule: 'அறிவே அனைத்தினும் வளம் · நிறுவப்பட்டது 1873 · மத்துகம, இலங்கை',
      },
    },
  },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

export async function seedAbout(db: PrismaClient): Promise<void> {
  const locales: Locale[] = ['en', 'si', 'ta'];

  for (const section of sections) {
    for (const locale of locales) {
      const localeData = section.data[locale];
      if (!localeData) continue; // e.g. about.stats: si/ta not authored yet — falls back to en via getByScope

      const payload = {
        scope: SCOPE,
        sectionKey: section.sectionKey,
        contentType: section.contentType ?? CONTENT_TYPE,
        locale,
        status: STATUS,
        data: localeData as object,
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

// ---------------------------------------------------------------------------
// Standalone entrypoint
// ---------------------------------------------------------------------------

await seedAbout(db).finally(() => db.$disconnect());
