import Link from "next/link";
import { BentoGrid } from "@/components/layout/bento-grid";
import { GlassCard } from "@/components/layout/glass-card";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
          From Classroom to Industry
        </h1>
        <p className="mt-4 text-slate-400 max-w-2xl text-lg">
          Campus-embedded career development with a structured two-semester pathway,
          open community events, and transparent Wakalah bil-Ujrah governance.
        </p>
      </section>

      <BentoGrid className="mb-12">
        <GlassCard className="sm:col-span-2 lg:col-span-2" title="Vetted Graduates">
          <p className="text-4xl font-semibold text-[var(--emerald)] tracking-tight">500+</p>
          <p className="text-slate-400 text-sm">Talent registry alumni across chapter nodes</p>
        </GlassCard>
        <GlassCard title="Cost Reduction">
          <p className="text-4xl font-semibold text-[var(--frost-blue)] tracking-tight">60%</p>
          <p className="text-slate-400 text-sm">Training cost reduction vs traditional pipelines</p>
        </GlassCard>
        <GlassCard title="Two-Semester LMS">
          <p className="text-slate-300 text-sm">
            Semester 1 foundations unlock Semester 2 case studies and industry workshops.
          </p>
        </GlassCard>
        <GlassCard title="Open Events" className="sm:col-span-2">
          <p className="text-slate-300 text-sm mb-4">
            Public campus workshops — professionals and aspirants welcome without enrollment barriers.
          </p>
          <Link
            href="/events"
            className="inline-flex text-sm text-[var(--frost-blue)] hover:underline"
          >
            Browse upcoming events →
          </Link>
        </GlassCard>
      </BentoGrid>

      <div className="flex gap-4">
        <Link
          href="/auth/login"
          className="px-6 py-3 rounded-lg bg-[var(--frost-blue)] text-white font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Enter platform
        </Link>
        <Link
          href="/governance/shariah"
          className="px-6 py-3 rounded-lg border border-[var(--cyan-border)]/40 text-[var(--cyan-border)] font-medium text-sm hover:bg-white/5 transition-colors"
        >
          Shariah disclosures
        </Link>
      </div>
    </div>
  );
}
