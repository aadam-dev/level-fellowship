import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/rbac";
import { withRateLimit } from "@/lib/api-handler";
import { syncModuleVerification } from "@/server/curriculum/progress";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  module_code: z.string(),
  workbook_submitted: z.boolean(),
  exam_score: z.number().int().min(0).max(100).nullable(),
});

export async function POST(req: NextRequest) {
  return withRateLimit(req, async () => {
    const session = await requireRole("candidate", "sys_admin");
    const body = schema.parse(await req.json());
    const candidate = await prisma.candidate.findUnique({
      where: { userId: session.user.id },
    });
    if (!candidate) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }
    const completion = await syncModuleVerification(
      candidate.id,
      body.module_code,
      body.exam_score,
      body.workbook_submitted,
    );
    return NextResponse.json(completion);
  });
}
