import { describe, it, expect } from "vitest";
import {
  calculatePlacementFee,
  getPlacementFeeRate,
  validateWakalahPayload,
} from "@/server/billing/wakalah-controller";

describe("wakalah controller", () => {
  it("uses fixed placement fee rate", () => {
    process.env.PLACEMENT_FEE_RATE = "0.15";
    expect(getPlacementFeeRate()).toBe(0.15);
    expect(calculatePlacementFee(100000)).toBe(15000);
  });

  it("rejects interest and late fee fields", () => {
    expect(() => validateWakalahPayload({ interest_rate: 0.05 })).toThrow(
      "not permitted",
    );
    expect(() => validateWakalahPayload({ late_fee: 100 })).toThrow(
      "not permitted",
    );
    expect(() => validateWakalahPayload({})).not.toThrow();
  });
});
