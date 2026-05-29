import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import { withRateLimit } from "@/lib/api-handler";
import { searchAnonymizedTalent } from "@/server/registry/anonymized-search";

export async function GET(req: NextRequest) {
  return withRateLimit(req, async () => {
    await requireRole("enterprise", "sys_admin");
    const { searchParams } = new URL(req.url);
    const semesterTrack = searchParams.get("semester_track");
    const major = searchParams.get("major") ?? undefined;
    const minScore = searchParams.get("min_score");

    const results = await searchAnonymizedTalent({
      semesterTrack: semesterTrack ? parseInt(semesterTrack, 10) : undefined,
      major,
      minScore: minScore ? parseFloat(minScore) : undefined,
    });

    return NextResponse.json(results);
  });
}
