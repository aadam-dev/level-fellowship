import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrisma = vi.hoisted(() => ({
  user: { findUnique: vi.fn(), create: vi.fn() },
  candidate: { create: vi.fn() },
  enterprisePartner: { create: vi.fn() },
}));

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/password", () => ({
  hashPassword: vi.fn().mockResolvedValue("hashed"),
}));

import { registerUser } from "@/lib/register";

describe("registerUser", () => {
  beforeEach(() => vi.clearAllMocks());

  it("creates candidate user", async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockPrisma.user.create.mockResolvedValue({ id: "u1", email: "a@b.com" });
    mockPrisma.candidate.create.mockResolvedValue({});

    const user = await registerUser({
      email: "a@b.com",
      password: "password123",
      chapterId: 1,
    });
    expect(user.id).toBe("u1");
  });

  it("rejects duplicate email", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: "u1" });
    await expect(
      registerUser({ email: "a@b.com", password: "password123" }),
    ).rejects.toThrow("Email already registered");
  });
});
