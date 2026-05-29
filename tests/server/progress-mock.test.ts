import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrisma = vi.hoisted(() => ({
  curriculumModule: { findMany: vi.fn() },
  moduleCompletion: { findMany: vi.fn(), upsert: vi.fn() },
}));

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

import {
  getSemester1ModuleCodes,
  isSemester1Complete,
  isSemester2Unlocked,
  syncModuleVerification,
} from "@/server/curriculum/progress";

describe("curriculum progress (mocked)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns semester 1 module codes", async () => {
    mockPrisma.curriculumModule.findMany.mockResolvedValue([
      { moduleCode: "SEM1-A" },
      { moduleCode: "SEM1-B" },
    ]);
    const codes = await getSemester1ModuleCodes();
    expect(codes).toEqual(["SEM1-A", "SEM1-B"]);
  });

  it("checks semester 1 complete when all verified", async () => {
    mockPrisma.curriculumModule.findMany.mockResolvedValue([{ moduleCode: "SEM1-A" }]);
    mockPrisma.moduleCompletion.findMany.mockResolvedValue([
      { moduleCode: "SEM1-A", isVerified: true },
    ]);
    expect(await isSemester1Complete("c1")).toBe(true);
  });

  it("returns false when module missing verification", async () => {
    mockPrisma.curriculumModule.findMany.mockResolvedValue([
      { moduleCode: "SEM1-A" },
      { moduleCode: "SEM1-B" },
    ]);
    mockPrisma.moduleCompletion.findMany.mockResolvedValue([
      { moduleCode: "SEM1-A", isVerified: true },
    ]);
    expect(await isSemester1Complete("c1")).toBe(false);
  });

  it("semester 2 unlocked mirrors semester 1", async () => {
    mockPrisma.curriculumModule.findMany.mockResolvedValue([]);
    expect(await isSemester2Unlocked("c1")).toBe(true);
  });

  it("upserts module completion", async () => {
    mockPrisma.moduleCompletion.upsert.mockResolvedValue({ isVerified: true });
    await syncModuleVerification("c1", "SEM1-A", 75, true);
    expect(mockPrisma.moduleCompletion.upsert).toHaveBeenCalled();
  });
});
