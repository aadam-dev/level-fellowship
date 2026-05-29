import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withRateLimit } from "@/lib/api-handler";
import { registerForEvent } from "@/server/events/attendance";
import { EnrollmentType } from "@prisma/client";

const schema = z.object({
  event_id: z.number().int(),
  email: z.string().email(),
  enrollment_class: z.enum(["university_student", "non_student_aspirant"]),
});

export async function POST(req: NextRequest) {
  return withRateLimit(req, async () => {
    const body = schema.parse(await req.json());
    const result = await registerForEvent({
      eventId: body.event_id,
      email: body.email,
      enrollmentClass: body.enrollment_class as EnrollmentType,
    });
    return NextResponse.json(
      {
        registration_id: result.registration.id,
        scan_token: result.scanToken,
        qr_token: result.qrToken,
      },
      { status: 201 },
    );
  });
}
