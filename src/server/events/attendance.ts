import { EnrollmentType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createQrToken, formatQrScanToken, parseQrScanToken } from "@/lib/qr";

export async function listUpcomingEvents() {
  return prisma.chapterEvent.findMany({
    where: { startsAt: { gte: new Date() }, isOpenAccess: true },
    include: { chapter: true },
    orderBy: { startsAt: "asc" },
  });
}

export async function registerForEvent(input: {
  eventId: number;
  email: string;
  enrollmentClass: EnrollmentType;
  candidateId?: string;
}) {
  const event = await prisma.chapterEvent.findUnique({
    where: { id: input.eventId },
  });
  if (!event || !event.isOpenAccess) {
    throw new Error("Event not found or not open access");
  }

  const registration = await prisma.eventRegistration.create({
    data: {
      eventId: input.eventId,
      email: input.email,
      enrollmentClass: input.enrollmentClass,
      qrToken: "",
      candidateId: input.candidateId,
    },
  });

  const qrToken = await createQrToken({
    registrationId: registration.id,
    eventId: input.eventId,
    email: input.email,
  });

  const updated = await prisma.eventRegistration.update({
    where: { id: registration.id },
    data: { qrToken },
  });

  return {
    registration: updated,
    scanToken: formatQrScanToken(registration.id),
    qrToken,
  };
}

export async function checkInAttendance(input: {
  targetEventId: number;
  attendeeIdentifierEmail: string;
  verificationMethod: string;
  ambassadorUserId: string;
}) {
  const ambassador = await prisma.user.findUnique({
    where: { id: input.ambassadorUserId },
  });
  if (!ambassador || ambassador.accountRole !== "ambassador") {
    throw new Error("Unauthorized: ambassador role required");
  }

  const registrationId = parseQrScanToken(input.verificationMethod);
  if (!registrationId) {
    throw new Error("Invalid verification token");
  }

  const registration = await prisma.eventRegistration.findFirst({
    where: {
      id: registrationId,
      eventId: input.targetEventId,
      email: input.attendeeIdentifierEmail,
    },
  });

  if (!registration) {
    throw new Error("Registration not found for event and email");
  }

  const existing = await prisma.attendanceRecord.findUnique({
    where: { registrationId: registration.id },
  });
  if (existing) {
    return {
      attendance_record_id: existing.id,
      enrollment_class: registration.enrollmentClass,
      status_logged: existing.statusLogged,
    };
  }

  const record = await prisma.attendanceRecord.create({
    data: {
      registrationId: registration.id,
      eventId: input.targetEventId,
      checkedInById: input.ambassadorUserId,
    },
  });

  return {
    attendance_record_id: `att_${record.id.slice(0, 6)}`,
    enrollment_class: registration.enrollmentClass,
    status_logged: "confirmed_present" as const,
  };
}
