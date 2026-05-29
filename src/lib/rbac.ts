import { AccountRole } from "@prisma/client";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { roleDashboardPath } from "@/lib/role-paths";

export { roleDashboardPath };

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function requireSession() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new ApiError(401, "Unauthorized");
  }
  return session;
}

export async function requireRole(...roles: AccountRole[]) {
  const session = await requireSession();
  const role = session.user.accountRole as AccountRole;
  if (!roles.includes(role)) {
    throw new ApiError(403, "Forbidden");
  }
  return session;
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error(error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
