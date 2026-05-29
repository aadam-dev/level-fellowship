import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "@/lib/password";
import { DEMO_PASSWORD } from "@/lib/demo-accounts";

describe("seed password consistency", () => {
  it("password123 round-trips like prisma seed", async () => {
    const hash = await hashPassword(DEMO_PASSWORD);
    expect(await verifyPassword(DEMO_PASSWORD, hash)).toBe(true);
    expect(await verifyPassword("wrong", hash)).toBe(false);
  });
});
