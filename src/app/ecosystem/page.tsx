import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { ecosystemDetail, campusPhases } from "@/content/proposal";
import { pageIntros } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function EcosystemPage() {
  return (
    <>
      <PageHero
        label="Ecosystem"
        title={pageIntros.ecosystem.title}
        lede={pageIntros.ecosystem.lede}
        breadcrumb={{ href: "/" }}
        image="campus"
      />

      <section className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-[var(--text-secondary)] leading-relaxed">{ecosystemDetail.internationalization}</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="glass-panel-strong p-8 md:p-12">
          <h2 className="headline-sans text-xl font-semibold mb-8 text-center">Distribution flow</h2>
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
            {ecosystemDetail.nodes.map((node, i) => (
              <div key={node} className="flex-1 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-semibold">
                  {i + 1}
                </div>
                <p className="mt-3 text-sm font-medium text-[var(--navy)]">{node}</p>
                {i < ecosystemDetail.nodes.length - 1 && (
                  <div className="hidden md:block w-full h-px bg-[var(--border-subtle)] absolute" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {campusPhases.map((phase) => (
            <div key={phase.phase} className="glass-panel p-6">
              <Badge variant="outline">{phase.phase}</Badge>
              <h3 className="font-semibold text-[var(--navy)] mt-3">{phase.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-2">{phase.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 btn-group">
        <Button asChild variant="accent" className="justify-center">
          <Link href="/events">View open events</Link>
        </Button>
        <Button asChild variant="outline" className="justify-center">
          <Link href="/auth/login">Sign in</Link>
        </Button>
      </div>
    </>
  );
}
