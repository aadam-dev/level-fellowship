"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("glass-panel mb-3 overflow-hidden accordion-open-glow transition-shadow", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-center justify-between gap-4 px-4 sm:px-5 py-4 min-h-[52px] text-left text-sm font-semibold text-[var(--navy)] hover:bg-[var(--accent-muted)] transition-colors [&[data-state=open]]:text-[var(--accent)] [&[data-state=open]>span>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-muted)]">
          <ChevronDown className="h-4 w-4 text-[var(--accent)] transition-transform duration-300" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content className="overflow-hidden" {...props}>
      <div
        className={cn(
          "px-5 pb-5 text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-3",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
