import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrisma = vi.hoisted(() => ({
  chapterEvent: { findUnique: vi.fn(), findMany: vi.fn() },
  eventRegistration: { create: vi.fn(), update: vi.fn(), findFirst: vi.fn() },
  attendanceRecord: { findUnique: vi.fn(), create: vi.fn() },
  user: { findUnique: vi.fn() },
}));

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

import {
  listUpcomingEvents,
  registerForEvent,
  checkInAttendance,
} from "@/server/events/attendance";

describe("attendance errors", () => {
  beforeEach(() => vi.clearAllMocks());

  it("lists upcoming events", async () => {
    mockPrisma.chapterEvent.findMany.mockResolvedValue([]);
    const events = await listUpcomingEvents();
    expect(events).toEqual([]);
  });

  it("rejects closed events", async () => {
    mockPrisma.chapterEvent.findUnique.mockResolvedValue(null);
    await expect(
      registerForEvent({
        eventId: 1,
        email: "a@b.com",
        enrollmentClass: "university_student",
      }),
    ).rejects.toThrow("not found");
  });

  it("rejects non-ambassador check-in", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ accountRole: "candidate" });
    await expect(
      checkInAttendance({
        targetEventId: 1,
        attendeeIdentifierEmail: "a@b.com",
        verificationMethod: "qr_scan_token_0001A",
        ambassadorUserId: "u1",
      }),
    ).rejects.toThrow("ambassador");
  });

  it("returns existing attendance", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ accountRole: "ambassador" });
    mockPrisma.eventRegistration.findFirst.mockResolvedValue({
      id: 1,
      enrollmentClass: "university_student",
    });
    mockPrisma.attendanceRecord.findUnique.mockResolvedValue({
      id: "existing",
      statusLogged: "confirmed_present",
    });
    const result = await checkInAttendance({
      targetEventId: 1,
      attendeeIdentifierEmail: "a@b.com",
      verificationMethod: "qr_scan_token_0001A",
      ambassadorUserId: "u1",
    });
    expect(result.attendance_record_id).toBe("existing");
  });
});
