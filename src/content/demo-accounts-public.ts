import type { AccountRole } from "@prisma/client";
import { roleDashboardPath } from "@/lib/role-paths";

export const DEMO_PASSWORD = "password123";

export const DEMO_ACCOUNTS: {
  email: string;
  role: AccountRole;
  dashboardPath: string;
}[] = [
  {
    email: "hisham.ahmed@classroom.local",
    role: "sys_admin",
    dashboardPath: roleDashboardPath("sys_admin"),
  },
  {
    email: "adam@classroom.local",
    role: "sys_admin",
    dashboardPath: roleDashboardPath("sys_admin"),
  },
  {
    email: "fatima@classroom.local",
    role: "sys_admin",
    dashboardPath: roleDashboardPath("sys_admin"),
  },
  {
    email: "candidate@classroom.local",
    role: "candidate",
    dashboardPath: roleDashboardPath("candidate"),
  },
  {
    email: "ambassador@classroom.local",
    role: "ambassador",
    dashboardPath: roleDashboardPath("ambassador"),
  },
];
