import dynamic from "next/dynamic";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { programDetail, semesterFlow } from "@/content/proposal";
import { pageIntros } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaqAccordion } from "@/components/marketing/faq-accordion";

const SemesterCarousel = dynamic(
  () => import("@/components/marketing/semester-carousel").then((m) => m.SemesterCarousel),
  { loading: () => <div className="h-80 animate-pulse bg-white/50" /> },
);

export default function ProgramPage() {
  return (
    <>
      <PageHero
        label="Program"
        title={pageIntros.program.title}
        lede={pageIntros.program.lede}
        breadcrumb={{ href: "/" }}
        image="workshop"
      />

      <section className="max-w-3xl mx-auto px-6 py-12 space-y-6 text-[var(--text-secondary)] leading-relaxed">
        <p>{programDetail.workshopFormat}</p>
        <p>{programDetail.verification}</p>
      </section>

      <SemesterCarousel />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="headline-sans text-2xl mb-6">Module topics at a glance</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[semesterFlow.semester1, semesterFlow.semester2].map((sem, i) => (
            <div key={sem.title} className="glass-panel p-6">
              <Badge variant="accent">Semester {i + 1}</Badge>
              <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                {sem.topics.map((t) => (
                  <li key={t}>• {t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <FaqAccordion title="Program questions" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <Button asChild variant="accent" className="w-full sm:w-auto justify-center">
          <Link href="/auth/login">Student sign in</Link>
        </Button>
      </div>
    </>
  );
}
