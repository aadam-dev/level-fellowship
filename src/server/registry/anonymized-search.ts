import { prisma } from "@/lib/prisma";
import { anonymizedCandidateHash } from "@/lib/anonymize";
import { cumulativeAverage, PASS_THRESHOLD } from "@/server/curriculum/progress";

export type RegistrySearchParams = {
  semesterTrack?: number;
  major?: string;
  minScore?: number;
};

export function isRegistryEligible(
  completions: { examScore: number | null; workbookSubmitted: boolean }[],
): boolean {
  const avg = cumulativeAverage(completions);
  if (avg == null || avg < PASS_THRESHOLD) return false;
  const withExam = completions.filter((c) => c.examScore != null);
  if (withExam.length === 0) return false;
  return withExam.every((c) => c.workbookSubmitted);
}

export async function searchAnonymizedTalent(params: RegistrySearchParams) {
  const candidates = await prisma.candidate.findMany({
    where: {
      registryStatus: { in: ["verified_talent", "placed"] },
      ...(params.major
        ? { academicMajor: { contains: params.major, mode: "insensitive" } }
        : {}),
      ...(params.semesterTrack
        ? { currentSemester: { gte: params.semesterTrack } }
        : {}),
    },
    include: {
      chapter: true,
      moduleCompletions: true,
    },
  });

  const results = [];

  for (const candidate of candidates) {
    if (!isRegistryEligible(candidate.moduleCompletions)) continue;

    const score = cumulativeAverage(candidate.moduleCompletions);
    if (score == null) continue;
    if (params.minScore != null && score < params.minScore) continue;

    const modulesPassed = candidate.moduleCompletions
      .filter((m) => m.isVerified)
      .map((m) => m.moduleCode);

    const workbookComplete = candidate.moduleCompletions
      .filter((m) => m.examScore != null)
      .every((m) => m.workbookSubmitted);

    results.push({
      anonymized_candidate_hash: anonymizedCandidateHash(candidate.id),
      chapter_region_node: candidate.chapter.regionNode,
      composite_curriculum_score: Math.round(score * 10) / 10,
      workbook_status: workbookComplete ? "verified_complete" : "incomplete",
      modules_passed: modulesPassed,
      _candidateId: candidate.id,
    });
  }

  return results.map((entry) => {
    const { _candidateId, ...rest } = entry;
    void _candidateId;
    return rest;
  });
}

export async function resolveCandidateFromHash(hash: string): Promise<string | null> {
  const candidates = await prisma.candidate.findMany({ select: { id: true } });
  for (const c of candidates) {
    if (anonymizedCandidateHash(c.id) === hash) return c.id;
  }
  return null;
}
