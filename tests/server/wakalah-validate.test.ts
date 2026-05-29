import { describe, it, expect } from "vitest";
import { validateWakalahPayload } from "@/server/billing/wakalah-controller";

describe("validateWakalahPayload", () => {
  it("blocks compound_interest field", () => {
    expect(() => validateWakalahPayload({ compound_interest: true })).toThrow();
  });

  it("allows empty payload", () => {
    expect(validateWakalahPayload({ amount_usd: 100 })).toBeUndefined();
  });
});
