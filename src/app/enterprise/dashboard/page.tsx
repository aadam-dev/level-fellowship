export const dynamic = "force-dynamic";

import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BentoGrid } from "@/components/layout/bento-grid";
import { GlassCard } from "@/components/layout/glass-card";

export default async function EnterpriseDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const partner = await prisma.enterprisePartner.findUnique({
    where: { userId: session.user.id },
  });

  const placements = partner
    ? await prisma.placementRecord.count({
        where: { enterprisePartnerId: partner.id },
      })
    : 0;

  const pendingLedger = partner
    ? await prisma.revenueLedger.count({
        where: { payerId: session.user.id, paymentStatus: "pending" },
      })
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Enterprise Dashboard</h1>
      <BentoGrid>
        <GlassCard className="sm:col-span-2" title="Organization">
          <p className="text-lg">{partner?.organizationName ?? "—"}</p>
          <p className="text-sm text-slate-400">
            Subscription: {partner?.subscriptionStatus ?? "inactive"}
          </p>
        </GlassCard>
        <GlassCard title="Placements">
          <p className="text-3xl font-semibold text-[var(--frost-blue)]">{placements}</p>
        </GlassCard>
        <GlassCard title="Pending invoices">
          <p className="text-3xl font-semibold text-amber-400">{pendingLedger}</p>
        </GlassCard>
        <GlassCard title="Talent Registry">
          <Link href="/enterprise/registry" className="text-sm text-[var(--frost-blue)] hover:underline">
            Search anonymized candidates →
          </Link>
        </GlassCard>
        <GlassCard title="Wakalah Billing">
          <Link href="/enterprise/billing" className="text-sm text-[var(--cyan-border)] hover:underline">
            View ledger & invoices →
          </Link>
        </GlassCard>
      </BentoGrid>
    </div>
  );
}
