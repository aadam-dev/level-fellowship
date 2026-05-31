export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { VettingActions } from "@/components/admin/vetting-actions";

export default async function AdminVettingPage() {
  const vettings = await prisma.ambassadorVetting.findMany({
    include: {
      user: { select: { email: true, displayName: true } },
      chapter: { select: { universityName: true } },
    },
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <p className="section-label">Vetting</p>
      <h1 className="headline text-3xl mt-2">Ambassador applications</h1>

      <div className="mt-8 space-y-4">
        {vettings.map((v) => (
          <div key={v.id} className="surface-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium">{v.user.displayName ?? v.user.email}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">{v.chapter.universityName}</p>
              <Badge variant="outline" className="mt-2">
                {v.scrutinyStatus}
              </Badge>
            </div>
            <VettingActions vettingId={v.id} status={v.scrutinyStatus} />
          </div>
        ))}
        {vettings.length === 0 && (
          <p className="text-sm text-[var(--text-muted)]">No vetting records.</p>
        )}
      </div>
    </div>
  );
}
