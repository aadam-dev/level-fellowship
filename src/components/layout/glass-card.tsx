import { cn } from "@/lib/utils";

export function GlassCard({
  className,
  title,
  subtitle,
  children,
  strong = false,
  interactive = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  subtitle?: string;
  strong?: boolean;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        strong ? "glass-panel-strong p-6" : "glass-panel p-6",
        interactive && "card-interactive",
        className,
      )}
      {...props}
    >
      {title && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-[var(--navy)]">{title}</h3>
          {subtitle && (
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
