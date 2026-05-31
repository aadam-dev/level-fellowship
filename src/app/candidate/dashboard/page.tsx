export const dynamic = "force-dynamic";

import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCandidateProgress } from "@/server/curriculum/progress";
import { GlassCard } from "@/components/layout/glass-card";
import { Badge } from "@/components/ui/badge";

export default async function CandidateDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const candidate = await prisma.candidate.findUnique({
    where: { userId: session.user.id },
  });
  if (!candidate) {
    return (
      <p className="text-sm text-[var(--text-muted)]">
        No candidate profile linked to this account.
      </p>
    );
  }

  const modules = await getCandidateProgress(candidate.id);
  const verifiedCount = modules.filter((m) => m.isVerified).length;
  const sem1 = modules.filter((m) => m.semesterIndex === 1);
  const sem2 = modules.filter((m) => m.semesterIndex === 2);

  return (
    <div>
      <p className="section-label">Candidate</p>
      <h1 className="headline text-3xl mt-2">Semester track</h1>

      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        <GlassCard title="Current semester">
          <p className="text-2xl font-semibold tabular-nums">{candidate.currentSemester}</p>
        </GlassCard>
        <GlassCard title="Verification status">
          <Badge variant="accent">{candidate.registryStatus.replace("_", " ")}</Badge>
        </GlassCard>
        <GlassCard title="Verified modules">
          <p className="text-2xl font-semibold tabular-nums">
            {verifiedCount}/{modules.length}
          </p>
        </GlassCard>
      </div>

      <div className="mt-12 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-sm font-semibold mb-4">Semester 1</h2>
          <div className="space-y-3">
            {sem1.map((mod) => (
              <ModuleRow key={mod.moduleCode} mod={mod} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold mb-4">Semester 2</h2>
          <div className="space-y-3">
            {sem2.map((mod) => (
              <ModuleRow key={mod.moduleCode} mod={mod} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleRow({
  mod,
}: {
  mod: {
    moduleCode: string;
    title: string;
    locked: boolean;
    workbookSubmitted: boolean;
    isVerified: boolean;
  };
}) {
  return (
    <div
      className={`surface-card p-4 flex items-center justify-between gap-4 ${mod.locked ? "opacity-50" : ""}`}
    >
      <div>
        <p className="text-sm font-medium">{mod.moduleCode}</p>
        <p className="text-xs text-[var(--text-muted)]">{mod.title}</p>
      </div>
      <div className="flex items-center gap-2">
        {mod.isVerified && <Badge variant="success">Verified</Badge>}
        {mod.locked && <Badge variant="outline">Locked</Badge>}
        {!mod.locked && (
          <Link
            href={`/candidate/curriculum/${mod.moduleCode}`}
            className="text-xs text-[var(--accent)] hover:underline"
          >
            Open module
          </Link>
        )}
      </div>
    </div>
  );
}
