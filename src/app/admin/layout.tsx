import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");
  if (session.user.accountRole !== "sys_admin") {
    redirect("/auth/login");
  }

  return <AppShell role="sys_admin">{children}</AppShell>;
}
