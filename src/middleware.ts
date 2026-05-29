import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { roleDashboardPath } from "@/lib/role-paths";
import { AccountRole } from "@prisma/client";

const protectedPrefixes = [
  { prefix: "/candidate", roles: ["candidate", "sys_admin"] as AccountRole[] },
  { prefix: "/ambassador", roles: ["ambassador", "sys_admin"] as AccountRole[] },
  { prefix: "/enterprise", roles: ["enterprise", "sys_admin"] as AccountRole[] },
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  for (const route of protectedPrefixes) {
    if (pathname.startsWith(route.prefix)) {
      if (!token?.sub && !token?.id) {
        const login = new URL("/auth/login", req.nextUrl.origin);
        login.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(login);
      }
      const role = (token.accountRole ?? token.role) as AccountRole;
      if (!route.roles.includes(role)) {
        return NextResponse.redirect(
          new URL(roleDashboardPath(role), req.nextUrl.origin),
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/candidate/:path*", "/ambassador/:path*", "/enterprise/:path*"],
};
