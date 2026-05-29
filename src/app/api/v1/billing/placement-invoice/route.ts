import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/rbac";
import { withRateLimit } from "@/lib/api-handler";
import { createPlacementInvoice } from "@/server/billing/wakalah-controller";
import { resolveCandidateFromHash } from "@/server/registry/anonymized-search";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  anonymized_candidate_hash: z.string(),
  annualized_base_salary_usd: z.number().positive(),
});

export async function POST(req: NextRequest) {
  return withRateLimit(req, async () => {
    const session = await requireRole("enterprise", "sys_admin");
    const body = schema.parse(await req.json());

    const partner = await prisma.enterprisePartner.findUnique({
      where: { userId: session.user.id },
    });
    if (!partner) {
      return NextResponse.json({ error: "Enterprise partner not found" }, { status: 404 });
    }

    const candidateId = await resolveCandidateFromHash(body.anonymized_candidate_hash);
    if (!candidateId) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    const result = await createPlacementInvoice({
      enterpriseUserId: session.user.id,
      enterprisePartnerId: partner.id,
      candidateId,
      annualizedBaseSalaryUsd: body.annualized_base_salary_usd,
    });

    return NextResponse.json(
      {
        ledger_id: result.ledger.id,
        placement_fee_usd: result.fee,
        payment_status: result.ledger.paymentStatus,
        shariah_protocol: result.ledger.shariahProtocol,
      },
      { status: 201 },
    );
  });
}
