import { describe, it, expect } from "vitest";
import { isRegistryEligible } from "@/server/registry/anonymized-search";

describe("registry eligibility", () => {
  it("requires avg >= 70 and all workbooks submitted", () => {
    expect(
      isRegistryEligible([
        { examScore: 80, workbookSubmitted: true },
        { examScore: 75, workbookSubmitted: true },
      ]),
    ).toBe(true);

    expect(
      isRegistryEligible([
        { examScore: 60, workbookSubmitted: true },
        { examScore: 65, workbookSubmitted: true },
      ]),
    ).toBe(false);

    expect(
      isRegistryEligible([
        { examScore: 80, workbookSubmitted: false },
      ]),
    ).toBe(false);
  });
});
