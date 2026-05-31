export const dynamic = "force-dynamic";

import { getLedgerAggregates } from "@/server/billing/wakalah-controller";
import { GlassCard } from "@/components/layout/glass-card";
import { PageHero } from "@/components/marketing/page-hero";
import { shariahPrinciples } from "@/content/proposal";
import { pageIntros } from "@/content/site";
import { Badge } from "@/components/ui/badge";

export default async function ShariahGovernancePage() {
  const aggregates = await getLedgerAggregates();

  return (
    <>
      <PageHero
        label="Governance"
        title={pageIntros.governance.title}
        lede={pageIntros.governance.lede}
        breadcrumb={{ href: "/" }}
        image="governance"
      />

      <section className="max-w-3xl mx-auto px-6 py-8">
        <h2 className="headline text-2xl">{shariahPrinciples.framework}</h2>
        <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
          {shariahPrinciples.summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {shariahPrinciples.maqasid.map((m) => (
            <Badge key={m} variant="outline">
              {m}
            </Badge>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8 grid sm:grid-cols-2 gap-6">
        <GlassCard title="How we charge">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            The platform acts as an agent delivering education and verified career development.
            Fees are fixed and shown before you pay. Partnership fees use published rates on
            disclosures. No interest-based products run through this ledger.
          </p>
        </GlassCard>
        <GlassCard title="Published fee rate">
          <p className="text-3xl font-semibold text-[var(--navy)] tabular-nums">
            {(parseFloat(process.env.PLACEMENT_FEE_RATE ?? "0.15") * 100).toFixed(0)}%
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Published partnership rate on verified outcomes. No late fees at the system layer.
          </p>
        </GlassCard>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="headline-sans text-xl font-semibold mb-6">Live ledger</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aggregates.length === 0 ? (
            <GlassCard>
              <p className="text-sm text-[var(--text-muted)]">No transactions recorded yet.</p>
            </GlassCard>
          ) : (
            aggregates.map((row, i) => (
              <GlassCard key={i} title={`${row.shariahProtocol} / ${row.paymentStatus}`}>
                <p className="text-lg font-semibold tabular-nums">{row._count} entries</p>
                <p className="text-sm text-[var(--text-muted)]">
                  ${row._sum.amountUsd?.toString() ?? "0"} USD total
                </p>
              </GlassCard>
            ))
          )}
        </div>
      </section>
    </>
  );
}
