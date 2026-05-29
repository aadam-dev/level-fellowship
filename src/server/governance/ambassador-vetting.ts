import { ScrutinyStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function applyForVetting(input: {
  userId: string;
  targetChapterUniversityId: number;
  academicCredentialsUrl?: string;
  statementOfCommitmentHash?: string;
}) {
  const chapter = await prisma.chapter.findUnique({
    where: { id: input.targetChapterUniversityId },
  });
  if (!chapter?.isActive) {
    throw new Error("Chapter not found or inactive");
  }

  const existing = await prisma.ambassadorVetting.findFirst({
    where: {
      userId: input.userId,
      chapterId: input.targetChapterUniversityId,
      scrutinyStatus: { in: ["pending", "interviewed"] },
    },
  });
  if (existing) {
    return {
      vetting_transaction_id: existing.id,
      scrutiny_state: "pending_interview_scheduling",
      estimated_processing_days: 5,
    };
  }

  const vetting = await prisma.ambassadorVetting.create({
    data: {
      userId: input.userId,
      chapterId: input.targetChapterUniversityId,
      academicCredentialsUrl: input.academicCredentialsUrl,
      statementOfCommitmentHash: input.statementOfCommitmentHash,
      scrutinyStatus: "pending",
    },
  });

  return {
    vetting_transaction_id: vetting.id,
    scrutiny_state: "pending_interview_scheduling",
    estimated_processing_days: 5,
  };
}

export async function updateVettingStatus(input: {
  vettingId: number;
  status: ScrutinyStatus;
  assignedById: string;
}) {
  const vetting = await prisma.ambassadorVetting.update({
    where: { id: input.vettingId },
    data: {
      scrutinyStatus: input.status,
      assignedById: input.assignedById,
    },
    include: { user: true },
  });

  if (input.status === "approved") {
    await prisma.user.update({
      where: { id: vetting.userId },
      data: { accountRole: "ambassador" },
    });
  }

  return vetting;
}

export async function isAmbassadorApproved(userId: string): Promise<boolean> {
  const approved = await prisma.ambassadorVetting.findFirst({
    where: { userId, scrutinyStatus: "approved" },
  });
  return !!approved;
}
