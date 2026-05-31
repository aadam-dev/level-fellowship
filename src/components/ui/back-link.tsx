import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackLink({
  href = "/",
  label = "Home",
  className,
}: {
  href?: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("back-link", className)}>
      <ArrowLeft className="w-4 h-4 shrink-0" strokeWidth={2} aria-hidden />
      <span>{label}</span>
    </Link>
  );
}
