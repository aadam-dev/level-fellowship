"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { partnerNames } from "@/content/site";

export function PartnerStrip() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: true }, [
    Autoplay({ delay: 3200, stopOnInteraction: true }),
  ]);

  return (
    <section className="py-10 partner-marquee relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[var(--bg-elevated)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[var(--bg-elevated)] to-transparent z-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs font-semibold text-[var(--text-muted)] uppercase tracking-[0.15em] mb-6">
          Content and delivery partners
        </p>
        <div className="overflow-hidden touch-pan-x" ref={emblaRef}>
          <div className="flex gap-3">
            {[...partnerNames, ...partnerNames].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="partner-pill flex-[0_0_auto] px-6 py-3 rounded-xl text-sm font-medium text-[var(--navy)] whitespace-nowrap"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
