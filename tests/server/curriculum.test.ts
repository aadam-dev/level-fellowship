import { describe, it, expect } from "vitest";
import {
  computeVerified,
  cumulativeAverage,
  PASS_THRESHOLD,
} from "@/server/curriculum/progress";

describe("curriculum progress", () => {
  it("computes verified at threshold", () => {
    expect(computeVerified(PASS_THRESHOLD)).toBe(true);
    expect(computeVerified(PASS_THRESHOLD - 1)).toBe(false);
    expect(computeVerified(null)).toBe(false);
  });

  it("calculates cumulative average", () => {
    expect(cumulativeAverage([{ examScore: 80 }, { examScore: 90 }])).toBe(85);
    expect(cumulativeAverage([{ examScore: null }])).toBeNull();
    expect(cumulativeAverage([])).toBeNull();
  });
});
