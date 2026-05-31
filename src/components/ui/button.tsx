import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[var(--navy)] text-white hover:bg-[var(--navy-soft)] shadow-sm",
        accent: "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-sm",
        outline:
          "border-2 border-[var(--border-strong)] bg-white text-[var(--navy)] shadow-sm hover:border-[var(--accent)] hover:text-[var(--accent)]",
        ghost:
          "text-[var(--navy)] bg-transparent hover:bg-[var(--accent-muted)] border-2 border-transparent",
        inverse:
          "border-2 border-white/80 bg-white/10 text-white hover:bg-white/20 hover:border-white",
        glass: "glass-panel text-[var(--navy)] hover:bg-white border border-[var(--border-subtle)]",
      },
      size: {
        default: "h-11 sm:h-10 px-5",
        sm: "h-10 sm:h-9 px-3.5 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-11 w-11 shrink-0 sm:h-10 sm:w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}
