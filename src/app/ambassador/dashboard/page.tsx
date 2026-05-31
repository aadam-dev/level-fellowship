export const dynamic = "force-dynamic";

import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAmbassadorApproved } from "@/server/governance/ambassador-vetting";
import { GlassCard } from "@/components/layout/glass-card";
import { Badge } from "@/components/ui/badge";

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
    <div>
      <p className="section-label">Ambassador</p>
      <h1 className="headline text-3xl mt-2">Chapter operations</h1>

      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <GlassCard title="Chapter node">
          <p className="text-lg font-medium">{vetting?.chapter.universityName ?? "Unassigned"}</p>
          <Badge variant="outline" className="mt-2">
            {vetting?.scrutinyStatus ?? "not applied"}
          </Badge>
        </GlassCard>
        <GlassCard title="Active candidates">
          <p className="text-3xl font-semibold tabular-nums">{candidateCount}</p>
        </GlassCard>
        <GlassCard title="Event attendance">
          <p className="text-3xl font-semibold tabular-nums">{attendanceCount}</p>
        </GlassCard>
      </div>

      {approved && (
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <GlassCard title="Toolkit">
            <Link href="/ambassador/toolkit" className="text-sm text-[var(--accent)] hover:underline">
              Download slides and lesson plans
            </Link>
          </GlassCard>
          <GlassCard title="QR scanner">
            <Link href="/ambassador/scan" className="text-sm text-[var(--accent)] hover:underline">
              Open check-in scanner
            </Link>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
