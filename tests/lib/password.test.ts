import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "@/lib/password";

describe("password", () => {
  it("hashes and verifies correctly", async () => {
    const hash = await hashPassword("secure-password");
    expect(hash.length).toBeGreaterThan(50);
    expect(await verifyPassword("secure-password", hash)).toBe(true);
    expect(await verifyPassword("wrong", hash)).toBe(false);
  });

  it("returns false for invalid hash", async () => {
    expect(await verifyPassword("test", "not-a-valid-hash")).toBe(false);
  });
});
