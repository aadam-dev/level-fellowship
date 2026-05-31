import { Suspense } from "react";
import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";
import { BrandLogo } from "@/components/layout/brand-logo";
import { pageIntros } from "@/content/site";
import { marketingImages } from "@/content/images";
import { getPlatformMode } from "@/lib/platform-readiness";

export default async function LoginPage() {
  const platformMode = await getPlatformMode();

  return (
    <div className="min-h-[calc(100vh-4.25rem)] grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center relative px-12 xl:px-20 gradient-hero border-r border-[var(--border-subtle)] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.14]">
          <Image
            src={marketingImages.campus.src}
            alt=""
            fill
            className="object-cover"
            sizes="50vw"
            aria-hidden
          />
        </div>
        <div className="relative z-10">
          <BrandLogo height={52} />
          <h1 className="headline text-4xl mt-6">{pageIntros.login.title}</h1>
          <p className="text-[var(--text-secondary)] mt-4 leading-relaxed">{pageIntros.login.lede}</p>
          <ul className="mt-8 space-y-3">
            {pageIntros.login.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-[var(--text-secondary)] items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-muted)] text-[var(--accent)] text-xs font-bold">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 sm:px-6 py-12 section-muted">
        <Suspense fallback={<div className="legal-panel w-full max-w-md h-64 animate-pulse" />}>
          <LoginForm platformMode={platformMode} />
        </Suspense>
      </div>
    </div>
  );
}
