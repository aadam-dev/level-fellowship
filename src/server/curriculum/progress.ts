import { prisma } from "@/lib/prisma";

export const PASS_THRESHOLD = 70;

export function computeVerified(examScore: number | null | undefined): boolean {
  return examScore != null && examScore >= PASS_THRESHOLD;
}

export async function getSemester1ModuleCodes(): Promise<string[]> {
  const modules = await prisma.curriculumModule.findMany({
    where: { semesterIndex: 1 },
    select: { moduleCode: true },
  });
  return modules.map((m) => m.moduleCode);
}

export async function isSemester1Complete(candidateId: string): Promise<boolean> {
  const codes = await getSemester1ModuleCodes();
  if (codes.length === 0) return true;

  const completions = await prisma.moduleCompletion.findMany({
    where: { candidateId, semesterIndex: 1, moduleCode: { in: codes } },
  });

  return codes.every((code) => {
    const c = completions.find((x) => x.moduleCode === code);
    return c?.isVerified === true;
  });
}

export async function isSemester2Unlocked(candidateId: string): Promise<boolean> {
  return isSemester1Complete(candidateId);
}

export function cumulativeAverage(
  completions: { examScore: number | null }[],
): number | null {
  const scores = completions
    .map((c) => c.examScore)
    .filter((s): s is number => s != null);
  if (scores.length === 0) return null;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

export async function syncModuleVerification(
  candidateId: string,
  moduleCode: string,
  examScore: number | null,
  workbookSubmitted: boolean,
) {
  const isVerified = computeVerified(examScore) && workbookSubmitted;
  return prisma.moduleCompletion.upsert({
    where: {
      candidateId_moduleCode: { candidateId, moduleCode },
    },
    create: {
      candidateId,
      moduleCode,
      semesterIndex: moduleCode.startsWith("SEM2") ? 2 : 1,
      examScore,
      workbookSubmitted,
      isVerified,
    },
    update: {
      examScore,
      workbookSubmitted,
      isVerified,
    },
  });
}

export async function getCandidateProgress(candidateId: string) {
  const [modules, completions, semester2Unlocked] = await Promise.all([
    prisma.curriculumModule.findMany({ orderBy: [{ semesterIndex: "asc" }, { moduleCode: "asc" }] }),
    prisma.moduleCompletion.findMany({ where: { candidateId } }),
    isSemester2Unlocked(candidateId),
  ]);

  const completionMap = new Map(completions.map((c) => [c.moduleCode, c]));

  return modules.map((mod) => {
    const completion = completionMap.get(mod.moduleCode);
    const locked = mod.semesterIndex === 2 && !semester2Unlocked;
    return {
      ...mod,
      locked,
      workbookSubmitted: completion?.workbookSubmitted ?? false,
      examScore: completion?.examScore ?? null,
      isVerified: completion?.isVerified ?? false,
    };
  });
}
