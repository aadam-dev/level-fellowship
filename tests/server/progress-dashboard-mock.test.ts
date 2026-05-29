import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrisma = vi.hoisted(() => ({
  curriculumModule: { findMany: vi.fn() },
  moduleCompletion: { findMany: vi.fn() },
}));

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

import { getCandidateProgress } from "@/server/curriculum/progress";

describe("getCandidateProgress", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns modules with lock state", async () => {
    mockPrisma.curriculumModule.findMany.mockResolvedValue([
      { moduleCode: "SEM1-A", semesterIndex: 1, title: "A", contentUrl: null, workbookUrl: null },
      { moduleCode: "SEM2-A", semesterIndex: 2, title: "B", contentUrl: null, workbookUrl: null },
    ]);
    mockPrisma.moduleCompletion.findMany.mockResolvedValue([
      { moduleCode: "SEM1-A", workbookSubmitted: false, examScore: null, isVerified: false },
    ]);

    const progress = await getCandidateProgress("c1");
    expect(progress).toHaveLength(2);
    expect(progress[0].locked).toBe(false);
    expect(progress[1].locked).toBe(true);
  });
});
