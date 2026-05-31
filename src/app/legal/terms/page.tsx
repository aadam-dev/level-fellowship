import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { termsDocument } from "@/content/legal";

export default function TermsPage() {
  return (
    <LegalPageLayout
      title={termsDocument.title}
      lede={termsDocument.lede}
      sections={termsDocument.sections}
      currentPath="/legal/terms"
    />
  );
}
