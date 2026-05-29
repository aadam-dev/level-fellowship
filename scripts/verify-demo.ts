/**
 * Verifies all seeded demo accounts can authenticate.
 * Usage: npm run verify:demo  (requires DB + seed)
 */
import { verifyAllDemoAccounts, DEMO_PASSWORD } from "../src/lib/demo-accounts";
import { prisma } from "../src/lib/prisma";

async function main() {
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    console.error(
      "Database unreachable. Start Postgres and seed first:\n" +
        "  docker compose up -d db\n" +
        "  npx prisma migrate deploy\n" +
        "  npm run db:seed",
    );
    process.exit(1);
  }

  const results = await verifyAllDemoAccounts(DEMO_PASSWORD);
  let failed = false;

  for (const r of results) {
    if (r.ok) {
      console.log(`  OK  ${r.email} (${r.role})`);
    } else {
      console.error(`  FAIL ${r.email}: ${r.error ?? "unknown"}`);
      failed = true;
    }
  }

  await prisma.$disconnect();
  process.exit(failed ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
