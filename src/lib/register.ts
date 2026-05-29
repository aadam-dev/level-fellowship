import { AccountRole, EnrollmentType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

export async function registerUser(input: {
  email: string;
  password: string;
  accountRole?: AccountRole;
  chapterId?: number;
  academicMajor?: string;
  enrollmentType?: EnrollmentType;
  organizationName?: string;
}) {
  const email = input.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("Email already registered");
  }

  const passwordHash = await hashPassword(input.password);
  const role = input.accountRole ?? "candidate";

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      accountRole: role,
    },
  });

  if (role === "candidate" && input.chapterId) {
    await prisma.candidate.create({
      data: {
        userId: user.id,
        chapterId: input.chapterId,
        academicMajor: input.academicMajor,
        enrollmentType: input.enrollmentType ?? "university_student",
      },
    });
  }

  if (role === "enterprise" && input.organizationName) {
    await prisma.enterprisePartner.create({
      data: {
        userId: user.id,
        organizationName: input.organizationName,
      },
    });
  }

  return user;
}
