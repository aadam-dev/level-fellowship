import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrisma = vi.hoisted(() => ({
  candidate: { findMany: vi.fn() },
}));

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

import { searchAnonymizedTalent, resolveCandidateFromHash } from "@/server/registry/anonymized-search";

describe("anonymized search (mocked)", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns eligible anonymized candidates", async () => {
    mockPrisma.candidate.findMany.mockResolvedValue([
      {
        id: "550e8400-e29b-41d4-a716-446655440000",
        chapter: { regionNode: "UK-MIDLANDS" },
        moduleCompletions: [
          { examScore: 80, workbookSubmitted: true, isVerified: true, moduleCode: "SEM1-A" },
          { examScore: 85, workbookSubmitted: true, isVerified: true, moduleCode: "SEM1-B" },
        ],
      },
    ]);
    const results = await searchAnonymizedTalent({ minScore: 70 });
    expect(results).toHaveLength(1);
    expect(results[0].anonymized_candidate_hash).toMatch(/^CAND-NODE-/);
    expect(results[0].workbook_status).toBe("verified_complete");
  });

  it("filters by major and min score", async () => {
    mockPrisma.candidate.findMany.mockResolvedValue([
      {
        id: "id-1",
        chapter: { regionNode: "UK-LONDON" },
        moduleCompletions: [
          { examScore: 90, workbookSubmitted: true, isVerified: true, moduleCode: "A" },
        ],
      },
    ]);
    const results = await searchAnonymizedTalent({
      major: "econ",
      minScore: 95,
    });
    expect(results).toHaveLength(0);
  });

  it("resolves hash to candidate id", async () => {
    const id = "550e8400-e29b-41d4-a716-446655440000";
    mockPrisma.candidate.findMany.mockResolvedValue([{ id }]);
    const { anonymizedCandidateHash } = await import("@/lib/anonymize");
    const resolved = await resolveCandidateFromHash(anonymizedCandidateHash(id));
    expect(resolved).toBe(id);
  });

  it("returns null for unknown hash", async () => {
    mockPrisma.candidate.findMany.mockResolvedValue([]);
    expect(await resolveCandidateFromHash("CAND-NODE-UNKNOWN")).toBeNull();
  });
});
