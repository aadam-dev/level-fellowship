import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withRateLimit } from "@/lib/api-handler";

const schema = z.object({
  event_key: z.string().min(1),
  event_title: z.string().min(1),
  first_name: z.string().min(1).max(80),
  last_name: z.string().min(1).max(80),
  email: z.string().email(),
  attendee_type: z.enum(["university_student", "community"]),
  university: z.string().max(120).optional(),
});

export async function POST(req: NextRequest) {
  return withRateLimit(req, async () => {
    const body = schema.parse(await req.json());

    if (body.attendee_type === "university_student" && !body.university?.trim()) {
      return NextResponse.json(
        { error: "University is required for students" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        mode: "interest",
        message: "Interest recorded",
        reference: `LF-${Date.now().toString(36).toUpperCase()}`,
        email: body.email,
        event_title: body.event_title,
      },
      { status: 202 },
    );
  });
}
