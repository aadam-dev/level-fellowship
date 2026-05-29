import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrisma = vi.hoisted(() => ({
  revenueLedger: {
    create: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
    groupBy: vi.fn(),
  },
  placementRecord: { create: vi.fn() },
  candidate: { update: vi.fn() },
  enterprisePartner: { findUnique: vi.fn() },
}));

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

import {
  createLedgerEntry,
  createPlacementInvoice,
  syncLedgerFromStripeInvoice,
  getLedgerAggregates,
} from "@/server/billing/wakalah-controller";

describe("wakalah ledger (mocked)", () => {
  beforeEach(() => vi.clearAllMocks());

  it("creates ledger entry", async () => {
    mockPrisma.revenueLedger.create.mockResolvedValue({ id: "l1" });
    const entry = await createLedgerEntry({
      payerId: "u1",
      frameworkType: "certification",
      amountUsd: 100,
    });
    expect(entry.id).toBe("l1");
  });

  it("creates placement without stripe", async () => {
    mockPrisma.revenueLedger.create.mockResolvedValue({
      id: "l1",
      paymentStatus: "pending",
      shariahProtocol: "wakalah_bil_ujrah",
    });
    mockPrisma.placementRecord.create.mockResolvedValue({});
    mockPrisma.candidate.update.mockResolvedValue({});

    const result = await createPlacementInvoice({
      enterpriseUserId: "u1",
      enterprisePartnerId: "ep1",
      candidateId: "c1",
      annualizedBaseSalaryUsd: 100000,
    });
    expect(result.fee).toBe(15000);
  });

  it("syncs stripe invoice status", async () => {
    mockPrisma.revenueLedger.updateMany.mockResolvedValue({ count: 1 });
    await syncLedgerFromStripeInvoice("inv_1", "cleared");
    expect(mockPrisma.revenueLedger.updateMany).toHaveBeenCalled();
  });

  it("aggregates ledger", async () => {
    mockPrisma.revenueLedger.groupBy.mockResolvedValue([]);
    const agg = await getLedgerAggregates();
    expect(agg).toEqual([]);
  });
});
