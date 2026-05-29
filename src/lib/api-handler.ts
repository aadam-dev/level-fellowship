import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit } from "@/lib/rate-limit";
import { handleApiError } from "@/lib/rbac";
import { auth } from "@/auth";

export async function withRateLimit(
  req: NextRequest,
  handler: () => Promise<NextResponse>,
) {
  try {
    const session = await auth();
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "anonymous";
    const identifier = session?.user?.id ?? ip;
    const { success } = await enforceRateLimit(identifier);
    if (!success) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }
    return await handler();
  } catch (error) {
    return handleApiError(error);
  }
}
