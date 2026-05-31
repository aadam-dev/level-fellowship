import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrisma = vi.hoisted(() => ({
  user: { findUnique: vi.fn() },
}));

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/password", () => ({
  verifyPassword: vi.fn(),
}));

import { DEMO_ACCOUNTS, verifyDemoAccountLogin } from "@/lib/demo-accounts";
import { verifyPassword } from "@/lib/password";

describe("demo accounts (unit)", () => {
  beforeEach(() => vi.clearAllMocks());

  it("exports team and role demo account definitions", () => {
    expect(DEMO_ACCOUNTS).toHaveLength(5);
    expect(DEMO_ACCOUNTS.filter((d) => d.role === "sys_admin")).toHaveLength(3);
    expect(DEMO_ACCOUNTS.map((d) => d.role)).toContain("candidate");
    expect(DEMO_ACCOUNTS.map((d) => d.role)).toContain("ambassador");
    expect(DEMO_ACCOUNTS.map((d) => d.role)).not.toContain("enterprise");
  });

  it("verifies successful login", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      accountRole: "candidate",
      passwordHash: "hash",
    });
    vi.mocked(verifyPassword).mockResolvedValue(true);

    const result = await verifyDemoAccountLogin(
      "candidate@classroom.local",
      "password123",
    );
    expect(result.ok).toBe(true);
    expect(result.role).toBe("candidate");
  });

  it("reports missing user", async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    const result = await verifyDemoAccountLogin("missing@classroom.local", "x");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("User not found");
  });

  it("reports invalid password", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      accountRole: "candidate",
      passwordHash: "hash",
    });
    vi.mocked(verifyPassword).mockResolvedValue(false);
    const result = await verifyDemoAccountLogin("candidate@classroom.local", "bad");
    expect(result.ok).toBe(false);
    expect(result.error).toBe("Invalid password");
  });
});
