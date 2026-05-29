import { describe, it, expect } from "vitest";
import { enforceRateLimit } from "@/lib/rate-limit";

describe("rate limit memory store", () => {
  it("blocks after 100 requests in window", async () => {
    const id = `burst-${Date.now()}`;
    let lastSuccess = true;
    for (let i = 0; i < 101; i++) {
      const result = await enforceRateLimit(id);
      lastSuccess = result.success;
    }
    expect(lastSuccess).toBe(false);
  });
});
