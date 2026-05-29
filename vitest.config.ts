import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    exclude: ["**/node_modules/**", "**/tests/integration/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
      include: [
        "src/lib/password.ts",
        "src/lib/qr.ts",
        "src/lib/anonymize.ts",
        "src/lib/rate-limit.ts",
        "src/lib/role-paths.ts",
        "src/lib/register.ts",
        "src/lib/demo-accounts.ts",
        "src/server/**",
      ],
      exclude: [
        "src/**/*.d.ts",
        "src/app/**",
        "src/lib/prisma.ts",
        "src/lib/rbac.ts",
        "src/lib/api-handler.ts",
        "src/lib/utils.ts",
      ],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 80,
        statements: 85,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
