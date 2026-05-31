import { cn } from "@/lib/utils";

export function SectionShell({
  children,
  className,
  id,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "muted" | "contrast" | "dark";
}) {
  const bgMap = {
    default: "section-base",
    muted: "section-muted",
    contrast: "section-contrast",
    dark: "section-dark",
  };

  const showOrbs = variant === "muted" || variant === "contrast";

  return (
    <section id={id} className={cn("relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden", bgMap[variant], className)}>
      {showOrbs && (
        <>
          <div className="section-orb section-orb-1" aria-hidden />
          <div className="section-orb section-orb-2" aria-hidden />
        </>
      )}
      <div className="relative z-10 max-w-7xl mx-auto w-full">{children}</div>
    </section>
  );
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className,
  inverted = false,
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  inverted?: boolean;
}) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16 max-w-2xl",
        align === "center" && "mx-auto text-center max-w-3xl",
        className,
      )}
    >
      {label && <p className="section-label mb-3">{label}</p>}
      <h2 className={cn("headline text-3xl md:text-4xl lg:text-[2.75rem]", inverted && "text-white")}>
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg leading-relaxed",
            inverted ? "text-muted-section" : "text-[var(--text-secondary)]",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
