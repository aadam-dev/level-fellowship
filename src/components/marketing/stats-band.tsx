"use client";

import { motion, useReducedMotion } from "framer-motion";
import { impactMetrics } from "@/content/proposal";
import { homeMetrics } from "@/content/site";
import { SectionShell } from "@/components/marketing/section-shell";

type Metric = { value: string; suffix: string; label: string };

export function StatsBand({ metrics = "impact" }: { metrics?: "home" | "impact" }) {
  const items: Metric[] = metrics === "home" ? homeMetrics : impactMetrics;
  const reduced = useReducedMotion();

  return (
    <SectionShell className="py-16 md:py-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {items.map((m, i) => (
          <motion.div
            key={m.label}
            className="glass-panel-strong p-6 md:p-8 text-center card-interactive"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.07, duration: 0.45 }}
          >
            <p className="text-4xl md:text-5xl font-semibold stat-value tracking-tight">
              {m.value}
              <span className="text-2xl md:text-3xl text-[var(--accent)]">{m.suffix}</span>
            </p>
            <p className="mt-3 text-sm text-[var(--text-muted)] leading-snug font-medium">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
