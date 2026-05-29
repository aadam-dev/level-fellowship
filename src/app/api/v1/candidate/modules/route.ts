import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import { withRateLimit } from "@/lib/api-handler";
import { getCandidateProgress } from "@/server/curriculum/progress";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  return withRateLimit(req, async () => {
    const session = await requireRole("candidate", "sys_admin");
    const candidate = await prisma.candidate.findUnique({
      where: { userId: session.user.id },
    });
    if (!candidate) {
      return NextResponse.json({ error: "Candidate profile not found" }, { status: 404 });
    }
    const progress = await getCandidateProgress(candidate.id);
    return NextResponse.json({
      candidate_id: candidate.id,
      current_semester: candidate.currentSemester,
      registry_status: candidate.registryStatus,
      modules: progress,
    });
  });
}
