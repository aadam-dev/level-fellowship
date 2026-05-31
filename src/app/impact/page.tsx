import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { impactNarrative } from "@/content/proposal";
import { pageIntros } from "@/content/site";
import { StatsBand } from "@/components/marketing/stats-band";
import { Button } from "@/components/ui/button";

const narratives = [
  { title: "Talent outcomes", body: impactNarrative.talentDiversion },
  { title: "Curriculum quality", body: impactNarrative.standardization },
  { title: "Financial model", body: impactNarrative.financialIndependence },
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        label="Impact"
        title={pageIntros.impact.title}
        lede={pageIntros.impact.lede}
        breadcrumb={{ href: "/" }}
        image="impact"
      />

      <StatsBand />

      <section className="max-w-3xl mx-auto px-6 py-16 space-y-12">
        {narratives.map((n) => (
          <div key={n.title} className="glass-panel p-8">
            <h2 className="text-lg font-semibold text-[var(--navy)]">{n.title}</h2>
            <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">{n.body}</p>
          </div>
        ))}
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <Button asChild variant="accent" className="w-full sm:w-auto justify-center">
          <Link href="/program">Explore the program</Link>
        </Button>
      </div>
    </>
  );
}
