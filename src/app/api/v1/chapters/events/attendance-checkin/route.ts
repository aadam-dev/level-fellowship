import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/rbac";
import { withRateLimit } from "@/lib/api-handler";
import { checkInAttendance } from "@/server/events/attendance";

const schema = z.object({
  target_event_id: z.number().int(),
  attendee_identifier_email: z.string().email(),
  verification_method: z.string(),
});

export async function POST(req: NextRequest) {
  return withRateLimit(req, async () => {
    const session = await requireRole("ambassador", "sys_admin");
    const body = schema.parse(await req.json());
    const result = await checkInAttendance({
      targetEventId: body.target_event_id,
      attendeeIdentifierEmail: body.attendee_identifier_email,
      verificationMethod: body.verification_method,
      ambassadorUserId: session.user.id,
    });
    return NextResponse.json(result, { status: 201 });
  });
}
