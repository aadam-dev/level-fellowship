export const dynamic = "force-dynamic";

import { getLedgerAggregates } from "@/server/billing/wakalah-controller";
import { GlassCard } from "@/components/layout/glass-card";
import { BentoGrid } from "@/components/layout/bento-grid";

export default async function ShariahGovernancePage() {
  const aggregates = await getLedgerAggregates();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Shariah Board Compliance</h1>
      <p className="text-slate-400 text-sm mb-8 max-w-2xl">
        Transparent audit disclosure — all platform inflows processed under Wakalah bil-Ujrah
        (agency for a fixed fee). No interest, compounding, or contingent speculative charges.
      </p>

      <BentoGrid className="mb-12">
        <GlassCard className="sm:col-span-2" title="Operational rule">
          <p className="text-sm text-slate-300">
            The platform acts as Wakil delivering education and talent sourcing services. Ujrah
            fees are fixed and disclosed prior to transaction clearance.
          </p>
        </GlassCard>
        <GlassCard title="Placement fee">
          <p className="text-2xl font-semibold text-[var(--emerald)]">
            {(parseFloat(process.env.PLACEMENT_FEE_RATE ?? "0.15") * 100).toFixed(0)}%
          </p>
          <p className="text-xs text-slate-500">Fixed rate of first-year base — no late fees</p>
        </GlassCard>
      </BentoGrid>

      <h2 className="text-xl font-semibold tracking-tight mb-4">Live ledger metrics</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {aggregates.length === 0 ? (
          <GlassCard>
            <p className="text-slate-400 text-sm">No ledger transactions recorded yet.</p>
          </GlassCard>
        ) : (
          aggregates.map((row, i) => (
            <GlassCard
              key={i}
              title={`${row.shariahProtocol} · ${row.paymentStatus}`}
            >
              <p className="text-lg font-semibold">{row._count} transactions</p>
              <p className="text-sm text-slate-400">
                Total: ${row._sum.amountUsd?.toString() ?? "0"} USD
              </p>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
}
