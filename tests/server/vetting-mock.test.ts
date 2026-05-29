import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrisma = vi.hoisted(() => ({
  chapter: { findUnique: vi.fn() },
  ambassadorVetting: { findFirst: vi.fn(), create: vi.fn(), update: vi.fn() },
  user: { update: vi.fn() },
}));

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

import {
  applyForVetting,
  updateVettingStatus,
  isAmbassadorApproved,
} from "@/server/governance/ambassador-vetting";

describe("ambassador vetting (mocked)", () => {
  beforeEach(() => vi.clearAllMocks());

  it("creates new vetting application", async () => {
    mockPrisma.chapter.findUnique.mockResolvedValue({ id: 1, isActive: true });
    mockPrisma.ambassadorVetting.findFirst.mockResolvedValue(null);
    mockPrisma.ambassadorVetting.create.mockResolvedValue({ id: 88 });

    const result = await applyForVetting({
      userId: "u1",
      targetChapterUniversityId: 1,
    });
    expect(result.vetting_transaction_id).toBe(88);
  });

  it("approves vetting and upgrades role", async () => {
    mockPrisma.ambassadorVetting.update.mockResolvedValue({
      userId: "u1",
      scrutinyStatus: "approved",
    });
    await updateVettingStatus({
      vettingId: 1,
      status: "approved",
      assignedById: "admin",
    });
    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { id: "u1" },
      data: { accountRole: "ambassador" },
    });
  });

  it("checks approved status", async () => {
    mockPrisma.ambassadorVetting.findFirst.mockResolvedValue({ id: 1 });
    expect(await isAmbassadorApproved("u1")).toBe(true);
  });
});
