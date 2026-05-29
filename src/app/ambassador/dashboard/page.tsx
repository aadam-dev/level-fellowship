export const dynamic = "force-dynamic";

import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAmbassadorApproved } from "@/server/governance/ambassador-vetting";
import { BentoGrid } from "@/components/layout/bento-grid";
import { GlassCard } from "@/components/layout/glass-card";

export default async function AmbassadorDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const approved = await isAmbassadorApproved(session.user.id);
  const vetting = await prisma.ambassadorVetting.findFirst({
    where: { userId: session.user.id },
    include: { chapter: true },
    orderBy: { createdAt: "desc" },
  });

  const chapterId = vetting?.chapterId;
  const candidateCount = chapterId
    ? await prisma.candidate.count({ where: { chapterId } })
    : 0;
  const attendanceCount = chapterId
    ? await prisma.attendanceRecord.count({
        where: { event: { chapterId } },
      })
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Ambassador Dashboard</h1>
      <BentoGrid>
        <GlassCard title="Chapter Node">
          <p className="text-lg">{vetting?.chapter.universityName ?? "Unassigned"}</p>
          <p className="text-sm text-slate-400 mt-1">
            Status: {vetting?.scrutinyStatus ?? "not applied"}
          </p>
        </GlassCard>
        <GlassCard title="Active Candidates">
          <p className="text-3xl font-semibold text-[var(--frost-blue)]">{candidateCount}</p>
        </GlassCard>
        <GlassCard title="Event Attendance">
          <p className="text-3xl font-semibold text-[var(--emerald)]">{attendanceCount}</p>
        </GlassCard>
        {approved && (
          <>
            <GlassCard title="Toolkit">
              <Link href="/ambassador/toolkit" className="text-sm text-[var(--frost-blue)] hover:underline">
                Download slides & lesson plans →
              </Link>
            </GlassCard>
            <GlassCard title="QR Scanner">
              <Link href="/ambassador/scan" className="text-sm text-[var(--cyan-border)] hover:underline">
                Open check-in scanner →
              </Link>
            </GlassCard>
          </>
        )}
      </BentoGrid>
    </div>
  );
}
