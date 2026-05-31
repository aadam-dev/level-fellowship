import { CookiePreferences } from "@/components/legal/cookie-preferences";
import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { cookiesDocument } from "@/content/legal";

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title={cookiesDocument.title}
      lede={cookiesDocument.lede}
      sections={cookiesDocument.sections}
      currentPath="/legal/cookies"
    >
      <CookiePreferences />
    </LegalPageLayout>
  );
}
