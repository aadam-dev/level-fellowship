import { describe, it, expect, beforeAll } from "vitest";
import {
  DEMO_ACCOUNTS,
  DEMO_PASSWORD,
  verifyAllDemoAccounts,
  verifyDemoAccountLogin,
} from "@/lib/demo-accounts";
import { prisma } from "@/lib/prisma";

const hasDatabase = !!process.env.DATABASE_URL;

describe.skipIf(!hasDatabase)("demo accounts (integration)", () => {
  let dbReady = false;

  beforeAll(async () => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      dbReady = true;
    } catch {
      dbReady = false;
    }
  });

  it("has all four demo users in the database", async (ctx) => {
    if (!dbReady) ctx.skip();
    for (const demo of DEMO_ACCOUNTS) {
      const user = await prisma.user.findUnique({
        where: { email: demo.email },
      });
      expect(user, `${demo.email} missing — run npm run db:seed`).toBeTruthy();
      expect(user?.accountRole).toBe(demo.role);
    }
  });

  it("all demo accounts authenticate with password123", async (ctx) => {
    if (!dbReady) ctx.skip();
    const results = await verifyAllDemoAccounts(DEMO_PASSWORD);
    for (const result of results) {
      expect(result.ok, result.error ?? result.email).toBe(true);
    }
  });

  it("rejects wrong password", async (ctx) => {
    if (!dbReady) ctx.skip();
    const result = await verifyDemoAccountLogin(
      "candidate@classroom.local",
      "wrong-password",
    );
    expect(result.ok).toBe(false);
  });

  it("candidate has registry-eligible completions", async (ctx) => {
    if (!dbReady) ctx.skip();
    const user = await prisma.user.findUnique({
      where: { email: "candidate@classroom.local" },
      include: {
        candidate: { include: { moduleCompletions: true } },
      },
    });
    expect(user?.candidate).toBeTruthy();
    const completions = user!.candidate!.moduleCompletions;
    expect(completions.length).toBeGreaterThan(0);
    expect(completions.every((c) => c.workbookSubmitted)).toBe(true);
    expect(completions.every((c) => (c.examScore ?? 0) >= 70)).toBe(true);
  });

  it("ambassador has approved vetting", async (ctx) => {
    if (!dbReady) ctx.skip();
    const user = await prisma.user.findUnique({
      where: { email: "ambassador@classroom.local" },
    });
    const vetting = await prisma.ambassadorVetting.findFirst({
      where: { userId: user!.id, scrutinyStatus: "approved" },
    });
    expect(vetting).toBeTruthy();
  });

  it("enterprise has active partner record", async (ctx) => {
    if (!dbReady) ctx.skip();
    const user = await prisma.user.findUnique({
      where: { email: "enterprise@classroom.local" },
      include: { enterprisePartner: true },
    });
    expect(user?.enterprisePartner?.subscriptionStatus).toBe("active");
  });
});
