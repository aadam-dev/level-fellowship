/**
 * Legal page copy. Plain professional tone. No em dashes.
 */

export const legalMeta = {
  lastUpdated: "29 May 2026",
  contactEmail: "team@levelfellowship.local",
  jurisdiction: "England and Wales",
};

export const legalNav = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/cookies", label: "Cookies" },
] as const;

export const privacyDocument = {
  title: "Privacy policy",
  lede: "How Level Fellowship collects, uses, and protects personal data for students, ambassadors, and administrators.",
  sections: [
    {
      heading: "1. Who this policy covers",
      paragraphs: [
        "This policy applies to anyone who uses the Level Fellowship platform, including students, campus ambassadors, and program administrators.",
        "We process data to deliver curriculum tracking, event registration, verified profiles, and role-based workspaces.",
      ],
    },
    {
      heading: "2. Data we collect",
      paragraphs: [
        "Account data includes name, email, university affiliation, and role assigned by your institution or program lead.",
        "Learning data includes module progress, workbook submissions, exam scores, and verification status.",
        "Verified profile data may be shared with industry partners only with your consent and in line with program rules.",
        "Event registration may store email and attendance timestamps for open workshops.",
      ],
    },
    {
      heading: "3. How we use your data",
      paragraphs: [
        "We use data to operate chapters, verify semester completion, and support merit-based career introductions.",
        "We do not sell personal data. Industry partners receive only the information you agree to share.",
        "Service emails relate to account access, verification outcomes, and events you register for.",
      ],
    },
    {
      heading: "4. Security",
      paragraphs: [
        "Sessions use signed tokens. Passwords are hashed with Argon2id. Administrative actions are scoped by role.",
        "Production infrastructure uses encrypted connections and access controls appropriate to an education platform.",
      ],
    },
    {
      heading: "5. Retention",
      paragraphs: [
        "We retain learning and verification records while your account is active and as required for governance.",
        "You may request information about retention by contacting the team at the address below.",
      ],
    },
    {
      heading: "6. Your rights",
      paragraphs: [
        "Depending on applicable law, you may have rights to access, correct, or delete personal data we hold about you.",
        "Submit requests to the contact address below. We respond within a reasonable period.",
      ],
    },
  ],
};

export const termsDocument = {
  title: "Terms of use",
  lede: "Rules for accessing Level Fellowship as a student, ambassador, or program administrator.",
  sections: [
    {
      heading: "1. Agreement",
      paragraphs: [
        "By signing in or using the platform you agree to these terms and to our privacy policy.",
        "If you use the platform on behalf of an organization, you confirm you have authority to bind that organization.",
      ],
    },
    {
      heading: "2. Roles and access",
      paragraphs: [
        "Access is role-based. Students, ambassadors, and administrators each receive a defined workspace.",
        "You must keep credentials confidential and notify us if you suspect unauthorized access.",
      ],
    },
    {
      heading: "3. Acceptable use",
      paragraphs: [
        "You may not scrape, resell, or misuse platform data. Attempts to access student information without consent are prohibited.",
        "Ambassadors must deliver curriculum using the published toolkit and verification standards.",
      ],
    },
    {
      heading: "4. Verified profiles and introductions",
      paragraphs: [
        "Career introductions use verified academic outcomes. Personal details are shared only with your consent.",
        "Level Fellowship is an education and career development platform. We are not a regulated bank, broker, or investment firm.",
      ],
    },
    {
      heading: "5. Commercial terms",
      paragraphs: [
        "Fee-bearing actions for partners are described under governance disclosures. Rates are fixed and published before payment.",
        "Students do not pay placement fees through the core curriculum track unless a separate certified product applies.",
      ],
    },
    {
      heading: "6. Changes and contact",
      paragraphs: [
        "We may update these terms. Material changes will be reflected on this page with an updated date.",
        "Questions about these terms should be sent to the contact address on this site.",
      ],
    },
  ],
};

export const cookiesDocument = {
  title: "Cookie policy",
  lede: "How we use cookies and similar storage on levelfellowship.vercel.app.",
  sections: [
    {
      heading: "1. What we use",
      paragraphs: [
        "Functional cookies and local storage keep you signed in and remember necessary preferences.",
        "Analytics cookies, if enabled, help us understand how pages are used. They are optional.",
      ],
    },
    {
      heading: "2. Your choices",
      paragraphs: [
        "Use the controls below to save your preference for analytics cookies. Functional storage cannot be disabled while using signed-in features.",
      ],
    },
  ],
};
