import { AccountRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { roleDashboardPath } from "@/lib/role-paths";

export const DEMO_PASSWORD = "password123";

export const DEMO_ACCOUNTS: {
  email: string;
  role: AccountRole;
  dashboardPath: string;
}[] = [
  {
    email: "admin@classroom.local",
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
  {
    email: "enterprise@classroom.local",
    role: "enterprise",
    dashboardPath: roleDashboardPath("enterprise"),
  },
];

export type DemoLoginResult = {
  email: string;
  ok: boolean;
  role?: AccountRole;
  error?: string;
};

export async function verifyDemoAccountLogin(
  email: string,
  password: string,
): Promise<DemoLoginResult> {
  const normalized = email.toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalized },
    include: { candidate: true, enterprisePartner: true },
  });

  if (!user) {
    return { email: normalized, ok: false, error: "User not found" };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { email: normalized, ok: false, error: "Invalid password" };
  }

  return { email: normalized, ok: true, role: user.accountRole };
}

export async function verifyAllDemoAccounts(
  password: string = DEMO_PASSWORD,
): Promise<DemoLoginResult[]> {
  return Promise.all(
    DEMO_ACCOUNTS.map(async (demo) => {
      const result = await verifyDemoAccountLogin(demo.email, password);
      if (result.ok && result.role !== demo.role) {
        return {
          ...result,
          ok: false,
          error: `Expected role ${demo.role}, got ${result.role}`,
        };
      }
      return result;
    }),
  );
}
