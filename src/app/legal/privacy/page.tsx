import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { privacyDocument } from "@/content/legal";

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title={privacyDocument.title}
      lede={privacyDocument.lede}
      sections={privacyDocument.sections}
      currentPath="/legal/privacy"
    />
  );
}
