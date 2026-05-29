import { ScanForm } from "@/components/ambassador/scan-form";

export default function AmbassadorScanPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Event Check-In Scanner</h1>
      <ScanForm />
    </div>
  );
}
