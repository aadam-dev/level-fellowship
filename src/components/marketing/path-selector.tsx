"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { pathSelector } from "@/content/site";
import { marketingImages } from "@/content/images";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight } from "lucide-react";
import { SectionShell, SectionHeader } from "@/components/marketing/section-shell";

export function PathSelector() {
  const reduced = useReducedMotion();
  const card = pathSelector.student;

  return (
    <SectionShell variant="contrast">
      <SectionHeader
        label="Get started"
        title="Built for students on campus"
        description="Join your chapter, complete the curriculum, and access industry connections in the West."
        align="center"
      />
      <motion.article
        className="group glass-panel-strong overflow-hidden flex flex-col max-w-2xl mx-auto card-interactive"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-52 sm:h-56 overflow-hidden">
          <Image
            src={marketingImages.workshop.src}
            alt={marketingImages.workshop.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 672px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/55 to-transparent" />
          <div className="absolute bottom-4 left-4 icon-tile w-11 h-11 shadow-lg">
            <GraduationCap className="w-5 h-5 text-[var(--accent)]" strokeWidth={1.5} />
          </div>
        </div>
        <div className="p-8 flex flex-col flex-1 text-center sm:text-left">
          <h3 className="text-xl font-semibold text-[var(--navy)]">{card.title}</h3>
          <p className="mt-3 text-[var(--text-secondary)] text-sm leading-relaxed flex-1">
            {card.description}
          </p>
          <Button asChild variant="accent" className="mt-8 w-full sm:w-auto justify-center group/btn">
            <Link href={card.href} className="inline-flex items-center justify-center gap-2">
              {card.cta}
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </motion.article>
    </SectionShell>
  );
}
