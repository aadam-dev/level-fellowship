export const dynamic = "force-dynamic";

import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCandidateProgress } from "@/server/curriculum/progress";
import { BentoGrid } from "@/components/layout/bento-grid";
import { GlassCard } from "@/components/layout/glass-card";

export default async function CandidateDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const candidate = await prisma.candidate.findUnique({
    where: { userId: session.user.id },
  });
  if (!candidate) {
    return (
      <div className="p-12 text-center text-slate-400">
        No candidate profile linked to this account.
      </div>
    );
  }

  const modules = await getCandidateProgress(candidate.id);
  const verifiedCount = modules.filter((m) => m.isVerified).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Candidate Dashboard</h1>
      <BentoGrid>
        <GlassCard className="sm:col-span-2" title="Two-Semester Track">
          <p className="text-sm text-slate-400">
            Semester {candidate.currentSemester} · {candidate.registryStatus.replace("_", " ")}
          </p>
          <p className="text-2xl font-semibold text-[var(--emerald)] mt-2">
            {verifiedCount} / {modules.length} modules verified
          </p>
        </GlassCard>
        <GlassCard title="Major">
          <p className="text-lg">{candidate.academicMajor ?? "Not set"}</p>
        </GlassCard>
        {modules.map((mod) => (
          <GlassCard
            key={mod.moduleCode}
            title={mod.moduleCode}
            subtitle={mod.title}
            className={mod.locked ? "opacity-50" : ""}
          >
            <div className="flex flex-wrap gap-2 text-xs">
              {mod.workbookSubmitted && (
                <span className="px-2 py-1 rounded bg-[var(--emerald)]/20 text-[var(--emerald)]">
                  Workbook ✓
                </span>
              )}
              {mod.isVerified && (
                <span className="px-2 py-1 rounded bg-[var(--frost-blue)]/20 text-[var(--frost-blue)]">
                  Verified
                </span>
              )}
              {mod.locked && (
                <span className="px-2 py-1 rounded bg-white/10 text-slate-400">Locked</span>
              )}
            </div>
            {!mod.locked && (
              <Link
                href={`/candidate/curriculum/${mod.moduleCode}`}
                className="text-sm text-[var(--frost-blue)] mt-3 inline-block hover:underline"
              >
                Open workspace →
              </Link>
            )}
          </GlassCard>
        ))}
      </BentoGrid>
    </div>
  );
}
