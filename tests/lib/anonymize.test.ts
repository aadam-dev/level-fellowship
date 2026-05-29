import { describe, it, expect } from "vitest";
import { anonymizedCandidateHash } from "@/lib/anonymize";

describe("anonymizedCandidateHash", () => {
  it("returns stable CAND-NODE prefix", () => {
    const hash = anonymizedCandidateHash("550e8400-e29b-41d4-a716-446655440000");
    expect(hash).toMatch(/^CAND-NODE-[A-F0-9]{8}$/);
    expect(anonymizedCandidateHash("550e8400-e29b-41d4-a716-446655440000")).toBe(hash);
  });
});
