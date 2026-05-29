import { describe, it, expect } from "vitest";
import { enforceRateLimit } from "@/lib/rate-limit";

describe("rate limit", () => {
  it("allows requests under memory fallback limit", async () => {
    const id = `test-${Date.now()}`;
    const first = await enforceRateLimit(id);
    expect(first.success).toBe(true);
  });
});
