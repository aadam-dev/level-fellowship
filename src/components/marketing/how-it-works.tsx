"use client";

import { motion, useReducedMotion } from "framer-motion";
import { howItWorks } from "@/content/site";
import { SectionShell, SectionHeader } from "@/components/marketing/section-shell";

export function HowItWorks() {
  const reduced = useReducedMotion();

  return (
    <SectionShell variant="muted">
      <SectionHeader
        label="How it works"
        title="Four steps into Western market roles"
        description="Every UK chapter runs the same playbook from Islamic finance foundations to verified outcomes."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {howItWorks.map((item, i) => (
          <motion.div
            key={item.step}
            className="relative glass-panel p-5 sm:p-6 md:p-8 h-full flex flex-col card-interactive"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <span className="inline-flex w-10 h-10 items-center justify-center rounded-lg bg-[var(--accent)] text-white text-sm font-bold">
              {item.step}
            </span>
            <h3 className="mt-4 font-semibold text-[var(--navy)] text-base sm:text-lg">{item.title}</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
