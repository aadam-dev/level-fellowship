import { AccountRole } from "@prisma/client";

export function roleDashboardPath(role: AccountRole): string {
  switch (role) {
    case "candidate":
      return "/candidate/dashboard";
    case "ambassador":
      return "/ambassador/dashboard";
    case "enterprise":
      return "/enterprise/dashboard";
    case "sys_admin":
      return "/ambassador/dashboard";
    default:
      return "/";
  }
}
