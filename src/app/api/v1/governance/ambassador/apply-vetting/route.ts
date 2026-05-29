import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireSession } from "@/lib/rbac";
import { withRateLimit } from "@/lib/api-handler";
import { applyForVetting } from "@/server/governance/ambassador-vetting";

const schema = z.object({
  target_chapter_university_id: z.number().int(),
  academic_credentials_url: z.string().url().optional(),
  statement_of_commitment_hash: z.string().optional(),
});

export async function POST(req: NextRequest) {
  return withRateLimit(req, async () => {
    const session = await requireSession();
    const body = schema.parse(await req.json());
    const result = await applyForVetting({
      userId: session.user.id,
      targetChapterUniversityId: body.target_chapter_university_id,
      academicCredentialsUrl: body.academic_credentials_url,
      statementOfCommitmentHash: body.statement_of_commitment_hash,
    });
    return NextResponse.json(result, { status: 202 });
  });
}
