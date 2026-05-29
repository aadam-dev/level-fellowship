import { describe, it, expect } from "vitest";
import { roleDashboardPath } from "@/lib/role-paths";

describe("roleDashboardPath", () => {
  it("maps roles to dashboards", () => {
    expect(roleDashboardPath("candidate")).toBe("/candidate/dashboard");
    expect(roleDashboardPath("ambassador")).toBe("/ambassador/dashboard");
    expect(roleDashboardPath("enterprise")).toBe("/enterprise/dashboard");
    expect(roleDashboardPath("sys_admin")).toBe("/ambassador/dashboard");
  });

});
