"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { heroCopy } from "@/content/site";
import { marketingImages } from "@/content/images";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section className="relative gradient-hero overflow-hidden border-b border-[var(--border-subtle)]">
      <div
        className="hero-blob w-[400px] h-[400px] -top-32 -right-24 bg-[var(--accent)]/10"
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          <motion.div
            className="lg:col-span-6 xl:col-span-5"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap gap-2 mb-5">
              <Badge variant="accent">{heroCopy.eyebrow}</Badge>
              <Badge variant="outline">Live platform</Badge>
            </div>

            <h1 className="headline text-[2.125rem] sm:text-4xl lg:text-[3rem] leading-[1.08]">
              <span className="text-gradient">{heroCopy.titleGradient}</span>
              <br />
              <span className="text-accent-line">{heroCopy.titlePlain}</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[var(--text-secondary)] font-medium leading-snug max-w-lg">
              {heroCopy.subtitle}
            </p>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-lg">
              {heroCopy.lede}
            </p>

            <ul className="mt-6 space-y-2">
              {heroCopy.proofPoints.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]"
                  initial={reduced ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.35 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="mt-8">
              <Button asChild size="lg" variant="accent" className="w-full sm:w-auto sm:min-w-[220px] justify-center">
                <Link href="/auth/login">{heroCopy.ctaStudent}</Link>
              </Button>
            </div>
            <div className="mt-3 btn-group">
              <Button asChild variant="outline" size="default" className="w-full sm:min-w-[160px] justify-center">
                <Link href="/program">{heroCopy.ctaProgram}</Link>
              </Button>
              <Button asChild variant="outline" size="default" className="w-full sm:min-w-[160px] justify-center">
                <Link href="/events">{heroCopy.ctaEvents}</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-6 xl:col-span-7 relative mt-4 lg:mt-0"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <div className="image-frame relative aspect-[4/3] max-h-[420px] lg:max-h-[480px]">
              <Image
                src={marketingImages.hero.src}
                alt={marketingImages.hero.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/45 via-transparent to-transparent z-[1]" />
            </div>

            <div className="relative sm:absolute sm:-bottom-5 sm:left-4 sm:right-4 md:left-6 md:max-w-sm glass-panel-strong p-4 mt-4 sm:mt-0 z-10">
              <div className="grid grid-cols-3 gap-3 text-center divide-x divide-[var(--border-subtle)]">
                {heroCopy.stats.map((s) => (
                  <div key={s.label} className="px-1">
                    <p className="text-xl sm:text-2xl font-semibold stat-value">{s.value}</p>
                    <p className="text-[10px] sm:text-[11px] text-[var(--text-muted)] mt-0.5 leading-tight">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
