import { faqItems } from "@/content/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionShell, SectionHeader } from "@/components/marketing/section-shell";

export function FaqAccordion({ title = "Common questions" }: { title?: string }) {
  return (
    <SectionShell variant="muted">
      <SectionHeader label="FAQ" title={title} align="center" className="mx-auto" />
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqItems.map((item, i) => (
          <AccordionItem key={item.q} value={`item-${i}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionShell>
  );
}
