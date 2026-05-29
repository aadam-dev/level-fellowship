import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { registerUser } from "@/lib/register";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  chapter_id: z.number().int().optional(),
  academic_major: z.string().optional(),
  enrollment_type: z
    .enum(["university_student", "non_student_aspirant"])
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = schema.parse(await req.json());
    const user = await registerUser({
      email: body.email,
      password: body.password,
      chapterId: body.chapter_id,
      academicMajor: body.academic_major,
      enrollmentType: body.enrollment_type,
    });
    return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
