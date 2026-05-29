export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { GlassCard } from "@/components/layout/glass-card";

export default async function EnterpriseBillingPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const ledger = await prisma.revenueLedger.findMany({
    where: { payerId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Wakalah bil-Ujrah Billing</h1>
      <p className="text-slate-400 text-sm mb-8">
        Fixed service fees only — no interest, compounding, or late penalties at the system layer.
      </p>
      <div className="space-y-4">
        {ledger.length === 0 ? (
          <GlassCard>
            <p className="text-slate-400 text-sm">No ledger entries yet.</p>
          </GlassCard>
        ) : (
          ledger.map((entry) => (
            <GlassCard key={entry.id} title={entry.frameworkType.replace("_", " ")}>
              <div className="grid sm:grid-cols-3 gap-2 text-sm">
                <span>Amount: ${entry.amountUsd.toString()} USD</span>
                <span>Protocol: {entry.shariahProtocol}</span>
                <span
                  className={
                    entry.paymentStatus === "cleared"
                      ? "text-[var(--emerald)]"
                      : "text-amber-400"
                  }
                >
                  {entry.paymentStatus}
                </span>
              </div>
              {entry.stripeInvoiceId && (
                <p className="text-xs text-slate-500 mt-2 font-mono">
                  Stripe: {entry.stripeInvoiceId}
                </p>
              )}
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
}
