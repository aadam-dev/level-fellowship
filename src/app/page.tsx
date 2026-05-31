import dynamic from "next/dynamic";
import { HeroSection } from "@/components/marketing/hero-section";
import { PathSelector } from "@/components/marketing/path-selector";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { PartnerStrip } from "@/components/marketing/partner-strip";
import {
  ProblemSection,
  ToolkitSplit,
  CampusPhases,
  AudienceSection,
  TrustBand,
  WestFocusSection,
  TeamGrid,
  CTABand,
} from "@/components/marketing/section-blocks";
import { StatsBand } from "@/components/marketing/stats-band";
import { FaqAccordion } from "@/components/marketing/faq-accordion";

const JourneyGraph = dynamic(
  () => import("@/components/marketing/journey-graph").then((m) => m.JourneyGraph),
  { loading: () => <div className="py-20 px-6 h-64 glass-panel max-w-7xl mx-auto animate-pulse" /> },
);

const SemesterCarousel = dynamic(
  () => import("@/components/marketing/semester-carousel").then((m) => m.SemesterCarousel),
  { loading: () => <div className="py-20 h-80 bg-white/50 animate-pulse" /> },
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PathSelector />
      <PartnerStrip />
      <ProblemSection />
      <HowItWorks />
      <JourneyGraph />
      <SemesterCarousel />
      <ToolkitSplit />
      <CampusPhases />
      <AudienceSection />
      <WestFocusSection />
      <TrustBand />
      <StatsBand metrics="home" />
      <TeamGrid />
      <FaqAccordion />
      <CTABand />
    </>
  );
}
