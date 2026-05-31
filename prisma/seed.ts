import {
  PrismaClient,
  AccountRole,
  EnrollmentType,
  RegistryStatus,
  ScrutinyStatus,
} from "@prisma/client";
import { hashPassword } from "../src/lib/password";

const prisma = new PrismaClient();

const MODULES = [
  { moduleCode: "SEM1-RIBA-01", semesterIndex: 1, title: "Riba & Islamic Finance Foundations" },
  { moduleCode: "SEM1-RIBA-02", semesterIndex: 1, title: "Contract Structures (Madinah Track)" },
  { moduleCode: "SEM1-MUSH-02", semesterIndex: 1, title: "Musharakah Principles (Al Dinar)" },
  { moduleCode: "SEM2-CASE-01", semesterIndex: 2, title: "Industry Case Study Alpha" },
  { moduleCode: "SEM2-CASE-04", semesterIndex: 2, title: "Hybrid Readiness Workshop" },
];

const TEAM = [
  {
    email: "hisham.ahmed@classroom.local",
    displayName: "Hisham Ahmed",
    teamTitle: "Program Director",
  },
  {
    email: "adam@classroom.local",
    displayName: "Adam",
    teamTitle: "Structural Architect",
  },
  {
    email: "fatima@classroom.local",
    displayName: "Fatima",
    teamTitle: "Researcher",
  },
];

async function main() {
  const passwordHash = await hashPassword("password123");

  await prisma.moduleCompletion.deleteMany();
  await prisma.attendanceRecord.deleteMany();
  await prisma.eventRegistration.deleteMany();
  await prisma.chapterEvent.deleteMany();
  await prisma.placementRecord.deleteMany();
  await prisma.revenueLedger.deleteMany();
  await prisma.ambassadorVetting.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.enterprisePartner.deleteMany();
  await prisma.user.deleteMany();
  await prisma.curriculumModule.deleteMany();
  await prisma.chapter.deleteMany();

  const chapters = await Promise.all([
    prisma.chapter.create({
      data: {
        universityName: "University of Birmingham",
        societyType: "IF_society",
        regionNode: "UK-MIDLANDS",
      },
    }),
    prisma.chapter.create({
      data: {
        universityName: "Queen Mary University of London",
        societyType: "isoc_node",
        regionNode: "UK-LONDON",
      },
    }),
  ]);

  for (const mod of MODULES) {
    await prisma.curriculumModule.create({
      data: {
        ...mod,
        contentUrl: "https://example.com/content",
        workbookUrl: "/workbooks/sample.pdf",
      },
    });
  }

  const teamUsers = await Promise.all(
    TEAM.map((member) =>
      prisma.user.create({
        data: {
          email: member.email,
          passwordHash,
          accountRole: "sys_admin" as AccountRole,
          displayName: member.displayName,
          teamTitle: member.teamTitle,
        },
      }),
    ),
  );
  const primaryAdmin = teamUsers[0];

  const candidateUser = await prisma.user.create({
    data: {
      email: "candidate@classroom.local",
      passwordHash,
      accountRole: "candidate",
      displayName: "Demo Candidate",
    },
  });

  const candidate = await prisma.candidate.create({
    data: {
      userId: candidateUser.id,
      chapterId: chapters[0].id,
      currentSemester: 2,
      academicMajor: "economics",
      enrollmentType: "university_student" as EnrollmentType,
      registryStatus: "verified_talent" as RegistryStatus,
    },
  });

  for (const mod of MODULES) {
    const examScore = mod.semesterIndex === 1 ? 85 : 88;
    await prisma.moduleCompletion.create({
      data: {
        candidateId: candidate.id,
        semesterIndex: mod.semesterIndex,
        moduleCode: mod.moduleCode,
        workbookSubmitted: true,
        examScore,
        isVerified: examScore >= 70,
      },
    });
  }

  const ambassadorUser = await prisma.user.create({
    data: {
      email: "ambassador@classroom.local",
      passwordHash,
      accountRole: "ambassador",
      displayName: "Demo Ambassador",
    },
  });

  await prisma.ambassadorVetting.create({
    data: {
      userId: ambassadorUser.id,
      chapterId: chapters[0].id,
      scrutinyStatus: "approved" as ScrutinyStatus,
      assignedById: primaryAdmin.id,
    },
  });

  const enterpriseUser = await prisma.user.create({
    data: {
      email: "enterprise@classroom.local",
      passwordHash,
      accountRole: "enterprise",
      displayName: "Demo Enterprise",
      enterprisePartner: {
        create: {
          organizationName: "Misaq Finance Network",
          subscriptionStatus: "active",
        },
      },
    },
  });

  await prisma.revenueLedger.create({
    data: {
      payerId: enterpriseUser.id,
      frameworkType: "corp_sponsorship",
      shariahProtocol: "wakalah_bil_ujrah",
      amountUsd: 5000,
      paymentStatus: "cleared",
    },
  });

  const event = await prisma.chapterEvent.create({
    data: {
      chapterId: chapters[0].id,
      title: "Open Workshop: Career Pathways",
      description: "Community-accessible 2-hour session",
      startsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      isOpenAccess: true,
    },
  });

  console.log("Seed complete (dev password: password123):");
  for (const m of TEAM) {
    console.log(`  ${m.email} (${m.teamTitle})`);
  }
  console.log("  candidate@classroom.local");
  console.log("  ambassador@classroom.local");
  console.log("  enterprise@classroom.local");
  console.log(`  Sample event ID: ${event.id}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
