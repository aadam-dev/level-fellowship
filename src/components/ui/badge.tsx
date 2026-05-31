import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-[var(--bg-muted)] text-[var(--text-secondary)]",
        accent: "bg-[var(--accent-muted)] text-[var(--accent-deep)]",
        success: "bg-emerald-50 text-[var(--success)]",
        outline: "border border-[var(--border-strong)] bg-white text-[var(--text-secondary)]",
        navy: "bg-[var(--navy)] text-white",
        live: "bg-[var(--navy)] text-white",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
