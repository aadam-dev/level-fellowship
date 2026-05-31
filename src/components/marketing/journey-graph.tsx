"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { journeySteps } from "@/content/site";
import { cn } from "@/lib/utils";
import { SectionShell, SectionHeader } from "@/components/marketing/section-shell";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function JourneyGraph() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      setActive(index);
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActive(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const goPrev = () => {
    const next = Math.max(0, active - 1);
    setActive(next);
    emblaApi?.scrollTo(next);
  };

  const goNext = () => {
    const next = Math.min(journeySteps.length - 1, active + 1);
    setActive(next);
    emblaApi?.scrollTo(next);
  };

  return (
    <SectionShell variant="dark">
      <SectionHeader
        label="Your journey"
        title="From campus chapter to Western market roles"
        description="Select a stage to see what happens. Every UK chapter runs the same sequence."
        align="center"
        inverted
        className="mx-auto"
      />

      <div className="journey-panel p-5 sm:p-8 lg:p-10 max-w-5xl mx-auto">
        {/* Desktop stepper */}
        <div className="hidden lg:flex items-center justify-between gap-1 mb-10" role="tablist" aria-label="Journey steps">
          {journeySteps.map((step, i) => (
            <div key={step.id} className="flex items-center flex-1 min-w-0">
              <button
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-controls={`journey-panel-${i}`}
                id={`journey-tab-${i}`}
                onClick={() => setActive(i)}
                className={cn(
                  "w-11 h-11 rounded-full text-sm font-semibold shrink-0 transition-all duration-200 border-2",
                  active === i
                    ? "journey-step-active border-transparent"
                    : "journey-step-idle",
                )}
              >
                {i + 1}
              </button>
              {i < journeySteps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-1.5 rounded-full transition-colors duration-300",
                    i < active ? "bg-[var(--accent)]" : "bg-white/15",
                  )}
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>

        {/* Tablet: swipeable step chips */}
        <div className="hidden sm:block lg:hidden mb-6">
          <div className="overflow-hidden -mx-1 px-1" ref={emblaRef}>
            <div className="flex gap-2 touch-pan-x">
              {journeySteps.map((step, i) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => scrollTo(i)}
                  className={cn(
                    "flex-[0_0_auto] min-h-[44px] px-4 py-2.5 rounded-full text-sm font-medium border transition-colors snap-start",
                    active === i
                      ? "journey-step-active border-transparent"
                      : "journey-step-idle",
                  )}
                >
                  <span className="mr-1.5 tabular-nums">{i + 1}.</span>
                  {step.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <nav className="sm:hidden mb-6 space-y-1" aria-label="Journey steps">
          {journeySteps.map((step, i) => (
            <button
              key={step.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "w-full min-h-[48px] flex items-start gap-3 p-3 rounded-xl text-left transition-colors border",
                active === i
                  ? "bg-white/10 border-white/20"
                  : "border-transparent hover:bg-white/5",
              )}
            >
              <span
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 border-2",
                  active === i ? "journey-step-active border-transparent" : "journey-step-idle",
                )}
              >
                {i + 1}
              </span>
              <span
                className={cn(
                  "text-sm font-medium pt-1.5",
                  active === i ? "text-white" : "text-slate-400",
                )}
              >
                {step.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Detail panel */}
        <div
          className="border-t border-white/10 pt-6 lg:pt-0 lg:border-0"
          role="region"
          aria-live="polite"
          aria-label={`Step ${active + 1}: ${journeySteps[active].label}`}
        >
          <div className="flex items-center justify-between gap-4 mb-4 sm:mb-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-light)]">
              Step {active + 1} of {journeySteps.length}
            </p>
            <div className="flex gap-2 sm:hidden">
              <button
                type="button"
                onClick={goPrev}
                disabled={active === 0}
                className="journey-nav-btn"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={active === journeySteps.length - 1}
                className="journey-nav-btn"
                aria-label="Next step"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28 }}
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-tight">
                {journeySteps[active].label}
              </h3>
              <p className="mt-3 text-[15px] sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {journeySteps[active].detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
}
