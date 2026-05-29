import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className={cn("bento-card p-6 flex flex-col gap-3", className)}>
      {title && (
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-[var(--ice-white)]">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
