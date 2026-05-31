export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { GlassCard } from "@/components/layout/glass-card";
import { Badge } from "@/components/ui/badge";

export default async function EnterpriseBillingPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const ledger = await prisma.revenueLedger.findMany({
    where: { payerId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <p className="section-label">Billing</p>
      <h1 className="headline text-3xl mt-2">Wakalah ledger</h1>
      <p className="text-[var(--text-muted)] text-sm mt-2">
        Fixed service fees with transparent protocol labels on every entry.
      </p>

      <div className="mt-8 space-y-3">
        {ledger.length === 0 ? (
          <GlassCard>
            <p className="text-sm text-[var(--text-muted)]">No ledger entries yet.</p>
          </GlassCard>
        ) : (
          ledger.map((entry) => (
            <GlassCard key={entry.id} title={entry.frameworkType.replace("_", " ")}>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="tabular-nums">${entry.amountUsd.toString()} USD</span>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {entry.shariahProtocol}
                </span>
                <Badge variant={entry.paymentStatus === "cleared" ? "success" : "outline"}>
                  {entry.paymentStatus}
                </Badge>
              </div>
              {entry.stripeInvoiceId && (
                <p className="text-xs text-[var(--text-muted)] mt-2 font-mono">
                  {entry.stripeInvoiceId}
                </p>
              )}
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
}
