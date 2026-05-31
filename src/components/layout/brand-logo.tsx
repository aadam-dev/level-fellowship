import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const BRAND_LOGO_PATH = "/level-fellowship-logo.png";

type BrandLogoProps = {
  className?: string;
  height?: number;
  priority?: boolean;
  href?: string;
};

export function BrandLogo({
  className,
  height = 40,
  priority = false,
  href = "/",
}: BrandLogoProps) {
  const image = (
    <Image
      src={BRAND_LOGO_PATH}
      alt="The Level Fellowship"
      width={150}
      height={150}
      priority={priority}
      className={cn("w-auto object-contain rounded-md", className)}
      style={{ height: `${height}px` }}
    />
  );

  if (!href) {
    return image;
  }

  return (
    <Link href={href} className="inline-flex shrink-0 transition-opacity hover:opacity-90">
      {image}
    </Link>
  );
}
