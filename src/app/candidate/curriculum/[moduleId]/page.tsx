export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isSemester2Unlocked } from "@/server/curriculum/progress";
import { ModuleWorkspace } from "@/components/candidate/module-workspace";

export default async function CurriculumModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");
  const { moduleId } = await params;

  const candidate = await prisma.candidate.findUnique({
    where: { userId: session.user.id },
  });
  if (!candidate) redirect("/candidate/dashboard");

  const mod = await prisma.curriculumModule.findUnique({
    where: { moduleCode: moduleId },
  });
  if (!mod) notFound();

  if (mod.semesterIndex === 2) {
    const unlocked = await isSemester2Unlocked(candidate.id);
    if (!unlocked) redirect("/candidate/dashboard");
  }

  const completion = await prisma.moduleCompletion.findUnique({
    where: {
      candidateId_moduleCode: {
        candidateId: candidate.id,
        moduleCode: moduleId,
      },
    },
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">{mod.title}</h1>
      <p className="text-slate-400 text-sm mb-8">{mod.moduleCode}</p>
      <ModuleWorkspace
        moduleCode={mod.moduleCode}
        contentUrl={mod.contentUrl}
        workbookUrl={mod.workbookUrl}
        initialWorkbookSubmitted={completion?.workbookSubmitted ?? false}
        initialExamScore={completion?.examScore ?? null}
      />
    </div>
  );
}
