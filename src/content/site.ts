/**
 * Website copy. Plain, professional tone. No em dashes in strings.
 */

export const siteMeta = {
  brand: "Level Fellowship",
  tagline: "Islamic finance careers in the West",
  region: "United Kingdom",
  founded: "Campus career platform",
  contactEmail: "team@levelfellowship.local",
};

export const heroCopy = {
  eyebrow: "Islamic finance in the West",
  titleGradient: "Islamic finance talent,",
  titlePlain: "built for Western markets",
  subtitle:
    "A campus operating system for students who want ethical finance and banking roles in the UK and Europe, with the same rigor as mainstream paths.",
  lede:
    "Chapters run one curriculum and verified workshops so graduates are ready for desks in London and beyond.",
  proofPoints: [
    "UK campus chapters and ISoc nodes",
    "Two-semester curriculum with verified exams",
  ],
  ctaStudent: "Start as a student",
  ctaProgram: "Explore the program",
  ctaEvents: "Open workshops",
  stats: [
    { value: "2", label: "Semesters" },
    { value: "70%", label: "Verification bar" },
    { value: "UK+", label: "Western focus" },
  ],
};

export const homeMetrics = [
  { value: "2", suffix: "", label: "Structured semesters" },
  { value: "70", suffix: "%", label: "Module verification" },
  { value: "UK", suffix: "+", label: "Western chapter network" },
  { value: "1", suffix: "", label: "Shared curriculum standard" },
];

export const pathSelector = {
  student: {
    title: "I am a student",
    description:
      "Join your chapter, complete two semesters of workshops and assessments, and build a verified profile for Islamic finance careers in the West.",
    cta: "Sign in to your dashboard",
    href: "/auth/login",
  },
};

export const problemCopy = {
  title: "Why Islamic finance talent stalls in the West",
  subtitle:
    "Strong Muslim students work in conventional finance because they feel there is no other way.",
  items: [
    {
      title: "Invisible Western pipelines",
      description:
        "Islamic finance feels distant or overseas-only. Students default to mainstream banking because no one maps UK and EU roles clearly.",
    },
    {
      title: "Muslim dependency on conventional finance pathways",
      description:
        "Campus rarely presents a credible alternative with the same rigor as mainstream banking routes. Ethical finance stays optional, not aspirational.",
    },
    {
      title: "Theory without desk readiness",
      description:
        "Degrees cover principles. Western firms want contract literacy, compliance comfort, and case work. Few programs bridge both on campus.",
    },
  ],
};

export const howItWorks = [
  {
    step: "01",
    title: "Learn IF foundations",
    description:
      "Start at your Islamic finance society or ISoc node with a trained ambassador and a shared first-semester curriculum.",
  },
  {
    step: "02",
    title: "Complete the modules",
    description:
      "Weekly two-hour workshops, workbooks, and exams across two semesters. Semester two rolls on from semester one.",
  },
  {
    step: "03",
    title: "Connect",
    description:
      "Industry speakers and networking sessions with practitioners active in UK and European Islamic finance.",
  },
  {
    step: "04",
    title: "Exclusive opportunities",
    description:
      "Job shadowing, internships, project showcases, and introductions through partner firms.",
  },
];

export const journeySteps = [
  { id: "foundations", label: "Learn IF foundations", detail: "Campus chapter delivery with shared curriculum and ambassador support" },
  { id: "modules", label: "Complete modules", detail: "Two semesters of workshops, workbooks, and verified exams" },
  { id: "connect", label: "Connect", detail: "Industry speakers and networking with UK and European practitioners" },
  { id: "opportunities", label: "Exclusive opportunities", detail: "Job shadowing, internships, showcases, and partner introductions" },
];

export const audienceCopy = [
  {
    title: "Students",
    description:
      "Finance, economics, and STEM majors who want a documented path into Islamic finance and ethical banking in the UK and Europe.",
    href: "/program",
    cta: "View curriculum",
  },
  {
    title: "Campus ambassadors",
    description:
      "Deliver a turnkey toolkit: slides, scripts, and lesson plans so every session matches the standard.",
    href: "/auth/login",
    cta: "Ambassador access",
  },
];

export const trustCopy = {
  title: "Shariah-aligned training for Western desks",
  body:
    "Curriculum and verification follow Islamic finance principles while preparing students for London and European career pathways. Commercial and governance detail lives on our disclosures page, separate from the student journey.",
  cta: "Read governance disclosures",
  href: "/governance/shariah",
};

export const westFocusCopy = {
  label: "Why the West",
  title: "Where Islamic finance meets mainstream ambition",
  description: "One curriculum. Verified training. Direct industry access.",
  bullets: [
    "Curriculum aligned with Islamic finance and fintech career needs",
    "Practitioner-led sessions from UK and European IF networks",
    "Talent pipeline connecting participants with partner firms for internships, mentorship, and career opportunities",
  ],
};

export const partnerNames = [
  "Madinah College",
  "Al Dinar",
  "UK university chapters",
  "Practitioner network",
];

export const faqItems = [
  {
    q: "Do I need to be enrolled at a partner university?",
    a: "Core tracks run through campus chapters. Open workshops welcome local professionals and aspirants who are not enrolled.",
  },
  {
    q: "Is this only for students who will work abroad?",
    a: "No. The program targets Islamic finance careers in Western markets, especially the UK, with curriculum and cases grounded in local regulation and career practice.",
  },
  {
    q: "Is this a bank or investment product?",
    a: "No. Level Fellowship is an education and talent matching platform. Governance disclosures cover commercial terms for partners.",
  },
  {
    q: "Can societies outside Islamic finance join?",
    a: "We expand through broader ISoc nodes as distribution hubs while keeping the same instructor toolkit and QA checks.",
  },
];

export const pageIntros = {
  program: {
    title: "The program",
    lede:
      "Two semesters of weekly two-hour workshops, built for busy students and repeatable for any chapter.",
  },
  ecosystem: {
    title: "How we scale",
    lede:
      "We anchor with specialised Islamic finance societies, then connect chapters to firms for opportunities and events across the UK.",
  },
  impact: {
    title: "Impact we measure",
    lede:
      "Talent diversion, curriculum standardization, and revenue that does not depend on donations.",
  },
  events: {
    title: "Open workshops",
    lede: "Public sessions on campus. Register without a full platform account.",
  },
  governance: {
    title: "Governance and ledger",
    lede: "Live counts from the revenue ledger. Fixed fees only.",
  },
  login: {
    title: "Sign in",
    lede: "Students, ambassadors, and program leads each have a dedicated workspace.",
    bullets: [
      "Students track modules and semester progress",
      "Ambassadors run chapters, toolkit, and attendance",
      "Program leads manage chapters, vetting, and ledger",
    ],
  },
};

export const footerColumns = [
  {
    title: "Program",
    links: [
      { label: "Curriculum", href: "/program" },
      { label: "Distribution", href: "/ecosystem" },
      { label: "Impact", href: "/impact" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Sign in", href: "/auth/login" },
      { label: "Governance", href: "/governance/shariah" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Cookies", href: "/legal/cookies" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Email the team", href: "mailto:team@levelfellowship.local" },
      { label: "Home", href: "/" },
    ],
  },
];

export const ctaBand = {
  title: "Bring Islamic finance careers to your campus",
  body: "Students join chapters across the UK. Explore the program or register for an open workshop.",
  primary: "Sign in",
  secondary: "View events",
};
