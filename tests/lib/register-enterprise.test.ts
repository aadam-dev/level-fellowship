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

describe("register enterprise", () => {
  beforeEach(() => vi.clearAllMocks());

  it("creates enterprise partner", async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockPrisma.user.create.mockResolvedValue({ id: "u1" });
    mockPrisma.enterprisePartner.create.mockResolvedValue({});

    await registerUser({
      email: "corp@example.com",
      password: "password123",
      accountRole: "enterprise",
      organizationName: "Acme Corp",
    });
    expect(mockPrisma.enterprisePartner.create).toHaveBeenCalled();
  });
});
