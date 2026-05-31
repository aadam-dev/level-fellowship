import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrisma = vi.hoisted(() => ({
  user: { findUnique: vi.fn() },
}));

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/password", () => ({
  verifyPassword: vi.fn().mockResolvedValue(true),
}));

import { verifyAllDemoAccounts, DEMO_ACCOUNTS } from "@/lib/demo-accounts";

describe("verifyAllDemoAccounts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.user.findUnique.mockImplementation(({ where }: { where: { email: string } }) => {
      const demo = DEMO_ACCOUNTS.find((d) => d.email === where.email);
      return Promise.resolve(
        demo ? { accountRole: demo.role, passwordHash: "x" } : null,
      );
    });
  });

  it("passes when all roles match", async () => {
    const results = await verifyAllDemoAccounts("password123");
    expect(results.every((r) => r.ok)).toBe(true);
  });

  it("fails when role mismatches expected demo role", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      accountRole: "candidate",
      passwordHash: "x",
    });
    const results = await verifyAllDemoAccounts("password123");
    const teamResult = results.find((r) => r.email === "hisham.ahmed@classroom.local");
    expect(teamResult?.ok).toBe(false);
    expect(teamResult?.error).toContain("Expected role");
  });
});
