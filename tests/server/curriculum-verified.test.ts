import { describe, it, expect } from "vitest";
import { computeVerified } from "@/server/curriculum/progress";

describe("computeVerified with workbook", () => {
  it("requires exam at or above 70", () => {
    expect(computeVerified(70)).toBe(true);
    expect(computeVerified(69)).toBe(false);
    expect(computeVerified(undefined)).toBe(false);
  });
});
