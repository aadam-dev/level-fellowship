export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { GlassCard } from "@/components/layout/glass-card";

export default async function AdminDashboardPage() {
  const session = await auth();
  const name = session?.user?.displayName ?? session?.user?.email;
  const title = session?.user?.teamTitle;

  const [chapters, candidates, pendingVetting, ledger] = await Promise.all([
    prisma.chapter.count(),
    prisma.candidate.count(),
    prisma.ambassadorVetting.count({ where: { scrutinyStatus: "pending" } }),
    prisma.revenueLedger.aggregate({
      _sum: { amountUsd: true },
      where: { paymentStatus: "cleared" },
    }),
  ]);

  return (
    <div>
      <p className="section-label">Command center</p>
      <h1 className="headline text-3xl mt-2">{name}</h1>
      {title && (
        <p className="text-xs font-mono text-[var(--text-muted)] uppercase mt-1">{title}</p>
      )}

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard title="Active chapters">
          <p className="text-3xl font-semibold tabular-nums">{chapters}</p>
        </GlassCard>
        <GlassCard title="Candidates">
          <p className="text-3xl font-semibold tabular-nums">{candidates}</p>
        </GlassCard>
        <GlassCard title="Vetting queue">
          <p className="text-3xl font-semibold tabular-nums">{pendingVetting}</p>
        </GlassCard>
        <GlassCard title="Cleared ledger (USD)">
          <p className="text-3xl font-semibold tabular-nums">
            ${Number(ledger._sum.amountUsd ?? 0).toLocaleString()}
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
