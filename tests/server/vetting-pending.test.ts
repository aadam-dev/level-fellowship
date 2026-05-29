import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrisma = vi.hoisted(() => ({
  chapter: { findUnique: vi.fn() },
  ambassadorVetting: { findFirst: vi.fn(), create: vi.fn(), update: vi.fn() },
  user: { update: vi.fn() },
}));

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

import { applyForVetting } from "@/server/governance/ambassador-vetting";

describe("vetting pending duplicate", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns existing pending application", async () => {
    mockPrisma.chapter.findUnique.mockResolvedValue({ id: 1, isActive: true });
    mockPrisma.ambassadorVetting.findFirst.mockResolvedValue({ id: 99 });
    const result = await applyForVetting({
      userId: "u1",
      targetChapterUniversityId: 1,
    });
    expect(result.vetting_transaction_id).toBe(99);
  });

  it("throws for inactive chapter", async () => {
    mockPrisma.chapter.findUnique.mockResolvedValue(null);
    await expect(
      applyForVetting({ userId: "u1", targetChapterUniversityId: 1 }),
    ).rejects.toThrow("inactive");
  });
});
