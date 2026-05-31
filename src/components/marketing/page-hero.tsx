import Image from "next/image";
import { marketingImages } from "@/content/images";
import { BackLink } from "@/components/ui/back-link";

export function PageHero({
  label,
  title,
  lede,
  breadcrumb,
  image = "campus",
  showImage = true,
}: {
  label?: string;
  title: string;
  lede: string;
  breadcrumb?: { href: string; label?: string };
  image?: keyof typeof marketingImages;
  showImage?: boolean;
}) {
  const img = marketingImages[image];

  return (
    <section className="relative gradient-hero border-b border-[var(--border-subtle)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 relative">
        <div className={showImage ? "grid lg:grid-cols-2 gap-8 items-center" : "max-w-3xl"}>
          <div>
            {(breadcrumb || label) && (
              <div className="page-hero-meta">
                {breadcrumb && (
                  <BackLink href={breadcrumb.href} label={breadcrumb.label ?? "Home"} />
                )}
                {label && <p className="page-hero-label">{label}</p>}
              </div>
            )}

            <h1 className="headline text-3xl sm:text-4xl md:text-5xl">{title}</h1>
            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl">
              {lede}
            </p>
          </div>
          {showImage && (
            <div className="image-frame relative aspect-[16/10] hidden sm:block">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/35 to-transparent z-[1]" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
