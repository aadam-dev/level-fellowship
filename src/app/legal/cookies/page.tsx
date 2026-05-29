import { CookiePreferences } from "@/components/legal/cookie-preferences";

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Cookie Preferences</h1>
      <p className="text-slate-400 text-sm mb-6">
        Manage active storage arrays and analytics configuration data.
      </p>
      <CookiePreferences />
    </div>
  );
}
