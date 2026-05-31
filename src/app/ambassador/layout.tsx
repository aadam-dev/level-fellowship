import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";

export default async function AmbassadorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");
  if (!["ambassador", "sys_admin"].includes(session.user.accountRole)) {
    redirect("/auth/login");
  }
  return <AppShell role="ambassador">{children}</AppShell>;
}
