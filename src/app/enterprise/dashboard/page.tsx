export const dynamic = "force-dynamic";

import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { GlassCard } from "@/components/layout/glass-card";
import { Badge } from "@/components/ui/badge";

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
    <div>
      <p className="section-label">Enterprise</p>
      <h1 className="headline text-3xl mt-2">Partner overview</h1>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard title="Organization" className="sm:col-span-2">
          <p className="text-lg font-medium">{partner?.organizationName ?? "Not set"}</p>
          <Badge variant="outline" className="mt-2">
            {partner?.subscriptionStatus ?? "inactive"}
          </Badge>
        </GlassCard>
        <GlassCard title="Placements">
          <p className="text-3xl font-semibold tabular-nums">{placements}</p>
        </GlassCard>
        <GlassCard title="Pending invoices">
          <p className="text-3xl font-semibold tabular-nums">{pendingLedger}</p>
        </GlassCard>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <GlassCard title="Talent registry">
          <Link href="/enterprise/registry" className="text-sm text-[var(--accent)] hover:underline">
            Search anonymized candidates
          </Link>
        </GlassCard>
        <GlassCard title="Billing">
          <Link href="/enterprise/billing" className="text-sm text-[var(--accent)] hover:underline">
            View ledger and invoices
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}
