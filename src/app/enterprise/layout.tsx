import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";

export default async function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");
  if (!["enterprise", "sys_admin"].includes(session.user.accountRole)) {
    redirect("/auth/login");
  }
  return <AppShell role="enterprise">{children}</AppShell>;
}
