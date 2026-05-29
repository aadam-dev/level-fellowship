import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/rbac";
import { withRateLimit } from "@/lib/api-handler";
import { updateVettingStatus } from "@/server/governance/ambassador-vetting";
import { ScrutinyStatus } from "@prisma/client";

const schema = z.object({
  scrutiny_status: z.enum(["pending", "interviewed", "approved", "rejected"]),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return withRateLimit(req, async () => {
    const session = await requireRole("sys_admin");
    const { id } = await params;
    const body = schema.parse(await req.json());
    const vetting = await updateVettingStatus({
      vettingId: parseInt(id, 10),
      status: body.scrutiny_status as ScrutinyStatus,
      assignedById: session.user.id,
    });
    return NextResponse.json(vetting);
  });
}
