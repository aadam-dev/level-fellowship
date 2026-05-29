import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-6 py-12">
      <Suspense fallback={<div className="bento-card p-8 w-full max-w-md animate-pulse h-64" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
