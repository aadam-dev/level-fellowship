import {
  FrameworkType,
  PaymentStatus,
  Prisma,
  ShariahProtocol,
} from "@prisma/client";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const DISALLOWED_FIELDS = ["interest_rate", "late_fee", "compound_interest"];

export function getPlacementFeeRate(): number {
  return parseFloat(process.env.PLACEMENT_FEE_RATE ?? "0.15");
}

export function calculatePlacementFee(annualizedBaseUsd: number): number {
  const rate = getPlacementFeeRate();
  return Math.round(annualizedBaseUsd * rate * 100) / 100;
}

export function validateWakalahPayload(body: Record<string, unknown>) {
  for (const field of DISALLOWED_FIELDS) {
    if (field in body) {
      throw new Error(`Field '${field}' is not permitted under Wakalah bil-Ujrah`);
    }
  }
}

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export async function createLedgerEntry(input: {
  payerId: string;
  frameworkType: FrameworkType;
  amountUsd: number;
  shariahProtocol?: ShariahProtocol;
  stripeInvoiceId?: string;
}) {
  return prisma.revenueLedger.create({
    data: {
      payerId: input.payerId,
      frameworkType: input.frameworkType,
      shariahProtocol: input.shariahProtocol ?? "wakalah_bil_ujrah",
      amountUsd: new Prisma.Decimal(input.amountUsd),
      paymentStatus: "pending",
      stripeInvoiceId: input.stripeInvoiceId,
    },
  });
}

export async function createPlacementInvoice(input: {
  enterpriseUserId: string;
  enterprisePartnerId: string;
  candidateId: string;
  annualizedBaseSalaryUsd: number;
}) {
  validateWakalahPayload({});

  const fee = calculatePlacementFee(input.annualizedBaseSalaryUsd);

  const ledger = await createLedgerEntry({
    payerId: input.enterpriseUserId,
    frameworkType: "talent_placement",
    amountUsd: fee,
  });

  const placement = await prisma.placementRecord.create({
    data: {
      enterprisePartnerId: input.enterprisePartnerId,
      candidateId: input.candidateId,
      annualizedBaseSalaryUsd: new Prisma.Decimal(input.annualizedBaseSalaryUsd),
      placementFeeUsd: new Prisma.Decimal(fee),
      ledgerId: ledger.id,
    },
  });

  const stripe = getStripe();
  if (stripe) {
    const partner = await prisma.enterprisePartner.findUnique({
      where: { id: input.enterprisePartnerId },
      include: { user: true },
    });
    if (partner) {
      try {
        const customer = await stripe.customers.create({
          email: partner.user.email,
          metadata: { enterprise_partner_id: partner.id },
        });
        await stripe.invoiceItems.create({
          customer: customer.id,
          amount: Math.round(fee * 100),
          currency: "usd",
          description: `Wakalah bil-Ujrah placement fee (fixed ${getPlacementFeeRate() * 100}%)`,
        });
        const invoice = await stripe.invoices.create({
          customer: customer.id,
          collection_method: "send_invoice",
          days_until_due: 30,
          metadata: {
            ledger_id: ledger.id,
            shariah_protocol: "wakalah_bil_ujrah",
          },
        });
        const finalized = await stripe.invoices.finalizeInvoice(invoice.id!);
        await prisma.revenueLedger.update({
          where: { id: ledger.id },
          data: { stripeInvoiceId: finalized.id },
        });
      } catch (err) {
        console.error("Stripe invoice creation skipped:", err);
      }
    }
  }

  await prisma.candidate.update({
    where: { id: input.candidateId },
    data: { registryStatus: "placed" },
  });

  return { ledger, placement, fee };
}

export async function syncLedgerFromStripeInvoice(
  stripeInvoiceId: string,
  status: PaymentStatus,
) {
  return prisma.revenueLedger.updateMany({
    where: { stripeInvoiceId },
    data: { paymentStatus: status },
  });
}

export async function getLedgerAggregates() {
  const entries = await prisma.revenueLedger.groupBy({
    by: ["shariahProtocol", "paymentStatus"],
    _count: true,
    _sum: { amountUsd: true },
  });
  return entries;
}
