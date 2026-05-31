/**
 * Platform status copy for preview / degraded operation.
 */

export const signInPreview = {
  title: "Workspaces are not open yet",
  lede:
    "The public site is live. Student and ambassador sign-in opens when your chapter is onboarded on the platform.",
  bullets: [
    "Browse the program, impact, and governance pages today",
    "Register interest for open workshops on the Events page",
    "Chapter leads receive workspace access during rollout",
  ],
  ctaEvents: "View open workshops",
  ctaProgram: "Explore the program",
  ctaContact: "Contact the team",
};

export const signInLive = {
  lede: "Use your campus or partner credentials. Demo accounts are available for reviewers when the database is seeded.",
};

export const eventsPreview = {
  emptyTitle: "Workshops opening soon",
  emptyBody:
    "We are scheduling open sessions across UK chapters. Leave your details and we will email you when registration opens.",
  interestTitle: "Register your interest",
  interestSuccessTitle: "You are on the list",
  interestSuccessBody:
    "We saved your request. You will receive a confirmation email when the workshop is confirmed and live registration opens.",
  liveTitle: "Reserve your seat",
  liveSuccessTitle: "You are registered",
  liveSuccessBody: "Bring this check-in code to the door. An ambassador will scan or verify it on the day.",
};

export const previewWorkshops = [
  {
    id: "preview-1",
    title: "Introduction to Islamic finance in the UK",
    universityName: "London anchor chapter",
    startsAt: "2026-06-15T18:00:00.000Z",
    description:
      "Foundations for students exploring ethical finance careers in Western markets.",
    isOpenAccess: true,
  },
  {
    id: "preview-2",
    title: "Contracts and compliance clinic",
    universityName: "Midlands chapter",
    startsAt: "2026-07-02T18:00:00.000Z",
    description: "Case-based session with practitioner Q&A.",
    isOpenAccess: true,
  },
] as const;
