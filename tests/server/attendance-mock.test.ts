import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrisma = vi.hoisted(() => ({
  chapterEvent: { findUnique: vi.fn(), findMany: vi.fn() },
  eventRegistration: { create: vi.fn(), update: vi.fn(), findFirst: vi.fn() },
  attendanceRecord: { findUnique: vi.fn(), create: vi.fn() },
  user: { findUnique: vi.fn() },
}));

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/qr", async () => {
  const actual = await vi.importActual<typeof import("@/lib/qr")>("@/lib/qr");
  return {
    ...actual,
    createQrToken: vi.fn().mockResolvedValue("jwt-token"),
  };
});

import { registerForEvent, checkInAttendance } from "@/server/events/attendance";

describe("event attendance (mocked)", () => {
  beforeEach(() => vi.clearAllMocks());

  it("registers for open event", async () => {
    mockPrisma.chapterEvent.findUnique.mockResolvedValue({
      id: 1,
      isOpenAccess: true,
    });
    mockPrisma.eventRegistration.create.mockResolvedValue({ id: 5, email: "a@b.com" });
    mockPrisma.eventRegistration.update.mockResolvedValue({ id: 5 });

    const result = await registerForEvent({
      eventId: 1,
      email: "a@b.com",
      enrollmentClass: "non_student_aspirant",
    });
    expect(result.scanToken).toBe("qr_scan_token_0005A");
  });

  it("checks in ambassador attendee", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ accountRole: "ambassador" });
    mockPrisma.eventRegistration.findFirst.mockResolvedValue({
      id: 5,
      enrollmentClass: "non_student_aspirant",
    });
    mockPrisma.attendanceRecord.findUnique.mockResolvedValue(null);
    mockPrisma.attendanceRecord.create.mockResolvedValue({ id: "uuid-1" });

    const result = await checkInAttendance({
      targetEventId: 1,
      attendeeIdentifierEmail: "a@b.com",
      verificationMethod: "qr_scan_token_0005A",
      ambassadorUserId: "amb-1",
    });
    expect(result.status_logged).toBe("confirmed_present");
  });
});
