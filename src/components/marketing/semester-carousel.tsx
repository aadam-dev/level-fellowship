"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { semesterFlow } from "@/content/proposal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionShell, SectionHeader } from "@/components/marketing/section-shell";

const semesters = [semesterFlow.semester1, semesterFlow.semester2];

export function SemesterCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <SectionShell variant="muted">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
        <SectionHeader
          label="Curriculum"
          title="Two semesters, one standard"
          description="Two semesters with the same standard. Semester two rolls on from semester one."
          className="mb-0"
        />
        <div className="flex gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10"
            onClick={scrollPrev}
            aria-label="Previous semester"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10"
            onClick={scrollNext}
            aria-label="Next semester"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex gap-6">
          {semesters.map((sem, i) => (
            <div key={sem.title} className="flex-[0_0_100%] min-w-0 lg:flex-[0_0_calc(50%-12px)]">
              <div className="glass-panel-strong p-6 sm:p-8 md:p-10 h-full card-interactive border-l-4 border-l-[var(--accent)]">
                <Badge variant="accent">Semester {i + 1}</Badge>
                <h3 className="text-xl md:text-2xl font-semibold text-[var(--navy)] mt-5">
                  {sem.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mt-2">{sem.subtitle}</p>
                <ul className="mt-6 space-y-2.5 text-sm text-[var(--text-secondary)]">
                  {sem.topics.map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="text-[var(--accent)] font-bold">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {sem.partners.map((p) => (
                    <Badge key={p} variant="outline">
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
